
import React from 'react';

// --- Storybook Theming Components ---
const StorybookPage: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => (
    <div data-pdf-page="true" className={`p-10 bg-[#f0fff0] font-sans text-gray-800 break-after-page relative overflow-hidden border-8 border-green-300 rounded-3xl ${className}`} style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", width: '800px', minHeight: '1131px', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)' }}>
        <div className="absolute top-8 left-8 text-5xl">☀️</div>
        <div className="relative z-10">{children}</div>
    </div>
);

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-green-800 tracking-tighter text-center">{children}</h1>;
const SectionTitle: React.FC<{ children: React.ReactNode, icon: string }> = ({ children, icon }) => <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-dashed border-green-400 pb-3 mb-6 mt-10 break-after-avoid flex items-center gap-4"><span className="text-5xl">{icon}</span>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-xl text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;

const StepCard: React.FC<{ title: string; children: React.ReactNode, color: string }> = ({ title, children, color }) => (
    <div className={`p-6 bg-${color}-50 rounded-2xl border-4 border-dashed border-${color}-200 shadow-md my-4`}>
        <h3 className={`font-bold text-3xl text-${color}-700`}>{title}</h3>
        <P className={`text-${color}-800`}>{children}</P>
    </div>
);

const MoneyModelsGuidePdf: React.FC = () => {
    return (
        <StorybookPage>
            <header className="text-center mb-12 pb-6 border-b-8 border-dashed border-green-400">
                <div className="text-9xl mb-4">🌳</div>
                <Title>A Guide To Growing Your Money Tree</Title>
            </header>
            <main>
                <SectionTitle icon="🤔">Why do we need a Money Tree?</SectionTitle>
                <P>Imagine you want to throw a party for all your friends (your customers). To invite them, you need to send party invitations (advertisements). But invitations cost money!</P>
                <P>A Money Tree is a magical plan that makes sure that every time one friend comes to your party, they give you enough money to send invitations to TWO MORE friends! Soon, your party will be huge!</P>
                
                <SectionTitle icon="📏">How We Measure Your Tree</SectionTitle>
                 <P>To have a healthy tree, the yummy fruit it gives you (money from a customer) must be MORE than the cost of the seed you planted to grow it (the cost of getting that customer).</P>
                 <div className="text-center my-6 p-6 bg-yellow-100 rounded-2xl border-4 border-yellow-300">
                    <p className="text-5xl font-bold text-yellow-800">Fruit > Seed</p>
                    <p className="text-lg text-yellow-700">(Money you get is bigger than money you spend)</p>
                 </div>

                <SectionTitle icon="✨">The 3 Levels of Magic Trees</SectionTitle>
                <StepCard title="Level 1: The Little Sprout" color="red">
                    This tree gives you fruit... eventually. You have to wait a long, long time to get your money back. It's okay, but it grows very slowly.
                </StepCard>
                <StepCard title="Level 2: The Healthy Tree" color="yellow">
                    This tree gives you fruit right away! The money you get from a new friend today pays for the invitation you sent them. This is good!
                </StepCard>
                 <StepCard title="Level 3: The Magical, Multiplying Tree!" color="green">
                    This is what your plan helps you build! Every new friend gives you enough money to invite TWO more friends. Your party gets bigger and bigger, faster and faster! It's real magic!
                </StepCard>
            </main>
        </StorybookPage>
    );
};

export default MoneyModelsGuidePdf;
