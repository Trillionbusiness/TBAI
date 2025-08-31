import React from 'react';
import { GeneratedDiagnosis } from '../types';
import Card from './common/Card';

interface Step2DiagnosisProps {
  diagnosis: GeneratedDiagnosis;
}

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-2xl font-black tracking-tight border-b-2 pb-2 mb-4" style={{color: 'var(--primary-color)', borderColor: 'var(--accent-color)'}}>{children}</h3>
);

const Step2Diagnosis: React.FC<Step2DiagnosisProps> = ({ diagnosis }) => {
  return (
    <Card>
      <SectionHeader>Your Business Today</SectionHeader>
      <div className="space-y-6 text-lg">
        <div>
          <p className="font-semibold" style={{color: 'var(--text-light)'}}>Your stage:</p>
          <p className="font-bold text-xl" style={{color: 'var(--primary-color)'}}>{diagnosis.currentStage}</p>
        </div>
        <div>
          <p className="font-semibold" style={{color: 'var(--text-light)'}}>Your main job:</p>
          <p className="font-bold" style={{color: 'var(--text-dark)'}}>{diagnosis.yourRole}</p>
        </div>
        <div>
          <p className="font-semibold" style={{color: 'var(--text-light)'}}>What holds you back:</p>
          <ul className="list-disc list-inside space-y-1 mt-2" style={{color: 'var(--text-dark)'}}>
            {diagnosis.constraints.map((constraint, index) => <li key={index}>{constraint}</li>)}
          </ul>
        </div>
        <div>
          <p className="font-semibold" style={{color: 'var(--text-light)'}}>Your simple steps to grow:</p>
          <ul className="list-decimal list-inside space-y-1 mt-2 font-medium" style={{color: 'var(--text-dark)'}}>
            {diagnosis.actions.map((action, index) => <li key={index}>{action}</li>)}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default Step2Diagnosis;