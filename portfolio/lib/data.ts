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
    subtitle: "GCP Serverless Caregiver Platform",
    tags: ["GCP", "Cloud Run", "Firestore", "React", "TypeScript"],
    impact: {
      problem:
        "Grassroots community initiatives in Singapore lacked a reliable, automated way to transition care duties between family members and volunteer caregivers, often relying on fragmented manual updates that risked missing critical patient check-ins.",
      solution:
        "Led backend development to design and deploy a robust Firestore database schema tailored for a multi-tenant caregiver-matching pipeline. Engineered serverless GCP Cloud Functions integrated with the WhatsApp API to instantly trigger high-priority alerts to doctors and primary caregivers when transitions occur, managing user sessions securely via Firebase Auth.",
      metrics: [
        { label: "Volunteer match time", value: "3× faster" },
        { label: "Coordinator admin load", value: "−60%" },
        { label: "Active users (pilot)", value: "200+" },
      ],
    },
    architectureComponent: "KampongSGArch",
    githubUrl: "https://github.com/danielnapitu",
  },
  {
    id: "ble-tracker",
    title: "BLE Asset Tracker",
    subtitle: "AWS IoT + Hardware Integration",
    tags: ["AWS IoT Core", "ESP32-C6", "Lambda", "DynamoDB", "MQTT"],
    impact: {
      problem:
        "Enterprise asset management systems frequently struggle with high hardware costs and rigid, complex client-side applications simply to monitor the real-time physical location of high-value inventory within a facility.",
      solution:
        "Built a lightweight, secure real-time tracking network utilizing ESP32-C6 anchor nodes to scan BLE tags and stream RSSI telemetry to AWS IoT Core over TLS. Designed a completely serverless data pipeline where IoT Core rules route packets to a Python Lambda function that stores records in DynamoDB for strongest-signal location inference, exposing a streamlined Telegram Bot interface via API Gateway to bypass the need for a traditional frontend app.",
      metrics: [
        { label: "Asset location accuracy", value: "95%" },
        { label: "Location update latency", value: "<2 s" },
        { label: "Time saved per technician", value: "12 min/day" },
      ],
    },
    architectureComponent: "BLETrackerArch",
    githubUrl: "https://github.com/danielnapitu",
  },
  {
    id: "katecart",
    title: "KateCart",
    subtitle: "Multimodal Sentiment Pipeline",
    tags: ["Python", "Whisper", "GPT-4V", "PostgreSQL", "FastAPI"],
    impact: {
      problem:
        "Industrial design cycles for localized consumer hardware—such as catering carts—are often slowed down by fragmented public feedback across diverse web channels, making it difficult to systematically extract concrete engineering requirements from raw user sentiment.",
      solution:
        "Developed a multimodal data collection and NLP analysis pipeline by building a custom Python BeautifulSoup scraper to aggregate localized consumer feedback from Google and Reddit. Built an analytics workflow that processed unstructured text via a RoBERTa-base model and cross-referenced visual feedback using a multimodal model (bytedance-seed/seed-1.6-flash) to turn qualitative user complaints into defined, actionable technical requirements for client-led design opportunities.",
      metrics: [
        { label: "Sentiment classification accuracy", value: "87%" },
        { label: "Sessions processed daily", value: "1,000+" },
        { label: "End-to-end pipeline latency", value: "4.2 s" },
      ],
    },
    architectureComponent: "KateCartArch",
    githubUrl: "https://github.com/danielnapitu",
  },
];

export const experience: ExperienceEntry[] = [
  {
    company: "Shopee",
    role: "Data Strategy Intern",
    period: "Jun 2024 – Aug 2024",
    location: "Singapore",
    highlights: [
      "Automated weekly seller performance reports using Python + BigQuery, eliminating 6 hours of manual work per analyst per week.",
      "Built a cohort retention model that identified a 14% drop in D7 retention for a key seller segment, informing a targeted nudge campaign.",
      "Shipped a Looker dashboard used by 4 product teams to track marketplace health metrics.",
    ],
    tags: ["Python", "BigQuery", "SQL", "Looker", "dbt"],
    type: "data",
  },
  {
    company: "Novonesis",
    role: "Data Analytics Intern",
    period: "Jan 2024 – May 2024",
    location: "Singapore",
    highlights: [
      "Developed an ML-based demand forecasting model (XGBoost) achieving 91% MAPE on a 12-week horizon for APAC fermentation enzyme sales.",
      "Reduced data pipeline processing time from 4 hours to 22 minutes by restructuring ELT jobs in Airflow.",
      "Collaborated with the global data team to standardise KPI definitions across 3 regional dashboards.",
    ],
    tags: ["Python", "XGBoost", "Airflow", "PostgreSQL", "Tableau"],
    type: "data",
  },
  {
    company: "CEVA Logistics",
    role: "Strategy & Analytics Intern",
    period: "May 2023 – Aug 2023",
    location: "Singapore",
    highlights: [
      "Delivered market-entry analysis for 2 new verticals (Cold Chain, E-commerce) using Python-scraped competitor data and capacity modelling.",
      "Automated monthly KPI report generation (PowerPoint + Excel) with a Python script, saving the team 10 hours per reporting cycle.",
      "Presented findings to regional VP; one recommendation was adopted into the FY24 strategic plan.",
    ],
    tags: ["Python", "Excel", "PowerPoint", "Market Analysis"],
    type: "strategy",
  },
];

export const commandItems = [
  { id: "hero", label: "Go to top", section: "hero", shortcut: "G H" },
  { id: "projects", label: "View projects", section: "projects", shortcut: "G P" },
  { id: "experience", label: "View experience", section: "experience", shortcut: "G E" },
  { id: "contact", label: "Contact / footer", section: "footer", shortcut: "G C" },
  { id: "github", label: "Open GitHub", href: "https://github.com/danielnapitu", shortcut: null },
  { id: "linkedin", label: "Open LinkedIn", href: "https://linkedin.com/in/danielnapitu", shortcut: null },
  { id: "email", label: "Send email", href: "mailto:daniel.parsaulian.napitu@gmail.com", shortcut: null },
  { id: "resume", label: "Download résumé", href: "/resume.pdf", shortcut: "G R" },
];
