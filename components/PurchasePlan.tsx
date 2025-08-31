
import React from 'react';
import Card from './common/Card';
import CircularProgress from './common/CircularProgress';

interface PurchasePlanProps {
    onDownloadZip: () => void;
    isZipping: boolean;
    zipProgress: number;
}

const PurchasePlan: React.FC<PurchasePlanProps> = ({ onDownloadZip, isZipping, zipProgress }) => {
    return (
        <Card className="mt-12 text-center border-4 border-dashed" style={{borderColor: 'var(--primary-color)'}}>
            <h2 className="text-3xl font-black tracking-tight" style={{color: 'var(--text-dark)'}}>Your Plan is Ready. Own It.</h2>
            <p className="mt-2 max-w-2xl mx-auto" style={{color: 'var(--text-light)'}}>
                You've done the work. Now, get the complete, organized kit of all 20+ documents and assets. This is your roadmap to a thriving business, ready to share with partners, investors, or your team.
            </p>
            <div className="mt-8">
                <button
                    onClick={onDownloadZip}
                    disabled={isZipping}
                    className="w-full max-w-md mx-auto text-white font-bold py-4 px-6 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center disabled:opacity-70 disabled:scale-100 disabled:cursor-wait"
                    style={{backgroundColor: 'var(--primary-color)', '--tw-ring-color': 'var(--primary-color)', '--tw-ring-offset-color': 'var(--bg-light)'} as React.CSSProperties}

                >
                    {isZipping ? (
                        <>
                            <CircularProgress progress={zipProgress} color="light" />
                            <span className="ml-3">Zipping Your Files...</span>
                        </>
                    ) : (
                        <span>Buy Your Complete Plan Kit - $99</span>
                    )}
                </button>
            </div>
            <p className="text-xs mt-3" style={{color: 'var(--text-light)'}}>You'll get a single ZIP file with all your PDFs neatly organized.</p>
        </Card>
    );
};

export default PurchasePlan;