import React from 'react';
import { BusinessData, GeneratedPlaybook } from '../../types';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-5xl font-black text-gray-900 tracking-tight">{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-3xl font-bold text-gray-800 border-b-4 border-yellow-400 pb-3 mb-6 mt-10 break-after-avoid">{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;

const Step: React.FC<{ number: number, title: string, children: React.ReactNode, icon: string }> = ({ number, title, children, icon }) => (
    <div className="flex items-start mt-6">
        <div className="flex-shrink-0 flex flex-col items-center mr-6">
            <div className="bg-yellow-400 text-gray-900 font-black w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg">{number}</div>
            <div className="text-4xl mt-2">{icon}</div>
        </div>
        <div>
            <h3 className="font-bold text-2xl text-gray-800">{title}</h3>
            <div className="text-gray-600">{children}</div>
        </div>
    </div>
);


interface ZipGuidePdfProps {
  businessData: BusinessData;
  playbook: GeneratedPlaybook;
}

const ZipGuidePdf: React.FC<ZipGuidePdfProps> = ({ businessData, playbook }) => {
    return (
        <div className="p-12 bg-white font-sans text-gray-900">
            <header className="text-center mb-12 pb-6 border-b-8 border-yellow-400">
                 <div className="inline-block bg-yellow-400 text-gray-900 font-black text-4xl p-6 rounded-2xl transform -rotate-6 shadow-2xl">
                    START HERE
                </div>
                <Title>Your Business Growth Kit</Title>
                <Subtitle>A quick guide to your new business assets for <strong className="text-gray-800">{businessData.businessType}</strong>.</Subtitle>
            </header>

            <main>
                <P className="text-lg">Congratulations! You now have a complete, AI-powered business plan. This isn't just a collection of documents; it's a step-by-step roadmap to get more customers, make more money, and grow your business.</P>
                
                <SectionTitle>Your Simple 3-Step Quickstart Guide</SectionTitle>
                
                <Step number={1} title="Unzip The File" icon="📦">
                    <P>First, make sure you've "unzipped" or "extracted" this entire folder to a new location on your computer.</P>
                </Step>
                
                 <Step number={2} title="Open The Dashboard" icon="🖱️">
                    <P>Find the file named <strong className="font-mono bg-gray-200 p-1 rounded">index.html</strong> and double-click to open it in your web browser (like Chrome or Safari). This is your central hub.</P>
                </Step>

                <Step number={3} title="Explore Your Plan" icon="🗺️">
                    <P>Use the dashboard to click through all your new documents and assets. Everything is linked from there for easy access.</P>
                </Step>
                
                <div className="mt-12 text-center p-8 bg-gray-800 text-white rounded-lg">
                    <h3 className="text-3xl font-black text-yellow-400">You have the plan. Now go do the work.</h3>
                    <P className="text-lg mt-2 text-gray-300">Good luck!</P>
                </div>
            </main>
        </div>
    );
};

export default ZipGuidePdf;
