
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
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 