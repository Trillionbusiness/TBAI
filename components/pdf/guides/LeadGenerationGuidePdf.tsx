
import React from 'react';
import { BusinessData, GeneratedPlaybook } from '../../../types';

// FIX: Renamed reusable components to avoid redeclaration conflicts with other guide files.
// --- Reusable Theming Components ---
const LGGuidePage: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => (
    <div data-pdf-page="true" className={`p-10 bg-white font-sans text-gray-800 break-after-page relative overflow-hidden border-t-8 border-gray-800 ${className}`} style={{ fontFamily: "'Inter', sans-serif", width: '800px', minHeight: '1131px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
        <div className="absolute top-4 right-8 text-xs font-bold text-gray-400">BUSINESS UNIVERSITY MASTERCLASS</div>
        <div className="relative z-10">{children}</div>
    </div>
);

const LGTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-5xl font-black text-gray-800 tracking-tighter text-center">{children}</h1>;
const LGSubtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-xl text-gray-500 mt-3 text-center">{children}</p>;
const LGSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className={`text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-3 mb-6 mt-10 break-after-avoid`}>{children}</h2>;
const LGP: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-600 leading-relaxed my-3 ${className || ''}`}>{children}</p>;
const LGActionBox: React.FC<{ title: string, children: React.ReactNode, icon?: string }> = ({ title, children, icon }) => (
    <div className={`p-6 bg-gray-50 rounded-lg border border-gray-200 my-4`}>
        <h3 className={`font-bold text-lg text-gray-800 flex items-center`}>
            {icon && <span className="mr-3 text-2xl">{icon}</span>}
            {title}
        </h3>
        <div className="mt-3 text-sm text-gray-700">{children}</div>
    </div>
);
const LGScriptBox: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="p-4 bg-gray-800 rounded-lg text-white font-mono text-sm my-4">
        <p className="font-bold text-yellow-400 mb-2">{`// ${title}`}</p>
        <div className="whitespace-pre-wrap">{children}</div>
    </div>
);


// --- Individual Guide Components ---

const LeadMagnetsGuide: React.FC<{ playbook: GeneratedPlaybook; businessData: BusinessData }> = ({ playbook, businessData }) => (
    <>
        <LGGuidePage>
            <header className="text-center mb-12 pb-6">
                <p className="font-bold text-yellow-600">LEAD GENERATION MASTERCLASS</p>
                <LGTitle>The Perfect "Customer Bait"</LGTitle>
                <LGSubtitle>A deep dive into creating an irresistible Lead Magnet for your ideal customer: {businessData.targetClient}</LGSubtitle>
            </header>
            <main>
                <LGSectionTitle>Principle: A Free Taste of the Main Course</LGSectionTitle>
                <LGP>A Lead Magnet is a small, free, and super-helpful gift you give in exchange for an email. The best lead magnets solve ONE small, painful problem FAST. They are a small piece of your main offer, giving a taste of the value to come.</LGP>
                
                <LGActionBox title="Generated Idea: The 'Quick Win' Checklist" icon="✅">
                    <p><strong>Title:</strong> The 5-Minute {playbook.diagnosis.constraints[0].split(' ').slice(0,3).join(' ')} Checklist</p>
                    <p><strong>Why it works:</strong> It's fast, actionable, and provides an immediate sense of accomplishment.</p>
                </LGActionBox>
            </main>
        </LGGuidePage>
        <LGGuidePage>
            <main>
                <LGSectionTitle>Action Plan: Create Your Lead Magnet</LGSectionTitle>
                <LGP>Don't overthink it. You can create a world-class lead magnet in under an hour using this outline. Use a simple tool like Google Docs or Canva.</LGP>
                <LGActionBox title="Lead Magnet Outline: The 5-Minute Checklist" icon="📝">
                    <p><strong>Page 1: The Cover Page</strong></p>
                    <ul className="list-disc pl-5 text-xs">
                        <li>Your Logo</li>
                        <li>Title: The 5-Minute {playbook.diagnosis.constraints[0].split(' ').slice(0,3).join(' ')} Checklist</li>
                        <li>Subtitle: Your simple, step-by-step guide to achieving [Quick Win] in less time than it takes to drink a coffee.</li>
                    </ul>
                    <p className="mt-2"><strong>Page 2: The "Why"</strong></p>
                    <ul className="list-disc pl-5 text-xs">
                        <li>Briefly explain the pain of the problem and why this checklist is the fastest way to solve it.</li>
                    </ul>
                    <p className="mt-2"><strong>Page 3: The Checklist</strong></p>
                    <ul className="list-disc pl-5 text-xs">
                        <li>List 5-7 simple, actionable steps with checkboxes next to each.</li>
                        <li>Example Step: "[ ] Action Verb + Specific Task (e.g., 'Review your last 3 sales calls for this common mistake...')"</li>
                    </ul>
                    <p className="mt-2"><strong>Page 4: The Next Step</strong></p>
                    <ul className="list-disc pl-5 text-xs">
                        <li>Congratulate them on completing the checklist.</li>
                        <li>Bridge to your main offer: "If you found this helpful, you'll love my full program, '{playbook.offer1.name}', where we solve this problem for you permanently. Click here to learn more."</li>
                    </ul>
                </LGActionBox>
            </main>
        </LGGuidePage>
    </>
);

const OutreachGuide: React.FC<{ playbook: GeneratedPlaybook, businessData: BusinessData, type: 'Warm' | 'Cold' }> = ({ playbook, businessData, type }) => (
    <>
    <LGGuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">LEAD GENERATION MASTERCLASS</p>
            <LGTitle>{type} Outreach: Your Playbook</LGTitle>
            <LGSubtitle>A multi-step sequence for turning contacts into conversations.</LGSubtitle>
        </header>
        <main>
            <LGSectionTitle>Principle: The Patient Gardener</LGSectionTitle>
            <LGP>Effective outreach is like planting seeds. You don't just throw one seed and hope. You plant it, water it, and give it sun. This multi-step sequence is designed to build rapport and get a response without being pushy.</LGP>
        </main>
    </LGGuidePage>
    <LGGuidePage>
        <main>
            <LGSectionTitle>Your 3-Step Outreach Sequence</LGSectionTitle>
             <LGActionBox title="Step 1: The Initial Contact (Day 1)" icon="👋">
                <LGP>The goal of the first message is simply to be helpful and start a conversation. {type === 'Cold' ? "Lead with a personalized compliment and a free gift (your lead magnet)." : "Lead with your relationship and ask for an introduction."}</LGP>
                <LGScriptBox title={`${type} Outreach: Day 1 Template`}>
                    <p>Subject: {type === 'Cold' ? `Question about [Their Company/Project]` : `Quick question`}</p>
                    <p>Hey [Name],</p>
                    <p>{type === 'Cold' ? `Just saw [the specific article you wrote / project you launched]. Loved how you [specific, genuine compliment].` : `Hope you're doing great! It's been a while.`}</p>
                    <p className="mt-2">I'm currently focused on my new venture helping {businessData.targetClient}s to overcome [the main constraint: "{playbook.diagnosis.constraints[0]}"].</p>
                     <p className="mt-2">{type === 'Cold' ? `I actually created a free [Lead Magnet Format] that helps with exactly that. No strings attached, but would you be open to me sending it over?` : `Does anyone in your world come to mind who might be dealing with that? Any introductions would be hugely appreciated!`}</p>
                    <p className="mt-2">Cheers,</p>
                    <p>[Your Name]</p>
                </LGScriptBox>
            </LGActionBox>
            <LGSectionTitle>Follow-Up Matrix</LGSectionTitle>
            <LGP>80% of sales require at least 5 follow-ups. Use this simple matrix to stay persistent without being annoying. Track this in a simple spreadsheet.</LGP>
            <table className="w-full text-sm mt-4 border">
                <thead className="bg-gray-800 text-white"><tr className="text-left"><th className="p-2 border">Day</th><th className="p-2 border">Action</th><th className="p-2 border">Template</th></tr></thead>
                <tbody>
                    <tr className="border-b"><td className="p-2 border">Day 1</td><td className="p-2 border">Initial Email/DM</td><td className="p-2 border">Use "Initial Contact" script.</td></tr>
                    <tr className="border-b"><td className="p-2 border">Day 3</td><td className="p-2 border">Reply to same email</td><td className="p-2 border">"Just bumping this to the top of your inbox."</td></tr>
                    <tr className="border-b"><td className="p-2 border">Day 7</td><td className="p-2 border">New Email/DM</td><td className="p-2 border">"Re: [Original Subject] - Following up"</td></tr>
                    <tr className="border-b"><td className="p-2 border">Day 14</td><td className="p-2 border">LinkedIn Connection Request</td><td className="p-2 border">"Hey [Name], following up on my email. Would love to connect."</td></tr>
                    <tr className="border-b"><td className="p-2 border">Day 21</td><td className="p-2 border">Final "Break-Up" Email</td><td className="p-2 border">"Since I haven't heard back, I'll assume this isn't a priority. All the best!"</td></tr>
                </tbody>
            </table>
        </main>
    </LGGuidePage>
    </>
);

const ContentMarketingGuide: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => {
    return (
        <>
            <LGGuidePage>
                <header className="text-center mb-12 pb-6">
                    <p className="font-bold text-yellow-600">LEAD GENERATION MASTERCLASS</p>
                    <LGTitle>The Content Multiplication Machine</LGTitle>
                    <LGSubtitle>How to turn one idea into a week of high-impact content.</LGSubtitle>
                </header>
                <main>
                    <LGSectionTitle>Principle: Create Once, Distribute Forever</LGSectionTitle>
                    <LGP>Don't burn yourself out creating new content every day. The secret is to have ONE core content "pillar" each week, and then slice it up into smaller pieces for different platforms. This saves time and reinforces your message.</LGP>
                </main>
            </LGGuidePage>
            <LGGuidePage>
                <main>
                    <LGSectionTitle>Your Weekly Content Workflow</LGSectionTitle>
                    <LGActionBox title="Step 1: Choose Your Weekly Pillar (Monday)" icon="🏛️">
                        <p>Your pillar is a substantial piece of content that explores one topic deeply. Choose one of your core "problems" from your value stack.</p>
                        <p><strong>This Week's Pillar Topic:</strong> "{playbook.offer1.stack[0].problem}"</p>
                        <p className="mt-2"><strong>Action:</strong> Record a 5-10 minute video of yourself talking about this problem and your solution. Don't worry about it being perfect. Just talk to the camera like you're helping a friend.</p>
                    </LGActionBox>
                    <LGActionBox title="Step 2: The Repurposing Process (Tuesday)" icon="🔄">
                         <ul className="list-decimal pl-5 mt-2 space-y-2 text-sm">
                            <li><strong>Audio -> Podcast:</strong> Strip the audio from your video and upload it as a short podcast episode.</li>
                            <li><strong>Video -> YouTube:</strong> Upload the full video to YouTube with a clear title.</li>
                            <li><strong>Transcription -> Blog Post:</strong> Use an AI tool (like Otter.ai) to transcribe the video. Clean it up and post it as a blog article on your website.</li>
                            <li><strong>Key Quotes -> Tweets/Text Posts:</strong> Pull out 3-5 interesting quotes or tips from the transcription. Post these throughout the week on Twitter, LinkedIn, or as text posts on Instagram/Facebook.</li>
                            <li><strong>Video Clips -> Reels/TikToks:</strong> Cut 2-3 short, punchy 30-second clips from the main video. Add captions and post them as Reels, TikToks, or Shorts.</li>
                         </ul>
                    </LGActionBox>
                    <div className="text-center p-4 bg-gray-800 text-white rounded-lg mt-6">
                        <h3 className="text-xl font-bold">Result: 1 video = 1 podcast, 1 blog post, 5 tweets, and 3 short videos. That's 10 pieces of content from one idea!</h3>
                    </div>
                </main>
            </LGGuidePage>
        </>
    );
};

const PaidAdsGuide: React.FC<{ playbook: GeneratedPlaybook, businessData: BusinessData }> = ({ playbook, businessData }) => (
    <>
     <LGGuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">LEAD GENERATION MASTERCLASS</p>
            <LGTitle>Paid Ads: Your Customer Megaphone</LGTitle>
            <LGSubtitle>A complete campaign brief for your "{playbook.offer1.name}" offer.</LGSubtitle>
        </header>
        <main>
            <LGSectionTitle>Principle: The Right Message for the Right Person</LGSectionTitle>
            <LGP>Successful ads aren't just about clever copy; they're about showing a compelling message to a hyper-specific group of people who are likely to care. This brief is your battle plan.</LGP>
        </main>
    </LGGuidePage>
    <LGGuidePage>
        <main>
            <LGSectionTitle>Campaign Brief: The "{playbook.diagnosis.constraints[0]}" Campaign</LGSectionTitle>
            <table className="w-full text-sm mt-4 border">
                 <tbody>
                    <tr className="border-b"><td className="p-3 border font-bold bg-gray-50 w-1/3">Objective</td><td className="p-3 border">Generate qualified leads (e.g., email sign-ups for a lead magnet or webinar).</td></tr>
                    <tr className="border-b"><td className="p-3 border font-bold bg-gray-50">Target Audience</td><td className="p-3 border"><strong>"{businessData.targetClient}"</strong>. On platforms like Facebook/Instagram, target interests related to: [e.g., industry magazines, competing tools, famous influencers in your niche].</td></tr>
                    <tr className="border-b"><td className="p-3 border font-bold bg-gray-50">Core Offer</td><td className="p-3 border">Start by promoting a Lead Magnet (e.g., The 5-Minute Checklist) to acquire emails, then present the main "{playbook.offer1.name}" offer via an email sequence.</td></tr>
                    <tr className="border-b"><td className="p-3 border font-bold bg-gray-50">Ad Angle 1 (Pain)</td><td className="p-3 border"><strong>Headline:</strong> Still struggling with {playbook.diagnosis.constraints[0]}?<br/><strong>Body:</strong> Focus on the frustration and wasted time caused by the problem.</td></tr>
                     <tr className="border-b"><td className="p-3 border font-bold bg-gray-50">Ad Angle 2 (Dream)</td><td className="p-3 border"><strong>Headline:</strong> Imagine finally achieving {playbook.offer1.promise}.<br/><strong>Body:</strong> Paint a vivid picture of the desired "after" state.</td></tr>
                     <tr className="border-b"><td className="p-3 border font-bold bg-gray-50">Ad Angle 3 (Logic)</td><td className="p-3 border"><strong>Headline:</strong> The Smartest Way to [Achieve a Core Benefit].<br/><strong>Body:</strong> Break down the value stack and highlight the guarantee.</td></tr>
                     <tr className="border-b"><td className="p-3 border font-bold bg-gray-50">Creative</td><td className="p-3 border">Test simple visuals: A picture of you, a clean graphic with the headline, or a short video talking to the camera.</td></tr>
                     <tr className="border-b"><td className="p-3 border font-bold bg-gray-50">Budget & Testing</td><td className="p-3 border">Start with a small budget (e.g., $20/day). Run all 3 ad angles simultaneously. After 3-5 days, turn off the worst-performing 2 ads and move all the budget to the winner.</td></tr>
                 </tbody>
            </table>
        </main>
    </LGGuidePage>
    </>
);

const ScalingWhatWorksGuide: React.FC<{ playbook: GeneratedPlaybook, businessData: BusinessData }> = ({ playbook, businessData }) => (
    <LGGuidePage>
        <header className="text-center mb-12 pb-6">
            <p className="font-bold text-yellow-600">LEAD GENERATION MASTERCLASS</p>
            <LGTitle>Scaling: From a Trickle to a Flood</LGTitle>
            <LGSubtitle>You've found a way to get customers that works. Now, let's make it HUGE.</LGSubtitle>
        </header>
        <main>
            <LGSectionTitle>Principle: More, Better, New</LGSectionTitle>
            <LGP>Once you find ONE reliable customer acquisition channel, your job is NOT to find a new one. Your job is to exhaust the potential of the one that works. There are only three ways to grow:</LGP>
            <LGActionBox title={`Scaling Matrix for: "${playbook.marketingModel.steps[0].method}"`} icon="📈">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2 text-left font-bold">Method</th>
                            <th className="p-2 text-left font-bold">Your Action Plan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-2 align-top"><strong>1. MORE (Volume)</strong></td>
                            <td className="p-2">How can you 10x the volume of this activity? (e.g., If you send 10 emails/day, how can you send 100? If you spend $10/day on ads, how can you spend $100/day?)</td>
                        </tr>
                         <tr className="border-b">
                            <td className="p-2 align-top"><strong>2. BETTER (Conversion)</strong></td>
                            <td className="p-2">How can you improve its conversion rate? (e.g., Test 3 new email subject lines. Test 3 new ad images. Improve the landing page headline.)</td>
                        </tr>
                         <tr>
                            <td className="p-2 align-top"><strong>3. NEW (Expansion)</strong></td>
                            <td className="p-2">LAST STEP: Where can you apply this winning formula next? (e.g., If cold email to {businessData.targetClient}s works, try it with a slightly different audience. If Facebook Ads work, try the same ad on TikTok.)</td>
                        </tr>
                    </tbody>
                </table>
            </LGActionBox>
        </main>
    </LGGuidePage>
);

interface LeadGenerationGuidePdfProps {
    playbook: GeneratedPlaybook;
    businessData: BusinessData;
    type: string;
}


const LeadGenerationGuidePdf: React.FC<LeadGenerationGuidePdfProps> = ({ playbook, businessData, type }) => {
    switch(type) {
        case 'guide-lead-magnets': return <LeadMagnetsGuide playbook={playbook} businessData={businessData} />;
        case 'guide-warm-outreach': return <OutreachGuide playbook={playbook} businessData={businessData} type="Warm" />;
        case 'guide-content-marketing': return <ContentMarketingGuide playbook={playbook} />;
        case 'guide-cold-outreach': return <OutreachGuide playbook={playbook} businessData={businessData} type="Cold" />;
        case 'guide-paid-ads': return <PaidAdsGuide playbook={playbook} businessData={businessData} />;
        case 'guide-scaling-what-works': return <ScalingWhatWorksGuide playbook={playbook} businessData={businessData} />;
        default: return null;
    }
};

export default LeadGenerationGuidePdf;
