import { AppState } from '../types';

const gymPlan: AppState = {
  businessData: {
    country: 'United States',
    currency: 'USD',
    businessType: 'Gym / Fitness Center',
    location: 'Austin, Texas',
    monthlyRevenue: '25000',
    employees: '5',
    marketingMethods: 'Local SEO, Instagram, Word of Mouth',
    biggestChallenge: 'Getting new members in the door consistently.',
    coreOffer: 'Monthly gym membership for $150',
    targetClient: 'Young professionals aged 25-40 who want to stay fit.',
    offerTimeline: 'monthly',
    hasSalesTeam: 'yes',
    monthlyAdSpend: '2000',
    profitGoal: '40000',
    hasCertifications: 'yes',
    hasTestimonials: 'yes',
    physicalCapacity: '150 members at a time',
    ancillaryProducts: 'Protein shakes, branded apparel',
    perceivedMaxPrice: '5000',
    dailyTimeCommitment: '8',
    businessStage: 'existing',
  },
  playbook: {
    // This would be a full, pre-generated playbook object.
    // For brevity, we'll use a simplified version.
    diagnosis: {
      currentStage: "Struggle Street",
      yourRole: "You're the head coach, lead salesperson, and chief marketer.",
      constraints: ["Lead generation is inconsistent and unpredictable.", "Your main offer is a commodity (just like every other gym)."],
      actions: ["Create a 'Grand Slam Offer' to stand out.", "Implement a simple, predictable lead generation system."]
    },
    offer1: {
      name: "The 6-Week Austin Fitness Transformation Challenge",
      promise: "Get in the best shape of your life in just 6 weeks, or your money back. Guaranteed.",
      stack: [
          { problem: "Not knowing what to do at the gym.", solution: "Personalized 6-Week Workout Plan", value: "$500", asset: { name: "Your 6-Week Workout Plan", type: "guide", content: "..." }},
          { problem: "Diet is confusing and hard.", solution: "Simple 'Eat This, Not That' Nutrition Guide", value: "$300", asset: { name: "Simple Nutrition Guide", type: "guide", content: "..." }},
          { problem: "Staying motivated alone.", solution: "Weekly Accountability Check-ins with a Coach", value: "$800", asset: { name: "Accountability Guide", type: "guide", content: "..." }},
      ],
      strategyBehindStack: "This offer de-risks the purchase, provides a clear timeline, and solves the three biggest problems new gym members face: lack of direction, poor diet, and no accountability.",
      totalValue: "$1600",
      guarantee: "If you follow the plan for 6 weeks and don't see a noticeable transformation, we'll refund every penny. No questions asked.",
      price: "$599"
    },
    // ... other playbook sections would be fully populated here ...
    offer2: {} as any, downsell: {} as any, kpiDashboard: {} as any, marketingModel: {} as any, moneyModel: {} as any, moneyModelAnalysis: {} as any, moneyModelMechanisms: {} as any, operationsPlan: {} as any, profitPath: {} as any, salesFunnel: {} as any, salesSystem: {} as any,
  },
  kpiEntries: [],
  weeklyDebriefs: [],
};

const saasPlan: AppState = {
  businessData: {
    country: 'United States',
    currency: 'USD',
    businessType: 'SaaS for Agencies',
    location: 'Remote',
    monthlyRevenue: '10000',
    employees: '3',
    marketingMethods: 'Content Marketing, Cold Email',
    biggestChallenge: 'Long sales cycle and getting users to see the value during the trial.',
    coreOffer: 'Project management tool at $99/month',
    targetClient: 'Small marketing agencies (5-10 people)',
    offerTimeline: 'monthly',
    hasSalesTeam: 'no',
    monthlyAdSpend: '1000',
    profitGoal: '25000',
    hasCertifications: 'no',
    hasTestimonials: 'yes',
    physicalCapacity: '',
    ancillaryProducts: 'White-glove onboarding service',
    perceivedMaxPrice: '20000',
    dailyTimeCommitment: '8',
    businessStage: 'existing',
  },
  playbook: {
    diagnosis: {
      currentStage: "The Grind",
      yourRole: "You need to be a product visionary and a sales machine.",
      constraints: ["Your free trial isn't converting because users don't experience the 'aha!' moment.", "Your pricing is simple, but doesn't capture the full value you provide."],
      actions: ["Re-engineer your onboarding to force user success.", "Create a high-ticket 'Done-With-You' offer to increase immediate cashflow."]
    },
     offer1: {
      name: "The Agency OS: Full Suite + White-Glove Onboarding",
      promise: "We'll personally set up your entire agency's workflow in our system and train your team in 7 days.",
      stack: [
        { problem: "Setting up new software is a time-consuming nightmare.", solution: "Complete 'Done-For-You' Account Setup & Data Import", value: "$2,500", asset: { name: "Onboarding Checklist", type: "checklist", content: "..." }},
        { problem: "Team won't adopt new tools.", solution: "Live 2-Hour Team Training & Q&A Session", value: "$1,500", asset: { name: "Team Training Agenda", type: "template", content: "..." }},
        { problem: "Generic templates don't fit our workflow.", solution: "5 Custom Workflow Templates Built For Your Agency", value: "$3,000", asset: { name: "Workflow Design Guide", type: "guide", content: "..." }}
      ],
      strategyBehindStack: "This offer completely removes the biggest friction points for adoption: setup and training. It sells the dream outcome (a perfectly organized agency) without the usual work, justifying a premium price.",
      totalValue: "$7,000",
      guarantee: "If your team isn't using the system daily by day 30, we'll work with you for free until they are.",
      price: "$4,997"
    },
    // ... other playbook sections ...
    offer2: {} as any, downsell: {} as any, kpiDashboard: {} as any, marketingModel: {} as any, moneyModel: {} as any, moneyModelAnalysis: {} as any, moneyModelMechanisms: {} as any, operationsPlan: {} as any, profitPath: {} as any, salesFunnel: {} as any, salesSystem: {} as any,
  },
  kpiEntries: [],
  weeklyDebriefs: [],
};


export const prebuiltPlans = [
    { name: 'Local Gym Growth Plan', description: 'A complete plan for a local gym struggling with lead flow.', data: gymPlan },
    { name: 'SaaS for Agencies', description: 'A strategy for a B2B SaaS company to shorten their sales cycle and increase LTV.', data: saasPlan },
];
