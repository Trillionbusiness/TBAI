
import React from 'react';
import { WeeklyDebrief } from '../types';
import MarkdownRenderer from './common/MarkdownRenderer';

interface WeeklyDebriefCardProps {
    debrief: WeeklyDebrief;
}

const WeeklyDebriefCard: React.FC<WeeklyDebriefCardProps> = ({ debrief }) => {
    return (
        <div className="p-4 rounded-lg border-l-4 border-yellow-400 mt-4" style={{backgroundColor: 'var(--bg-muted)'}}>
            <div className="flex justify-between items-center">
                 <h5 className="text-lg font-bold" style={{color: 'var(--primary-color)'}}>Your AI Weekly Debrief</h5>
                 <span className="text-xs font-mono" style={{color: 'var(--text-light)'}}>{debrief.date}</span>
            </div>
            
            <div className="mt-4 p-3 rounded-lg" style={{backgroundColor: 'var(--bg-light)', border: '1px solid var(--border-color)'}}>
                 <MarkdownRenderer content={debrief.summary} />
            </div>

            <div className="mt-4 p-4 rounded-lg bg-green-50 border-2 border-dashed border-green-300 text-center">
                 <p className="text-sm font-bold uppercase tracking-wider text-green-700">Your #1 Focus for This Week</p>
                 <p className="text-xl font-bold mt-1 text-green-800">{debrief.focus}</p>
            </div>
        </div>
    );
};

export default WeeklyDebriefCard;