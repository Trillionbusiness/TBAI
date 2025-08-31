import React from 'react';
import { GeneratedOffer, OfferStackItem } from '../../types';
import MarkdownRenderer from '../common/MarkdownRenderer';

const PageLayout: React.FC<{ children: React.ReactNode, isCover?: boolean }> = ({ children, isCover = false }) => (
    <div className={`p-12 bg-white font-sans text-gray-800 relative overflow-hidden break-before-page`} style={{ fontFamily: 'Inter, sans-serif', width: '800px', minHeight: '1131px' }}>
         <div style={{
            position: 'absolute',
            top: '-60px',
            left: '-60px',
            width: '200px',
            height: '200px',
            backgroundColor: 'rgba(20, 114, 115, 0.8)', // dark teal
            clipPath: 'polygon(0 0, 100% 0, 0 100%)'
        }}></div>
         <div style={{
            position: 'absolute',
            top: '-80px',
            left: '40px',
            width: '200px',
            height: '200px',
            backgroundColor: 'rgba(130, 213, 227, 0.7)', // light blue
            clipPath: 'polygon(0 0, 100% 0, 0 100%)'
        }}></div>
        {!isCover && <>
            <div style={{
                position: 'absolute',
                bottom: '-60px',
                right: '-60px',
                width: '250px',
                height: '250px',
                backgroundColor: 'rgba(20, 114, 115, 0.8)',
                clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '-80px',
                right: '40px',
                width: '250px',
                height: '250px',
                backgroundColor: 'rgba(130, 213, 227, 0.7)',
                clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
            }}></div>
        </>}
        <div className="relative z-10 flex flex-col h-full" style={{minHeight: '1035px'}}>
            {children}
        </div>
    </div>
);


const CoverPage: React.FC<{ offer: GeneratedOffer }> = ({ offer }) => (
    <PageLayout isCover={true}>
        <div className="flex flex-col h-full pt-20">
            <p className="font-semibold text-gray-600 uppercase tracking-widest">Complete Asset Library For</p>
            <h1 className="text-6xl font-black tracking-tight mt-4 max-w-3xl text-[#147273]">"{offer.name}"</h1>
            <div className="mt-12 mb-8 h-1 bg-[#82D5E3] w-1/4"></div>
            <p className="text-xl text-gray-700 mt-4 max-w-2xl">All the templates, guides, and scripts you need to deliver on your promise.</p>
            <div className="mt-auto">
                <p className="font-bold text-lg">Trillion Business</p>
            </div>
        </div>
    </PageLayout>
);

const AssetHeader: React.FC<{ type: string; title: string }> = ({ type, title }) => (
    <header className="mb-8 pb-4 border-b-2 border-gray-200">
        <div className="flex justify-between items-center text-sm text-gray-500">
            <p className="font-bold uppercase tracking-wider capitalize text-[#147273]">{type}</p>
            <p className="font-semibold">{title}</p>
        </div>
    </header>
);

const AssetPage: React.FC<{ asset: NonNullable<OfferStackItem['asset']>, offerName: string }> = ({ asset, offerName }) => (
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

const ValueStackAssetsPdf: React.FC<{ offer: GeneratedOffer }> = ({ offer }) => {
    return (
        <div style={{ width: '800px' }}>
            <CoverPage offer={offer} />
            {offer.stack.map((item, index) => {
                if (item.asset) {
                    return <AssetPage key={index} asset={item.asset} offerName={offer.name} />;
                }
                return null;
            })}
        </div>
    );
};

export default ValueStackAssetsPdf;