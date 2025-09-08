
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

const ReferralsGuide: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => (
    <GuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">LEVERAGE WORKSHOP</p>
            <Title>Customer Referrals: Your Growth Army</Title>
            <Subtitle>Turn your happiest customers into your best sales team!</Subtitle>
        </header>
        <main>
            <SectionTitle>Principle: The Two-Sided Reward</SectionTitle>
            <P>Your best future customers are probably friends with your best current customers! The best referral programs give a gift to BOTH the person referring and the new friend they bring in. This makes everyone happy!</P>
            <WorksheetBox title="Worksheet: Design Your Referral Program">
                <P className="text-sm">Let's create a referral offer based on your main offer, <strong>"{playbook.offer1.name}"</strong>, which is priced at <strong>{playbook.offer1.price}</strong>.</P>
                <div className="mt-4 p-4 bg-white rounded-md text-sm text-gray-700 space-y-2">
                    <p><strong>Step 1: The New Friend's Gift.</strong> Give them a discount to make it easy to say yes.</p>
                    <p><em>Example: Give the new friend <strong>[e.g., 20% off]</strong> their first purchase.</em></p>
                    <BlankLines lines={1} />
                     <p><strong>Step 2: The Referrer's Reward.</strong> Give your current customer a reward after their friend buys.</p>
                    <p><em>Example: Give your customer a <strong>[e.g., $50 Amazon Gift Card]</strong>.</em></p>
                    <BlankLines lines={1} />
                </div>
            </WorksheetBox>
            <SectionTitle>Tactics: When and How to Ask</SectionTitle>
            <P>The perfect time to ask for a referral is right after a customer has a big win or says something nice about you. Their excitement is at its peak!</P>
            <P><strong>Action Item:</strong> Set up an automated email that goes out to a customer after they complete a key step or have been a customer for a certain amount of time (e.g., 30 days).</P>
        </main>
    </GuidePage>
);

// FIX: Add businessData prop to use for businessType.
const EmployeesGuide: React.FC<{ playbook: GeneratedPlaybook; businessData: BusinessData }> = ({ playbook, businessData }) => {
    const firstRole = playbook.operationsPlan.proposedRoles[0];
    return (
    <GuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">LEVERAGE WORKSHOP</p>
            <Title>Hiring Your First Employee</Title>
            {/* FIX: Access businessType from businessData prop. */}
            <Subtitle>How to hire helpers so you can focus on growing your {businessData?.businessType}</Subtitle>
        </header>
        <main>
            <SectionTitle>Principle: Delegate, Then Disappear</SectionTitle>
            <P>You should hire someone when you find yourself consistently spending time on tasks that are NOT your unique genius (e.g., sales, product creation). Your first hire should take repetitive, time-consuming tasks off your plate so you can focus on high-leverage activities.</P>
            <WorksheetBox title="Your First Hire: Job Description">
                <P className="text-sm">Your playbook's "Operations Plan" has already identified the first critical role to hire for your business:</P>
                <div className="p-3 bg-white rounded-md mt-2 font-bold text-center text-green-700">
                    Role Title: {firstRole.roleTitle}
                </div>
                <P className="text-sm mt-4">Here are the core responsibilities for this role, taken directly from your plan. Use this as the foundation for your job posting.</P>
                <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
                    {firstRole.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                </ul>
                 <P className="text-sm mt-4"><strong>Key Performance Indicator (KPI):</strong> The success of this role will be measured by: {firstRole.keyMetric}.</P>
            </WorksheetBox>
        </main>
    </GuidePage>
)};

const AgenciesGuide: React.FC = () => (
    <GuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">LEVERAGE WORKSHOP</p>
            <Title>Working with Agencies</Title>
            <Subtitle>How to hire a team of wizards to cast powerful growth spells for you.</Subtitle>
        </header>
        <main>
            <SectionTitle>Principle: Amplify What Works</SectionTitle>
            <P>An agency is a team of experts in one specific thing (like running Facebook Ads or doing SEO). Their job is to put fuel on a fire that's already burning. They cannot create the fire for you.</P>
            <P><strong>Only hire an agency when:</strong></P>
            <ol className="list-decimal pl-5 text-base space-y-1">
                <li>You have an offer that is already proven to convert customers.</li>
                <li>You know exactly how much you are willing to spend to acquire a new customer (your Target CAC).</li>
            </ol>
             <WorksheetBox title="Worksheet: Agency Interview Questions">
                <P className="text-sm">Before you hire an agency, ask them these critical questions:</P>
                <div className="mt-4">
                    <p className="font-semibold text-gray-700">1. "Can you show me 2-3 case studies of clients similar to my business?"</p>
                    <BlankLines lines={1} />
                </div>
                <div className="mt-4">
                    <p className="font-semibold text-gray-700">2. "What is your detailed process for the first 90 days?"</p>
                    <BlankLines lines={3} />
                </div>
                 <div className="mt-4">
                    <p className="font-semibold text-gray-700">3. "How do you define success, and what specific metrics will we be tracking daily, weekly, and monthly?"</p>
                    <BlankLines lines={3} />
                </div>
            </WorksheetBox>
        </main>
    </GuidePage>
);

// FIX: Add businessData prop to use for targetClient.
const AffiliatesGuide: React.FC<{ playbook: GeneratedPlaybook; businessData: BusinessData }> = ({ playbook, businessData }) => (
    <GuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">LEVERAGE WORKSHOP</p>
            <Title>Affiliates & Partners: Your Alliance</Title>
            <Subtitle>Building an army of allies who sell your treasure for you.</Subtitle>
        </header>
        <main>
            <SectionTitle>Principle: Shared Audiences</SectionTitle>
            <P>An affiliate is someone who promotes your product to their audience for a commission on sales. The perfect partner sells to the SAME type of customer as you, but sells something DIFFERENT and non-competitive.</P>
            <WorksheetBox title="Worksheet: Brainstorming Your Ideal Partners">
                {/* FIX: Access targetClient from businessData prop. */}
                <P className="text-sm">Your business helps <strong>{businessData?.targetClient}</strong>. What other types of businesses also serve them?</P>
                <P className="text-sm">(e.g., A wedding photographer and a wedding planner are perfect partners. A gym and a healthy meal prep company are perfect partners.)</P>
                 <BlankLines lines={5} />
            </WorksheetBox>
            <WorksheetBox title="Your Outreach Template">
                <P className="text-sm">Here is a simple script to propose a partnership.</P>
                <div className="mt-2 p-4 bg-gray-100 rounded-md text-sm text-gray-700 space-y-2">
                    <p>Hey [Partner's Name],</p>
                    <p>I'm a big fan of what you do for [shared audience]. I run [Your Business Name] and we help them with [the problem you solve].</p>
                    <p>I'd love to explore how we could support each other. I'm building a partnership program and would be happy to offer a commission of <strong>[e.g., 20%]</strong> for any customers you send our way.</p>
                    <p>Would you be open to a quick chat next week?</p>
                </div>
            </WorksheetBox>
        </main>
    </GuidePage>
);

interface LeverageGuidePdfProps {
    playbook: GeneratedPlaybook;
    businessData: BusinessData;
    type: string;
}

const LeverageGuidePdf: React.FC<LeverageGuidePdfProps> = ({ playbook, businessData, type }) => {
    switch(type) {
        case 'guide-referrals': return <ReferralsGuide playbook={playbook} />;
        case 'guide-employees': return <EmployeesGuide playbook={playbook} businessData={businessData} />;
        case 'guide-agencies': return <AgenciesGuide />;
        case 'guide-affiliates': return <AffiliatesGuide playbook={playbook} businessData={businessData} />;
        default: return null;
    }
};

export default LeverageGuidePdf;
