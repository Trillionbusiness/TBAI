

import React from 'react';
import { GeneratedMarketingModel } from '../types';
import Card from './common/Card';
import CopyableBlock from './common/CopyableBlock';

interface Step5MarketingModelProps {
  marketingModel: GeneratedMarketingModel;
  isStatic?: boolean;
}

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-2xl font-black tracking-tight border-b-2 pb-2 mb-6" style={{color: 'var(--primary-color)', borderColor: 'var(--accent-color)'}}>{children}</h3>
);

const Step5MarketingModel: React.FC<Step5MarketingModelProps> = ({ marketingModel, isStatic = false }) => {
  if (!marketingModel || !marketingModel.steps) {
    return null;
  }

  const icons = ["🔥", "🎯", "🚀", "📈"];
  return (
    <Card>
      <SectionHeader>4 Ways to Find Customers</SectionHeader>
      <p className="-mt-4 mb-8" style={{color: 'var(--text-light)'}}>This is how you find people who really want what you sell. Do these four things to show them your amazing offer.</p>
      <div className="space-y-6">
        {marketingModel.steps.map((step, index) => (
          <div key={index} className="rounded-lg p-5 border-l-4 shadow-sm" style={{backgroundColor: 'var(--bg-muted)', borderColor: 'var(--primary-color)'}}>
              <h4 className="flex items-center text-xl font-bold mb-2" style={{color: 'var(--primary-color)'}}>
                <span className="text-2xl mr-3">{icons[index % icons.length]}</span>
                {step.method}
              </h4>
             <p className="font-semibold mb-2 pl-10" style={{color: 'var(--text-dark)'}}>{step.strategy}</p>
             <div className="p-3 rounded-lg pl-4 border-l-2 ml-10" style={{backgroundColor: 'var(--bg-light)', borderColor: 'var(--border-color)'}}>
                <p className="italic" style={{color: 'var(--text-light)'}}><span className="font-bold not-italic" style={{color: 'var(--text-light)'}}>For example: </span>{step.example}</p>
             </div>
            {step.template && (
                <div className="pl-10 mt-4">
                    <CopyableBlock title="A Template You Can Use" content={step.template} isStatic={isStatic} />
                </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Step5MarketingModel;
