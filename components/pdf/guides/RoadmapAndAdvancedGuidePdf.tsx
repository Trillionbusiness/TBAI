
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

const InPersonAdsGuide: React.FC = () => (
    <GuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">ADVANCED STRATEGY WORKSHOP</p>
            <Title>In-Person Advertising</Title>
            <Subtitle>How to find customers in the real world, not just online.</Subtitle>
        </header>
        <main>
            <SectionTitle>Principle: The "Open with the Goal" Method</SectionTitle>
            <P>This is a powerful strategy for live events, trade shows, or even local markets. It means making your offer the very FIRST thing people see or hear. Don't start by talking about yourself; start by giving them something valuable.</P>
            <WorksheetBox title="Example: The Baker's Method">
                <P className='text-sm'>A baker doesn't stand inside his shop and wait. He stands OUTSIDE with a tray of free, warm cookie samples. The cookie is his offer! He "opened" with the "goal" (getting you to taste his delicious cookie). Once you taste it, you're much more likely to go inside and buy a whole box.</P>
            </WorksheetBox>
             <WorksheetBox title="Worksheet: Your 'Free Cookie Sample'">
                <P className="text-sm">How can you give a "free cookie sample" of your business in the real world? What is a small, quick win you can provide to someone in person that gives them a taste of your main offer?</P>
                <BlankLines lines={4} />
            </WorksheetBox>
        </main>
    </GuidePage>
);

const BusinessRoadmapGuide: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => (
    <>
        <GuidePage>
            <header className="text-center mb-12 pb-6">
                <p className="font-bold text-yellow-600">ADVANCED STRATEGY WORKSHOP</p>
                <Title>Your Business Roadmap</Title>
                <Subtitle>Your secret treasure map for the next 10 years of adventure!</Subtitle>
            </header>
            <main>
                <SectionTitle>Principle: A Decade in a Page</SectionTitle>
                <P>A great adventurer doesn't just think about today's treasure. They have a map for the future! This helps you make smart choices and not get lost. Let's build your map.</P>
                <WorksheetBox title="Worksheet: Your Strategic Roadmap">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-gray-700">The 90-Day Sprint (Your Current Quest)</h4>
                            <P className="text-sm">To get started, what are the 3-5 most important projects for the next 90 days? Your playbook's diagnosis has already identified these for you!</P>
                            <div className="p-3 bg-white rounded-md text-sm">
                                {playbook.diagnosis.actions.map((action, i) => <p key={i}><strong>{i + 1}.</strong> {action}</p>)}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-700">The 1-Year Goal (The Next Treasure Chest)</h4>
                            <P className="text-sm">To move toward your big dream, what is the single most important milestone you must achieve in the next year?</P>
                             <BlankLines lines={2} />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-700">The 3-Year Vision (The Distant Castle)</h4>
                            <P className="text-sm">What is the one HUGE, exciting thing you want your business to be in 3 years? Be specific and dream big!</P>
                             <BlankLines lines={3} />
                        </div>
                    </div>
                </WorksheetBox>
            </main>
        </GuidePage>
        <GuidePage>
            <main>
                <SectionTitle>Your Most Important Words: Calls to Action (CTAs)</SectionTitle>
                <P>At the end of every ad, post, email, or conversation, you MUST tell people exactly what to do next. If you don't tell them what to do, they will do nothing!</P>
                <WorksheetBox title="Worksheet: Sharpening Your CTA">
                     <P className="text-sm">Your "Sales Funnel" plan includes this Call to Action for your ads: </P>
                    <div className="p-3 bg-white rounded-md my-2 text-center italic text-gray-800">"{playbook.salesFunnel.stages[0].adCopy.cta}"</div>
                    <P className="text-sm">Let's make it even more powerful. A great CTA is clear, specific, and includes a benefit or urgency.</P>
                     <div className="mt-4">
                        <p className="font-semibold text-gray-700">Rewrite your CTA to be even more compelling:</p>
                        <P className="text-xs italic">(e.g., Instead of "Learn More," try "Download your free guide now and discover 3 secrets to...").</P>
                        <BlankLines lines={2} />
                    </div>
                </WorksheetBox>
            </main>
        </GuidePage>
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
            return <InPersonAdsGuide />;
        case 'guide-business-roadmap':
            return <BusinessRoadmapGuide playbook={playbook} />;
        default:
            return null;
    }
};

export default RoadmapAndAdvancedGuidePdf;
