
import React from 'react';
import { BusinessData, GeneratedPlaybook } from '../../../types';

// --- Reusable Theming Components ---
const EGGuidePage: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => (
    <div data-pdf-page="true" className={`p-10 bg-white font-sans text-gray-800 break-after-page relative overflow-hidden border-t-8 border-gray-800 ${className}`} style={{ fontFamily: "'Inter', sans-serif", width: '800px', minHeight: '1131px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
        <div className="absolute top-4 right-8 text-xs font-bold text-gray-400">BUSINESS UNIVERSITY MASTERCLASS</div>
        <div className="relative z-10">{children}</div>
    </div>
);

const EGTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-5xl font-black text-gray-800 tracking-tighter text-center">{children}</h1>;
const EGSubtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-xl text-gray-500 mt-3 text-center">{children}</p>;
const EGSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className={`text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-3 mb-6 mt-10 break-after-avoid`}>{children}</h2>;
const EGP: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-600 leading-relaxed my-3 ${className || ''}`}>{children}</p>;
const EGActionBox: React.FC<{ title: string, children: React.ReactNode, status: 'To-Do' | 'In Progress' }> = ({ title, children, status }) => {
    const statusStyles = {
        'To-Do': { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800' },
        'In Progress': { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800' },
    };
    const styles = statusStyles[status];
    return (
        <div className={`p-6 rounded-lg border my-4 ${styles.bg} ${styles.border}`}>
            <div className="flex justify-between items-center">
                <h3 className={`font-bold text-lg ${styles.text}`}>{title}</h3>
            </div>
            <div className="mt-2 text-sm text-gray-700">{children}</div>
        </div>
    );
};

const Execution100kGuide: React.FC<{ playbook: GeneratedPlaybook, businessData: BusinessData }> = ({ playbook, businessData }) => {
    return (
        <>
            <EGGuidePage>
                <header className="text-center mb-12 pb-6">
                    <p className="font-bold text-yellow-600">EXECUTION MASTERCLASS</p>
                    <EGTitle>The First 100-Day Action Plan</EGTitle>
                    <EGSubtitle>Your hyper-specific execution plan for your {businessData.businessType}</EGSubtitle>
                </header>

                <main>
                    <EGSectionTitle>The Core Principle: Volume & Speed</EGSectionTitle>
                    <EGP>The path to your first $100,000 is paved with massive, imperfect action. It's a volume game. Your only job is to execute the simple plan below with relentless consistency. Do not get distracted by shiny objects. Do the work.</EGP>
                    
                     <EGSectionTitle>Your 30-Day Sprint Plan</EGSectionTitle>
                    <EGActionBox title="Week 1: Foundation & Calibration" status="In Progress">
                        <p><strong>Goal:</strong> Master your scripts and set up your tracking systems.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Memorize the sales scripts and objection handlers in your "Sales System".</li>
                            <li>Perform 20 "practice" outreach attempts (cold email, social media DMs, etc.) using the templates in your "Marketing Model".</li>
                            <li>Set up your "Business Scorecard" to track your top KPIs daily.</li>
                        </ul>
                    </EGActionBox>
                     <EGActionBox title="Week 2-3: Massive Action" status="To-Do">
                        <p><strong>Goal:</strong> Execute a high volume of outreach every single day. This is the most important phase.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Execute a minimum of <strong>50 outreach attempts per day</strong> using your primary marketing channels.</li>
                            <li>Log every conversation and track your KPIs on the scorecard.</li>
                            <li>Handle every sales conversation personally. Do not delegate this yet.</li>
                        </ul>
                    </EGActionBox>
                    <EGActionBox title="Week 4: Analyze & Double Down" status="To-Do">
                       <p><strong>Goal:</strong> Identify what's working and do more of it.</p>
                       <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Review your KPI data. Which outreach method generated the most conversations?</li>
                            <li>Which script or angle got the best responses?</li>
                            <li>For the next 30 days, eliminate the worst-performing channel and double your efforts on the best-performing one.</li>
                        </ul>
                    </EGActionBox>
                </main>
            </EGGuidePage>

            <EGGuidePage>
                 <main>
                    <EGSectionTitle>The Founder's Time Audit</EGSectionTitle>
                    <EGP>As a founder, your time is your most valuable asset. Use this worksheet to audit your week. Be honest. The goal is to eliminate or delegate low-value tasks so you can focus on what truly grows the business: sales and marketing.</EGP>
                     <table className="w-full text-sm mt-4 border">
                        <thead className="bg-gray-800 text-white"><tr className="text-left"><th className="p-2 border">Task Category</th><th className="p-2 border">Example Activities</th><th className="p-2 border">Hours/Week?</th><th className="p-2 border">Delegate? (Y/N)</th></tr></thead>
                        <tbody>
                            <tr className="border-b bg-green-50"><td className="p-2 border font-bold">High Leverage (Growth)</td><td className="p-2 border">Sales calls, Creating offers, Marketing outreach</td><td className="p-2 border h-10"></td><td className="p-2 border">No</td></tr>
                            <tr className="border-b bg-yellow-50"><td className="p-2 border font-bold">Medium Leverage (Operations)</td><td className="p-2 border">Client fulfillment, Answering emails, Team meetings</td><td className="p-2 border h-10"></td><td className="p-2 border">Soon</td></tr>
                            <tr className="border-b bg-red-50"><td className="p-2 border font-bold">Low Leverage (Admin)</td><td className="p-2 border">Scheduling, Invoicing, Basic data entry</td><td className="p-2 border h-10"></td><td className="p-2 border">Yes!</td></tr>
                        </tbody>
                    </table>
                 </main>
            </EGGuidePage>
            
            <EGGuidePage>
                 <main>
                    <EGSectionTitle>Building Your "Second Brain"</EGSectionTitle>
                    <EGP>You can't keep everything in your head. A "Second Brain" is a simple system using digital tools to organize your plan and keep you focused. Here’s a simple setup using free tools.</EGP>
                     <EGActionBox title="Step 1: The Master Plan (Google Docs)" status="To-Do">
                        <p>Create a single Google Doc. Copy and paste your main diagnosis, your core offer, and your top 3 marketing templates into it. This is your single source of truth. Read it every morning.</p>
                    </EGActionBox>
                     <EGActionBox title="Step 2: The Action Board (Trello)" status="To-Do">
                        <p>Create a free Trello board with three columns: "To Do," "Doing," and "Done."</p>
                        <ul className="list-disc pl-5 mt-2">
                            <li>In "To Do," create a card for each of your key diagnosis actions.</li>
                            <li>Each week, pull one major task into the "Doing" column.</li>
                            <li>Move it to "Done" when complete. This visual progress is highly motivating.</li>
                        </ul>
                    </EGActionBox>
                    <EGActionBox title="Step 3: The Daily Log (A Simple Notebook)" status="To-Do">
                        <p>At the end of each day, write down three numbers in a physical notebook: 1) Outreach attempts made, 2) Conversations had, 3) Sales made. This simple habit keeps you accountable to the metrics that matter.</p>
                    </EGActionBox>
                 </main>
            </EGGuidePage>
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
