
import React from 'react';
import { GeneratedKpiDashboard, Kpi } from '../../types';

// --- Storybook Theming Components ---
const StorybookPage: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => (
    <div data-pdf-page="true" className={`p-10 bg-[#FFFAF0] font-sans text-gray-800 break-after-page relative overflow-hidden border-8 border-green-300 rounded-3xl ${className}`} style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", width: '800px', minHeight: '1131px', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)' }}>
        <div className="absolute top-8 left-8 text-5xl">☀️</div>
        <div className="relative z-10">{children}</div>
    </div>
);

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-green-800 tracking-tighter text-center">{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-green-600 mt-4 text-center">{children}</p>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-lg text-gray-700 leading-relaxed ${className || ''}`}>{children}</p>;

// --- PDF Specific Components ---

const LandmarkCard: React.FC<{ kpi: Kpi }> = ({ kpi }) => {
    const perspectiveStyles = {
        Financial: { color: 'yellow', icon: '💰' },
        Customer: { color: 'blue', icon: '❤️' },
        Operational: { color: 'purple', icon: '⚙️' },
        Marketing: { color: 'pink', icon: '📢' },
    };
    const style = perspectiveStyles[kpi.perspective] || { color: 'gray', icon: '📍' };
    const borderColor = `border-${style.color}-400`;
    const bgColor = `bg-${style.color}-50`;
    const textColor = `text-${style.color}-800`;

    return (
        <div className={`p-6 bg-white rounded-2xl border-t-8 ${borderColor} shadow-2xl mb-6 break-inside-avoid flex flex-col transform hover:scale-105 transition-transform duration-300`}>
            <div className="flex justify-between items-start">
                <div>
                     <p className={`font-bold text-sm uppercase ${textColor}`}>{kpi.perspective} Landmark</p>
                     <h4 className="text-3xl font-bold text-gray-800">{kpi.name}</h4>
                </div>
                <span className="text-5xl">{style.icon}</span>
            </div>
            
            <P className="mt-2 text-base flex-grow">{kpi.description}</P>
            
            <div className={`mt-4 p-4 ${bgColor} rounded-xl`}>
                 <p className={`font-bold text-base ${textColor}`}>Why this spot is important:</p>
                 <P className="italic text-base">{kpi.importance}</P>
            </div>

            <div className="mt-4 p-3 bg-gray-100 rounded-xl">
                <p className="font-bold text-sm text-gray-600">How to count your steps:</p>
                <P className="font-mono text-base">{kpi.formula}</P>
            </div>
        </div>
    );
};

const KpiDashboardPdf: React.FC<{ kpiDashboard: GeneratedKpiDashboard }> = ({ kpiDashboard }) => {
  return (
    <StorybookPage>
        <header className="text-center mb-10 pb-4 border-b-8 border-dashed border-green-400">
            <div className="text-8xl mb-4">🧭</div>
            <Title>Your Adventure Map & Compass</Title>
            <Subtitle>"{kpiDashboard.corePrinciple}"</Subtitle>
        </header>

        <P className="text-center text-xl mb-8">These are the important landmarks on your map. Visit them every week to make sure you're going in the right direction!</P>

        <main className="grid grid-cols-2 gap-8">
            {kpiDashboard.kpis.map((kpi, index) => (
                <LandmarkCard key={index} kpi={kpi} />
            ))}
        </main>
    </StorybookPage>
  );
};

export default KpiDashboardPdf;
