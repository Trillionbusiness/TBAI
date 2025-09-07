import React from 'react';
import { GeneratedMoneyModel, MoneyModelStep } from '../../types';

// --- Storybook Theming Components ---
const StorybookPage: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => (
    <div className={`p-10 bg-[#f0fff0] font-sans text-gray-800 break-after-page relative overflow-hidden border-8 border-green-300 rounded-3xl ${className}`} style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", width: '800px', minHeight: '1131px', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)' }}>
        <div className="absolute top-8 left-8 text-5xl">☀️</div>
        <div className="relative z-10">{children}</div>
    </div>
);

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-green-800 tracking-tighter text-center">{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-green-600 mt-4 text-center">{children}</p>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-lg text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;


const FunnelDiagramSection: React.FC<{ steps: MoneyModelStep[] }> = ({ steps }) => (
    <div className="break-inside-avoid text-center">
        <h2 className="text-4xl font-bold text-gray-800 my-6">How Your Tree Grows!</h2>
        <div className="space-y-2 mt-6 relative flex flex-col items-center">
            {/* Tree Trunk */}
            <div className="absolute top-10 bottom-10 w-4 bg-yellow-600 rounded-full" style={{left: 'calc(50% - 8px)'}}></div>
            {steps.sort((a,b) => a.stepNumber - b.stepNumber).map((step, index) => (
                <div key={index} className={`flex items-center w-full z-10 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                     <div className={`w-2/5 p-4 bg-green-100 rounded-lg border-2 border-green-300`}>
                        <p className="font-bold text-gray-800 text-lg">{step.title}</p>
                        <p className="text-sm text-gray-600">{step.offerName} for <span className="font-bold text-green-700">{step.price}</span></p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);


const StepDetailSection: React.FC<{ step: MoneyModelStep }> = ({ step }) => (
    <div className="break-before-page pt-10">
        <div className="flex items-center justify-center text-center">
            <div className="bg-yellow-400 text-gray-900 font-black w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg">{step.stepNumber}</div>
            <div className="ml-4">
                <p className="text-xl font-bold text-gray-500 uppercase">Branch {step.stepNumber}</p>
                <h2 className="text-4xl font-bold text-gray-800">{step.title}</h2>
            </div>
        </div>
        
        <div className="mt-6 p-6 bg-yellow-100 rounded-2xl shadow-inner text-center">
            <p className="font-bold text-2xl text-gray-800">{step.offerName}</p>
            <p className="font-black text-3xl text-green-600">{step.price}</p>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 border-4 border-dashed border-blue-200 rounded-2xl">
            <h3 className="font-bold text-2xl text-blue-800">🎯 The Goal of this Branch</h3>
            <P className="text-base">{step.rationale}</P>
        </div>
        <div className="mt-6 p-4 bg-green-50 border-4 border-dashed border-green-200 rounded-2xl">
            <h3 className="font-bold text-2xl text-green-800">🛠️ How to Make it Grow</h3>
            <P className="text-base whitespace-pre-wrap">{step.details}</P>
        </div>
    </div>
);


interface CfaModelPdfProps {
  moneyModel: GeneratedMoneyModel;
}

const CfaModelPdf: React.FC<CfaModelPdfProps> = ({ moneyModel }) => {
  return (
    <>
    <StorybookPage>
        <header className="text-center mb-12 pb-6 border-b-8 border-dashed border-green-400">
            <div className="text-9xl mb-4">🌳</div>
            <Title>{moneyModel.title}</Title>
            <Subtitle>A magical story about planting seeds that grow into a giant money tree!</Subtitle>
        </header>
        <main>
            <div className="text-center p-6 bg-yellow-50 rounded-2xl border-4 border-yellow-200 break-inside-avoid my-6">
                <h3 className="text-3xl font-bold text-yellow-800">The Secret Magic Spell</h3>
                <P className="italic text-2xl">"{moneyModel.corePrinciple}"</P>
            </div>
            <FunnelDiagramSection steps={moneyModel.steps} />
        </main>
    </StorybookPage>
    {moneyModel.steps.sort((a,b) => a.stepNumber - b.stepNumber).map(step => (
        <StorybookPage key={step.stepNumber}>
            <StepDetailSection step={step} />
        </StorybookPage>
    ))}
    </>
  );
};

export default CfaModelPdf;
