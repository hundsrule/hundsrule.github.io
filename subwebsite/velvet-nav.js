/**
 * VELVET ROOM COMMON NAVIGATION & AUDIO ENGINE
 * hundsrule.github.io - Persona 5 Velvet Room Style Unification
 */

(function () {
  // --- 1. AUDIO ENGINE (Web Audio API Synthesizer) ---
  class VelvetAudio {
    constructor() {
      this.ctx = null;
      this.muted = false;
    }

    ensureContext() {
      if (this.muted) return;
      if (!this.ctx) {
        try {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          this.ctx = new AudioContextClass();
        } catch (e) {}
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playHover() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
      } catch (e) {}
    }

    playClick() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.12);
      } catch (e) {}
    }

    playSuccess() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.08, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.18);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.18);
        });
      } catch (e) {}
    }

    playError() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.setValueAtTime(110, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } catch (e) {}
    }
  }

  const audio = new VelvetAudio();
  window.VelvetAudio = audio;

  // --- 2. RELATIVE PATH RESOLVER ---
  function getRootPath() {
    const scriptEl = document.currentScript || document.querySelector('script[src*="velvet-nav.js"]');
    if (scriptEl && scriptEl.getAttribute('data-root')) {
      return scriptEl.getAttribute('data-root');
    }

    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/subwebsite/codes/')) {
      return '../../../index.html';
    } else if (path.includes('/subwebsite/')) {
      return '../../index.html';
    } else if (path.includes('/developing/')) {
      return '../index.html';
    }
    return './index.html';
  }

  // --- 3. INJECT UNIFIED HEADER ---
  function injectNav() {
    if (document.querySelector('.velvet-nav')) return;

    const rootHref = getRootPath();
    const pageTitle = document.title || 'VELVET ROOM';

    const nav = document.createElement('nav');
    nav.className = 'velvet-nav';
    nav.innerHTML = `
      <div class="velvet-nav-left">
        <a href="${rootHref}" class="velvet-nav-back" title="返回天鹅绒房间导航站">
          <span>← VELVET ROOM</span>
        </a>
        <div class="velvet-nav-brand">
          <span style="color:#E60012">✦</span>
          <span class="full-brand">HONGTE'S</span>
        </div>
      </div>
      <div class="velvet-nav-title">
        <span>${pageTitle.split('|')[0].split('-')[0].trim()}</span>
      </div>
      <div class="velvet-nav-right">
        <span class="velvet-nav-tag">REBEL ED.</span>
      </div>
    `;

    // Insert as the first element inside body or container
    const existingHeader = document.querySelector('header');
    if (existingHeader && existingHeader.classList.contains('replace-with-velvet-nav')) {
      existingHeader.parentNode.replaceChild(nav, existingHeader);
    } else {
      document.body.insertBefore(nav, document.body.firstChild);
    }

    // Attach sound effects to the back button
    const backBtn = nav.querySelector('.velvet-nav-back');
    if (backBtn) {
      backBtn.addEventListener('mouseenter', () => audio.playHover());
      backBtn.addEventListener('click', () => audio.playClick());
    }
  }

  // --- 4. GLOBAL SOUND ATTACHMENT ---
  function attachSounds() {
    const targets = document.querySelectorAll('button, .velvet-btn, .velvet-nav-back, a.btn, input[type="button"], input[type="submit"]');
    targets.forEach(btn => {
      if (!btn.dataset.velvetSound) {
        btn.dataset.velvetSound = 'true';
        btn.addEventListener('mouseenter', () => audio.playHover());
        btn.addEventListener('click', () => audio.playClick());
      }
    });
  }

  // --- 5. ELEGANT VELVET MODAL DIALOG ---
  window.VelvetAlert = function (message, title = 'SYSTEM MESSAGE', onConfirm = null) {
    audio.playClick();
    const existingModal = document.getElementById('velvet-modal-container');
    if (existingModal) existingModal.remove();

    const backdrop = document.createElement('div');
    backdrop.id = 'velvet-modal-container';
    backdrop.className = 'velvet-modal-backdrop';
    backdrop.innerHTML = `
      <div class="velvet-modal">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:3px solid #E60012; padding-bottom:10px; margin-bottom:16px;">
          <h3 style="margin:0; font-family:var(--font-display); font-size:22px; color:#101010; text-transform:uppercase;">
            ${title}
          </h3>
          <span style="background:#E60012; color:#fff; font-family:var(--font-display); padding:2px 6px; font-size:12px;">ALERT</span>
        </div>
        <p style="font-family:var(--font-sans); font-size:16px; font-weight:700; line-height:1.6; color:#181818; margin:0 0 24px 0;">
          ${message}
        </p>
        <div style="display:flex; justify-content:flex-end;">
          <button id="velvet-modal-btn" class="velvet-btn velvet-btn-primary" style="padding:8px 24px;">
            CONFIRM / 确认
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    const close = () => {
      audio.playClick();
      backdrop.remove();
      if (onConfirm) onConfirm();
    };

    document.getElementById('velvet-modal-btn').addEventListener('click', close);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close();
    });
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectNav();
      attachSounds();
    });
  } else {
    injectNav();
    attachSounds();
  }

  // Observe dynamically created buttons
  const observer = new MutationObserver(() => {
    attachSounds();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
