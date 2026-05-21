export type ProjectView = "impact" | "architecture";

export interface ImpactPoint {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  impact: {
    problem: string;
    solution: string;
    metrics: ImpactPoint[];
  };
  architectureComponent: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  tags: string[];
  type: "engineering" | "data" | "strategy";
}

export const projects: Project[] = [
  {
    id: "kampongsg",
    title: "KampongSG",
    subtitle: "GoodHack 2026 · GCP Serverless Caregiver Platform",
    tags: ["Cloud Functions", "Firestore", "WhatsApp API", "GCP"],
    impact: {
      problem:
        "Community caregiving transitions in Singapore were fragmented — new caregivers had no reliable handoff channel with experienced volunteers, and doctors had no automated way to be alerted when care responsibilities shifted.",
      solution:
        "Led backend development for a 5-person team, designing and deploying a Firestore schema to support a caregiver-matching app. Built serverless Cloud Functions that trigger WhatsApp API notifications to doctors and caregivers on care transitions, and implemented Firebase Auth for user signup and session management.",
      metrics: [
        { label: "Team size", value: "5 people" },
        { label: "Stack", value: "Serverless" },
        { label: "Integration", value: "WhatsApp API" },
      ],
    },
    architectureComponent: "KampongSGArch",
    githubUrl: "https://github.com/whathuhwhy",
  },
  {
    id: "ble-tracker",
    title: "BLE Asset Tracker",
    subtitle: "IoT School Project · AWS Serverless + ESP32 Hardware",
    tags: ["ESP32", "MQTT", "AWS IoT Core", "Lambda", "DynamoDB", "API Gateway"],
    impact: {
      problem:
        "Tracking physical asset locations in a facility typically requires expensive dedicated hardware or complex client apps. The goal was a lightweight, zero-frontend system built entirely on commodity hardware and serverless cloud.",
      solution:
        "Built a real-time BLE tracking system using ESP32-C6 anchor nodes that scan for tag devices and publish RSSI data to AWS IoT Core over TLS/MQTT. IoT Core rules trigger a Python Lambda to store scan data in DynamoDB; location is inferred via strongest-signal logic. Deployed a Telegram bot via API Gateway webhook as the sole user interface — no frontend required.",
      metrics: [
        { label: "Update latency", value: "<2 s" },
        { label: "Frontend", value: "Zero" },
        { label: "Infra cost", value: "Serverless" },
      ],
    },
    architectureComponent: "BLETrackerArch",
    githubUrl: "https://github.com/whathuhwhy",
  },
  {
    id: "katecart",
    title: "KateCart",
    subtitle: "Product Design Studio 2026 · Multimodal Sentiment Pipeline",
    tags: ["Python", "BeautifulSoup", "RoBERTa", "Sentiment Analysis"],
    impact: {
      problem:
        "The client needed structured design opportunities and requirements for catering cart redesign, but feedback was scattered across Google reviews and Reddit threads — too unstructured to feed into a product decision process directly.",
      solution:
        "Built a multimodal sentiment analysis pipeline: a custom Python/BeautifulSoup scraper collected catering cart feedback from Google and Reddit; RoBERTa-base processed text sentiment; bytedance-seed/seed-1.6-flash handled visual analysis. Curated findings were distilled into design opportunities and requirements for client-led problem statements.",
      metrics: [
        { label: "Data sources", value: "Google + Reddit" },
        { label: "Text model", value: "RoBERTa-base" },
        { label: "Output", value: "Design briefs" },
      ],
    },
    architectureComponent: "KateCartArch",
    githubUrl: "https://github.com/whathuhwhy",
  },
];

export const experience: ExperienceEntry[] = [
  {
    company: "Shopee",
    role: "Business Development Intern",
    period: "Nov 2025 – Jan 2026",
    location: "Singapore",
    highlights: [
      "Analysed 1,000+ livestream scheduling and rescheduling patterns to identify root causes of delays and drop-offs, supporting improvements to planning workflows.",
      "Built light automation and tracking tools for livestream operations and data-heavy tasks (competitive valuation, weekly trend decks), cutting rescheduling frequency from 50% to 25%.",
      "Translated livestream, sales, traffic, and ad metrics into actionable insights for 10 brands ahead of annual review meetings.",
    ],
    tags: ["Excel", "Data Analysis", "Automation", "Operations", "Power Automate"],
    type: "data",
  },
  {
    company: "Novonesis",
    role: "Strategy Analyst Intern",
    period: "Aug 2025 – Oct 2025",
    location: "Singapore",
    highlights: [
      "Consolidated and cleaned fragmented sales and market data across ASEAN to support regional marketing and commercial analysis.",
      "Analysed country-level sales performance and market dynamics to identify growth patterns and opportunity areas for APAC.",
      "Developed a regional performance and outlook deck for the Bio-Solutions vertical, supporting data-driven planning discussions.",
    ],
    tags: ["Excel", "Market Analysis", "Strategy", "APAC", "ASEAN"],
    type: "strategy",
  },
  {
    company: "CEVA Logistics",
    role: "Data Analyst Intern",
    period: "Jul 2024 – Sep 2024",
    location: "Jakarta, Indonesia",
    highlights: [
      "Proposed and built ETL pipelines (Excel, Python, VBA, Power Automate) to create an interim vendor price database, reducing quotation creation latency.",
      "Fixed and validated financial dashboards measuring KPI goals, improving accuracy from ~70% to over 90%.",
      "Initiated optimisation of data practices and policies to help decision-makers interpret data without requiring analyst support.",
    ],
    tags: ["Python", "VBA", "Excel", "Power Automate", "ETL"],
    type: "data",
  },
];

export const commandItems = [
  { id: "hero", label: "Go to top", section: "hero", shortcut: "G H" },
  { id: "projects", label: "View projects", section: "projects", shortcut: "G P" },
  { id: "experience", label: "View experience", section: "experience", shortcut: "G E" },
  { id: "contact", label: "Contact / footer", section: "footer", shortcut: "G C" },
  { id: "github", label: "Open GitHub", href: "https://github.com/whathuhwhy", shortcut: null },
  { id: "linkedin", label: "Open LinkedIn", href: "https://www.linkedin.com/in/daniel-napitu/", shortcut: null },
  { id: "email", label: "Send email", href: "mailto:daniel.parsaulian.napitu@gmail.com", shortcut: null },
  { id: "resume", label: "Download résumé", href: "/resume.pdf", shortcut: "G R" },
];
