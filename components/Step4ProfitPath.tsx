

import React from 'react';
import { GeneratedProfitPath } from '../types';
import Card from './common/Card';
import CopyableBlock from './common/CopyableBlock';

interface Step4ProfitPathProps {
  profitPath: GeneratedProfitPath;
  isStatic?: boolean;
}

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-2xl font-black tracking-tight border-b-2 pb-2 mb-6" style={{color: 'var(--primary-color)', borderColor: 'var(--accent-color)'}}>{children}</h3>
);

const Step4ProfitPath: React.FC<Step4ProfitPathProps> = ({ profitPath, isStatic = false }) => {
  if (!profitPath || !profitPath.steps) {
    return null;
  }

  return (
    <Card>
      <SectionHeader>4 Steps to Make More Money</SectionHeader>
      <p className="-mt-4 mb-8" style={{color: 'var(--text-light)'}}>This plan helps you make money right away from each new customer. This helps you grow faster.</p>
      <div className="space-y-6">
        {profitPath.steps.map((step, index) => (
          <div key={index} className="p-4 border-l-4 rounded-r-lg" style={{borderColor: 'var(--primary-color)', backgroundColor: 'var(--bg-muted)'}}>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-shrink-0 md:w-1/3">
                <h4 className="font-bold text-lg" style={{color: 'var(--primary-color)'}}>{index + 1}. {step.title}</h4>
                </div>
                <div className="flex-grow">
                <p style={{color: 'var(--text-dark)'}}><span className="font-semibold" style={{color: 'var(--text-light)'}}>What to do:</span> {step.action}</p>
                <p className="mt-1 italic" style={{color: 'var(--text-light)'}}><span className="font-semibold not-italic" style={{color: 'var(--text-light)'}}>For example:</span> {step.example}</p>
                </div>
            </div>
            {step.script && <CopyableBlock title="A Script You Can Use" content={step.script} isStatic={isStatic} />}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Step4ProfitPath;
