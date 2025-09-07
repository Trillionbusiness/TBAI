
import React from 'react';
import { GeneratedPlaybook, GeneratedOffer } from '../../types';

// --- Storybook Theming Components ---
const StorybookSlide: React.FC<{ children: React.ReactNode, className?: string }> = ({children, className}) => (
    <div data-pdf-page="true" className={`p-10 bg-[#FFFAF0] font-sans text-gray-800 break-after-page relative overflow-hidden border-8 border-purple-300 rounded-3xl ${className}`} style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", width: '800px', height: '1131px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div className="absolute top-8 left-8 text-5xl">☀️</div>
        <div className="absolute bottom-8 right-8 text-5xl">🌙</div>
        <div className="relative z-10 w-full">{children}</div>
    </div>
);

// --- Individual Slide Components ---

const TitleSlide: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <StorybookSlide className="bg-purple-100">
        <div className="text-8xl mb-6">📜</div>
        <p className="font-bold uppercase tracking-widest text-purple-500">A Magical Story For You</p>
        <h1 className="text-6xl font-black tracking-tighter mt-4 text-purple-900">{title}</h1>
        <p className="text-2xl text-purple-700 mt-6 max-w-2xl">{subtitle}</p>
    </StorybookSlide>
);

const ProblemSlide: React.FC<{ diagnosis: GeneratedPlaybook['diagnosis'] }> = ({ diagnosis }) => (
    <StorybookSlide>
        <h2 className="text-4xl font-bold text-red-700">Once upon a time, there was a big, scary DRAGON...</h2>
        <div className="text-9xl my-8">🐲</div>
        <p className="text-2xl text-gray-700">This dragon guarded the treasure you wanted, and its name was...</p>
        <div className="mt-8 p-8 bg-red-50 border-4 border-dashed border-red-300 rounded-2xl">
            <p className="text-4xl text-red-800 leading-relaxed font-semibold">"{diagnosis.constraints[0]}"</p>
        </div>
    </StorybookSlide>
);

const VisionSlide: React.FC<{ diagnosis: GeneratedPlaybook['diagnosis'] }> = ({ diagnosis }) => (
    <StorybookSlide>
        <h2 className="text-4xl font-bold text-green-700">But what if you could defeat the dragon?</h2>
        <div className="text-9xl my-8">🏰</div>
        <p className="text-2xl text-gray-700">Imagine a world where you could easily...</p>
        <div className="mt-8 p-8 bg-green-50 border-4 border-dashed border-green-300 rounded-2xl">
            <p className="text-4xl text-green-800 leading-relaxed font-semibold">...{diagnosis.actions[0]}!</p>
        </div>
         <p className="mt-8 text-gray-600 text-2xl">You just need a magical weapon...</p>
    </StorybookSlide>
);

const OfferPromiseSlide: React.FC<{ offer: GeneratedOffer }> = ({ offer }) => (
    <StorybookSlide className="bg-yellow-50 border-yellow-300">
        <h2 className="text-4xl font-bold text-yellow-800">Introducing, the Magical...</h2>
        <div className="text-9xl my-8">✨⚔️✨</div>
        <h1 className="text-6xl font-black tracking-tighter mt-4 text-yellow-900">{offer.name}</h1>
        <p className="text-3xl text-yellow-700 mt-8 max-w-3xl italic">"{offer.promise}"</p>
    </StorybookSlide>
);

const ValueStackSlide: React.FC<{ offer: GeneratedOffer }> = ({ offer }) => (
     <StorybookSlide>
        <h2 className="text-4xl font-bold text-blue-800">This magical weapon has many powers!</h2>
        <div className="mt-6 w-full max-w-2xl space-y-4">
            {offer.stack.map((item, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200 shadow-md flex items-center gap-4 text-left">
                  <span className="text-4xl">💎</span>
                  <div>
                    <p className="font-bold text-blue-900 text-xl">{item.solution}</p>
                    <p className="text-sm text-gray-600">This power helps you defeat the problem of "{item.problem}"</p>
                  </div>
                </div>
            ))}
        </div>
    </StorybookSlide>
);

const PriceRevealSlide: React.FC<{ offer: GeneratedOffer }> = ({ offer }) => (
    <StorybookSlide>
        <h2 className="text-4xl font-bold text-gray-800">What is the price for such magic?</h2>
        <div className="mt-8">
            <p className="text-3xl font-semibold text-gray-600">This treasure is worth:</p>
            <p className="text-7xl font-bold text-red-500 line-through my-4">{offer.totalValue}</p>
            <p className="text-3xl font-semibold text-gray-800 mt-12">But for you, the price is only...</p>
            <div className="my-4 p-8 bg-green-500 rounded-full shadow-2xl inline-block">
                <p className="text-8xl font-black text-white">{offer.price}</p>
            </div>
        </div>
    </StorybookSlide>
);

const GuaranteeSlide: React.FC<{ offer: GeneratedOffer }> = ({ offer }) => (
    <StorybookSlide>
        <h2 className="text-4xl font-bold text-gray-800">And it comes with a Magic Shield!</h2>
        <div className="text-9xl my-8">🛡️</div>
        <div className="p-12 bg-gray-50 rounded-lg border-4 border-dashed w-full max-w-3xl shadow-lg border-gray-400">
            <p className="text-3xl text-gray-700 italic leading-relaxed">"{offer.guarantee}"</p>
        </div>
        <p className="mt-8 text-gray-600 max-w-2xl text-2xl">So you have nothing to lose and a whole kingdom to gain!</p>
    </StorybookSlide>
);

const OfferPresentationPdf: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => {
    const slides: React.ReactNode[] = [];

    slides.push(<TitleSlide title="The Story of Your Success" subtitle={playbook.diagnosis.yourRole} />);
    slides.push(<ProblemSlide diagnosis={playbook.diagnosis} />);
    slides.push(<VisionSlide diagnosis={playbook.diagnosis} />);

    // Offer 1 Slides
    slides.push(<OfferPromiseSlide offer={playbook.offer1} />);
    slides.push(<ValueStackSlide offer={playbook.offer1} />);
    slides.push(<PriceRevealSlide offer={playbook.offer1} />);
    slides.push(<GuaranteeSlide offer={playbook.offer1} />);
    
  return (
    <div>{slides.map((slide, index) => <div key={index}>{slide}</div>)}</div>
  );
};

export default OfferPresentationPdf;
