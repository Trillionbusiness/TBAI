
import React from 'react';
import { GeneratedMoneyModelAnalysis } from '../types';
import Card from './common/Card';

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-2xl font-black tracking-tight border-b-2 pb-2 mb-6" style={{color: 'var(--primary-color)', borderColor: 'var(--accent-color)'}}>{children}</h3>
);

const ModelCard: React.FC<{ model: GeneratedMoneyModelAnalysis['oldModel'], color: 'red' | 'green' }> = ({ model, color }) => {
    const borderColor = color === 'red' ? 'border-red-400' : 'border-green-500';
    const bgColor = color === 'red' ? 'bg-red-50' : 'bg-green-50';
    const textColor = color === 'red' ? 'text-red-700' : 'text-green-700';

    return (
        <div className={`p-4 rounded-lg border ${borderColor} ${bgColor} flex flex-col`}>
          <h4 className={`font-bold ${textColor} text-lg`}>{model.title}</h4>
          <p className="text-sm mt-1 mb-4 flex-grow" style={{color: 'var(--text-light)'}}>{model.description}</p>
          <div className="space-y-2">
            {model.metrics.map((metric, index) => (
                <div key={index} className="flex justify-between text-sm">
                    <span style={{color: 'var(--text-light)'}}>{metric.label}:</span>
                    <span className="font-bold" style={{color: 'var(--text-dark)'}}>{metric.value}</span>
                </div>
            ))}
          </div>
        </div>
    );
};


const MoneyModelAnalysis: React.FC<{ analysis: GeneratedMoneyModelAnalysis }> = ({ analysis }) => {
  if (!analysis || !analysis.ltvCacAnalysis || !analysis.projectedEconomics || !analysis.oldModel || !analysis.newModel) {
    return null;
  }

  return (
    <Card>
      <SectionHeader>Your Money Plan: Before and After</SectionHeader>
      <p className="-mt-4 mb-6" style={{color: 'var(--text-light)'}}>This is the most important part. A good money plan helps you grow. We are going to make your money plan much better.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModelCard model={analysis.oldModel} color="red" />
        <ModelCard model={analysis.newModel} color="green" />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
            <h4 className="text-xl font-bold mb-2" style={{color: 'var(--primary-color)'}}>Your Goal for Customer Value</h4>
            <div className="p-4 rounded-lg" style={{backgroundColor: 'var(--bg-muted)'}}>
                <div className="text-center p-4 rounded-lg mb-3" style={{backgroundColor: 'var(--bg-light)', border: '1px solid var(--border-color)'}}>
                    <span className="text-5xl font-black" style={{color: 'var(--text-dark)'}}>{analysis.ltvCacAnalysis.targetRatio}</span>
                    <p className="text-sm" style={{color: 'var(--text-light)'}}>Goal for how much a customer is worth to you</p>
                </div>
                <p className="text-sm" style={{color: 'var(--text-light)'}}>{analysis.ltvCacAnalysis.explanation}</p>
            </div>
        </div>
        <div>
            <h4 className="text-xl font-bold mb-2" style={{color: 'var(--primary-color)'}}>How Much You Could Make in 30 Days</h4>
            <div className="p-4 rounded-lg space-y-3" style={{backgroundColor: 'var(--bg-muted)'}}>
                 <div className="flex justify-between items-center text-lg">
                    <span style={{color: 'var(--text-light)'}}>What a customer brings you:</span>
                    <span className="font-bold text-green-600">{analysis.projectedEconomics.targetLTV}</span>
                </div>
                 <div className="flex justify-between items-center text-lg">
                    <span style={{color: 'var(--text-light)'}}>Cost to get a customer:</span>
                    <span className="font-bold text-red-500">-{analysis.projectedEconomics.estimatedCAC}</span>
                </div>
                <div className="border-t my-2" style={{borderColor: 'var(--border-color)'}}></div>
                <div className="flex justify-between items-center text-xl">
                    <span className="font-bold" style={{color: 'var(--text-dark)'}}>Money you make right away:</span>
                    <span className="font-black" style={{color: 'var(--primary-color)'}}>{analysis.projectedEconomics.immediateProfit}</span>
                </div>
                <p className="text-sm pt-2" style={{color: 'var(--text-light)'}}>{analysis.projectedEconomics.explanation}</p>
            </div>
        </div>
      </div>
    </Card>
  );
};

export default MoneyModelAnalysis;
