import React, { useState, useRef } from 'react';
import { testimonials } from '../constants';
import { Play, Pause } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2">
            <div className='bg-neutral rounded-md p-6 text-md border border-neutral-800 font-thin h-full flex flex-col justify-between'>
                <div className="mb-4">
                    {testimonial.audio ? (
                        <div className="flex items-center gap-4 py-4 bg-neutral-900/50 rounded-lg px-4 border border-neutral-800">
                            <button
                                onClick={togglePlay}
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-800 hover:opacity-90 transition text-white shadow-lg"
                            >
                                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                            </button>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-neutral-300">
                                    {isPlaying ? "Playing audio..." : "Listen to message"}
                                </p>
                                <div className="h-1 w-full bg-neutral-800 rounded-full mt-1.5 overflow-hidden">
                                    <div className={`h-full bg-orange-500 transition-all duration-300 ${isPlaying ? 'w-full animate-pulse' : 'w-0'}`} />
                                </div>
                            </div>
                            <audio
                                ref={audioRef}
                                src={testimonial.audio}
                                onEnded={() => setIsPlaying(false)}
                                onPause={() => setIsPlaying(false)}
                                onPlay={() => setIsPlaying(true)}
                                className="hidden"
                            />
                        </div>
                    ) : (
                        <p className="min-h-[80px] text-neutral-300 leading-relaxed">{testimonial.text}</p>
                    )}
                </div>

                <div className="flex mt-auto items-start">
                    <img
                        className='w-12 h-12 mr-6 rounded-full border border-neutral-300 object-cover'
                        src={testimonial.image}
                        alt={testimonial.user}
                    />
                    <div>
                        <h6 className="font-medium text-neutral-200">{testimonial.user}</h6>
                        <span className='text-sm font-normal italic text-neutral-500'>{testimonial.company}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Testimonials = () => {
    return (
        <div id='testimonial' className="mt-20 tracking-wide">
            <h2 className='text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20 font-bold bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text'>
                What people are saying
            </h2>
            <div className="flex flex-wrap justify-center">
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard key={index} testimonial={testimonial} />
                ))}
            </div>
        </div>
    )
}

export default Testimonials;
