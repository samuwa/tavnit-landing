// ==========================================
// USE CASE ANIMATIONS - CONTEXTUAL VARIATIONS
// Customized animations for each use case
// ==========================================

function initUseCaseAnimation(type) {
  const containerId = `${type}-animation-container`;
  const container = document.getElementById(containerId);

  if (!container || container.dataset.animationInitialized) return;
  container.dataset.animationInitialized = 'true';

  // Clear container
  container.innerHTML = '';

  // Create animation based on type
  switch(type) {
    case 'invoice':
      createInvoiceAnimation(container);
      break;
    case 'contract':
      createContractAnimation(container);
      break;
    case 'form':
      createFormAnimation(container);
      break;
    case 'expense':
      createExpenseAnimation(container);
      break;
  }
}

// ==========================================
// INVOICE ANIMATION
// ==========================================
function createInvoiceAnimation(container) {
  const fields = ['Invoice #', 'Date', 'Vendor', 'Amount'];

  const wrapper = document.createElement('div');
  wrapper.className = 'usecase-animation-wrapper';
  wrapper.style.cssText = `
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 1.5rem;
    align-items: center;
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
  `;

  // Create simplified PDF
  const pdf = createSimplifiedPDF(fields, 'invoice');
  wrapper.appendChild(pdf);

  // Create arrow
  const arrow = createArrow();
  wrapper.appendChild(arrow);

  // Create simplified table
  const table = createSimplifiedTable(fields, 'invoice');
  wrapper.appendChild(table);

  container.appendChild(wrapper);

  // Create particles
  createSimpleParticles(wrapper, fields, 'invoice');

  // Start animation
  setTimeout(() => runSimpleAnimation(fields, 'invoice'), 300);
}

// ==========================================
// CONTRACT ANIMATION
// ==========================================
function createContractAnimation(container) {
  const fields = ['Parties', 'Terms', 'Date', 'Obligations'];

  const wrapper = document.createElement('div');
  wrapper.className = 'usecase-animation-wrapper';
  wrapper.style.cssText = `
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 1.5rem;
    align-items: center;
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
  `;

  const pdf = createSimplifiedPDF(fields, 'contract');
  wrapper.appendChild(pdf);

  const arrow = createArrow();
  wrapper.appendChild(arrow);

  const table = createSimplifiedTable(fields, 'contract');
  wrapper.appendChild(table);

  container.appendChild(wrapper);
  createSimpleParticles(wrapper, fields, 'contract');

  setTimeout(() => runSimpleAnimation(fields, 'contract'), 300);
}

// ==========================================
// FORM ANIMATION
// ==========================================
function createFormAnimation(container) {
  const fields = ['Name', 'Email', 'Phone', 'Address'];

  const wrapper = document.createElement('div');
  wrapper.className = 'usecase-animation-wrapper';
  wrapper.style.cssText = `
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 1.5rem;
    align-items: center;
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
  `;

  const pdf = createSimplifiedPDF(fields, 'form');
  wrapper.appendChild(pdf);

  const arrow = createArrow();
  wrapper.appendChild(arrow);

  const table = createSimplifiedTable(fields, 'form');
  wrapper.appendChild(table);

  container.appendChild(wrapper);
  createSimpleParticles(wrapper, fields, 'form');

  setTimeout(() => runSimpleAnimation(fields, 'form'), 300);
}

// ==========================================
// EXPENSE ANIMATION
// ==========================================
function createExpenseAnimation(container) {
  const fields = ['Merchant', 'Amount', 'Category', 'Date'];

  const wrapper = document.createElement('div');
  wrapper.className = 'usecase-animation-wrapper';
  wrapper.style.cssText = `
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 1.5rem;
    align-items: center;
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
  `;

  const pdf = createSimplifiedPDF(fields, 'expense');
  wrapper.appendChild(pdf);

  const arrow = createArrow();
  wrapper.appendChild(arrow);

  const table = createSimplifiedTable(fields, 'expense');
  wrapper.appendChild(table);

  container.appendChild(wrapper);
  createSimpleParticles(wrapper, fields, 'expense');

  setTimeout(() => runSimpleAnimation(fields, 'expense'), 300);
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function createSimplifiedPDF(fields, type) {
  const pdf = document.createElement('div');
  pdf.className = 'pdf-doc';
  pdf.id = `pdf-${type}`;
  pdf.style.padding = '1.25rem';

  const fieldsContainer = document.createElement('div');
  fieldsContainer.id = `pdf-fields-${type}`;

  fields.forEach((field, i) => {
    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'pdf-field';
    fieldDiv.id = `pdf-field-${type}-${i}`;
    fieldDiv.innerHTML = `
      <div class="pdf-label"></div>
      <div class="pdf-value"></div>
    `;
    fieldsContainer.appendChild(fieldDiv);
  });

  pdf.appendChild(fieldsContainer);

  const scanBorder = document.createElement('div');
  scanBorder.className = 'scan-border';
  scanBorder.id = `scan-border-${type}`;
  pdf.appendChild(scanBorder);

  return pdf;
}

function createArrow() {
  const arrow = document.createElement('div');
  arrow.style.cssText = 'display: flex; flex-direction: column; align-items: center;';
  arrow.innerHTML = `
    <svg class="usecase-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  `;
  return arrow;
}

function createSimplifiedTable(fields, type) {
  const table = document.createElement('div');
  table.className = 'table-doc';
  table.id = `table-${type}`;

  const tableHTML = document.createElement('table');
  tableHTML.innerHTML = `
    <thead>
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody id="table-body-${type}"></tbody>
  `;

  const tbody = tableHTML.querySelector('tbody');

  fields.forEach((field, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><div class="target-label" id="target-label-${type}-${i}"></div></td>
      <td><div class="target-bar" id="target-${type}-${i}"></div></td>
    `;
    tbody.appendChild(tr);
  });

  table.appendChild(tableHTML);

  const completeBanner = document.createElement('div');
  completeBanner.className = 'complete-banner';
  completeBanner.id = `complete-banner-${type}`;
  completeBanner.textContent = '✓ Extraction complete';
  table.appendChild(completeBanner);

  return table;
}

function createSimpleParticles(wrapper, fields, type) {
  fields.forEach((field, i) => {
    const labelParticle = document.createElement('div');
    labelParticle.className = 'particle-label';
    labelParticle.id = `particle-label-${type}-${i}`;
    labelParticle.innerHTML = `<div class="particle-label-bar"></div>`;
    wrapper.appendChild(labelParticle);

    const valueParticle = document.createElement('div');
    valueParticle.className = 'particle';
    valueParticle.id = `particle-${type}-${i}`;
    valueParticle.innerHTML = `
      <div class="particle-bar particle-bar-1"></div>
      <div class="particle-bar particle-bar-2"></div>
    `;
    wrapper.appendChild(valueParticle);
  });
}

function runSimpleAnimation(fields, type) {
  // Reset
  const scanBorder = document.getElementById(`scan-border-${type}`);
  const completeBanner = document.getElementById(`complete-banner-${type}`);
  const arrow = document.querySelector(`#${type}-animation-container .usecase-arrow`);

  if (scanBorder) scanBorder.style.opacity = '0';
  if (completeBanner) completeBanner.style.opacity = '0';
  if (arrow) arrow.style.animation = 'none';

  fields.forEach((_, i) => {
    const field = document.getElementById(`pdf-field-${type}-${i}`);
    const targetBar = document.getElementById(`target-${type}-${i}`);
    const targetLabel = document.getElementById(`target-label-${type}-${i}`);
    const particleBar = document.getElementById(`particle-${type}-${i}`);
    const particleLabel = document.getElementById(`particle-label-${type}-${i}`);

    if (field) field.style.opacity = '1';
    if (targetBar) targetBar.className = 'target-bar';
    if (targetLabel) targetLabel.className = 'target-label';
    if (particleBar) {
      particleBar.style.opacity = '0';
      particleBar.style.animation = 'none';
    }
    if (particleLabel) {
      particleLabel.style.opacity = '0';
      particleLabel.style.animation = 'none';
    }
  });

  // Stage 1: Scan (500ms)
  setTimeout(() => {
    if (scanBorder) {
      scanBorder.style.opacity = '1';
      scanBorder.style.transition = 'opacity 0.3s';
    }
  }, 500);

  // Stage 2: Particles (1000ms)
  setTimeout(() => {
    if (arrow) arrow.style.animation = 'arrowBounce 1s ease-in-out infinite';

    const wrapper = document.querySelector(`#${type}-animation-container .usecase-animation-wrapper`);
    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();

    fields.forEach((_, i) => {
      setTimeout(() => {
        animateUseCaseField(i, type, wrapperRect);
      }, i * 150);
    });
  }, 1000);

  // Stage 3: Complete (after all particles)
  setTimeout(() => {
    if (completeBanner) {
      completeBanner.style.opacity = '1';
      completeBanner.style.transition = 'opacity 0.3s';
    }
  }, 1000 + fields.length * 150 + 1000);

  // Loop
  setTimeout(() => {
    runSimpleAnimation(fields, type);
  }, 1000 + fields.length * 150 + 1000 + 2000);
}

function animateUseCaseField(index, type, wrapperRect) {
  const field = document.getElementById(`pdf-field-${type}-${index}`);
  if (!field) return;

  field.style.opacity = '0.3';
  field.style.transition = 'opacity 0.3s';

  const label = field.querySelector('.pdf-label');
  const value = field.querySelector('.pdf-value');
  const targetLabel = document.getElementById(`target-label-${type}-${index}`);
  const targetBar = document.getElementById(`target-${type}-${index}`);

  if (!label || !value || !targetLabel || !targetBar) return;

  const labelRect = label.getBoundingClientRect();
  const valueRect = value.getBoundingClientRect();
  const targetLabelRect = targetLabel.getBoundingClientRect();
  const targetBarRect = targetBar.getBoundingClientRect();

  // Animate particles
  animateUseCaseParticle(
    `particle-label-${type}-${index}`,
    labelRect,
    targetLabelRect,
    wrapperRect
  );

  animateUseCaseParticle(
    `particle-${type}-${index}`,
    valueRect,
    targetBarRect,
    wrapperRect
  );

  // Fill targets
  setTimeout(() => {
    targetLabel.className = 'target-label filled';
    targetLabel.style.animation = 'pulse 0.3s ease';
    targetBar.className = 'target-bar filled';
    targetBar.style.animation = 'pulse 0.3s ease';
  }, 800);
}

function animateUseCaseParticle(particleId, sourceRect, targetRect, wrapperRect) {
  const particle = document.getElementById(particleId);
  if (!particle) return;

  const startX = sourceRect.left - wrapperRect.left + sourceRect.width / 2;
  const startY = sourceRect.top - wrapperRect.top + sourceRect.height / 2;
  const endX = targetRect.left - wrapperRect.left + targetRect.width / 2 - startX;
  const endY = targetRect.top - wrapperRect.top + targetRect.height / 2 - startY;

  particle.style.left = startX + 'px';
  particle.style.top = startY + 'px';
  particle.style.setProperty('--end-x', endX + 'px');
  particle.style.setProperty('--end-y', endY + 'px');
  particle.style.animation = 'flyToTable 1s ease-out forwards';
}

// Auto-initialize visible use case animations
document.addEventListener('DOMContentLoaded', () => {
  const useCases = ['invoice', 'contract', 'form', 'expense'];

  useCases.forEach(useCase => {
    const container = document.getElementById(`${useCase}-animation-container`);
    if (container) {
      // Check if parent tab is active
      const parentTab = container.closest('.tab-content');
      if (parentTab && parentTab.classList.contains('active')) {
        setTimeout(() => initUseCaseAnimation(useCase), 500);
      }
    }
  });

  // Initialize animations when tabs are clicked
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;
      setTimeout(() => {
        const container = document.getElementById(`${targetTab}-animation-container`);
        if (container && !container.dataset.animationInitialized) {
          initUseCaseAnimation(targetTab);
        }
      }, 100);
    });
  });
});
