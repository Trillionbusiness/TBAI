
import React from 'react';
import { 
    GeneratedPlaybook, GeneratedDiagnosis, GeneratedOffer, GeneratedDownsell, GeneratedMarketingModel, 
    GeneratedMoneyModelAnalysis, GeneratedMoneyModel, GeneratedMoneyModelMechanisms, 
    GeneratedOperationsPlan, GeneratedProfitPath, GeneratedSalesFunnel, Kpi, GeneratedSalesSystem, MoneyModelStep 
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

// --- NEW PDF SECTION COMPONENTS ---

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

const OperationsPlanSection: React.FC<{ operationsPlan: GeneratedOperationsPlan }> = ({ operationsPlan }) => (
    <Section title="Your Operations Plan">
        <P>{operationsPlan.corePrinciple}</P>
        <SubSection title="High-Leverage Activities" icon="🎯">
            <table className="w-full text-sm text-left mt-2">
                <thead className="text-xs uppercase bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">Outcome</th>
                        <th className="px-4 py-2">Activity</th>
                        <th className="px-4 py-2">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {operationsPlan.outcomesAndActivities.map((item, i) => (
                        <tr key={i} className="border-b">
                            <td className="px-4 py-2 font-semibold">{item.outcome}</td>
                            <td className="px-4 py-2">{item.activity}</td>
                            <td className="px-4 py-2">{item.timeAllocation} / {item.frequency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </SubSection>
        <SubSection title="Bottleneck Analysis" icon="🔧">
            <P>{operationsPlan.bottleneckAnalysis}</P>
        </SubSection>
    </Section>
);

const KpiDashboardSection: React.FC<{ kpis: Kpi[] }> = ({ kpis }) => (
    <Section title="Your Business Scorecard">
        <P>What gets measured, gets managed. These are the 5-7 numbers you must track weekly to win.</P>
        <div className="grid grid-cols-2 gap-4 mt-4">
        {kpis.map(kpi => (
            <div key={kpi.name} className="p-3 bg-gray-50 border-l-4 border-gray-300 rounded-r-lg">
                <p className="font-bold text-gray-800">{kpi.name}</p>
                <p className="text-xs text-gray-500">{kpi.description}</p>
            </div>
        ))}
        </div>
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

const MoneyModelAnalysisSection: React.FC<{ analysis: GeneratedMoneyModelAnalysis }> = ({ analysis }) => {
    const ModelCard: React.FC<{ model: any, color: 'red' | 'green' }> = ({ model, color }) => (
        <div className={`p-4 rounded-lg border ${color === 'red' ? 'border-red-400 bg-red-50' : 'border-green-500 bg-green-50'}`}>
            <h4 className={`font-bold ${color === 'red' ? 'text-red-700' : 'text-green-700'} text-lg`}>{model.title}</h4>
            <P className="text-sm mt-1 mb-4">{model.description}</P>
            <div className="space-y-1">
                {model.metrics.map((metric: any, i: number) => (
                    <div key={i} className="flex justify-between text-xs">
                        <span>{metric.label}:</span><span className="font-bold">{metric.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
    return (
        <Section title="Your Money Plan: Before & After">
            <P>A good money plan helps you grow. We are going to make your money plan much better.</P>
            <div className="grid grid-cols-2 gap-4">
                <ModelCard model={analysis.oldModel} color="red" />
                <ModelCard model={analysis.newModel} color="green" />
            </div>
        </Section>
    );
};

const MoneyModelFunnelSection: React.FC<{ model: GeneratedMoneyModel }> = ({ model }) => {
    const StepCard: React.FC<{ step: MoneyModelStep }> = ({ step }) => (
        <div className="p-4 border-l-4 border-[#82D5E3] bg-gray-50 rounded-r-lg">
            <h4 className="font-bold text-[#147273]">{step.stepNumber}. {step.title}</h4>
            <p className="text-lg font-bold mt-1">{step.offerName} - <span className="text-green-600">{step.price}</span></p>
            <P className="text-sm mt-2">{step.rationale}</P>
            <p className="font-mono text-xs uppercase bg-blue-100 text-blue-800 inline-block px-2 py-1 rounded mt-2">{step.hormoziTactic}</p>
        </div>
    );
    return (
        <Section title={model.title}>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <P className="text-lg font-bold text-yellow-800">Core Principle</P>
                <P className="italic">"{model.corePrinciple}"</P>
            </div>
            <div className="space-y-4 mt-4">
                {model.steps.sort((a,b) => a.stepNumber - b.stepNumber).map(step => <StepCard key={step.stepNumber} step={step} />)}
            </div>
        </Section>
    );
};

const ProfitPathSection: React.FC<{ profitPath: GeneratedProfitPath }> = ({ profitPath }) => (
    <Section title="Your Profit Path">
        <P>This plan helps you make money right away from each new customer, fueling your growth.</P>
        {profitPath.steps.map((step, i) => (
            <SubSection key={i} title={`${i+1}. ${step.title}`} icon="💸">
                <P><strong className="font-semibold">Action:</strong> {step.action}</P>
                <P className="italic"><strong className="font-semibold not-italic">Example:</strong> {step.example}</P>
            </SubSection>
        ))}
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

const SalesFunnelSection: React.FC<{ funnel: GeneratedSalesFunnel }> = ({ funnel }) => (
    <Section title={funnel.title}>
        <P>{funnel.corePrinciple}</P>
        {funnel.stages.map((stage, i) => (
            <SubSection key={i} title={`Stage ${i+1}: ${stage.stageName}`} icon="➡️">
                <P><strong className="font-semibold">Goal:</strong> {stage.goal}</P>
                <div className="grid grid-cols-2 gap-4 mt-2 text-xs">
                    <div className="p-2 bg-white rounded"><strong>Ad Headline:</strong> {stage.adCopy.headline}</div>
                    <div className="p-2 bg-white rounded"><strong>Landing Page Headline:</strong> {stage.landingPage.headline}</div>
                </div>
            </SubSection>
        ))}
    </Section>
);

const SalesSystemSection: React.FC<{ system: GeneratedSalesSystem }> = ({ system }) => (
     <Section title={system.title}>
        <P>{system.corePrinciple}</P>
        {system.strategies.map((strat, i) => (
            <SubSection key={i} title={strat.method} icon="📣">
                <P>{strat.strategy}</P>
                <details className="text-xs mt-2">
                    <summary className="font-semibold cursor-pointer">View Template & Objections</summary>
                    <pre className="mt-2 text-xs bg-gray-100 p-3 border border-gray-200 rounded whitespace-pre-wrap font-sans">{strat.template}</pre>
                </details>
            </SubSection>
        ))}
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
             <h1 className="text-7xl font-black tracking-tight text-[#147273]">FULL BUSINESS</h1>
             <h2 className="text-6xl font-black tracking-tight text-gray-900">PLAYBOOK</h2>
             <div className="flex-grow"></div>
             <div className="mt-12 pt-6">
                <p className="font-semibold text-gray-600">Prepared by</p>
                <p className="font-bold text-xl text-gray-900">Trillion Business AI</p>
             </div>
        </Page>
        
        {playbook.diagnosis && playbook.operationsPlan && playbook.kpiDashboard && <>
            <SectionTitlePage number={1} title="Diagnosis & Roadmap" subtitle="Your current location and the path to your destination." />
            <Page>
                <DiagnosisSection diagnosis={playbook.diagnosis} />
                <OperationsPlanSection operationsPlan={playbook.operationsPlan} />
                <KpiDashboardSection kpis={playbook.kpiDashboard.kpis} />
            </Page>
        </>}
       
        {playbook.offer1 && playbook.offer2 && playbook.downsell && <>
             <SectionTitlePage number={2} title="The Grand Slam Offer" subtitle="The irresistible deal that makes people feel stupid saying no." />
             <Page><OffersSection offer1={playbook.offer1} offer2={playbook.offer2} downsell={playbook.downsell} /></Page>
        </>}

        {playbook.moneyModelAnalysis && playbook.moneyModel && playbook.profitPath && <>
            <SectionTitlePage number={3} title="The Money Machine" subtitle="How you get paid to acquire customers, making growth automatic." />
            <Page>
                <MoneyModelAnalysisSection analysis={playbook.moneyModelAnalysis} />
                <MoneyModelFunnelSection model={playbook.moneyModel} />
                <ProfitPathSection profitPath={playbook.profitPath} />
            </Page>
        </>}
       
        {playbook.marketingModel && playbook.salesFunnel && playbook.salesSystem && <>
            <SectionTitlePage number={4} title="The Lead Faucet" subtitle="The machine that finds your ideal customers and gets them to buy." />
            <Page>
                <MarketingModelSection model={playbook.marketingModel} />
                <SalesFunnelSection funnel={playbook.salesFunnel} />
                <SalesSystemSection system={playbook.salesSystem} />
            </Page>
        </>}
       
        <Page className="flex flex-col justify-center items-center text-center bg-[#147273] text-white">
            <h2 className="text-4xl font-bold text-white">The Plan Works If You Do.</h2>
            <p className="text-xl mt-4">You have the roadmap. Now it's time to take the first step.</p>
        </Page>
    </>
  );
};

export default FullPlaybookPdf;
