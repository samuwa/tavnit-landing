import Link from "next/link";
import { Check, Tag } from "lucide-react";
import { DocPage } from "./DocumentShell";

/* Pricing section, typeset as a printed rate card: the eyebrow + heading + deck,
   the four plans set as a plan-per-column comparison table (price, credits,
   base + bonus, and page capacity per plan), the Enterprise column marked BEST
   VALUE, the extra-credits note as a callout, then the "Everything Included"
   list. Same copy as the spreadsheet's Pricing section. */

type Plan = {
  name: string;
  price: string;
  credits: string;
  breakdown: string;
  bonus: string | null;
  value: string;
  featured: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$16",
    credits: "100",
    breakdown: "100 base credits",
    bonus: null,
    value: "= 100 pages (extraction & cleaning)",
    featured: false,
  },
  {
    name: "Growth",
    price: "$77",
    credits: "550",
    breakdown: "450 base + ",
    bonus: "100 bonus",
    value: "= 550 pages (extraction & cleaning)",
    featured: false,
  },
  {
    name: "Pro",
    price: "$138",
    credits: "1,150",
    breakdown: "850 base + ",
    bonus: "300 bonus",
    value: "= 1,150 pages (extraction & cleaning)",
    featured: false,
  },
  {
    name: "Enterprise",
    price: "$599",
    credits: "6,000",
    breakdown: "4,000 base + ",
    bonus: "2,000 bonus",
    value: "= 6,000 pages (extraction & cleaning)",
    featured: true,
  },
];

const includedFeatures = [
  "Unlimited flows",
  "Unlimited team members",
  "AI field discovery",
  "CSV exports",
  "API & webhook access",
  "Email triggers",
  "Data cleaning with Cleaners",
  "Direct database queries (JSONB)",
];

const mono = { fontFamily: "var(--font-mono)" } as const;
const center = { textAlign: "center" as const };
const goldCell = { textAlign: "center" as const, background: "var(--gold-wash)" };

export default function DocPricing({ n, of }: { n: number; of: number }) {
  return (
    <DocPage id="pricing" n={n} of={of} ariaLabelledby="doc-pricing-heading">
      <div className="doc-eyebrow" style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <Tag size={13} aria-hidden="true" />
        Plans &amp; pricing
      </div>

      <h2 id="doc-pricing-heading">Simple, Transparent Pricing</h2>

      <p className="doc-lead">Monthly plans with flexible credits</p>

      <p>
        Every plan is a flat monthly subscription with a pool of credits. One
        credit processes one page — extraction and cleaning included — so the
        credits you get each month translate directly into pages. Larger plans
        add <strong>bonus</strong> credits on top of their base allotment.
      </p>

      {/* The four plans, set as a plan-per-column rate card */}
      <div style={{ overflowX: "auto" }}>
        <table className="doc-table">
          <thead>
            <tr>
              <th scope="col" style={{ ...mono, fontSize: 12, letterSpacing: "0.08em" }}>
                Plan
              </th>
              {plans.map((p) => (
                <th
                  key={p.name}
                  scope="col"
                  style={p.featured ? { ...center, background: "var(--gold-wash)" } : center}
                >
                  <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                    <span>{p.name}</span>
                    {p.featured && (
                      <span className="inline-block px-2 py-0.5 bg-[#FFC53D] text-[#0E1C2B] text-[9px] font-bold uppercase tracking-wider rounded-[4px] shadow-[0_2px_0_#B9820A] whitespace-nowrap">
                        BEST VALUE
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Monthly price */}
            <tr>
              <th scope="row">Price</th>
              {plans.map((p) => (
                <td key={p.name} style={p.featured ? goldCell : center}>
                  <span className="font-heading font-extrabold gradient-text" style={{ fontSize: 22 }}>
                    {p.price}
                  </span>
                  <span className="font-semibold text-[#6B7686]" style={{ fontSize: 13 }}>
                    /mo
                  </span>
                </td>
              ))}
            </tr>

            {/* Monthly credits */}
            <tr>
              <th scope="row">Credits</th>
              {plans.map((p) => (
                <td key={p.name} style={p.featured ? goldCell : center}>
                  <span className="font-heading font-bold text-[#0E1C2B]" style={{ fontSize: 17 }}>
                    {p.credits}
                  </span>{" "}
                  <span className="text-[#6B7686] uppercase" style={{ fontSize: 11, letterSpacing: "0.06em" }}>
                    credits/mo
                  </span>
                </td>
              ))}
            </tr>

            {/* Base + bonus breakdown */}
            <tr>
              <th scope="row">Base + bonus</th>
              {plans.map((p) => (
                <td key={p.name} style={p.featured ? goldCell : center}>
                  {p.breakdown}
                  {p.bonus && (
                    <span style={{ color: "var(--gold-deep)", fontWeight: 600 }}>{p.bonus}</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Page capacity */}
            <tr>
              <th scope="row">Capacity</th>
              {plans.map((p) => (
                <td key={p.name} style={p.featured ? goldCell : center}>
                  {p.value}
                </td>
              ))}
            </tr>

            {/* Sign-up CTA per plan */}
            <tr>
              <th scope="row">Sign up</th>
              {plans.map((p) => (
                <td key={p.name} style={p.featured ? goldCell : center}>
                  <Link
                    href="https://app.tavnit.io"
                    className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-[13px] no-underline transition-all whitespace-nowrap ${
                      p.featured
                        ? "bg-[#FFC53D] text-[#0E1C2B] font-bold shadow-[inset_0_0_0_1px_#B9820A] hover:brightness-105"
                        : "bg-white text-[#1B2E44] font-semibold shadow-[inset_0_0_0_1px_#C9CFD8] hover:bg-[#FFF6DE] hover:shadow-[inset_0_0_0_1px_#0E1C2B]"
                    }`}
                  >
                    Get Started
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Extra-credits note */}
      <div className="doc-callout">
        <div className="doc-callout-k">Extra credits</div>
        <p style={{ margin: 0 }}>
          Need more? Buy extra credits at $0.16/credit (minimum 50 credits) on
          top of any plan.
        </p>
      </div>

      <hr />

      {/* Everything included across every plan */}
      <h3 id="doc-pricing-included">Everything Included in All Plans:</h3>

      <div className="doc-cols" style={{ marginTop: 10 }}>
        {[includedFeatures.slice(0, 4), includedFeatures.slice(4)].map((col, ci) => (
          <ul key={ci} style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
            {col.map((f) => (
              <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                <Check size={17} className="text-[#17A67B]" style={{ flexShrink: 0, marginTop: 3 }} aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </DocPage>
  );
}
