
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
const ActionBox: React.FC<{ title: string, children: React.ReactNode, status: 'Done' | 'To-Do' }> = ({ title, children, status }) => (
    <div className={`p-6 rounded-lg border my-4 ${status === 'Done' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
        <div className="flex justify-between items-center">
            <h3 className={`font-bold text-lg ${status === 'Done' ? 'text-green-800' : 'text-blue-800'}`}>{title}</h3>
            {status === 'Done' && <span className="text-sm font-bold text-green-600 bg-green-200 px-3 py-1 rounded-full">✓ DONE</span>}
        </div>
        <div className="mt-2 text-sm text-gray-700">{children}</div>
    </div>
);


const Execution100kGuide: React.FC<{ playbook: GeneratedPlaybook, businessData: BusinessData }> = ({ playbook, businessData }) => {
    return (
        <>
            <GuidePage>
                <header className="text-center mb-12 pb-6">
                    <p className="font-bold text-yellow-600">EXECUTION WORKSHOP</p>
                    <Title>The First $100,000 Adventure</Title>
                    <Subtitle>Your Personalized Action Plan for your {businessData.businessType}</Subtitle>
                </header>

                <main>
                    <SectionTitle>Principle: Action Over Perfection</SectionTitle>
                    <P>Getting your first $100,000 isn't about having a perfect plan. It's about executing a good plan with massive speed and volume. Your only job is to talk to as many people as possible and ask them to buy your offer.</P>
                    
                     <SectionTitle>Your Personalized 3-Step Action Plan</SectionTitle>
                    <ActionBox title="1. Finalize Your Grand Slam Offer" status="Done">
                        You've already completed the most important step! Your plan has a powerful, irresistible offer ready to go:
                        <div className="p-3 bg-white rounded-md mt-2 font-bold text-center text-green-700">"{playbook.offer1.name}"</div>
                    </ActionBox>
                     <ActionBox title="2. Show Your Offer To People (Outreach)" status="To-Do">
                        Every day, your job is to show your offer to people who might want it. Your playbook has identified the best methods for you to start with:
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            {playbook.marketingModel.steps.slice(0, 2).map((step, i) => (
                                <li key={i}><strong>{step.method}:</strong> {step.strategy}</li>
                            ))}
                        </ul>
                        <P>Focus relentlessly on these two methods first.</P>
                    </ActionBox>
                    <ActionBox title="3. Ask For The Sale" status="To-Do">
                       Be brave! After you've presented your offer, you must ask for the sale. Your playbook's "Sales System" section contains specific scripts and objection-handling techniques designed for your business. Use them!
                    </ActionBox>
                </main>
            </GuidePage>

            <GuidePage>
                 <main>
                    <SectionTitle>Your Unstoppable Adventurer Mindset</SectionTitle>
                    <P>To get to $100,000, you need to be tougher than a dragon's scales. Here’s a tactical checklist:</P>
                    
                    <div className="p-4 bg-gray-50 border-l-4 border-gray-300 rounded-r-lg my-3">
                        <h4 className="font-bold text-xl text-gray-800">☐ Do Things That Don't Scale</h4>
                        <P className="text-sm">Send every new customer a personal thank-you video. Write handwritten notes. These personal touches create loyal fans that big companies can't compete with.</P>
                    </div>

                    <div className="p-4 bg-gray-50 border-l-4 border-gray-300 rounded-r-lg my-3">
                        <h4 className="font-bold text-xl text-gray-800">☐ Treat "No" as Data</h4>
                        <P className="text-sm">Most people will say "no." That's okay! A "no" is not a failure; it's market feedback. Ask them, "Just for my feedback, was it the price, the timing, or the offer itself?" Their answer is a clue to make your offer even better.</P>
                    </div>

                     <div className="p-4 bg-gray-50 border-l-4 border-gray-300 rounded-r-lg my-3">
                        <h4 className="font-bold text-xl text-gray-800">☐ Embrace Volume as Your Superpower</h4>
                        <P className="text-sm">At the start, you can't be the best, but you CAN talk to more people than anyone else. If you get 99 "no's" and 1 "yes", you still win! Your goal is to get rejected as fast as possible, because the "yes" is always hiding among the "no's".</P>
                    </div>
                     <div className="mt-8 text-center p-8 bg-green-600 text-white rounded-2xl shadow-lg">
                        <h3 className="text-3xl font-black">Your mission is not about being perfect. It's about being fast and brave. Go execute!</h3>
                    </div>
                 </main>
            </GuidePage>
        </>
    );
};

interface ExecutionGuidePdfProps {
    playbook: GeneratedPlaybook;
    businessData: BusinessData;
    type: string;
}

const ExecutionGuidePdf: React.FC<ExecutionGuidePdfProps> = ({ playbook, businessData, type }) => {
    switch (type) {
        case 'guide-execution-100k':
            return <Execution100kGuide playbook={playbook} businessData={businessData} />;
        default:
            return null;
    }
};

export default ExecutionGuidePdf;
