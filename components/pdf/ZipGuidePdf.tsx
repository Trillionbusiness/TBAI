
import React from 'react';
import { BusinessData, GeneratedPlaybook } from '../../types';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-yellow-900 tracking-tighter">{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-yellow-700 mt-2">{children}</p>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-lg text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;

const Step: React.FC<{ number: number, title: string, children: React.ReactNode, icon: string }> = ({ number, title, children, icon }) => (
    <div className="flex items-start mt-8">
        <div className="flex-shrink-0 flex flex-col items-center mr-6">
            <div className="bg-yellow-400 text-gray-900 font-black w-20 h-20 rounded-full flex items-center justify-center text-5xl shadow-lg border-4 border-yellow-600">{number}</div>
        </div>
        <div>
            <h3 className="font-bold text-3xl text-gray-800 flex items-center gap-3"><span className="text-5xl">{icon}</span> {title}</h3>
            <div className="text-gray-600 mt-2">{children}</div>
        </div>
    </div>
);


interface ZipGuidePdfProps {
  businessData: BusinessData;
  playbook: GeneratedPlaybook;
}

const ZipGuidePdf: React.FC<ZipGuidePdfProps> = ({ businessData, playbook }) => {
    return (
        <div data-pdf-page="true" className="p-12 bg-[#fdf8e1] font-sans text-yellow-900 border-8 border-yellow-500" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", width: '800px', height: '1131px', backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAADhJREFUKFNjZGBgYGBgZgABIgZCCRgZGRkggGIYGBhGFeBZGGCgmA8HwQxTDMgYhVAQAKZELBdbvovBAAAAAElFTkSuQmCC")' }}>
            <header className="text-center mb-12 pb-6 border-b-8 border-dashed border-yellow-600">
                 <div className="text-9xl mb-4">
                    💎
                </div>
                <Title>Your Treasure Chest Guide!</Title>
                <Subtitle>How to open your new Business Growth Kit.</Subtitle>
            </header>

            <main>
                <P className="text-xl text-center">Hooray! You've got a treasure chest full of goodies to help your <strong className="font-semibold">{businessData.businessType}</strong> have an amazing adventure!</P>
                
                <Step number={1} title="Find Your Treasure Chest" icon="📦">
                    <P>First, find the file you downloaded. It looks like a box with a zipper on it! This is your special treasure chest.</P>
                </Step>
                
                 <Step number={2} title="Open The Chest" icon="✨">
                    <P>Double-click the treasure chest to open it up! All your secret maps and tools will pop out into a new folder.</P>
                </Step>

                <Step number={3} title="Look at the Main Map" icon="🗺️">
                    <P>Inside the new folder, find the file called <strong className="font-mono bg-yellow-200 p-1 rounded">index.html</strong>. This is your main treasure map! Double-click it to see everything in one place.</P>
                </Step>
                
                <div className="mt-16 text-center p-8 bg-green-600 text-white rounded-2xl shadow-lg border-4 border-green-800">
                    <h3 className="text-4xl font-black">Now go have an adventure!</h3>
                </div>
            </main>
        </div>
    );
};

export default ZipGuidePdf;
