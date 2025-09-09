
import React from 'react';
import { BusinessData, GeneratedPlaybook } from '../../../types';

// --- Reusable Theming Components ---
const POGuidePage: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => (
    <div data-pdf-page="true" className={`p-10 bg-white font-sans text-gray-800 break-after-page relative overflow-hidden border-t-8 border-gray-800 ${className}`} style={{ fontFamily: "'Inter', sans-serif", width: '800px', minHeight: '1131px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
        <div className="absolute top-4 right-8 text-xs font-bold text-gray-400">BUSINESS UNIVERSITY MASTERCLASS</div>
        <div className="relative z-10">{children}</div>
    </div>
);

const POTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-5xl font-black text-gray-800 tracking-tighter text-center">{children}</h1>;
const POSubtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-xl text-gray-500 mt-3 text-center">{children}</p>;
const POSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className={`text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-3 mb-6 mt-10 break-after-avoid`}>{children}</h2>;
const POP: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-600 leading-relaxed my-3 ${className || ''}`}>{children}</p>;
const POActionBox: React.FC<{ title: string, children: React.ReactNode, icon?: string }> = ({ title, children, icon }) => (
    <div className={`p-6 bg-gray-50 rounded-lg border border-gray-200 my-4`}>
        <h3 className={`font-bold text-lg text-gray-800 flex items-center`}>
            {icon && <span className="mr-3 text-2xl">{icon}</span>}
            {title}
        </h3>
        <div className="mt-3 text-sm text-gray-700">{children}</div>
    </div>
);
const POScriptBox: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="p-4 bg-gray-800 rounded-lg text-white font-mono text-sm my-4">
        <p className="font-bold text-yellow-400 mb-2">{`// ${title}`}</p>
        <div className="whitespace-pre-wrap">{children}</div>
    </div>
);


// --- Individual Guide Components ---

const PricingGuide: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => {
    const offer = playbook.offer1;
    const basePrice = parseInt(offer.price.replace(/[^0-9]/g,''));

    return (
        <>
            <POGuidePage>
                <header className="text-center mb-12 pb-6">
                    <p className="font-bold text-yellow-600">PRICING MASTERCLASS</p>
                    <POTitle>The Value Equation</POTitle>
                    <POSubtitle>How to price your offer, "{offer.name}", based on the immense value it provides.</POSubtitle>
                </header>
                <main>
                    <POSectionTitle>Principle: Price on Value, Not Cost</POSectionTitle>
                    <POP>The biggest mistake is pricing based on how much it costs you to deliver. The correct way is to price based on how much value the result is WORTH to your customer. You are not selling a service; you are selling a transformation.</POP>
                    
                    <POActionBox title="The 10x Value Anchor" icon="⚓">
                        <POP>A powerful rule of thumb is that the value of your offer should be at least 10 times its price. This makes the customer feel like they are getting an incredible deal.</POP>
                        <div className="mt-2 p-4 bg-white rounded grid grid-cols-2 gap-4 text-center">
                            <div><p className="text-xs font-bold text-gray-400">Total Value</p><p className="text-2xl font-bold text-gray-800">{offer.totalValue}</p></div>
                             <div><p className="text-xs font-bold text-gray-400">Your Price</p><p className="text-2xl font-bold text-green-600">{offer.price}</p></div>
                        </div>
                    </POActionBox>
                </main>
            </POGuidePage>
            <POGuidePage>
                 <main>
                    <POSectionTitle>Advanced Strategy: Pricing Tiers</POSectionTitle>
                    <POP>Offering tiers can increase your average order value by appealing to different types of buyers. Here is a generated 3-tier model for your offer.</POP>
                    <div className="grid grid-cols-3 gap-4 text-xs">
                        <div className="p-3 border rounded-lg">
                            <h4 className="font-bold">STANDARD</h4>
                            <p className="font-bold text-lg">{offer.price}</p>
                            <ul className="list-disc pl-4 mt-2"><li>Core Offer</li></ul>
                        </div>
                        <div className="p-3 border-2 border-yellow-400 rounded-lg bg-yellow-50 relative">
                             <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 px-2 py-0.5 rounded-full text-xs font-bold">POPULAR</div>
                            <h4 className="font-bold">PRO</h4>
                            <p className="font-bold text-lg">${basePrice * 1.5}</p>
                            <ul className="list-disc pl-4 mt-2"><li>Core Offer</li><li>+ "Done-With-You" Onboarding Call</li></ul>
                        </div>
                         <div className="p-3 border rounded-lg">
                            <h4 className="font-bold">PREMIUM</h4>
                            <p className="font-bold text-lg">${basePrice * 3}</p>
                            <ul className="list-disc pl-4 mt-2"><li>Core Offer</li><li>+ Onboarding Call</li><li>+ "Done-For-You" Implementation</li></ul>
                        </div>
                    </div>

                    <POSectionTitle>Communicating Value: Your Script</POSectionTitle>
                    <POP>You must be able to confidently explain your price. Here are scripts to use when a potential customer asks "How much is it?".</POP>
                    <POScriptBox title="The Value Stack Script">
                        <p>That's a great question. To be transparent, the full program is valued at over {offer.totalValue}. That includes [mention 2-3 top stack items, e.g., "{offer.stack[0].solution}" and "{offer.stack[1].solution}"].</p>
                        <p className="mt-2">However, because you're [a good fit / signing up this week / etc.], the investment isn't {offer.totalValue}. It's only {offer.price}.</p>
                    </POScriptBox>
                     <POScriptBox title="The 'Compared to What?' Script">
                        <p>It's an investment of {offer.price}.</p>
                        <p className="mt-2">[Pause, let them respond].</p>
                        <p className="mt-2">Let me ask you, what is the cost of NOT solving [their biggest problem: "{playbook.diagnosis.constraints[0]}"] right now? When you compare the price to the cost of staying stuck, which one feels more expensive?</p>
                    </POScriptBox>
                 </main>
            </POGuidePage>
        </>
    );
};

const EnhancingOfferGuide: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => {
    const offer = playbook.offer1;
    return (
        <>
            <POGuidePage>
                <header className="text-center mb-12 pb-6">
                    <p className="font-bold text-yellow-600">OFFER MASTERCLASS</p>
                    <POTitle>The Conversion Multiplier Kit</POTitle>
                    <POSubtitle>Five "done-for-you" strategies to make your offer, "{offer.name}", impossible to resist.</POSubtitle>
                </header>
                <main>
                    <POP>A great offer is more than just the items in the box. It's about the psychological triggers you wrap around it. Here are ready-to-use tactics for your business.</POP>
                    
                    <POSectionTitle>Scarcity & Urgency: The "Why Now?" Triggers</POSectionTitle>
                    <POActionBox title="Tactic 1: Scarcity (Limited Quantity)" icon=" scarcity">
                        <POP>People want what is rare. Here are three ways to add REAL scarcity to your offer. Pick one and stick to it.</POP>
                        <ul className="list-decimal pl-5 mt-2 space-y-2 text-sm">
                            <li><strong>"The Capacity Limit":</strong> "To ensure every client gets my full attention, I can only take on <strong>[e.g., 5]</strong> new clients for the '{offer.name}' this month."</li>
                            <li><strong>"The Cohort Model":</strong> "Enrollment for the Spring cohort of '{offer.name}' closes this Friday, and the next one won't open for 3 months."</li>
                            <li><strong>"The Bonus Limit":</strong> "The first <strong>[e.g., 10]</strong> people who sign up this week will also get my [Bonus Offer Name] for free."</li>
                        </ul>
                    </POActionBox>

                     <POActionBox title="Tactic 2: Urgency (Limited Time)" icon="⏱️">
                        <POP>This creates a reason to buy NOW. Here are two powerful urgency tactics.</POP>
                         <ul className="list-decimal pl-5 mt-2 space-y-2 text-sm">
                            <li><strong>"The Price Increase":</strong> "Just a heads-up, the price for '{offer.name}' will be increasing to <strong>[e.g., {parseInt(offer.price.replace(/[^0-9]/g,'')) * 1.25}]</strong> on the 1st of next month due to high demand."</li>
                            <li><strong>"The Deadline":</strong> "This special offer of {offer.price} is only available until Friday at midnight."</li>
                        </ul>
                    </POActionBox>
                </main>
            </POGuidePage>
            <POGuidePage>
                <main>
                    <POSectionTitle>Value Maximizers: Bonuses & Guarantees</POSectionTitle>
                    <POActionBox title="Tactic 3: Bonuses (The Value Stack)" icon="🎁">
                        <POP>Bonuses increase the perceived value of your offer. A great bonus solves the *next* problem your customer will have after buying your product. Here are 3 bonus ideas generated for you:</POP>
                         <ul className="list-decimal pl-5 mt-2 space-y-2 text-sm">
                            <li><strong>Bonus Idea 1 (Tool):</strong> Offer a "[Tool Name, e.g., '30-Day Progress Tracker Spreadsheet']" that helps them implement your solution more easily.</li>
                             <li><strong>Bonus Idea 2 (Support):</strong> Offer a "[Support Offer, e.g., 'Private Kick-off Call with Me']" to ensure they start correctly.</li>
                              <li><strong>Bonus Idea 3 (Future-Pacing):</strong> Offer a "[Next Step Product, e.g., 'The 'Maintain Your Results' Mini-Course']" that helps them keep their results long-term.</li>
                        </ul>
                    </POActionBox>

                    <POActionBox title="Tactic 4: Guarantees (The Risk Reversal)" icon="🛡️">
                        <POP>A strong guarantee removes all fear. Your current guarantee is good: <em>"{offer.guarantee}"</em>. Let's explore making it even more powerful.</POP>
                        <ul className="list-decimal pl-5 mt-2 space-y-2 text-sm">
                            <li><strong>Conditional Guarantee (Stronger):</strong> "If you [complete a specific action, e.g., 'attend all the sessions'] and don't achieve [specific result], I will not only refund your money but also [pay for a competitor's product / give you an extra $100]."</li>
                            <li><strong>Unconditional Guarantee (Strongest):</strong> "Try the '{offer.name}' for 30 days. If you're not 100% thrilled for any reason at all, just let us know and we'll give you a full, cheerful refund. No questions asked."</li>
                        </ul>
                    </POActionBox>
                </main>
            </POGuidePage>
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
