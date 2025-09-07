

import React from 'react';
import { GeneratedPlaybook, OfferStackItem, GeneratedOffer, BusinessData } from '../../types';
import FullPlaybookPdf from './FullPlaybookPdf';
import KpiDashboardPdf from './KpiDashboardPdf';
import OfferPresentationPdf from './OfferPresentationPdf';
import DownsellPamphletPdf from './DownsellPamphletPdf';
import TripwireFollowupPdf from './TripwireFollowupPdf';
import CfaModelPdf from './CfaModelPdf';
import ValueStackAssetsPdf from './ValueStackAssetsPdf';
import AssetPdf from './AssetPdf';
import LandingPagePdf from './LandingPagePdf';
import ZipGuidePdf from './ZipGuidePdf';
import ConceptsGuidePdf from './ConceptsGuidePdf';
import MoneyModelsGuidePdf from './MoneyModelsGuidePdf';

interface AllPdfsProps {
    playbook: GeneratedPlaybook;
    businessData: BusinessData;
    type: string | null;
    assetBundle?: GeneratedOffer | null;
    singleAsset?: NonNullable<OfferStackItem['asset']> | null;
}

const AllPdfs: React.FC<AllPdfsProps> = ({ playbook, businessData, type, assetBundle, singleAsset }) => {
    
    if (type === 'asset-bundle' && assetBundle) {
        return <ValueStackAssetsPdf offer={assetBundle} />;
    }
    if (type === 'single-asset' && singleAsset) {
        return <AssetPdf asset={singleAsset} />;
    }

    switch (type) {
        case 'full': return <FullPlaybookPdf playbook={playbook} />;
        case 'zip-guide': return <ZipGuidePdf businessData={businessData} playbook={playbook} />;
        case 'money-models-guide': return <MoneyModelsGuidePdf />;
        // FIX: The ConceptsGuidePdf component is static and does not accept props.
        case 'concepts-guide': return <ConceptsGuidePdf />;
        case 'kpi-dashboard': return <KpiDashboardPdf kpiDashboard={playbook.kpiDashboard} />;
        case 'landing-page': return <LandingPagePdf playbook={playbook} businessData={businessData} />;
        case 'offer-presentation': return <OfferPresentationPdf playbook={playbook} />;
        case 'downsell-pamphlet': return <DownsellPamphletPdf downsell={playbook.downsell} />;
        case 'tripwire-followup': return <TripwireFollowupPdf downsell={playbook.downsell} gso={playbook.offer1} />;
        case 'cfa-model': return <CfaModelPdf moneyModel={playbook.moneyModel} />;
        default: return null;
    }
};

export default AllPdfs;