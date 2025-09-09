
import React from 'react';
import { BusinessData, GeneratedPlaybook } from '../../../types';

// --- Reusable Theming Components ---
const SRGuidePage: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => (
    <div data-pdf-page="true" className={`p-10 bg-white font-sans text-gray-800 break-after-page relative overflow-hidden border-t-8 border-gray-800 ${className}`} style={{ fontFamily: "'Inter', sans-serif", width: '800px', minHeight: '1131px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
        <div className="absolute top-4 right-8 text-xs font-bold text-gray-400">BUSINESS UNIVERSITY MASTERCLASS</div>
        <div className="relative z-10">{children}</div>
    </div>
);

const SRTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-5xl font-black text-gray-800 tracking-tighter text-center">{children}</h1>;
const SRSubtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-xl text-gray-500 mt-3 text-center">{children}</p>;
const SRP: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-600 leading-relaxed my-3 ${className || ''}`}>{children}</p>;
const SRSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className={`text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-3 mb-6 mt-10 break-after-avoid`}>{children}</h2>;

const SRStageCard: React.FC<{ number: string, title: string, employees: string, focus: string, children: React.ReactNode, color: string, isCurrent: boolean, ceoQuestion: string }> = ({ number, title, employees, focus, children, color, isCurrent, ceoQuestion }) => (
    <div className={`p-6 bg-white rounded-2xl border-t-8 shadow-lg mb-6 break-inside-avoid transition-all duration-300 ${isCurrent ? `border-${color}-400 scale-105 shadow-2xl` : `border-gray-200`}`}>
        <div className="flex justify-between items-start">
            <div>
                <p className={`font-bold text-sm uppercase ${isCurrent ? `text-${color}-600` : 'text-gray-400'}`}>Stage {number}</p>
                 <h2 className={`text-3xl font-bold text-gray-800`}>{title}</h2>
            </div>
            <div className="text-right">
                <p className="font-bold text-gray-500 text-sm">Team Size (Est.)</p>
                <p className={`font-bold text-xl ${isCurrent ? `text-${color}-700` : 'text-gray-600'}`}>{employees}</p>
            </div>
        </div>
        <div className={`mt-4 p-4 rounded-xl ${isCurrent ? `bg-${color}-50` : 'bg-gray-50'}`}>
            <p className={`font-bold text-sm ${isCurrent ? `text-${color}-800` : 'text-gray-500'}`}>Your #1 Job:</p>
            <p className={`font-bold text-lg italic ${isCurrent ? `text-${color}-900` : 'text-gray-700'}`}>{focus}</p>
        </div>
        <div className="mt-4 text-sm text-gray-600">{children}</div>
         <div className="mt-4 p-3 bg-gray-800 text-white rounded-lg">
            <p className="font-bold text-yellow-400 text-xs">KEY QUESTION FOR THE CEO:</p>
            <p className="text-sm italic">"{ceoQuestion}"</p>
        </div>
    </div>
);


const stages = [
    { num: '0', title: 'Improvise', revenue: 0, emp: 'You (0-1)', focus: 'Get ONE customer.', color: 'green', desc: "Your only job is to make a great offer and get your first few customers by any means necessary. Do things that don't scale. Talk to everyone. Your only goal is to make sales to prove your idea works.", ceoQuestion: "What is the fastest path to my first paying customer?" },
    { num: '1-2', title: 'Monetize & Advertise', revenue: 1, emp: 'You (0-1)', focus: 'Get ONE customer a day, predictably.', color: 'blue', desc: "You've proven the concept. Now, build a simple, repeatable system for generating leads and sales every single day. Master one marketing channel.", ceoQuestion: "Which single marketing channel can I master and scale?" },
    { num: '3', title: 'Stabilize', revenue: 1000000, emp: 'You + Helpers (1-4)', focus: 'Make your sales predictable & hire to delegate.', color: 'purple', desc: "It feels like chaos! Now you need to build a system that brings in new customers every week, like clockwork. You must hire your first key helper to take repetitive tasks off your plate.", ceoQuestion: "What is the most repetitive, low-value task I can delegate this week?" },
    { num: '4', title: 'Prioritize', revenue: 4000000, emp: 'Small Team (5-9)', focus: 'Find the 20% of work that creates 80% of results.', color: 'yellow', desc: "You have a small team, but everyone is busy. You must now become ruthless about prioritizing. Find the one or two things that REALLY make the business grow and have everyone focus ONLY on those things.", ceoQuestion: "If we could only do one thing for the next 90 days, what would it be?" },
    { num: '5', title: 'Productize', revenue: 9000000, emp: 'Growing Team (10-19)', focus: 'Turn your service into a repeatable product.', color: 'red', desc: "To grow bigger, you can't have every project be custom. You need to create a standardized 'product' or 'package' that you can sell over and over again. This makes delivery easier and more profitable.", ceoQuestion: "How can we deliver our core result with 80% less customization?" },
    { num: '6', title: 'Optimize', revenue: 19000000, emp: 'Departments (20-49)', focus: 'Make each part of your business 1% better.', color: 'gray', desc: "You now have departments (sales, marketing, etc.). Your job is to make each team a little more efficient. Small improvements in each area lead to huge growth overall.", ceoQuestion: "What is the single biggest bottleneck between our departments?" },
    { num: '7', title: 'Categorize', revenue: 49000000, emp: 'Management Layer (50-99)', focus: 'Hire leaders to run the departments.', color: 'blue', desc: "You can't manage everyone. You need to hire managers to lead the different teams. Your job changes from being a player to being the coach of the coaches.", ceoQuestion: "Who on my team has the potential to lead, and how can I empower them?" },
    { num: '8', title: 'Specialize', revenue: 99000000, emp: 'Experts (100-249)', focus: 'Become the #1 in the world at ONE thing.', color: 'green', desc: "Your company is now big. To keep growing, you must become famous for being the absolute best at one very specific thing. This is where you dominate your market and build a powerful brand.", ceoQuestion: "What is the one thing we can be the best in the world at?" },
    { num: '9', title: 'Capitalize', revenue: 249000000, emp: 'Empire (250-500+)', focus: 'Use your success to start new adventures.', color: 'purple', desc: "You've built a huge, successful business! Now you can use your money, team, and brand to launch new products, buy other companies, and expand your kingdom.", ceoQuestion: "What new opportunities does our current success unlock?" },
];

const getCurrentStageIndex = (monthlyRevenue: string) => {
    const revenue = parseFloat(monthlyRevenue) * 12;
    if (isNaN(revenue)) return 0;
    for (let i = stages.length - 1; i >= 0; i--) {
        if (revenue >= stages[i].revenue) return i;
    }
    return 0;
};

const ScalingStagesGuide: React.FC<{ playbook: GeneratedPlaybook; businessData: BusinessData }> = ({ playbook, businessData }) => {
    const currentStageIndex = getCurrentStageIndex(businessData.monthlyRevenue);
    
    return (
        <>
            <SRGuidePage>
                <header className="text-center mb-12 pb-6">
                    <p className="font-bold text-yellow-600">SCALING MASTERCLASS</p>
                    <SRTitle>The Scaling Roadmap: Your Growth Path</SRTitle>
                    <SRSubtitle>From a small hut to a giant castle, this is the path of a business adventurer!</SRSubtitle>
                </header>
                <main>
                    <SRP>Every great business grows through stages. Knowing which stage you're in tells you what your ONLY job is right now. Don't try to build castle walls when you still need to find your first bag of gold!</SRP>
                    <SRP>Based on your current revenue, your business is in the stage highlighted below. We've also included a deep-dive page with specific advice for your current stage.</SRP>
                </main>
            </SRGuidePage>
            
            {stages.map((s, index) => (
                <SRGuidePage key={s.num}>
                    <main>
                        <SRStageCard
                            number={s.num}
                            title={s.title}
                            employees={s.emp}
                            focus={s.focus}
                            color={s.color}
                            isCurrent={currentStageIndex === index}
                            ceoQuestion={s.ceoQuestion}
                        >
                            <SRP>{s.desc}</SRP>
                        </SRStageCard>
                    </main>
                </SRGuidePage>
            ))}
        </>
    );
};

interface ScalingRoadmapGuidePdfProps {
    playbook: GeneratedPlaybook;
    businessData: BusinessData;
    type: string;
}

const ScalingRoadmapGuidePdf: React.FC<ScalingRoadmapGuidePdfProps> = ({ playbook, businessData, type }) => {
    switch (type) {
        case 'guide-scaling-stages':
            return <ScalingStagesGuide playbook={playbook} businessData={businessData} />;
        default:
            return null;
    }
};

export default ScalingRoadmapGuidePdf;
