
import React, { useState, useEffect } from 'react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  error: string | null;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onSubmit, error }) => {
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPassword('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 text-center">Admin Access</h2>
            <p className="text-sm text-gray-600 text-center mt-1">Enter the password to view pre-built plans.</p>
            
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password..."
                        className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:ring-2"
                        style={{'--tw-ring-color': 'var(--primary-color)'} as React.CSSProperties}
                        autoFocus
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-600 text-center">{error}</p>
                )}

                <button
                    type="submit"
                    className="w-full text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-colors"
                    style={{backgroundColor: 'var(--primary-color)'}}
                >
                    Unlock Plans
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
