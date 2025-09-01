
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
                      {/* FIX: The path data was truncated. Completed the SVG path data. */}
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
            <div className={`transition-all duration-500 ease-in-out overflow-hidden playbook-step-content ${isExpanded ? 'max-h-[20000px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
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
  const [openStep, setOpenStep] = useState<number | null>(null);

  const toggleStep = (stepNumber: number) => {
    if (isStatic) return;
    setOpenStep(openStep === stepNumber ? null : stepNumber);
  };
  
  const allSteps = [
    { 
      number: 1, 
      title: 'Diagnosis & Roadmap (The GPS)', 
      subtitle: 'Your current location and the path to your destination.', 
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
      title: 'The Grand Slam Offer (The Foundation)', 
      subtitle: 'The irresistible deal that makes people feel stupid saying no.', 
      component: (
        <div className="space-y-8">
          <Step3Offers offer1={playbook.offer1} offer2={playbook.offer2} onDownloadAsset={onDownloadAsset} onPreviewAsset={onPreviewAsset} isAnyPdfGenerating={isAnyPdfGenerating} generatingAsset={generatingAsset} onDownloadAllAssets={onDownloadAllAssets} generatingAssetBundleFor={generatingAssetBundleFor} pdfProgress={pdfProgress} isStatic={isStatic} onPreviewPdf={onPreviewPdf} />
          <DownsellOffer downsell={playbook.downsell} onDownloadAsset={onDownloadAsset} onPreviewAsset={onPreviewAsset} isAnyPdfGenerating={isAnyPdfGenerating} generatingAsset={generatingAsset} pdfProgress={pdfProgress} isStatic={isStatic} onPreviewPdf={onPreviewPdf}/>
        </div>
      ) 
    },
    { 
      number: 3, 
      title: 'The Leads Engine', 
      subtitle: 'The machine that finds your ideal customers.', 
      component: (
        <div className="space-y-8">
          <Step5MarketingModel marketingModel={playbook.marketingModel} isStatic={isStatic} />
          <SalesFunnel salesFunnel={playbook.salesFunnel} />
          {playbook.salesSystem && <SalesSystem salesSystem={playbook.salesSystem} isStatic={isStatic} />}
        </div>
      ) 
    },
    { 
      number: 4, 
      title: 'The Money Model (The Fuel System)', 
      subtitle: 'The economic engine that funds your growth.', 
      component: (
        <div className="space-y-8">
          <MoneyModelAnalysis analysis={playbook.moneyModelAnalysis} />
          <MoneyModelMechanisms moneyModelMechanisms={playbook.moneyModelMechanisms} />
          <MoneyModelFunnel moneyModel={playbook.moneyModel} />
          <Step4ProfitPath profitPath={playbook.profitPath} isStatic={isStatic} />
        </div>
      ) 
    },
  ];

  return (
    <div className="space-y-8">
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
