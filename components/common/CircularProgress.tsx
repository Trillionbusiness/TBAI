import React from 'react';

interface CircularProgressProps {
  progress: number;
  color?: 'dark' | 'light';
}

const CircularProgress: React.FC<CircularProgressProps> = ({ progress, color = 'dark' }) => {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  
  const displayProgress = Math.round(progress);
  const textColor = color === 'light' ? 'text-white' : 'text-gray-900';
  const trackColor = color === 'light' ? 'text-gray-500' : 'text-gray-300';
  const progressColor = color === 'light' ? 'text-yellow-400' : 'text-yellow-500';


  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 40 40">
        <circle
          className={trackColor}
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="20"
          cy="20"
        />
        <circle
          className={`${progressColor} transition-all duration-300 ease-linear`}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="20"
          cy="20"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
      </svg>
      <span className={`absolute text-xs font-bold ${textColor}`}>
        {displayProgress}%
      </span>
    </div>
  );
};

export default CircularProgress;