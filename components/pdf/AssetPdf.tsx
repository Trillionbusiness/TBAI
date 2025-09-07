
import React from 'react';
import { OfferStackItem } from '../../types';
import MarkdownRenderer from '../common/MarkdownRenderer';

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div data-pdf-page="true" className="p-12 bg-[#fdf8e1] font-sans text-gray-800 relative overflow-hidden" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", width: '800px', minHeight: '1131px', border: '10px solid #c4a35a', borderStyle: 'double' }}>
         <div style={{ position: 'absolute', top: 10, left: 10, right: 10, bottom: 10, border: '2px solid #e0cda8' }}></div>
        <div className="absolute top-8 left-8 text-3xl">✨</div>
        <div className="absolute top-8 right-8 text-3xl">✨</div>
        <div className="absolute bottom-8 left-8 text-3xl">✨</div>
        <div className="absolute bottom-8 right-8 text-3xl">✨</div>
        <div className="relative z-10 flex flex-col h-full" style={{minHeight: '1035px'}}>
            {children}
        </div>
    </div>
);


const AssetHeader: React.FC<{ type: string; title: string }> = ({ type, title }) => (
    <header className="mb-8 pb-4 border-b-2 border-dashed border-yellow-700 text-center">
        <p className="font-bold uppercase tracking-wider capitalize text-yellow-800">{type}</p>
        <p className="font-semibold text-sm text-gray-600">From the Great Book of "{title}"</p>
    </header>
);

const AssetPdf: React.FC<{ asset: NonNullable<OfferStackItem['asset']>; offerName?: string }> = ({ asset, offerName = "Your Business Plan" }) => {
    return (
        <PageLayout>
            <AssetHeader type={asset.type} title={offerName} />
            <main className="flex-grow">
                <h1 className="text-5xl font-black text-purple-800 mb-6 tracking-tight text-center">{asset.name}</h1>
                <div className="prose prose-lg max-w-none text-gray-800 text-lg leading-relaxed">
                    <MarkdownRenderer content={asset.content} theme="light" />
                </div>
            </main>
            <footer className="mt-12 pt-4 border-t border-dashed border-yellow-700 text-xs text-yellow-900 text-center">
                <p className="font-bold">A Secret Spell from Trillion Business</p>
            </footer>
        </PageLayout>
    );
};

export default AssetPdf;
