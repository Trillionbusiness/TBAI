
import React from 'react';
import { BusinessData, GeneratedPlaybook } from '../../../types';

// --- Reusable Theming Components ---
const RAGuidePage: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => (
    <div data-pdf-page="true" className={`p-10 bg-white font-sans text-gray-800 break-after-page relative overflow-hidden border-t-8 border-gray-800 ${className}`} style={{ fontFamily: "'Inter', sans-serif", width: '800px', minHeight: '1131px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
        <div className="absolute top-4 right-8 text-xs font-bold text-gray-400">BUSINESS UNIVERSITY MASTERCLASS</div>
        <div className="relative z-10">{children}</div>
    </div>
);

const RATitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-5xl font-black text-gray-800 tracking-tighter text-center">{children}</h1>;
const RASubtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-xl text-gray-500 mt-3 text-center">{children}</p>;
const RASectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className={`text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-3 mb-6 mt-10 break-after-avoid`}>{children}</h2>;
const RAP: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-600 leading-relaxed my-3 ${className || ''}`}>{children}</p>;
const RAActionBox: React.FC<{ title: string, children: React.ReactNode, icon?: string }> = ({ title, children, icon }) => (
    <div className={`p-6 bg-gray-50 rounded-lg border border-gray-200 my-4`}>
        <h3 className={`font-bold text-lg text-gray-800 flex items-center`}>
            {icon && <span className="mr-3 text-2xl">{icon}</span>}
            {title}
        </h3>
        <div className="mt-3 text-sm text-gray-700">{children}</div>
    </div>
);
const RAScriptBox: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="p-4 bg-gray-800 rounded-lg text-white font-mono text-sm my-4">
        <p className="font-bold text-yellow-400 mb-2">{`// ${title}`}</p>
        <div className="whitespace-pre-wrap">{children}</div>
    </div>
);

// --- Individual Guide Components ---

const InPersonAdsGuide: React.FC<{ playbook: GeneratedPlaybook, businessData: BusinessData }> = ({ playbook, businessData }) => (
    <>
        <RAGuidePage>
            <header className="text-center mb-12 pb-6">
                <p className="font-bold text-yellow-600">ADVANCED STRATEGY MASTERCLASS</p>
                <RATitle>Your Local Event Playbook</RATitle>
                <RASubtitle>How to dominate local events and find customers in the real world.</RASubtitle>
            </header>
            <main>
                <RASectionTitle>Principle: The "Free Sample" Method</RASectionTitle>
                <RAP>The goal of an in-person event is to give people a "free sample" of the value you provide. A baker stands outside with free cookies; a gym can run a free outdoor workout. You must give them a taste of the result, which makes them want the full meal.</RAP>
                
                <RASectionTitle>Your Generated Event Idea</RASectionTitle>
                <RAActionBox title={`The "${businessData.businessType} Community Workshop"`} icon="🎪">
                    <RAP>This is a low-cost, high-value event you can run monthly to attract your ideal customers ({businessData.targetClient}).</RAP>
                    <p><strong>Step 1 (The Hook):</strong> Offer a free 1-hour workshop that solves ONE painful problem. For example, a "{playbook.diagnosis.constraints[0]}" workshop.</p>
                    <p className="mt-2"><strong>Step 2 (The Location):</strong> Partner with a local, non-competing business that serves the same audience (e.g., a coffee shop, a library, a community center). Offer to run it for free at their location in exchange for them promoting it to their customers.</p>
                    <p className="mt-2"><strong>Step 3 (The Event):</strong> During the workshop, deliver immense value for 45 minutes. Be the most helpful person in the room.</p>
                    <p className="mt-2"><strong>Step 4 (The Pitch):</strong> In the last 15 minutes, say: "If you enjoyed this, I have a program called '{playbook.offer1.name}' where we go deep on this and solve the entire problem for you. For everyone here today, I'm offering [a special bonus or discount]. Let's chat afterwards if you're interested."</p>
                </RAActionBox>
            </main>
        </RAGuidePage>
        <RAGuidePage>
            <main>
                 <RASectionTitle>Workshop Slide Deck Outline</RASectionTitle>
                 <RAP>Use this simple 5-slide structure for your presentation.</RAP>
                 <ol className="list-decimal pl-5 space-y-4 text-sm">
                    <li><strong>Slide 1 (Title):</strong> The Big Promise. (e.g., "How to Fix {playbook.diagnosis.constraints[0]} in Under 60 Minutes").</li>
                    <li><strong>Slide 2 (The Problem):</strong> Agitate the pain. Talk about why this problem is so frustrating for {businessData.targetClient}.</li>
                    <li><strong>Slide 3 (The "Aha!" Moment):</strong> Share your unique insight or the "one big thing" they need to know. This should be your core teaching point.</li>
                    <li><strong>Slide 4 (The 3-Step Solution):</strong> Give them three simple, actionable steps they can take right now. This delivers the value you promised.</li>
                    <li><strong>Slide 5 (The Next Step):</strong> This is your pitch. Briefly introduce your main offer, "{playbook.offer1.name}," as the way to get this fully implemented with expert help.</li>
                 </ol>

                <RASectionTitle>Post-Event Follow-Up</RASectionTitle>
                <RAP>Collect emails at the event. The next day, send this follow-up sequence.</RAP>
                <RAScriptBox title="Follow-Up Email for Attendees">
                    <p>Subject: Great to see you at the workshop!</p>
                    <p>Hey [Name],</p>
                    <p className="mt-2">Thanks for coming to the workshop yesterday. I've attached my slides for you here.</p>
                    <p className="mt-2">As promised, here's the special offer for attendees: [Your special offer]. This is valid for the next 48 hours.</p>
                    <p className="mt-2">If you're ready to solve [Problem] for good, you can grab that here: [Link]</p>
                    <p className="mt-2">Best,</p>
                    <p>[Your Name]</p>
                </RAScriptBox>
            </main>
        </RAGuidePage>
    </>
);

const BusinessRoadmapGuide: React.FC<{ playbook: GeneratedPlaybook, businessData: BusinessData }> = ({ playbook, businessData }) => (
    <>
        <RAGuidePage>
            <header className="text-center mb-12 pb-6">
                <p className="font-bold text-yellow-600">ADVANCED STRATEGY MASTERCLASS</p>
                <RATitle>Your Strategic Roadmap</RATitle>
                <RASubtitle>Your treasure map for the next 3 years of business growth.</RASubtitle>
            </header>
            <main>
                <RASectionTitle>Principle: A Decade in a Page</RASectionTitle>
                <RAP>A great adventurer doesn't just think about today's treasure. They have a map for the future! This helps you make smart choices and not get lost. We will plan your 90-Day, 1-Year, and 3-Year quests.</RAP>
                
                <RAActionBox title="The 90-Day Sprint (Your Current Quest)" icon="🎯">
                    <RAP>This is your immediate focus. Your playbook's diagnosis has already identified your critical mission:</RAP>
                    <ul className="list-decimal pl-5 mt-2 space-y-2 text-sm font-semibold text-gray-900">
                        {playbook.diagnosis.actions.map((action, i) => <li key={i}>{action}</li>)}
                    </ul>
                    <RAP>Executing these actions is your only priority for the next 90 days.</RAP>
                </RAActionBox>
            </main>
        </RAGuidePage>
        <RAGuidePage>
            <main>
                <RASectionTitle>Your Long-Term Vision</RASectionTitle>
                <RAActionBox title="The 1-Year Goal (The Next Treasure Chest)" icon="🗺️">
                    <RAP>To move to the next stage of growth, your single most important milestone for the next year is to <strong>systematize your primary marketing channel</strong>. This means turning {playbook.marketingModel.steps[0].method} from something you *do* into a reliable machine that runs with or without you.</RAP>
                    <p className="font-semibold mt-2">Key Projects for Year 1:</p>
                    <ul className="list-disc pl-5 text-sm">
                        <li>Document the entire process for {playbook.marketingModel.steps[0].method}.</li>
                        <li>Hire and train a Virtual Assistant or your first employee to run this playbook.</li>
                        <li>Achieve a consistent monthly revenue of [Your Profit Goal: {businessData.profitGoal} {businessData.currency}].</li>
                    </ul>
                </RAActionBox>
                <RAActionBox title="The 3-Year Vision (The Distant Castle)" icon="🏰">
                    <RAP>Based on your business model, your 3-year vision is to become a recognized authority in your niche and begin to productize your services.</RAP>
                     <p className="font-semibold mt-2">Key Projects for Year 3:</p>
                    <ul className="list-disc pl-5 text-sm">
                        <li>Launch a digital product (e.g., an online course or toolkit) based on your core offer.</li>
                        <li>Build a team of at least 3-5 people who can handle day-to-day operations.</li>
                        <li>Become a guest on 5-10 industry podcasts to build your brand authority.</li>
                    </ul>
                </RAActionBox>
            </main>
        </RAGuidePage>
        <RAGuidePage>
            <main>
                <RASectionTitle>Action Plan: Your Quarterly "Rocks"</RASectionTitle>
                <RAP>You can't do everything at once. Each quarter, choose only 3-5 "Rocks" - your most important priorities. This worksheet helps you plan your next 90 days.</RAP>
                <div className="p-4 border-2 border-dashed">
                    <h3 className="font-bold text-center text-xl">Quarterly Planning Worksheet: Q_ 202_</h3>
                    <table className="w-full text-sm mt-4">
                        <thead><tr className="border-b"><th className="p-2 text-left w-1/2">"Rock" (Top 3-5 Priorities)</th><th className="p-2 text-left">Success Metric</th></tr></thead>
                        <tbody>
                            <tr className="border-b"><td className="p-2 h-10 border-r"></td><td className="p-2"></td></tr>
                            <tr className="border-b"><td className="p-2 h-10 border-r"></td><td className="p-2"></td></tr>
                            <tr className="border-b"><td className="p-2 h-10 border-r"></td><td className="p-2"></td></tr>
                            <tr className="border-b"><td className="p-2 h-10 border-r"></td><td className="p-2"></td></tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </RAGuidePage>
    </>
);


interface RoadmapAndAdvancedGuidePdfProps {
    playbook: GeneratedPlaybook;
    businessData: BusinessData;
    type: string;
}

const RoadmapAndAdvancedGuidePdf: React.FC<RoadmapAndAdvancedGuidePdfProps> = ({ playbook, businessData, type }) => {
    switch (type) {
        case 'guide-in-person-ads':
            return <InPersonAdsGuide playbook={playbook} businessData={businessData} />;
        case 'guide-business-roadmap':
            return <BusinessRoadmapGuide playbook={playbook} businessData={businessData} />;
        default:
            return null;
    }
};

export default RoadmapAndAdvancedGuidePdf;
