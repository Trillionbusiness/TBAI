
import React, { useState, useRef, useEffect } from 'react';
import CircularProgress from './CircularProgress';

type DropdownOption = 
  | { label: string; onClick: () => void; onPreview: (() => void) | null; special?: boolean; separator?: never; }
  | { separator: true; label?: never; onClick?: never; onPreview?: never; special?: never; };

interface DropdownButtonProps {
  label: string;
  options: DropdownOption[];
  isLoading?: boolean;
  progress: number;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ label, options, isLoading, progress }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  const handlePreviewClick = (onPreview: (() => void) | null) => {
    if (onPreview) {
        onPreview();
        setIsOpen(false);
    }
  };


  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={isLoading}
          className="inline-flex justify-center items-center w-full rounded-lg border border-gray-300 shadow-sm px-6 py-3 bg-white text-base font-bold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{minHeight: '52px', minWidth: '180px'}}
        >
          {isLoading ? <CircularProgress progress={progress} color="dark" /> : (
            <>
            {label}
            <svg className="-mr-1 ml-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            </>
          )}
        </button>
      </div>
      
      {isOpen && (
        <div 
          className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {/* FIX: Refactored the mapping logic to use a guard clause with an early return. This helps TypeScript's control flow analysis correctly narrow the `option` type, resolving errors where properties were not being recognized correctly. */}
            {options.map((option, index) => {
              if (option.separator) {
                return <div key={`sep-${index}`} className="border-t my-1 mx-2" style={{borderColor: 'var(--border-color)'}} />;
              }
              
              return (
                <div key={option.label} className={`flex justify-between items-center px-2 py-1 text-sm group ${option.special ? 'bg-yellow-50 hover:bg-yellow-100' : ''}`}>
                    <button
                        onClick={() => handleOptionClick(option.onClick)}
                        className={`w-full text-left block px-2 py-2 rounded-md transition-colors ${option.special ? 'font-bold text-yellow-900 hover:bg-yellow-100' : 'text-gray-700 hover:bg-gray-100'}`}
                        role="menuitem"
                    >
                        {option.label}
                    </button>
                    {option.onPreview && (
                          <button
                            onClick={() => handlePreviewClick(option.onPreview)}
                            className="ml-2 px-2 py-1 text-xs font-bold rounded capitalize bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
                          >
                              Preview
                          </button>
                    )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

export default DropdownButton;
