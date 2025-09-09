
import React from 'react';
import { BusinessData, GeneratedPlaybook } from '../../../types';

// --- Reusable Theming Components ---
const MMGuidePage: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => (
    <div data-pdf-page="true" className={`p-10 bg-white font-sans text-gray-800 break-after-page relative overflow-hidden border-t-8 border-gray-800 ${className}`} style={{ fontFamily: "'Inter', sans-serif", width: '800px', minHeight: '1131px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
        <div className="absolute top-4 right-8 text-xs font-bold text-gray-400">BUSINESS UNIVERSITY MASTERCLASS</div>
        <div className="relative z-10">{children}</div>
    </div>
);

const MMTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-5xl font-black text-gray-800 tracking-tighter text-center">{children}</h1>;
const MMSubtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-xl text-gray-500 mt-3 text-center">{children}</p>;
const MMSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className={`text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-3 mb-6 mt-10 break-after-avoid`}>{children}</h2>;
const MMP: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-600 leading-relaxed my-3 ${className || ''}`}>{children}</p>;
const MMActionBox: React.FC<{ title: string, children: React.ReactNode, icon?: string }> = ({ title, children, icon }) => (
    <div className={`p-6 bg-gray-50 rounded-lg border border-gray-200 my-4`}>
        <h3 className={`font-bold text-lg text-gray-800 flex items-center`}>
            {icon && <span className="mr-3 text-2xl">{icon}</span>}
            {title}
        </h3>
        <div className="mt-3 text-sm text-gray-700">{children}</div>
    </div>
);
const MMScriptBox: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="p-4 bg-gray-800 rounded-lg text-white font-mono text-sm my-4">
        <p className="font-bold text-yellow-400 mb-2">{`// ${title}`}</p>
        <div className="whitespace-pre-wrap">{children}</div>
    </div>
);

// --- Individual Guide Components ---

const IntroGuide: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => (
    <MMGuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">MONEY MODEL MASTERCLASS</p>
            <MMTitle>Your Business's Financial Engine</MMTitle>
            <MMSubtitle>The secret recipe for how your business makes money and grows predictably!</MMSubtitle>
        </header>
        <main>
            <MMSectionTitle>Your Personalized Money Model</MMSectionTitle>
            <MMP>A "Money Model" is your master plan for creating a profitable customer journey. Your AI-generated plan is called:</MMP>
            <div className="p-4 bg-gray-800 text-white rounded-lg text-center">
                <h3 className="text-2xl font-bold">{playbook.moneyModel.title}</h3>
            </div>
            <MMP>The core principle of this model is:</MMP>
            <div className="p-4 bg-gray-100 italic rounded-lg text-center">
                <p className="font-semibold text-gray-700">"{playbook.moneyModel.corePrinciple}"</p>
            </div>
            <MMSectionTitle>The 4 Building Blocks</MMSectionTitle>
            <MMP>Every great money model is built from four types of offers, like puzzle pieces. The other guides in this section are idea generation playbooks that will give you concrete, ready-to-use offers to expand your business and increase customer lifetime value.</MMP>
        </main>
    </MMGuidePage>
);

const AttractionOffersGuide: React.FC<{ playbook: GeneratedPlaybook, businessData: BusinessData }> = ({ playbook, businessData }) => (
    <MMGuidePage>
        <header className="text-center mb-12 pb-6">
             <p className="font-bold text-yellow-600">MONEY MODEL MASTERCLASS</p>
            <MMTitle>Attraction Offers: Your "Front Door"</MMTitle>
            <MMSubtitle>A fully fleshed-out "hello" offer to turn strangers into customers.</MMSubtitle>
        </header>
        <main>
            <MMSectionTitle>Principle: The First "Yes"</MMSectionTitle>
            <MMP>Attraction offers (also called Tripwires) are low-priced and super easy to say "yes" to. Their main job is to acquire a new customer and begin a relationship, not to make a huge profit.</MMP>
            
            <MMActionBox title="Ready-to-Launch Offer: The 'Diagnostic' Kit" icon="🩺">
                <p><strong>Offer Name:</strong> The {businessData.businessType} Scorecard</p>
                <p><strong>Price:</strong> $49</p>
                <p><strong>The Promise:</strong> "In 15 minutes, uncover the #1 bottleneck that's secretly killing your growth."</p>
                <p className="mt-2"><strong>What They Get:</strong></p>
                <ul className="list-disc pl-5 text-sm">
                    <li>A detailed, multi-point self-assessment worksheet.</li>
                    <li>A personalized "Score Report" video from you explaining their results.</li>
                    <li>A 3-step action plan to fix their biggest problem.</li>
                </ul>
                <p className="mt-2"><strong>Strategy:</strong> This offer provides immense value and perfectly positions your main offer, "{playbook.offer1.name}", as the ideal solution to the problems it uncovers.</p>
                <MMScriptBox title="How to Sell It">
                    <p>On your website, have a button that says: "Find Your #1 Growth Leak in 15 Mins."</p>
                    <p className="mt-2">On the sales page: "Are you frustrated with [Constraint]? For just $49, we'll give you a personalized diagnosis and a clear path forward. Stop guessing, start growing."</p>
                </MMScriptBox>
            </MMActionBox>
        </main>
    </MMGuidePage>
);

const UpsellOffersGuide: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => (
    <MMGuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">MONEY MODEL MASTERCLASS</p>
            <MMTitle>Upsell Offers: The "Profit Multiplier"</MMTitle>
            <MMSubtitle>A done-for-you upsell to increase revenue from every sale.</MMSubtitle>
        </header>
        <main>
            <MMSectionTitle>Principle: Strike While the Iron is Hot</MMSectionTitle>
            <MMP>The easiest time to sell something to a customer is right after they've already decided to buy from you. An upsell is an offer you make immediately after their initial purchase, before they even get to the "thank you" page.</MMP>

            <MMActionBox title="Ready-to-Launch Offer: The 'Speed & Automation' Upsell" icon="🚀">
                <p><strong>Offer Name:</strong> The "Done-With-You" Fast-Track Session</p>
                <p><strong>Price:</strong> Add 50% to the original price (e.g., if "{playbook.offer1.name}" is {playbook.offer1.price}, this is an additional ${parseInt(playbook.offer1.price.replace(/[^0-9]/g,'')) * 0.5}).</p>
                <p><strong>The Promise:</strong> "Want to get results twice as fast? Add this one-on-one implementation session and we'll build out your entire plan together."</p>
                <p className="mt-2"><strong>What They Get:</strong></p>
                <ul className="list-disc pl-5 text-sm">
                    <li>A 90-minute private implementation call.</li>
                    <li>We'll personally set up any required tools or templates from the main offer.</li>
                    <li>You'll leave the call with a completed, ready-to-execute plan.</li>
                </ul>
                <p className="mt-2"><strong>Strategy:</strong> You are selling speed and certainty. This is for the customer who values their time more than their money.</p>
                <MMScriptBox title="The One-Click Upsell Page Script">
                    <p><strong>Headline:</strong> WAIT! Your Order Is Not Complete...</p>
                    <p className="mt-2"><strong>Body:</strong> Want to guarantee your success with "{playbook.offer1.name}"? For a limited time, you can add a private "Fast-Track" session with me. We'll get on a call and implement everything together, so you can start seeing results this week.</p>
                     <p className="mt-2">This is a one-time offer. Click the button below to add this to your order for just ${parseInt(playbook.offer1.price.replace(/[^0-9]/g,'')) * 0.5}.</p>
                </MMScriptBox>
            </MMActionBox>
        </main>
    </MMGuidePage>
);

const DownsellOffersGuide: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => (
    <MMGuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">MONEY MODEL MASTERCLASS</p>
            <MMTitle>Downsell Offers: The "Safety Net"</MMTitle>
            <MMSubtitle>A done-for-you downsell to convert prospects who say "no."</MMSubtitle>
        </header>
        <main>
            <MMSectionTitle>Principle: Keep the Relationship</MMSectionTitle>
            <MMP>If a customer says "no" to your main offer ("{playbook.offer1.name}") because of price or commitment, don't let them leave empty-handed! A downsell offers them a smaller, cheaper way to become a customer today.</MMP>
            
            <MMActionBox title="Ready-to-Launch Offer: The 'Feature Removal' Downsell" icon="➖">
                <p><strong>Offer Name:</strong> The "{playbook.offer1.name}" Lite</p>
                <p><strong>Price:</strong> 50% of the original price ({playbook.offer1.price} -> ${parseInt(playbook.offer1.price.replace(/[^0-9]/g,'')) * 0.5}).</p>
                <p><strong>The Promise:</strong> "Get the core system for achieving [Result] without the one-on-one support."</p>
                 <p className="mt-2"><strong>What They Get:</strong></p>
                <ul className="list-disc pl-5 text-sm">
                    <li>All the templates, guides, and assets from the main offer.</li>
                    <li>(Removed) The personal coaching/support components.</li>
                </ul>
                <p className="mt-2"><strong>Strategy:</strong> This is for the self-starter who wants the tools but doesn't need hand-holding. It makes your offer accessible to a wider audience.</p>
                 <MMScriptBox title="How to Sell It (The Exit-Intent Pop-up)">
                    <p>When a user is about to leave your sales page, show a pop-up:</p>
                    <p className="mt-2"><strong>Headline:</strong> Before You Go...</p>
                    <p className="mt-2">Is the price a little too high right now? I get it. For a limited time, you can get the "Lite" version with all the same tools and resources, just without the private coaching, for only ${parseInt(playbook.offer1.price.replace(/[^0-9]/g,'')) * 0.5}.</p>
                </MMScriptBox>
            </MMActionBox>
        </main>
    </MMGuidePage>
);

const ContinuityOffersGuide: React.FC<{ playbook: GeneratedPlaybook; businessData: BusinessData }> = ({ playbook, businessData }) => (
    <MMGuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">MONEY MODEL MASTERCLASS</p>
            <MMTitle>Continuity Offers: Predictable Profits</MMTitle>
            <MMSubtitle>A done-for-you subscription to create stable, recurring revenue.</MMSubtitle>
        </header>
        <main>
            <MMSectionTitle>Principle: Predictable Revenue is Freedom</MMSectionTitle>
            <MMP>Continuity means having customers in a subscription or membership, paying you on a recurring basis. This is the key to building a stable, predictable business.</MMP>

            <MMActionBox title="Ready-to-Launch Offer: The 'Access' Model" icon="🔑">
                <p><strong>Offer Name:</strong> The {businessData.businessType} Insider's Club</p>
                <p><strong>Price:</strong> $49/month</p>
                <p><strong>The Promise:</strong> "Your secret weapon for staying ahead. Get monthly expert insights, new tools, and direct access to our team to ensure your continued success."</p>
                <p className="mt-2"><strong>What They Get:</strong></p>
                <ul className="list-disc pl-5 text-sm">
                    <li><strong>Monthly Group Coaching Call:</strong> A live "what's working now" session + Q&A.</li>
                    <li><strong>The Vault:</strong> A growing library of all past trainings and resources.</li>
                    <li><strong>New "Tool of the Month":</strong> A new template, script, or checklist every month.</li>
                </ul>
                 <p className="mt-2"><strong>Strategy:</strong> This offer is sold to customers *after* they complete "{playbook.offer1.name}". It's the perfect way to retain them and continue providing value.</p>
                 <MMScriptBox title="How to Sell It (The Graduation Email)">
                    <p>Send this email a week before your main program ends:</p>
                    <p className="mt-2">Subject: Your journey isn't over...</p>
                    <p className="mt-2">Hey [Name], you've made incredible progress in "{playbook.offer1.name}". But what happens next?</p>
                    <p className="mt-2">To make sure you keep your momentum, I'd like to invite you to our Insider's Club. It's our monthly program where we help you stay on track and continue to grow. Want to learn more?</p>
                 </MMScriptBox>
            </MMActionBox>
        </main>
    </MMGuidePage>
);

interface MoneyModelsDeepDiveGuidePdfProps {
    playbook: GeneratedPlaybook;
    businessData: BusinessData;
    type: string;
}

const MoneyModelsDeepDiveGuidePdf: React.FC<MoneyModelsDeepDiveGuidePdfProps> = ({ playbook, businessData, type }) => {
    switch(type) {
        case 'guide-money-models-intro': return <IntroGuide playbook={playbook} />;
        case 'guide-attraction-offers': return <AttractionOffersGuide playbook={playbook} businessData={businessData} />;
        case 'guide-upsell-offers': return <UpsellOffersGuide playbook={playbook} />;
        case 'guide-downsell-offers': return <DownsellOffersGuide playbook={playbook} />;
        case 'guide-continuity-offers': return <ContinuityOffersGuide playbook={playbook} businessData={businessData} />;
        default: return null;
    }
};

export default MoneyModelsDeepDiveGuidePdf;
