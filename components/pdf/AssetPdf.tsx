import React from 'react';
import { OfferStackItem } from '../../types';
import MarkdownRenderer from '../common/MarkdownRenderer';

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="p-12 bg-white font-sans text-gray-800 relative overflow-hidden" style={{ fontFamily: 'Inter, sans-serif', width: '800px', minHeight: '1131px' }}>
         <div style={{
            position: 'absolute',
            top: '-60px',
            left: '-60px',
            width: '200px',
            height: '200px',
            backgroundColor: 'rgba(130, 213, 227, 0.7)',
            clipPath: 'polygon(0 0, 100% 0, 0 100%)'
        }}></div>
        <div className="relative z-10 flex flex-col h-full" style={{minHeight: '1035px'}}>
            {children}
        </div>
    </div>
);


const AssetHeader: React.FC<{ type: string; title: string }> = ({ type, title }) => (
    <header className="mb-8 pb-4 border-b-2 border-gray-200">
        <div className="flex justify-between items-center text-sm text-gray-500">
            <p className="font-bold uppercase tracking-wider capitalize text-[#147273]">{type}</p>
            <p className="font-semibold">{title}</p>
        </div>
    </header>
);

const AssetPdf: React.FC<{ asset: NonNullable<OfferStackItem['asset']>; offerName?: string }> = ({ asset, offerName = "Your Business Plan" }) => {
    return (
        <PageLayout>
            <AssetHeader type={asset.type} title={offerName} />
            <main className="flex-grow">
                <h1 className="text-4xl font-black text-[#147273] mb-6 tracking-tight">{asset.name}</h1>
                <div className="prose prose-lg max-w-none text-gray-800">
                    <MarkdownRenderer content={asset.content} theme="light" />
                </div>
            </main>
            <footer className="mt-12 pt-4 border-t border-gray-200 text-xs text-gray-500 text-left">
                <p className="font-bold">Trillion Business</p>
                <p>Your AI-Powered Business Plan</p>
            </footer>
        </PageLayout>
    );
};

export default AssetPdf;