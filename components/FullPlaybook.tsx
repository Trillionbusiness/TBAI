
import React, { useState } from 'react';
import { GeneratedPlaybook, OfferStackItem, GeneratedOffer, PreviewConfig, KpiEntry, WeeklyDebrief } from '../types';
import Step2Diagnosis from './Step2Diagnosis';
import MoneyModelAnalysis from './MoneyModelAnalysis';
import MoneyModelMechanisms from './MoneyModelMechanisms';
import Step3Offers from './Step3Offers';
import DownsellOffer from './DownsellOffer';
import Step4ProfitPath from './Step4ProfitPath';
import Step5MarketingModel from './Step5MarketingModel';
import MoneyModelFunnel from './MoneyModelFunnel';
import OperationsPlan from './OperationsPlan';
import SalesFunnel from './SalesFunnel';
import KpiDashboard from './KpiDashboard';
import SalesSystem from './SalesSystem';
import PurchasePlan from './PurchasePlan';

interface FullPlaybookProps {
    playbook: GeneratedPlaybook;
    onDownloadAsset: (item: OfferStackItem) => void;
    onPreviewAsset: (item: OfferStackItem) => void;
    onPreviewPdf: (config: PreviewConfig) => void;
    isAnyPdfGenerating: boolean;
    generatingAsset: OfferStackItem | null;
    onDownloadAllAssets: (offer: GeneratedOffer) => void;
    generatingAssetBundleFor: string | null;
    pdfProgress: number;
    isStatic?: boolean;
    onDownloadZip: () => void;
    isZipping: boolean;
    zipProgress: number;
    kpiEntries: KpiEntry[];
    weeklyDebriefs: WeeklyDebrief[];
    onSaveKpiEntry: (entry: KpiEntry) => void;
    onGenerateDebrief: () => void;
    isGeneratingDebrief: boolean;
}

interface PlaybookStepProps {
    number: number;
    title: string;
    subtitle: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
    isStatic?: boolean;
}

const PlaybookStep: React.FC<PlaybookStepProps> = ({ number, title, subtitle, children, isOpen, onToggle, isStatic }) => {
    const headerContent = (
        <div className="relative pl-12 md:pl-16">
             <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-gray-900 font-black text-2xl rounded-full" style={{backgroundColor: 'var(--accent-color)'}}>
                {number}
            </div>
            <div className="pl-4 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight" style={{color: 'var(--text-dark)'}}>{title}</h2>
                    <p className="mb-2" style={{color: 'var(--text-light)'}}>{subtitle}</p>
                </div>
                {!isStatic && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`playbook-step-toggle-icon h-8 w-8 transform transition-transform flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`}
                      style={{color: 'var(--primary-color)'}}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                )}
            </div>
        </div>
    );
    const isExpanded = isStatic || isOpen;

    return (
        <section className="playbook-step">
            <button onClick={onToggle} className="w-full text-left cursor-pointer" disabled={isStatic}>
                {headerContent}
            </button>
            <div 
              className="playbook-step-content"
              style={{
                transition: 'max-height 0.7s ease-in-out, opacity 0.5s ease-in-out 0.2s, margin-top 0.7s ease-in-out',
                maxHeight: isExpanded ? '20000px' : '0px',
                opacity: isExpanded ? 1 : 0,
                overflow: 'hidden',
                marginTop: isExpanded ? '2rem' : '0'
              }}
            >
                {children}
            </div>
        </section>
    );
};

const FullPlaybook: React.FC<FullPlaybookProps> = ({ 
    playbook, 
    onDownloadAsset, 
    onPreviewAsset,
    onPreviewPdf,
    isAnyPdfGenerating,
    generatingAsset,
    onDownloadAllAssets,
    generatingAssetBundleFor,
    pdfProgress,
    isStatic = false,
    onDownloadZip,
    isZipping,
    zipProgress,
    kpiEntries,
    weeklyDebriefs,
    onSaveKpiEntry,
    onGenerateDebrief,
    isGeneratingDebrief,
}) => {
  const [openStep, setOpenStep] = useState<number | null>(1);

  const toggleStep = (stepNumber: number) => {
    if (isStatic) return;
    setOpenStep(openStep === stepNumber ? null : stepNumber);
  };
  
  const allSteps = [
    { 
      number: 1, 
      title: 'Step 1: Find Your Bottleneck', 
      subtitle: "First, we find the single biggest thing holding you back. The entire plan is built around fixing this one thing.", 
      component: (
        <div className="space-y-8">
          <Step2Diagnosis diagnosis={playbook.diagnosis} />
          <OperationsPlan operationsPlan={playbook.operationsPlan} />
          <KpiDashboard 
            kpiDashboard={playbook.kpiDashboard}
            kpiEntries={kpiEntries}
            weeklyDebriefs={weeklyDebriefs}
            onSaveKpiEntry={onSaveKpiEntry}
            onGenerateDebrief={onGenerateDebrief}
            isGeneratingDebrief={isGeneratingDebrief}
          />
        </div>
      ) 
    },
    { 
      number: 2, 
      title: "Step 2: Create Your 'Grand Slam' Offer",
      subtitle: "Next, we build an offer so good people feel stupid saying no. This is the foundation of all growth.",
      component: (
        <div className="space-y-8">
          <Step3Offers offer1={playbook.offer1} offer2={playbook.offer2} onDownloadAsset={onDownloadAsset} onPreviewAsset={onPreviewAsset} isAnyPdfGenerating={isAnyPdfGenerating} generatingAsset={generatingAsset} onDownloadAllAssets={onDownloadAllAssets} generatingAssetBundleFor={generatingAssetBundleFor} pdfProgress={pdfProgress} isStatic={isStatic} onPreviewPdf={onPreviewPdf} />
          <DownsellOffer downsell={playbook.downsell} onDownloadAsset={onDownloadAsset} onPreviewAsset={onPreviewAsset} isAnyPdfGenerating={isAnyPdfGenerating} generatingAsset={generatingAsset} pdfProgress={pdfProgress} isStatic={isStatic} onPreviewPdf={onPreviewPdf}/>
        </div>
      ) 
    },
    { 
      number: 3, 
      title: 'Step 3: Build Your Money Machine', 
      subtitle: "This is how you get paid to acquire customers, making growth automatic and removing cash as a constraint.",
      component: (
        <div className="space-y-8">
          <MoneyModelAnalysis analysis={playbook.moneyModelAnalysis} />
          <MoneyModelFunnel moneyModel={playbook.moneyModel} />
          <Step4ProfitPath profitPath={playbook.profitPath} isStatic={isStatic} />
          <MoneyModelMechanisms moneyModelMechanisms={playbook.moneyModelMechanisms} />
        </div>
      ) 
    },
    { 
      number: 4, 
      title: 'Step 4: Turn On the Faucet', 
      subtitle: "With a killer offer and a profitable model, it's time to generate a flood of qualified leads.",
      component: (
        <div className="space-y-8">
          <Step5MarketingModel marketingModel={playbook.marketingModel} isStatic={isStatic} />
          <SalesFunnel salesFunnel={playbook.salesFunnel} />
          {playbook.salesSystem && <SalesSystem salesSystem={playbook.salesSystem} isStatic={isStatic} />}
        </div>
      ) 
    },
  ];

  return (
    <div className="space-y-12">
      {allSteps.map(step => (
        <PlaybookStep 
          key={step.number}
          number={step.number}
          title={step.title}
          subtitle={step.subtitle}
          isOpen={isStatic ? true : openStep === step.number}
          onToggle={() => toggleStep(step.number)}
          isStatic={isStatic}
        >
          {step.component}
        </PlaybookStep>
      ))}
      {!isStatic && (
          <PurchasePlan 
            onDownloadZip={onDownloadZip}
            isZipping={isZipping}
            zipProgress={zipProgress}
          />
      )}
    </div>
  );
};

export default FullPlaybook;
