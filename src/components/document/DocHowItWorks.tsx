import Link from "next/link";
import {
  PlusCircle,
  Upload,
  FileText,
  Sparkles,
  UserCheck,
  Bot,
  Play,
} from "lucide-react";
import { DocPage } from "./DocumentShell";

/* "How It Works" as printed document prose: the six pipeline steps set as a
   numbered list, with the demo-video CTA rendered as a document callout. */

const steps = [
  {
    icon: PlusCircle,
    title: "Create a Flow",
    description:
      "In minutes create an extraction flow, simply explaining what you want to capture",
  },
  {
    icon: Upload,
    title: "Upload Document",
    description: "Drop your PDF via UI, forward an email, or call our API",
  },
  {
    icon: FileText,
    title: "Extract Data",
    description: "Intelligent field detection with tables, metadata, and validation",
  },
  {
    icon: Sparkles,
    title: "Clean & Transform",
    description:
      "Automatic formatting, categorization, lookups, and calculations with Cleaners",
  },
  {
    icon: UserCheck,
    title: "Review & Approve",
    description:
      "Optionally pause for human review — correct, approve, or reject before delivery",
  },
  {
    icon: Bot,
    title: "Store, Deliver & Act",
    description:
      "Data lands in Buckets, fires webhooks, fills PDF forms, or launches an AI Agent",
  },
];

export default function DocHowItWorks({ n, of }: { n: number; of: number }) {
  return (
    <DocPage
      id="how-it-works"
      n={n}
      of={of}
      ariaLabelledby="doc-how-it-works-heading"
    >
      <div className="doc-eyebrow">The workflow</div>

      <h2 id="doc-how-it-works-heading">How It Works</h2>

      <p className="doc-lead">
        From document to structured data to action — in 6 simple steps
      </p>

      <ol style={{ margin: "22px 0 8px", paddingLeft: 26 }}>
        {steps.map((step) => (
          <li key={step.title} style={{ marginBottom: 18 }}>
            <h3
              style={{
                marginTop: 0,
                marginBottom: 5,
                display: "flex",
                alignItems: "center",
                gap: 9,
              }}
            >
              <step.icon size={18} className="text-[#B9820A]" aria-hidden="true" />
              <strong>{step.title}</strong>
            </h3>
            <p style={{ margin: 0 }}>{step.description}</p>
          </li>
        ))}
      </ol>

      <div className="doc-callout">
        <div className="doc-callout-k">See it in motion</div>
        <p style={{ margin: "0 0 12px" }}>
          Prefer to watch the pipeline run end to end? The full walkthrough covers
          each step above, from creating a flow to storing and acting on the data.
        </p>
        <Link
          href="/videos/demo_video.mp4"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FFC53D] text-[#0E1C2B] rounded-lg text-[15px] font-bold shadow-[0_2px_0_#B9820A] hover:brightness-105 transition-all no-underline"
        >
          <Play size={18} />
          Watch Demo Video
        </Link>
      </div>
    </DocPage>
  );
}
