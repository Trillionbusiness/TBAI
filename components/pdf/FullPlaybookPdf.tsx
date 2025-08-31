import React from 'react';
import { 
    GeneratedPlaybook, GeneratedDiagnosis, GeneratedOffer, GeneratedDownsell, GeneratedMarketingModel
} from '../../types';

// --- STYLING HELPER COMPONENTS ---
const Page: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => (
    <div className={`p-12 bg-white font-sans text-gray-800 break-after-page relative overflow-hidden ${className}`} style={{ fontFamily: 'Inter, sans-serif', width: '800px', minHeight: '1131px' }}>
        <div style={{
            position: 'absolute',
            top: '-60px',
            left: '-60px',
            width: '200px',
            height: '200px',
            backgroundColor: 'rgba(20, 114, 115, 0.8)', // dark teal
            clipPath: 'polygon(0 0, 100% 0, 0 100%)'
        }}></div>
         <div style={{
            position: 'absolute',
            top: '-80px',
            left: '40px',
            width: '200px',
            height: '200px',
            backgroundColor: 'rgba(130, 213, 227, 0.7)', // light blue
            clipPath: 'polygon(0 0, 100% 0, 0 100%)'
        }}></div>
        <div style={{
            position: 'absolute',
            bottom: '-60px',
            right: '-60px',
            width: '250px',
            height: '250px',
            backgroundColor: 'rgba(20, 114, 115, 0.8)',
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
        }}></div>
        <div style={{
            position: 'absolute',
            bottom: '-80px',
            right: '40px',
            width: '250px',
            height: '250px',
            backgroundColor: 'rgba(130, 213, 227, 0.7)',
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
        }}></div>
        <div className="relative z-10">
            {children}
        </div>
    </div>
);

const SectionTitlePage: React.FC<{ number: number; title: string; subtitle: string }> = ({ number, title, subtitle }) => (
    <Page className="flex flex-col justify-center items-center text-center">
        <div className="w-24 h-24 bg-[#147273] rounded-full flex items-center justify-center text-5xl font-black text-white shadow-lg">{number}</div>
        <h1 className="text-5xl font-black tracking-tighter text-gray-900 mt-8">{title}</h1>
        <p className="text-xl text-gray-600 mt-4 max-w-2xl">{subtitle}</p>
    </Page>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-10 break-inside-avoid">
        <h2 className="text-3xl font-bold text-[#147273] border-b-4 border-[#82D5E3] pb-3 mb-6">{title}</h2>
        <div className="space-y-4">{children}</div>
    </div>
);

const SubSection: React.FC<{ title: string; children: React.ReactNode; className?: string, icon?: string }> = ({ title, children, className, icon = '🔹' }) => (
    <div className={`mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 break-inside-avoid shadow-sm ${className || ''}`}>
        <h3 className="text-xl font-bold text-gray-700 mb-2 flex items-center"><span className="text-lg mr-2">{icon}</span>{title}</h3>
        {children}
    </div>
);

const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <p className={`text-base text-gray-700 leading-relaxed ${className || ''}`}>{children}</p>
);

const OL: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
    <ol className="list-decimal list-inside space-y-2 pl-2">
        {items.map((item, i) => <li key={i} className="text-base text-gray-700">{item}</li>)}
    </ol>
);

// --- PDF SECTION COMPONENTS ---

const DiagnosisSection: React.FC<{ diagnosis: GeneratedDiagnosis }> = ({ diagnosis }) => (
    <Section title="Your Diagnosis">
        <P>To get where you want to go, you must first know where you are. This is the honest truth about your business right now.</P>
        <div className="grid grid-cols-2 gap-6">
            <SubSection title="Your Current Stage" icon="📍">
                <P className="font-bold text-2xl text-[#147273]">{diagnosis.currentStage}</P>
            </SubSection>
            <SubSection title="Your Primary Role" icon="👨‍💼">
                <P className="font-bold text-2xl text-gray-800">{diagnosis.yourRole}</P>
            </SubSection>
        </div>
        <SubSection title="The Constraints (What's Holding You Back)" icon="🚧">
             <P>These are the bottlenecks. Solving these is the key to unlocking growth.</P>
             <OL items={diagnosis.constraints.map(c => <span className="font-semibold text-red-700">"{c}"</span>)} />
        </SubSection>
        <SubSection title="Your Action Plan (The Path Forward)" icon="🚀">
             <P>This is your simple, focused plan. Ignore everything else and do these things.</P>
            <OL items={diagnosis.actions.map(a => <span className="font-semibold text-green-700">{a}</span>)} />
        </SubSection>
    </Section>
);

const OfferCard: React.FC<{ offer: GeneratedOffer, title: string, color: 'teal' | 'blue' }> = ({ offer, title, color }) => (
    <div className={`p-6 bg-white rounded-lg border-2 break-inside-avoid flex flex-col shadow-lg ${color === 'teal' ? 'border-[#147273]' : 'border-[#82D5E3]'}`}>
        <h3 className={`text-2xl font-bold ${color === 'teal' ? 'text-[#147273]' : 'text-blue-800'}`}>{title}</h3>
        <h4 className="text-xl font-bold text-gray-800 mt-2">{offer.name}</h4>
        <P className="italic text-lg">"{offer.promise}"</P>

        <div className="my-4 flex-grow">
            <p className="font-bold text-gray-800 text-base">You Get:</p>
            <div className="space-y-2 mt-2">
            {offer.stack.map((item, i) => (
                <div key={i} className="flex items-start">
                    <span className="text-green-500 font-bold mr-2">✓</span>
                    <P className="text-sm font-semibold">{item.solution}</P>
                </div>
            ))}
            </div>
        </div>

        <div className="mt-auto pt-4 border-t-2 border-dashed border-gray-300">
            <div className="text-right my-2">
                <P className="text-sm line-through text-red-500">Value: {offer.totalValue}</P>
                <P className={`text-4xl font-black ${color === 'teal' ? 'text-[#147273]' : 'text-blue-600'}`}>{offer.price}</P>
            </div>
            <div className={`p-3 bg-gray-100 rounded-md`}>
                <P className={`italic text-sm text-center text-gray-700`}>"{offer.guarantee}"</P>
            </div>
        </div>
    </div>
);

const OffersSection: React.FC<{ offer1: GeneratedOffer; offer2: GeneratedOffer; downsell: GeneratedDownsell }> = ({ offer1, offer2, downsell }) => (
    <Section title="Your Irresistible Offers">
        <P>An offer so good, people feel stupid saying no. Here are two "Grand Slam" options, plus a smaller "Hello" offer to attract new customers.</P>
        <div className="grid grid-cols-2 gap-6 mt-4">
            <OfferCard offer={offer1} title="Grand Slam Offer 1" color="teal" />
            <OfferCard offer={offer2} title="Grand Slam Offer 2" color="teal"/>
        </div>
        <div className="mt-6 break-inside-avoid">
             <h3 className="text-xl font-bold text-gray-800">Your "Hello" Offer:</h3>
             <P className="italic">{downsell.rationale}</P>
             <div className="mt-2">
                <OfferCard offer={downsell.offer} title={downsell.offer.name} color="blue" />
             </div>
        </div>
    </Section>
);

const MarketingModelSection: React.FC<{ model: GeneratedMarketingModel }> = ({ model }) => (
    <Section title="How to Find Your Customers">
        <P>You have an amazing offer. Now it's time to show it to the right people. Here are four proven ways to do that, in order.</P>
        <div className="space-y-6 mt-4">
        {model.steps.map((step, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-lg border-l-8 border-[#82D5E3] break-inside-avoid shadow-sm">
                <h4 className="text-2xl font-bold text-gray-800">{i+1}. {step.method}</h4>
                <SubSection title="Strategy" icon="🎯" className="bg-white mt-3">
                    <P>{step.strategy}</P>
                </SubSection>
                {step.template && (
                    <SubSection title="Copy-Paste Template" icon="📝" className="bg-white mt-3">
                        <pre className="text-sm bg-gray-100 p-3 border border-gray-200 rounded whitespace-pre-wrap font-sans">{step.template}</pre>
                    </SubSection>
                )}
            </div>
        ))}
        </div>
    </Section>
);

const FullPlaybookPdf: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => {
  return (
    <>
        <Page className="flex flex-col justify-center items-start text-left">
             <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-sm font-bold text-white mb-4">YOUR LOGO</div>
             <p className="font-semibold text-gray-800">Trillion Business</p>
             <p className="text-sm text-gray-500">trillionbusiness.ai</p>
             <div className="flex-grow"></div>
             <h1 className="text-7xl font-black tracking-tight text-[#147273]">BUSINESS PLAN</h1>
             <h2 className="text-6xl font-black tracking-tight text-gray-900">LAYOUT</h2>
             <div className="flex-grow"></div>
             <div className="mt-12 pt-6">
                <p className="font-semibold text-gray-600">Prepared by</p>
                <p className="font-bold text-xl text-gray-900">Trillion Business AI</p>
             </div>
        </Page>
        
        {playbook.diagnosis && <>
            <SectionTitlePage number={1} title="Diagnosis & Roadmap" subtitle="Your current location and the path to your destination." />
            <Page><DiagnosisSection diagnosis={playbook.diagnosis} /></Page>
        </>}
       
        {playbook.offer1 && playbook.offer2 && playbook.downsell && <>
             <SectionTitlePage number={2} title="The Grand Slam Offer" subtitle="The irresistible deal that makes people feel stupid saying no." />
             <Page><OffersSection offer1={playbook.offer1} offer2={playbook.offer2} downsell={playbook.downsell} /></Page>
        </>}
       
        {playbook.marketingModel && <>
            <SectionTitlePage number={3} title="The Leads Engine" subtitle="The machine that finds your ideal customers." />
            <Page><MarketingModelSection model={playbook.marketingModel} /></Page>
        </>}
       
        <Page className="flex flex-col justify-center items-center text-center bg-[#147273] text-white">
            <h2 className="text-4xl font-bold text-white">The Plan Works If You Do.</h2>
            <p className="text-xl mt-4">You have the roadmap. Now it's time to take the first step.</p>
        </Page>
    </>
  );
};

export default FullPlaybookPdf;