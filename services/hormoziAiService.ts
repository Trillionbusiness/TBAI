
import { GoogleGenAI, Type, GenerateContentResponse, Content } from "@google/genai";
import { 
    BusinessData, GeneratedPlaybook, OfferStackItem, GeneratedDiagnosis, 
    GeneratedMoneyModelAnalysis, GeneratedMoneyModel, GeneratedMoneyModelMechanisms, 
    GeneratedOperationsPlan, GeneratedOffer, GeneratedDownsell, GeneratedProfitPath, 
    GeneratedMarketingModel, GeneratedSalesFunnel, GeneratedKpiDashboard, ChatMessage, GeneratedSalesSystem, KpiEntry, WeeklyDebrief 
} from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const escapeStringForJson = (str: string | undefined | null): string => {
    if (!str) return '';
    return str
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
};

const daleCarnegiePrinciples = `
--- Core Persona & Interpersonal Framework: Dale Carnegie's "How to Win Friends and Influence People" ---

Your entire persona is that of a deeply empathetic and encouraging mentor, inspired by Dale Carnegie. You must assume the user is struggling, their business is in a difficult state ("the worst of the worst"), and they are in need of genuine support and a clear path forward. Your primary goal is not just to provide a plan, but to inspire them with sincere confidence and make them feel important, capable, and excited to take action.

**Fundamental Interaction Principles:**
1.  **Never Criticize, Condemn, or Complain:** Your tone is ALWAYS positive and encouraging. You do not point out what the user is "doing wrong." Instead, you frame everything as a new, exciting opportunity. When analyzing their 'Old Model,' begin with praise for their efforts so far ("The fact that you've built this far is a testament to your hard work...") before gently introducing a "more effective way" or "an approach that might be even easier."
2.  **Give Honest, Sincere Appreciation:** Begin every major section with praise. Acknowledge the difficulty of entrepreneurship. (e.g., "Building a business is one of the hardest things anyone can do. The fact that you're here, ready to work on a plan, already puts you in the top 1% of entrepreneurs.")
3.  **Talk in Terms of THEIR Interests:** Your entire output must be framed around the user's stated goals and challenges. Constantly use the word "you." Explain *why* a particular strategy will benefit *them* directly (give them more freedom, reduce their stress, help them achieve their profit goal).
4.  **Make the Other Person Feel Important:** Give them a fine reputation to live up to. (e.g., "An entrepreneur as dedicated as you will quickly see the power in this approach.") Your advice should make them feel smart for understanding and implementing it.
5.  **Use Encouragement. Make the Fault Seem Easy to Correct:** Frame complex strategies as a series of simple, manageable steps. Break down big ideas into easy-to-digest pieces. (e.g., "This might sound complicated, but it's really just four simple steps. Let's walk through them. You'll see how easy it can be to get started.")
6.  **Dramatize Your Ideas & Appeal to Nobler Motives:** Use storytelling, vivid examples, and strong, benefit-driven language to make the ideas exciting. Connect their business to a larger purpose (serving their community, creating a legacy, achieving personal freedom).
`;

const salesPsychologyPrinciples = `
--- Sales Psychology & Copywriting Framework: "BrainScripts" & "Cashvertising" ---

You must operate as an expert in sales psychology and direct-response copywriting, using the principles from "BrainScripts for Sales Success" and "Cashvertising" to craft every piece of communication, especially ad copy, offers, and sales scripts.

**1. BrainScripts for Sales Success (For Direct Sales & Scripts):**
- **Inoculation (Pre-emptive Strikes):** Warn of competitor claims, make a weak attack against them, and arm your customer to defend their choice of you.
- **Sensory-Specific Language (Mental Movies):** Use VAKOG (Visual, Auditory, Kinesthetic, Olfactory, Gustatory) words to make the prospect *feel* the outcome.
- **Belief Reranking:** Change the *importance* of a belief. If they focus on price, you make "reliability" more important.
- **Ego Morphing (Identity Alignment):** Frame your product based on what it says about the person who *uses* it (e.g., "The top 1% of professionals use this...").
- **Message Sidedness (Honesty):** Admit a minor flaw to dramatically increase trust (e.g., "We're not the cheapest, and here's why that's good for you...").
- **Length-Implies-Strength:** Be thorough. A large volume of proof, testimonials, and reasons is persuasive in itself.

**2. Cashvertising (For All Ad & Offer Copy):**
- **The Life-Force 8 (Primal Desires):** Root all appeals in these eight desires: Survival, Enjoyment of life, Freedom from fear, Sexual companionship, Comfortable living, To be superior, Care of loved ones, Social approval.
- **Psychology of Simplicity:** Use short, simple words and sentences. Write for instant understanding.
- **Benefits, Not Features:** Always answer "What's In It For Me?" (WIIFM).
- **Extreme Specificity:** Be specific. "Make more money" becomes "Add an extra $2,750 to your weekly income."
- **Powerful Headlines & Urgency:** The headline must feature the biggest benefit and create urgency. Use deadlines and scarcity to combat inertia.
- **Cultural Adaptation:** Tailor the tone and phrasing for the user's specified country and currency.
`;

const hormoziFramework = `
--- Core Business Strategy Framework: Alex Hormozi's $100M Methods ---

Your analysis must be rigorously structured around these principles.

**Core Thesis:** Business growth is systematically de-risked by engineering a self-funding customer acquisition engine. The goal is to get paid to acquire customers.

1.  **The Grand Slam Offer (GSO):** This is the foundation. Create an offer so good people feel stupid saying no.
    *   **Goal:** De-commoditize your business. Shift the decision from price to value.
    *   **Value Equation:** Maximize \`(Dream Outcome × Perceived Likelihood of Achievement)\` and minimize \`(Time Delay × Effort & Sacrifice)\`.
    *   **Enhance with:** Scarcity, Urgency, Bonuses, Guarantees, and powerful Naming.

2.  **The Leads Engine:** How you find customers at scale.
    *   **"Core Four" Methods (in order for new businesses):** Warm Outreach -> Posting Content -> Cold Outreach -> Paid Ads.

3.  **The Money Model:** The economic architecture that ensures profitability from the first transaction.
    *   **The Golden Rule:** \`30-day Gross Profit ≥ 2x (CAC + COGS)\`.
    *   **Key Metric:** LTV:CAC ratio (Lifetime Gross Profit to Customer Acquisition Cost). Aim for 3:1 minimum.
    *   **Four Levers of Monetization:** Attraction Offer -> Upsell -> Downsell -> Continuity.

4.  **The Scaling Roadmap (Theory of Constraints):** A business is only ever limited by ONE bottleneck at a time. The CEO's job is to identify and eliminate it.
    *   **Primary Diagnostic:** Are you Supply-Constrained (can't handle more customers) or Demand-Constrained (need more customers)?
`;

const hormoziMonetizationEngine = `${daleCarnegiePrinciples}\n\n${salesPsychologyPrinciples}\n\n${hormoziFramework}`;

// --- SCHEMAS ---

const offerSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING },
        promise: { type: Type.STRING },
        stack: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    problem: { type: Type.STRING },
                    solution: { type: Type.STRING },
                    value: { type: Type.STRING, description: "The specific monetary value of this solution, e.g., '$2,000'." },
                    asset: {
                        type: Type.OBJECT,
                        description: "A mandatory downloadable asset. If the solution IS a tangible asset (template, etc.), this contains its content. If the solution is a service or concept, this contains a 'how-to' guide for it.",
                        properties: {
                            name: { type: Type.STRING, description: "The filename for the asset, e.g., 'High-Converting Ad Template'." },
                            type: { type: Type.STRING, description: "The type of asset, e.g., 'template', 'framework', 'checklist', 'script', 'guide'." },
                            content: { type: Type.STRING, description: "The full, ready-to-use text content of the asset or guide, formatted in simple Markdown." }
                        },
                        required: ["name", "type", "content"]
                    }
                },
                required: ["problem", "solution", "value", "asset"]
            }
        },
        strategyBehindStack: { type: Type.STRING, description: "The strategic rationale behind the composition of the value stack. Explain why these specific elements were chosen to solve the client's problem and create an irresistible offer." },
        totalValue: { type: Type.STRING, description: "The sum total monetary value of all items in the stack, e.g., '$20,000'." },
        guarantee: { type: Type.STRING },
        price: { type: Type.STRING }
    },
    required: ["name", "promise", "stack", "strategyBehindStack", "totalValue", "guarantee", "price"]
};

const diagnosisSchema = {
    type: Type.OBJECT,
    properties: {
        currentStage: { type: Type.STRING },
        yourRole: { type: Type.STRING },
        constraints: { type: Type.ARRAY, items: { type: Type.STRING } },
        actions: { type: Type.ARRAY, items: { type: Type.STRING } }
    },
    required: ["currentStage", "yourRole", "constraints", "actions"]
};

const modelComparisonSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        description: { type: Type.STRING },
        metrics: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    label: { type: Type.STRING },
                    value: { type: Type.STRING }
                },
                required: ["label", "value"]
            }
        }
    },
    required: ["title", "description", "metrics"]
};


const moneyModelAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        oldModel: modelComparisonSchema,
        newModel: modelComparisonSchema,
        ltvCacAnalysis: {
            type: Type.OBJECT,
            properties: {
                automationLevel: { type: Type.STRING },
                targetRatio: { type: Type.STRING },
                explanation: { type: Type.STRING }
            },
            required: ["automationLevel", "targetRatio", "explanation"]
        },
        projectedEconomics: {
            type: Type.OBJECT,
            properties: {
                estimatedCAC: { type: Type.STRING },
                targetLTV: { type: Type.STRING },
                projectedRatio: { type: Type.STRING },
                immediateProfit: { type: Type.STRING },
                explanation: { type: Type.STRING }
            },
            required: ["estimatedCAC", "targetLTV", "projectedRatio", "immediateProfit", "explanation"]
        }
    },
    required: ["oldModel", "newModel", "ltvCacAnalysis", "projectedEconomics"]
};

const moneyModelStepSchema = {
    type: Type.OBJECT,
    properties: {
        stepNumber: { type: Type.INTEGER, description: "The sequential number of the step, starting at 1." },
        title: { type: Type.STRING, description: "The title of the step, e.g., 'Step 1: The Attraction Offer'." },
        offerName: { type: Type.STRING, description: "The specific name of the offer in this step." },
        price: { type: Type.STRING, description: "The price point for this offer, e.g., '$499 Upfront'." },
        rationale: { type: Type.STRING, description: "The strategic reason for this step in the sequence." },
        hormoziTactic: { type: Type.STRING, description: "The specific Hormozi tactic being used, e.g., 'Win Your Money Back Challenge'." },
        details: { type: Type.STRING, description: "A detailed breakdown of what this step entails and how to execute it." }
    },
    required: ["stepNumber", "title", "offerName", "price", "rationale", "hormoziTactic", "details"]
};

const moneyModelSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A compelling title for the entire money model, e.g., 'The Client-Financed Acquisition Model'." },
        corePrinciple: { type: Type.STRING, description: "The core financial objective of the model, e.g., 'Generate >2x (CAC + COGS) in Gross Profit within 30 days'." },
        steps: {
            type: Type.ARRAY,
            items: moneyModelStepSchema
        },
        summary: { type: Type.STRING, description: "A concluding summary of why this model is powerful for the business." }
    },
    required: ["title", "corePrinciple", "steps", "summary"]
};

const moneyModelMechanismSchema = {
    type: Type.OBJECT,
    properties: {
        mechanismType: { type: Type.STRING, description: "The type of mechanism: 'Attraction', 'Upsell', 'Downsell', or 'Continuity'." },
        tacticName: { type: Type.STRING, description: "The name of the specific tactic, e.g., 'Win Your Money Back Challenge'." },
        strategy: { type: Type.STRING, description: "A detailed explanation of how this tactic applies to the user's business." },
        example: { type: Type.STRING, description: "A concrete example of an offer using this tactic for this business." },
        implementationNotes: { type: Type.STRING, description: "Practical, step-by-step advice on how to implement this tactic." }
    },
    required: ["mechanismType", "tacticName", "strategy", "example", "implementationNotes"]
};

const moneyModelMechanismsSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        corePrinciple: { type: Type.STRING },
        mechanisms: {
            type: Type.ARRAY,
            description: "An array of exactly 4 mechanisms, one for each type: Attraction, Upsell, Downsell, Continuity.",
            items: moneyModelMechanismSchema
        }
    },
    required: ["title", "corePrinciple", "mechanisms"]
};

const operationsPlanSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        corePrinciple: { type: Type.STRING },
        outcomesAndActivities: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    outcome: { type: Type.STRING },
                    activity: { type: Type.STRING },
                    timeAllocation: { type: Type.STRING },
                    frequency: { type: Type.STRING }
                },
                required: ["outcome", "activity", "timeAllocation", "frequency"]
            }
        },
        bottleneckAnalysis: { type: Type.STRING },
        proposedRoles: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    roleTitle: { type: Type.STRING },
                    responsibilities: { type: Type.ARRAY, items: { type: Type.STRING } },
                    dailyStructure: { type: Type.STRING },
                    keyMetric: { type: Type.STRING }
                },
                required: ["roleTitle", "responsibilities", "dailyStructure", "keyMetric"]
            }
        }
    },
    required: ["title", "corePrinciple", "outcomesAndActivities", "bottleneckAnalysis", "proposedRoles"]
};

const profitPathSchema = {
    type: Type.OBJECT,
    properties: {
        steps: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    action: { type: Type.STRING },
                    example: { type: Type.STRING },
                    script: { type: Type.STRING, description: "Optional script. Provide if applicable." }
                },
                required: ["title", "action", "example"]
            }
        }
    },
    required: ["steps"]
};

const marketingModelSchema = {
    type: Type.OBJECT,
    properties: {
        steps: {
            type: Type.ARRAY,
            description: "Exactly 4 marketing model steps.",
            items: {
                type: Type.OBJECT,
                properties: {
                    method: { type: Type.STRING },
                    strategy: { type: Type.STRING },
                    example: { type: Type.STRING },
                    template: { type: Type.STRING, description: "Optional template. Provide if applicable." }
                },
                required: ["method", "strategy", "example"]
            }
        }
    },
    required: ["steps"]
};

const salesFunnelSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        corePrinciple: { type: Type.STRING },
        stages: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    stageName: { type: Type.STRING },
                    goal: { type: Type.STRING },
                    adCopy: {
                        type: Type.OBJECT,
                        properties: {
                            headline: { type: Type.STRING },
                            body: { type: Type.STRING },
                            cta: { type: Type.STRING }
                        },
                        required: ["headline", "body", "cta"]
                    },
                    landingPage: {
                        type: Type.OBJECT,
                        properties: {
                            headline: { type: Type.STRING },
                            elements: { type: Type.ARRAY, items: { type: Type.STRING } },
                            keyFocus: { type: Type.STRING }
                        },
                        required: ["headline", "elements", "keyFocus"]
                    },
                    salesProcess: {
                        type: Type.OBJECT,
                        properties: {
                            step: { type: Type.STRING },
                            scriptFocus: { type: Type.STRING }
                        },
                        required: ["step", "scriptFocus"]
                    },
                    keyMetric: { type: Type.STRING }
                },
                required: ["stageName", "goal", "adCopy", "landingPage", "salesProcess", "keyMetric"]
            }
        }
    },
    required: ["title", "corePrinciple", "stages"]
};

const kpiDashboardSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        corePrinciple: { type: Type.STRING },
        kpis: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    perspective: { type: Type.STRING, description: "'Financial', 'Customer', 'Operational', or 'Marketing'" },
                    description: { type: Type.STRING },
                    formula: { type: Type.STRING },
                    howToMeasure: { type: Type.STRING },
                    example: { type: Type.STRING },
                    importance: { type: Type.STRING }
                },
                required: ["name", "perspective", "description", "formula", "howToMeasure", "example", "importance"]
            }
        }
    },
    required: ["title", "corePrinciple", "kpis"]
};

const downsellSchema = {
    type: Type.OBJECT,
    properties: {
        rationale: { type: Type.STRING },
        offer: offerSchema
    },
    required: ["rationale", "offer"]
};

const salesSystemSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A compelling title for the sales system, e.g., 'The Unstoppable Persuasion Engine'." },
        corePrinciple: { type: Type.STRING, description: "The core philosophy behind the sales strategies." },
        strategies: {
            type: Type.ARRAY,
            description: "An array of detailed strategies for different outreach methods.",
            items: {
                type: Type.OBJECT,
                properties: {
                    method: { type: Type.STRING, description: "'Cold Outreach', 'Warm Outreach', 'Paid Ads', 'Content Marketing', or 'Affiliate Marketing'." },
                    strategy: { type: Type.STRING, description: "The psychological strategy behind this method, explained simply." },
                    template: { type: Type.STRING, description: "A complete, ready-to-use, copy-pasteable script or ad template written with elite direct-response copywriting." },
                    worstCaseObjections: {
                        type: Type.ARRAY,
                        description: "2-3 common or 'worst-case' objections for this method and how to handle them.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                objection: { type: Type.STRING, description: "The customer's objection, phrased cynically." },
                                psychologicalPrinciple: { type: Type.STRING, description: "The specific 'BrainScripts' or 'Cashvertising' principle used in the response (e.g., 'Inoculation', 'Message Sidedness')." },
                                response: { type: Type.STRING, description: "A word-for-word script on how to respond persuasively." }
                            },
                            required: ["objection", "psychologicalPrinciple", "response"]
                        }
                    }
                },
                required: ["method", "strategy", "template", "worstCaseObjections"]
            }
        }
    },
    required: ["title", "corePrinciple", "strategies"]
};

const weeklyDebriefSchema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING, description: "A concise, encouraging summary of the week's performance based on the KPI data, written in the Dale Carnegie persona. Highlight one key win and one area for focus." },
        focus: { type: Type.STRING, description: "The single most important, actionable task from the playbook's action plan that the user should focus on for the next week to address the biggest bottleneck revealed by the data." }
    },
    required: ["summary", "focus"]
};


// --- HELPER FUNCTIONS ---

const generate = async <T>(prompt: string, schema: any): Promise<T> => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as T;
    } catch (e) {
        console.error("AI Generation Error:", e, "Prompt:", prompt);
        if (e instanceof Error) {
          throw new Error(`Failed to generate valid JSON for the requested content: ${e.message}`);
        }
        throw new Error("An unknown error occurred during AI generation.");
    }
};

const createBusinessContextPrompt = (data: BusinessData): string => {
    const escapedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, escapeStringForJson(value)])
    ) as Record<keyof BusinessData, string>;
    
    let businessStageContext = '';
    if (escapedData.businessStage === 'new') {
        businessStageContext = `
This is a brand new business idea. The user is starting from scratch.
Funding Status: ${escapedData.fundingStatus === 'bootstrapped' ? 'Bootstrapping (no money)' : 'Has funding/capital'}.
IMPORTANT: Tailor your advice for someone at the very beginning of their journey.
- For 'bootstrapped' businesses, focus on sweat equity, low-cost client acquisition (e.g., cold outreach, organic content), and getting to cash flow positive as fast as possible. Your advice should be scrappy and action-oriented.
- For 'funded' businesses, advise on how to intelligently deploy capital for faster growth, testing paid channels, and building systems early. Your advice should focus on leverage and speed.
`;
    } else {
        businessStageContext = `This is an existing business looking to improve and grow.`;
    }

    return `
You are Hormozi AI, an expert business consultant and world-class direct response copywriter. Your advice is practical, actionable, and always customer-centric. You will use the following frameworks to analyze the business and generate the requested output. All generated copy MUST be maximally persuasive and follow all the copywriting rules provided.

Framework Overview:
${hormoziMonetizationEngine}

Analyze the following business and generate the requested output in the specified JSON format. Do not include any explanatory text before or after the JSON.

Business Situation:
${businessStageContext}

Business Data:
- Country for cultural adaptation of copy: ${escapedData.country}
- Currency: ${escapedData.currency}
- Business Type: ${escapedData.businessType}
- Location: ${escapedData.location}
- Monthly Revenue: ${escapedData.monthlyRevenue} ${escapedData.currency}
- Employees: ${escapedData.employees}
- Marketing Methods: ${escapedData.marketingMethods}
- Biggest Challenge: ${escapedData.biggestChallenge}
- Core Offer: ${escapedData.coreOffer}
- Target Client: ${escapedData.targetClient}
- Offer Timeline: ${escapedData.offerTimeline}
- Has Sales Team: ${escapedData.hasSalesTeam}
- Monthly Ad Spend: ${escapedData.monthlyAdSpend} ${escapedData.currency}
- Profit Goal: ${escapedData.profitGoal} ${escapedData.currency}
- Has Certifications: ${escapedData.hasCertifications}
- Has Testimonials: ${escapedData.hasTestimonials}
- Physical Capacity: ${escapedData.physicalCapacity}
- Ancillary Products: ${escapedData.ancillaryProducts}
- Perceived Max Price (value of perfect result): ${escapedData.perceivedMaxPrice} ${escapedData.currency}
- Daily Time Commitment for Growth: ${escapedData.dailyTimeCommitment} hours
`;
};

// --- EXPORTED GENERATION FUNCTIONS ---

export const generateDiagnosis = async (data: BusinessData): Promise<GeneratedDiagnosis> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Based on the business data, provide a diagnosis using the Scaling Roadmap and Theory of Constraints. Identify their primary constraint (Supply-constrained or Demand-constrained) using the 'Doubling Ad Spend' test logic. Determine their current stage on the 10-Stage Scaling Roadmap, their primary role, and the top actions they must take to resolve their primary constraint and advance to the next stage. Be brutally honest and direct.`;
    return generate<GeneratedDiagnosis>(prompt, diagnosisSchema);
};

export const generateMoneyModelAnalysis = async (data: BusinessData): Promise<GeneratedMoneyModelAnalysis> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Analyze the business's current money model and propose a new, more effective one based on Hormozi's principles. Compare the 'Old Model' vs. 'New Model'. Project the LTV/CAC analysis and the potential immediate profit from a new customer under the new model. The analysis must be grounded in the goal of achieving a 3:1 LTV:CAC ratio and Client-Financed Acquisition.`;
    return generate<GeneratedMoneyModelAnalysis>(prompt, moneyModelAnalysisSchema);
};

export const generateMoneyModelMechanisms = async (data: BusinessData): Promise<GeneratedMoneyModelMechanisms> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Generate a "Money Model Toolkit". Provide one specific, powerful tactic for each of the four monetization levers: Attraction, Upsell, Downsell, and Continuity. For each tactic, explain the strategy, provide a concrete example tailored to this business, and give practical implementation notes. Apply all "Cashvertising" principles to the copy.`;
    return generate<GeneratedMoneyModelMechanisms>(prompt, moneyModelMechanismsSchema);
};

export const generateMoneyModel = async (data: BusinessData): Promise<GeneratedMoneyModel> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Design a complete Money Model (the fuel system) for this business. The primary goal is to achieve Client-Financed Acquisition, where '30-Day Gross Profit ≥ 2x CAC + COGS'. Give it a compelling title and core principle. Detail 3-5 sequential steps using the four levers (Attraction, Upsell, Downsell, Continuity) to maximize LTV and immediate cash flow. All copy must be persuasive.`;
    return generate<GeneratedMoneyModel>(prompt, moneyModelSchema);
};

export const generateOffer1 = async (data: BusinessData): Promise<GeneratedOffer> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a compelling "Grand Slam Offer" (GSO). Your copy must be electrifying and packed with "Cashvertising" principles.
- **Name:** Combine the M.A.G.I.C. formula with a psychologically potent headline starter.
- **Promise:** Make it the single biggest, most specific, and desirable benefit.
- **Stack Items:** Describe solutions using Powerful Visual Adjectives (PVAs) to create a mental movie. Connect each solution to one of the Life-Force 8 desires.
- **Price:** Use psychological pricing (ending in 7, 5, or 9 for value; rounded for prestige).
- **Assets:** The content must be written in a simple, direct, benefit-driven style. Provide the FULL, ready-to-use text content in simple Markdown for each of the 5-8 stack items. This is not a summary; it is the complete asset itself.`;
    return generate<GeneratedOffer>(prompt, offerSchema);
};

export const generateOffer2 = async (data: BusinessData): Promise<GeneratedOffer> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a SECOND, alternative "Grand Slam Offer". It must solve the same core problem but from a different angle. Follow all rules:
- **Copywriting:** Apply all "Cashvertising" principles. Make it highly persuasive.
- **Name:** Combine M.A.G.I.C. formula with a potent headline starter.
- **Promise:** A huge, specific, desirable benefit.
- **Stack:** 5-8 value stack items based on the Value Equation, each with a full Markdown asset.
- **Price:** Use psychological pricing.
- **Assets:** Content must be simple, direct, benefit-driven, and COMPLETE.`;
    return generate<GeneratedOffer>(prompt, offerSchema);
};

export const generateDownsell = async (data: BusinessData): Promise<GeneratedDownsell> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create an "Attraction Offer" as a downsell/tripwire. It must be a low-cost, high-value, easy-to-say-yes-to offer solving one small, specific problem.
- **Copywriting:** Apply all "Cashvertising" principles.
- **Rationale:** Explain why this is the perfect "foot-in-the-door" offer.
- **Stack:** 2-4 items, each with a full Markdown asset.
- **Price:** Low price point (e.g., $7-$47).
- **Assets:** Content must be simple, direct, benefit-driven, and COMPLETE.`;
    return generate<GeneratedDownsell>(prompt, downsellSchema);
};

export const generateMarketingModel = async (data: BusinessData): Promise<GeneratedMarketingModel> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a 4-step lead generation plan using the 'Core Four' methods in sequence. The copy-pasteable templates MUST be written as high-impact direct response ads, following all "Cashvertising" principles. They must be personal, benefit-driven, and have a clear call to action with urgency.`;
    return generate<GeneratedMarketingModel>(prompt, marketingModelSchema);
};

export const generateSalesFunnel = async (data: BusinessData): Promise<GeneratedSalesFunnel> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Design a simple, high-converting Sales Funnel. Give it a title and core principle. Detail 2-3 key stages. The 'adCopy' and 'landingPage' headline MUST scream the biggest benefit and use a potent headline starter. The body copy must use PVAs, tell a story, provide social proof, and drive action with urgency and a clear CTA.`;
    return generate<GeneratedSalesFunnel>(prompt, salesFunnelSchema);
};

export const generateProfitPath = async (data: BusinessData): Promise<GeneratedProfitPath> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a "Profit Path" of immediate upsells to maximize cash flow. Each step should have a title, a clear action, and an example. Where applicable, provide a simple, persuasive script following "Cashvertising" principles.`;
    return generate<GeneratedProfitPath>(prompt, profitPathSchema);
};

export const generateOperationsPlan = async (data: BusinessData): Promise<GeneratedOperationsPlan> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a simple Operations Plan to address the business's primary constraint. Define the core operational principle. Identify high-leverage outcomes and activities. Propose 1-2 key team roles needed to solve the current bottleneck, detailing responsibilities, daily structure, and their key metric.`;
    return generate<GeneratedOperationsPlan>(prompt, operationsPlanSchema);
};

export const generateKpiDashboard = async (data: BusinessData): Promise<GeneratedKpiDashboard> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a "Business Scorecard" with the 5-7 most critical KPIs. The central KPI must be the LTV:CAC ratio. Give it a title and core principle. For each KPI, provide its name, perspective (Financial, Customer, Operational, Marketing), description, formula, how to measure, a practical example, and its importance for this business.`;
    return generate<GeneratedKpiDashboard>(prompt, kpiDashboardSchema);
};

export const generateSalesSystem = async (data: BusinessData): Promise<GeneratedSalesSystem> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a complete 'Persuasion Engine' (Sales System). The user is struggling with sales and advertising and needs tactical, psychologically-driven advice. Use the 'Cashvertising' and 'BrainScripts' frameworks to generate strategies for the 5 core outreach methods. For each method, provide the strategy, a high-impact copy-pasteable template, and specific scripts to handle the absolute 'worst-case scenario' objections. The copy must be world-class.`;
    return generate<GeneratedSalesSystem>(prompt, salesSystemSchema);
};

export const generateWeeklyDebrief = async (businessData: BusinessData, playbook: GeneratedPlaybook, kpiHistory: KpiEntry[]): Promise<Omit<WeeklyDebrief, 'date'>> => {
    const prompt = `${createBusinessContextPrompt(businessData)}\n
CONTEXT: You have already generated the following business playbook for the user.
PLAYBOOK:
\`\`\`json
${JSON.stringify(playbook, null, 2)}
\`\`\`
\n
CONTEXT: The user has been tracking their performance. Here are their KPI entries for the past few weeks.
KPI HISTORY:
\`\`\`json
${JSON.stringify(kpiHistory, null, 2)}
\`\`\`
\n
TASK: Act as the user's AI Accountability Partner. Your persona is Dale Carnegie: encouraging, positive, and focused on building confidence.
1.  **Analyze the KPI History:** Briefly interpret the data. Find one positive trend to praise ("Give honest, sincere appreciation"). Find the single biggest area for improvement based on the data and the playbook's constraints.
2.  **Write a Summary:** In 2-3 sentences, provide a warm and encouraging summary of their week.
3.  **Determine the Focus:** Based on your analysis, identify the SINGLE most important action from the playbook's 'Diagnosis -> Actions' list that will address the biggest current bottleneck.
Your entire response must be in the specified JSON format.
`;
    return generate<Omit<WeeklyDebrief, 'date'>>(prompt, weeklyDebriefSchema);
};


export const generateAssetContent = async (item: OfferStackItem, businessData: BusinessData): Promise<string> => {
    const prompt = `You are Hormozi AI, an expert business consultant and direct response copywriter. Your task is to write the full, complete text content for a downloadable asset. Do not provide a summary; provide the actual, ready-to-use content. Format the output in simple Markdown, using simple words and short sentences as per "Cashvertising" principles.

Business Context:
- Business Type: ${businessData.businessType}
- Target Client: ${businessData.targetClient}
- Core Offer: ${businessData.coreOffer}

Asset Details:
- Asset Name: "${item.asset.name}"
- Asset Type: ${item.asset.type}
- It solves this problem: "${item.problem}"
- As part of a solution called: "${item.solution}"

TASK: Write the full, ready-to-use content for the asset described above, applying all "Cashvertising" copywriting principles to make it incredibly valuable and easy to understand.
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
};

const generateSimpleText = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                thinkingConfig: { thinkingBudget: 0 }
            }
        });
        return response.text.trim();
    } catch (e) {
        console.error("AI Simple Text Generation Error:", e, "Prompt:", prompt);
        if (e instanceof Error) {
            throw new Error(`Failed to generate text: ${e.message}`);
        }
        throw new Error("An unknown error occurred during AI generation.");
    }
};

const businessDataSchema = {
    type: Type.OBJECT,
    properties: {
        country: { type: Type.STRING, description: "The country the business operates in." },
        currency: { type: Type.STRING, description: "The currency used, e.g., USD, GBP." },
        businessType: { type: Type.STRING, description: "The type of business, e.g., SaaS, Gym." },
        location: { type: Type.STRING, description: "The city and state/province." },
        monthlyRevenue: { type: Type.STRING, description: "A string representing the monthly revenue number." },
        employees: { type: Type.STRING, description: "A string representing the number of employees." },
        marketingMethods: { type: Type.STRING, description: "How the business finds customers." },
        biggestChallenge: { type: Type.STRING, description: "The main problem the business faces." },
        coreOffer: { type: Type.STRING, description: "The primary product/service and its price." },
        targetClient: { type: Type.STRING, description: "A description of the ideal customer." },
        offerTimeline: { type: Type.STRING, description: "Should be one of: 'monthly', 'quarterly', 'half_yearly', 'one_time'." },
        hasSalesTeam: { type: Type.STRING, description: "Should be 'yes' or 'no'." },
        monthlyAdSpend: { type: Type.STRING, description: "A string representing the monthly ad spend number." },
        profitGoal: { type: Type.STRING, description: "A string representing the desired monthly profit number." },
        hasCertifications: { type: Type.STRING, description: "Should be 'yes' or 'no'." },
        hasTestimonials: { type: Type.STRING, description: "Should be 'yes' or 'no'." },
        physicalCapacity: { type: Type.STRING, description: "Any physical capacity constraints." },
        ancillaryProducts: { type: Type.STRING, description: "Other products or services sold." },
        perceivedMaxPrice: { type: Type.STRING, description: "A string representing the value of a perfect result to a customer." },
        dailyTimeCommitment: { type: Type.STRING, description: "A string representing the hours per day for growth." },
        businessStage: { type: Type.STRING, description: "Should be 'new' or 'existing'." },
        fundingStatus: { type: Type.STRING, description: "For new businesses, should be 'funded' or 'bootstrapped'." },
    },
};

export const autofillBusinessData = async (description: string, url?: string): Promise<Partial<BusinessData>> => {
    const prompt = `
You are an expert business analyst AI. A user has provided a description and an optional URL for their business.
Your task is to analyze this information and populate a business data form.
Provide your response as a valid JSON object matching the provided schema.
Make intelligent estimations for any missing information. If a field cannot be determined, omit it from the JSON.
For currency, infer from the country if not specified (e.g., USA -> USD, UK -> GBP).
For yes/no fields, use "yes" or "no".
For businessStage, determine if the business sounds new or existing based on the language used ("idea", "plan" vs "we have customers").
---
Business URL: ${url || 'Not provided'}
Business Description: "${escapeStringForJson(description)}"
---
TASK: Fill out the business data form based on the information above. Your response must be only the JSON object.
`;
    return generate<Partial<BusinessData>>(prompt, businessDataSchema);
};

export const generateFieldSuggestion = async (data: Partial<BusinessData>, fieldName: keyof BusinessData): Promise<string> => {
    // Sanitize data: remove empty fields to keep the prompt clean
    const contextData = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value && key !== fieldName)
    );

    const fieldLabels: Record<string, string> = {
        businessType: "Business Type or Idea",
        biggestChallenge: "Biggest Challenge or Question",
        coreOffer: "Main Offer & Price (or idea)",
        targetClient: "Your Ideal Customer",
        marketingMethods: "Current or Planned Marketing",
        ancillaryProducts: "Other Items for Sale?"
    };

    const fieldLabel = fieldLabels[fieldName] || fieldName;

    const prompt = `
You are an AI assistant designed to help entrepreneurs brainstorm.
Based on the following business information, generate a single, concise, and creative suggestion for the field: "${fieldLabel}".

Business Information:
${JSON.stringify(contextData, null, 2)}

Your task is to provide a suggestion for the "${fieldLabel}" field.
The suggestion should be a short string, suitable for direct use in a form field.
Do not add any extra explanation, labels, or quotation marks. Just return the pure text suggestion.

Suggestion for "${fieldLabel}":
`;
    const suggestion = await generateSimpleText(prompt);
    // Sometimes the model might still return quotes, so let's strip them.
    return suggestion.replace(/^"|"$/g, '');
};


export const generateChatResponseStream = async (
    businessData: BusinessData,
    playbook: GeneratedPlaybook,
    history: ChatMessage[]
) => {
    // Convert history to a simple string format for the prompt
    const formattedHistory = history.map(msg => `${msg.role === 'user' ? 'AI' : 'USER'}: ${msg.content}`).join('\n\n');

    const prompt = `
You are Hormozi AI, an expert business consultant and world-class copywriter. You have already generated a business plan for a user. Now, you are in a chat conversation to refine that plan. Your responses must be helpful, concise, and directly address the user's latest request. You must act as a collaborative partner. Your responses should be in simple markdown and MUST adhere to all "Cashvertising" principles (simple language, benefit-driven, specific, etc.).

Here is the original business data you used:
\`\`\`json
${JSON.stringify(businessData, null, 2)}
\`\`\`

Here is the complete business plan you have generated so far. You should refer to this and modify it in your responses if the user asks you to.
\`\`\`json
${JSON.stringify(playbook, null, 2)}
\`\`\`

---
CHAT HISTORY:
${formattedHistory}
---

TASK: Based on all the context above, provide a direct and helpful response to the last user message. Keep your response conversational and focused on improving their business plan, using elite-level copywriting in your answer.
AI:
`;

    const response = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response;
};

export const generateVideoOverviewScript = async (playbook: GeneratedPlaybook, businessData: BusinessData): Promise<string> => {
    const prompt = `
You are an expert scriptwriter for short, engaging business overview videos, trained in the direct-response style of "Cashvertising".
Based on the provided business data and playbook, create a concise and powerful voice-over script for a 60-90 second video sales letter.

Apply "Cashvertising" principles relentlessly:
- **Hook:** Use a shocking statistic, a bold promise, or an intriguing question that taps into a Life-Force 8 desire.
- **Story:** Frame the challenge and solution as a short, emotional story about the target customer's pain and their dream outcome.
- **Language:** Use simple words and Powerful Visual Adjectives (PVAs) to create a "mental movie." Be extremely specific.
- **Urgency:** End with a strong reason to act NOW (scarcity, fear of loss).
- The tone must be motivational, clear, and confident.
- The output should be ONLY the script text, suitable for a text-to-speech engine. Do not include any labels, formatting, or scene directions like "(upbeat music)".

Business Data:
${JSON.stringify(businessData, null, 2)}

Playbook (summary for script):
${JSON.stringify({
    diagnosis: playbook.diagnosis,
    offer1: playbook.offer1
}, null, 2)}

SCRIPT:
`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
};

export const generateAndPollVideo = async (
    script: string,
    onProgress: (status: string, progress: number) => void
): Promise<string> => {
    try {
        onProgress("Starting video generation...", 10);
        let operation = await ai.models.generateVideos({
            model: 'veo-2.0-generate-001',
            prompt: script,
            config: { numberOfVideos: 1 }
        });

        onProgress("Video synthesis in progress... (this can take several minutes)", 30);
        let progress = 30;
        const messages = [
            "Analyzing script and preparing scenes...",
            "Rendering visual elements...",
            "Compositing video layers...",
            "Almost there, finalizing the video..."
        ];
        let messageIndex = 0;

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds
            operation = await ai.operations.getVideosOperation({ operation: operation });
            
            progress = Math.min(90, progress + 5); 
            onProgress(messages[messageIndex % messages.length], progress);
            messageIndex++;
        }

        onProgress("Finalizing video...", 95);
        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

        if (!downloadLink) {
            throw new Error("Video generation completed, but no download link was found.");
        }

        const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        if (!videoResponse.ok) {
            throw new Error(`Failed to download the video. Status: ${videoResponse.status}`);
        }

        const videoBlob = await videoResponse.blob();
        onProgress("Video ready!", 100);

        return URL.createObjectURL(videoBlob);

    } catch (e) {
        console.error("Video Generation Error:", e);
        if (e instanceof Error) {
            throw new Error(`Failed to generate video: ${e.message}`);
        }
        throw new Error("An unknown error occurred during video generation.");
    }
};