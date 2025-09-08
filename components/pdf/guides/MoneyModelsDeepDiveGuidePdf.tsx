
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
const Tactic: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className={`p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-lg my-4`}>
        <h4 className={`font-bold text-yellow-800 text-lg`}>{title}</h4>
        <p className="text-sm mt-1 text-gray-700">{children}</p>
    </div>
);

// --- Individual Guide Components ---

const IntroGuide: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => (
    <GuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">MONEY MODEL WORKSHOP</p>
            <Title>Introduction to Your Money Model</Title>
            <Subtitle>The secret recipe for how your business makes money and grows!</Subtitle>
        </header>
        <main>
            <SectionTitle>Your Personalized Money Model</SectionTitle>
            <P>A "Money Model" is your master plan for creating a profitable customer journey. Your AI-generated plan is called:</P>
            <div className="p-4 bg-gray-800 text-white rounded-lg text-center">
                <h3 className="text-2xl font-bold">{playbook.moneyModel.title}</h3>
            </div>
            <P>The core principle of this model is:</P>
            <div className="p-4 bg-gray-100 italic rounded-lg text-center">
                <p className="font-semibold text-gray-700">"{playbook.moneyModel.corePrinciple}"</p>
            </div>
            <SectionTitle>The 4 Building Blocks</SectionTitle>
            <P>Every great money model is built from four types of offers, like puzzle pieces. The other guides in this section are personalized worksheets that will show you how to master each piece for your business.</P>
        </main>
    </GuidePage>
);

const AttractionOffersGuide: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => (
    <GuidePage>
        <header className="text-center mb-12 pb-6">
             <p className="font-bold text-yellow-600">MONEY MODEL WORKSHOP</p>
            <Title>Attraction Offers</Title>
            <Subtitle>Small, friendly "hello" offers that turn strangers into customers.</Subtitle>
        </header>
        <main>
            <SectionTitle>Principle: The First "Yes"</SectionTitle>
            <P>Attraction offers (also called Tripwires or "foot-in-the-door" offers) are low-priced and super easy to say "yes" to. Their main job is to acquire a new customer and begin a relationship, not to make a huge profit.</P>
             <WorksheetBox title="Your Current Attraction Offer">
                <P className="text-sm">Your playbook has already created a powerful attraction offer for you:</P>
                <div className="p-3 bg-white rounded-md mt-2 font-bold text-center text-green-700">"{playbook.downsell.offer.name}" for {playbook.downsell.offer.price}</div>
            </WorksheetBox>
            <SectionTitle>Worksheet: Brainstorming New Attraction Offers</SectionTitle>
            <Tactic title="Tactic: The 'Splinter' Offer">
                Take one small, valuable piece from your main offer ("{playbook.offer1.name}") and sell it as a standalone, low-cost product.
            </Tactic>
            <P>What is one asset from your main offer stack that you could sell for under $50?</P>
            <BlankLines lines={2} />
        </main>
    </GuidePage>
);

const UpsellOffersGuide: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => (
    <GuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">MONEY MODEL WORKSHOP</p>
            <Title>Upsell Offers</Title>
            <Subtitle>How to increase profit the moment a customer says "yes".</Subtitle>
        </header>
        <main>
            <SectionTitle>Principle: Strike While the Iron is Hot</SectionTitle>
            <P>The easiest time to sell something to a customer is right after they've already decided to buy from you. An upsell is an offer you make immediately after their initial purchase to increase the average order value.</P>
            <WorksheetBox title="Worksheet: Designing Your Upsell">
                <P className="text-sm">Let's design an upsell for when a customer buys your main offer, <strong>"{playbook.offer1.name}"</strong>.</P>
                <Tactic title="Tactic: The 'Speed & Automation' Upsell">
                    Offer a "Done-With-You" or "Done-For-You" version of the thing they just bought. How can you help them get the result FASTER or with LESS EFFORT?
                </Tactic>
                <P>Brainstorm a service you could add to your main offer:</P>
                <P className="text-xs italic">(e.g., If they bought a workout plan, offer a 1-on-1 coaching call. If they bought a template, offer to fill it out for them.)</P>
                <BlankLines lines={3} />
            </WorksheetBox>
        </main>
    </GuidePage>
);

const DownsellOffersGuide: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => (
    <GuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">MONEY MODEL WORKSHOP</p>
            <Title>Downsell Offers</Title>
            <Subtitle>How to make a sale even when a customer says "no" to your main offer.</Subtitle>
        </header>
        <main>
            <SectionTitle>Principle: Keep the Relationship</SectionTitle>
            <P>If a customer says "no" to your main offer (e.g., "{playbook.offer1.name}") because of price or commitment, don't let them leave empty-handed! A downsell offers them a smaller, cheaper way to become a customer today.</P>
             <WorksheetBox title="Worksheet: Designing Your Downsell">
                <P className="text-sm">Your main offer is <strong>"{playbook.offer1.name}"</strong>. Let's design a downsell for customers who are interested but not ready to commit.</P>
                <Tactic title="Tactic: The 'Feature Removal' Downsell">
                    Remove 1-2 of the most expensive or time-consuming items from your main offer's value stack to create a "Lite" version at a lower price.
                </Tactic>
                <P>Which items from your value stack could you remove to create a cheaper offer?</P>
                <BlankLines lines={3} />
                 <Tactic title="Tactic: The 'Payment Plan' Downsell">
                    This is the easiest downsell. Simply offer to break the main price into smaller chunks.
                </Tactic>
                <P>What would a 3-month payment plan for your <strong>{playbook.offer1.price}</strong> offer look like? (Remember to add a small amount for the convenience).</P>
                 <BlankLines lines={1} />
            </WorksheetBox>
        </main>
    </GuidePage>
);

// FIX: Add businessData prop to use for businessType.
const ContinuityOffersGuide: React.FC<{ playbook: GeneratedPlaybook; businessData: BusinessData }> = ({ playbook, businessData }) => (
    <GuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">MONEY MODEL WORKSHOP</p>
            <Title>Continuity Offers</Title>
            <Subtitle>The secret to predictable income: getting customers to pay you every month!</Subtitle>
        </header>
        <main>
            <SectionTitle>Principle: Predictable Revenue</SectionTitle>
            <P>Continuity means having customers in a subscription or membership, paying you on a recurring basis. This is the key to building a stable, predictable business because you know how much money is coming in each month.</P>
            <WorksheetBox title="Worksheet: Brainstorming Your Continuity Offer">
                {/* FIX: Access businessType from businessData prop. */}
                <P className="text-sm">Think about your business, <strong>{businessData?.businessType}</strong>. What ongoing value could you provide every month?</P>
                <Tactic title="Tactic: The 'Access' Model">
                    Offer monthly access to you or your resources. (e.g., A monthly group coaching call, a private community, a library of new templates each month).
                </Tactic>
                <P>Brainstorm an "Access" offer you could create:</P>
                <BlankLines lines={2} />
                 <Tactic title="Tactic: The 'Consumable' Model">
                    If you sell a physical product, offer a monthly subscription. (e.g., A monthly coffee bean delivery, a recurring order of skincare products).
                </Tactic>
                <P>Does your business have a consumable component you could turn into a subscription?</P>
                <BlankLines lines={2} />
            </WorksheetBox>
        </main>
    </GuidePage>
);

interface MoneyModelsDeepDiveGuidePdfProps {
    playbook: GeneratedPlaybook;
    businessData: BusinessData;
    type: string;
}

const MoneyModelsDeepDiveGuidePdf: React.FC<MoneyModelsDeepDiveGuidePdfProps> = ({ playbook, businessData, type }) => {
    switch(type) {
        case 'guide-money-models-intro': return <IntroGuide playbook={playbook} />;
        case 'guide-attraction-offers': return <AttractionOffersGuide playbook={playbook} />;
        case 'guide-upsell-offers': return <UpsellOffersGuide playbook={playbook} />;
        case 'guide-downsell-offers': return <DownsellOffersGuide playbook={playbook} />;
        case 'guide-continuity-offers': return <ContinuityOffersGuide playbook={playbook} businessData={businessData} />;
        default: return null;
    }
};

export default MoneyModelsDeepDiveGuidePdf;
