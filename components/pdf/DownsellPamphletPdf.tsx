import React from 'react';
import { GeneratedDownsell } from '../../types';

const DownsellPamphletPdf: React.FC<{ downsell: GeneratedDownsell }> = ({ downsell }) => {
    if (!downsell?.offer) {
        return <div className="p-8 bg-white font-sans">Could not load offer information.</div>;
    }

    return (
        <div className="p-10 bg-blue-100 font-sans text-gray-900 border-8 border-yellow-400 rounded-3xl relative overflow-hidden" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", width: '800px', height: '1131px', boxShadow: '0 0 30px rgba(0,0,0,0.1) inset' }}>
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 text-5xl transform -rotate-12">🎉</div>
            <div className="absolute top-20 right-10 text-6xl transform rotate-12">🎈</div>
            <div className="absolute bottom-10 left-20 text-5xl transform rotate-6">🥳</div>
            <div className="absolute bottom-20 right-20 text-6xl transform -rotate-6">🎁</div>

            <div className="h-full flex flex-col items-center justify-center text-center">

                <p className="text-2xl font-bold text-blue-500">You're Invited To...</p>
                <h1 className="text-7xl font-black text-blue-800 tracking-tighter mt-4">{downsell.offer.name}!</h1>
                
                <div className="my-8 p-6 bg-white rounded-2xl shadow-xl border-4 border-dashed border-blue-300">
                    <p className="text-3xl text-gray-700 italic">"{downsell.offer.promise}"</p>
                </div>

                <div className="grid grid-cols-2 gap-6 items-center w-full max-w-3xl">
                    {/* Left side: What you get */}
                    <div className="text-left bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-bold text-green-700 mb-4">Here are your party favors:</h3>
                        <div className="space-y-3">
                            {downsell.offer.stack.map((item, index) => (
                                <div key={index} className="flex items-start">
                                    <span className="text-2xl text-green-500 mr-3">⭐</span>
                                    <div>
                                        <p className="font-bold text-gray-800">{item.solution}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Right side: Price */}
                    <div className="text-center">
                        <p className="text-xl text-gray-600">All this fun is worth:</p>
                        <p className="text-4xl font-bold text-red-500 line-through">{downsell.offer.totalValue}</p>
                        <p className="text-2xl text-gray-800 mt-6">But your ticket is only:</p>
                        <p className="text-8xl font-black text-blue-600 animate-bounce">{downsell.offer.price}</p>
                    </div>
                </div>

                 <div className="mt-10 p-4 bg-yellow-100 border-2 border-dashed border-yellow-400 rounded-xl text-center w-full max-w-3xl">
                    <p className="font-bold text-xl text-yellow-800">Our Pinky Promise!</p>
                    <p className="italic text-yellow-700">"{downsell.offer.guarantee}"</p>
                </div>

            </div>
        </div>
    );
};

export default DownsellPamphletPdf;
