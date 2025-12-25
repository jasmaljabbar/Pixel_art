import React, { useState, useRef, useCallback } from 'react';
import { Upload, RefreshCw, Download, Loader2, Grid3X3, Scissors, Check } from 'lucide-react';
import Cropper from 'react-easy-crop';

const RUBIKS_COLORS = [
    { name: 'White', r: 255, g: 255, b: 255, hex: '#FFFFFF' },
    { name: 'Yellow', r: 255, g: 213, b: 0, hex: '#FFD500' },
    { name: 'Red', r: 185, g: 0, b: 0, hex: '#B90000' },
    { name: 'Orange', r: 255, g: 89, b: 0, hex: '#FF5900' },
    { name: 'Blue', r: 0, g: 69, b: 173, hex: '#0045AD' },
    { name: 'Green', r: 0, g: 155, b: 72, hex: '#009B48' },
];

// Configuration for 20x25 cubes
const CUBES_WIDTH = 20;
const CUBES_HEIGHT = 25;
const PIXELS_PER_CUBE = 3; // Standard 3x3 face
const GRID_WIDTH = CUBES_WIDTH * PIXELS_PER_CUBE; // 60 pixels
const GRID_HEIGHT = CUBES_HEIGHT * PIXELS_PER_CUBE; // 75 pixels
const TOTAL_CUBES = CUBES_WIDTH * CUBES_HEIGHT; // 500

const MosaicMaker = () => {
    const [rawImage, setRawImage] = useState(null); // original uploaded image
    const [currentImage, setCurrentImage] = useState(null); // Image being processed (could be cropped)
    const [processedImage, setProcessedImage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCropping, setIsCropping] = useState(false);

    // Crop state
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setRawImage(event.target.result);
                setCurrentImage(event.target.result); // Default to raw if no crop
                setProcessedImage(null);
                setIsCropping(true); // Start cropping immediately
                setZoom(1);
                setCrop({ x: 0, y: 0 });
            };
            reader.readAsDataURL(file);
        }
    };

    const getClosestColor = (r, g, b) => {
        let minDiff = Infinity;
        let closest = RUBIKS_COLORS[0];

        for (const color of RUBIKS_COLORS) {
            // Euclidean distance in RGB space
            let diff = Math.sqrt(
                Math.pow(r - color.r, 2) +
                Math.pow(g - color.g, 2) +
                Math.pow(b - color.b, 2)
            );

            // Heavy penalty for Green to minimize/exclude it as requested
            // Only picks green if it's an extremely perfect match
            if (color.name === 'Green') {
                diff = diff * 3.0;
            }

            if (diff < minDiff) {
                minDiff = diff;
                closest = color;
            }
        }
        return closest;
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.setAttribute('crossOrigin', 'anonymous');
            image.src = url;
        });

    const getCroppedImg = async (imageSrc, pixelCrop) => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) return null;

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return canvas.toDataURL('image/jpeg');
    };

    const handleCropConfirm = async () => {
        if (rawImage && croppedAreaPixels) {
            try {
                setIsProcessing(true);
                const croppedImage = await getCroppedImg(rawImage, croppedAreaPixels);
                setCurrentImage(croppedImage);
                setIsCropping(false);
                // Process immediately after crop
                processImage(croppedImage);
            } catch (e) {
                console.error(e);
                setIsProcessing(false);
            }
        } else {
            setIsCropping(false);
            if (rawImage) processImage(rawImage);
        }
    };

    const handleSkipCrop = () => {
        setIsCropping(false);
        setCurrentImage(rawImage);
        processImage(rawImage);
    };

    const processImage = (imgSrc) => {
        if (!imgSrc) return;
        setIsProcessing(true);

        const img = new Image();
        img.src = imgSrc;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            // Fixed grid size: 20x25 cubes * 3 pixels/cube = 60x75 pixels
            canvas.width = GRID_WIDTH;
            canvas.height = GRID_HEIGHT;
            const ctx = canvas.getContext('2d');

            // Enhance contrast/brightness before processing to preserve details
            ctx.filter = 'contrast(1.2) saturate(1.2)';
            ctx.drawImage(img, 0, 0, GRID_WIDTH, GRID_HEIGHT);
            ctx.filter = 'none';

            const imageData = ctx.getImageData(0, 0, GRID_WIDTH, GRID_HEIGHT);
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

            // Scale up for display (10px per sticker)
            const displayCanvas = document.createElement('canvas');
            const SCALE = 10; // 10px per sticker
            displayCanvas.width = GRID_WIDTH * SCALE;
            displayCanvas.height = GRID_HEIGHT * SCALE;
            const dCtx = displayCanvas.getContext('2d');
            dCtx.imageSmoothingEnabled = false;
            dCtx.drawImage(canvas, 0, 0, displayCanvas.width, displayCanvas.height);

            // Add Grid lines
            // Cube boundaries (every 3 stickers) should be thicker/darker
            dCtx.lineWidth = 1;

            // Draw all sticker borders first
            dCtx.strokeStyle = 'rgba(0,0,0,0.1)';
            for (let x = 0; x <= displayCanvas.width; x += SCALE) {
                dCtx.beginPath(); dCtx.moveTo(x, 0); dCtx.lineTo(x, displayCanvas.height); dCtx.stroke();
            }
            for (let y = 0; y <= displayCanvas.height; y += SCALE) {
                dCtx.beginPath(); dCtx.moveTo(0, y); dCtx.lineTo(displayCanvas.width, y); dCtx.stroke();
            }

            // Draw Cube borders (every 3 stickers * SCALE)
            dCtx.strokeStyle = 'rgba(0,0,0,0.5)';
            const CUBE_SIZE = 3 * SCALE;
            for (let x = 0; x <= displayCanvas.width; x += CUBE_SIZE) {
                dCtx.beginPath(); dCtx.moveTo(x, 0); dCtx.lineTo(x, displayCanvas.height); dCtx.stroke();
            }
            for (let y = 0; y <= displayCanvas.height; y += CUBE_SIZE) {
                dCtx.beginPath(); dCtx.moveTo(0, y); dCtx.lineTo(displayCanvas.width, y); dCtx.stroke();
            }

            setProcessedImage(displayCanvas.toDataURL());
            setIsProcessing(false);
        };
    };

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
                    Turn your photo into a {TOTAL_CUBES} Rubik's Cube masterpiece ({CUBES_WIDTH}x{CUBES_HEIGHT} cubes).
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

                {/* Upload Section / Control Panel */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                    <div
                        onClick={() => !isCropping && fileInputRef.current.click()}
                        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all duration-300
                    ${isCropping ? 'border-neutral-700 bg-neutral-900 opacity-50 cursor-not-allowed' :
                                rawImage ? 'border-orange-500/50 bg-neutral-800/50 cursor-pointer' :
                                    'border-neutral-700 hover:border-orange-500 hover:bg-neutral-800 cursor-pointer'}`}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="hidden"
                            disabled={isCropping}
                        />
                        {rawImage ? (
                            <div className="text-center">
                                <div className="w-full aspect-square bg-neutral-900 rounded-lg overflow-hidden mb-4 relative">
                                    <img src={rawImage} alt="Original" className="w-full h-full object-cover opacity-50" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <RefreshCw className="text-white" size={24} />
                                    </div>
                                </div>
                                <p className="text-neutral-400 text-sm">Click to change photo</p>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-500">
                                    <Upload size={32} />
                                </div>
                                <h3 className="text-xl font-semibold text-neutral-200">Upload Photo</h3>
                                <p className="text-neutral-500 mt-2 text-sm">JPEG, PNG, WebP</p>
                                <button className="mt-6 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-800 rounded-lg text-white font-medium hover:opacity-90 transition">
                                    Select File
                                </button>
                            </div>
                        )}
                    </div>

                    {processedImage && !isCropping && (
                        <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-800 animate-fade-in">
                            <h4 className="text-neutral-300 font-medium mb-3 flex items-center gap-2">
                                <Grid3X3 size={18} className="text-orange-500" /> Mosaic Specs
                            </h4>
                            <div className="space-y-2 text-sm text-neutral-400">
                                <div className="flex justify-between">
                                    <span>Dimensions:</span>
                                    <span className="text-neutral-200">{CUBES_WIDTH} x {CUBES_HEIGHT} cubes</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total Cubes:</span>
                                    <span className="text-neutral-200">{TOTAL_CUBES}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Resolution:</span>
                                    <span className="text-neutral-200">{GRID_WIDTH}x{GRID_HEIGHT} pixels</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Preview / Crop Section */}
                <div className="w-full lg:w-2/3 bg-black rounded-xl border border-neutral-800 p-2 min-h-[400px] flex items-center justify-center relative overflow-hidden">

                    {isCropping && rawImage ? (
                        <div className="absolute inset-0 z-20 flex flex-col h-full bg-neutral-900">
                            <div className="relative flex-1 w-full">
                                <Cropper
                                    image={rawImage}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={CUBES_WIDTH / CUBES_HEIGHT} // Enforce 20:25 (0.8) aspect ratio
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                    objectFit="contain"
                                />
                            </div>
                            <div className="p-4 bg-neutral-800 flex justify-between items-center border-t border-neutral-700">
                                <span className="text-neutral-400 text-sm flex items-center gap-2">
                                    <Scissors size={16} /> Crop to fit {CUBES_WIDTH}x{CUBES_HEIGHT} grid
                                </span>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleSkipCrop}
                                        className="px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-700 transition flex items-center gap-2 text-sm"
                                    >
                                        Skip <span className="sr-only">Cropping</span>
                                    </button>
                                    <button
                                        onClick={handleCropConfirm}
                                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-800 rounded-lg text-white font-medium hover:opacity-90 transition flex items-center gap-2 text-sm shadow-md"
                                    >
                                        <Check size={16} /> Process Mosaic
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : isProcessing ? (
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="animate-spin text-orange-500" size={48} />
                            <span className="text-neutral-400">Constructing Mosaic...</span>
                        </div>
                    ) : processedImage ? (
                        <div className="relative w-full flex flex-col items-center p-4">
                            <img
                                src={processedImage}
                                alt="Mosaic Preview"
                                className="w-full h-auto max-h-[600px] object-contain rounded shadow-2xl"
                                style={{ imageRendering: 'pixelated' }}
                            />
                            <div className="mt-6 flex flex-wrap justify-center gap-3 w-full">
                                <a
                                    href={processedImage}
                                    download="rubiks-mosaic.png"
                                    className="flex items-center gap-2 px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition border border-neutral-700"
                                >
                                    <Download size={18} /> Save Preview
                                </a>
                                <button className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition shadow-lg shadow-green-900/20 font-medium">
                                    Place Order
                                </button>
                            </div>
                            <p className="mt-4 text-xs text-neutral-500">
                                *Preview is an approximation. Actual result is built with real cubes.
                            </p>
                        </div>
                    ) : (
                        <div className="text-center text-neutral-600">
                            <Grid3X3 size={64} className="mx-auto mb-4 opacity-20" />
                            <p>Upload an image to start</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MosaicMaker;
