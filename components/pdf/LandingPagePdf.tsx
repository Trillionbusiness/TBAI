import React from 'react';
import { GeneratedPlaybook, BusinessData } from '../../types';

// Reusable PDF Components
const SectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <h2 className={`text-2xl font-bold text-gray-800 mt-8 mb-4 ${className}`}>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-sm text-gray-600 leading-relaxed ${className || ''}`}>{children}</p>;
const CheckListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-start mt-2">
        <span className="text-xl text-green-500 mr-3">✓</span>
        <P className="flex-grow">{children}</P>
    </div>
);
const ImagePlaceholder: React.FC<{ text: string, className?: string }> = ({ text, className }) => (
    <div className={`w-full bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center ${className || 'h-48'}`}>
        <p className="text-gray-500 font-semibold">{text}</p>
    </div>
);

interface LandingPagePdfProps {
    playbook: GeneratedPlaybook;
    businessData: BusinessData;
}

const LandingPagePdf: React.FC<LandingPagePdfProps> = ({ playbook, businessData }) => {
    const offer = playbook.offer1; // Use the first Grand Slam Offer as the basis

    return (
        <div className="p-12 bg-gray-200 font-sans text-gray-900">
            {/* Browser Frame */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-gray-100 p-2 flex items-center border-b border-gray-300">
                    <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex-grow text-center text-xs text-gray-500 bg-white rounded-full mx-4 py-1">
                        https://yourwebsite.com/offer
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-10">
                    {/* Header */}
                    <header className="text-center">
                        <p className="text-sm font-bold uppercase tracking-wider text-yellow-500">For {businessData.targetClient}</p>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight mt-2">{offer.promise}</h1>
                        <P className="text-lg mt-3 max-w-3xl mx-auto">Stop struggling with <span className="font-semibold text-red-600">{playbook.diagnosis.constraints[0]}</span> and finally achieve the results you deserve with our all-in-one solution.</P>
                        <div className="mt-6">
                            <ImagePlaceholder text="[ Compelling Video or Hero Image ]" className="h-64" />
                        </div>
                        <div className="mt-6 p-4 bg-green-500 text-white font-bold text-xl rounded-lg shadow-lg cursor-pointer">
                            GET STARTED NOW &rarr;
                        </div>
                        <p className="text-xs text-gray-500 mt-2">100% Risk-Free Guarantee</p>
                    </header>

                    {/* Problem Section */}
                    <SectionTitle>Does This Sound Familiar?</SectionTitle>
                    <div className="grid grid-cols-3 gap-4">
                        {playbook.diagnosis.constraints.map((c, i) => (
                             <div key={i} className="p-4 bg-red-50 border-t-4 border-red-400 rounded-b-lg">
                                <p className="font-semibold text-red-800">"{c}"</p>
                             </div>
                        ))}
                    </div>
                     <P className="mt-4">It's not your fault. You're just missing one or two key pieces of the puzzle. That's where we come in.</P>
                    
                     {/* Solution Section */}
                    <SectionTitle>Introducing: The "{offer.name}"</SectionTitle>
                    <div className="flex gap-8 items-center">
                        <div className="w-2/3">
                             <P>This is the most comprehensive system ever created for helping {businessData.targetClient} to achieve their goals. We've left no stone unturned.</P>
                             <CheckListItem>{offer.stack[0]?.solution || "Achieve your primary goal faster than ever."}</CheckListItem>
                             <CheckListItem>{offer.stack[1]?.solution || "Get expert support every step of the way."}</CheckListItem>
                             <CheckListItem>{offer.stack[2]?.solution || "Eliminate all guesswork with proven templates."}</CheckListItem>
                        </div>
                        <div className="w-1/3">
                            <ImagePlaceholder text="[ Image of Product/Service ]" className="h-48"/>
                        </div>
                    </div>

                    {/* Value Stack */}
                    <SectionTitle>Here's Everything You Get:</SectionTitle>
                     <div className="space-y-2">
                        {offer.stack.map((item, index) => (
                            <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-center">
                                <p className="font-semibold text-gray-800">✅ {item.solution}</p>
                                <p className="font-bold text-green-600 text-sm whitespace-nowrap">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Pricing & Guarantee */}
                     <div className="mt-10 text-center p-8 bg-gray-800 text-white rounded-lg">
                        <h3 className="text-2xl font-bold">Total Value: <span className="text-red-400 line-through">{offer.totalValue}</span></h3>
                        <h3 className="text-4xl font-black mt-4">Get It All Today For Just: <span className="text-yellow-400">{offer.price}</span></h3>
                         <div className="mt-6 p-4 bg-green-500 text-white font-bold text-xl rounded-lg shadow-lg cursor-pointer">
                            YES, I WANT THIS!
                         </div>
                    </div>
                     <div className="mt-8 p-6 border-4 border-dashed border-yellow-400 bg-yellow-50 rounded-lg text-center">
                        <h3 className="text-2xl font-bold text-gray-800">Our "You Can't Lose" Guarantee</h3>
                        <P className="italic text-lg mt-2">"{offer.guarantee}"</P>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LandingPagePdf;
