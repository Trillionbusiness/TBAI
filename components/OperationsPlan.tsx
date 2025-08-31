

import React from 'react';
import { GeneratedOperationsPlan } from '../types';
import Card from './common/Card';

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-2xl font-black tracking-tight border-b-2 pb-2 mb-6" style={{color: 'var(--primary-color)', borderColor: 'var(--accent-color)'}}>{children}</h3>
);

const OperationsPlan: React.FC<{ operationsPlan: GeneratedOperationsPlan }> = ({ operationsPlan }) => {
  if (!operationsPlan) {
    return null;
  }

  return (
    <Card>
      <SectionHeader>{operationsPlan.title}</SectionHeader>
       <div className="text-center mb-8 p-4 rounded-lg border" style={{backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-color)'}}>
        <p className="text-lg font-bold" style={{color: 'var(--primary-color)'}}>The Big Idea</p>
        <p className="italic" style={{color: 'var(--text-light)'}}>"{operationsPlan.corePrinciple}"</p>
      </div>

      <div className="mb-8">
        <h4 className="text-xl font-bold mb-4" style={{color: 'var(--text-dark)'}}>What You'll Do and Why</h4>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left" style={{color: 'var(--text-light)'}}>
                <thead className="text-xs uppercase" style={{backgroundColor: 'var(--bg-muted)', color: 'var(--primary-color)'}}>
                    <tr>
                        <th scope="col" className="px-4 py-3">Good Thing for Customer</th>
                        <th scope="col" className="px-4 py-3">What You Do</th>
                        <th scope="col" className="px-4 py-3">How Much Time</th>
                        <th scope="col" className="px-4 py-3">How Often</th>
                    </tr>
                </thead>
                <tbody>
                    {(operationsPlan.outcomesAndActivities || []).map((item, index) => (
                        <tr key={index} className="border-b" style={{borderColor: 'var(--border-color)'}}>
                            <td className="px-4 py-3 font-semibold" style={{color: 'var(--text-dark)'}}>{item.outcome}</td>
                            <td className="px-4 py-3">{item.activity}</td>
                            <td className="px-4 py-3">{item.timeAllocation}</td>
                            <td className="px-4 py-3">{item.frequency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
      
      <div className="mb-8">
        <h4 className="text-xl font-bold mb-4" style={{color: 'var(--text-dark)'}}>What's Slowing You Down</h4>
        <div className="p-4 rounded-lg border-l-4 border-red-500" style={{backgroundColor: 'var(--bg-muted)'}}>
          <p style={{color: 'var(--text-light)'}}>{operationsPlan.bottleneckAnalysis}</p>
        </div>
      </div>

      <div>
        <h4 className="text-xl font-bold mb-4" style={{color: 'var(--text-dark)'}}>Jobs to Do</h4>
        <div className="space-y-6">
          {(operationsPlan.proposedRoles || []).map((role, index) => (
            <Card key={index} style={{backgroundColor: 'var(--bg-muted)'}}>
              <h5 className="text-lg font-bold" style={{color: 'var(--primary-color)'}}>{role.roleTitle}</h5>
              <p className="text-sm mb-4" style={{color: 'var(--text-light)'}}><span className="font-semibold">How to know it's working:</span> {role.keyMetric}</p>
              
              <p className="text-sm font-semibold mb-2" style={{color: 'var(--text-light)'}}>Important tasks:</p>
              <ul className="list-disc list-inside text-sm space-y-1" style={{color: 'var(--text-dark)'}}>
                {role.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
              </ul>

              <p className="text-sm font-semibold mt-4 mb-2" style={{color: 'var(--text-light)'}}>What a day looks like:</p>
              <p className="text-sm whitespace-pre-wrap p-3 rounded" style={{backgroundColor: 'var(--bg-light)', color: 'var(--text-dark)'}}>{role.dailyStructure}</p>
            </Card>
          ))}
        </div>
      </div>

    </Card>
  );
};

export default OperationsPlan;
