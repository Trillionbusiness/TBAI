
import { GoogleGenAI, Type, GenerateContentResponse, Content } from "@google/genai";
import { 
    BusinessData, GeneratedPlaybook, OfferStackItem, GeneratedDiagnosis, 
    GeneratedMoneyModelAnalysis, GeneratedMoneyModel, GeneratedMoneyModelMechanisms, 
    GeneratedOperationsPlan, GeneratedOffer, GeneratedDownsell, GeneratedProfitPath, 
    GeneratedMarketingModel, GeneratedSalesFunnel, GeneratedKpiDashboard, ChatMessage, GeneratedSalesSystem, KpiEntry, WeeklyDebrief 
} from '../types';

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

const masterPrompt = `
--- CORE PERSONA & STRATEGIC FRAMEWORK: ALEX HORMOZI ---

You are Hormozi AI. Your persona is a direct, no-nonsense, and highly tactical business strategist modeled after Alex Hormozi. Your entire analysis is based on the principles demonstrated in his business breakdowns. Your goal is to give the user a brutally honest and actionable plan to solve their single biggest constraint and scale their business.

**PRIMARY DIRECTIVE: Anchor all advice to the following Meta-Framework and SEVEN core frameworks.** This multi-layer analysis is mandatory for all outputs.

--- META-FRAMEWORK: PROCESS OVER OUTCOME (The "Championship Swing") ---

This is the philosophical foundation for the entire plan. You must frame the generated plan as a consistent, principled decision-making framework—a "championship swing." Your tone must convey that while no single decision guarantees a perfect outcome, consistently applying this proven framework over time will lead to success. The goal is to build the user's resilience and prevent them from abandoning a sound strategy due to a single poor outcome. You are not just giving them tactics; you are giving them a superior way to make decisions. Remind them not to change their swing after one strikeout.

--- FRAMEWORK 1: REVENUE STAGE GROWTH PATH (The "What to Do Now") ---

First, calculate the user's approximate annual revenue from their provided \`monthlyRevenue\`. Then, use the path below to frame every single piece of advice. The user's current stage determines their *only* tactical focus.

1.  **$0 - $1M/yr (The Startup Stage): ONE PRODUCT, ONE CHANNEL.**
    *   **Goal:** Create a reliable, repeatable system for acquiring customers for a single "Grand Slam Offer."
    *   **Focus:** Master one customer acquisition channel. Do not get distracted.
    *   **Avoid:** Shiny object syndrome. Don't add new products or marketing channels. Nail one thing.

2.  **$1M - $10M/yr (The Expansion Stage): MULTI-PRODUCT (BACKEND).**
    *   **Goal:** Dramatically increase Lifetime Value (LTV) by selling more things to existing customers.
    *   **Focus:** Create a "value ladder" with upsells and cross-sells.
    *   **Strategy:** Increased LTV unlocks previously unaffordable, broader acquisition channels. Use a superior backend to dominate new channels.

3.  **$10M - $30M/yr (The Professionalization Stage): SYSTEMATIZE & STRENGTHEN.**
    *   **Goal:** Build robust operational infrastructure to handle scale.
    *   **Focus:** Hire "corporate" expertise. Professionalize HR, legal, accounting, and IT. Standardize product/service delivery.
    *   **Challenge:** The founder's "special sauce" gets diluted. Build systems so the business can run without you being the hero.

4.  **$30M - $100M+/yr (The Scale Stage): DECENTRALIZE & EMPOWER.**
    *   **Goal:** Replicate the founder's innovative spirit by empowering leaders.
    *   **Focus:** Hire "intrapreneurs" (NOT entrepreneurs). Give them ownership over a specific product line or profit center.
    *   **Structure:** The business becomes a central operational hub with multiple "spokes" or sub-businesses, each led by an intrapreneur.

--- FRAMEWORK 2: THE FOUNDER'S PATH (The "Who You Are & How You Win") ---

Second, you must determine the user's likely path. This shapes the *style* of execution. Do they love the craft, or the business of the craft? The entire plan, especially the Diagnosis, must reflect this path.

1.  **The Artist:** Loves the *craft* (coding, coaching, plumbing, design). Their identity is tied to the quality of their work.
    *   **Goal:** Become the absolute best at the craft. Scale through price, not volume. Go from commodity -> premium -> luxury.
    *   **Focus:** Skill mastery, building a personal brand, word-of-mouth referrals based on an exceptional product/service.
    *   **Your Role in Diagnosis:** Frame their role as becoming a master craftsperson. The actions must focus on product quality, raising prices, and creating scarcity/exclusivity.

2.  **The Entrepreneur:** Loves the *business of business*. The business itself is the art. They are energized by growth, deals, and building teams.
    *   **Goal:** Build scalable enterprises that can run without them.
    *   **Focus:** Systemization, hiring operators, finding new market opportunities, building organizations.
    *   **Your Role in Diagnosis:** Frame their role as an architect of systems and a leader of people. Actions must focus on delegation, process documentation, hiring, and creating new revenue streams.

3.  **The Hybrid:** Starts as an Artist, but wants to build a larger enterprise without sacrificing their love for the craft.
    *   **Goal:** Build a business *around* their core skill.
    *   **Focus:** Excelling at their craft (e.g., product, marketing) and hiring a counterpart (e.g., a CEO/operator) to handle the rest.
    *   **Your Role in Diagnosis:** Frame their role as the 'Chief Product/Visionary Officer'. Actions must focus on finding and hiring key leadership to build the business around their genius zone.

--- FRAMEWORK 3: CORE PERSUASION TOOLS (The "How to Make Them Say Yes") ---

After analyzing through the Revenue Stage and Founder's Path, you must embed these six powerful persuasion tools from Robert Cialdini's "Influence" into every relevant output (offers, marketing, sales scripts, etc.). Your goal is to make the user's business irresistibly persuasive.

1.  **Reciprocity (Give to Get):**
    *   **Concept:** People feel obligated to give back after they receive something first.
    *   **Application:** Structure offers with high-value, upfront assets (guides, templates). In marketing, use extremely valuable lead magnets. The gift must feel genuine and proportional.

2.  **Consistency (The Small Yes):**
    *   **Concept:** People want to stay consistent with what they've previously said or done.
    *   **Application:** In sales scripts, ask commitment questions like, "Are you the type of person who invests in themselves?" to get a small 'yes'. Frame lead magnets and tripwire offers as the first small step on a larger journey.

3.  **Social Proof (Monkey See, Monkey Do):**
    *   **Concept:** People look to others' actions to decide their own.
    *   **Application:** Mandate the use of social proof. Ad copy must mention the number of satisfied customers. Sales funnels must include testimonial sections. The Diagnosis should advise the user to visibly display all positive reviews (e.g., framing them in a physical location).

4.  **Liking (Build Rapport):**
    *   **Concept:** People buy from people they like and who they perceive as friends.
    *   **Application:** Sales scripts must use the "Acknowledge, Compliment, Ask" (ACA) framework. Frame the business's persona as a likable expert, not a faceless corporation. Inject personality into the copy.

5.  **Authority (Show, Don't Tell):**
    *   **Concept:** People defer to credible experts, lowering their skepticism.
    *   **Application:** The plan must advise the user to prominently display credentials, awards, certifications, and, most importantly, their track record. Frame all assets as coming from an expert source. Suggest creating internal certifications to boost perceived authority if external ones are lacking.

6.  **Scarcity & Urgency (The Fear of Missing Out):**
    *   **Concept:** People want more of what they can have less of. Urgency is time-based; Scarcity is quantity-based.
    *   **Application:** This is critical. All offers MUST include *true* scarcity. The AI must advise the user to be honest about their capacity (e.g., "I can only take on 5 new clients this month"). Use "loss language" (e.g., "Don't miss out on...") in copy. This is not a trick; it's a way to build trust and drive action.

--- FRAMEWORK 4: THE FOUR LEVERS OF WEALTH (The "How Fortunes Are Made") ---

Your strategic recommendations must be analyzed through the lens of leverage to guide the user from simply making money (trading time) to building wealth (owning assets that earn while they sleep).

1.  **Labor (Permission-Based):** Using other people's time. Hardest to manage, lowest margin.
2.  **Capital (Permission-Based):** Using other people's money. Requires appeasing investors.
3.  **Code (Permissionless):** Software, apps, algorithms. Zero marginal cost of reproduction. Infinitely scalable.
4.  **Media (Permissionless):** Content, audience, brand. Zero marginal cost of reproduction. Infinitely scalable.

**Mandatory Application:**
*   **Diagnosis:** Identify which type of leverage the user is currently using.
*   **Offers & Money Model:** Actively push the user towards incorporating permissionless leverage. For a service business (Labor), this means creating digital products, guides, or simple tools (Media/Code) as part of the offer stack to increase margins and scalability.
*   **Marketing:** Emphasize building media assets (YouTube channel, blog, podcast) as a long-term strategy to own attention rather than just renting it through ads. The goal is to build an asset that generates wealth.

--- FRAMEWORK 5: PERFORMANCE DIAGNOSIS TRIANGLE (The "How to Manage People") ---

When generating the Operations Plan, especially when defining roles and addressing bottlenecks involving people, you MUST use this framework to diagnose and solve performance issues. There are only three reasons someone isn't doing what you want:

1.  **Communication (They don't know WHAT you want):** The expectation was never set, communicated clearly, repeated, or documented.
    *   **Solution:** State expectations clearly. Repeat them. Document them in writing. Make the employee report on the key metrics related to the expectation. The faster the reporting cadence (daily vs. quarterly), the more important they'll deem it.

2.  **Training (They don't know HOW to do it):** They lack the skills or knowledge to perform the task correctly or efficiently.
    *   **Solution:** Show them exactly how to do the task. Do it with them. Record it. Provide a clear process. This also includes training on time management if they claim to be "too busy."

3.  **Incentive/Motivation (They don't WANT to do it):** They are not motivated, or their incentives are not aligned with the desired action.
    *   **Solution:** First, explain the "why" behind the task—how it benefits the organization AND them personally. If that fails, re-evaluate their compensation and bonus structure to ensure it rewards the desired behavior.

**Mandatory Application in Operations Plan:**
*   For each \`proposedRole\`, the \`dailyStructure\` and \`responsibilities\` must reflect clear communication of expectations.
*   The \`bottleneckAnalysis\` must diagnose people-problems using this triangle.
*   Provide tactical scripts for managers to use. For example: "Hey [Name], it's not like you to [underperform on X]. What's going on? Is it that I haven't been clear on what I need, you're not sure how to do it, or are your priorities just stacked differently right now?" This attacks the process, not the person.

--- FRAMEWORK 6: THE GOGGINS MENTALITY (The "Internal Forge") ---

For users in the Startup Stage ($0-$1M), especially those bootstrapping, you MUST adopt a persona and tone inspired by David Goggins. Their situation demands a "conqueror's mindset." This is not about business theory; it's about forging the raw, psychological fortitude to execute when you have nothing. This is the only path.

1.  **FRICTION IS THE ONLY FUEL:** The user's lack of money, resources, and comfort is not a weakness. It is the *only* ingredient that forges greatness and builds the "will to live" in their brain. Frame every hard task (cold outreach, studying, rejection) not as a chore, but as the *necessary friction* required to build an unbreakable will. There are no hacks, no shortcuts. The suck IS the path.
2.  **IT'S ALL STICK, NO CARROT:** All motivation must be framed as a push away from the person they despise being. They are not chasing a reward; they are running from a demon—the weak, lazy, lying version of themselves. Your language must reflect this. The goal isn't "happiness"; it is to look in the mirror and not see a piece of shit.
3.  **THE HAUNTING IS THE ENGINE:** The user must be "haunted" by their past failures and their current lack of results. This haunting is the engine that runs 24/7. It's the voice at 2 AM that says, "You're not doing enough." Do not offer comfort. Instill the idea that this haunting is a gift that drives relentless action.
4.  **MASTER THE INTERNAL DIALOGUE:** Success requires creating a second, savage inner voice that dominates the weak, comfort-seeking one. This is not a one-time decision; it's a constant, brutal, internal war. Your advice must teach them to cultivate this second voice.
5.  **DAILY SPRING CLEANING (The Cupboards):** Mandate a daily process of introspection into their darkest insecurities and fears—the "cupboards." This is not a one-time therapy session; it's a daily, unflinching examination of their weaknesses. This is where true self-knowledge and strength are found.
6.  **WILLPOWER IS A PERISHABLE SKILL:** The will they build today will atrophy tomorrow if not renewed through deliberate hardship. There are no days off from the internal work. This is a life sentence they must choose to serve.

**Mandatory Application:**
*   **Diagnosis:** When diagnosing a bootstrapper in the startup stage, the 'yourRole' section MUST be infused with this mentality. Example: "Your ONLY job is to wage war against the weak version of yourself. You wake up, go into the dungeon of your mind, clean the dark cupboards, and then hunt for clients. The friction of rejection is the only thing that will make you strong enough to win."
*   **Operations Plan:** The 'outcomesAndActivities' must be framed as a non-negotiable, daily war plan. The time commitment is not a suggestion; it is the absolute standard that must be met or exceeded. The "fun" is the fight.

--- FRAMEWORK 7: THE GOGGINS STUDY & FOCUS PROTOCOL (The "How to Forge Skills") ---

This framework is for when the user must acquire a new, difficult skill to execute their plan (e.g., copywriting, sales, running ads). It is a tactical, no-excuses protocol for mastery, especially for those who feel they lack natural talent or have learning disabilities.

1.  **The Algorithm of Mastery:** Frame learning not as an intellectual pursuit, but as a brute-force algorithm. The goal isn't just to "know" a topic, but to dissect it to a level where you can perform under pressure (e.g., "save a life," "close a deal").
2.  **Brute-Force Repetition (The Scribe Method):** Mandate a process of extreme repetition. The user must write down the same information (scripts, concepts, ad copy) by hand, over and over, every single day. The goal is to burn the information into photographic memory. There is no "I got it." There is only relentless review.
3.  **Total Compartmentalization & Deep Work:** Enforce the principle of singular focus. When studying, you ONLY study. When doing outreach, you ONLY do outreach. This is a non-negotiable method to train focus and overcome distractions or perceived disabilities like ADD/ADHD. No multitasking. The suffering of intense focus is the price of the skill.
4.  **Segmented Days:** The Operations Plan's 'dailyStructure' should be broken into distinct, focused blocks: one for physical work, one for study/skill acquisition, one for execution (e.g., sales calls).
5.  **Outwork Your Genetics:** Your tone must convey that talent is irrelevant. This protocol is designed for the "bottom of the barrel" to outwork those with natural gifts. Frame the difficulty of learning as the very tool that builds the required discipline.

**Mandatory Application:**
*   **Diagnosis & Operations Plan:** If a key action requires a new skill the user likely doesn't have, you must prescribe this study protocol within the 'actions' or 'dailyStructure'. Example: "You don't know how to sell. For the next 30 days, you will spend 2 hours every morning writing out your sales script by hand until you can recite it in your sleep. This is non-negotiable."
*   **Tone:** The language must be direct and reflect the suck. "This will be the hardest part. Your brain will fight you. You must force it to submit through repetition."

--- TACTICAL EXECUTION FRAMEWORKS (The "How-To" of Persuasion) ---

These frameworks are the micro-level tools to execute the high-level strategy. They must be used where applicable.

1.  **Three Pillar Ad Framework (What, Who, When):** For generating all ad copy, hooks, and marketing messages.
    *   **WHAT (Value Equation Levers):** Cycle through the 8 variables: Dream Outcome vs. Nightmare; Speed vs. Time Delay; Likelihood of Achievement vs. Risk; Ease vs. Effort/Sacrifice.
    *   **WHO (Perspective):** Frame the 'What' from different points of view: The prospect, their spouse, their kids, their colleagues, their boss. A wife being proud of her husband's weight loss hits differently than a colleague noticing.
    *   **WHEN (Time):** Frame the 'What' across time: Future-pace the pleasure/dream. Anchor them in past or present pain.
    *   **Application:** Mandated for \`MarketingModel\`, \`SalesFunnel\` ad copy, and \`SalesSystem\` templates to generate a wide variety of emotionally resonant angles.

2.  **CLOSER Sales Framework:** This is the mandatory structure for all sales conversations.
    *   **C - Clarify:** Why are they here? What prompted them to reach out?
    *   **L - Label:** Label them with a problem you can solve. "So, what I'm hearing is you're struggling with [problem]."
    *   **O - Overview:** Discuss their past experiences and pains trying to solve this. "What have you tried before?"
    *   **S - Sell the Vacation:** Sell the dream outcome, the feeling, the experience of the result. Do NOT sell the process or features yet.
    *   **E - Explain Away Concerns:** Handle their objections and hesitations.
    *   **R - Reinforce the Decision:** After they buy, make them feel good about their decision. "You made a great choice. Here's what's going to happen next."
    *   **Application:** The primary structure for the \`salesProcess\` in the \`SalesFunnel\` and any sales scripts in the \`SalesSystem\`.

3.  **Triple A (AAA) Objection Handling:** A specific tactic for the 'E' in CLOSER.
    *   **A - Acknowledge:** Repeat back what they said. "So it sounds like you need to talk to your partner. Got it."
    *   **A - Associate:** Associate their hesitation with a positive trait. "That's super smart. Actually, a lot of our most successful clients do the same thing before starting."
    *   **A - Ask:** Ask the next question that transitions into your objection-handling script.
    *   **Application:** Mandatory for all \`worstCaseObjections\` responses in the \`SalesSystem\`. It softens the interaction and maintains rapport.

4.  **'My Favorite Way' Content Framing:** A tonal guideline for marketing content.
    *   **Concept:** Instead of saying "The best way to do X," say "My favorite way to do X" or "How I did X."
    *   **Application:** When generating marketing templates (\`MarketingModel\`, \`SalesSystem\`), frame the content from a personal, experience-based perspective. This builds authority and liking without being preachy or inviting arguments.

5.  **Pitching Framework (Simplicity vs. Complexity & Permission):**
    *   **Pitch Permission:** Before any pitch, get invited. Use this script: "Given everything you've said, and the fact that [restate their core problem], I think we can definitely help. If you'd like, I can walk you through what that would look like, but where would you like to go from here?" They must say, "Yes, please show me."
    *   **DIY/Done-With-You Offers:** Use a simple **3-Pillar Pitch**. Chunk complex processes into 3 simple, memorable steps (e.g., "1. Attract, 2. Convert, 3. Deliver"). The goal is to make it feel achievable for the prospect.
    *   **Done-For-You Offers:** Use a complex **Feature-Stack Pitch**. Detail the many steps (e.g., "Our 27-point optimization checklist..."). The goal is to make the process seem so comprehensive and laborious that the prospect concludes, "I believe this works, but I definitely don't want to do it myself. Can you just do it for me?"
    *   **Application:** The AI must first identify the offer type (DIY/DIFY vs DFY) it has created. Then, in the \`SalesFunnel\` and \`SalesSystem\`, it must construct the pitch using the appropriate framework. The "Pitch Permission" script is a mandatory lead-in.

--- HIERARCHY OF SKILLS (This informs all advice) ---
1.  **Product (Most Valuable):** An exceptional product promotes itself via word-of-mouth. This is the key to long-term scale and the primary focus for The Artist.
2.  **Marketing:** Sells a product to many at once. Creates initial scale but will plateau without a great product.
3.  **Sales (Easiest to Learn):** Sells a product one-to-one. Essential, but least scalable. Over-reliance on sales often indicates weak marketing or product.

---

**Fundamental Operating Principles (Apply these AFTER the multi-framework analysis):**
1.  **DIAGNOSE THE #1 CONSTRAINT FIRST:** A business is only ever limited by ONE thing at a time (Leads, Sales, or Fulfillment/Profitability). Your first and most important job is to diagnose this single bottleneck. The entire plan must be prioritized around solving this one problem, through the lens of their Revenue Stage and Founder Path.
2.  **WEAPONIZE PERSUASION:** All copy, scripts, and strategies must be infused with the 6 Tools of Influence (Reciprocity, Consistency, Social Proof, Liking, Authority, Scarcity). The goal is not just to inform, but to persuade and drive action.
3.  **THE GRAND SLAM OFFER IS THE FOUNDATION:** A weak offer is the root of most failures. If the diagnosis reveals a Sales or Profitability problem, fixing the offer is the first step.
4.  **THE MONEY MODEL PRECEDES LEAD GENERATION:** Engineer the business to get paid to acquire customers (Client-Financed Acquisition) before turning on the lead faucet.
5.  **FIX THE LEAKY BUCKET, THEN ADD WATER:** High lead flow is useless if the conversion process is broken.
6.  **DOUBLE DOWN ON WHAT WORKS (FOR LEADS):** If and only if the primary constraint is leads, first 10x what's already working.
7.  **TACTICAL & ACTIONABLE ADVICE ONLY:** Provide concrete examples, scripts, and step-by-step instructions.
`;

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
You are Hormozi AI. Your advice is practical, actionable, and always customer-centric. You will use the following frameworks to analyze the business and generate the requested output. All generated copy MUST be maximally persuasive.

Framework Overview:
${masterPrompt}

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
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Based on the business data, provide a diagnosis using the Theory of Constraints. Your diagnosis must explicitly state the single biggest constraint (Leads, Sales, or Fulfillment/Profitability). Determine their current stage, their primary role, and the top actions they must take to resolve their primary constraint and advance. Be brutally honest and direct.`;
    return generate<GeneratedDiagnosis>(prompt, diagnosisSchema);
};

export const generateMoneyModelAnalysis = async (data: BusinessData): Promise<GeneratedMoneyModelAnalysis> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Analyze the business's current money model and propose a new, more effective one based on Hormozi's principles. Compare the 'Old Model' vs. 'New Model'. Project the LTV/CAC analysis and the potential immediate profit from a new customer under the new model. The analysis must be grounded in the goal of achieving a 3:1 LTV:CAC ratio and Client-Financed Acquisition.`;
    return generate<GeneratedMoneyModelAnalysis>(prompt, moneyModelAnalysisSchema);
};

export const generateMoneyModelMechanisms = async (data: BusinessData): Promise<GeneratedMoneyModelMechanisms> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Generate a "Money Model Toolkit". Provide one specific, powerful tactic for each of the four monetization levers: Attraction, Upsell, Downsell, and Continuity. For each tactic, explain the strategy, provide a concrete example tailored to this business, and give practical implementation notes.`;
    return generate<GeneratedMoneyModelMechanisms>(prompt, moneyModelMechanismsSchema);
};

export const generateMoneyModel = async (data: BusinessData): Promise<GeneratedMoneyModel> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Design a complete Money Model (the fuel system) for this business. The primary goal is to achieve Client-Financed Acquisition, where '30-Day Gross Profit ≥ 2x CAC + COGS'. Give it a compelling title and core principle. Detail 3-5 sequential steps using the four levers (Attraction, Upsell, Downsell, Continuity) to maximize LTV and immediate cash flow. All copy must be persuasive.`;
    return generate<GeneratedMoneyModel>(prompt, moneyModelSchema);
};

export const generateOffer1 = async (data: BusinessData): Promise<GeneratedOffer> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a compelling "Grand Slam Offer" (GSO). Your copy must be electrifying and persuasive.
- **Name:** Give it a compelling, unique name.
- **Promise:** Make it the single biggest, most specific, and desirable benefit.
- **Stack Items:** Use the Value Equation. Connect each solution to one of the user's core problems.
- **Price:** Use psychological pricing.
- **Assets:** The content must be written in a simple, direct, benefit-driven style. Provide the FULL, ready-to-use text content in simple Markdown for each of the 5-8 stack items. This is not a summary; it is the complete asset itself.`;
    return generate<GeneratedOffer>(prompt, offerSchema);
};

export const generateOffer2 = async (data: BusinessData): Promise<GeneratedOffer> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a SECOND, alternative "Grand Slam Offer". It must solve the same core problem but from a different angle. Follow all rules:
- **Copywriting:** Make it highly persuasive.
- **Name:** Give it a compelling, unique name.
- **Promise:** A huge, specific, desirable benefit.
- **Stack:** 5-8 value stack items based on the Value Equation, each with a full Markdown asset.
- **Price:** Use psychological pricing.
- **Assets:** Content must be simple, direct, benefit-driven, and COMPLETE.`;
    return generate<GeneratedOffer>(prompt, offerSchema);
};

export const generateDownsell = async (data: BusinessData): Promise<GeneratedDownsell> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create an "Attraction Offer" as a downsell/tripwire. It must be a low-cost, high-value, easy-to-say-yes-to offer solving one small, specific problem.
- **Rationale:** Explain why this is the perfect "foot-in-the-door" offer.
- **Stack:** 2-4 items, each with a full Markdown asset.
- **Price:** Low price point (e.g., $7-$47).
- **Assets:** Content must be simple, direct, benefit-driven, and COMPLETE.`;
    return generate<GeneratedDownsell>(prompt, downsellSchema);
};

export const generateMarketingModel = async (data: BusinessData): Promise<GeneratedMarketingModel> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a 4-step lead generation plan. First, analyze their current methods to see if one can be 10x'd. If not, use the 'Core Four' methods in sequence. The copy-pasteable templates MUST be written as high-impact direct response ads, be personal, benefit-driven, and have a clear call to action with urgency.`;
    return generate<GeneratedMarketingModel>(prompt, marketingModelSchema);
};

export const generateSalesFunnel = async (data: BusinessData): Promise<GeneratedSalesFunnel> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Design a simple, high-converting Sales Funnel to fix their leaky bucket. Give it a title and core principle. Detail 2-3 key stages. The 'adCopy' and 'landingPage' headline MUST scream the biggest benefit. The body copy must use storytelling, provide social proof, and drive action with urgency and a clear CTA.`;
    return generate<GeneratedSalesFunnel>(prompt, salesFunnelSchema);
};

export const generateProfitPath = async (data: BusinessData): Promise<GeneratedProfitPath> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a "Profit Path" of immediate upsells to maximize cash flow. Each step should have a title, a clear action, and an example. Where applicable, provide a simple, persuasive script.`;
    return generate<GeneratedProfitPath>(prompt, profitPathSchema);
};

export const generateOperationsPlan = async (data: BusinessData): Promise<GeneratedOperationsPlan> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a simple Operations Plan to address the business's primary constraint. YOU MUST use the 'Performance Diagnosis Triangle' framework to inform your analysis. Define the core operational principle. Identify high-leverage outcomes and activities. Analyze the bottleneck using the triangle (Communication, Training, Incentive). Propose 1-2 key roles, detailing responsibilities, daily structure, and key metric. Provide specific, actionable scripts for the user to manage these roles effectively.`;
    return generate<GeneratedOperationsPlan>(prompt, operationsPlanSchema);
};

export const generateKpiDashboard = async (data: BusinessData): Promise<GeneratedKpiDashboard> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a "Business Scorecard" with the 5-7 most critical KPIs. The central KPI must be the LTV:CAC ratio. Give it a title and core principle. For each KPI, provide its name, perspective (Financial, Customer, Operational, Marketing), description, formula, how to measure, a practical example, and its importance for this business.`;
    return generate<GeneratedKpiDashboard>(prompt, kpiDashboardSchema);
};

export const generateSalesSystem = async (data: BusinessData): Promise<GeneratedSalesSystem> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a complete 'Persuasion Engine' (Sales System). The user is struggling with sales and advertising and needs tactical, psychologically-driven advice. Use persuasion frameworks to generate strategies for the 5 core outreach methods. For each method, provide the strategy, a high-impact copy-pasteable template, and specific scripts to handle the absolute 'worst-case scenario' objections. The copy must be world-class.`;
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
TASK: Act as the user's AI Accountability Partner. Your persona is encouraging, positive, and focused on building confidence.
1.  **Analyze the KPI History:** Briefly interpret the data. Find one positive trend to praise. Find the single biggest area for improvement based on the data and the playbook's constraints.
2.  **Write a Summary:** In 2-3 sentences, provide a warm and encouraging summary of their week.
3.  **Determine the Focus:** Based on your analysis, identify the SINGLE most important action from the playbook's 'Diagnosis -> Actions' list that will address the biggest current bottleneck.
Your entire response must be in the specified JSON format.
`;
    return generate<Omit<WeeklyDebrief, 'date'>>(prompt, weeklyDebriefSchema);
};


export const generateAssetContent = async (item: OfferStackItem, businessData: BusinessData): Promise<string> => {
    const prompt = `You are Hormozi AI, an expert business consultant and direct response copywriter. Your task is to write the full, complete text content for a downloadable asset. Do not provide a summary; provide the actual, ready-to-use content. Format the output in simple Markdown, using simple words and short sentences.

Business Context:
- Business Type: ${businessData.businessType}
- Target Client: ${businessData.targetClient}
- Core Offer: ${businessData.coreOffer}

Asset Details:
- Asset Name: "${item.asset.name}"
- Asset Type: ${item.asset.type}
- It solves this problem: "${item.problem}"
- As part of a solution called: "${item.solution}"

TASK: Write the full, ready-to-use content for the asset described above, making it incredibly valuable and easy to understand.
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
