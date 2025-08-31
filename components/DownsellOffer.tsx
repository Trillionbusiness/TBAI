

import React from 'react';
// FIX: Import PreviewConfig from types.ts to resolve circular dependency with App.tsx.
import { GeneratedDownsell, OfferStackItem, PreviewConfig } from '../types';
import Card, { StrategyAccordion } from './common/Card';
import CircularProgress from './common/CircularProgress';

interface DownsellOfferProps {
  downsell: GeneratedDownsell;
  onDownloadAsset: (item: OfferStackItem) => void;
  onPreviewAsset: (item: OfferStackItem) => void;
  onPreviewPdf: (config: PreviewConfig) => void;
  isAnyPdfGenerating: boolean;
  generatingAsset: OfferStackItem | null;
  pdfProgress: number;
  isStatic?: boolean;
}

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-2xl font-black tracking-tight border-b-2 pb-2 mb-6" style={{color: 'var(--primary-color)', borderColor: 'var(--accent-color)'}}>{children}</h3>
);

const DownsellOffer: React.FC<DownsellOfferProps> = ({ downsell, onDownloadAsset, onPreviewAsset, onPreviewPdf, isAnyPdfGenerating, generatingAsset, pdfProgress, isStatic = false }) => {
  if (!downsell?.offer) {
    return null;
  }
  
  const { rationale, offer } = downsell;

  return (
    <section>
        <SectionHeader>A Simple 'Hello' Offer</SectionHeader>
        <Card className="border-blue-300" style={{backgroundColor: 'rgba(130, 213, 227, 0.1)'}}>
            <div className="mb-6">
                <h4 className="text-lg font-bold" style={{color: 'var(--primary-color)'}}>Why This Offer Works:</h4>
                <p className="italic" style={{color: 'var(--text-light)'}}>{rationale}</p>
                 {!isStatic && (
                    <div className="mt-2 text-right">
                        <button
                            onClick={() => onPreviewPdf({type: 'downsell-pamphlet'})}
                            disabled={isAnyPdfGenerating}
                            className="px-3 py-1 text-xs font-bold rounded capitalize bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50"
                            style={{color: 'var(--text-dark)'}}
                        >
                            Preview Flyer
                        </button>
                    </div>
                )}
            </div>
            
            <Card className="flex flex-col">
              <div className="flex-grow">
                <p className="font-bold text-lg leading-tight" style={{color: 'var(--text-dark)'}}>{offer.name}</p>
                <p className="italic mb-6" style={{color: 'var(--text-light)'}}>"{offer.promise}"</p>
                
                <div className="space-y-3">
                  <p className="text-sm font-semibold mb-2" style={{color: 'var(--text-light)'}}>Here is what you get:</p>
                  {offer.stack.map((item, index) => {
                      const isGeneratingThisAsset = generatingAsset === item;

                      return (
                       <div key={index} className="p-4 rounded-lg text-sm border-l-2" style={{backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-color)'}}>
                          <div className="flex justify-between items-start gap-4">
                            <p className="font-bold flex-grow" style={{color: 'var(--text-dark)'}}>{item.solution}</p>
                            <p className="font-bold text-green-600 whitespace-nowrap">{item.value}</p>
                          </div>
                          <p className="text-xs mt-1" style={{color: 'var(--text-light)'}}>
                            <span className="font-semibold">Solves Problem:</span> {item.problem}
                          </p>
                          {!isStatic && item.asset && (
                            <div className="mt-3 text-right flex items-center justify-end gap-2">
                                <button
                                    onClick={() => onPreviewAsset(item)}
                                    disabled={isAnyPdfGenerating}
                                    className="px-3 py-1 text-xs font-bold rounded capitalize bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50"
                                    style={{color: 'var(--text-dark)'}}
                                >
                                    Preview
                                </button>
                                <button
                                  onClick={() => onDownloadAsset(item)}
                                  disabled={isAnyPdfGenerating}
                                  className="px-3 py-1 text-xs font-bold rounded capitalize text-white hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                  style={{minWidth: '80px', minHeight: '26px', backgroundColor: 'var(--primary-color)'}}
                                >
                                  {isGeneratingThisAsset ? <CircularProgress progress={pdfProgress} color="light"/> : (
                                    <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    Get {item.asset.type}
                                    </>
                                  )}
                                </button>
                            </div>
                          )}
                        </div>
                      );
                  })}
                </div>

                {offer.strategyBehindStack && (
                    <StrategyAccordion title="Why This Offer Is Great" isStatic={isStatic}>
                        <p className="whitespace-pre-wrap">{offer.strategyBehindStack}</p>
                    </StrategyAccordion>
                )}
              </div>
              
              <div className="mt-auto pt-4 border-t" style={{borderColor: 'var(--border-color)'}}>
                <div className="text-right mb-4">
                  <p className="text-md font-semibold" style={{color: 'var(--text-light)'}}>All this is worth:</p>
                  <p className="text-2xl font-bold text-red-500 line-through">{offer.totalValue}</p>
                </div>

                <div className="text-right mb-4">
                  <p className="text-md font-semibold" style={{color: 'var(--text-light)'}}>Your special price:</p>
                  <p className="text-4xl font-black" style={{color: 'var(--primary-color)'}}>{offer.price}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold" style={{color: 'var(--text-light)'}}>Our Promise to You:</p>
                  <p className="font-medium italic p-3 rounded-md" style={{backgroundColor: 'var(--bg-muted)', color: 'var(--text-dark)'}}>"{offer.guarantee}"</p>
                </div>
              </div>
            </Card>
        </Card>
    </section>
  );
};

export default DownsellOffer;