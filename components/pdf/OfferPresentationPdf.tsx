import React from 'react';
import { GeneratedPlaybook, GeneratedOffer } from '../../types';

// --- Reusable PDF Page Wrapper ---
const PdfSlide: React.FC<{ children: React.ReactNode; pageNumber: number; totalPages: number; themeColor?: 'teal' | 'blue' | 'gray' }> = ({ children, pageNumber, totalPages, themeColor = 'gray' }) => (
    <div className="bg-white font-sans relative overflow-hidden" style={{ width: '800px', height: '1131px', display: 'flex', flexDirection: 'column', pageBreakAfter: 'always' }}>
        <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '200px', height: '200px', backgroundColor: 'rgba(130, 213, 227, 0.7)', clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
        <div style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: '250px', height: '250px', backgroundColor: 'rgba(20, 114, 115, 0.8)', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}></div>
        
        <div className="flex-grow p-12 flex flex-col relative z-10">
            {children}
        </div>
        <footer className={`p-4 border-t-2 border-gray-200 text-xs text-gray-500 flex justify-between items-center bg-gray-50 relative z-10`}>
            <span>Trillion Business / Your Growth Plan</span>
            <span>Page {pageNumber} of {totalPages}</span>
        </footer>
    </div>
);


// --- Individual Slide Components ---

const TitleSlide: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="text-center flex flex-col justify-center items-center h-full bg-gray-50 rounded-lg p-8">
        <p className="font-bold uppercase tracking-widest" style={{color: '#147273'}}>A Simple Plan to Help You Grow</p>
        <h1 className="text-6xl font-black tracking-tighter mt-4 text-gray-900">{title}</h1>
        <p className="text-xl text-gray-600 mt-6 max-w-2xl">{subtitle}</p>
        <div className="mt-auto border-t-4 border-[#147273] w-1/4"></div>
    </div>
);

const ProblemSlide: React.FC<{ diagnosis: GeneratedPlaybook['diagnosis'] }> = ({ diagnosis }) => (
    <>
        <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-red-400 pb-2">The Real Problem...</h2>
        <p className="text-lg text-gray-600 mt-4">Every business is held back by one key thing. For you, it's this:</p>
        <div className="mt-8 space-y-6 flex-grow flex flex-col justify-center">
            {diagnosis.constraints.map((constraint, i) => (
                <div key={i} className="p-8 bg-red-50 border-l-8 border-red-500 shadow-xl">
                    <p className="text-3xl text-gray-800 leading-relaxed font-semibold">"{constraint}"</p>
                </div>
            ))}
        </div>
        <div className="mt-auto pt-8">
            <p className="text-gray-600 text-center text-lg">The good news? We have a plan to fix it, permanently.</p>
        </div>
    </>
);

const VisionSlide: React.FC<{ diagnosis: GeneratedPlaybook['diagnosis'] }> = ({ diagnosis }) => (
    <>
        <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-green-400 pb-2">...And The Perfect Future</h2>
        <p className="text-lg text-gray-600 mt-4">Imagine if, instead of that problem, you could simply...</p>
        <div className="mt-8 p-8 bg-green-50 border-l-8 border-green-500 shadow-xl flex-grow flex flex-col justify-center">
            <p className="text-3xl text-gray-800 leading-relaxed font-semibold">...successfully <strong className="text-green-700">{diagnosis.actions[0]}</strong>?</p>
        </div>
        <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-700 text-center">This is the goal. The following offer is the vehicle to get you there.</h3>
        </div>
    </>
);

const OfferPromiseSlide: React.FC<{ offer: GeneratedOffer; type: 'Grand Slam' | 'Tripwire' }> = ({ offer, type }) => {
    const themeColor = type === 'Grand Slam' ? '#147273' : '#82D5E3';
    const offerTypeName = type === 'Grand Slam' ? "Your 'Grand Slam' Offer" : "Your 'Hello' Offer";
    return (
        <div className={`text-center flex flex-col justify-center items-center h-full bg-gray-50 rounded-lg p-8 border-4`} style={{borderColor: themeColor}}>
            <p className={`font-bold uppercase tracking-widest`} style={{color: themeColor}}>{offerTypeName}</p>
            <h2 className={`text-5xl font-black tracking-tighter mt-4 text-gray-900`}>{offer.name}</h2>
            <div className={`mt-12 border-t-2 w-1/4`} style={{borderColor: themeColor}}></div>
            <p className="text-2xl text-gray-700 mt-12 max-w-2xl italic leading-relaxed">"{offer.promise}"</p>
        </div>
    );
};

const ValueStackSlide: React.FC<{ offer: GeneratedOffer; type: 'Grand Slam' | 'Tripwire' }> = ({ offer, type }) => {
    const themeColor = type === 'Grand Slam' ? '#147273' : '#82D5E3';
    return (
         <>
            <h2 className={`text-4xl font-bold text-gray-800 border-b-4 pb-2`} style={{borderColor: themeColor}}>Here's Everything You Get</h2>
            <p className="text-lg text-gray-600 mt-4">To make this irresistible, we've solved every problem you might face:</p>
            <div className="mt-6 space-y-3">
                {offer.stack.map((item, index) => (
                    <div key={index} className="bg-gray-100 p-3 rounded-lg border-l-4 border-green-400 shadow-sm flex items-center gap-4">
                      <span className="text-3xl text-green-500">✓</span>
                      <div>
                        <p className="font-bold text-gray-800 text-lg">{item.solution}</p>
                      </div>
                      <p className="font-black text-green-600 text-lg whitespace-nowrap ml-auto">{item.value}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

const PriceRevealSlide: React.FC<{ offer: GeneratedOffer, type: 'Grand Slam' | 'Tripwire' }> = ({ offer, type }) => {
    const themeColor = type === 'Grand Slam' ? '#147273' : '#82D5E3';
     return (
        <div className="flex flex-col h-full text-center">
            <h2 className={`text-4xl font-bold text-gray-800`}>The Value vs. Your Investment</h2>
            <div className="flex-grow flex flex-col items-center justify-center mt-8">
                <p className="text-2xl font-semibold text-gray-600">Total Value:</p>
                <p className="text-7xl font-bold text-red-500 line-through my-4">{offer.totalValue}</p>

                <p className="text-2xl font-semibold text-gray-800 mt-12">Your Price:</p>
                <div className={`my-4 p-8 rounded-full shadow-2xl`} style={{backgroundColor: themeColor}}>
                    <p className={`text-8xl font-black text-white`}>{offer.price}</p>
                </div>
            </div>
        </div>
    );
};

const GuaranteeSlide: React.FC<{ offer: GeneratedOffer, type: 'Grand Slam' | 'Tripwire' }> = ({ offer, type }) => {
    const themeColor = type === 'Grand Slam' ? '#147273' : '#82D5E3';
    return (
        <div className="h-full flex flex-col justify-center items-center text-center">
            <h2 className={`text-4xl font-bold text-gray-800`}>And It's Completely Risk-Free</h2>
            <div className={`mt-8 p-12 bg-gray-50 rounded-lg border-4 border-dashed w-full max-w-3xl shadow-lg`} style={{borderColor: themeColor}}>
                <p className="text-3xl text-gray-700 italic leading-relaxed">"{offer.guarantee}"</p>
            </div>
            <p className="mt-8 text-gray-600 max-w-2xl text-lg">You can't lose. The only way you lose is by doing nothing.</p>
        </div>
    );
};

const OfferPresentationPdf: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => {
    const slides: { component: React.ReactNode, theme: 'teal' | 'blue' | 'gray' }[] = [];

    slides.push({ component: <TitleSlide title="Your Growth Blueprint" subtitle={playbook.diagnosis.yourRole} />, theme: 'gray' });
    slides.push({ component: <ProblemSlide diagnosis={playbook.diagnosis} />, theme: 'gray' });
    slides.push({ component: <VisionSlide diagnosis={playbook.diagnosis} />, theme: 'gray' });

    // Offer 1 Slides
    slides.push({ component: <OfferPromiseSlide offer={playbook.offer1} type="Grand Slam" />, theme: 'teal' });
    slides.push({ component: <ValueStackSlide offer={playbook.offer1} type="Grand Slam" />, theme: 'teal' });
    slides.push({ component: <PriceRevealSlide offer={playbook.offer1} type="Grand Slam" />, theme: 'teal' });
    slides.push({ component: <GuaranteeSlide offer={playbook.offer1} type="Grand Slam" />, theme: 'teal' });
    
    // Offer 2 Slides
    slides.push({ component: <OfferPromiseSlide offer={playbook.offer2} type="Grand Slam" />, theme: 'teal' });
    slides.push({ component: <ValueStackSlide offer={playbook.offer2} type="Grand Slam" />, theme: 'teal' });
    slides.push({ component: <PriceRevealSlide offer={playbook.offer2} type="Grand Slam" />, theme: 'teal' });
    slides.push({ component: <GuaranteeSlide offer={playbook.offer2} type="Grand Slam" />, theme: 'teal' });
    
    // Downsell/Tripwire Offer Slides
    slides.push({ component: <OfferPromiseSlide offer={playbook.downsell.offer} type="Tripwire" />, theme: 'blue' });
    slides.push({ component: <ValueStackSlide offer={playbook.downsell.offer} type="Tripwire" />, theme: 'blue' });
    slides.push({ component: <PriceRevealSlide offer={playbook.downsell.offer} type="Tripwire" />, theme: 'blue' });
    
    const totalPages = slides.length;

  return (
    <div>
        {slides.map((slide, index) => (
            <PdfSlide key={index} pageNumber={index + 1} totalPages={totalPages} themeColor={slide.theme}>
                {slide.component}
            </PdfSlide>
        ))}
    </div>
  );
};

export default OfferPresentationPdf;