
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

// FIX: Add businessData prop to use for targetClient.
const LeadMagnetsGuide: React.FC<{ playbook: GeneratedPlaybook; businessData: BusinessData }> = ({ playbook, businessData }) => {
    const asset = playbook.offer1.stack[0]?.asset;
    return (
    <GuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">LEAD GENERATION WORKSHOP</p>
            <Title>Building Your Perfect Lead Magnet</Title>
            {/* FIX: Access targetClient from businessData prop. */}
            <Subtitle>How to use free gifts to attract your ideal customer: {businessData?.targetClient}</Subtitle>
        </header>
        <main>
            <SectionTitle>Principle: A Free Taste of the Main Course</SectionTitle>
            <P>A Lead Magnet is a small, free, and super-helpful gift you give someone in exchange for their email address. The best lead magnets solve ONE small, painful problem for your ideal customer, and they solve it FAST.</P>
            <P>A great lead magnet is often a small piece of your main offer.</P>
            <WorksheetBox title="Your Built-In Lead Magnet">
                <P className="text-sm">Your "Grand Slam Offer" already contains perfect lead magnets! Let's take one of the assets from your offer stack:</P>
                <div className="p-3 bg-white rounded-md mt-2 font-bold text-center text-green-700">"{asset?.name}"</div>
                <P className="text-sm mt-2">This is an ideal lead magnet because it gives a potential customer a quick win and a taste of the value you provide in your full offer, "{playbook.offer1.name}".</P>
            </WorksheetBox>
             <WorksheetBox title="Worksheet: Promoting Your Lead Magnet">
                <P className="text-sm">Use this fill-in-the-blanks template to create a simple social media post to promote your new lead magnet.</P>
                <div className="mt-2 p-4 bg-gray-100 rounded-md text-sm text-gray-700 space-y-2">
                    <p>Struggling with <strong>[Problem your lead magnet solves, e.g., 'coming up with ad ideas']</strong>?</p>
                    <p>It's one of the biggest headaches for <strong>[Your target client]</strong>.</p>
                    <p>I created a free <strong>[{asset?.type}]</strong> called "<strong>{asset?.name}</strong>" that shows you exactly how to solve it.</p>
                    <p>DM me the word "<strong>[KEYWORD, e.g., 'GIFT']</strong>" and I'll send it right over!</p>
                </div>
            </WorksheetBox>
        </main>
    </GuidePage>
)};

// FIX: Add businessData prop to use for targetClient.
const WarmOutreachGuide: React.FC<{ playbook: GeneratedPlaybook, businessData: BusinessData }> = ({ playbook, businessData }) => (
    <GuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">LEAD GENERATION WORKSHOP</p>
            <Title>Warm Outreach: The "Friend of a Friend" Method</Title>
            <Subtitle>The easiest way to get your first customers is by talking to people you already know.</Subtitle>
        </header>
        <main>
            <SectionTitle>Principle: Ask for Introductions, Not Sales</SectionTitle>
            <P>Your goal isn't to sell to your friends and family. It's to turn them into your personal team of treasure hunters who can introduce you to people you DON'T know who might need your help.</P>
            <WorksheetBox title="Worksheet: Your Magic Script">
                <P className="text-sm">Copy, paste, and personalize this script. Send it to 50-100 people you know (friends, family, old coworkers). Track your responses!</P>
                 <div className="mt-2 p-4 bg-gray-100 rounded-md text-sm text-gray-700 space-y-2">
                    <p>Hey [Name]! Hope you're doing great.</p>
                    {/* FIX: Access targetClient from businessData prop. */}
                    <p>Quick question for you - I've recently launched a new venture helping <strong>{businessData?.targetClient}</strong> to <strong>[Achieve the main promise of your offer, e.g., 'get in the best shape of their lives']</strong>.</p>
                    <p>I'm really excited about it, and it's all about helping them overcome <strong>[The main constraint, e.g., 'the struggle of staying motivated']</strong>.</p>
                    <p>Does anyone in your world come to mind who might be dealing with that?</p>
                    <p>Thanks so much!</p>
                </div>
            </WorksheetBox>
        </main>
    </GuidePage>
);

const ContentMarketingGuide: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => (
    <GuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">LEAD GENERATION WORKSHOP</p>
            <Title>Content Marketing: Become the Go-To Expert</Title>
            <Subtitle>How to attract customers by sharing your secrets for free.</Subtitle>
        </header>
        <main>
            <SectionTitle>Principle: Give, Give, Give, Then Ask</SectionTitle>
            <P>Content marketing is about building trust by generously sharing your expertise. You give away valuable ideas and advice for free. After you've helped someone, they are much more likely to want to buy from you.</P>
            <WorksheetBox title="Worksheet: Your First 3 Content Ideas">
                <P className="text-sm">The best content solves your customer's biggest problems. Your playbook diagnosis revealed their top constraints. Let's turn those into content!</P>
                <div className="mt-4">
                    <p className="font-semibold text-gray-700">1. Based on Constraint: "{playbook.diagnosis.constraints[0]}"</p>
                    <P className="text-sm">Brainstorm a "How-To" post that gives a quick tip for this problem:</P>
                    <BlankLines lines={2} />
                </div>
                <div className="mt-4">
                    <p className="font-semibold text-gray-700">2. Based on Goal: "{playbook.offer1.promise}"</p>
                    <P className="text-sm">Brainstorm a "Mistakes to Avoid" post about trying to achieve this goal:</P>
                    <BlankLines lines={2} />
                </div>
                 <div className="mt-4">
                    <p className="font-semibold text-gray-700">3. Based on Your Offer: "{playbook.offer1.name}"</p>
                    <P className="text-sm">Brainstorm a "Behind-the-Scenes" post showing one small part of how your offer works:</P>
                    <BlankLines lines={2} />
                </div>
            </WorksheetBox>
        </main>
    </GuidePage>
);

// FIX: Add businessData prop to use for targetClient.
const ColdOutreachGuide: React.FC<{ playbook: GeneratedPlaybook; businessData: BusinessData }> = ({ playbook, businessData }) => (
    <GuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">LEAD GENERATION WORKSHOP</p>
            <Title>Cold Outreach: Making New Friends</Title>
            <Subtitle>How to bravely connect with strangers and turn them into customers.</Subtitle>
        </header>
        <main>
            <SectionTitle>Principle: Lead with a Gift, Not a Pitch</SectionTitle>
            <P>Nobody likes getting spammy sales messages. The secret to good cold outreach is to make it feel personal and helpful. The goal is to start a conversation by offering a free gift (your lead magnet).</P>
            <WorksheetBox title="Worksheet: Your Cold Outreach Template">
                <P className="text-sm">Use this template for cold emails or direct messages. The key is to genuinely research the person and personalize the first line.</P>
                 <div className="mt-2 p-4 bg-gray-100 rounded-md text-sm text-gray-700 space-y-2">
                    <p>Subject: Question about [Their Company/Project]</p>
                    <p>Hey [Name],</p>
                    <p>Just saw [the specific article you wrote / project you launched / post you made]. Loved how you [specific, genuine compliment].</p>
                    {/* FIX: Access targetClient from businessData prop. */}
                    <p>I work with a lot of <strong>{businessData?.targetClient}s</strong>, and many of them struggle with <strong>[a specific pain point related to your offer]</strong>.</p>
                    <p>I actually created a free <strong>[{playbook.offer1.stack[0].asset.type}]</strong> called "<strong>{playbook.offer1.stack[0].asset.name}</strong>" that helps with exactly that.</p>
                    <p>No strings attached, but would you be open to me sending it over?</p>
                    <p>Cheers,</p>
                    <p>[Your Name]</p>
                </div>
            </WorksheetBox>
        </main>
    </GuidePage>
);

const PaidAdsGuide: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => (
     <GuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">LEAD GENERATION WORKSHOP</p>
            <Title>Paid Advertising: Your Megaphone</Title>
            <Subtitle>Using money to share your message with thousands of ideal customers.</Subtitle>
        </header>
        <main>
            <SectionTitle>Your Starting Ad Copy</SectionTitle>
            <P>A good ad doesn't feel like an ad. It feels like helpful advice. Your playbook already generated a great starting point for you in the "Sales Funnel" section. Let's use that as our foundation.</P>
            <WorksheetBox title="Ad Copy from Your Playbook">
                 <div className="text-sm space-y-2 p-2 bg-white rounded">
                    <p><strong>Headline:</strong> {playbook.salesFunnel.stages[0].adCopy.headline}</p>
                    <p><strong>Body:</strong> {playbook.salesFunnel.stages[0].adCopy.body}</p>
                    <p><strong>Call to Action:</strong> {playbook.salesFunnel.stages[0].adCopy.cta}</p>
                 </div>
            </WorksheetBox>
            <SectionTitle>Worksheet: Brainstorming More Ad Angles</SectionTitle>
            <P>Great advertisers test many different hooks. Let's brainstorm two more angles for your offer.</P>
            <div className="mt-4">
                <p className="font-semibold text-gray-700">Ad Angle 1: The "Pain" Angle</p>
                <P className="text-sm">Rewrite the headline to focus on the deep pain of your customer's problem.</P>
                <BlankLines lines={1} />
            </div>
             <div className="mt-4">
                <p className="font-semibold text-gray-700">Ad Angle 2: The "Dream" Angle</p>
                <P className="text-sm">Rewrite the headline to focus on the ultimate dream outcome your customer desires.</P>
                <BlankLines lines={1} />
            </div>
        </main>
    </GuidePage>
);

const ScalingWhatWorksGuide: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => (
    <GuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">LEAD GENERATION WORKSHOP</p>
            <Title>Scaling: From a Fish to a Feast</Title>
            <Subtitle>You've found a way to get customers that works. Now, let's make it HUGE.</Subtitle>
        </header>
        <main>
            <SectionTitle>Principle: More, Better, New</SectionTitle>
            <P>Once you find one reliable customer acquisition channel, your job is NOT to find a new one. Your job is to exhaust the potential of the one that works. There are only three ways to grow:</P>
            <WorksheetBox title="Worksheet: Your Scaling Plan">
                <P className="text-sm">Your playbook identified <strong>"{playbook.marketingModel.steps[0].method}"</strong> as a primary channel. Let's create a plan to scale it.</P>
                <div className="mt-4">
                    <p className="font-semibold text-gray-700">1. MORE: How can you 10x the volume?</p>
                    <P className="text-sm">(e.g., If you send 10 emails a day, plan to send 100. If you spend $10/day on ads, plan to spend $100/day).</P>
                    <BlankLines lines={2} />
                </div>
                <div className="mt-4">
                    <p className="font-semibold text-gray-700">2. BETTER: How can you improve its conversion rate?</p>
                    <P className="text-sm">(e.g., Test 3 new email subject lines. Test 3 new ad images. Improve the landing page headline).</P>
                    <BlankLines lines={2} />
                </div>
                 <div className="mt-4">
                    <p className="font-semibold text-gray-700">3. NEW: Where can you apply this winning formula next?</p>
                    <P className="text-sm">(This is the LAST step. e.g., If cold email to plumbers works, try it with electricians. If Facebook Ads work, try the same ad on TikTok).</P>
                    <BlankLines lines={2} />
                </div>
            </WorksheetBox>
        </main>
    </GuidePage>
);

interface LeadGenerationGuidePdfProps {
    playbook: GeneratedPlaybook;
    businessData: BusinessData;
    type: string;
}


const LeadGenerationGuidePdf: React.FC<LeadGenerationGuidePdfProps> = ({ playbook, businessData, type }) => {
    switch(type) {
        case 'guide-lead-magnets': return <LeadMagnetsGuide playbook={playbook} businessData={businessData} />;
        case 'guide-warm-outreach': return <WarmOutreachGuide playbook={playbook} businessData={businessData} />;
        case 'guide-content-marketing': return <ContentMarketingGuide playbook={playbook} />;
        case 'guide-cold-outreach': return <ColdOutreachGuide playbook={playbook} businessData={businessData} />;
        case 'guide-paid-ads': return <PaidAdsGuide playbook={playbook} />;
        case 'guide-scaling-what-works': return <ScalingWhatWorksGuide playbook={playbook} />;
        default: return null;
    }
};

export default LeadGenerationGuidePdf;
