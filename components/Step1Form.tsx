
import React, { useState } from 'react';
import { BusinessData } from '../types';
import Card from './common/Card';
import { businessExamples } from '../data/businessExamples';
import { autofillBusinessData, generateFieldSuggestion } from '../services/hormoziAiService';

interface Step1FormProps {
  onSubmit: (data: BusinessData) => void;
}

const currencies = [
  { code: 'USD', name: 'USD - US Dollar' },
  { code: 'EUR', name: 'EUR - Euro' },
  { code: 'JPY', name: 'JPY - Japanese Yen' },
  { code: 'GBP', name: 'GBP - British Pound' },
  { code: 'AUD', name: 'AUD - Australian Dollar' },
  { code: 'CAD', name: 'CAD - Canadian Dollar' },
  { code: 'CHF', name: 'CHF - Swiss Franc' },
  { code: 'CNY', name: 'CNY - Chinese Yuan' },
  { code: 'INR', name: 'INR - Indian Rupee' },
  { code: 'BRL', name: 'BRL - Brazilian Real' },
  { code: 'ZAR', name: 'ZAR - South African Rand'},
  { code: 'SGD', name: 'SGD - Singapore Dollar'},
  { code: 'AED', name: 'AED - UAE Dirham' },
];

const countries = [
  "United States", "United Kingdom", "United Arab Emirates", "Canada", "Australia", "Germany", "France", "Japan", "China", "India", "Brazil", "South Africa", "Singapore", "Other"
];

const businessCategories = [
    "All Categories",
    "Local Business",
    "Service Business",
    "Agency / Consulting",
    "SaaS / Digital Product",
    "App",
    "E-commerce",
];


const InputField: React.FC<{
    id: keyof BusinessData,
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    type?: string,
    required?: boolean,
    onAutofill?: () => void,
    isAutofilling?: boolean
}> = ({ id, label, value, onChange, placeholder, type = "text", required = true, onAutofill, isAutofilling }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium mb-1" style={{color: 'var(--text-light)'}}>{label}</label>
        <div className="relative">
            <input 
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:ring-2 transition ${onAutofill ? 'pr-10' : ''}`}
                style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-color)', color: 'var(--text-dark)', '--tw-ring-color': 'var(--primary-color)'} as React.CSSProperties}
                required={required}
            />
            {onAutofill && (
                <button
                    type="button"
                    onClick={onAutofill}
                    disabled={isAutofilling}
                    className="absolute inset-y-0 right-0 flex items-center px-3 hover:text-yellow-300 disabled:opacity-50 disabled:cursor-wait"
                    style={{color: 'var(--primary-color)'}}
                    aria-label={`Get AI suggestion for ${label}`}
                    title={`Get AI suggestion for ${label}`}
                >
                    {isAutofilling ? (
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3.25a.75.75 0 01.75.75v1.25h1.25a.75.75 0 010 1.5H10.75v1.25a.75.75 0 01-1.5 0V6.75H8a.75.75 0 010-1.5h1.25V3.999a.75.75 0 01.75-.75zM10 16.75a.75.75 0 01-.75-.75v-1.25H8a.75.75 0 010-1.5h1.25v-1.25a.75.75 0 011.5 0v1.25h1.25a.75.75 0 010 1.5H10.75v1.25a.75.75 0 01-.75.75zM3.25 10a.75.75 0 01.75-.75h1.25V8a.75.75 0 011.5 0v1.25h1.25a.75.75 0 010 1.5H6.75v1.25a.75.75 0 01-1.5 0V10.75H4a.75.75 0 01-.75-.75zM16.75 10a.75.75 0 01-.75.75h-1.25v1.25a.75.75 0 01-1.5 0V10.75h-1.25a.75.75 0 010-1.5h1.25V8a.75.75 0 011.5 0v1.25h1.25a.75.75 0 01.75.75z" clipRule="evenodd" />
                        </svg>
                    )}
                </button>
            )}
        </div>
    </div>
);


const SelectField: React.FC<{ id: keyof BusinessData, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children: React.ReactNode }> = ({ id, label, value, onChange, children }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium mb-1" style={{color: 'var(--text-light)'}}>{label}</label>
        <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required
            className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:ring-2 transition"
            style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-color)', color: 'var(--text-dark)', '--tw-ring-color': 'var(--primary-color)'} as React.CSSProperties}
        >
            {children}
        </select>
    </div>
);

const RadioGroupField: React.FC<{ id: keyof BusinessData, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, options: { label: string, value: string }[] }> = ({ id, label, value, onChange, options }) => (
    <div>
        <label className="block text-sm font-medium mb-2" style={{color: 'var(--text-light)'}}>{label}</label>
        <div className="flex items-center space-x-6">
            {options.map(option => (
                <label key={option.value} className="flex items-center space-x-2 cursor-pointer" style={{color: 'var(--text-dark)'}}>
                    <input
                        type="radio"
                        name={id}
                        value={option.value}
                        checked={value === option.value}
                        onChange={onChange}
                        required
                        className="h-4 w-4 bg-gray-100 border-gray-300 focus:ring-offset-gray-50"
                        style={{color: 'var(--primary-color)', '--tw-ring-color': 'var(--primary-color)'} as React.CSSProperties}
                    />
                    <span>{option.label}</span>
                </label>
            ))}
        </div>
    </div>
);

const FormSectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-lg font-bold border-b pb-2 mt-8 mb-6" style={{color: 'var(--primary-color)', borderColor: 'var(--border-color)'}}>{children}</h3>
);

const Step1Form: React.FC<Step1FormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<BusinessData>({
    country: '',
    currency: '',
    businessType: '',
    location: '',
    monthlyRevenue: '',
    employees: '',
    marketingMethods: '',
    biggestChallenge: '',
    coreOffer: '',
    targetClient: '',
    offerTimeline: '',
    hasSalesTeam: '',
    monthlyAdSpend: '',
    profitGoal: '',
    hasCertifications: '',
    hasTestimonials: '',
    physicalCapacity: '',
    ancillaryProducts: '',
    perceivedMaxPrice: '',
    dailyTimeCommitment: '',
    businessStage: 'existing',
    fundingStatus: undefined,
    // New diagnostic fields
    leadFlowConsistency: 'Inconsistent',
    closingRate: '<20%',
  });

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [generatingField, setGeneratingField] = useState<keyof BusinessData | null>(null);

  const [autofillUrl, setAutofillUrl] = useState('');
  const [autofillDescription, setAutofillDescription] = useState('');
  const [isAutofilling, setIsAutofilling] = useState(false);
  const [autofillError, setAutofillError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
        const newState: BusinessData = { ...prev, [name]: value };
        if (name === 'businessStage' && value === 'existing') {
            newState.fundingStatus = undefined;
        }
        if (name === 'businessStage' && value === 'new' && !newState.fundingStatus) {
            newState.fundingStatus = 'bootstrapped';
        }
        return newState;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields: { key: keyof BusinessData; label: string }[] = [
        { key: 'businessType', label: 'Business Type or Idea' },
        { key: 'biggestChallenge', label: 'Biggest Challenge or Question' },
        { key: 'location', label: 'City & State/Province' },
        { key: 'country', label: 'Country' },
        { key: 'currency', label: 'Currency' },
        { key: 'employees', label: 'Current or Planned Employees' },
        { key: 'monthlyRevenue', label: 'Current Monthly Revenue' },
        { key: 'marketingMethods', label: 'Current or Planned Marketing' },
        { key: 'coreOffer', label: 'Main Offer & Price (or idea)' },
        { key: 'targetClient', label: 'Your Ideal Customer' },
    ];
    
    for (const field of requiredFields) {
        const value = formData[field.key];
        if (!value || typeof value === 'string' && !value.trim()) {
            setFormError(`Please fill out the "${field.label}" field.`);
            const element = document.getElementById(field.key);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element.focus();
            }
            return;
        }
    }
    
    if (formData.businessStage === 'new' && !formData.fundingStatus) {
        setFormError('Please select a funding status for your new business.');
        const element = document.getElementsByName('fundingStatus')[0];
         if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.focus();
        }
        return;
    }

    setFormError(null);
    onSubmit(formData);
  };

  const handleAutofill = () => {
    const categoryFiltered = selectedCategory === "All Categories"
        ? businessExamples
        : businessExamples.filter(ex => ex.category === selectedCategory);
    
    const stageFiltered = categoryFiltered.filter(ex => ex.businessStage === formData.businessStage);

    let examplesToUse = stageFiltered.length > 0 ? stageFiltered : categoryFiltered;

    if (examplesToUse.length === 0) {
      examplesToUse = businessExamples;
    }

    const randomIndex = Math.floor(Math.random() * examplesToUse.length);
    const example = examplesToUse[randomIndex];

    const fullData: BusinessData = {
        country: '', currency: '', businessType: '', location: '', monthlyRevenue: '', employees: '', marketingMethods: '',
        biggestChallenge: '', coreOffer: '', targetClient: '', offerTimeline: 'one_time', hasSalesTeam: 'no',
        monthlyAdSpend: '0', profitGoal: '', hasCertifications: 'no', hasTestimonials: 'no', physicalCapacity: '',
        ancillaryProducts: '', perceivedMaxPrice: '', dailyTimeCommitment: '', businessStage: 'existing', fundingStatus: undefined,
        leadFlowConsistency: 'Inconsistent', closingRate: '<20%',
        ...example,
    };

    setFormData(fullData);
  };

  const handleGenerateField = async (fieldName: keyof BusinessData) => {
    setGeneratingField(fieldName);
    try {
        const suggestion = await generateFieldSuggestion(formData, fieldName);
        setFormData(prev => ({...prev, [fieldName]: suggestion}));
    } catch (error) {
        console.error(`Failed to generate suggestion for ${fieldName}`, error);
    } finally {
        setGeneratingField(null);
    }
  };

  const handleAutofillWithAI = async () => {
    if (!autofillDescription.trim()) {
        setAutofillError("Please provide a business description.");
        return;
    }
    setIsAutofilling(true);
    setAutofillError(null);
    try {
        const autofilledData = await autofillBusinessData(autofillDescription, autofillUrl);
        const cleanedData = Object.fromEntries(Object.entries(autofilledData).filter(([_, v]) => v != null && v !== ''));
        setFormData(prev => ({ ...prev, ...cleanedData }));
        setAutofillDescription('');
        setAutofillUrl('');
    } catch (error) {
        console.error("Autofill failed:", error);
        setAutofillError("Sorry, the AI couldn't fill the form. Please try a different description or fill it out manually.");
    } finally {
        setIsAutofilling(false);
    }
  };
  
  const subheaderText = formData.businessStage === 'new' 
    ? "Get ideas for a new venture, or describe your own."
    : "Describe your current business, or get examples to inspire you.";

  return (
    <Card>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold" style={{color: 'var(--text-dark)'}}>Start Your Plan.</h2>
        <p className="mt-2" style={{color: 'var(--text-light)'}}>{subheaderText}</p>
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2"
                style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-color)', color: 'var(--text-dark)', '--tw-ring-color': 'var(--primary-color)'} as React.CSSProperties}
            >
                {businessCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <button
                type="button"
                onClick={handleAutofill}
                className="px-4 py-2 bg-gray-200 font-semibold rounded-md hover:bg-gray-300 transition-colors text-sm"
                style={{color: 'var(--primary-color)', backgroundColor: 'rgba(20, 114, 115, 0.1)'}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3a1 1 0 011 1v1.334l1.322-1.323a1 1 0 111.414 1.414l-1.403 1.404A5.001 5.001 0 0115 10a5 5 0 01-5 5v2a1 1 0 11-2 0v-2a5 5 0 01-5-5c0-1.606.767-3.033 1.95-3.95l-1.405-1.404a1 1 0 111.414-1.414L8 5.334V4a1 1 0 011-1zm-4.322 7.323a3 3 0 106.644 0 3 3 0 00-6.644 0z" />
                <path d="M10 4a1 1 0 011 1v.01a1 1 0 11-2 0V5a1 1 0 011-1z" />
              </svg>
              Shuffle & Autofill
            </button>
        </div>
      </div>
      
      <div className="relative p-6 bg-gray-50 rounded-lg border-2 border-dashed mb-8" style={{borderColor: 'var(--primary-color)', backgroundColor: 'var(--bg-muted)'}}>
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 text-sm font-bold" style={{backgroundColor: 'var(--bg-muted)', color: 'var(--primary-color)'}}>FAST TRACK</div>
        <h3 className="text-xl font-bold text-center" style={{color: 'var(--text-dark)'}}>Autofill with AI</h3>
        <p className="text-center mt-2 mb-4 text-sm" style={{color: 'var(--text-light)'}}>
          Provide a URL or a brief description, and our AI will attempt to fill out the form for you.
        </p>
        <div className="space-y-4">
            <div>
                <label htmlFor="autofillUrl" className="block text-sm font-medium mb-1" style={{color: 'var(--text-light)'}}>Business Website or LinkedIn URL (Optional)</label>
                <input
                    type="text"
                    id="autofillUrl"
                    value={autofillUrl}
                    onChange={(e) => setAutofillUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:ring-2 transition"
                    style={{backgroundColor: 'var(--bg-light)', borderColor: 'var(--border-color)', color: 'var(--text-dark)', '--tw-ring-color': 'var(--primary-color)'} as React.CSSProperties}
                />
            </div>
            <div>
                <label htmlFor="autofillDescription" className="block text-sm font-medium mb-1" style={{color: 'var(--text-light)'}}>Briefly describe your business or idea</label>
                <textarea
                    id="autofillDescription"
                    rows={3}
                    value={autofillDescription}
                    onChange={(e) => setAutofillDescription(e.target.value)}
                    placeholder="e.g., 'We're a new SaaS company building a project management tool for small agencies. We're bootstrapping and want to find our first 10 customers.'"
                    className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:ring-2 transition"
                    style={{backgroundColor: 'var(--bg-light)', borderColor: 'var(--border-color)', color: 'var(--text-dark)', '--tw-ring-color': 'var(--primary-color)'} as React.CSSProperties}
                />
            </div>
            {autofillError && (
                <div className="bg-red-100 border border-red-300 text-red-800 p-3 rounded-lg text-center text-sm">
                    {autofillError}
                </div>
            )}
            <button
                type="button"
                onClick={handleAutofillWithAI}
                disabled={isAutofilling || !autofillDescription.trim()}
                className="w-full flex items-center justify-center px-4 py-3 text-white font-bold rounded-md transition-colors disabled:opacity-50 disabled:cursor-wait"
                style={{backgroundColor: 'var(--primary-color)'}}
            >
                {isAutofilling ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                    </>
                ) : 'Autofill Form with AI'}
            </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">

        <FormSectionHeader>Your Situation</FormSectionHeader>
        <div className="grid md:grid-cols-2 gap-6 items-start">
            <RadioGroupField
                id="businessStage"
                label="What is your business stage?"
                value={formData.businessStage || 'existing'}
                onChange={handleChange}
                options={[
                    { label: 'Improving an Existing Business', value: 'existing' },
                    { label: 'Starting a New Business', value: 'new' }
                ]}
            />
            {formData.businessStage === 'new' && (
                <RadioGroupField
                    id="fundingStatus"
                    label="How are you funding it?"
                    value={formData.fundingStatus || 'bootstrapped'}
                    onChange={handleChange}
                    options={[
                        { label: 'Bootstrapping (No Money)', value: 'bootstrapped' },
                        { label: 'With Funding / Capital', value: 'funded' }
                    ]}
                />
            )}
             <div className="md:col-span-2">
                <InputField id="biggestChallenge" label="Biggest Challenge or Question" value={formData.biggestChallenge} onChange={handleChange} placeholder="e.g., 'Not enough leads', 'Sales calls don't close', 'We're busy but not profitable'" onAutofill={() => handleGenerateField('biggestChallenge')} isAutofilling={generatingField === 'biggestChallenge'} />
            </div>
        </div>
        
        <FormSectionHeader>Your Business</FormSectionHeader>
        <div className="grid md:grid-cols-2 gap-6">
            <InputField id="businessType" label="Business Type or Idea" value={formData.businessType} onChange={handleChange} placeholder="e.g., SaaS, Coaching, Agency" onAutofill={() => handleGenerateField('businessType')} isAutofilling={generatingField === 'businessType'} />
            <InputField id="location" label="City & State/Province" value={formData.location} onChange={handleChange} placeholder="e.g., Austin, Texas" />
             <SelectField id="country" label="Country" value={formData.country} onChange={handleChange}>
                <option value="" disabled>Select Country</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </SelectField>
            <SelectField id="currency" label="Currency" value={formData.currency} onChange={handleChange}>
                <option value="" disabled>Select Currency</option>
                {currencies.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
            </SelectField>
            <InputField id="employees" label="Current or Planned Employees" value={formData.employees} onChange={handleChange} placeholder="e.g., 3" type="number" />
            <InputField id="monthlyRevenue" label="Current Monthly Revenue (use 0 for new ideas)" value={formData.monthlyRevenue} onChange={handleChange} placeholder="e.g., 50000" type="text" />
        </div>

        <FormSectionHeader>Your Offer & Customers</FormSectionHeader>
        <div className="grid md:grid-cols-2 gap-6">
            <InputField id="marketingMethods" label="Current or Planned Marketing" value={formData.marketingMethods} onChange={handleChange} placeholder="e.g., Social Media, Referrals" onAutofill={() => handleGenerateField('marketingMethods')} isAutofilling={generatingField === 'marketingMethods'} />
            <InputField id="coreOffer" label="Main Offer & Price (or idea)" value={formData.coreOffer} onChange={handleChange} placeholder="e.g., 12-Week Program for 2000" onAutofill={() => handleGenerateField('coreOffer')} isAutofilling={generatingField === 'coreOffer'} />
            <SelectField id="leadFlowConsistency" label="Lead Flow Consistency" value={formData.leadFlowConsistency} onChange={handleChange}>
                <option value="Predictable">Predictable & Consistent</option>
                <option value="Inconsistent">Inconsistent (Feast or Famine)</option>
                <option value="None">None / Just Starting</option>
            </SelectField>
             <SelectField id="closingRate" label="Sales Closing Rate" value={formData.closingRate} onChange={handleChange}>
                <option value=">50%">High (&gt;50%)</option>
                <option value="20-50%">Average (20-50%)</option>
                <option value="<20%">Low (&lt;20%)</option>
                <option value="N/A">Don't Know / N/A</option>
            </SelectField>
            <div className="md:col-span-2">
                <InputField id="targetClient" label="Your Ideal Customer" value={formData.targetClient} onChange={handleChange} placeholder="Describe your ideal customer" onAutofill={() => handleGenerateField('targetClient')} isAutofilling={generatingField === 'targetClient'}/>
            </div>
        </div>
        
        {formError && (
            <div className="my-4 text-center p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg">
                {formError}
            </div>
        )}
        
        <div className="pt-4">
            <button 
                type="submit" 
                className="w-full text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{backgroundColor: 'var(--primary-color)', '--tw-ring-color': 'var(--primary-color)', '--tw-ring-offset-color': 'var(--bg-light)'} as React.CSSProperties}
            >
                Make My Plan!
            </button>
        </div>
      </form>
    </Card>
  );
};

export default Step1Form;
