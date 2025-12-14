// ==========================================
// WORKFLOW ANIMATION - HOW IT WORKS
// Premium mini document extraction flow
// ==========================================

function initWorkflowAnimation() {
  const container = document.getElementById('workflow-animation-container');
  if (!container || container.dataset.animationInitialized) return;

  container.dataset.animationInitialized = 'true';
  container.innerHTML = '';

  // Create animation structure
  const animationWrapper = document.createElement('div');
  animationWrapper.className = 'workflow-animation-wrapper';
  animationWrapper.style.cssText = `
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 3rem;
    align-items: center;
    padding: 3rem 2rem;
    position: relative;
    background: white;
    border-radius: 16px;
    margin: 2rem 0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  `;

  // Create mini PDF document
  const pdfDoc = createMiniPDF();
  animationWrapper.appendChild(pdfDoc);

  // Create processing indicator
  const processor = createProcessor();
  animationWrapper.appendChild(processor);

  // Create result table
  const resultTable = createResultTable();
  animationWrapper.appendChild(resultTable);

  container.appendChild(animationWrapper);

  // Create extraction particles
  createExtractionParticles(animationWrapper);

  // Start animation loop
  setTimeout(() => runWorkflowAnimation(), 1000);
}

function createMiniPDF() {
  const pdf = document.createElement('div');
  pdf.className = 'mini-pdf';
  pdf.id = 'mini-pdf';
  pdf.style.cssText = `
    background: white;
    border: 2px solid #d1d5db;
    border-radius: 8px;
    padding: 1rem;
    width: 180px;
    height: 240px;
    position: relative;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  `;

  pdf.innerHTML = `
    <!-- PDF Header -->
    <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid #e5e7eb;">
      <div>
        <div class="pdf-line" style="height: 8px; width: 60px; background: #d1d5db; border-radius: 4px; margin-bottom: 4px;"></div>
        <div class="pdf-line" style="height: 6px; width: 80px; background: #e5e7eb; border-radius: 3px;"></div>
      </div>
      <div style="width: 24px; height: 24px; border: 1px solid #d1d5db; border-radius: 2px;"></div>
    </div>

    <!-- PDF Fields -->
    <div style="margin-bottom: 1rem;">
      <div class="pdf-field" data-field="0" style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
        <div class="field-label" style="height: 6px; width: 40px; background: #9ca3af; border-radius: 3px;"></div>
        <div class="field-value" style="height: 6px; width: 50px; background: #d1d5db; border-radius: 3px;"></div>
      </div>
      <div class="pdf-field" data-field="1" style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
        <div class="field-label" style="height: 6px; width: 40px; background: #9ca3af; border-radius: 3px;"></div>
        <div class="field-value" style="height: 6px; width: 50px; background: #d1d5db; border-radius: 3px;"></div>
      </div>
      <div class="pdf-field" data-field="2" style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
        <div class="field-label" style="height: 6px; width: 40px; background: #9ca3af; border-radius: 3px;"></div>
        <div class="field-value" style="height: 6px; width: 50px; background: #d1d5db; border-radius: 3px;"></div>
      </div>
    </div>

    <!-- PDF Table -->
    <div style="border: 1px solid #e5e7eb; border-radius: 4px; overflow: hidden;">
      <div style="display: flex; background: #f9fafb; border-bottom: 1px solid #e5e7eb; padding: 0.25rem;">
        <div style="flex: 1; height: 4px; background: #d1d5db; border-radius: 2px; margin: 0 2px;"></div>
        <div style="flex: 1; height: 4px; background: #d1d5db; border-radius: 2px; margin: 0 2px;"></div>
      </div>
      <div class="pdf-table-row" data-row="0" style="display: flex; border-bottom: 1px solid #e5e7eb; padding: 0.25rem;">
        <div style="flex: 1; height: 4px; background: #e5e7eb; border-radius: 2px; margin: 0 2px;"></div>
        <div style="flex: 1; height: 4px; background: #e5e7eb; border-radius: 2px; margin: 0 2px;"></div>
      </div>
      <div class="pdf-table-row" data-row="1" style="display: flex; padding: 0.25rem;">
        <div style="flex: 1; height: 4px; background: #e5e7eb; border-radius: 2px; margin: 0 2px;"></div>
        <div style="flex: 1; height: 4px; background: #e5e7eb; border-radius: 2px; margin: 0 2px;"></div>
      </div>
    </div>

    <!-- Scan overlay -->
    <div class="scan-overlay" id="scan-overlay" style="
      position: absolute;
      inset: 0;
      border: 2px solid #667eea;
      border-radius: 8px;
      opacity: 0;
      pointer-events: none;
    "></div>

    <!-- Scan line -->
    <div class="scan-line" id="scan-line" style="
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #667eea, transparent);
      opacity: 0;
      pointer-events: none;
      top: 0;
    "></div>
  `;

  return pdf;
}

function createProcessor() {
  const processor = document.createElement('div');
  processor.className = 'workflow-processor';
  processor.id = 'workflow-processor';
  processor.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  `;

  processor.innerHTML = `
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" stroke="#e5e7eb" stroke-width="2"/>
      <circle id="processor-ring" cx="24" cy="24" r="20" stroke="url(#processor-gradient)" stroke-width="2"
        stroke-dasharray="125.6" stroke-dashoffset="125.6" transform="rotate(-90 24 24)"/>
      <defs>
        <linearGradient id="processor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#667eea"/>
          <stop offset="100%" stop-color="#764ba2"/>
        </linearGradient>
      </defs>
    </svg>
    <div id="processor-text" style="font-size: 11px; font-weight: 600; color: #9ca3af; opacity: 0;">Processing...</div>
  `;

  return processor;
}

function createResultTable() {
  const table = document.createElement('div');
  table.className = 'result-table';
  table.id = 'result-table';
  table.style.cssText = `
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
    width: 180px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  `;

  table.innerHTML = `
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background: #f9fafb;">
          <th style="padding: 0.5rem; font-size: 10px; font-weight: 600; color: #6b7280; text-align: left; border-bottom: 2px solid #e5e7eb;">Field</th>
          <th style="padding: 0.5rem; font-size: 10px; font-weight: 600; color: #6b7280; text-align: left; border-bottom: 2px solid #e5e7eb;">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr class="result-row" data-result="0">
          <td style="padding: 0.5rem;">
            <div class="result-label" style="height: 6px; width: 40px; background: #e5e7eb; border-radius: 3px;"></div>
          </td>
          <td style="padding: 0.5rem;">
            <div class="result-value" style="height: 6px; width: 50px; background: #e5e7eb; border-radius: 3px;"></div>
          </td>
        </tr>
        <tr class="result-row" data-result="1">
          <td style="padding: 0.5rem; border-top: 1px solid #e5e7eb;">
            <div class="result-label" style="height: 6px; width: 40px; background: #e5e7eb; border-radius: 3px;"></div>
          </td>
          <td style="padding: 0.5rem; border-top: 1px solid #e5e7eb;">
            <div class="result-value" style="height: 6px; width: 50px; background: #e5e7eb; border-radius: 3px;"></div>
          </td>
        </tr>
        <tr class="result-row" data-result="2">
          <td style="padding: 0.5rem; border-top: 1px solid #e5e7eb;">
            <div class="result-label" style="height: 6px; width: 40px; background: #e5e7eb; border-radius: 3px;"></div>
          </td>
          <td style="padding: 0.5rem; border-top: 1px solid #e5e7eb;">
            <div class="result-value" style="height: 6px; width: 50px; background: #e5e7eb; border-radius: 3px;"></div>
          </td>
        </tr>
        <tr class="result-row" data-result="3">
          <td style="padding: 0.5rem; border-top: 1px solid #e5e7eb;">
            <div class="result-label" style="height: 6px; width: 40px; background: #e5e7eb; border-radius: 3px;"></div>
          </td>
          <td style="padding: 0.5rem; border-top: 1px solid #e5e7eb;">
            <div class="result-value" style="height: 6px; width: 50px; background: #e5e7eb; border-radius: 3px;"></div>
          </td>
        </tr>
        <tr class="result-row" data-result="4">
          <td style="padding: 0.5rem; border-top: 1px solid #e5e7eb;">
            <div class="result-label" style="height: 6px; width: 40px; background: #e5e7eb; border-radius: 3px;"></div>
          </td>
          <td style="padding: 0.5rem; border-top: 1px solid #e5e7eb;">
            <div class="result-value" style="height: 6px; width: 50px; background: #e5e7eb; border-radius: 3px;"></div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="complete-indicator" id="complete-indicator" style="
      background: #ecfdf5;
      border-top: 2px solid #a7f3d0;
      padding: 0.5rem;
      font-size: 10px;
      font-weight: 600;
      color: #047857;
      text-align: center;
      opacity: 0;
    ">✓ Extraction Complete</div>
  `;

  return table;
}

function createExtractionParticles(wrapper) {
  for (let i = 0; i < 5; i++) {
    const particle = document.createElement('div');
    particle.className = 'extraction-particle';
    particle.dataset.index = i;
    particle.style.cssText = `
      position: absolute;
      display: flex;
      gap: 4px;
      opacity: 0;
      pointer-events: none;
      z-index: 10;
    `;

    particle.innerHTML = `
      <div style="height: 6px; width: 40px; background: linear-gradient(90deg, #8b5cf6, #06b6d4); border-radius: 3px; box-shadow: 0 2px 8px rgba(139, 92, 246, 0.4);"></div>
      <div style="height: 6px; width: 50px; background: linear-gradient(90deg, #667eea, #764ba2); border-radius: 3px; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);"></div>
    `;

    wrapper.appendChild(particle);
  }
}

function runWorkflowAnimation() {
  if (typeof anime === 'undefined') {
    console.error('Anime.js not loaded');
    return;
  }

  const timeline = anime.timeline({
    easing: 'easeOutExpo',
    complete: function() {
      setTimeout(() => runWorkflowAnimation(), 2500);
    }
  });

  // Reset
  resetWorkflowAnimation();

  // Stage 1: Scan border appears (0-400ms)
  timeline.add({
    targets: '#scan-overlay',
    opacity: [0, 1],
    duration: 400
  }, 0);

  // Stage 2: Scan line moves down (500-2000ms)
  timeline.add({
    targets: '#scan-line',
    opacity: [0, 1, 1, 0],
    top: ['0%', '0%', '100%', '100%'],
    duration: 1500,
    easing: 'linear'
  }, 500);

  // Stage 3: Processing ring animates (500-2500ms)
  timeline.add({
    targets: '#processor-ring',
    strokeDashoffset: [125.6, 0],
    duration: 2000,
    easing: 'easeInOutQuad'
  }, 500);

  timeline.add({
    targets: '#processor-text',
    opacity: [0, 1],
    duration: 300
  }, 500);

  // Stage 4: Extract fields one by one (2000-4500ms)
  for (let i = 0; i < 5; i++) {
    const delay = 2000 + (i * 500);

    // Highlight source field
    if (i < 3) {
      timeline.add({
        targets: `.pdf-field[data-field="${i}"]`,
        opacity: [1, 0.3],
        duration: 200
      }, delay);
    } else {
      timeline.add({
        targets: `.pdf-table-row[data-row="${i - 3}"]`,
        opacity: [1, 0.3],
        duration: 200
      }, delay);
    }

    // Fly particle
    timeline.add({
      targets: `.extraction-particle[data-index="${i}"]`,
      opacity: [0, 1, 1, 0],
      duration: 800,
      easing: 'easeInOutCubic',
      begin: function(anim) {
        const particle = document.querySelector(`.extraction-particle[data-index="${i}"]`);
        const pdf = document.getElementById('mini-pdf');
        const table = document.getElementById('result-table');
        const wrapper = pdf.closest('.workflow-animation-wrapper');

        const pdfRect = pdf.getBoundingClientRect();
        const tableRect = table.getBoundingClientRect();
        const wrapperRect = wrapper.getBoundingClientRect();

        const startX = pdfRect.left - wrapperRect.left + pdfRect.width / 2;
        const startY = pdfRect.top - wrapperRect.top + 60 + (i * 20);

        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
      }
    }, delay + 200);

    timeline.add({
      targets: `.extraction-particle[data-index="${i}"]`,
      translateX: function() {
        const particle = document.querySelector(`.extraction-particle[data-index="${i}"]`);
        const table = document.getElementById('result-table');
        const pdfX = parseFloat(particle.style.left);
        const tableRect = table.getBoundingClientRect();
        const wrapperRect = table.closest('.workflow-animation-wrapper').getBoundingClientRect();
        const targetX = tableRect.left - wrapperRect.left + 20;
        return targetX - pdfX;
      },
      translateY: [0, -15, 0],
      duration: 800,
      easing: 'easeInOutCubic'
    }, delay + 200);

    // Fill result row
    timeline.add({
      targets: `.result-row[data-result="${i}"] .result-label`,
      background: ['#e5e7eb', 'linear-gradient(90deg, #8b5cf6, #06b6d4)'],
      duration: 300
    }, delay + 900);

    timeline.add({
      targets: `.result-row[data-result="${i}"] .result-value`,
      background: ['#e5e7eb', 'linear-gradient(90deg, #667eea, #764ba2)'],
      duration: 300
    }, delay + 900);
  }

  // Stage 5: Complete indicator (4500ms)
  timeline.add({
    targets: '#complete-indicator',
    opacity: [0, 1],
    translateY: [-10, 0],
    duration: 400,
    easing: 'easeOutBack'
  }, 4500);

  timeline.add({
    targets: '#scan-overlay',
    opacity: [1, 0],
    duration: 300
  }, 4500);

  timeline.add({
    targets: '#processor-text',
    opacity: [1, 0],
    duration: 300
  }, 4500);
}

function resetWorkflowAnimation() {
  anime.set('#scan-overlay', { opacity: 0 });
  anime.set('#scan-line', { opacity: 0, top: '0%' });
  anime.set('#processor-ring', { strokeDashoffset: 125.6 });
  anime.set('#processor-text', { opacity: 0 });
  anime.set('.pdf-field', { opacity: 1 });
  anime.set('.pdf-table-row', { opacity: 1 });
  anime.set('.extraction-particle', { opacity: 0, translateX: 0, translateY: 0 });
  anime.set('.result-label', { background: '#e5e7eb' });
  anime.set('.result-value', { background: '#e5e7eb' });
  anime.set('#complete-indicator', { opacity: 0, translateY: -10 });
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('workflow-animation-container');
    if (container) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.dataset.animationInitialized) {
            initWorkflowAnimation();
            observer.disconnect();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(container);
    }
  });
} else {
  const container = document.getElementById('workflow-animation-container');
  if (container) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animationInitialized) {
          initWorkflowAnimation();
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });
    observer.observe(container);
  }
}
