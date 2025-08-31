import React from 'react';
import { GeneratedDownsell, GeneratedOffer } from '../../types';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-4xl font-black text-gray-900 tracking-tight">{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-lg text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-3xl font-bold text-gray-800 border-b-4 border-yellow-400 pb-3 mb-6 mt-10 break-after-avoid">{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;
const HighlightBox: React.FC<{ children: React.ReactNode, title?: string, icon?: string }> = ({ children, title, icon = '💡' }) => (
    <div className="p-6 rounded-lg border-2 border-yellow-200 bg-yellow-50 my-6 break-inside-avoid shadow-lg">
        {title && <h3 className="text-xl font-bold text-yellow-800 mb-2 flex items-center"><span className="text-2xl mr-2">{icon}</span>{title}</h3>}
        {children}
    </div>
);

const GapDiagram: React.FC<{ downsell: GeneratedDownsell, gso: GeneratedOffer }> = ({ downsell, gso }) => (
    <div className="my-8 p-6 bg-gray-100 rounded-lg text-center break-inside-avoid">
        <h3 className="text-2xl font-bold text-gray-800">From a Quick Fix to a Total Transformation</h3>
        <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-1/3 p-4 bg-blue-100 border border-blue-200 rounded-lg">
                <p className="font-bold text-blue-800">YOU ARE HERE</p>
                <p className="text-sm text-blue-700 mt-1">{downsell.offer.name}</p>
                <p className="text-xs text-gray-600 mt-2">Solves the immediate problem.</p>
            </div>
            <div className="text-4xl font-light text-gray-400 animate-pulse">→ → →</div>
            <div className="w-1/3 p-4 bg-green-100 border-2 border-green-400 rounded-lg shadow-lg">
                <p className="font-bold text-green-800">YOUR GOAL</p>
                <p className="text-sm text-green-700 mt-1">{gso.promise}</p>
                <p className="text-xs text-gray-600 mt-2">The ultimate, life-changing result.</p>
            </div>
        </div>
        <P className="mt-4">The <strong className="font-semibold">{gso.name}</strong> is the bridge that gets you there.</P>
    </div>
);

const GsoStackSection: React.FC<{ gso: GeneratedOffer }> = ({ gso }) => (
     <div className="break-inside-avoid">
        <SectionTitle>Here's the Complete Roadmap to Success</SectionTitle>
        <div className="space-y-3 mt-4">
            {gso.stack.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-green-500 shadow-md transform transition-all hover:scale-105 break-inside-avoid">
                    <div className="flex justify-between items-start">
                        <p className="font-bold text-gray-800 text-lg flex-grow pr-4">✅ {item.solution}</p>
                        <p className="font-black text-green-600 text-lg whitespace-nowrap">{item.value}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const PriceAndGuaranteeSection: React.FC<{ gso: GeneratedOffer }> = ({ gso }) => (
    <div className="break-inside-avoid mt-10">
        <div className="mt-8 bg-white p-8 rounded-lg border-4 border-dashed border-gray-300 text-center shadow-2xl">
             <p className="text-lg font-semibold text-gray-600">Total Real World Value:</p>
             <p className="text-4xl font-bold text-red-600 line-through">{gso.totalValue}</p>
             <p className="text-lg font-semibold text-gray-800 mt-8">Your Special Upgrade Price:</p>
             <p className="text-7xl font-black text-yellow-500 animate-pulse">{gso.price}</p>
        </div>
        <HighlightBox title="And It's Completely Risk-Free..." icon="🛡️">
            <p className="text-2xl text-center text-gray-700 italic leading-relaxed">"{gso.guarantee}"</p>
        </HighlightBox>
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
    <div className="p-12 bg-white font-sans text-gray-900">
        <header className="text-center mb-10 pb-4 border-b-4 border-yellow-400">
            <Title>Congratulations! But Don't Stop Now...</Title>
            <Subtitle>You've taken the first step with the "{downsell.offer.name}". Here's the path to the finish line.</Subtitle>
        </header>

        <main>
            <P>First off, a huge congratulations on taking action! You've already done what 99% of people only talk about.</P>
            <P>You now have a powerful tool to get a <strong className="font-semibold">quick win</strong>. But what if that quick win was just the beginning? What if it was the key to unlocking a much bigger, life-changing transformation?</P>

            <GapDiagram downsell={downsell} gso={gso} />
            
            <SectionTitle>Introducing: The "{gso.name}"</SectionTitle>
            <P className="text-center text-lg italic mt-4">This is our complete, A-to-Z system for helping you achieve <strong className="font-semibold">"{gso.promise}"</strong>.</P>
            
            <GsoStackSection gso={gso} />
            <PriceAndGuaranteeSection gso={gso} />
            
             <div className="mt-12 text-center p-8 bg-green-500 text-white rounded-lg break-before-page">
                 <h3 className="text-4xl font-black">Your Two Choices</h3>
                 <P className="text-lg mt-2 text-green-100">You can stay with your quick win, or you can take the proven roadmap to total success.</P>
                 <div className="mt-6 p-4 bg-white text-green-600 font-bold text-2xl rounded shadow-lg">
                    CLICK HERE TO UPGRADE NOW
                 </div>
            </div>
        </main>
    </div>
  );
};

export default TripwireFollowupPdf;
