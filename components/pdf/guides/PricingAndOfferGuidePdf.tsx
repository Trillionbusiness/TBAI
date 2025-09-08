
import React from 'react';
import { BusinessData, GeneratedPlaybook } from '../../../types';

// --- Reusable Theming Components ---
const GuidePage: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => (
    <div data-pdf-page="true" className={`p-10 bg-white font-sans text-gray-800 break-after-page relative overflow-hidden border-t-8 border-yellow-400 ${className}`} style={{ fontFamily: "'Inter', sans-serif", width: '800px', minHeight: '1131px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
        <div className="absolute top-4 right-8 text-xs font-bold text-gray-400">BUSINESS UNIVERSITY WORKSHOP</div>
        <div className="relative z-10">{children}</div>
    </div>
);

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-5xl font-black text-gray-800 tracking-tighter text-center">{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-xl text-gray-500 mt-3 text-center">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className={`text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-3 mb-6 mt-10 break-after-avoid`}>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-600 leading-relaxed my-3 ${className || ''}`}>{children}</p>;
const WorksheetBox: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 my-4">
        <h3 className="font-bold text-lg text-yellow-700">{title}</h3>
        <div className="mt-2">{children}</div>
    </div>
);
const BlankLines: React.FC<{lines: number}> = ({ lines }) => (
    <div className="space-y-4 mt-2">
        {[...Array(lines)].map((_, i) => <div key={i} className="h-px bg-gray-300 w-full" />)}
    </div>
);


// --- Individual Guide Components ---

const PricingGuide: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => {
    const offer = playbook.offer1;
    return (
        <>
            <GuidePage>
                <header className="text-center mb-12 pb-6">
                    <p className="font-bold text-yellow-600">PRICING WORKSHOP</p>
                    <Title>Pricing Your Treasure</Title>
                    <Subtitle>A worksheet for calculating the perfect price for your offer: "{offer.name}"</Subtitle>
                </header>
                <main>
                    <SectionTitle>Principle: Price on Value, Not Cost</SectionTitle>
                    <P>The biggest mistake is pricing based on how much it costs you. The correct way is to price based on how much value the result is WORTH to your customer.</P>
                    <P>If you solve a $100,000 problem, a $10,000 price is a fantastic deal. If you solve a $10 problem, a $5 price might be too expensive.</P>
                    
                    <WorksheetBox title="Worksheet: Calculating Your Offer's Value">
                        <P className="text-sm">Let's quantify the value of your offer, <strong>"{offer.name}"</strong>, for your target client: <strong>{playbook.diagnosis.yourRole}</strong>.</P>
                        <div className="mt-4">
                            <p className="font-semibold text-gray-700">1. The Cost of Doing Nothing:</p>
                            <P className="text-sm">What is the financial, emotional, or time cost if your client DOESN'T solve their main problem ({playbook.diagnosis.constraints[0]})? Write it down.</P>
                            <BlankLines lines={3} />
                        </div>
                        <div className="mt-4">
                            <p className="font-semibold text-gray-700">2. The Value of the Dream Outcome:</p>
                            <P className="text-sm">Your offer promises: "{offer.promise}". What is that outcome worth to your client in money, time saved, or happiness?</P>
                            <BlankLines lines={3} />
                        </div>
                    </WorksheetBox>
                    <div className="p-6 bg-green-50 rounded-lg border-2 border-dashed border-green-300 shadow-sm my-4 text-center">
                        <h3 className="font-bold text-2xl text-green-700">The 10x Rule: Your Price vs. Its Value</h3>
                        <P className="text-green-800">Your total calculated value should be roughly 10 times your price. Your offer has a total listed value of <strong>{offer.totalValue}</strong> and a price of <strong>{offer.price}</strong>. This is a great starting point!</P>
                    </div>
                </main>
            </GuidePage>
        </>
    );
};

const EnhancingOfferGuide: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => {
    const offer = playbook.offer1;
    return (
        <>
            <GuidePage>
                <header className="text-center mb-12 pb-6">
                    <p className="font-bold text-yellow-600">OFFER ENHANCEMENT WORKSHOP</p>
                    <Title>Making Your Offer Sparkle</Title>
                    <Subtitle>The five magic spells that make your offer, "{offer.name}", impossible to resist.</Subtitle>
                </header>
                <main>
                    <P>A great offer is more than just the items in the box. It's about how you frame it. Let's apply the five key enhancers to your offer.</P>
                    
                    <WorksheetBox title="Spell #1: Scarcity (Quantity Limit)">
                        <P className="text-sm">People want what is rare. How can you limit the number of people who can buy your offer? Be honest about your capacity.</P>
                        <p className="font-semibold text-gray-700 mt-2">Brainstorm 2-3 ways to add REAL scarcity:</p>
                        <BlankLines lines={3} />
                    </WorksheetBox>

                     <WorksheetBox title="Spell #2: Urgency (Time Limit)">
                        <P className="text-sm">This creates a reason to buy NOW. How can you add a deadline?</P>
                        <p className="font-semibold text-gray-700 mt-2">Brainstorm 2-3 ways to add REAL urgency:</p>
                         <BlankLines lines={3} />
                    </WorksheetBox>
                </main>
            </GuidePage>
            <GuidePage>
                <main>
                    <SectionTitle>More Magic Spells...</SectionTitle>
                    <WorksheetBox title="Spell #3: Bonuses (Free Extras)">
                        <P className="text-sm">Bonuses increase the value massively. A good bonus solves the *next* problem your customer will have. Your offer stack already has great items. Can you add one more exclusive bonus for fast-action takers?</P>
                        <p className="font-semibold text-gray-700 mt-2">Brainstorm 1-2 high-value bonuses:</p>
                        <BlankLines lines={2} />
                    </WorksheetBox>

                    <WorksheetBox title="Spell #4: Guarantees (Risk Reversal)">
                        <P className="text-sm">A strong guarantee removes all fear. Your current guarantee is: <strong>"{offer.guarantee}"</strong>. How can we make it even stronger? The crazier the guarantee, the more believable your offer becomes.</P>
                         <p className="font-semibold text-gray-700 mt-2">Rewrite your guarantee to be even more powerful:</p>
                        <BlankLines lines={3} />
                    </WorksheetBox>
                    
                    <WorksheetBox title="Spell #5: Naming (The Promise)">
                        <P className="text-sm">A name should be a promise. Your current offer name is: <strong>"{offer.name}"</strong>. Does it clearly state the dream outcome? Let's try to make it even more benefit-driven.</P>
                        <p className="font-semibold text-gray-700 mt-2">Brainstorm 2 alternative, benefit-focused names:</p>
                        <BlankLines lines={2} />
                    </WorksheetBox>
                </main>
            </GuidePage>
        </>
    );
};


interface PricingAndOfferGuidePdfProps {
    playbook: GeneratedPlaybook;
    businessData: BusinessData;
    type: string;
}

const PricingAndOfferGuidePdf: React.FC<PricingAndOfferGuidePdfProps> = ({ playbook, businessData, type }) => {
    switch (type) {
        case 'guide-pricing':
            return <PricingGuide playbook={playbook} />;
        case 'guide-enhancing-offer':
            return <EnhancingOfferGuide playbook={playbook} />;
        default:
            return null;
    }
};

export default PricingAndOfferGuidePdf;
