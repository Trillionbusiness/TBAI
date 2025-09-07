
import React from 'react';
import { GeneratedDownsell, GeneratedOffer } from '../../types';

// --- Storybook Theming Components ---
const StorybookPage: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => (
    <div data-pdf-page="true" className={`p-10 bg-[#fdf8e1] font-sans text-gray-800 break-after-page relative overflow-hidden border-8 border-yellow-500 rounded-3xl ${className}`} style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", width: '800px', minHeight: '1131px', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)' }}>
        <div className="absolute top-8 left-8 text-5xl">☀️</div>
        <div className="relative z-10">{children}</div>
    </div>
);

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-yellow-900 tracking-tighter text-center">{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-yellow-700 mt-4 text-center">{children}</p>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-lg text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;

const GapDiagram: React.FC<{ downsell: GeneratedDownsell, gso: GeneratedOffer }> = ({ downsell, gso }) => (
    <div className="my-8 p-6 bg-yellow-100 rounded-lg text-center break-inside-avoid">
        <h3 className="text-2xl font-bold text-gray-800">Your adventure has just begun!</h3>
        <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-1/3 p-4 bg-blue-100 border-2 border-blue-300 rounded-lg">
                <p className="font-bold text-blue-800">YOU ARE HERE</p>
                <p className="text-3xl my-2">📍</p>
                <p className="text-sm text-blue-700 mt-1">{downsell.offer.name}</p>
            </div>
            <div className="text-4xl font-light text-gray-400 animate-pulse">. . . . . . .</div>
            <div className="w-1/3 p-4 bg-green-100 border-4 border-green-400 rounded-lg shadow-lg">
                <p className="font-bold text-green-800">THE BIG TREASURE</p>
                 <p className="text-3xl my-2">💎</p>
                <p className="text-sm text-green-700 mt-1">{gso.promise}</p>
            </div>
        </div>
    </div>
);

const PriceAndGuaranteeSection: React.FC<{ gso: GeneratedOffer }> = ({ gso }) => (
    <div className="break-inside-avoid mt-10 text-center">
        <div className="mt-8 bg-white p-8 rounded-2xl border-4 border-dashed border-gray-300 shadow-2xl">
             <p className="text-xl font-semibold text-gray-600">The treasure map is worth:</p>
             <p className="text-5xl font-bold text-red-600 line-through">{gso.totalValue}</p>
             <p className="text-xl font-semibold text-gray-800 mt-8">Your secret price to upgrade:</p>
             <p className="text-8xl font-black text-yellow-500 animate-pulse">{gso.price}</p>
        </div>
        <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-300 rounded-xl">
            <p className="text-2xl text-center text-blue-800 italic leading-relaxed">"{gso.guarantee}"</p>
        </div>
    </div>
);


interface TripwireFollowupPdfProps {
  downsell: GeneratedDownsell;
  gso: GeneratedOffer;
}

const TripwireFollowupPdf: React.FC<TripwireFollowupPdfProps> = ({ downsell, gso }) => {
  if (!downsell?.offer) {
    return <div className="p-8 bg-white font-sans pdf-container">Oops! We could not find the offer information.</div>;
  }
  
  return (
    <StorybookPage>
        <header className="text-center mb-10 pb-4 border-b-8 border-dashed border-yellow-600">
            <div className="text-8xl">🗺️</div>
            <Title>You Found a Secret Treasure Map!</Title>
            <Subtitle>You took the first step with the "{downsell.offer.name}". Here's how to find the real treasure.</Subtitle>
        </header>

        <main>
            <P className="text-center text-xl">Hooray! You're so brave for starting this adventure. But guess what? The little key you found unlocks a much bigger treasure chest!</P>

            <GapDiagram downsell={downsell} gso={gso} />
            
            <h2 className="text-4xl font-bold text-center mt-8 text-yellow-800">The "{gso.name}" is your guide!</h2>
            <P className="text-center text-lg italic mt-4">It shows you the secret path to <strong className="font-semibold">"{gso.promise}"</strong>.</P>
            
            <PriceAndGuaranteeSection gso={gso} />
            
             <div className="mt-12 text-center p-8 bg-green-500 text-white rounded-2xl break-before-page shadow-lg">
                 <h3 className="text-4xl font-black">Are you ready for the next adventure?</h3>
                 <div className="mt-6 p-4 bg-white text-green-600 font-bold text-3xl rounded shadow-lg cursor-pointer">
                    Upgrade to the Full Adventure!
                 </div>
            </div>
        </main>
    </StorybookPage>
  );
};

export default TripwireFollowupPdf;
