import React, { useState, useRef, useEffect } from 'react';
import { Upload, RefreshCw, Download, Loader2, Grid3X3 } from 'lucide-react';

const RUBIKS_COLORS = [
    { name: 'White', r: 255, g: 255, b: 255, hex: '#FFFFFF' },
    { name: 'Yellow', r: 255, g: 213, b: 0, hex: '#FFD500' },
    { name: 'Red', r: 185, g: 0, b: 0, hex: '#B90000' },
    { name: 'Orange', r: 255, g: 89, b: 0, hex: '#FF5900' },
    { name: 'Blue', r: 0, g: 69, b: 173, hex: '#0045AD' },
    { name: 'Green', r: 0, g: 155, b: 72, hex: '#009B48' },
];

const TARGET_PIXELS = 3000; // Requested roughly 3000 pixels

const MosaicMaker = () => {
    const [image, setImage] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [pixelCount, setPixelCount] = useState({ width: 0, height: 0, total: 0 });
    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
                setProcessedImage(null); // Reset previous result
            };
            reader.readAsDataURL(file);
        }
    };

    const getClosestColor = (r, g, b) => {
        let minDiff = Infinity;
        let closest = RUBIKS_COLORS[0];

        for (const color of RUBIKS_COLORS) {
            // Euclidean distance in RGB space
            const diff = Math.sqrt(
                Math.pow(r - color.r, 2) +
                Math.pow(g - color.g, 2) +
                Math.pow(b - color.b, 2)
            );
            if (diff < minDiff) {
                minDiff = diff;
                closest = color;
            }
        }
        return closest;
    };

    const processImage = () => {
        if (!image) return;
        setIsProcessing(true);

        const img = new Image();
        img.src = image;
        img.onload = () => {
            // Calculate dimensions to maintain aspect ratio with target pixels
            const items = TARGET_PIXELS;
            const aspectRatio = img.width / img.height;
            const cols = Math.round(Math.sqrt(items * aspectRatio));
            const rows = Math.round(items / cols);

            setPixelCount({ width: cols, height: rows, total: cols * rows });

            const canvas = document.createElement('canvas');
            canvas.width = cols;
            canvas.height = rows;
            const ctx = canvas.getContext('2d');

            // Draw resized image
            ctx.drawImage(img, 0, 0, cols, rows);

            const imageData = ctx.getImageData(0, 0, cols, rows);
            const data = imageData.data;

            // Pixelate and map to colors
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                const closest = getClosestColor(r, g, b);

                data[i] = closest.r;
                data[i + 1] = closest.g;
                data[i + 2] = closest.b;
            }

            ctx.putImageData(imageData, 0, 0);

            // Scale up for display (using nearest neighbor for pixel look)
            const displayCanvas = document.createElement('canvas');
            displayCanvas.width = cols * 20; // 20px per 'cube/pixel' for visible grid
            displayCanvas.height = rows * 20;
            const dCtx = displayCanvas.getContext('2d');
            dCtx.imageSmoothingEnabled = false;
            dCtx.drawImage(canvas, 0, 0, displayCanvas.width, displayCanvas.height);

            // Add Grid lines
            dCtx.strokeStyle = 'rgba(0,0,0,0.2)';
            dCtx.lineWidth = 1;
            for (let x = 0; x <= displayCanvas.width; x += 20) {
                dCtx.beginPath();
                dCtx.moveTo(x, 0);
                dCtx.lineTo(x, displayCanvas.height);
                dCtx.stroke();
            }
            for (let y = 0; y <= displayCanvas.height; y += 20) {
                dCtx.beginPath();
                dCtx.moveTo(0, y);
                dCtx.lineTo(displayCanvas.width, y);
                dCtx.stroke();
            }

            setProcessedImage(displayCanvas.toDataURL());
            setIsProcessing(false);
        };
    };

    useEffect(() => {
        if (image) {
            processImage();
        }
    }, [image]);

    return (
        <div id="create-mosaic" className="mt-20 tracking-wide bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 lg:p-12 relative overflow-hidden">

            {/* Background glow effect */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 text-center mb-10">
                <h2 className='text-3xl sm:text-5xl lg:text-6xl my-4 font-bold bg-gradient-to-r from-orange-400 to-red-800 text-transparent bg-clip-text'>
                    Create Your Mosaic
                </h2>
                <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                    Upload your photo to see how it looks as a Rubik's Cube masterpiece.
                    Optimized for ~{TARGET_PIXELS} pixels (approx. 500 cubes).
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

                {/* Upload Section */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                    <div
                        onClick={() => fileInputRef.current.click()}
                        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300
                    ${image ? 'border-orange-500/50 bg-neutral-800/50' : 'border-neutral-700 hover:border-orange-500 hover:bg-neutral-800'}`}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="hidden"
                        />
                        {image ? (
                            <div className="relative w-full aspect-square rounded-lg overflow-hidden group">
                                <img src={image} alt="Original" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white font-medium flex items-center gap-2">
                                        <RefreshCw size={20} /> Change Photo
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-500">
                                    <Upload size={32} />
                                </div>
                                <h3 className="text-xl font-semibold text-neutral-200">Upload Photo</h3>
                                <p className="text-neutral-500 mt-2 text-sm">JPEG, PNG, WebP up to 10MB</p>
                                <button className="mt-6 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-800 rounded-lg text-white font-medium hover:opacity-90 transition">
                                    Select File
                                </button>
                            </div>
                        )}
                    </div>

                    {image && (
                        <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-800">
                            <h4 className="text-neutral-300 font-medium mb-3 flex items-center gap-2">
                                <Grid3X3 size={18} className="text-orange-500" /> Mosaic Stats
                            </h4>
                            <div className="space-y-2 text-sm text-neutral-400">
                                <div className="flex justify-between">
                                    <span>Grid Size:</span>
                                    <span className="text-neutral-200">{pixelCount.width} x {pixelCount.height}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total Pixels:</span>
                                    <span className="text-neutral-200">{pixelCount.total}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Est. Cubes:</span>
                                    <span className="text-neutral-200">~{Math.ceil(pixelCount.total / 9)} (Standard Faces)</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Preview Section */}
                <div className="w-full lg:w-2/3 bg-black rounded-xl border border-neutral-800 p-2 min-h-[400px] flex items-center justify-center relative">
                    {isProcessing ? (
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="animate-spin text-orange-500" size={48} />
                            <span className="text-neutral-400">Constructing Mosaic...</span>
                        </div>
                    ) : processedImage ? (
                        <div className="relative w-full flex flex-col items-center">
                            <img
                                src={processedImage}
                                alt="Mosaic Preview"
                                className="w-full h-auto max-h-[600px] object-contain rounded pixelated rendering-pixelated"
                                style={{ imageRendering: 'pixelated' }}
                            />
                            <div className="mt-4 flex gap-3">
                                <a
                                    href={processedImage}
                                    download="rubiks-mosaic.png"
                                    className="flex items-center gap-2 px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition border border-neutral-700"
                                >
                                    <Download size={18} /> Download Preview
                                </a>
                                <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-800 text-white rounded-lg hover:opacity-90 transition shadow-lg shadow-orange-900/20">
                                    Order This Design
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-neutral-600">
                            <Grid3X3 size={64} className="mx-auto mb-4 opacity-20" />
                            <p>Preview will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MosaicMaker
