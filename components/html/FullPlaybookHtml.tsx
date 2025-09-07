
import React from 'react';
import { GeneratedPlaybook } from '../../types';
import FullPlaybook from '../FullPlaybook';

interface FullPlaybookHtmlProps {
  playbook: GeneratedPlaybook;
}

const FullPlaybookHtml: React.FC<FullPlaybookHtmlProps> = ({ playbook }) => {
  const emptyFunc = () => {};
  
  return (
    <FullPlaybook
      playbook={playbook}
      isStatic={true}
      // Provide dummy props for functions not used in static mode
      onDownloadAsset={emptyFunc}
      onPreviewAsset={emptyFunc}
      onPreviewPdf={emptyFunc}
      isAnyPdfGenerating={false}
      generatingAsset={null}
      onDownloadAllAssets={emptyFunc}
      generatingAssetBundleFor={null}
      pdfProgress={0}
      onDownloadZip={emptyFunc}
      isZipping={false}
      zipProgress={0}
      kpiEntries={[]}
      weeklyDebriefs={[]}
      onSaveKpiEntry={emptyFunc}
      onGenerateDebrief={emptyFunc}
      isGeneratingDebrief={false}
      // FIX: Add missing props required by the updated FullPlaybook component for static rendering.
      onGenerateVideo={emptyFunc}
      isGeneratingVideo={false}
      videoGenerationStatus={""}
      videoGenerationProgress={0}
    />
  );
};

export default FullPlaybookHtml;
