
import React from 'react';
import { GeneratedMoneyModel, MoneyModelStep } from '../types';
import Card from './common/Card';

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-2xl font-black tracking-tight border-b-2 pb-2 mb-6" style={{color: 'var(--primary-color)', borderColor: 'var(--accent-color)'}}>{children}</h3>
);

const StepCard: React.FC<{ step: MoneyModelStep, isLast: boolean }> = ({ step, isLast }) => {
    return (
        <div className="relative pl-8 pb-8">
            {/* Connecting line */}
            {!isLast && (
                <div className="absolute left-4 top-5 h-full w-0.5" style={{backgroundColor: 'var(--border-color)'}} aria-hidden="true"></div>
            )}
            {/* Step circle */}
            <div className="absolute left-0 top-0 flex items-center justify-center w-9 h-9 border-2 font-bold rounded-full" style={{backgroundColor: 'var(--bg-muted)', borderColor: 'var(--primary-color)', color: 'var(--primary-color)'}}>
                {step.stepNumber}
            </div>
            
            <div className="ml-4">
                <Card>
                    <h4 className="text-lg font-bold" style={{color: 'var(--primary-color)'}}>{step.title}</h4>
                    <p className="text-xl font-bold mt-1" style={{color: 'var(--text-dark)'}}>{step.offerName} - <span className="text-green-600">{step.price}</span></p>
                    
                    <div className="mt-4 p-3 rounded-lg border-l-2" style={{backgroundColor: 'var(--bg-muted)', borderColor: 'var(--primary-color)'}}>
                        <p className="text-sm font-semibold" style={{color: 'var(--text-light)'}}>Why this step is good:</p>
                        <p className="text-sm" style={{color: 'var(--text-light)'}}>{step.rationale}</p>
                    </div>

                    <div className="mt-3">
                         <p className="font-mono text-xs uppercase tracking-wider text-blue-800 bg-blue-100 inline-block px-2 py-1 rounded">{step.hormoziTactic}</p>
                    </div>

                    <div className="mt-4 text-sm whitespace-pre-wrap" style={{color: 'var(--text-dark)'}}>
                        {step.details}
                    </div>
                </Card>
            </div>
        </div>
    );
};

const MoneyModelFunnel: React.FC<{ moneyModel: GeneratedMoneyModel }> = ({ moneyModel }) => {
  if (!moneyModel || !moneyModel.steps) {
    return null;
  }

  return (
    <Card>
      <SectionHeader>{moneyModel.title}</SectionHeader>
      <div className="text-center mb-8 p-4 rounded-lg border" style={{backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-color)'}}>
        <p className="text-lg font-bold" style={{color: 'var(--primary-color)'}}>The Big Idea</p>
        <p className="italic" style={{color: 'var(--text-light)'}}>"{moneyModel.corePrinciple}"</p>
      </div>
      
      <div>
        {moneyModel.steps.sort((a, b) => a.stepNumber - b.stepNumber).map((step, index) => (
          <StepCard key={step.stepNumber} step={step} isLast={index === moneyModel.steps.length - 1} />
        ))}
      </div>

      <div className="mt-6 text-center p-4 rounded-lg" style={{backgroundColor: 'var(--bg-muted)'}}>
        <p className="text-lg font-bold" style={{color: 'var(--text-dark)'}}>All Together</p>
        <p className="mt-1" style={{color: 'var(--text-light)'}}>{moneyModel.summary}</p>
      </div>
    </Card>
  );
};

export default MoneyModelFunnel;
