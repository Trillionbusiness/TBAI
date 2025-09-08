
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
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-600 leading-relaxed my-3 ${className || ''}`}>{children}</p>;

// FIX: Added 'P' component and corrected props for StageCard to resolve type errors.
const StageCard: React.FC<{ number: string, title: string, employees: string, focus: string, children: React.ReactNode, color: string, isCurrent: boolean }> = ({ number, title, employees, focus, children, color, isCurrent }) => (
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
    </div>
);


const stages = [
    { num: '0', title: 'Improvise', revenue: 0, emp: 'You (0-1)', focus: 'Get ONE customer.', color: 'green', desc: "This is the very beginning! Your job is to make a great offer and get your first few customers by any means necessary. Do things that don't scale. Talk to everyone. Your only goal is to make sales to prove your idea works." },
    { num: '1-2', title: 'Monetize & Advertise', revenue: 1, emp: 'You (0-1)', focus: 'Get ONE customer a day.', color: 'blue', desc: "You've proven the concept. Now, can you make it repeatable? Your focus is on building a simple, predictable system for generating leads and sales every single day." },
    { num: '3', title: 'Stabilize', revenue: 1000000, emp: 'You + Helpers (1-4)', focus: 'Make your sales predictable.', color: 'purple', desc: "You've got some customers, but it feels like chaos! Now you need to build a system that brings in new customers every week, like clockwork. You might hire your first helper to handle easy tasks so you can focus on sales." },
    { num: '4', title: 'Prioritize', revenue: 4000000, emp: 'Small Team (5-9)', focus: 'Find the 20% of work that creates 80% of results.', color: 'yellow', desc: "You have a small team, but everyone is super busy. You must now become ruthless about prioritizing. Find the one or two things that REALLY make the business grow and have everyone focus ONLY on those things." },
    { num: '5', title: 'Productize', revenue: 9000000, emp: 'Growing Team (10-19)', focus: 'Turn your service into a repeatable product.', color: 'red', desc: "To grow bigger, you can't have every project be custom and unique. You need to create a standardized 'product' or 'package' that you can sell over and over again. This makes delivery easier and more profitable." },
    { num: '6', title: 'Optimize', revenue: 19000000, emp: 'Departments (20-49)', focus: 'Make each part of your business 1% better.', color: 'gray', desc: "You now have small teams or 'departments' (like a sales team and a delivery team). Your job is to make each of those teams a little bit more efficient. Small improvements in each area lead to huge growth overall." },
    { num: '7', title: 'Categorize', revenue: 49000000, emp: 'Management Layer (50-99)', focus: 'Hire leaders to run the departments.', color: 'blue', desc: "You can't manage everyone yourself anymore. You need to hire managers to lead the different teams. Your job changes from being a player to being the coach of the coaches." },
    { num: '8', title: 'Specialize', revenue: 99000000, emp: 'Experts (100-249)', focus: 'Become the #1 in the world at ONE thing.', color: 'green', desc: "Your company is now big. To keep growing, you must become famous for being the absolute best at one very specific thing. This is where you dominate your market and build a powerful brand." },
    { num: '9', title: 'Capitalize', revenue: 249000000, emp: 'Empire (250-500+)', focus: 'Use your success to start new adventures.', color: 'purple', desc: "You've built a huge, successful business! Now you can use your money, team, and brand to launch new products, buy other companies, and expand your kingdom into new lands." },
];

const getCurrentStageIndex = (monthlyRevenue: string) => {
    const revenue = parseFloat(monthlyRevenue) * 12;
    if (isNaN(revenue)) return 0;

    let stageIndex = 0;
    for (let i = stages.length - 1; i >= 0; i--) {
        if (revenue >= stages[i].revenue) {
            stageIndex = i;
            break;
        }
    }
    return stageIndex;
};


// FIX: Add businessData prop to use for monthlyRevenue.
const ScalingStagesGuide: React.FC<{ playbook: GeneratedPlaybook; businessData: BusinessData }> = ({ playbook, businessData }) => {
    // FIX: Access monthlyRevenue from businessData prop.
    const currentStageIndex = getCurrentStageIndex(businessData?.monthlyRevenue || '0');
    
    const renderStagePages = () => {
        const pages = [];
        for (let i = 0; i < stages.length; i += 3) {
            const pageStages = stages.slice(i, i + 3);
            pages.push(
                <GuidePage key={i}>
                    <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {pageStages.map((s, index) => (
                            <div key={s.num} className={pageStages.length === 3 && index === 2 ? 'md:col-span-2' : ''}>
                                <StageCard
                                    number={s.num}
                                    title={s.title}
                                    employees={s.emp}
                                    focus={s.focus}
                                    color={s.color}
                                    isCurrent={currentStageIndex === (i + index)}
                                >
                                    {s.desc}
                                </StageCard>
                            </div>
                        ))}
                    </main>
                </GuidePage>
            );
        }
        return pages;
    };


    return (
        <>
            <GuidePage>
                <header className="text-center mb-12 pb-6">
                    <p className="font-bold text-yellow-600">SCALING WORKSHOP</p>
                    <Title>The Scaling Roadmap: Your Growth Path</Title>
                    <Subtitle>From a small hut to a giant castle, this is the path of a business adventurer!</Subtitle>
                </header>
                <main>
                    <P>Every great business grows through stages. Knowing which stage you're in tells you what your ONLY job is right now. Don't try to build castle walls when you still need to find your first bag of gold!</P>
                    <P>Based on your current revenue, your business is in the stage highlighted below.</P>
                </main>
            </GuidePage>
            
            {renderStagePages()}
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
