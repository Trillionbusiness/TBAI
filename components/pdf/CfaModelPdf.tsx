import React from 'react';
import { GeneratedMoneyModel, MoneyModelStep } from '../../types';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-4xl font-black text-gray-900 tracking-tight">{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-lg text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-3xl font-bold text-gray-800 border-b-4 border-yellow-400 pb-3 mb-6 mt-10 break-after-avoid">{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-700 leading-relaxed my-3 ${className}`}>{children}</p>;
const HighlightBox: React.FC<{ children: React.ReactNode, title?: string, color?: 'yellow' | 'blue' }> = ({ children, title, color = 'yellow' }) => {
    const bgColor = color === 'yellow' ? 'bg-yellow-50' : 'bg-blue-50';
    const borderColor = color === 'yellow' ? 'border-yellow-300' : 'border-blue-300';
    const titleColor = color === 'yellow' ? 'text-yellow-800' : 'text-blue-800';
    return (
        <div className={`p-6 rounded-lg border-2 ${borderColor} ${bgColor} my-6 break-inside-avoid shadow-md`}>
            {title && <h3 className={`text-xl font-bold ${titleColor} mb-2 flex items-center`}><span className="text-2xl mr-2">💡</span>{title}</h3>}
            {children}
        </div>
    );
};
const StepIcon: React.FC<{ number: number | string }> = ({ number }) => (
    <div className="flex-shrink-0 bg-yellow-400 text-gray-900 font-black w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg">{number}</div>
);

// --- PDF Content Sections ---
const TitleSection: React.FC<{ model: GeneratedMoneyModel }> = ({ model }) => (
    <header className="text-center mb-12 pb-6 border-b-8 border-yellow-400">
        <p className="text-yellow-500 font-bold uppercase tracking-widest">Your Guide To</p>
        <Title>{model.title}</Title>
        <Subtitle>A step-by-step visual plan to get new customers and have them pay for your growth.</Subtitle>
    </header>
);

const FunnelDiagramSection: React.FC<{ steps: MoneyModelStep[] }> = ({ steps }) => (
    <div className="break-inside-avoid">
        <SectionTitle>Your Money Funnel at a Glance</SectionTitle>
        <P>This is the journey a customer takes through your offers. Each step is designed to increase value for them and profit for you, creating a self-funding system.</P>
        <div className="space-y-4 mt-6">
            {steps.sort((a,b) => a.stepNumber - b.stepNumber).map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                    <div className="flex items-center w-full">
                        <StepIcon number={step.stepNumber} />
                        <div className="flex-grow p-4 bg-gray-100 rounded-lg border-2 border-gray-200 ml-4">
                            <p className="font-bold text-gray-800 text-lg">{step.title}</p>
                            <p className="text-sm text-gray-600">{step.offerName} at <span className="font-bold text-green-600">{step.price}</span></p>
                        </div>
                    </div>
                    {index < steps.length - 1 && (
                        <div className="h-8 w-1 bg-gray-300 border-l-2 border-r-2 border-dotted border-gray-400 my-2" aria-hidden="true"></div>
                    )}
                </div>
            ))}
        </div>
    </div>
);


const StepDetailSection: React.FC<{ step: MoneyModelStep }> = ({ step }) => (
    <div className="break-before-page pt-10">
        <div className="flex items-center">
            <StepIcon number={step.stepNumber} />
            <div className="ml-4">
                <p className="text-sm font-bold text-gray-500 uppercase">Step {step.stepNumber}</p>
                <h2 className="text-3xl font-bold text-gray-800">{step.title}</h2>
            </div>
        </div>
        
        <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-inner">
            <p className="font-bold text-xl text-gray-800">{step.offerName}</p>
            <p className="font-black text-2xl text-green-600">{step.price}</p>
            <p className="font-mono text-sm uppercase tracking-wider text-blue-700 bg-blue-100 inline-block px-2 py-1 rounded mt-2">{step.hormoziTactic}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                <h3 className="font-bold text-lg text-blue-800">🎯 The Goal</h3>
                <P className="text-sm">{step.rationale}</P>
            </div>
             <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                <h3 className="font-bold text-lg text-green-800">🛠️ How to Do It</h3>
                <P className="text-sm whitespace-pre-wrap font-mono">{step.details}</P>
            </div>
        </div>

        <div className="mt-6 p-4 border border-red-200 bg-red-50 rounded-lg break-inside-avoid">
            <h4 className="font-bold text-red-800 flex items-center"><span className="text-xl mr-2">⚠️</span>Common Mistakes to Avoid</h4>
            <ul className="list-disc list-inside text-sm text-red-700 mt-2">
                <li>Trying to sell the next step before you've delivered amazing value on this one.</li>
                <li>Making the offer too complicated. It should be a simple, clear "yes".</li>
                <li>Not having a clear follow-up plan for what happens after they buy.</li>
            </ul>
        </div>
    </div>
);

const SummarySection: React.FC<{ model: GeneratedMoneyModel }> = ({ model }) => (
    <div className="break-before-page pt-10">
        <SectionTitle>Putting It All Together</SectionTitle>
        <P>{model.summary}</P>
        <HighlightBox title="Why This System is So Powerful">
            <P>By following this model, you create a predictable engine for growth. You're no longer guessing where your next customer will come from. You have a clear path that takes a stranger, turns them into a customer, and uses the money they give you to find the next one. This is how businesses scale without needing outside investment.</P>
        </HighlightBox>
        <P>Your next step is to build out the offers for each step of this model. Focus on making each one so good that it's an easy "yes" for your ideal customer.</P>
    </div>
);

interface CfaModelPdfProps {
  moneyModel: GeneratedMoneyModel;
}

const CfaModelPdf: React.FC<CfaModelPdfProps> = ({ moneyModel }) => {
  return (
    <div className="p-12 bg-white font-sans text-gray-900">
      <TitleSection model={moneyModel} />
      <main>
        <div className="text-center p-6 bg-yellow-50 rounded-lg border-2 border-yellow-200 break-inside-avoid my-6">
            <h3 className="text-2xl font-bold text-yellow-800">The Core Principle</h3>
            <P className="italic text-xl">"{moneyModel.corePrinciple}"</P>
        </div>
        <FunnelDiagramSection steps={moneyModel.steps} />
        {moneyModel.steps.sort((a,b) => a.stepNumber - b.stepNumber).map(step => (
            <StepDetailSection key={step.stepNumber} step={step} />
        ))}
        <SummarySection model={moneyModel} />
      </main>
    </div>
  );
};

export default CfaModelPdf;
