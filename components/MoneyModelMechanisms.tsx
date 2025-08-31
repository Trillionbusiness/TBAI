

import React from 'react';
import { GeneratedMoneyModelMechanisms, MoneyModelMechanism } from '../types';
import Card from './common/Card';

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-2xl font-black tracking-tight border-b-2 pb-2 mb-6" style={{color: 'var(--primary-color)', borderColor: 'var(--accent-color)'}}>{children}</h3>
);

const MechanismCard: React.FC<{ mechanism: MoneyModelMechanism }> = ({ mechanism }) => {
    const typeStyles = {
        Attraction: {
            borderColor: 'border-yellow-400',
            bgColor: 'bg-yellow-50',
            textColor: 'text-yellow-700',
            icon: '👋'
        },
        Upsell: {
            borderColor: 'border-green-400',
            bgColor: 'bg-green-50',
            textColor: 'text-green-700',
            icon: '💰'
        },
        Downsell: {
            borderColor: 'border-blue-400',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-700',
            icon: '🤝'
        },
        Continuity: {
            borderColor: 'border-purple-400',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-700',
            icon: '🔄'
        },
    };

    const styles = typeStyles[mechanism.mechanismType];

    return (
        <Card className={`${styles.bgColor} border-t-4 ${styles.borderColor}`}>
            <div className="flex items-start gap-4">
                <span className="text-3xl">{styles.icon}</span>
                <div>
                    <p className={`font-bold uppercase tracking-wider text-sm ${styles.textColor}`}>{mechanism.mechanismType} Offer</p>
                    <h4 className="text-xl font-bold" style={{color: 'var(--text-dark)'}}>{mechanism.tacticName}</h4>
                </div>
            </div>
            
            <div className="mt-4 pl-12 space-y-4">
                <div>
                    <p className="font-semibold" style={{color: 'var(--text-light)'}}>Your Strategy:</p>
                    <p className="text-sm" style={{color: 'var(--text-dark)'}}>{mechanism.strategy}</p>
                </div>
                 <div>
                    <p className="font-semibold" style={{color: 'var(--text-light)'}}>Example Offer:</p>
                    <p className="text-sm italic p-3 rounded-md mt-1" style={{backgroundColor: 'var(--bg-light)', color: 'var(--text-dark)'}}>"{mechanism.example}"</p>
                </div>
                 <div>
                    <p className="font-semibold" style={{color: 'var(--text-light)'}}>How to Do It:</p>
                    <p className="text-sm whitespace-pre-wrap" style={{color: 'var(--text-dark)'}}>{mechanism.implementationNotes}</p>
                </div>
            </div>
        </Card>
    );
};


const MoneyModelMechanisms: React.FC<{ moneyModelMechanisms: GeneratedMoneyModelMechanisms }> = ({ moneyModelMechanisms }) => {
  if (!moneyModelMechanisms || !moneyModelMechanisms.mechanisms) {
    return null;
  }

  return (
    <Card>
      <SectionHeader>{moneyModelMechanisms.title}</SectionHeader>
      <div className="text-center mb-8 p-4 rounded-lg border" style={{backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-color)'}}>
        <p className="text-lg font-bold" style={{color: 'var(--primary-color)'}}>The Big Idea</p>
        <p className="italic" style={{color: 'var(--text-light)'}}>"{moneyModelMechanisms.corePrinciple}"</p>
      </div>
      <div className="space-y-6">
        {moneyModelMechanisms.mechanisms.map((mechanism, index) => (
            <MechanismCard key={index} mechanism={mechanism} />
        ))}
      </div>
    </Card>
  );
};

export default MoneyModelMechanisms;
