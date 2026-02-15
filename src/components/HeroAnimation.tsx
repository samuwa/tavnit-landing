"use client";

import { useEffect, useRef, useCallback } from "react";

const FIELDS = ["Order Number", "Order Date", "Supplier", "Item"];

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const cleanup = useCallback(() => {
    if (animationRef.current) clearTimeout(animationRef.current);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Build the animation DOM
    container.innerHTML = "";
    const wrapper = buildAnimation(container);

    // Start animation loop
    const timeout = setTimeout(() => runAnimation(wrapper), 500);
    animationRef.current = timeout;

    return () => {
      cleanup();
      container.innerHTML = "";
    };
  }, [cleanup]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center min-h-[280px] md:min-h-[420px] overflow-visible"
    />
  );
}

function getResponsiveGap() {
  const w = window.innerWidth;
  if (w <= 380) return "0.5rem";
  if (w <= 480) return "0.75rem";
  if (w <= 768) return "1.5rem";
  return "3rem";
}

function buildAnimation(container: HTMLDivElement): HTMLDivElement {
  const wrapper = document.createElement("div");
  wrapper.className = "animation-wrapper";
  wrapper.style.cssText = `
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: ${getResponsiveGap()};
    align-items: start;
    position: relative;
    padding: 0.5rem 0;
  `;

  wrapper.appendChild(createPDF());
  wrapper.appendChild(createArrow());
  wrapper.appendChild(createTable());
  container.appendChild(wrapper);
  createParticles(wrapper);

  return wrapper;
}

function createPDF(): HTMLDivElement {
  const pdf = document.createElement("div");
  pdf.className = "pdf-doc";
  pdf.id = "pdf-hero";
  pdf.innerHTML = `
    <div style="display:flex;justify-content:space-between;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:1px solid rgba(255,255,255,0.08);">
      <div>
        <div id="pdf-header-title-hero" style="height:12px;width:100px;background:rgba(255,255,255,0.15);border-radius:4px;margin-bottom:8px;"></div>
        <div style="height:8px;width:130px;background:rgba(255,255,255,0.08);border-radius:4px;"></div>
      </div>
      <div style="width:48px;height:48px;border:1px solid rgba(255,255,255,0.12);border-radius:6px;"></div>
    </div>
    <div id="pdf-fields-hero">
      ${FIELDS.map(
        (_, i) => `
        <div class="pdf-field" id="pdf-field-hero-${i}">
          <div class="pdf-label"></div>
          <div class="pdf-value"></div>
        </div>`
      ).join("")}
    </div>
    <div style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,0.08);">
      <div id="pdf-footer-text-hero" style="height:8px;width:100%;background:rgba(255,255,255,0.08);border-radius:4px;margin-bottom:8px;"></div>
      <div style="height:8px;width:75%;background:rgba(255,255,255,0.08);border-radius:4px;margin-bottom:8px;"></div>
      <div style="height:8px;width:85%;background:rgba(255,255,255,0.08);border-radius:4px;"></div>
    </div>
    <div class="scan-border" id="scan-border-hero"></div>
  `;
  return pdf;
}

function createArrow(): HTMLDivElement {
  const section = document.createElement("div");
  section.className = "arrow-section";
  section.innerHTML = `
    <svg id="arrow-hero" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#667eea" stroke-width="2">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
    <div id="processing-hero" style="text-align:center;opacity:0;">
      <div class="processing-text">AI Processing</div>
      <div style="display:flex;gap:4px;justify-content:center;margin-top:4px;">
        <div style="width:4px;height:4px;border-radius:50%;background:linear-gradient(90deg,#667eea,#764ba2);"></div>
        <div style="width:4px;height:4px;border-radius:50%;background:linear-gradient(90deg,#667eea,#764ba2);"></div>
        <div style="width:4px;height:4px;border-radius:50%;background:linear-gradient(90deg,#667eea,#764ba2);"></div>
      </div>
    </div>
  `;
  return section;
}

function createTable(): HTMLDivElement {
  const table = document.createElement("div");
  table.className = "table-doc";
  table.id = "table-hero";

  const headerRow = `<tr>
    <td><div class="target-label" id="target-meta-label-hero-0"></div></td>
    <td><div class="target-bar" id="target-meta-hero-0"></div></td>
  </tr>`;

  const fieldRows = FIELDS.map(
    (_, i) => `<tr>
      <td><div class="target-label" id="target-label-hero-${i}"></div></td>
      <td><div class="target-bar" id="target-hero-${i}"></div></td>
    </tr>`
  ).join("");

  const footerRow = `<tr>
    <td><div class="target-label" id="target-meta-label-hero-1"></div></td>
    <td><div class="target-bar" id="target-meta-hero-1"></div></td>
  </tr>`;

  table.innerHTML = `
    <table>
      <thead><tr><th style="color:#94a3b8">Field</th><th style="color:#94a3b8">Value</th></tr></thead>
      <tbody id="table-body-hero">${headerRow}${fieldRows}${footerRow}</tbody>
    </table>
    <div class="complete-banner" id="complete-banner-hero">&#10003; Extraction complete</div>
  `;
  return table;
}

function createParticles(wrapper: HTMLDivElement) {
  // Metadata particles (header + footer)
  for (let i = 0; i < 2; i++) {
    const lp = document.createElement("div");
    lp.className = "particle-label";
    lp.id = `particle-meta-label-hero-${i}`;
    lp.innerHTML = `<div class="particle-label-bar"></div>`;
    wrapper.appendChild(lp);

    const vp = document.createElement("div");
    vp.className = "particle";
    vp.id = `particle-meta-hero-${i}`;
    vp.innerHTML = `<div class="particle-bar particle-bar-1"></div><div class="particle-bar particle-bar-2"></div>`;
    wrapper.appendChild(vp);
  }

  // Field particles
  FIELDS.forEach((_, i) => {
    const lp = document.createElement("div");
    lp.className = "particle-label";
    lp.id = `particle-label-hero-${i}`;
    lp.innerHTML = `<div class="particle-label-bar"></div>`;
    wrapper.appendChild(lp);

    const vp = document.createElement("div");
    vp.className = "particle";
    vp.id = `particle-hero-${i}`;
    vp.innerHTML = `<div class="particle-bar particle-bar-1"></div><div class="particle-bar particle-bar-2"></div>`;
    wrapper.appendChild(vp);
  });
}

function runAnimation(wrapper: HTMLDivElement) {
  const el = (id: string) => document.getElementById(id);

  // Reset everything
  const scanBorder = el("scan-border-hero");
  const processing = el("processing-hero");
  const completeBanner = el("complete-banner-hero");
  const arrow = el("arrow-hero");

  if (!scanBorder || !processing || !completeBanner || !arrow) return;

  scanBorder.style.opacity = "0";
  processing.style.opacity = "0";
  completeBanner.style.opacity = "0";
  arrow.style.animation = "none";

  const headerTitle = el("pdf-header-title-hero");
  const footerText = el("pdf-footer-text-hero");
  if (headerTitle) headerTitle.style.opacity = "1";
  if (footerText) footerText.style.opacity = "1";

  // Reset metadata
  for (let i = 0; i < 2; i++) {
    const tb = el(`target-meta-hero-${i}`);
    const tl = el(`target-meta-label-hero-${i}`);
    if (tb) tb.className = "target-bar";
    if (tl) tl.className = "target-label";

    const pb = el(`particle-meta-hero-${i}`);
    const pl = el(`particle-meta-label-hero-${i}`);
    if (pb) { pb.style.opacity = "0"; pb.style.animation = "none"; }
    if (pl) { pl.style.opacity = "0"; pl.style.animation = "none"; }
  }

  // Reset fields
  FIELDS.forEach((_, i) => {
    const field = el(`pdf-field-hero-${i}`);
    if (field) field.style.opacity = "1";

    const tb = el(`target-hero-${i}`);
    const tl = el(`target-label-hero-${i}`);
    if (tb) tb.className = "target-bar";
    if (tl) tl.className = "target-label";

    const pb = el(`particle-hero-${i}`);
    const pl = el(`particle-label-hero-${i}`);
    if (pb) { pb.style.opacity = "0"; pb.style.animation = "none"; }
    if (pl) { pl.style.opacity = "0"; pl.style.animation = "none"; }
  });

  // Stage 1: Scan border (800ms)
  setTimeout(() => {
    scanBorder.style.opacity = "1";
    scanBorder.style.animation = "fadeIn 0.3s ease";
    processing.style.opacity = "1";
    processing.style.animation = "fadeIn 0.3s ease";
  }, 800);

  // Stage 2: Particles fly (1600ms)
  setTimeout(() => {
    arrow.style.animation = "arrowBounce 1s ease-in-out infinite";
    const wrapperRect = wrapper.getBoundingClientRect();

    // Header metadata
    animateMetadata(0, "pdf-header-title-hero", wrapperRect, 0);
    // Footer metadata
    animateMetadata(1, "pdf-footer-text-hero", wrapperRect, (FIELDS.length + 1) * 150);

    // Fields
    FIELDS.forEach((_, i) => {
      animateField(i, wrapperRect, (i + 1) * 150);
    });
  }, 1600);

  // Stage 3: Complete banner
  const completeTime = 1600 + 300 + FIELDS.length * 150 + 1200;
  setTimeout(() => {
    completeBanner.style.opacity = "1";
    completeBanner.style.animation = "fadeIn 0.3s ease";
  }, completeTime);

  // Loop
  setTimeout(() => {
    runAnimation(wrapper);
  }, completeTime + 2000);
}

function animateMetadata(index: number, sourceId: string, wrapperRect: DOMRect, delay: number) {
  setTimeout(() => {
    const source = document.getElementById(sourceId);
    if (!source) return;

    source.style.opacity = "0.3";
    source.style.transition = "opacity 0.3s";

    const sourceRect = source.getBoundingClientRect();
    const targetLabel = document.getElementById(`target-meta-label-hero-${index}`);
    const targetBar = document.getElementById(`target-meta-hero-${index}`);
    if (!targetLabel || !targetBar) return;

    animateParticle(`particle-meta-label-hero-${index}`, sourceRect, targetLabel.getBoundingClientRect(), wrapperRect);
    animateParticle(`particle-meta-hero-${index}`, sourceRect, targetBar.getBoundingClientRect(), wrapperRect);

    setTimeout(() => {
      targetLabel.className = "target-label filled";
      targetLabel.style.animation = "pulse 0.3s ease";
      targetBar.className = "target-bar filled";
      targetBar.style.animation = "pulse 0.3s ease";
    }, 1000);
  }, delay);
}

function animateField(index: number, wrapperRect: DOMRect, delay: number) {
  setTimeout(() => {
    const field = document.getElementById(`pdf-field-hero-${index}`);
    if (!field) return;

    field.style.opacity = "0.3";
    field.style.transition = "opacity 0.3s";

    const label = field.querySelector(".pdf-label") as HTMLElement;
    const value = field.querySelector(".pdf-value") as HTMLElement;
    const targetLabel = document.getElementById(`target-label-hero-${index}`);
    const targetBar = document.getElementById(`target-hero-${index}`);
    if (!label || !value || !targetLabel || !targetBar) return;

    animateParticle(`particle-label-hero-${index}`, label.getBoundingClientRect(), targetLabel.getBoundingClientRect(), wrapperRect);
    animateParticle(`particle-hero-${index}`, value.getBoundingClientRect(), targetBar.getBoundingClientRect(), wrapperRect);

    setTimeout(() => {
      targetLabel.className = "target-label filled";
      targetLabel.style.animation = "pulse 0.3s ease";
      targetBar.className = "target-bar filled";
      targetBar.style.animation = "pulse 0.3s ease";
    }, 1000);
  }, delay);
}

function animateParticle(particleId: string, sourceRect: DOMRect, targetRect: DOMRect, wrapperRect: DOMRect) {
  const particle = document.getElementById(particleId);
  if (!particle) return;

  const startX = sourceRect.left - wrapperRect.left + sourceRect.width / 2;
  const startY = sourceRect.top - wrapperRect.top + sourceRect.height / 2;
  const endX = targetRect.left - wrapperRect.left + targetRect.width / 2 - startX;
  const endY = targetRect.top - wrapperRect.top + targetRect.height / 2 - startY;

  particle.style.left = startX + "px";
  particle.style.top = startY + "px";
  particle.style.setProperty("--end-x", endX + "px");
  particle.style.setProperty("--end-y", endY + "px");
  particle.style.animation = "flyToTable 1.2s ease-out forwards";
}
