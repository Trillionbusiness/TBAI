import React from 'react';
import { BusinessData, GeneratedOffer, GeneratedPlaybook, OfferStackItem } from '../../types';
import AllPdfs from './AllPdfs';

interface PdfPreviewModalProps {
  playbook: GeneratedPlaybook;
  businessData: BusinessData;
  type: string;
  assetBundle?: GeneratedOffer | null;
  singleAsset?: NonNullable<OfferStackItem['asset']> | null;
  onClose: () => void;
}

const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({ playbook, businessData, type, assetBundle, singleAsset, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-4xl h-[90vh] flex flex-col rounded-2xl shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 p-4 bg-gray-100 rounded-t-2xl flex justify-between items-center border-b">
             <h2 className="text-lg font-bold text-gray-800">Document Preview</h2>
             <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors z-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>
        
        <div className="flex-grow overflow-y-auto bg-gray-200 p-8">
            <div className="mx-auto" style={{width: '800px', transformOrigin: 'top center'}}>
                 <AllPdfs
                    playbook={playbook}
                    businessData={businessData}
                    type={type}
                    assetBundle={assetBundle}
                    singleAsset={singleAsset}
                 />
            </div>
        </div>
      </div>
    </div>
  );
};

export default PdfPreviewModal;