

import React from 'react';
import { GeneratedSalesFunnel, FunnelStage } from '../types';
import Card from './common/Card';

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-2xl font-black tracking-tight border-b-2 pb-2 mb-6" style={{color: 'var(--primary-color)', borderColor: 'var(--accent-color)'}}>{children}</h3>
);

const StageCard: React.FC<{ stage: FunnelStage; index: number; isLast: boolean }> = ({ stage, index, isLast }) => {
    const stageColors = ['border-blue-400', 'border-purple-400', 'border-green-500'];
    const stageBgColors = ['bg-blue-50', 'bg-purple-50', 'bg-green-50'];
    const colorClass = stageColors[index % stageColors.length];
    const bgColorClass = stageBgColors[index % stageBgColors.length];

    return (
        <div className="relative pl-8 pb-8">
            {!isLast && <div className="absolute left-4 top-5 h-full w-0.5" style={{backgroundColor: 'var(--border-color)'}} aria-hidden="true"></div>}
            <div className={`absolute left-0 top-0 flex items-center justify-center w-9 h-9 border-2 font-bold rounded-full`} style={{backgroundColor: 'var(--bg-light)', borderColor: 'var(--primary-color)', color: 'var(--primary-color)'}}>
                {index + 1}
            </div>
            <div className="ml-4">
                <Card className={`${bgColorClass} border-t-4 ${colorClass}`}>
                    <h4 className="text-xl font-bold mb-1" style={{color: 'var(--text-dark)'}}>{stage.stageName}</h4>
                    <p className="italic mb-4" style={{color: 'var(--text-light)'}}>{stage.goal}</p>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="p-3 rounded-lg" style={{backgroundColor: 'var(--bg-light)'}}>
                            <h5 className="font-bold mb-2" style={{color: 'var(--primary-color)'}}>Ad / First Message</h5>
                            <p style={{color: 'var(--text-dark)'}}><strong style={{color: 'var(--text-light)'}}>Headline:</strong> {stage.adCopy.headline}</p>
                            <p className="mt-1" style={{color: 'var(--text-dark)'}}><strong style={{color: 'var(--text-light)'}}>Body:</strong> {stage.adCopy.body}</p>
                            <p className="mt-1" style={{color: 'var(--text-dark)'}}><strong style={{color: 'var(--text-light)'}}>Action:</strong> {stage.adCopy.cta}</p>
                        </div>
                        <div className="p-3 rounded-lg" style={{backgroundColor: 'var(--bg-light)'}}>
                            <h5 className="font-bold mb-2" style={{color: 'var(--primary-color)'}}>Website Page</h5>
                            <p style={{color: 'var(--text-dark)'}}><strong style={{color: 'var(--text-light)'}}>Headline:</strong> {stage.landingPage.headline}</p>
                            <p className="mt-1" style={{color: 'var(--text-dark)'}}><strong style={{color: 'var(--text-light)'}}>Key Parts:</strong> {stage.landingPage.elements.join(', ')}</p>
                            <p className="mt-1" style={{color: 'var(--text-dark)'}}><strong style={{color: 'var(--text-light)'}}>Main Goal:</strong> {stage.landingPage.keyFocus}</p>
                        </div>
                    </div>
                    
                    <div className="p-3 rounded-lg mt-4" style={{backgroundColor: 'var(--bg-light)'}}>
                        <h5 className="font-bold mb-2" style={{color: 'var(--primary-color)'}}>Sales Chat</h5>
                        <p style={{color: 'var(--text-dark)'}}><strong style={{color: 'var(--text-light)'}}>What to Do:</strong> {stage.salesProcess.step}</p>
                        <p className="mt-1" style={{color: 'var(--text-dark)'}}><strong style={{color: 'var(--text-light)'}}>What to Talk About:</strong> {stage.salesProcess.scriptFocus}</p>
                    </div>

                    <div className="mt-4 text-right">
                        <p className="text-xs uppercase font-bold" style={{color: 'var(--text-light)'}}>Number to Watch</p>
                        <p className="font-bold" style={{color: 'var(--text-dark)'}}>{stage.keyMetric}</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};


const SalesFunnel: React.FC<{ salesFunnel: GeneratedSalesFunnel }> = ({ salesFunnel }) => {
    if (!salesFunnel || !salesFunnel.stages) {
        return null;
    }

    return (
        <Card>
            <SectionHeader>{salesFunnel.title}</SectionHeader>
            <div className="text-center mb-8 p-4 rounded-lg border" style={{backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-color)'}}>
                <p className="text-lg font-bold" style={{color: 'var(--primary-color)'}}>The Big Idea</p>
                <p className="italic" style={{color: 'var(--text-light)'}}>"{salesFunnel.corePrinciple}"</p>
            </div>
            <div>
                {salesFunnel.stages.map((stage, index) => (
                    <StageCard 
                        key={index} 
                        stage={stage} 
                        index={index} 
                        isLast={index === salesFunnel.stages.length - 1} 
                    />
                ))}
            </div>
        </Card>
    );
};

export default SalesFunnel;
