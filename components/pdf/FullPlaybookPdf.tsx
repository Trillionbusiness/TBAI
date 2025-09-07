
import React from 'react';
import { 
    GeneratedPlaybook, GeneratedDiagnosis, GeneratedOffer, GeneratedDownsell, GeneratedMarketingModel, 
    GeneratedMoneyModelAnalysis, GeneratedMoneyModel, MoneyModelStep, GeneratedOperationsPlan, 
    GeneratedProfitPath, GeneratedSalesFunnel, Kpi, GeneratedSalesSystem 
} from '../../types';

// --- Storybook Theming Components ---
const StorybookPage: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => (
    <div data-pdf-page="true" className={`p-10 bg-[#FFFAF0] font-sans text-gray-800 break-after-page relative overflow-hidden border-8 border-yellow-300 rounded-3xl ${className}`} style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", width: '800px', minHeight: '1131px', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)' }}>
        <div className="absolute top-8 left-8 text-5xl animate-pulse">☀️</div>
        <div className="absolute top-20 right-10 text-6xl text-white opacity-80">☁️</div>
        <div className="absolute top-40 right-40 text-4xl text-white opacity-60">☁️</div>
        <div className="relative z-10">{children}</div>
    </div>
);

const ChapterCover: React.FC<{ number: number; title: string; subtitle: string, icon: string }> = ({ number, title, subtitle, icon }) => (
    <StorybookPage className="flex flex-col justify-center items-center text-center bg-blue-100 border-blue-300">
        <div className="text-9xl mb-6">{icon}</div>
        <p className="text-2xl font-bold text-blue-500">Chapter {number}</p>
        <h1 className="text-6xl font-black tracking-tighter text-blue-800 mt-4">{title}</h1>
        <p className="text-2xl text-blue-600 mt-6 max-w-2xl">{subtitle}</p>
    </StorybookPage>
);

const Section: React.FC<{ title: string; children: React.ReactNode, icon?: string }> = ({ title, icon, children }) => (
    <div className="mb-8 break-inside-avoid">
        <h2 className="text-4xl font-extrabold text-[#147273] flex items-center gap-4">
            <span className="text-5xl">{icon}</span>
            <span className="border-b-4 border-dashed border-yellow-400 pb-2">{title}</span>
        </h2>
        <div className="mt-4 pl-16 text-xl leading-relaxed space-y-4">{children}</div>
    </div>
);

const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`my-3 ${className || ''}`}>{children}</p>;
const ListItem: React.FC<{ children: React.ReactNode, icon: string }> = ({ children, icon }) => ( <div className="flex items-start my-3"><span className="text-4xl mr-4">{icon}</span><p className="flex-1">{children}</p></div>);

// --- Individual Chapter Components ---

const TitlePage: React.FC = () => (
    <StorybookPage className="flex flex-col justify-center items-center text-center bg-yellow-100 border-yellow-400">
        <div className="text-9xl mb-8">🚀</div>
        <h1 className="text-7xl font-black tracking-tighter text-yellow-800">The Great Business Adventure</h1>
        <p className="text-3xl text-yellow-700 mt-6">Your very own storybook for growing a super-duper business!</p>
    </StorybookPage>
);

const DiagnosisPages: React.FC<{ diagnosis: GeneratedDiagnosis }> = ({ diagnosis }) => (
    <>
        <ChapterCover number={1} title="Your Adventure Begins!" subtitle="Let's find out where we are on the map!" icon="🗺️" />
        <StorybookPage>
            <Section title="Your Starting Spot" icon="📍">
                <P>Right now, your business is in a place called...</P>
                <div className="p-6 bg-blue-50 border-4 border-dashed border-blue-200 rounded-2xl text-3xl font-bold text-center text-blue-700">{diagnosis.currentStage}</div>
            </Section>
            <Section title="Your Superpower" icon="🦸">
                <P>To win this adventure, your most important job is to be:</P>
                 <div className="p-6 bg-green-50 border-4 border-dashed border-green-200 rounded-2xl text-2xl font-bold text-center text-green-700">{diagnosis.yourRole}</div>
            </Section>
        </StorybookPage>
        <StorybookPage>
            <Section title="The Grumpy Trolls" icon="👹"><P>These grumpy trolls are blocking your path. They are your biggest challenges right now:</P>{diagnosis.constraints.map((c, i) => <ListItem key={i} icon="👉">"{c}"</ListItem>)}</Section>
        </StorybookPage>
        <StorybookPage>
            <Section title="Your Secret Path to Victory!" icon="✨"><P>Here are the magic steps to get past the trolls and find the treasure:</P>{diagnosis.actions.map((a, i) => <ListItem key={i} icon={['1️⃣', '2️⃣', '3️⃣', '4️⃣'][i]}>{a}</ListItem>)}</Section>
        </StorybookPage>
    </>
);

const OfferPages: React.FC<{ offer1: GeneratedOffer, offer2: GeneratedOffer, downsell: GeneratedDownsell }> = ({ offer1, offer2, downsell }) => {
    const OfferCard: React.FC<{offer: GeneratedOffer, title: string}> = ({offer, title}) => (
        <div className="p-6 bg-white border-8 border-yellow-300 rounded-2xl shadow-lg break-inside-avoid my-6">
            <h3 className="text-3xl font-bold text-center text-yellow-700">{title}</h3>
            <h4 className="text-4xl font-extrabold text-center text-purple-600 mt-4">"{offer.name}"</h4>
            <P className="text-2xl italic text-center text-gray-600 mt-4">"{offer.promise}"</P>
            <div className="mt-6"><p className="text-2xl font-bold text-center text-green-600">Here's what's inside the chest:</p><div className="mt-4 space-y-3">{offer.stack.map((item, i) => <div key={i} className="flex items-center bg-green-50 p-3 rounded-lg"><span className="text-3xl mr-3">🎁</span><p className="flex-1 text-lg font-semibold">{item.solution}</p></div>)}</div></div>
            <div className="mt-8 text-center"><p className="text-lg text-red-500 line-through">A treasure worth {offer.totalValue}!</p><p className="text-2xl font-bold">You can have it for just...</p><p className="text-6xl font-black text-green-600 animate-pulse">{offer.price}</p></div>
             <div className="mt-6 p-4 bg-yellow-100 border-2 border-dashed border-yellow-400 rounded-xl text-center"><p className="font-bold text-xl text-yellow-800">Our Pinky Promise!</p><p className="italic text-yellow-700">"{offer.guarantee}"</p></div>
        </div>
    );
    return (
        <>
            <ChapterCover number={2} title="Your Magical Treasure Chests" subtitle="Creating offers nobody can say 'no' to!" icon="💎" />
            <StorybookPage><OfferCard offer={offer1} title="Treasure Chest #1" /></StorybookPage>
            <StorybookPage><OfferCard offer={offer2} title="Treasure Chest #2 (Another Option!)" /></StorybookPage>
            <StorybookPage><OfferCard offer={downsell.offer} title="A Friendly Little Key" /><P className="text-center text-lg mt-4">{downsell.rationale}</P></StorybookPage>
        </>
    );
};

const MoneyModelPages: React.FC<{ analysis: GeneratedMoneyModelAnalysis, model: GeneratedMoneyModel, profitPath: GeneratedProfitPath }> = ({ analysis, model, profitPath }) => (
    <>
        <ChapterCover number={3} title="The Money-Growing Tree" subtitle="How to make money to grow your business!" icon="🌳" />
        <StorybookPage>
            <Section title="Your Old Tree vs. Your New Tree" icon="🌱">
                <P>Your old way of making money was like a little sprout. The new way is like a giant, strong tree!</P>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-4 rounded-lg border-4 border-red-200 bg-red-50">
                        <h4 className="font-bold text-red-700 text-lg">{analysis.oldModel.title} (Old Way)</h4><p>{analysis.oldModel.description}</p>
                    </div>
                    <div className="p-4 rounded-lg border-4 border-green-200 bg-green-50">
                         <h4 className="font-bold text-green-700 text-lg">{analysis.newModel.title} (New Way)</h4><p>{analysis.newModel.description}</p>
                    </div>
                </div>
            </Section>
        </StorybookPage>
        <StorybookPage>
            <Section title="How Your Tree Grows" icon="☀️">
                <P>Your Money Tree has special branches. Here is how they grow, one after another!</P>
                 {model.steps.sort((a,b) => a.stepNumber - b.stepNumber).map(step => (
                     <div key={step.stepNumber} className="p-4 border-l-8 border-yellow-400 bg-yellow-50 rounded-r-lg my-4">
                        <h4 className="font-bold text-yellow-800 text-2xl">{step.stepNumber}. {step.title}</h4>
                        <p className="text-xl font-bold mt-1">{step.offerName} - <span className="text-green-600">{step.price}</span></p>
                        <P className="text-base mt-2">{step.details}</P>
                    </div>
                 ))}
            </Section>
        </StorybookPage>
    </>
);

const MarketingPages: React.FC<{ marketingModel: GeneratedMarketingModel, salesFunnel: GeneratedSalesFunnel, salesSystem: GeneratedSalesSystem }> = ({ marketingModel, salesFunnel, salesSystem }) => (
    <>
        <ChapterCover number={4} title="Finding Friendly Customers" subtitle="How to invite friends to see your amazing business!" icon="👋" />
        <StorybookPage>
            <Section title="4 Fun Ways to Make Friends" icon="🎉">
                {marketingModel.steps.map((step, i) => (
                    <div key={i} className="p-4 bg-purple-50 border-4 border-dashed border-purple-200 rounded-2xl">
                        <h4 className="font-bold text-2xl text-purple-700">{['☝️', '✌️', '🤟', '🖖'][i]} {step.method}</h4>
                        <P className="text-lg">{step.strategy}</P>
                        <P className="text-base italic p-2 bg-white rounded-lg">For example: {step.example}</P>
                    </div>
                ))}
            </Section>
        </StorybookPage>
         <StorybookPage>
            <Section title="Your Friendly Welcome Path" icon="🛤️">
                <P>This is the path your new friends will walk down to become happy customers!</P>
                 {salesFunnel.stages.map((stage, i) => (
                     <div key={i} className="p-3 bg-green-50 border-l-4 border-green-400 my-2">
                        <h4 className="font-bold text-lg text-green-800">Step {i+1}: {stage.stageName}</h4>
                        <P className="text-sm italic">{stage.goal}</P>
                     </div>
                 ))}
            </Section>
        </StorybookPage>
    </>
);

const FullPlaybookPdf: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => {
  return (
    <>
        <TitlePage />
        {playbook.diagnosis && <DiagnosisPages diagnosis={playbook.diagnosis} />}
        {playbook.offer1 && playbook.offer2 && playbook.downsell && <OfferPages offer1={playbook.offer1} offer2={playbook.offer2} downsell={playbook.downsell} />}
        {playbook.moneyModelAnalysis && playbook.moneyModel && playbook.profitPath && <MoneyModelPages analysis={playbook.moneyModelAnalysis} model={playbook.moneyModel} profitPath={playbook.profitPath}/>}
        {playbook.marketingModel && playbook.salesFunnel && playbook.salesSystem && <MarketingPages marketingModel={playbook.marketingModel} salesFunnel={playbook.salesFunnel} salesSystem={playbook.salesSystem} />}
    </>
  );
};

export default FullPlaybookPdf;
