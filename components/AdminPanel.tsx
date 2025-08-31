import React from 'react';
import { AppState } from '../types';

interface AdminPanelProps {
    isOpen: boolean;
    onClose: () => void;
    onLoadPlan: (plan: AppState) => void;
    plans: { name: string; description: string; data: AppState }[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, onLoadPlan, plans }) => {
    return (
        <>
            <div 
                className={`fixed inset-0 bg-black/60 z-30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>
            <div 
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-6 border-b">
                        <h2 className="text-2xl font-bold text-gray-800">Prebuilt Plans</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-grow overflow-y-auto p-6 space-y-4">
                        {plans.map((plan, index) => (
                            <div key={index} className="p-4 border rounded-lg hover:shadow-md hover:border-yellow-400 transition-all">
                                <h3 className="font-bold text-lg text-gray-900">{plan.name}</h3>
                                <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                                <button 
                                    onClick={() => onLoadPlan(plan.data)}
                                    className="mt-3 px-4 py-2 bg-yellow-400 text-yellow-900 font-semibold rounded-md hover:bg-yellow-500 transition-colors text-sm"
                                >
                                    Load Plan
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminPanel;
