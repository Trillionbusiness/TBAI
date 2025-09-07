import React from 'react';
import { GeneratedOffer, OfferStackItem } from '../../types';
import MarkdownRenderer from '../common/MarkdownRenderer';

const PageLayout: React.FC<{ children: React.ReactNode, isCover?: boolean }> = ({ children, isCover = false }) => (
    <div className={`p-12 bg-[#fdf8e1] font-sans text-gray-800 break-after-page relative overflow-hidden`} style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", width: '800px', minHeight: '1131px', border: '10px solid #c4a35a', borderStyle: 'double' }}>
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


const CoverPage: React.FC<{ offer: GeneratedOffer }> = ({ offer }) => (
    <PageLayout isCover={true}>
        <div className="flex flex-col h-full pt-20 text-center items-center justify-center">
            <p className="font-semibold text-gray-600 uppercase tracking-widest text-2xl">Your Secret</p>
            <h1 className="text-8xl font-black tracking-tight mt-4 text-purple-900">Book of Spells</h1>
            <div className="mt-12 mb-8 h-1 bg-yellow-600 w-1/2"></div>
            <p className="text-2xl text-gray-700 mt-4 max-w-2xl">All the magical recipes and secret formulas for the</p>
            <p className="text-4xl font-bold text-purple-700 mt-2">"{offer.name}"</p>
        </div>
    </PageLayout>
);

const AssetHeader: React.FC<{ type: string; title: string }> = ({ type, title }) => (
    <header className="mb-8 pb-4 border-b-2 border-dashed border-yellow-700 text-center">
        <p className="font-bold uppercase tracking-wider capitalize text-yellow-800">{type}</p>
        <p className="font-semibold text-sm text-gray-600">From the Great Book of "{title}"</p>
    </header>
);

const AssetPage: React.FC<{ asset: NonNullable<OfferStackItem['asset']>, offerName: string }> = ({ asset, offerName }) => (
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
