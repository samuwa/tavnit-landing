// ==========================================
// HERO ANIMATION - PDF TO TABLE EXTRACTION
// Full-featured animation for hero section
// ==========================================

// Get responsive scale factor based on viewport width
function getResponsiveScale() {
  const viewportWidth = window.innerWidth;
  if (viewportWidth <= 380) return 0.55;
  if (viewportWidth <= 480) return 0.6;
  if (viewportWidth <= 640) return 0.7;
  if (viewportWidth <= 768) return 0.8;
  if (viewportWidth <= 1024) return 0.9;
  return 1;
}

function initHeroAnimation() {
  const container = document.getElementById('hero-animation-container');
  if (!container || container.dataset.animationInitialized) return;

  container.dataset.animationInitialized = 'true';

  // Clear container
  container.innerHTML = '';

  // Create main animation structure
  const animationWrapper = document.createElement('div');
  animationWrapper.className = 'animation-wrapper';

  // Apply responsive scaling - scale the entire animation proportionately
  const scale = getResponsiveScale();

  animationWrapper.style.cssText = `
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 3rem;
    align-items: start;
    position: relative;
    padding: 1.5rem 0;
    transform: scale(${scale});
    transform-origin: center center;
  `;

  // Field definitions
  const fields = [
    'Order Number',
    'Order Date',
    'Supplier',
    'Item'
  ];

  // Create PDF document
  const pdfDoc = createPDFDocument(fields);
  animationWrapper.appendChild(pdfDoc);

  // Create arrow section
  const arrowSection = createArrowSection();
  animationWrapper.appendChild(arrowSection);

  // Create table
  const tableDoc = createTableDocument(fields);
  animationWrapper.appendChild(tableDoc);

  container.appendChild(animationWrapper);

  // Create particles (must be added after wrapper for positioning)
  createParticles(animationWrapper, fields);

  // Start animation loop
  setTimeout(() => runAnimation(fields), 500);
}

function createPDFDocument(fields) {
  const pdfDoc = document.createElement('div');
  pdfDoc.className = 'pdf-doc';
  pdfDoc.id = 'pdf-hero';

  // PDF Header
  const header = document.createElement('div');
  header.style.cssText = 'display: flex; justify-content: space-between; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #e5e7eb;';
  header.innerHTML = `
    <div>
      <div id="pdf-header-title-hero" style="height: 12px; width: 100px; background: #d1d5db; border-radius: 4px; margin-bottom: 8px;"></div>
      <div style="height: 8px; width: 130px; background: #e5e7eb; border-radius: 4px;"></div>
    </div>
    <div style="width: 48px; height: 48px; border: 2px solid #d1d5db;"></div>
  `;
  pdfDoc.appendChild(header);

  // PDF Fields
  const fieldsContainer = document.createElement('div');
  fieldsContainer.id = 'pdf-fields-hero';

  fields.forEach((field, i) => {
    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'pdf-field';
    fieldDiv.id = `pdf-field-hero-${i}`;
    fieldDiv.innerHTML = `
      <div class="pdf-label"></div>
      <div class="pdf-value"></div>
    `;
    fieldsContainer.appendChild(fieldDiv);
  });

  pdfDoc.appendChild(fieldsContainer);

  // PDF Footer
  const footer = document.createElement('div');
  footer.style.cssText = 'margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;';
  footer.innerHTML = `
    <div id="pdf-footer-text-hero" style="height: 8px; width: 100%; background: #e5e7eb; border-radius: 4px; margin-bottom: 8px;"></div>
    <div style="height: 8px; width: 75%; background: #e5e7eb; border-radius: 4px; margin-bottom: 8px;"></div>
    <div style="height: 8px; width: 85%; background: #e5e7eb; border-radius: 4px;"></div>
  `;
  pdfDoc.appendChild(footer);

  // Scan border
  const scanBorder = document.createElement('div');
  scanBorder.className = 'scan-border';
  scanBorder.id = 'scan-border-hero';
  pdfDoc.appendChild(scanBorder);

  return pdfDoc;
}

function createArrowSection() {
  const arrowSection = document.createElement('div');
  arrowSection.className = 'arrow-section';

  arrowSection.innerHTML = `
    <svg id="arrow-hero" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
    <div id="processing-hero" style="text-align: center; opacity: 0;">
      <div class="processing-text">AI Processing</div>
      <div style="display: flex; gap: 4px; justify-content: center; margin-top: 4px;">
        <div class="dot" style="width: 4px; height: 4px; border-radius: 50%; background: linear-gradient(90deg, #667eea, #764ba2);"></div>
        <div class="dot" style="width: 4px; height: 4px; border-radius: 50%; background: linear-gradient(90deg, #667eea, #764ba2);"></div>
        <div class="dot" style="width: 4px; height: 4px; border-radius: 50%; background: linear-gradient(90deg, #667eea, #764ba2);"></div>
      </div>
    </div>
  `;

  return arrowSection;
}

function createTableDocument(fields) {
  const tableDoc = document.createElement('div');
  tableDoc.className = 'table-doc';
  tableDoc.id = 'table-hero';

  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody id="table-body-hero"></tbody>
  `;

  const tbody = table.querySelector('tbody');

  // Header metadata row
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
    <td><div class="target-label" id="target-meta-label-hero-0"></div></td>
    <td><div class="target-bar" id="target-meta-hero-0"></div></td>
  `;
  tbody.appendChild(headerRow);

  // Field rows
  fields.forEach((field, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><div class="target-label" id="target-label-hero-${i}"></div></td>
      <td><div class="target-bar" id="target-hero-${i}"></div></td>
    `;
    tbody.appendChild(tr);
  });

  // Footer metadata row
  const footerRow = document.createElement('tr');
  footerRow.innerHTML = `
    <td><div class="target-label" id="target-meta-label-hero-1"></div></td>
    <td><div class="target-bar" id="target-meta-hero-1"></div></td>
  `;
  tbody.appendChild(footerRow);

  tableDoc.appendChild(table);

  // Complete banner
  const completeBanner = document.createElement('div');
  completeBanner.className = 'complete-banner';
  completeBanner.id = 'complete-banner-hero';
  completeBanner.textContent = '✓ Extraction complete';
  tableDoc.appendChild(completeBanner);

  return tableDoc;
}

function createParticles(wrapper, fields) {
  const metadataRows = ['header', 'footer'];

  // Create metadata particles
  metadataRows.forEach((type, i) => {
    // Label particle
    const metaLabelParticle = document.createElement('div');
    metaLabelParticle.className = 'particle-label';
    metaLabelParticle.id = `particle-meta-label-hero-${i}`;
    metaLabelParticle.innerHTML = `<div class="particle-label-bar"></div>`;
    wrapper.appendChild(metaLabelParticle);

    // Value particle
    const metaValueParticle = document.createElement('div');
    metaValueParticle.className = 'particle';
    metaValueParticle.id = `particle-meta-hero-${i}`;
    metaValueParticle.innerHTML = `
      <div class="particle-bar particle-bar-1"></div>
      <div class="particle-bar particle-bar-2"></div>
    `;
    wrapper.appendChild(metaValueParticle);
  });

  // Create field particles
  fields.forEach((field, i) => {
    // Label particle
    const labelParticle = document.createElement('div');
    labelParticle.className = 'particle-label';
    labelParticle.id = `particle-label-hero-${i}`;
    labelParticle.innerHTML = `<div class="particle-label-bar"></div>`;
    wrapper.appendChild(labelParticle);

    // Value particle
    const valueParticle = document.createElement('div');
    valueParticle.className = 'particle';
    valueParticle.id = `particle-hero-${i}`;
    valueParticle.innerHTML = `
      <div class="particle-bar particle-bar-1"></div>
      <div class="particle-bar particle-bar-2"></div>
    `;
    wrapper.appendChild(valueParticle);
  });
}

function runAnimation(fields) {
  const metadataRows = ['header', 'footer'];

  // Reset everything
  document.getElementById('scan-border-hero').style.opacity = '0';
  document.getElementById('processing-hero').style.opacity = '0';
  document.getElementById('complete-banner-hero').style.opacity = '0';
  document.getElementById('arrow-hero').style.animation = 'none';

  // Reset metadata
  document.getElementById('pdf-header-title-hero').style.opacity = '1';
  document.getElementById('pdf-footer-text-hero').style.opacity = '1';

  metadataRows.forEach((_, i) => {
    const targetBar = document.getElementById(`target-meta-hero-${i}`);
    const targetLabel = document.getElementById(`target-meta-label-hero-${i}`);
    if (targetBar) targetBar.className = 'target-bar';
    if (targetLabel) targetLabel.className = 'target-label';

    const particleBar = document.getElementById(`particle-meta-hero-${i}`);
    const particleLabel = document.getElementById(`particle-meta-label-hero-${i}`);
    if (particleBar) {
      particleBar.style.opacity = '0';
      particleBar.style.animation = 'none';
    }
    if (particleLabel) {
      particleLabel.style.opacity = '0';
      particleLabel.style.animation = 'none';
    }
  });

  // Reset fields
  fields.forEach((_, i) => {
    const field = document.getElementById(`pdf-field-hero-${i}`);
    if (field) field.style.opacity = '1';

    const targetBar = document.getElementById(`target-hero-${i}`);
    const targetLabel = document.getElementById(`target-label-hero-${i}`);
    if (targetBar) targetBar.className = 'target-bar';
    if (targetLabel) targetLabel.className = 'target-label';

    const particleBar = document.getElementById(`particle-hero-${i}`);
    const particleLabel = document.getElementById(`particle-label-hero-${i}`);
    if (particleBar) {
      particleBar.style.opacity = '0';
      particleBar.style.animation = 'none';
    }
    if (particleLabel) {
      particleLabel.style.opacity = '0';
      particleLabel.style.animation = 'none';
    }
  });

  // Stage 1: Scan border (800ms)
  setTimeout(() => {
    document.getElementById('scan-border-hero').style.opacity = '1';
    document.getElementById('scan-border-hero').style.animation = 'fadeIn 0.3s ease';
    document.getElementById('processing-hero').style.opacity = '1';
    document.getElementById('processing-hero').style.animation = 'fadeIn 0.3s ease';
  }, 800);

  // Stage 2: Particles fly (1600ms)
  setTimeout(() => {
    document.getElementById('arrow-hero').style.animation = 'arrowBounce 1s ease-in-out infinite';
    const wrapper = document.querySelector('#hero-animation-container .animation-wrapper');
    const wrapperRect = wrapper.getBoundingClientRect();

    // Animate header metadata
    animateMetadata(0, 'pdf-header-title-hero', wrapperRect, 0);

    // Animate footer metadata
    animateMetadata(1, 'pdf-footer-text-hero', wrapperRect, (fields.length + 1) * 150);

    // Animate fields
    fields.forEach((_, i) => {
      animateField(i, wrapperRect, (i + 1) * 150);
    });
  }, 1600);

  // Stage 3: Complete banner
  setTimeout(() => {
    document.getElementById('complete-banner-hero').style.opacity = '1';
    document.getElementById('complete-banner-hero').style.animation = 'fadeIn 0.3s ease';
  }, 1600 + 300 + fields.length * 150 + 1200);

  // Loop animation
  setTimeout(() => {
    runAnimation(fields);
  }, 1600 + 300 + fields.length * 150 + 1200 + 2000);
}

function animateMetadata(index, sourceId, wrapperRect, delay) {
  setTimeout(() => {
    const source = document.getElementById(sourceId);
    if (!source) return;

    source.style.opacity = '0.3';
    source.style.transition = 'opacity 0.3s';

    const sourceRect = source.getBoundingClientRect();
    const targetLabel = document.getElementById(`target-meta-label-hero-${index}`);
    const targetBar = document.getElementById(`target-meta-hero-${index}`);

    if (!targetLabel || !targetBar) return;

    const targetLabelRect = targetLabel.getBoundingClientRect();
    const targetBarRect = targetBar.getBoundingClientRect();

    // Animate label particle
    animateParticle(
      `particle-meta-label-hero-${index}`,
      sourceRect,
      targetLabelRect,
      wrapperRect
    );

    // Animate value particle
    animateParticle(
      `particle-meta-hero-${index}`,
      sourceRect,
      targetBarRect,
      wrapperRect
    );

    // Fill targets
    setTimeout(() => {
      targetLabel.className = 'target-label filled';
      targetLabel.style.animation = 'pulse 0.3s ease';
      targetBar.className = 'target-bar filled';
      targetBar.style.animation = 'pulse 0.3s ease';
    }, 1000);
  }, delay);
}

function animateField(index, wrapperRect, delay) {
  setTimeout(() => {
    const field = document.getElementById(`pdf-field-hero-${index}`);
    if (!field) return;

    field.style.opacity = '0.3';
    field.style.transition = 'opacity 0.3s';

    const label = field.querySelector('.pdf-label');
    const value = field.querySelector('.pdf-value');
    const targetLabel = document.getElementById(`target-label-hero-${index}`);
    const targetBar = document.getElementById(`target-hero-${index}`);

    if (!label || !value || !targetLabel || !targetBar) return;

    const labelRect = label.getBoundingClientRect();
    const valueRect = value.getBoundingClientRect();
    const targetLabelRect = targetLabel.getBoundingClientRect();
    const targetBarRect = targetBar.getBoundingClientRect();

    // Animate label particle
    animateParticle(
      `particle-label-hero-${index}`,
      labelRect,
      targetLabelRect,
      wrapperRect
    );

    // Animate value particle
    animateParticle(
      `particle-hero-${index}`,
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
    }, 1000);
  }, delay);
}

function animateParticle(particleId, sourceRect, targetRect, wrapperRect) {
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
  particle.style.animation = 'flyToTable 1.2s ease-out forwards';
}

// Debounce helper for resize handler
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Track current viewport width to detect significant changes
let lastViewportWidth = window.innerWidth;

// Reinitialize animation on significant resize
function handleResize() {
  const currentWidth = window.innerWidth;
  const widthDiff = Math.abs(currentWidth - lastViewportWidth);

  // Check if we crossed any breakpoints that affect scaling
  const crossedBreakpoint =
    (lastViewportWidth > 380 && currentWidth <= 380) ||
    (lastViewportWidth <= 380 && currentWidth > 380) ||
    (lastViewportWidth > 480 && currentWidth <= 480) ||
    (lastViewportWidth <= 480 && currentWidth > 480) ||
    (lastViewportWidth > 640 && currentWidth <= 640) ||
    (lastViewportWidth <= 640 && currentWidth > 640) ||
    (lastViewportWidth > 768 && currentWidth <= 768) ||
    (lastViewportWidth <= 768 && currentWidth > 768) ||
    (lastViewportWidth > 1024 && currentWidth <= 1024) ||
    (lastViewportWidth <= 1024 && currentWidth > 1024);

  // Update scale on any breakpoint crossing
  if (crossedBreakpoint) {
    lastViewportWidth = currentWidth;
    const wrapper = document.querySelector('#hero-animation-container .animation-wrapper');
    if (wrapper) {
      const scale = getResponsiveScale();
      wrapper.style.transform = `scale(${scale})`;
    }
  }

  // Reinitialize completely only for major layout changes
  if (widthDiff > 200) {
    lastViewportWidth = currentWidth;

    const container = document.getElementById('hero-animation-container');
    if (container) {
      // Reset initialization flag to allow reinit
      container.dataset.animationInitialized = '';
      container.innerHTML = '';

      // Reinitialize if in viewport
      if (isInViewport(container)) {
        initHeroAnimation();
      }
    }
  }
}

// Debounced resize handler
const debouncedResize = debounce(handleResize, 250);

// Auto-initialize if container exists
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('hero-animation-container');
    if (container && isInViewport(container)) {
      initHeroAnimation();
    }
    // Add resize listener
    window.addEventListener('resize', debouncedResize);
  });
} else {
  const container = document.getElementById('hero-animation-container');
  if (container && isInViewport(container)) {
    initHeroAnimation();
  }
  // Add resize listener
  window.addEventListener('resize', debouncedResize);
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
