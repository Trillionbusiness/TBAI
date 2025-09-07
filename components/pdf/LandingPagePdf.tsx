import React from 'react';
import { GeneratedPlaybook, BusinessData } from '../../types';

// Reusable PDF Components
const SectionTitle: React.FC<{ children: React.ReactNode; className?: string, icon?: string }> = ({ children, icon, className }) => <h2 className={`text-3xl font-bold text-yellow-800 mt-10 mb-4 flex items-center gap-3 ${className}`}><span>{icon}</span> {children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-lg text-gray-700 leading-relaxed ${className || ''}`}>{children}</p>;
const CheckListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-start my-2">
        <span className="text-3xl text-green-500 mr-3">✔️</span>
        <P className="flex-grow">{children}</P>
    </div>
);
const DoodledBox: React.FC<{ children: React.ReactNode, className?: string, title: string }> = ({ children, className, title }) => (
    <div className={`w-full bg-white border-4 border-gray-800 rounded-2xl flex flex-col p-4 relative ${className}`}>
        <div className="absolute -top-4 left-4 bg-yellow-300 px-3 py-1 rounded-lg text-gray-800 font-bold text-sm border-2 border-gray-800">{title}</div>
        <div className="mt-4">{children}</div>
    </div>
);

interface LandingPagePdfProps {
    playbook: GeneratedPlaybook;
    businessData: BusinessData;
}

const LandingPagePdf: React.FC<LandingPagePdfProps> = ({ playbook, businessData }) => {
    const offer = playbook.offer1; 

    return (
        <div className="p-10 bg-blue-100 font-sans text-gray-900" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", border: '10px solid #4a3323', backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23a0d1e3\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-gray-800">
                <div className="p-6 text-center border-b-4 border-gray-800">
                    <p className="text-xl font-bold uppercase tracking-wider text-yellow-600">Blueprint For</p>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight mt-2">Your Welcome Treehouse</h1>
                    <P className="text-xl mt-3 max-w-3xl mx-auto">A special webpage to invite all your friends!</P>
                </div>

                <div className="p-10">
                    <SectionTitle icon="👋">The Big Welcome Sign (Headline)</SectionTitle>
                    <DoodledBox title="Your Big Promise">
                        <p className="text-3xl font-bold text-center text-blue-700">"{offer.promise}"</p>
                    </DoodledBox>

                    <SectionTitle icon="📸">The Cool View from the Top (Picture/Video)</SectionTitle>
                     <DoodledBox title="Put a fun picture here!" className="items-center justify-center h-64">
                        <p className="text-gray-500 font-semibold text-2xl">🖼️</p>
                        <p className="text-gray-500 font-semibold">A video or picture of your happy customers!</p>
                    </DoodledBox>
                    
                    <SectionTitle icon="🤔">Why Your Friends Should Visit (The Problem)</SectionTitle>
                    <div className="grid grid-cols-3 gap-4">
                        {playbook.diagnosis.constraints.slice(0,3).map((c, i) => (
                             <DoodledBox key={i} title={`Problem #${i+1}`} className="bg-red-50 border-red-500">
                                <p className="font-semibold text-red-800 text-center">"{c}"</p>
                             </DoodledBox>
                        ))}
                    </div>
                    
                     <SectionTitle icon="🎁">All the Toys Inside! (What They Get)</SectionTitle>
                     <DoodledBox title="Your Treasure Chest">
                        <div className="space-y-2">
                            {offer.stack.map((item, index) => <CheckListItem key={index}>{item.solution} ({item.value})</CheckListItem>)}
                        </div>
                    </DoodledBox>

                     <SectionTitle icon="🎟️">The Secret Password (Call to Action)</SectionTitle>
                     <DoodledBox title="The Magic Button" className="bg-green-100 border-green-500 items-center">
                        <div className="p-4 bg-green-500 text-white font-bold text-3xl rounded-lg shadow-lg cursor-pointer">
                           Let Me In!
                        </div>
                         <p className="text-center text-lg mt-4 font-bold text-green-800">For just {offer.price}!</p>
                         <p className="text-center mt-4 italic">And don't forget our pinky-promise: "{offer.guarantee}"</p>
                    </DoodledBox>
                </div>
            </div>
        </div>
    );
};

export default LandingPagePdf;
