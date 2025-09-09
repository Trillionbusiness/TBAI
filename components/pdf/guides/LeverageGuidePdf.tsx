
import React from 'react';
import { BusinessData, GeneratedPlaybook } from '../../../types';

// --- Reusable Theming Components ---
const LVGuidePage: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => (
    <div data-pdf-page="true" className={`p-10 bg-white font-sans text-gray-800 break-after-page relative overflow-hidden border-t-8 border-gray-800 ${className}`} style={{ fontFamily: "'Inter', sans-serif", width: '800px', minHeight: '1131px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
        <div className="absolute top-4 right-8 text-xs font-bold text-gray-400">BUSINESS UNIVERSITY MASTERCLASS</div>
        <div className="relative z-10">{children}</div>
    </div>
);

const LVTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-5xl font-black text-gray-800 tracking-tighter text-center">{children}</h1>;
const LVSubtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-xl text-gray-500 mt-3 text-center">{children}</p>;
const LVSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className={`text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-3 mb-6 mt-10 break-after-avoid`}>{children}</h2>;
const LVP: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-600 leading-relaxed my-3 ${className || ''}`}>{children}</p>;
const LVActionBox: React.FC<{ title: string, children: React.ReactNode, icon?: string }> = ({ title, children, icon }) => (
    <div className={`p-6 bg-gray-50 rounded-lg border border-gray-200 my-4`}>
        <h3 className={`font-bold text-lg text-gray-800 flex items-center`}>
            {icon && <span className="mr-3 text-2xl">{icon}</span>}
            {title}
        </h3>
        <div className="mt-3 text-sm text-gray-700">{children}</div>
    </div>
);
const LVScriptBox: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="p-4 bg-gray-800 rounded-lg text-white font-mono text-sm my-4">
        <p className="font-bold text-yellow-400 mb-2">{`// ${title}`}</p>
        <div className="whitespace-pre-wrap">{children}</div>
    </div>
);

// --- Individual Guide Components ---

const ReferralsGuide: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => (
    <LVGuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">LEVERAGE MASTERCLASS</p>
            <LVTitle>Your Referral Program Launch Kit</LVTitle>
            <LVSubtitle>Turn your happiest customers into your best sales team, automatically.</LVSubtitle>
        </header>
        <main>
            <LVSectionTitle>Principle: The Two-Sided Reward</LVSectionTitle>
            <LVP>The best referral programs give a gift to BOTH the person referring and the new friend they bring in. This makes everyone happy and removes any awkwardness from the transaction.</LVP>
            
            <LVActionBox title="Your Generated Referral Offer" icon="🎁">
                <LVP>Based on your main offer, <strong>"{playbook.offer1.name}"</strong>, here is a balanced, ready-to-launch referral program:</LVP>
                <div className="mt-2 p-4 bg-white rounded grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-xs font-bold text-gray-400">THE NEW FRIEND GETS:</p>
                        <p className="text-2xl font-bold text-blue-600">20% OFF</p>
                        <p className="text-xs text-gray-500">their purchase of "{playbook.offer1.name}"</p>
                    </div>
                     <div>
                        <p className="text-xs font-bold text-gray-400">YOUR CUSTOMER GETS:</p>
                        <p className="text-2xl font-bold text-green-600">$50</p>
                        <p className="text-xs text-gray-500">(e.g., Amazon Gift Card) after their friend buys</p>
                    </div>
                </div>
            </LVActionBox>
            
            <LVSectionTitle>How to Launch Your Program</LVSectionTitle>
            <LVP>Use the email template below to announce your new referral program to your existing happy customers.</LVP>
            <LVActionBox title="Ready-to-Send Email Template" icon="📧">
                 <LVScriptBox title="Referral Program Announcement Email">
                    <p>Subject: A quick question (& a gift for you!)</p>
                    <p>Hey [Customer Name],</p>
                    <p className="mt-2">Hope you're loving the results from "{playbook.offer1.name}"!</p>
                    <p className="mt-2">I'm reaching out because I'm launching a new referral program, and I'd love for you to be a part of it. My business grows best through word-of-mouth from happy customers like you.</p>
                    <p className="mt-2">It's simple: if you know someone who could benefit, you can give them <strong>20% off</strong>. As a thank you, I'll send you a <strong>$50 Amazon gift card</strong> once they sign up.</p>
                    <p className="mt-2">Is there anyone who comes to mind?</p>
                    <p className="mt-2">Thanks for your support!</p>
                    <p>[Your Name]</p>
                 </LVScriptBox>
            </LVActionBox>
        </main>
    </LVGuidePage>
);

const EmployeesGuide: React.FC<{ playbook: GeneratedPlaybook; businessData: BusinessData }> = ({ playbook, businessData }) => {
    const employeeCount = parseInt(businessData.employees) || 0;
    const isScaling = employeeCount > 4; 
    const firstRole = playbook.operationsPlan.proposedRoles[0] || { roleTitle: 'Key Team Member', responsibilities: ['Drive key initiatives'], keyMetric: 'Overall Growth', dailyStructure: 'Execute on priorities.' };

    if (isScaling) {
        return (
            <>
                <LVGuidePage>
                    <header className="text-center mb-12 pb-6">
                        <p className="font-bold text-yellow-600">LEVERAGE MASTERCLASS</p>
                        <LVTitle>Building Your A-Team</LVTitle>
                        <LVSubtitle>Your guide to structuring and hiring for a {businessData.businessType} with {employeeCount} employees.</LVSubtitle>
                    </header>
                    <main>
                        <LVSectionTitle>Your Vision Org Chart</LVSectionTitle>
                        <LVP>For a business of your size and type, you need to think in terms of departments. A simple, powerful structure is to have three core leaders reporting to you.</LVP>
                        <LVActionBox title="Future-State Organizational Chart" icon="📈">
                             <div className="text-center font-bold">
                                <div className="p-2 bg-gray-200 rounded inline-block">You (CEO / Visionary)</div>
                                <div className="flex justify-around mt-4">
                                    <div className="p-2 bg-blue-100 rounded">Head of Marketing</div>
                                    <div className="p-2 bg-green-100 rounded">Head of Sales</div>
                                    <div className="p-2 bg-yellow-100 rounded">Head of Operations</div>
                                </div>
                             </div>
                             <LVP className="text-xs text-center mt-2">Your current team of {employeeCount} should be organized under these three leaders.</LVP>
                        </LVActionBox>
                    </main>
                </LVGuidePage>
                <LVGuidePage>
                    <main>
                        <LVSectionTitle>Key Role Scorecards</LVSectionTitle>
                        <LVP>Don't hire based on a job description. Hire based on a "Scorecard" that defines what success looks like. Here are templates for your key leadership roles.</LVP>
                         <LVActionBox title="Role Scorecard: Head of Marketing" icon="📣">
                            <p><strong>Mission:</strong> To build a predictable engine that generates a consistent flow of qualified leads for "{playbook.offer1.name}".</p>
                            <p className="mt-2"><strong>Key Outcomes (Measurable):</strong></p>
                            <ul className="list-disc pl-5 text-sm">
                                <li>Increase qualified leads by 25% per quarter.</li>
                                <li>Decrease Customer Acquisition Cost (CAC) by 10%.</li>
                                <li>Manage and report on the marketing budget.</li>
                            </ul>
                         </LVActionBox>
                        <LVActionBox title="Role Scorecard: Head of Sales" icon="💰">
                            <p><strong>Mission:</strong> To convert qualified leads into happy customers at a profitable rate.</p>
                            <p className="mt-2"><strong>Key Outcomes (Measurable):</strong></p>
                            <ul className="list-disc pl-5 text-sm">
                                <li>Achieve a lead-to-close rate of 20% or higher.</li>
                                <li>Grow monthly new revenue by 15% per quarter.</li>
                                <li>Train and manage the sales team (if applicable).</li>
                            </ul>
                         </LVActionBox>
                    </main>
                </LVGuidePage>
            </>
        );
    }

    // Default guide for businesses with 4 or fewer employees
    return (
    <>
    <LVGuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">LEVERAGE MASTERCLASS</p>
            <LVTitle>Your First Hire: Growth Kit</LVTitle>
            <LVSubtitle>A complete kit for hiring a "{firstRole.roleTitle}" for your {businessData.businessType}</LVSubtitle>
        </header>
        <main>
            <LVSectionTitle>Step 1: The Role Scorecard</LVSectionTitle>
            <LVP>A great hire starts with absolute clarity on what you need. A "Scorecard" defines success before you even post the job.</LVP>
            <LVActionBox title={`Role Scorecard: ${firstRole.roleTitle}`} icon="📄">
                <p><strong>Mission of the Role:</strong> The single most important purpose of this job is to [Describe the mission, e.g., "free up the founder's time by handling all administrative and operational tasks"].</p>
                <p className="mt-2"><strong>Key Outcomes (How we measure success):</strong></p>
                <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
                    {firstRole.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                    <li>Successfully improve our key metric: <strong>{firstRole.keyMetric}</strong>.</li>
                </ul>
            </LVActionBox>
        </main>
    </LVGuidePage>
    <LVGuidePage>
        <main>
            <LVSectionTitle>Step 2: The A-Player Hiring Funnel</LVSectionTitle>
            <LVP>Use this multi-step process to filter for the best candidates and avoid costly hiring mistakes.</LVP>
             <ul className="list-decimal pl-5 space-y-4 text-sm">
                <li><strong>Sourcing:</strong> Post the Scorecard on relevant job boards (e.g., LinkedIn, industry-specific sites). Ask for a 1-minute Loom video in the application to screen for communication skills.</li>
                <li><strong>The Phone Screen (15 mins):</strong> Use this call to screen for basic fit and salary expectations. Ask about their career goals.</li>
                <li><strong>The In-Depth Interview (60 mins):</strong> Go deep on their experience related to each Key Outcome on the Scorecard. Ask "Tell me about a time when..." questions.</li>
                <li><strong>The Test Project (2-3 hours, paid):</strong> Give them a small, real-world task that simulates the job. (e.g., "Draft a response to this customer email," "Organize this spreadsheet"). Pay them for their time. This is the single best predictor of performance.</li>
                <li><strong>Reference Checks:</strong> Call their previous managers and ask: "On a scale of 1-10, how would you rate their performance?" and "What could they have done to be a 10?".</li>
             </ul>
        </main>
    </LVGuidePage>
    </>
)};

const AgenciesGuide: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => (
    <LVGuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">LEVERAGE MASTERCLASS</p>
            <LVTitle>Agency Partnership Kit</LVTitle>
            <LVSubtitle>How to hire a team of experts to amplify what's already working.</LVSubtitle>
        </header>
        <main>
            <LVSectionTitle>Principle: Amplify, Don't Create</LVSectionTitle>
            <LVP>Only hire an agency to put fuel on a fire that's already burning. They cannot create the fire for you. You must have a proven, converting offer first. Your offer, "{playbook.offer1.name}", is a great foundation.</LVP>
            
             <LVSectionTitle>The Agency Scorecard</LVSectionTitle>
             <LVP>When interviewing agencies, use this scorecard to rate them objectively. Don't be swayed by a slick sales pitch; focus on substance.</LVP>
             <LVActionBox title="Agency Evaluation Scorecard" icon="📊">
                <table className="w-full text-sm">
                    <thead><tr className="border-b"><th className="p-2 text-left">Criteria</th><th className="p-2 text-left">Score (1-5)</th><th className="p-2 text-left">Notes</th></tr></thead>
                    <tbody>
                        <tr className="border-b"><td className="p-2">Similar Client Case Studies</td><td className="p-2"></td><td className="p-2"></td></tr>
                        <tr className="border-b"><td className="p-2">Clear 90-Day Process</td><td className="p-2"></td><td className="p-2"></td></tr>
                        <tr className="border-b"><td className="p-2">Focus on Key Metrics (e.g., CPA, ROAS)</td><td className="p-2"></td><td className="p-2"></td></tr>
                        <tr className="border-b"><td className="p-2">Direct Access to Strategist</td><td className="p-2"></td><td className="p-2"></td></tr>
                        <tr><td className="p-2">Cultural Fit & Enthusiasm</td><td className="p-2"></td><td className="p-2"></td></tr>
                    </tbody>
                </table>
             </LVActionBox>
        </main>
    </LVGuidePage>
);

const AffiliatesGuide: React.FC<{ playbook: GeneratedPlaybook; businessData: BusinessData }> = ({ playbook, businessData }) => (
    <>
    <LVGuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">LEVERAGE MASTERCLASS</p>
            <LVTitle>The Paid Partner Engine</LVTitle>
            <LVSubtitle>Building a professional team of affiliates who are invested in your success.</LVSubtitle>
        </header>
        <main>
            <LVSectionTitle>Principle: The Committed Partner</LVSectionTitle>
            <LVP>Standard affiliate programs attract everyone, including low-quality partners. This model is different. We create an exclusive program for partners who are serious enough to invest a small amount in their own success. This ensures quality and commitment.</LVP>
            
            <LVSectionTitle>Step 1: The Partner Offer</LVSectionTitle>
            <LVActionBox title="The 'Partner Investment' Model" icon="🤝">
                <LVP>Instead of a free-for-all, partners pay a small, one-time setup fee. This gives them access to your proven marketing systems and shows they are committed.</LVP>
                <div className="mt-2 p-4 bg-white rounded grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-xs font-bold text-gray-400">ONE-TIME SETUP FEE:</p>
                        <p className="text-2xl font-bold text-blue-600">$49</p>
                        <p className="text-xs text-gray-500">(Covers training & marketing kit)</p>
                    </div>
                     <div>
                        <p className="text-xs font-bold text-gray-400">COMMISSION:</p>
                        <p className="text-2xl font-bold text-green-600">40%</p>
                        <p className="text-xs text-gray-500">on all sales of "{playbook.offer1.name}"</p>
                    </div>
                </div>
            </LVActionBox>
        </main>
    </LVGuidePage>
    <LVGuidePage>
        <main>
            <LVSectionTitle>Step 2: Recruit Your Partners</LVSectionTitle>
            <LVP>Now, let's invite people to this exclusive opportunity. You can reach out to your audience or run targeted ads.</LVP>
            <LVScriptBox title="Partner Invitation Email/Social Post">
                <p>Subject: Partner with me & earn 40% commission</p>
                <p>Hey everyone,</p>
                <p className="mt-2">I'm looking for a few key partners to help me promote my flagship program, "{playbook.offer1.name}".</p>
                <p className="mt-2">This isn't a typical affiliate program. I'm building a small, dedicated team and will be providing you with all the marketing materials, training, and ad strategies you need to be successful.</p>
                <p className="mt-2">There is a small $49 setup fee to ensure I only get serious partners who are ready to take action. In return, you'll earn a generous 40% commission on every sale.</p>
                <p className="mt-2">If you're interested in building a new income stream with a proven product, reply to this email and I'll send you the details.</p>
            </LVScriptBox>
            <LVActionBox title="Meta Ads Campaign to Recruit Partners" icon="📣">
                <p><strong>Audience:</strong> Target people interested in "Affiliate Marketing," "Digital Marketing," and followers of influencers in the {businessData.businessType} space.</p>
                <p className="mt-2"><strong>Ad Copy Headline:</strong> Become a Certified Partner for [Your Brand Name].</p>
                <p className="mt-2"><strong>Ad Copy Body:</strong> "We're looking for partners to promote our proven '{playbook.offer1.name}' program. We provide the training, the ads, and the funnels. You bring the hustle. Earn 40% commission on every sale. Click to apply."</p>
            </LVActionBox>
        </main>
    </LVGuidePage>
    <LVGuidePage>
        <main>
            <LVSectionTitle>Step 3: The Partner Launchpad Training</LVSectionTitle>
            <LVP>This is the core of the program. A 4-day intensive training delivered via email or in a private group to get your partners making money fast.</LVP>
            <div className="space-y-2 text-sm">
                <p><strong>DAY 1: Offer Immersion.</strong> Deep dive into "{playbook.offer1.name}", the ideal customer, and the core promise.</p>
                <p><strong>DAY 2: Your Marketing Toolkit.</strong> Provide the swipe files, emails, and images.</p>
                <p><strong>DAY 3: Organic Fast-Start.</strong> A step-by-step guide to getting their first sale using their social media profile.</p>
                <p><strong>DAY 4: Paid Ads 101.</strong> A copy-paste ad campaign they can run with a $10/day budget.</p>
            </div>
             <LVScriptBox title="Training Outline - Day 4: Paid Ads 101">
                <p><strong>Video Title:</strong> How to Get Your First Sale With Ads This Week</p>
                <ul className="list-disc pl-5">
                    <li>(0:00) Intro: The goal is to spend $10 to make $40 (based on your commission).</li>
                    <li>(1:30) Step 1: Setting up your Meta Ad account.</li>
                    <li>(3:00) Step 2: The Audience. Here are the exact 5 interests to target...</li>
                    <li>(5:00) Step 3: The Ad. Copy and paste this headline and body text...</li>
                    <li>(7:00) Step 4: The Creative. Use this image from your marketing kit...</li>
                    <li>(8:30) Step 5: Launch! Set your budget to $10/day and let's go!</li>
                </ul>
            </LVScriptBox>
        </main>
    </LVGuidePage>
    </>
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
        case 'guide-agencies': return <AgenciesGuide playbook={playbook} />;
        case 'guide-affiliates': return <AffiliatesGuide playbook={playbook} businessData={businessData} />;
        default: return null;
    }
};

export default LeverageGuidePdf;
