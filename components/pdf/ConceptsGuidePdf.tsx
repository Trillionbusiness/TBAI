import React from 'react';
import { BusinessData, GeneratedPlaybook } from '../../types';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-5xl font-black text-gray-900 tracking-tight">{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-3xl font-bold text-gray-800 border-b-4 border-yellow-400 pb-3 mb-6 mt-10 break-after-avoid">{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;
const HighlightBox: React.FC<{ children: React.ReactNode, title: string, icon?: string }> = ({ children, title, icon = '💡' }) => (
    <div className="p-6 rounded-lg border-2 border-yellow-200 bg-yellow-50 my-6 break-inside-avoid shadow-lg">
        <h3 className="text-xl font-bold text-yellow-800 mb-2 flex items-center"><span className="text-2xl mr-2">{icon}</span>{title}</h3>
        {children}
    </div>
);
const IconCard: React.FC<{icon: string, title: string, children: React.ReactNode, color: 'green' | 'red'}> = ({icon, title, children, color}) => (
    <div className={`p-4 bg-${color}-50 rounded-lg border-t-4 border-${color}-400 shadow-md`}>
        <h4 className={`font-bold text-lg ${color === 'green' ? 'text-green-800' : 'text-red-800'} flex items-center`}>
            <span className="text-2xl mr-2">{icon}</span> {title}
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed mt-2">{children}</p>
    </div>
);

const ValueEquationDiagram: React.FC = () => (
    <div className="p-6 bg-gray-100 rounded-lg my-6">
        <div className="text-center">
            <p className="font-bold text-2xl text-gray-800">([Dream Outcome] x [Likelihood of Success])</p>
            <p className="font-bold text-4xl text-gray-400">÷</p>
            <p className="font-bold text-2xl text-gray-800">([Time Delay] x [Effort & Sacrifice])</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
            <IconCard icon="🏆" title="Increase Dream Outcome" color="green">What is the perfect future your customer wants? Paint a vivid picture of it.</IconCard>
            <IconCard icon="✅" title="Increase Success Likelihood" color="green">How can you prove it will work? Use guarantees, testimonials, and clear plans.</IconCard>
            <IconCard icon="⏰" title="Decrease Time Delay" color="red">How quickly can they get a result? Offer quick wins and fast onboarding.</IconCard>
            <IconCard icon="🏃" title="Decrease Effort & Sacrifice" color="red">How easy can you make it? Provide templates, checklists, and done-for-you services.</IconCard>
        </div>
    </div>
);

const CfaDiagram: React.FC = () => (
    <div className="my-6 p-6 bg-gray-100 rounded-lg text-center">
        <h3 className="text-xl font-bold text-gray-800">The Money Machine Flow</h3>
        <div className="flex items-center justify-around mt-4">
            <div className="text-center">
                <p className="text-4xl">📢</p>
                <p className="font-bold">Ad Spend</p>
                <p className="text-xs text-red-600">($100)</p>
            </div>
            <p className="text-4xl font-light text-gray-400">→</p>
            <div className="text-center">
                <p className="text-4xl">👨‍👩‍👧‍👦</p>
                <p className="font-bold">New Customer</p>
            </div>
            <p className="text-4xl font-light text-gray-400">→</p>
             <div className="text-center">
                <p className="text-4xl">💵</p>
                <p className="font-bold">Immediate Profit</p>
                 <p className="text-xs text-green-600">($200+)</p>
            </div>
             <p className="text-4xl font-light text-gray-400">→</p>
             <div className="text-center">
                <p className="text-4xl">📢📢</p>
                <p className="font-bold">More Ad Spend</p>
                <p className="text-xs text-red-600">($200)</p>
            </div>
        </div>
    </div>
);


interface ConceptsGuidePdfProps {
  businessData: BusinessData;
  playbook: GeneratedPlaybook;
}

const ConceptsGuidePdf: React.FC<ConceptsGuidePdfProps> = ({ businessData, playbook }) => {
    return (
        <div className="p-12 bg-white font-sans text-gray-900">
            <header className="text-center mb-12 pb-6 border-b-8 border-yellow-400">
                <Title>Your Business Concepts Explained</Title>
                <Subtitle>Simple explanations for the powerful ideas in your new business plan.</Subtitle>
            </header>

            <main>
                <SectionTitle>Idea #1: The "Grand Slam Offer"</SectionTitle>
                <P>This is the foundation. Instead of just selling a product, you create an offer so packed with value that people feel stupid saying no. It solves your customer's biggest problem from every angle.</P>
                <HighlightBox title="The Value Equation: How to Engineer Value">
                    <P>Every great offer maximizes the good stuff and minimizes the bad stuff. Here's a visual breakdown of the formula:</P>
                </HighlightBox>
                <ValueEquationDiagram />

                <SectionTitle>Idea #2: Client-Financed Acquisition</SectionTitle>
                <P>This is the secret to growing fast without running out of money. The goal is simple: get customers to pay you to get more customers.</P>
                 <HighlightBox title="The Golden Rule of Growth">
                    <P>The money you make from a new customer in the first 30 days should be <strong className="font-semibold">at least double</strong> what it cost you to get them. This creates a self-funding "money machine."</P>
                </HighlightBox>
                <CfaDiagram />
                
                <SectionTitle>Idea #3: The Theory of Constraints</SectionTitle>
                <P>A business is like a hose with kinks in it. You don't need to fix the whole hose; you just need to find the <strong className="font-semibold">biggest kink</strong> and straighten it.</P>
                <HighlightBox title="The Four Core 'Kinks' (Constraints)" icon="🚧">
                    <P>Your plan identifies which of these is your biggest problem right now so you can focus all your energy there.</P>
                     <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="p-3 bg-white rounded shadow"><strong className="font-semibold text-blue-700">1. Leads:</strong> Not enough people to talk to.</div>
                        <div className="p-3 bg-white rounded shadow"><strong className="font-semibold text-blue-700">2. Sales:</strong> People are interested, but not buying.</div>
                        <div className="p-3 bg-white rounded shadow"><strong className="font-semibold text-blue-700">3. Delivery:</strong> You can't keep customers happy or get results.</div>
                        <div className="p-3 bg-white rounded shadow"><strong className="font-semibold text-blue-700">4. Profit:</strong> You're busy, but there's no money left over.</div>
                    </div>
                </HighlightBox>
            </main>
        </div>
    );
};

export default ConceptsGuidePdf;
