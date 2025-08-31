

import React from 'react';
import { GeneratedSalesSystem } from '../types';
import Card, { StrategyAccordion } from './common/Card';
import CopyableBlock from './common/CopyableBlock';

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-2xl font-black tracking-tight border-b-2 pb-2 mb-6" style={{color: 'var(--primary-color)', borderColor: 'var(--accent-color)'}}>{children}</h3>
);

const SalesSystem: React.FC<{ salesSystem: GeneratedSalesSystem, isStatic?: boolean }> = ({ salesSystem, isStatic }) => {
  if (!salesSystem || !salesSystem.strategies) {
    return null;
  }

  return (
    <Card>
      <SectionHeader>{salesSystem.title}</SectionHeader>
      <div className="text-center mb-8 p-4 rounded-lg border" style={{backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-color)'}}>
        <p className="text-lg font-bold" style={{color: 'var(--primary-color)'}}>The Big Idea</p>
        <p className="italic" style={{color: 'var(--text-light)'}}>"{salesSystem.corePrinciple}"</p>
      </div>

      <div className="space-y-8">
        {salesSystem.strategies.map((strategy, index) => (
          <Card key={index} className="!p-0 overflow-hidden shadow-lg">
            <div className="p-6">
              <h4 className="text-xl font-bold mb-2" style={{color: 'var(--text-dark)'}}>{strategy.method}</h4>
              <p className="text-sm" style={{color: 'var(--text-light)'}}>{strategy.strategy}</p>
            </div>

            <div className="px-6 pb-6">
              <CopyableBlock title="Ready-to-Use Template" content={strategy.template} isStatic={isStatic} />
            </div>
            
            <div className="px-6 pb-6">
              <StrategyAccordion title="Handling 'Worst-Case' Objections">
                <div className="space-y-4">
                  {strategy.worstCaseObjections.map((objection, oIndex) => (
                    <div key={oIndex} className="p-3 border-l-4 border-red-400 bg-red-50 rounded-r-lg">
                      <p className="font-semibold italic text-red-700">Objection: "{objection.objection}"</p>
                      <div className="mt-2 p-3 bg-white rounded">
                        <p className="text-xs font-mono uppercase text-blue-600">{objection.psychologicalPrinciple}</p>
                        <p className="text-sm mt-1 text-gray-700">{objection.response}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </StrategyAccordion>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default SalesSystem;
