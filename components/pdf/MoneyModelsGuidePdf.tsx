import React from 'react';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-5xl font-black text-gray-900 tracking-tight">{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode, isSub?: boolean, isSubSub?: boolean }> = ({ children, isSub = false, isSubSub = false }) => {
    if (isSubSub) {
        return <h4 className="text-xl font-bold text-gray-700 mt-6 mb-2">{children}</h4>;
    }
    if (isSub) {
        return <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-3 border-b-2 border-gray-300 pb-2">{children}</h3>;
    }
    return <h2 className="text-3xl font-bold text-gray-800 border-b-4 border-yellow-400 pb-3 mb-6 mt-10 break-after-avoid">{children}</h2>;
};
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;
const UL: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
    <ul className="list-disc list-inside space-y-2 pl-2">
        {items.map((item, i) => <li key={i} className="text-base text-gray-700">{item}</li>)}
    </ul>
);
const OL: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
    <ol className="list-decimal list-inside space-y-2 pl-2">
        {items.map((item, i) => <li key={i} className="text-base text-gray-700">{item}</li>)}
    </ol>
);
const Table: React.FC<{ headers: string[], rows: (string|React.ReactNode)[][] }> = ({ headers, rows }) => (
    <div className="my-6 overflow-x-auto break-inside-avoid">
        <table className="w-full text-left text-sm border-collapse">
            <thead>
                <tr className="bg-gray-200">
                    {headers.map((header, i) => <th key={i} className="p-3 font-bold text-gray-700 border border-gray-300">{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, i) => (
                    <tr key={i} className="border-b border-gray-200 bg-white hover:bg-gray-50">
                        {row.map((cell, j) => <td key={j} className="p-3 border border-gray-300">{cell}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


const MoneyModelsGuidePdf: React.FC = () => {
    return (
        <div className="p-12 bg-white font-sans text-gray-900">
            <header className="text-center mb-12 pb-6 border-b-8 border-yellow-400">
                <Title>A Comprehensive Guide to Client Financed Acquisition and Money Models</Title>
            </header>
            <main>
                <SectionTitle>Intro</SectionTitle>
                <P>This guide serves as a comprehensive strategic playbook for business owners and executives seeking to achieve scalable, profitable growth. It is built on a central premise: the primary constraint on business growth is not a lack of capital, but the absence of a sophisticated monetization strategy. The core problem this guide solves is the prevalent issue of unprofitable advertising, a challenge that forces businesses to cease marketing efforts due to cash flow depletion long before they can recoup their customer acquisition costs. The solution presented herein is a systematic framework known as "Money Models," designed to engineer a self-funding customer acquisition engine.</P>
                <P>The structure of this analysis will guide the reader on a strategic journey, beginning with an examination of the foundational financial metrics that govern profitable acquisition. It will then progress to the core principles of Client Financed Acquisition (CFA) before deconstructing the four primary types of offers that form the building blocks of any robust money model. The final sections provide a detailed tactical breakdown of over fifteen distinct offer structures and a clear roadmap for constructing a bespoke money model tailored to any business, thereby removing cash as a permanent constraint to growth.</P>
                
                <SectionTitle>Context: The "Why" Behind Money Models</SectionTitle>
                <P>To fully grasp the strategic importance of Money Models, it is essential to understand their place within the broader ecosystem of business growth. This ecosystem can be distilled into a trilogy of fundamental questions that every enterprise must answer:</P>
                <OL items={[
                    <strong>What do I sell?</strong>,
                    <strong>Who do I sell it to?</strong>,
                    <strong>How do I get them to pay?</strong>
                ]} />
                <P>Money Models are the definitive answer to the third question, serving as the crucial bridge between having a product and having leads. They are the engine of monetization that makes the entire system work profitably and sustainably.</P>
                <P>This reality is illustrated by the author's own entrepreneurial journey. While operating a gym, a sudden 5x increase in lead costs from Facebook threatened to bankrupt the business. The company was viable, the service was effective, but the cash flow could not sustain the new cost of acquisition. The solution was not to find cheaper leads but to make each customer more valuable, faster. This led to the development of a multi-offer system—selling supplements upfront—that generated enough immediate gross profit to pay for the advertising that acquired the customer. This innovation allowed the business to get paid to acquire new customers, effectively removing the cash constraint on growth.</P>
                
                <SectionTitle>How Businesses Make Money: The Foundational Equation</SectionTitle>
                <P>At its core, a viable business operates on a single, non-negotiable principle: the lifetime gross profit generated from a customer must exceed the cost to acquire that customer. This can be expressed as: <strong>LTGP &gt; CAC</strong> (Lifetime Gross Profit is greater than Cost to Acquire a Customer).</P>
                <P>As a benchmark for viability, a business should aim for a minimum LTGP-to-CAC ratio of <strong>3:1</strong>. To achieve scalable growth, a business must master the interplay of three critical levers:</P>
                <UL items={[
                    "Cost to Acquire a Customer (CAC)",
                    "Gross Profit (GP)",
                    "Payback Period (PPD)"
                ]} />

                <SectionTitle>CAC: Deconstructing the Cost to Acquire a Customer</SectionTitle>
                <P>The Cost to Acquire a Customer (CAC) is the total expense incurred to convert a prospect into a paying customer. A precise calculation of CAC is non-negotiable for understanding true profitability. It must be "fully loaded," encompassing all direct and indirect costs.</P>
                <SectionTitle isSub>CAC Calculation Matrix</SectionTitle>
                <Table 
                    headers={["Acquisition Channel", "Cost Components", "Example Monthly Cost", "Total Monthly Cost", "New Customers Acquired", "Calculated CAC"]}
                    rows={[
                        ["Paid Advertising", "Ad Spend, Media Buyer Salary, Sales Commissions, Software", "$20,000, $4,000, $1,000, $1,000", "$26,000", "50", "$520"],
                        ["Content Marketing", "Content Creator Salary, SEO Tools, Video Editor", "$5,000, $500, $1,500", "$7,000", "20", "$350"],
                        ["Cold Outreach", "Sales Rep Salary, Outreach Software, Data Provider", "$6,000, $300, $700", "$7,000", "15", "$467"]
                    ]}
                />
                
                <SectionTitle>The 3 Levels of Money Models</SectionTitle>
                <P>Money Models are not monolithic; they represent a hierarchy of strategic sophistication. A business's ability to scale is directly proportional to its position on this hierarchy. The ultimate goal is to ascend from mere viability to a state of compounding, self-funded growth.</P>
                <Table 
                    headers={["Level", "Model Name & Core Principle", "Strategic Focus"]}
                    rows={[
                        ["1", <span><strong>Level 1: The Viable Business (LTGP&gt;CAC):</strong> Profitable over the customer's lifetime.</span>, "Focus on long-term value and retention."],
                        ["2", <span><strong>Level 2: The Self-Funding Business (30-Day GP&gt;CAC):</strong> Acquiring customers breaks even within 30 days.</span>, "Focus on short-term cash flow and front-end offers."],
                        ["3", <span><strong>Level 3: The Compounding Business (30-Day GP&gt;2xCAC):</strong> Each customer pays for the next two.</span>, "Focus on aggressive scaling and market domination."],
                    ]}
                />
                <P>Your entire business plan is designed to help you build and operate at Level 3.</P>
            </main>
        </div>
    );
};

export default MoneyModelsGuidePdf;
