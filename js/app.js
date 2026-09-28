/* ==========================================================================
   Addiction Awareness & Recovery Platform - Master Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initNavDropdowns();
  initGlobalSearch();
  initBackToTop();
  initQuizzes();
  initSobrietyCounter();
  initAccordions();
  initCycleVisualizer();
  initTriggerLibrary();
  initCravingTracker();
  initRecoveryJournal();
  initSelfReflection();
  initFormSubmissions();
  initGroundingTimer();
});

/* --------------------------------------------------------------------------
   1. Theme Switcher (Dark / Light)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(toggleBtn, currentTheme);

  toggleBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(toggleBtn, theme);
    showToast(`Switched to ${theme === 'dark' ? 'Dark' : 'Light'} Mode`);
  });
}

function updateThemeIcon(btn, theme) {
  btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
}

/* --------------------------------------------------------------------------
   2. Navigation Dropdown Renderer & Mobile Toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isExpanded = navLinks.classList.contains('active');
    toggleBtn.innerHTML = isExpanded ? '✕' : '☰';
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      toggleBtn.innerHTML = '☰';
    });
  });

  // Toggle mobile dropdown on click
  document.querySelectorAll('.nav-item-dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
      if (window.innerWidth <= 850) {
        if (e.target.classList.contains('nav-link')) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      }
    });
  });
}

function initNavDropdowns() {
  const dropdownMenu = document.getElementById('addictionsDropdownMenu');
  if (!dropdownMenu || typeof ADDICTION_DATA === 'undefined') return;

  const isSubfolder = window.location.pathname.includes('/addictions/') || window.location.pathname.includes('/tools/');
  const prefix = isSubfolder ? '../' : '';

  dropdownMenu.innerHTML = ADDICTION_DATA.categories.map(cat => `
    <a href="${prefix}${cat.path}" class="dropdown-item-custom">
      <span>${cat.icon}</span>
      <span>${cat.title}</span>
    </a>
  `).join('');
}

/* --------------------------------------------------------------------------
   3. Global Search Modal & Filter Engine
   -------------------------------------------------------------------------- */
function initGlobalSearch() {
  const searchTrigger = document.getElementById('globalSearchTrigger');
  if (!searchTrigger) return;

  let modalOverlay = document.getElementById('searchModalOverlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'searchModalOverlay';
    modalOverlay.className = 'search-modal-overlay';
    modalOverlay.innerHTML = `
      <div class="search-modal-content">
        <div class="search-modal-header">
          <span>🔍</span>
          <input type="text" id="modalSearchInput" class="search-input-modal" placeholder="Search addictions, symptoms, triggers, cravings, recovery...">
          <button id="closeSearchModalBtn" style="background:none; border:none; color:var(--text-muted); font-size:1.25rem; cursor:pointer;">✕</button>
        </div>
        <div class="search-results-list" id="modalSearchResults">
          <p style="color:var(--text-muted); text-align:center; padding:1.5rem;">Type a search query above (e.g. 'Dopamine', 'Alcohol', 'Gaming', 'Cravings')...</p>
        </div>
      </div>
    `;
    document.body.appendChild(modalOverlay);
  }

  const closeBtn = document.getElementById('closeSearchModalBtn');
  const searchInput = document.getElementById('modalSearchInput');
  const resultsContainer = document.getElementById('modalSearchResults');

  function openModal() {
    modalOverlay.classList.add('active');
    searchInput.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
  }

  searchTrigger.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openModal();
    }
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      resultsContainer.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:1.5rem;">Type a search query above...</p>`;
      return;
    }

    if (typeof ADDICTION_DATA === 'undefined') return;

    const isSubfolder = window.location.pathname.includes('/addictions/') || window.location.pathname.includes('/tools/');
    const prefix = isSubfolder ? '../' : '';

    const matchedCategories = ADDICTION_DATA.categories.filter(c => 
      c.title.toLowerCase().includes(query) || 
      c.summary.toLowerCase().includes(query) ||
      c.warningSigns.some(w => w.toLowerCase().includes(query))
    );

    const matchedTriggers = ADDICTION_DATA.triggerLibrary.filter(t =>
      t.name.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query)
    );

    let html = '';

    if (matchedCategories.length > 0) {
      html += `<div style="font-size:0.75rem; font-weight:700; color:var(--teal); text-uppercase:uppercase; margin-bottom:0.5rem;">Addiction Categories</div>`;
      matchedCategories.forEach(c => {
        html += `
          <a href="${prefix}${c.path}" class="search-result-item">
            <h5>${c.icon} ${c.title}</h5>
            <p>${c.summary}</p>
          </a>
        `;
      });
    }

    if (matchedTriggers.length > 0) {
      html += `<div style="font-size:0.75rem; font-weight:700; color:var(--primary); text-uppercase:uppercase; margin:1rem 0 0.5rem;">Triggers & Responses</div>`;
      matchedTriggers.forEach(t => {
        html += `
          <a href="${prefix}tools/trigger-tracker.html" class="search-result-item">
            <h5>⚡ Trigger: ${t.name}</h5>
            <p>${t.description}</p>
          </a>
        `;
      });
    }

    if (!html) {
      html = `<p style="color:var(--text-muted); text-align:center; padding:1.5rem;">No matching articles or resources found for "${query}". Try searching 'alcohol', 'cravings', 'triggers', or 'recovery'.</p>`;
    }

    resultsContainer.innerHTML = html;
  });
}

/* --------------------------------------------------------------------------
   4. Back to Top Scroll Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   5. Grounding Timer Widget (3-Minute Urge Surfing)
   -------------------------------------------------------------------------- */
function initGroundingTimer() {
  const startBtn = document.getElementById('startGroundingTimerBtn');
  const readout = document.getElementById('groundingTimerReadout');
  const statusMsg = document.getElementById('groundingStatusMsg');
  if (!startBtn || !readout) return;

  let timerInterval = null;
  let secondsLeft = 180; // 3 minutes

  startBtn.addEventListener('click', () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      startBtn.textContent = '▶️ Start 3-Minute Grounding';
      statusMsg.textContent = 'Timer paused.';
      return;
    }

    secondsLeft = 180;
    startBtn.textContent = '⏸️ Pause Timer';
    statusMsg.textContent = 'Take deep breaths. Breathe in for 4s, hold for 4s, exhale for 6s...';

    timerInterval = setInterval(() => {
      secondsLeft--;
      const mins = Math.floor(secondsLeft / 60);
      const secs = secondsLeft % 60;
      readout.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

      if (secondsLeft <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        startBtn.textContent = '✓ Exercise Complete!';
        statusMsg.textContent = '🌟 Phenomenal job! The acute urge peak has passed. You are in control.';
        showToast('3-Minute Grounding Complete! Urge peak passed.', 'success');
      }
    }, 1000);
  });
}

/* --------------------------------------------------------------------------
   6. Interactive Addiction Cycle Visualizer Engine
   -------------------------------------------------------------------------- */
function initCycleVisualizer() {
  const container = document.getElementById('cycleVisualizerContent');
  const pillsContainer = document.getElementById('cyclePillsNav');
  if (!container || typeof ADDICTION_DATA === 'undefined') return;

  function renderCycle(key) {
    const steps = ADDICTION_DATA.cycles[key];
    if (!steps) return;

    container.innerHTML = `
      <div class="cycle-flow-grid">
        ${steps.map(s => `
          <div class="cycle-node-card">
            <div class="cycle-node-icon">${s.icon}</div>
            <div class="cycle-node-step">Step ${s.step}</div>
            <div class="cycle-node-title">${s.title}</div>
            <div class="cycle-node-desc">${s.desc}</div>
          </div>
        `).join('')}
      </div>
    `;

    document.querySelectorAll('.cycle-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.key === key);
    });
  }

  if (pillsContainer) {
    pillsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('cycle-pill-btn')) {
        renderCycle(e.target.dataset.key);
      }
    });
  }

  renderCycle('alcohol');
}

/* --------------------------------------------------------------------------
   7. Interactive Trigger Library Engine
   -------------------------------------------------------------------------- */
function initTriggerLibrary() {
  const selectElement = document.getElementById('triggerSelect');
  const displayContainer = document.getElementById('triggerResponseDisplay');
  if (!selectElement || !displayContainer || typeof ADDICTION_DATA === 'undefined') return;

  function renderTriggerActions(triggerId) {
    const trigger = ADDICTION_DATA.triggerLibrary.find(t => t.id === triggerId) || ADDICTION_DATA.triggerLibrary[0];

    displayContainer.innerHTML = `
      <div class="info-box success" style="margin:0;">
        <span class="card-badge" style="position:static; display:inline-block; margin-bottom:0.5rem;">${trigger.category} Trigger</span>
        <h3>⚡ Trigger: ${trigger.name}</h3>
        <p style="color:var(--text-secondary); margin-bottom:1.5rem;">${trigger.description}</p>
        
        <h4 style="margin-bottom:0.75rem;">🛡️ Recommended 5-Step Response Plan:</h4>
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          ${trigger.actions.map(act => `
            <div style="background:var(--bg-surface); border:1px solid var(--card-border); padding:0.85rem 1.25rem; border-radius:var(--radius-sm); font-size:0.95rem;">
              ${act}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  selectElement.addEventListener('change', (e) => renderTriggerActions(e.target.value));
  renderTriggerActions(selectElement.value || 'stress');
}

/* --------------------------------------------------------------------------
   8. Interactive Craving Tracker Engine
   -------------------------------------------------------------------------- */
function initCravingTracker() {
  const form = document.getElementById('cravingTrackerForm');
  const slider = document.getElementById('cravingIntensitySlider');
  const sliderReadout = document.getElementById('cravingIntensityReadout');
  const chartContainer = document.getElementById('cravingChartContainer');
  const historyList = document.getElementById('cravingHistoryList');
  if (!form || !slider) return;

  slider.addEventListener('input', (e) => {
    if (sliderReadout) sliderReadout.textContent = `${e.target.value}/10`;
  });

  function loadCravings() {
    const cravings = JSON.parse(localStorage.getItem('user_cravings') || '[]');

    if (historyList) {
      if (cravings.length === 0) {
        historyList.innerHTML = `<p style="color:var(--text-muted); text-align:center;">No craving entries recorded yet.</p>`;
      } else {
        historyList.innerHTML = cravings.slice(-5).reverse().map(c => `
          <div class="journal-entry-card">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
              <strong>${c.category} (Intensity: ${c.intensity}/10)</strong>
              <span style="font-size:0.8rem; color:var(--text-muted);">${c.date}</span>
            </div>
            <p style="font-size:0.9rem; color:var(--text-secondary);"><strong>Trigger:</strong> ${c.trigger} | <strong>Feeling:</strong> ${c.feeling}</p>
            <p style="font-size:0.85rem; color:var(--teal); margin-top:0.25rem;"><strong>Action Taken:</strong> ${c.action} (${c.passed ? '✓ Urge Passed' : '⚠️ Challenging'})</p>
          </div>
        `).join('');
      }
    }

    if (chartContainer) {
      if (cravings.length === 0) {
        chartContainer.innerHTML = `<p style="color:var(--text-muted); text-align:center; width:100%;">Log your first craving to see visual trend bars.</p>`;
      } else {
        const last7 = cravings.slice(-7);
        chartContainer.innerHTML = last7.map(c => `
          <div class="craving-bar-col" style="height:${c.intensity * 10}%;">
            <span>${c.intensity}</span>
          </div>
        `).join('');
      }
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newCraving = {
      id: Date.now(),
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: document.getElementById('cravingCategory').value,
      trigger: document.getElementById('cravingTrigger').value,
      intensity: parseInt(slider.value, 10),
      feeling: document.getElementById('cravingFeeling').value,
      action: document.getElementById('cravingAction').value,
      passed: document.getElementById('cravingPassedCheck').checked
    };

    const cravings = JSON.parse(localStorage.getItem('user_cravings') || '[]');
    cravings.push(newCraving);
    localStorage.setItem('user_cravings', JSON.stringify(cravings));

    showToast('Craving log recorded safely!', 'success');
    form.reset();
    if (sliderReadout) sliderReadout.textContent = '5/10';
    loadCravings();
  });

  loadCravings();
}

/* --------------------------------------------------------------------------
   9. Interactive Recovery Journal Engine
   -------------------------------------------------------------------------- */
function initRecoveryJournal() {
  const form = document.getElementById('recoveryJournalForm');
  const journalHistory = document.getElementById('journalHistoryContainer');
  if (!form) return;

  function loadJournalEntries() {
    if (!journalHistory) return;
    const entries = JSON.parse(localStorage.getItem('user_journal_entries') || '[]');

    if (entries.length === 0) {
      journalHistory.innerHTML = `<p style="color:var(--text-muted); text-align:center;">Your private journal is empty. Write your first reflection above.</p>`;
      return;
    }

    journalHistory.innerHTML = entries.slice().reverse().map(e => `
      <div class="journal-entry-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <h4 style="font-size:1.1rem;">Mood Today: ${e.mood}</h4>
          <span style="font-size:0.8rem; color:var(--text-muted);">${e.date}</span>
        </div>
        <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:0.5rem;"><strong>Trigger Encountered:</strong> ${e.trigger || 'None'}</p>
        <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:0.5rem;"><strong>What I did instead:</strong> ${e.coping}</p>
        <p style="font-size:0.9rem; color:var(--emerald); font-weight:600;">🌟 Proud Moment: ${e.proud}</p>
      </div>
    `).join('');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      mood: document.getElementById('journalMood').value,
      trigger: document.getElementById('journalTrigger').value,
      coping: document.getElementById('journalCoping').value,
      proud: document.getElementById('journalProud').value
    };

    const entries = JSON.parse(localStorage.getItem('user_journal_entries') || '[]');
    entries.push(entry);
    localStorage.setItem('user_journal_entries', JSON.stringify(entries));

    showToast('Journal reflection saved to private local storage!', 'success');
    form.reset();
    loadJournalEntries();
  });

  loadJournalEntries();
}

/* --------------------------------------------------------------------------
   10. Self-Reflection Questionnaire Engine
   -------------------------------------------------------------------------- */
function initSelfReflection() {
  const form = document.getElementById('selfReflectionForm');
  const questionsContainer = document.getElementById('reflectionQuestionsList');
  const resultBox = document.getElementById('reflectionResultBox');
  if (!form || !questionsContainer || typeof ADDICTION_DATA === 'undefined') return;

  questionsContainer.innerHTML = ADDICTION_DATA.selfReflection.map((q, idx) => `
    <div class="reflection-question-card">
      <h5 style="margin-bottom:0.75rem;">${idx + 1}. ${q.text}</h5>
      <div class="reflection-options">
        <label class="option-label">
          <input type="radio" name="srq_${q.id}" value="0" required> Never (0)
        </label>
        <label class="option-label">
          <input type="radio" name="srq_${q.id}" value="1"> Sometimes (1)
        </label>
        <label class="option-label">
          <input type="radio" name="srq_${q.id}" value="2"> Frequently (2)
        </label>
        <label class="option-label">
          <input type="radio" name="srq_${q.id}" value="3"> Always (3)
        </label>
      </div>
    </div>
  `).join('');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let totalScore = 0;
    const inputs = form.querySelectorAll('input[type="radio"]:checked');

    if (inputs.length < ADDICTION_DATA.selfReflection.length) {
      showToast('Please answer all 9 reflection questions.', 'warning');
      return;
    }

    inputs.forEach(input => {
      totalScore += parseInt(input.value, 10);
    });

    if (resultBox) {
      resultBox.style.display = 'block';
      let title = '';
      let message = '';
      let styleClass = '';

      if (totalScore <= 5) {
        title = '🟢 LOW CONCERN';
        message = 'Your responses suggest relatively few warning signs associated with compulsive or addictive behavior. Continue paying attention to your habits and maintaining healthy boundaries.';
        styleClass = 'info-box success';
      } else if (totalScore <= 11) {
        title = '🟡 SOME WARNING SIGNS';
        message = 'Your responses indicate some patterns of problematic or compulsive use worth monitoring. Consider reviewing our Trigger Tracker and discussing your habits with someone you trust.';
        styleClass = 'info-box';
      } else {
        title = '🔴 MULTIPLE WARNING SIGNS';
        message = 'Your responses show several key patterns commonly associated with compulsive behavior or dependence. Consider speaking with a qualified healthcare or addiction professional for personalized guidance.';
        styleClass = 'info-box warning';
      }

      resultBox.className = styleClass;
      resultBox.innerHTML = `
        <span class="card-badge" style="position:static; display:inline-block; margin-bottom:0.5rem;">Self-Reflection Result Score: ${totalScore}/27</span>
        <h3>${title}</h3>
        <p style="color:var(--text-secondary); margin:0.75rem 0 1.25rem;">${message}</p>
        
        <div class="medical-disclaimer-box" style="margin:0;">
          <strong> Mandatory Medical Disclaimer:</strong> This self-reflection tool is for self-educational purposes only and is NOT a medical or clinical diagnosis. If you are concerned about your substance use or behavior, please consult a qualified healthcare or addiction professional.
        </div>
      `;

      resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

/* --------------------------------------------------------------------------
   11. Quiz & Form Utilities
   -------------------------------------------------------------------------- */
function initQuizzes() {
  const quizForms = document.querySelectorAll('.interactive-quiz-form');
  quizForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const questionCards = form.querySelectorAll('.quiz-question-card');
      let score = 0;
      let total = questionCards.length;
      let unanswered = false;

      questionCards.forEach(card => {
        const selected = card.querySelector('input[type="radio"]:checked');
        if (!selected) unanswered = true;
        else if (selected.dataset.correct === "true") score++;
      });

      if (unanswered) {
        showToast('Please answer all questions to calculate your score!', 'warning');
        return;
      }

      const resultBox = form.querySelector('.quiz-result-box');
      if (resultBox) {
        resultBox.classList.add('show');
        const percentage = Math.round((score / total) * 100);
        let feedbackMessage = percentage >= 80 ?
          `🏆 Excellent Awareness! (${score}/${total} Correct). You demonstrate strong knowledge of addiction and recovery science.` :
          `👍 Good Effort! (${score}/${total} Correct). Review our educational guides to further strengthen your awareness.`;

        resultBox.className = 'quiz-result-box show info-box ' + (percentage >= 80 ? 'success' : '');
        resultBox.innerHTML = `<h4>Assessment Result: ${percentage}%</h4><p>${feedbackMessage}</p>`;
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
}

function initSobrietyCounter() {
  const quitDateInput = document.getElementById('sobrietyQuitDate');
  const countDisplay = document.getElementById('sobrietyDaysCount');
  const milestonesContainer = document.getElementById('sobrietyMilestones');
  if (!quitDateInput || !countDisplay) return;

  const savedDate = localStorage.getItem('sobrietyQuitDate');
  if (savedDate) quitDateInput.value = savedDate;
  else {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() - 30);
    quitDateInput.value = defaultDate.toISOString().split('T')[0];
  }

  function updateCounter() {
    const selectedDate = new Date(quitDateInput.value);
    const today = new Date();
    if (isNaN(selectedDate.getTime()) || selectedDate > today) {
      countDisplay.textContent = '0';
      return;
    }
    const diffDays = Math.floor(Math.abs(today - selectedDate) / (1000 * 60 * 60 * 24));
    countDisplay.textContent = diffDays;
    localStorage.setItem('sobrietyQuitDate', quitDateInput.value);

    if (milestonesContainer) {
      const milestones = [
        { days: 1, label: '🌱 Day 1' },
        { days: 7, label: '🔥 1 Week' },
        { days: 30, label: '⭐ 1 Month' },
        { days: 90, label: '🏆 90 Days' },
        { days: 365, label: '👑 1 Year' }
      ];

      milestonesContainer.innerHTML = milestones.map(m => `
        <div class="milestone-badge ${diffDays >= m.days ? 'achieved' : ''}">
          ${m.label} ${diffDays >= m.days ? '✓' : ''}
        </div>
      `).join('');
    }
  }

  quitDateInput.addEventListener('change', updateCounter);
  updateCounter();
}

function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');
      const isOpen = item.classList.contains('active');

      document.querySelectorAll('.accordion-item.active').forEach(openItem => {
        openItem.classList.remove('active');
        openItem.querySelector('.accordion-content').style.maxHeight = null;
        openItem.querySelector('.accordion-header span:last-child').textContent = '▼';
      });

      if (!isOpen) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        header.querySelector('span:last-child').textContent = '▲';
      }
    });
  });
}

function initFormSubmissions() {
  const contactForms = document.querySelectorAll('.contact-story-form');
  contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '⏳ Processing...';
      }

      setTimeout(() => {
        showToast('Submission received safely!', 'success');
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }, 700);
    });
  });
}

function showToast(message, type = 'info') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-msg ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
