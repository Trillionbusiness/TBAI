
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
import PricingAndOfferGuidePdf from './guides/PricingAndOfferGuidePdf';
import ExecutionGuidePdf from './guides/ExecutionGuidePdf';
import LeadGenerationGuidePdf from './guides/LeadGenerationGuidePdf';
import LeverageGuidePdf from './guides/LeverageGuidePdf';
import RoadmapAndAdvancedGuidePdf from './guides/RoadmapAndAdvancedGuidePdf';
import MoneyModelsDeepDiveGuidePdf from './guides/MoneyModelsDeepDiveGuidePdf';
import ScalingRoadmapGuidePdf from './guides/ScalingRoadmapGuidePdf';

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
        // Core Docs
        case 'full': return <FullPlaybookPdf playbook={playbook} />;
        case 'zip-guide': return <ZipGuidePdf businessData={businessData} playbook={playbook} />;
        case 'money-models-guide': return <MoneyModelsGuidePdf />;
        case 'concepts-guide': return <ConceptsGuidePdf />;
        case 'kpi-dashboard': return <KpiDashboardPdf kpiDashboard={playbook.kpiDashboard} />;
        case 'landing-page': return <LandingPagePdf playbook={playbook} businessData={businessData} />;
        case 'offer-presentation': return <OfferPresentationPdf playbook={playbook} />;
        case 'downsell-pamphlet': return <DownsellPamphletPdf downsell={playbook.downsell} />;
        case 'tripwire-followup': return <TripwireFollowupPdf downsell={playbook.downsell} gso={playbook.offer1} />;
        case 'cfa-model': return <CfaModelPdf moneyModel={playbook.moneyModel} />;
        
        // --- Business University Guide Factories ---
        // FIX: Pass playbook and businessData props to all personalized guide components.

        // Pricing & Offer Factory
        case 'guide-pricing':
        case 'guide-enhancing-offer':
            return <PricingAndOfferGuidePdf playbook={playbook} businessData={businessData} type={type} />;

        // Execution Factory
        case 'guide-execution-100k':
            return <ExecutionGuidePdf playbook={playbook} businessData={businessData} type={type} />;

        // Lead Generation Factory
        case 'guide-lead-magnets':
        case 'guide-warm-outreach':
        case 'guide-content-marketing':
        case 'guide-cold-outreach':
        case 'guide-paid-ads':
        case 'guide-scaling-what-works':
            return <LeadGenerationGuidePdf playbook={playbook} businessData={businessData} type={type} />;

        // Leverage Factory
        case 'guide-referrals':
        case 'guide-employees':
        case 'guide-agencies':
        case 'guide-affiliates':
            return <LeverageGuidePdf playbook={playbook} businessData={businessData} type={type} />;

        // Advanced Strategy Factory
        case 'guide-in-person-ads':
        case 'guide-business-roadmap':
            return <RoadmapAndAdvancedGuidePdf playbook={playbook} businessData={businessData} type={type} />;
        
        // Money Models Factory
        case 'guide-money-models-intro':
        case 'guide-attraction-offers':
        case 'guide-upsell-offers':
        case 'guide-downsell-offers':
        case 'guide-continuity-offers':
            return <MoneyModelsDeepDiveGuidePdf playbook={playbook} businessData={businessData} type={type} />;
        
        // Scaling Factory
        case 'guide-scaling-stages':
            return <ScalingRoadmapGuidePdf playbook={playbook} businessData={businessData} type={type} />;
        
        default: return null;
    }
};

export default AllPdfs;
