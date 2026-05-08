"use client";

import { Zap, Clock, HeadphonesIcon, Timer } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$299",
    monthly: "$49/mo",
    value: "$800/mo",
    featured: false,
    bullets: [
      "10 hrs/week saved",
      "$800/mo labour replaced",
      "$9,600/yr saving",
    ],
    payback: "Pays back in week 1 · 16x return",
    costBar: 348, // 299 + 49
    valueBar: 800,
  },
  {
    name: "Growth",
    price: "$799",
    monthly: "$99/mo",
    value: "$2,400/mo",
    featured: true,
    bullets: [
      "100% leads auto-qualified",
      "60% support cost cut",
      "$28,800/yr saving",
    ],
    payback: "Pays back in week 2 · 24x return",
    costBar: 898,
    valueBar: 2400,
  },
  {
    name: "Full Stack",
    price: "$1,299",
    monthly: "$149/mo",
    value: "$5,000+/mo",
    featured: false,
    bullets: [
      "6 agents running 24/7",
      "80% support resolved by AI",
      "$60,000+/yr saving",
    ],
    payback: "Pays back in week 3 · 33x return",
    costBar: 1448,
    valueBar: 5000,
  },
];

const metrics = [
  {
    icon: <Zap className="w-5 h-5 text-[#1D9E75]" />,
    label: "Labour replaced",
    value: "$800–$5k/mo in staff hours saved",
  },
  {
    icon: <Clock className="w-5 h-5 text-[#1D9E75]" />,
    label: "Leads never missed",
    value: "24/7 AI responds in under 60 seconds",
  },
  {
    icon: <HeadphonesIcon className="w-5 h-5 text-[#1D9E75]" />,
    label: "Support cost cut",
    value: "60% — 80% of tickets resolved with zero humans",
  },
  {
    icon: <Timer className="w-5 h-5 text-[#1D9E75]" />,
    label: "Speed to lead",
    value: "5 min vs. industry avg of 47 hours",
  },
];

const maxBar = 5000;

export default function ROISection() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 border-t border-white/[0.06] relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-20 text-center gsap-fade-up">
          <p className="text-xs font-space-grotesk tracking-widest uppercase text-purple-400 mb-4">
            Return on Investment
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-syne tracking-tight text-white mb-4">
            What you actually <span className="text-[#888]">get back</span>
          </h2>
          <p className="text-base md:text-xl text-[#bbb] font-light max-w-3xl mx-auto">
            Every dollar you invest, here&apos;s what it returns — in real
            business value.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 gsap-fade-up">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative flex flex-col rounded-2xl p-8 border transition-all duration-300 ${
                plan.featured
                  ? "border-[#7F77DD] bg-white/[0.04]"
                  : "border-white/[0.08] bg-white/[0.02]"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#7F77DD] text-white text-[10px] font-space-grotesk font-bold tracking-widest uppercase">
                  Best ROI
                </div>
              )}

              {/* Plan name + pricing */}
              <div className="mb-6">
                <h3 className="text-xl font-black font-syne text-white mb-1">
                  {plan.name}
                </h3>
                <div className="text-sm text-[#888] font-space-grotesk">
                  {plan.price}{" "}
                  <span className="text-[#555]">+ {plan.monthly}</span>
                </div>
              </div>

              {/* Value highlight */}
              <div className="flex items-center gap-2 mb-6 px-4 py-3 rounded-xl bg-[#1D9E75]/10 border border-[#1D9E75]/20">
                <Zap className="w-4 h-4 text-[#1D9E75] shrink-0" />
                <span className="text-[#1D9E75] text-lg font-black font-syne">
                  {plan.value}
                </span>
                <span className="text-[#888] text-xs font-space-grotesk">
                  value
                </span>
              </div>

              {/* Bullet points */}
              <ul className="space-y-3 flex-grow mb-6">
                {plan.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-[#bbb] text-sm font-space-grotesk"
                  >
                    <span className="text-[#1D9E75] mt-0.5">✓</span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* Payback line */}
              <div className="text-xs text-[#888] font-space-grotesk border-t border-white/[0.06] pt-4 text-center">
                {plan.payback}
              </div>
            </div>
          ))}
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 gsap-fade-up">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                {m.icon}
                <span className="text-white text-sm font-bold font-syne">
                  {m.label}
                </span>
              </div>
              <p className="text-[#888] text-sm font-space-grotesk leading-relaxed">
                {m.value}
              </p>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 mb-8 gsap-fade-up">
          <h3 className="text-lg font-bold font-syne text-white mb-2">
            Cost vs. Value
          </h3>
          <p className="text-sm text-[#888] font-space-grotesk mb-8">
            Monthly cost compared to monthly value returned
          </p>

          <div className="space-y-8">
            {plans.map((plan, i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-syne font-bold">
                    {plan.name}
                  </span>
                  <span className="text-[#888] text-xs font-space-grotesk">
                    {plan.value}/mo value
                  </span>
                </div>
                {/* Cost bar */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-[#888] font-space-grotesk tracking-widest uppercase w-12 shrink-0">
                    Cost
                  </span>
                  <div className="flex-1 h-6 rounded bg-white/[0.04] overflow-hidden">
                    <div
                      className="h-full rounded bg-[#555]"
                      style={{
                        width: `${(plan.costBar / maxBar) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-[#888] text-xs font-space-grotesk w-20 text-right">
                    ${plan.costBar.toLocaleString()}
                  </span>
                </div>
                {/* Value bar */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-[#888] font-space-grotesk tracking-widest uppercase w-12 shrink-0">
                    Value
                  </span>
                  <div className="flex-1 h-6 rounded bg-white/[0.04] overflow-hidden">
                    <div
                      className="h-full rounded bg-[#1D9E75]"
                      style={{
                        width: `${(plan.valueBar / maxBar) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-[#1D9E75] text-xs font-space-grotesk font-semibold w-20 text-right">
                    ${plan.valueBar.toLocaleString()}+
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#555]" />
              <span className="text-[#888] text-xs font-space-grotesk">
                Monthly cost
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#1D9E75]" />
              <span className="text-[#888] text-xs font-space-grotesk">
                Monthly value
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[#555] text-xs font-space-grotesk text-center max-w-3xl mx-auto leading-relaxed gsap-fade-up">
          Estimates based on avg. US labour costs ($20/hr), industry lead
          response benchmarks, and client results. Actual returns vary by
          business size and niche.
        </p>
      </div>
    </section>
  );
}
