
import React, { useState, useEffect } from 'react';
import { GeneratedKpiDashboard, Kpi, KpiEntry, WeeklyDebrief } from '../types';
import Card from './common/Card';
import WeeklyDebriefCard from './WeeklyDebriefCard';

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-2xl font-black tracking-tight border-b-2 pb-2 mb-6" style={{color: 'var(--primary-color)', borderColor: 'var(--accent-color)'}}>{children}</h3>
);

interface KpiDashboardProps {
  kpiDashboard: GeneratedKpiDashboard;
  kpiEntries: KpiEntry[];
  weeklyDebriefs: WeeklyDebrief[];
  onSaveKpiEntry: (entry: KpiEntry) => void;
  onGenerateDebrief: () => void;
  isGeneratingDebrief: boolean;
}

const KpiDashboard: React.FC<KpiDashboardProps> = ({ kpiDashboard, kpiEntries, weeklyDebriefs, onSaveKpiEntry, onGenerateDebrief, isGeneratingDebrief }) => {
    const today = new Date().toISOString().split('T')[0];
    const [currentEntry, setCurrentEntry] = useState<KpiEntry>(() => {
        const existingEntry = kpiEntries.find(e => e.date === today);
        if (existingEntry) return existingEntry;

        const initialValues = (kpiDashboard?.kpis || []).reduce((acc, kpi) => {
            acc[kpi.name] = '';
            return acc;
        }, {} as Record<string, string>);
        
        return { date: today, values: initialValues };
    });

    useEffect(() => {
        const existingEntry = kpiEntries.find(e => e.date === today);
        if (existingEntry) {
            setCurrentEntry(existingEntry);
        } else {
             const initialValues = (kpiDashboard?.kpis || []).reduce((acc, kpi) => {
                acc[kpi.name] = '';
                return acc;
            }, {} as Record<string, string>);
            setCurrentEntry({ date: today, values: initialValues });
        }
    }, [today, kpiEntries, kpiDashboard?.kpis]);


    const handleValueChange = (kpiName: string, value: string) => {
        setCurrentEntry(prev => ({
            ...prev,
            values: {
                ...prev.values,
                [kpiName]: value,
            },
        }));
    };
    
    const handleSave = () => {
        onSaveKpiEntry(currentEntry);
        onGenerateDebrief();
    };
    
    const latestDebrief = weeklyDebriefs[0];

    if (!kpiDashboard || !kpiDashboard.kpis) {
        return null;
    }

    return (
        <Card>
            <SectionHeader>Your Living Scorecard</SectionHeader>
            <p className="-mt-4 mb-6" style={{color: 'var(--text-light)'}}>This is your business's heartbeat. Fill this out weekly to track your progress and get AI-powered advice.</p>
            
            <Card className="!bg-blue-50">
                <h4 className="text-xl font-bold mb-4" style={{color: 'var(--primary-color)'}}>This Week's Numbers ({today})</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {kpiDashboard.kpis.map(kpi => (
                        <div key={kpi.name}>
                            <label htmlFor={kpi.name} className="block text-sm font-medium" style={{color: 'var(--text-light)'}} title={kpi.description}>
                                {kpi.name}
                            </label>
                            <input
                                type="text"
                                id={kpi.name}
                                value={currentEntry.values[kpi.name] || ''}
                                onChange={(e) => handleValueChange(kpi.name, e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2"
                                style={{'--tw-ring-color': 'var(--primary-color)'} as React.CSSProperties}
                                placeholder={kpi.example}
                            />
                        </div>
                    ))}
                </div>
                 <button
                    onClick={handleSave}
                    disabled={isGeneratingDebrief}
                    className="mt-6 w-full flex items-center justify-center px-4 py-3 text-white font-bold rounded-md transition-colors disabled:opacity-50 disabled:cursor-wait"
                    style={{backgroundColor: 'var(--primary-color)'}}
                >
                    {isGeneratingDebrief ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing & Advising...
                        </>
                    ) : 'Save & Get AI Debrief'}
                </button>
            </Card>

            {latestDebrief && (
                <div className="mt-8">
                     <h4 className="text-xl font-bold mb-2" style={{color: 'var(--primary-color)'}}>Your Latest Debrief</h4>
                    <WeeklyDebriefCard debrief={latestDebrief} />
                </div>
            )}
        </Card>
    );
};

export default KpiDashboard;
