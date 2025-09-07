
import React from 'react';
import Card from './common/Card';
import ProgressBar from './common/ProgressBar';

interface VideoOverviewProps {
  onGenerate: () => void;
  isLoading: boolean;
  status: string;
  progress: number;
}

const VideoOverview: React.FC<VideoOverviewProps> = ({ onGenerate, isLoading, status, progress }) => {
  return (
    <Card className="mt-12 text-center border-4 border-dashed" style={{borderColor: 'var(--accent-color)'}}>
      <h2 className="text-3xl font-black tracking-tight" style={{color: 'var(--text-dark)'}}>
        Create Your 60-Second Video Pitch
      </h2>
      <p className="mt-2 max-w-2xl mx-auto" style={{color: 'var(--text-light)'}}>
        Turn your business plan into a powerful, AI-generated video overview. Perfect for your website, social media, or investor pitches.
      </p>
      {isLoading ? (
        <div className="mt-8">
          <ProgressBar progress={progress} loadingText={status} />
        </div>
      ) : (
        <div className="mt-8">
          <button
            onClick={onGenerate}
            className="w-full max-w-md mx-auto text-white font-bold py-4 px-6 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105"
            style={{backgroundColor: 'var(--primary-color)'}}
          >
            🎬 Generate Your Video
          </button>
        </div>
      )}
    </Card>
  );
};

export default VideoOverview;
