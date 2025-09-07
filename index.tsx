
import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import JSZip from 'jszip';
import { BusinessData, GeneratedPlaybook, OfferStackItem, GeneratedOffer, PreviewConfig, AppState, KpiEntry, WeeklyDebrief } from './types';
import { 
    generateDiagnosis, generateMoneyModelAnalysis, generateMoneyModel, 
    generateMoneyModelMechanisms, generateOperationsPlan, generateOffer1, 
    generateOffer2, generateDownsell, generateProfitPath, 
    generateMarketingModel, generateSalesFunnel, generateKpiDashboard,
    generateSalesSystem, generateWeeklyDebrief,
    generateVideoOverviewScript, generateAndPollVideo
} from './services/hormoziAiService';
import Step1Form from './components/Step1Form';
import ProgressBar from './components/common/ProgressBar';
import FullPlaybook from './components/FullPlaybook';
import DropdownButton from './components/common/DropdownButton';
import AllPdfs from './components/pdf/AllPdfs';
import PdfPreviewModal from './components/pdf/PdfPreviewModal';
import FullPlaybookHtml from './components/html/FullPlaybookHtml';
import VideoPlayerModal from './components/VideoPlayerModal';


declare global {
  interface Window {
    jspdf: any;
    html2canvas: any;
  }
}

const APP_STATE_KEY = 'trillionBusinessAppState';

const sanitizeName = (name: string) => name.replace(/[\\/:*?"<>|]/g, '').replace(/ /g, '_');

const createPdfInfoQueue = (playbook: GeneratedPlaybook, businessData: BusinessData) => {
    const queue: {type: string, path: string, asset?: any, offer?: any}[] = [];

    queue.push({ type: 'zip-guide', path: '00_START_HERE_Guide.pdf' });
    queue.push({ type: 'full', path: '01_Core_Plan/Full_Business_Playbook.pdf' });
    queue.push({ type: 'concepts-guide', path: '01_Core_Plan/Business_Concepts_Guide.pdf' });
    queue.push({ type: 'kpi-dashboard', path: '01_Core_Plan/Business_Scorecard_(KPIs).pdf' });
    queue.push({ type: 'offer-presentation', path: '01_Core_Plan/Offer_Presentation_Slides.pdf' });
    queue.push({ type: 'cfa-model', path: '02_Money_Models/Your_Money_Making_Plan.pdf' });
    queue.push({ type: 'landing-page', path: '03_Marketing_Materials/High-Converting_Landing_Page.pdf' });
    queue.push({ type: 'downsell-pamphlet', path: '03_Marketing_Materials/Simple_Offer_Flyer.pdf' });
    queue.push({ type: 'tripwire-followup', path: '03_Marketing_Materials/Customer_Follow-Up_Note.pdf' });

    const addOfferAssetsToQueue = (offer: GeneratedOffer, folder: string) => {
        queue.push({ type: 'asset-bundle', path: `${folder}/00_Full_Asset_Bundle.pdf`, offer: offer });
        offer.stack.forEach(item => {
            if (item.asset) {
                queue.push({ type: 'single-asset', path: `${folder}/${sanitizeName(item.asset.type)}_${sanitizeName(item.asset.name)}.pdf`, asset: item.asset });
            }
        });
    };

    addOfferAssetsToQueue(playbook.offer1, `04_Asset_Library/${sanitizeName(playbook.offer1.name)}`);
    addOfferAssetsToQueue(playbook.offer2, `04_Asset_Library/${sanitizeName(playbook.offer2.name)}`);
    addOfferAssetsToQueue(playbook.downsell.offer, `04_Asset_Library/${sanitizeName(playbook.downsell.offer.name)}`);
    
    return queue;
};


const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(() => {
    try {
      const savedState = localStorage.getItem(APP_STATE_KEY);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.playbook && parsed.businessData) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
    }
    return {
      playbook: null,
      businessData: null,
      kpiEntries: [],
      weeklyDebriefs: []
    };
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Starting...');

  const [pdfProgress, setPdfProgress] = useState(0);
  const [zipProgress, setZipProgress] = useState(0);

  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  
  const [pdfConfig, setPdfConfig] = useState<any>(null);
  
  const [error, setError] = useState<string | null>(null);
  const [generatingAsset, setGeneratingAsset] = useState<OfferStackItem | null>(null);
  const [generatingAssetBundleFor, setGeneratingAssetBundleFor] = useState<string | null>(null);

  const [previewConfig, setPreviewConfig] = useState<PreviewConfig | null>(null);
  const [isGeneratingOfflineApp, setIsGeneratingOfflineApp] = useState(false);
  const [isGeneratingDebrief, setIsGeneratingDebrief] = useState(false);
  
  const [pdfInfoQueue, setPdfInfoQueue] = useState<any[]>([]);
  const [currentPdfIndex, setCurrentPdfIndex] = useState(0);
  const zipRef = useRef<JSZip | null>(null);

  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoGenerationProgress, setVideoGenerationProgress] = useState(0);
  const [videoGenerationStatus, setVideoGenerationStatus] = useState('');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);

  const pdfSingleRenderRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    try {
        localStorage.setItem(APP_STATE_KEY, JSON.stringify(appState));
    } catch (error) {
        console.error("Failed to save state to localStorage", error);
    }
  }, [appState]);
  
  const handleStartNewPlan = () => {
    if (window.confirm("Are you sure you want to start a new plan? Your current progress will be deleted.")) {
        localStorage.removeItem(APP_STATE_KEY);
        setAppState({ playbook: null, businessData: null, kpiEntries: [], weeklyDebriefs: [] });
    }
  };

  const handleFormSubmit = useCallback(async (data: BusinessData) => {
    setIsLoading(true);
    setError(null);

    setAppState({
        playbook: null,
        businessData: data,
        kpiEntries: [],
        weeklyDebriefs: [],
    });
    
    const totalSteps = 13;
    let completedSteps = 0;

    const updateProgress = (taskName: string) => {
      completedSteps++;
      setLoadingText(taskName);
      setLoadingProgress((completedSteps / totalSteps) * 100);
    };

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      updateProgress('Diagnosing your business...');
      const diagnosis = await generateDiagnosis(data);
      await delay(1500);
      
      updateProgress('Analyzing your money model...');
      const moneyModelAnalysis = await generateMoneyModelAnalysis(data);
      await delay(1500);
      
      updateProgress('Designing your new money model...');
      const moneyModel = await generateMoneyModel(data);
      await delay(1500);
      
      updateProgress('Building your monetization toolkit...');
      const moneyModelMechanisms = await generateMoneyModelMechanisms(data);
      await delay(1500);
      
      updateProgress('Crafting your operations plan...');
      const operationsPlan = await generateOperationsPlan(data);
      await delay(1500);
      
      updateProgress('Creating your first Grand Slam Offer...');
      const offer1 = await generateOffer1(data);
      await delay(1500);
      
      updateProgress('Creating a second offer option...');
      const offer2 = await generateOffer2(data);
      await delay(1500);
      
      updateProgress('Building your Profit Path...');
      const profitPath = await generateProfitPath(data);
      await delay(1500);
      
      updateProgress('Designing your "Hello" Offer...');
      const downsell = await generateDownsell(data);
      await delay(1500);
      
      updateProgress('Mapping your marketing model...');
      const marketingModel = await generateMarketingModel(data);
      await delay(1500);
      
      updateProgress('Constructing your sales funnel...');
      const salesFunnel = await generateSalesFunnel(data);
      await delay(1500);

      updateProgress('Building your Persuasion Engine...');
      const salesSystem = await generateSalesSystem(data);
      await delay(1500);
      
      updateProgress('Finalizing your KPI dashboard...');
      const kpiDashboard = await generateKpiDashboard(data);

      const newPlaybook = {
        diagnosis,
        moneyModelAnalysis,
        moneyModel,
        moneyModelMechanisms,
        operationsPlan,
        offer1,
        offer2,
        profitPath,
        downsell,
        marketingModel,
        salesFunnel,
        kpiDashboard,
        salesSystem,
      };

      setAppState(prev => ({...prev, playbook: newPlaybook}));

    } catch (err) {
      console.error(err);
      let errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      if (errorMessage.includes('429') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
          errorMessage = 'The AI is a bit overwhelmed right now. Please wait a moment and try again. This can happen during peak usage.';
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handlePreviewPdf = (config: PreviewConfig) => {
    setPreviewConfig(config);
  };
  
  const handleDownloadOfflineApp = async () => {
    if (!appState.playbook) return;
    setIsGeneratingOfflineApp(true);
    
    try {
        const { renderToStaticMarkup } = await import('react-dom/server');
        const staticHtml = renderToStaticMarkup(<FullPlaybookHtml playbook={appState.playbook} />);
        
        const fullHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Trillion Business Plan - Offline Interactive Plan</title><script src="https://cdn.tailwindcss.com"></script><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');:root {--bg-light: #ffffff; --bg-muted: #f8f9fa; --text-dark: #212121; --text-light: #5f5f5f;--border-color: #dee2e6; --primary-color: #147273; --accent-color: #82D5E3;}body { margin: 0; background-color: var(--bg-muted); color: var(--text-dark); font-family: 'Inter', sans-serif; }.playbook-step-content { transition: max-height 0.7s ease-in-out, opacity 0.7s ease-in-out; }.strategy-content { transition: max-height 0.3s ease-in-out; }.strategy-toggle-icon { transition: transform 0.3s; }</style></head><body class="p-4 md:p-8"><div class="max-w-7xl mx-auto">${staticHtml}</div><script>document.addEventListener('DOMContentLoaded', () => {document.querySelectorAll('.playbook-step button').forEach(button => {button.addEventListener('click', () => {const content = button.nextElementSibling; const icon = button.querySelector('.playbook-step-toggle-icon'); if (content.style.maxHeight && content.style.maxHeight !== '0px') {content.style.maxHeight = '0px'; content.style.opacity = '0'; icon.style.transform = '';} else {content.style.maxHeight = content.scrollHeight + 'px'; content.style.opacity = '1'; icon.style.transform = 'rotate(180deg)';}});});document.querySelectorAll('.strategy-accordion button').forEach(button => {button.addEventListener('click', () => {const content = button.nextElementSibling; const icon = button.querySelector('.strategy-toggle-icon'); if (content.style.maxHeight && content.style.maxHeight !== '0px') {content.style.maxHeight = '0px'; icon.style.transform = '';} else {content.style.maxHeight = content.scrollHeight + 'px'; icon.style.transform = 'rotate(180deg)';}});});});<\/script></body></html>`;

        const blob = new Blob([fullHtml], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Trillion_Business_Interactive_Plan.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (e) {
        console.error("Error generating offline app", e);
        setError("Could not generate the interactive offline plan.");
    } finally {
        setIsGeneratingOfflineApp(false);
    }
  };
  
  const getCanvasOptions = (element: HTMLElement) => ({
      scale: 1.5,
      useCORS: true,
      allowTaint: true,
      width: element.scrollWidth,
      height: element.scrollHeight,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
  });

  const generateSinglePdf = async (element: HTMLElement, fileName: string) => {
      const canvas = await window.html2canvas(element, getCanvasOptions(element));
      setPdfProgress(50);
      const imgData = canvas.toDataURL('image/jpeg', 0.9);
      const pdf = new window.jspdf.jsPDF({
          orientation: 'p',
          unit: 'px',
          format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height, undefined, 'FAST');
      setPdfProgress(80);
      pdf.save(fileName);
      setPdfProgress(100);
  };

  const handleDownloadPdf = (type: string, asset?: OfferStackItem, offer?: GeneratedOffer) => {
    if (isGeneratingPdf || isZipping) return;
    setIsGeneratingPdf(true);
    setPdfProgress(0);
    if (asset) setGeneratingAsset(asset);
    if (offer && type === 'asset-bundle') setGeneratingAssetBundleFor(offer.name);
    setPdfConfig({ type, singleAsset: asset?.asset, assetBundle: offer });
  };
  
  useEffect(() => {
    if (pdfConfig && !isZipping && pdfSingleRenderRef.current) {
        const generate = async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
            const element = pdfSingleRenderRef.current?.children[0] as HTMLElement;
            if (element) {
                try {
                    let fileName = 'Trillion_Business_Plan.pdf';
                    if (pdfConfig.type === 'single-asset' && pdfConfig.singleAsset) {
                        fileName = `${pdfConfig.singleAsset.name}.pdf`;
                    } else if (pdfConfig.type === 'asset-bundle' && pdfConfig.assetBundle) {
                        fileName = `${pdfConfig.assetBundle.name}_Asset_Bundle.pdf`;
                    } else {
                        fileName = `${pdfConfig.type.replace('-', '_')}.pdf`;
                    }
                    await generateSinglePdf(element, fileName);
                } catch(e) {
                    console.error("PDF generation failed", e);
                    setError("Sorry, there was an error creating your PDF.");
                }
            }
            setIsGeneratingPdf(false);
            setPdfConfig(null);
            setGeneratingAsset(null);
            setGeneratingAssetBundleFor(null);
        };
        generate();
    }
  }, [pdfConfig, isZipping]);

  const handleDownloadZip = () => {
    if (!appState.playbook || !appState.businessData || isZipping || isGeneratingPdf) return;
    
    const queue = createPdfInfoQueue(appState.playbook, appState.businessData);
    setPdfInfoQueue(queue);
    setCurrentPdfIndex(0);
    setIsZipping(true);
    setZipProgress(0);
  };

  useEffect(() => {
    if (!isZipping) return;

    const processQueue = async () => {
        if (!zipRef.current) { // Initialize on first run
            zipRef.current = new JSZip();
        }

        if (currentPdfIndex >= pdfInfoQueue.length) {
            // Finished
            const content = await zipRef.current.generateAsync({ type: 'blob' }, (metadata) => {
                setZipProgress(95 + (metadata.percent * 0.05));
            });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = 'Trillion_Business_Plan_Kit.zip';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // cleanup
            setIsZipping(false);
            setPdfInfoQueue([]);
            setCurrentPdfIndex(0);
            zipRef.current = null;
            setPdfConfig(null);
            return;
        }
        
        // Set config for the current PDF in queue
        const currentPdfInfo = pdfInfoQueue[currentPdfIndex];
        setPdfConfig({
            type: currentPdfInfo.type,
            singleAsset: currentPdfInfo.asset,
            assetBundle: currentPdfInfo.offer,
        });

        // Wait for render
        await new Promise(resolve => setTimeout(resolve, 200)); 

        if (!pdfSingleRenderRef.current) {
            setCurrentPdfIndex(idx => idx + 1); // skip
            return;
        }
        const element = pdfSingleRenderRef.current.children[0] as HTMLElement;
        
        if (element) {
            try {
                const canvas = await window.html2canvas(element, getCanvasOptions(element));
                const imgData = canvas.toDataURL('image/jpeg', 0.9);
                const pdf = new window.jspdf.jsPDF({
                    orientation: 'p',
                    unit: 'px',
                    format: [canvas.width, canvas.height]
                });
                pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height, undefined, 'FAST');
                const pdfBlob = pdf.output('blob');
                zipRef.current.file(currentPdfInfo.path, pdfBlob);
            } catch (e) {
                 console.error("Error generating PDF for path:", currentPdfInfo.path, e);
                 setError(`Failed to generate ${currentPdfInfo.path}`);
            }
        }
        
        setZipProgress(((currentPdfIndex + 1) / pdfInfoQueue.length) * 95);

        // Move to next item
        setCurrentPdfIndex(idx => idx + 1);
    };
    
    processQueue();

  }, [isZipping, currentPdfIndex, pdfInfoQueue]);

  const handleSaveKpiEntry = (entry: KpiEntry) => {
    setAppState(prev => {
        const existingIndex = prev.kpiEntries.findIndex(e => e.date === entry.date);
        const newEntries = [...prev.kpiEntries];
        if (existingIndex > -1) {
            newEntries[existingIndex] = entry;
        } else {
            newEntries.push(entry);
        }
        newEntries.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return {...prev, kpiEntries: newEntries };
    });
  };

  const handleGenerateDebrief = async () => {
    if (!appState.businessData || !appState.playbook || isGeneratingDebrief) return;
    setIsGeneratingDebrief(true);
    setError(null);
    try {
        const debriefData = await generateWeeklyDebrief(appState.businessData, appState.playbook, appState.kpiEntries);
        const newDebrief: WeeklyDebrief = {
            ...debriefData,
            date: new Date().toISOString().split('T')[0],
        };
        setAppState(prev => {
            const newDebriefs = [newDebrief, ...prev.weeklyDebriefs];
            return {...prev, weeklyDebriefs: newDebriefs};
        });
    } catch (err) {
        console.error("Failed to generate weekly debrief:", err);
        setError(err instanceof Error ? err.message : "Could not generate AI debrief.");
    } finally {
        setIsGeneratingDebrief(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!appState.playbook || !appState.businessData || isGeneratingVideo) return;
    
    setIsGeneratingVideo(true);
    setError(null);
    setVideoGenerationProgress(0);
    setVideoGenerationStatus("Generating persuasive video script...");

    try {
        const script = await generateVideoOverviewScript(appState.playbook, appState.businessData);
        setVideoGenerationProgress(5);
        setVideoGenerationStatus("Script generated. Initializing video synthesis...");
        
        const videoUrl = await generateAndPollVideo(script, (status, progress) => {
            setVideoGenerationStatus(status);
            setVideoGenerationProgress(progress);
        });
        
        setGeneratedVideoUrl(videoUrl);

    } catch(err) {
        console.error("Failed to generate video:", err);
        setError(err instanceof Error ? err.message : "Could not generate the AI video overview.");
    } finally {
        setIsGeneratingVideo(false);
    }
  };


  if (!appState.playbook) {
    return (
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {isLoading ? 
            <ProgressBar progress={loadingProgress} loadingText={loadingText} /> :
            <Step1Form onSubmit={handleFormSubmit} />
          }
          {error && <div className="mt-4 text-red-500 text-center p-4 bg-red-100 rounded-lg">{error}</div>}
        </div>
      </div>
    );
  }

  const anyLoading = isGeneratingPdf || isZipping || isGeneratingVideo;
  const currentProgress = isZipping ? zipProgress : (isGeneratingPdf ? pdfProgress : videoGenerationProgress);

  return (
    <div className="min-h-screen">
       <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <h1 className="text-2xl font-bold" style={{color: 'var(--primary-color)'}}>Trillion Business Plan</h1>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                  <button
                    onClick={handleStartNewPlan}
                    className="px-4 py-2 bg-gray-200 font-semibold rounded-md hover:bg-gray-300 transition-colors text-sm"
                    style={{color: 'var(--primary-color)', backgroundColor: 'rgba(20, 114, 115, 0.1)'}}
                  >
                    Start New Plan
                  </button>
                  <DropdownButton 
                      label="Download Options" 
                      isLoading={anyLoading}
                      progress={currentProgress}
                      options={[
                          { label: 'Generate Video Overview', onClick: handleGenerateVideo, onPreview: null, special: true },
                          { separator: true },
                          { label: 'Full Playbook (PDF)', onClick: () => handleDownloadPdf('full'), onPreview: () => handlePreviewPdf({type: 'full'}) },
                          { label: 'Business Scorecard (KPIs)', onClick: () => handleDownloadPdf('kpi-dashboard'), onPreview: () => handlePreviewPdf({type: 'kpi-dashboard'}) },
                          { label: 'Offer Presentation Slides', onClick: () => handleDownloadPdf('offer-presentation'), onPreview: () => handlePreviewPdf({type: 'offer-presentation'}) },
                          { label: 'Money Model Plan', onClick: () => handleDownloadPdf('cfa-model'), onPreview: () => handlePreviewPdf({type: 'cfa-model'}) },
                          { separator: true },
                          { label: 'Offline Interactive Plan (HTML)', onClick: handleDownloadOfflineApp, onPreview: null },
                          { separator: true },
                          { label: 'Buy Complete Plan Kit ($99 .zip)', onClick: handleDownloadZip, onPreview: null, special: true },
                      ]}
                  />
              </div>
          </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {error && <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg mb-4">{error}</div>}
        <FullPlaybook 
            playbook={appState.playbook}
            onDownloadAsset={(asset) => handleDownloadPdf('single-asset', asset)}
            onPreviewAsset={(asset) => handlePreviewPdf({type: 'single-asset', asset: asset.asset})}
            onPreviewPdf={handlePreviewPdf}
            isAnyPdfGenerating={anyLoading}
            generatingAsset={generatingAsset}
            onDownloadAllAssets={(offer) => handleDownloadPdf('asset-bundle', undefined, offer)}
            generatingAssetBundleFor={generatingAssetBundleFor}
            pdfProgress={pdfProgress}
            kpiEntries={appState.kpiEntries}
            weeklyDebriefs={appState.weeklyDebriefs}
            onSaveKpiEntry={handleSaveKpiEntry}
            onGenerateDebrief={handleGenerateDebrief}
            isGeneratingDebrief={isGeneratingDebrief}
            onDownloadZip={handleDownloadZip}
            isZipping={isZipping}
            zipProgress={zipProgress}
            onGenerateVideo={handleGenerateVideo}
            isGeneratingVideo={isGeneratingVideo}
            videoGenerationStatus={videoGenerationStatus}
            videoGenerationProgress={videoGenerationProgress}
          />
      </main>
      
      {previewConfig && appState.playbook && appState.businessData && (
          <PdfPreviewModal
              playbook={appState.playbook}
              businessData={appState.businessData}
              type={previewConfig.type}
              singleAsset={previewConfig.asset}
              assetBundle={previewConfig.offer}
              onClose={() => setPreviewConfig(null)}
          />
      )}
      
      {generatedVideoUrl && (
          <VideoPlayerModal 
            videoUrl={generatedVideoUrl}
            onClose={() => setGeneratedVideoUrl(null)}
          />
      )}

      {/* Off-screen container for rendering PDFs */}
      <div style={{ position: 'absolute', top: '200vh', left: 0, zIndex: -100, opacity: 1, width: '800px' }}>
          <div ref={pdfSingleRenderRef}>
              {pdfConfig && appState.playbook && appState.businessData && (
                  <div data-pdf-output-single>
                      <AllPdfs playbook={appState.playbook} businessData={appState.businessData} type={pdfConfig.type} singleAsset={pdfConfig.singleAsset} assetBundle={pdfConfig.assetBundle} />
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
    <App />
);
