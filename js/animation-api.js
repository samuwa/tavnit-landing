// ==========================================
// API INTEGRATION ANIMATION
// Shows API request/response flow with data
// ==========================================

function initAPIAnimation() {
  const container = document.getElementById('api-animation-container');
  if (!container || container.dataset.animationInitialized) return;

  container.dataset.animationInitialized = 'true';
  container.innerHTML = '';

  // Create animation structure
  const animationWrapper = document.createElement('div');
  animationWrapper.className = 'api-animation-wrapper';
  animationWrapper.style.cssText = `
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 1.5rem;
    align-items: center;
    width: 100%;
    padding: 2rem 0;
    position: relative;
    min-height: 200px;
  `;

  // Create client side
  const client = createClient();
  animationWrapper.appendChild(client);

  // Create connection/arrow
  const connection = createConnection();
  animationWrapper.appendChild(connection);

  // Create server side
  const server = createServer();
  animationWrapper.appendChild(server);

  container.appendChild(animationWrapper);

  // Create data packets
  createDataPackets(animationWrapper);

  // Start animation loop
  setTimeout(() => runAPIAnimation(), 500);
}

function createClient() {
  const client = document.createElement('div');
  client.className = 'api-client';
  client.id = 'api-client';
  client.style.cssText = `
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    padding: 1rem;
    position: relative;
  `;

  client.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
      <svg width="20" height="20" fill="none" stroke="#667eea" stroke-width="2">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 2v2M16 2v2"/>
      </svg>
      <div style="font-size: 11px; font-weight: 600; color: #4b5563;">Client App</div>
    </div>
    <div class="api-request-bar" id="api-request-bar" style="
      height: 6px;
      background: #e5e7eb;
      border-radius: 3px;
      margin-bottom: 0.5rem;
      transition: all 0.3s ease;
    "></div>
    <div style="font-size: 9px; color: #9ca3af; font-family: monospace;">POST /api/runs</div>
    <div class="api-response-box" id="api-response-box" style="
      margin-top: 0.75rem;
      padding: 0.5rem;
      background: #f9fafb;
      border-radius: 4px;
      border: 1px solid #e5e7eb;
      opacity: 0;
      transition: opacity 0.3s ease;
    ">
      <div style="font-size: 9px; color: #047857; font-family: monospace;">✓ 200 OK</div>
      <div style="font-size: 8px; color: #6b7280; margin-top: 2px;">output_json received</div>
    </div>
  `;

  return client;
}

function createConnection() {
  const connection = document.createElement('div');
  connection.className = 'api-connection';
  connection.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  `;

  connection.innerHTML = `
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M8 20 L32 20" stroke="#d1d5db" stroke-width="2" stroke-dasharray="4 4" id="connection-line"/>
      <path d="M28 16 L32 20 L28 24" stroke="#d1d5db" stroke-width="2" id="connection-arrow"/>
    </svg>
    <div id="api-status" style="
      font-size: 9px;
      color: #9ca3af;
      font-family: monospace;
      opacity: 0;
      transition: opacity 0.3s ease;
    ">Processing...</div>
  `;

  return connection;
}

function createServer() {
  const server = document.createElement('div');
  server.className = 'api-server';
  server.id = 'api-server';
  server.style.cssText = `
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    padding: 1rem;
    position: relative;
  `;

  server.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
      <svg width="20" height="20" fill="none" stroke="#764ba2" stroke-width="2">
        <rect x="2" y="3" width="20" height="5" rx="1"/>
        <rect x="2" y="10" width="20" height="5" rx="1"/>
        <rect x="2" y="17" width="20" height="5" rx="1"/>
      </svg>
      <div style="font-size: 11px; font-weight: 600; color: #4b5563;">Tavnit API</div>
    </div>
    <div class="api-processing-bar" id="api-processing-bar" style="
      height: 6px;
      background: #e5e7eb;
      border-radius: 3px;
      margin-bottom: 0.5rem;
      transition: all 0.3s ease;
    "></div>
    <div style="font-size: 9px; color: #9ca3af; font-family: monospace;">AI Processing</div>
    <div id="api-ai-indicator" style="
      margin-top: 0.75rem;
      display: flex;
      gap: 4px;
      opacity: 0;
      transition: opacity 0.3s ease;
    ">
      <div class="ai-dot" style="width: 4px; height: 4px; border-radius: 50%; background: linear-gradient(90deg, #667eea, #764ba2);"></div>
      <div class="ai-dot" style="width: 4px; height: 4px; border-radius: 50%; background: linear-gradient(90deg, #667eea, #764ba2);"></div>
      <div class="ai-dot" style="width: 4px; height: 4px; border-radius: 50%; background: linear-gradient(90deg, #667eea, #764ba2);"></div>
    </div>
  `;

  return server;
}

function createDataPackets(wrapper) {
  // Request packet (client to server)
  const requestPacket = document.createElement('div');
  requestPacket.className = 'api-packet api-packet-request';
  requestPacket.id = 'api-packet-request';
  requestPacket.style.cssText = `
    position: absolute;
    background: linear-gradient(135deg, #667eea, #764ba2);
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    opacity: 0;
    pointer-events: none;
    z-index: 10;
  `;
  requestPacket.innerHTML = `
    <div style="font-size: 8px; color: white; font-weight: 600; font-family: monospace;">POST</div>
    <div style="font-size: 7px; color: rgba(255,255,255,0.8); font-family: monospace;">invoice.pdf</div>
  `;
  wrapper.appendChild(requestPacket);

  // Response packet (server to client)
  const responsePacket = document.createElement('div');
  responsePacket.className = 'api-packet api-packet-response';
  responsePacket.id = 'api-packet-response';
  responsePacket.style.cssText = `
    position: absolute;
    background: linear-gradient(135deg, #10b981, #059669);
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
    opacity: 0;
    pointer-events: none;
    z-index: 10;
  `;
  responsePacket.innerHTML = `
    <div style="font-size: 8px; color: white; font-weight: 600; font-family: monospace;">200 OK</div>
    <div style="font-size: 7px; color: rgba(255,255,255,0.8); font-family: monospace;">output_json</div>
  `;
  wrapper.appendChild(responsePacket);
}

function runAPIAnimation() {
  // Reset everything
  resetAPIAnimation();

  // Stage 1: Client prepares request (500ms)
  setTimeout(() => {
    const requestBar = document.getElementById('api-request-bar');
    if (requestBar) {
      requestBar.style.background = 'linear-gradient(90deg, #667eea, #764ba2)';
    }
  }, 500);

  // Stage 2: Send request packet (1000ms)
  setTimeout(() => {
    const wrapper = document.querySelector('.api-animation-wrapper');
    const client = document.getElementById('api-client');
    const server = document.getElementById('api-server');
    const requestPacket = document.getElementById('api-packet-request');

    if (wrapper && client && server && requestPacket) {
      const wrapperRect = wrapper.getBoundingClientRect();
      const clientRect = client.getBoundingClientRect();
      const serverRect = server.getBoundingClientRect();

      const startX = clientRect.right - wrapperRect.left;
      const startY = clientRect.top - wrapperRect.top + clientRect.height / 2;
      const endX = serverRect.left - wrapperRect.left - 100;
      const endY = serverRect.top - wrapperRect.top + serverRect.height / 2;

      requestPacket.style.left = startX + 'px';
      requestPacket.style.top = startY + 'px';
      requestPacket.style.opacity = '1';
      requestPacket.style.transition = 'all 1s ease-in-out';

      setTimeout(() => {
        requestPacket.style.left = endX + 'px';
        requestPacket.style.top = endY + 'px';
      }, 50);

      // Show status
      const status = document.getElementById('api-status');
      if (status) {
        status.style.opacity = '1';
      }
    }
  }, 1000);

  // Stage 3: Server receives and processes (2100ms)
  setTimeout(() => {
    const requestPacket = document.getElementById('api-packet-request');
    const processingBar = document.getElementById('api-processing-bar');
    const aiIndicator = document.getElementById('api-ai-indicator');

    if (requestPacket) {
      requestPacket.style.opacity = '0';
    }

    if (processingBar) {
      processingBar.style.background = 'linear-gradient(90deg, #667eea, #764ba2)';
    }

    if (aiIndicator) {
      aiIndicator.style.opacity = '1';
      // Animate dots
      const dots = aiIndicator.querySelectorAll('.ai-dot');
      dots.forEach((dot, index) => {
        animateDot(dot, index);
      });
    }
  }, 2100);

  // Stage 4: Send response packet (3500ms)
  setTimeout(() => {
    const wrapper = document.querySelector('.api-animation-wrapper');
    const client = document.getElementById('api-client');
    const server = document.getElementById('api-server');
    const responsePacket = document.getElementById('api-packet-response');
    const processingBar = document.getElementById('api-processing-bar');

    if (processingBar) {
      processingBar.style.background = 'linear-gradient(90deg, #10b981, #059669)';
    }

    if (wrapper && client && server && responsePacket) {
      const wrapperRect = wrapper.getBoundingClientRect();
      const clientRect = client.getBoundingClientRect();
      const serverRect = server.getBoundingClientRect();

      const startX = serverRect.left - wrapperRect.left;
      const startY = serverRect.top - wrapperRect.top + serverRect.height / 2;
      const endX = clientRect.right - wrapperRect.left - 100;
      const endY = clientRect.top - wrapperRect.top + clientRect.height / 2;

      responsePacket.style.left = startX + 'px';
      responsePacket.style.top = startY + 'px';
      responsePacket.style.opacity = '1';
      responsePacket.style.transition = 'all 1s ease-in-out';

      setTimeout(() => {
        responsePacket.style.left = endX + 'px';
        responsePacket.style.top = endY + 'px';
      }, 50);
    }
  }, 3500);

  // Stage 5: Client receives response (4600ms)
  setTimeout(() => {
    const responsePacket = document.getElementById('api-packet-response');
    const responseBox = document.getElementById('api-response-box');
    const status = document.getElementById('api-status');

    if (responsePacket) {
      responsePacket.style.opacity = '0';
    }

    if (responseBox) {
      responseBox.style.opacity = '1';
    }

    if (status) {
      status.style.opacity = '0';
    }
  }, 4600);

  // Loop animation (restart after 7000ms)
  setTimeout(() => {
    runAPIAnimation();
  }, 7000);
}

function resetAPIAnimation() {
  // Reset request bar
  const requestBar = document.getElementById('api-request-bar');
  if (requestBar) {
    requestBar.style.background = '#e5e7eb';
  }

  // Reset processing bar
  const processingBar = document.getElementById('api-processing-bar');
  if (processingBar) {
    processingBar.style.background = '#e5e7eb';
  }

  // Reset packets
  const requestPacket = document.getElementById('api-packet-request');
  const responsePacket = document.getElementById('api-packet-response');
  if (requestPacket) {
    requestPacket.style.opacity = '0';
    requestPacket.style.transition = 'none';
  }
  if (responsePacket) {
    responsePacket.style.opacity = '0';
    responsePacket.style.transition = 'none';
  }

  // Reset response box
  const responseBox = document.getElementById('api-response-box');
  if (responseBox) {
    responseBox.style.opacity = '0';
  }

  // Reset AI indicator
  const aiIndicator = document.getElementById('api-ai-indicator');
  if (aiIndicator) {
    aiIndicator.style.opacity = '0';
  }

  // Reset status
  const status = document.getElementById('api-status');
  if (status) {
    status.style.opacity = '0';
  }
}

function animateDot(dot, index) {
  setTimeout(() => {
    dot.style.transition = 'transform 0.3s ease';
    dot.style.transform = 'translateY(-4px)';
    setTimeout(() => {
      dot.style.transform = 'translateY(0)';
    }, 300);
  }, index * 150);

  // Loop dot animation
  setInterval(() => {
    setTimeout(() => {
      dot.style.transform = 'translateY(-4px)';
      setTimeout(() => {
        dot.style.transform = 'translateY(0)';
      }, 300);
    }, index * 150);
  }, 900);
}

// Auto-initialize if container exists
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('api-animation-container');
    if (container) {
      // Wait for container to be visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.dataset.animationInitialized) {
            initAPIAnimation();
            observer.disconnect();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(container);
    }
  });
} else {
  const container = document.getElementById('api-animation-container');
  if (container) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animationInitialized) {
          initAPIAnimation();
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });
    observer.observe(container);
  }
}
