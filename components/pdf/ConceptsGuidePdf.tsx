import React from 'react';
import { BusinessData, GeneratedPlaybook } from '../../types';

// --- Storybook Theming Components ---
const StorybookPage: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => (
    <div className={`p-10 bg-[#FFFAF0] font-sans text-gray-800 break-after-page relative overflow-hidden border-8 border-yellow-300 rounded-3xl ${className}`} style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", width: '800px', minHeight: '1131px', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)' }}>
        <div className="absolute top-8 left-8 text-5xl">☀️</div>
        <div className="relative z-10">{children}</div>
    </div>
);

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-yellow-800 tracking-tighter text-center">{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-yellow-600 mt-4 text-center">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode, icon: string }> = ({ children, icon }) => <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-dashed border-yellow-400 pb-3 mb-6 mt-10 break-after-avoid flex items-center gap-4"><span className="text-5xl">{icon}</span>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-xl text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;

const IconCard: React.FC<{icon: string, title: string, children: React.ReactNode, color: 'green' | 'red'}> = ({icon, title, children, color}) => (
    <div className={`p-4 bg-${color}-50 rounded-2xl border-4 border-${color}-200 shadow-md`}>
        <h4 className={`font-bold text-xl ${color === 'green' ? 'text-green-800' : 'text-red-800'} flex items-center`}>
            <span className="text-3xl mr-2">{icon}</span> {title}
        </h4>
        <p className="text-base text-gray-600 leading-relaxed mt-2">{children}</p>
    </div>
);

const ValueEquationDiagram: React.FC = () => (
    <div className="p-6 bg-gray-100 rounded-2xl my-6 text-center">
        <p className="font-bold text-3xl text-gray-800">(A Super Fun Dream) + (Knowing It Will Happen)</p>
        <p className="font-bold text-5xl text-gray-400">÷</p>
        <p className="font-bold text-3xl text-gray-800">(Waiting a Long Time) + (Hard Work)</p>
        <div className="grid grid-cols-2 gap-4 mt-6">
            <IconCard icon="🏆" title="Make the Dream BIGGER!" color="green">What's the bestest thing that could ever happen for your customer?</IconCard>
            <IconCard icon="✅" title="Pinky Promise it will work!" color="green">Use guarantees and tell stories of other happy friends to show it's real.</IconCard>
            <IconCard icon="⏰" title="Make it happen FASTER!" color="red">How can they get a happy result today? Give them a small treat right away!</IconCard>
            <IconCard icon="🏃" title="Make it SUPER EASY!" color="red">Give them coloring pages (templates) and connect-the-dots (checklists) so it feels like playing!</IconCard>
        </div>
    </div>
);

const CfaDiagram: React.FC = () => (
    <div className="my-6 p-6 bg-blue-50 rounded-2xl text-center border-4 border-blue-200">
        <h3 className="text-2xl font-bold text-blue-800">The Magic Money Seed!</h3>
        <div className="flex items-center justify-around mt-4">
            <div className="text-center"><p className="text-5xl">💰</p><p className="font-bold">Plant 1 coin</p></div>
            <p className="text-4xl font-light text-gray-400">→</p>
            <div className="text-center"><p className="text-5xl">👋</p><p className="font-bold">Get 1 new friend</p></div>
            <p className="text-4xl font-light text-gray-400">→</p>
             <div className="text-center"><p className="text-5xl">💰💰</p><p className="font-bold">Tree grows 2 coins!</p></div>
             <p className="text-4xl font-light text-gray-400">→</p>
             <div className="text-center"><p className="text-5xl">👋👋</p><p className="font-bold">Now get 2 new friends!</p></div>
        </div>
    </div>
);


const ConceptsGuidePdf: React.FC = () => {
    return (
        <StorybookPage>
            <header className="text-center mb-12 pb-6 border-b-8 border-dashed border-yellow-400">
                 <div className="text-8xl mb-4">📖</div>
                <Title>The Adventurer's Handbook</Title>
                <Subtitle>Secret tips and tricks for your great business adventure!</Subtitle>
            </header>

            <main>
                <SectionTitle icon="💎">Secret #1: The Magical Treasure Chest</SectionTitle>
                <P>Instead of just selling one little thing, you build a giant treasure chest! You fill it with so many amazing goodies that your customers feel silly saying "no, thank you." It solves their biggest problem in lots of fun ways.</P>
                <P>To make your chest extra special, you use a magic formula:</P>
                <ValueEquationDiagram />

                <SectionTitle icon="🌳">Secret #2: The Money-Growing Tree</SectionTitle>
                <P>This is the secret to growing big and strong without ever running out of snacks! The idea is simple: every time a new friend (customer) joins you, they give you enough money to go out and find TWO new friends!</P>
                <CfaDiagram />
                
                <SectionTitle icon="👹">Secret #3: The Grumpy Trolls</SectionTitle>
                <P>Every adventure has grumpy trolls blocking the path. In business, you only have one big grumpy troll to worry about at a time. Your whole plan is about getting past that one troll!</P>
                <div className="mt-6 p-6 bg-red-50 border-4 border-dashed border-red-200 rounded-2xl">
                    <P>Your plan tells you which of these four trolls is your biggest problem right now so you can focus all your energy on getting past them!</P>
                </div>
            </main>
        </StorybookPage>
    );
};

export default ConceptsGuidePdf;
