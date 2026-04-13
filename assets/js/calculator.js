/**
 * WhenWillIMakeAMillion.com — Calculator Engine
 * Compound interest + gamification logic
 */

'use strict';

// ─── Vibe Mode Config ───────────────────────────────────────────────────────
const VIBES = {
  realistic: {
    label: 'Realistic',
    returnRate: 7,
    raiseMultiplier: 1.0,
    savingsMultiplier: 1.0,
    roasts: [
      "Solid plan. You're not getting rich quick — you're getting rich right.",
      "Methodical, boring, effective. This is how wealth actually works.",
      "The S&P 500 averaged 10% historically. You're being conservative. Good.",
      "Your financial advisor would approve. Your instagrammer friends would not.",
    ]
  },
  optimist: {
    label: 'Optimist',
    returnRate: 10,
    raiseMultiplier: 1.2,
    savingsMultiplier: 1.1,
    roasts: [
      "Big vibes. The market has your back — until it doesn't. Hope that 10% holds.",
      "Optimism is free. Returns are not. But hey, the math is the math.",
      "Glass half full AND earning compound interest. Respect.",
      "You're betting on blue skies. Historically, that's worked out fine.",
    ]
  },
  fire: {
    label: 'FIRE Mode',
    returnRate: 8,
    raiseMultiplier: 1.0,
    savingsMultiplier: 1.5,
    roasts: [
      "50%+ savings rate? You're basically a monk with a brokerage account.",
      "Your coworkers are buying Teslas. You're buying index funds. You'll win.",
      "Financial Independence. Retiring Early. Eating ramen. Living your best life.",
      "The FIRE community salutes you. Please never stop posting your spreadsheets.",
    ]
  },
  techbro: {
    label: 'Tech Bro',
    returnRate: 12,
    raiseMultiplier: 1.5,
    savingsMultiplier: 1.3,
    roasts: [
      "RSUs, signing bonuses, and a savings rate that would make Dave Ramsey weep with joy.",
      "You're either going to be very rich or very broke. The FAANG path has no chill.",
      "50% YoY raises and 12% returns? Either you work at a unicorn or you're lying.",
      "Your stock options are going to moon. Or vest into nothing. Toss a coin.",
    ]
  },
  crypto: {
    label: 'Crypto Gambler',
    returnRate: 25,
    raiseMultiplier: 1.0,
    savingsMultiplier: 0.8,
    roasts: [
      "25% annual returns! That's the dream. Also the average loss in a bear market.",
      "You've probably already made and lost $1M in crypto. This time's different, right?",
      "Diamond hands, paper wallet, and a timeline that only works if you don't sell at -80%.",
      "The calculator says 3 years. The market says LOL. We'll see who's right.",
    ]
  },
  slowburn: {
    label: 'Slow & Steady',
    returnRate: 5,
    raiseMultiplier: 0.8,
    savingsMultiplier: 0.9,
    roasts: [
      "The tortoise always wins. Even if it takes 40 years.",
      "5% returns, modest raises, realistic savings. You're not retiring at 40 but you will retire.",
      "Slow money is real money. You're playing the long game and that's completely fine.",
      "Your grandparents did it this way and they're fine. You're gonna be fine.",
    ]
  },
  hustle: {
    label: 'Hustle Lord',
    returnRate: 9,
    raiseMultiplier: 1.3,
    savingsMultiplier: 2.0,
    roasts: [
      "Day job. Side job. Side-side job. Your calendar has no weekends and neither does your portfolio.",
      "You're saving twice what a normal person makes. That's either inspiring or a cry for help.",
      "Three revenue streams before breakfast. Your therapist says this is a problem. Your brokerage doesn't care.",
      "The grind is real. The compound interest is realer. Keep going, you unhinged legend.",
    ]
  },
  minimalist: {
    label: 'Monk Mode',
    returnRate: 7,
    raiseMultiplier: 0.6,
    savingsMultiplier: 1.9,
    roasts: [
      "You don't want more money. You want fewer expenses. That's actually the cheat code.",
      "Monk mode: no subscriptions, no dining out, no fun — and also no working until 65.",
      "You spend less than a medieval peasant and invest the rest. Respect.",
      "Your idea of a luxury purchase is a name-brand tin of sardines. The numbers love you for it.",
    ]
  },
  yolo: {
    label: 'YOLO',
    returnRate: 22,
    raiseMultiplier: 1.0,
    savingsMultiplier: 0.5,
    roasts: [
      "You're betting it all on 30%+ returns and saving almost nothing. Bold strategy, Cotton.",
      "The math says yes. The market says hold my beer. Good luck out there.",
      "This is either going to be a great story or a cautionary tale. We'll find out which.",
      "YOLO mode: statistically unlikely, emotionally very online, and weirdly respectable.",
    ]
  },
  latebloomer: {
    label: 'Late Bloomer',
    returnRate: 7,
    raiseMultiplier: 1.0,
    savingsMultiplier: 1.2,
    roasts: [
      "Starting late doesn't mean finishing last. Compound interest doesn't care when you showed up.",
      "Better late than never. Literally — the math on 'never' is significantly worse.",
      "Warren Buffett made 90% of his wealth after 65. You're still in the game.",
      "You found the path after everyone else started running. That's fine. Paths don't expire.",
    ]
  }
};

// ─── Roast Messages by Timeline ────────────────────────────────────────────
const TIMELINE_ROASTS = {
  under5: [
    "Under 5 years? You're either already rich or you made a math error. Either way — congrats.",
    "5 years or less. That's Speed Run tier. The algorithm bows to you.",
    "You'll hit $1M before most people finish paying off their student loans. Obscene.",
  ],
  '5to10': [
    "Less than a decade. You're in the top tier. Don't blow it on a boat.",
    "10 years to a million. You'll be in your prime with full pockets. Solid.",
    "Single digit years. That's what aggressive savings + compound interest actually looks like.",
  ],
  '10to20': [
    "10-20 years is the normal range. You're doing fine. Boring, but fine.",
    "A decade and a half. You'll look back and be shocked it went that fast.",
    "Steady and achievable. The compounding hasn't kicked into overdrive yet, but it will.",
  ],
  '20to30': [
    "Two decades is a long time, but compound interest is just warming up now.",
    "20+ years. Your future self will be grateful your current self didn't give up.",
    "The investments you make today won't feel real for 15 years. Then they explode.",
  ],
  over30: [
    "30+ years, huh. Consider this your wake-up call. Time to boost that savings rate.",
    "That's a long runway. The good news: you have time to change it completely.",
    "The math says 30+ years. But the math changes completely if you save $500 more per month.",
  ]
};

// ─── Badge Definitions ──────────────────────────────────────────────────────
const BADGES = [
  {
    id: 'badge-fast',
    icon: '⚡',
    name: 'Speed Runner',
    description: 'Less than 5 years to $1M',
    check: (r) => r.years <= 5
  },
  {
    id: 'badge-saver',
    icon: '💰',
    name: 'Power Saver',
    description: 'Saving over $2,000/month',
    check: (r) => r.monthlySavings >= 2000
  },
  {
    id: 'badge-investor',
    icon: '📈',
    name: 'Compounding King',
    description: 'Interest exceeds contributions',
    check: (r) => r.totalInterest > r.totalContributed
  },
  {
    id: 'badge-decade',
    icon: '🗓️',
    name: 'Decade Club',
    description: 'Less than 10 years to $1M',
    check: (r) => r.years <= 10
  },
  {
    id: 'badge-started',
    icon: '🎯',
    name: 'Already Started',
    description: 'Have at least $1,000 saved',
    check: (r) => r.currentSavings >= 1000
  },
  {
    id: 'badge-optimist',
    icon: '🌙',
    name: 'Moonshot',
    description: 'Return rate above 15%',
    check: (r) => r.returnRate >= 15
  }
];

// ─── Utility Functions ──────────────────────────────────────────────────────
function formatCurrency(n, compact = false) {
  if (compact) {
    if (n >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(n);
}

function formatYears(years) {
  const y = Math.floor(years);
  const m = Math.round((years - y) * 12);
  if (m === 0) return `${y} year${y !== 1 ? 's' : ''}`;
  if (y === 0) return `${m} month${m !== 1 ? 's' : ''}`;
  return `${y} yr${y !== 1 ? 's' : ''} ${m} mo`;
}

function getTargetYear(yearsFromNow) {
  return new Date().getFullYear() + Math.ceil(yearsFromNow);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function animateValue(el, start, end, duration, formatter) {
  const startTime = performance.now();
  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = start + (end - start) * eased;
    el.textContent = formatter(current);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function showToast(msg, duration = 2500) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ─── Core Calculation Engine ────────────────────────────────────────────────
function calculateMillionTimeline(params) {
  const {
    currentSavings,
    monthlySavings,
    annualReturnRate,
    inflationRate,
    annualRaisePct,
  } = params;

  const TARGET = 1_000_000;
  const realReturnRate = (1 + annualReturnRate / 100) / (1 + inflationRate / 100) - 1;
  const monthlyRealReturn = Math.pow(1 + realReturnRate, 1 / 12) - 1;
  const monthlyRaiseRate = Math.pow(1 + annualRaisePct / 100, 1 / 12) - 1;

  let balance = currentSavings;
  let currentMonthly = monthlySavings;
  let totalContributed = currentSavings;
  let months = 0;
  const MAX_MONTHS = 600; // 50 years cap
  const chartData = [{ month: 0, balance: currentSavings, contributed: currentSavings }];

  while (balance < TARGET && months < MAX_MONTHS) {
    balance = balance * (1 + monthlyRealReturn) + currentMonthly;
    totalContributed += currentMonthly;
    currentMonthly *= (1 + monthlyRaiseRate);
    months++;

    if (months % 12 === 0) {
      chartData.push({
        month: months,
        year: months / 12,
        balance: Math.round(balance),
        contributed: Math.round(totalContributed)
      });
    }
  }

  const years = months / 12;
  const totalInterest = Math.max(0, TARGET - totalContributed);

  return {
    years,
    months,
    targetYear: getTargetYear(years),
    totalContributed: Math.round(totalContributed),
    totalInterest: Math.round(totalInterest),
    nominalMillion: TARGET,
    realValue: Math.round(TARGET / Math.pow(1 + inflationRate / 100, years)),
    currentSavings,
    monthlySavings,
    returnRate: annualReturnRate,
    chartData,
    capped: months >= MAX_MONTHS
  };
}

// ─── Chart Rendering ─────────────────────────────────────────────────────────
let wealthChart = null;

function renderChart(chartData) {
  const ctx = document.getElementById('wealth-chart').getContext('2d');

  if (wealthChart) {
    wealthChart.destroy();
  }

  const labels = chartData.map(d => d.year ? `${d.year}yr` : 'Now');
  const balanceData = chartData.map(d => d.balance);
  const contributedData = chartData.map(d => d.contributed);

  wealthChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Total Wealth',
          data: balanceData,
          borderColor: '#f5c842',
          backgroundColor: 'rgba(245, 200, 66, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
        {
          label: 'Money Contributed',
          data: contributedData,
          borderColor: '#22d3ee',
          backgroundColor: 'rgba(34, 211, 238, 0.05)',
          borderWidth: 1.5,
          fill: false,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
          borderDash: [4, 4],
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          labels: {
            color: '#94a3b8',
            font: { family: 'Inter', size: 11 },
            usePointStyle: true,
            pointStyleWidth: 8,
          }
        },
        tooltip: {
          backgroundColor: '#0f1420',
          borderColor: '#1e2d45',
          borderWidth: 1,
          titleColor: '#f1f5f9',
          bodyColor: '#94a3b8',
          padding: 12,
          callbacks: {
            label: function(ctx) {
              return ` ${ctx.dataset.label}: ${formatCurrency(ctx.raw, true)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: '#1e2d45', drawBorder: false },
          ticks: {
            color: '#4a5568',
            font: { size: 10, family: 'Inter' },
            maxTicksLimit: 8
          }
        },
        y: {
          grid: { color: '#1e2d45', drawBorder: false },
          ticks: {
            color: '#4a5568',
            font: { size: 10, family: 'Inter' },
            callback: (v) => formatCurrency(v, true)
          }
        }
      }
    }
  });
}

// ─── Badge Evaluation ────────────────────────────────────────────────────────
function evaluateBadges(result) {
  BADGES.forEach(badge => {
    const el = document.getElementById(badge.id);
    if (!el) return;
    if (badge.check(result)) {
      el.classList.add('unlocked');
    } else {
      el.classList.remove('unlocked');
    }
  });
}

// ─── Roast Generator ─────────────────────────────────────────────────────────
function generateRoast(result, vibeName) {
  const vibeRoasts = VIBES[vibeName]?.roasts || [];
  const years = result.years;

  let timelineRoasts;
  if (years <= 5) timelineRoasts = TIMELINE_ROASTS.under5;
  else if (years <= 10) timelineRoasts = TIMELINE_ROASTS['5to10'];
  else if (years <= 20) timelineRoasts = TIMELINE_ROASTS['10to20'];
  else if (years <= 30) timelineRoasts = TIMELINE_ROASTS['20to30'];
  else timelineRoasts = TIMELINE_ROASTS.over30;

  if (result.capped) {
    return "At this rate, you might not hit $1M in 50 years. Try boosting your monthly savings or return rate.";
  }

  // 50/50 chance between vibe roast and timeline roast
  const pool = [...vibeRoasts, ...timelineRoasts];
  return pick(pool);
}

// ─── Progress Bar ────────────────────────────────────────────────────────────
function animateProgress(currentSavings, target) {
  const pct = Math.min((currentSavings / target) * 100, 95);
  const fill = document.getElementById('progress-fill');
  setTimeout(() => {
    fill.style.width = Math.max(pct, 2) + '%';
  }, 200);
}

// ─── Main Calculate Function ─────────────────────────────────────────────────
let currentVibe = 'realistic';
let lastResult = null;

function runCalculation() {
  const currentSavings = parseFloat(document.getElementById('current-savings').value) || 0;
  const monthlySavings = parseFloat(document.getElementById('monthly-savings').value) || 0;
  const annualIncome = parseFloat(document.getElementById('annual-income').value) || 0;
  const annualRaisePct = parseFloat(document.getElementById('annual-raise').value) || 0;
  const returnRate = parseFloat(document.getElementById('return-rate').value) || 7;
  const inflationRate = parseFloat(document.getElementById('inflation-rate').value) || 2.5;

  const vibe = VIBES[currentVibe];
  const adjustedReturn = returnRate * (currentVibe === 'realistic' ? 1 : 1);
  const adjustedMonthly = monthlySavings * vibe.savingsMultiplier;

  const result = calculateMillionTimeline({
    currentSavings,
    monthlySavings: adjustedMonthly,
    annualReturnRate: adjustedReturn,
    inflationRate,
    annualRaisePct: annualRaisePct * vibe.raiseMultiplier,
  });

  result.monthlySavings = adjustedMonthly;
  result.returnRate = adjustedReturn;
  lastResult = result;

  // ── Update DOM ──

  // Years number (animated)
  const yearsEl = document.getElementById('result-years');
  const displayYears = result.capped ? '50+' : formatYears(result.years);

  if (result.capped) {
    yearsEl.textContent = '50+ yrs';
    yearsEl.style.fontSize = 'clamp(36px, 6vw, 56px)';
  } else {
    const targetYear = Math.floor(result.years);
    animateValue(yearsEl, 0, targetYear, 1200, (v) => {
      return Math.round(v) + (Math.round(v) === 1 ? ' year' : ' years');
    });
  }

  // Target date
  const dateStr = document.getElementById('result-date-str');
  if (!result.capped) {
    dateStr.textContent = result.targetYear;
  } else {
    dateStr.textContent = 'way too long from now';
  }

  // Roast
  document.getElementById('roast-text').textContent = generateRoast(result, currentVibe);

  // Progress bar
  animateProgress(currentSavings, 1_000_000);

  // Stats
  animateValue(
    document.getElementById('stat-total-contributed'),
    0, result.totalContributed, 1000,
    (v) => formatCurrency(v, true)
  );
  animateValue(
    document.getElementById('stat-interest-earned'),
    0, result.totalInterest, 1000,
    (v) => formatCurrency(v, true)
  );
  animateValue(
    document.getElementById('stat-net-worth-real'),
    0, result.realValue, 1000,
    (v) => formatCurrency(v, true)
  );

  // Chart
  if (result.chartData.length > 1) {
    renderChart(result.chartData);
  }

  // Badges
  evaluateBadges(result);

  // Show results
  const panel = document.getElementById('results-panel');
  panel.classList.add('visible');
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Update share modal data
  document.getElementById('share-year').textContent = result.capped ? '2075+' : result.targetYear;
  document.getElementById('share-years-text').textContent = result.capped ? '50+ years' : formatYears(result.years);
}

// ─── Vibe Mode Switching ─────────────────────────────────────────────────────
function initVibePills() {
  document.querySelectorAll('.vibe-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.vibe-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentVibe = pill.dataset.vibe;

      // Auto-update return rate slider to vibe default
      const vibe = VIBES[currentVibe];
      if (vibe) {
        const slider = document.getElementById('return-rate');
        slider.value = vibe.returnRate;
        document.getElementById('return-rate-display').textContent = vibe.returnRate.toFixed(1) + '%';
      }
    });
  });
}

// ─── Slider Display Updates ──────────────────────────────────────────────────
function initSliders() {
  const returnSlider = document.getElementById('return-rate');
  const returnDisplay = document.getElementById('return-rate-display');
  const inflationSlider = document.getElementById('inflation-rate');
  const inflationDisplay = document.getElementById('inflation-rate-display');

  function updateSliderTrack(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const val = parseFloat(slider.value);
    const pct = ((val - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, var(--color-gold) 0%, var(--color-gold) ${pct}%, var(--color-surface-3) ${pct}%, var(--color-surface-3) 100%)`;
  }

  returnSlider.addEventListener('input', () => {
    returnDisplay.textContent = parseFloat(returnSlider.value).toFixed(1) + '%';
    updateSliderTrack(returnSlider);
  });

  inflationSlider.addEventListener('input', () => {
    inflationDisplay.textContent = parseFloat(inflationSlider.value).toFixed(1) + '%';
    updateSliderTrack(inflationSlider);
  });

  // Init tracks
  updateSliderTrack(returnSlider);
  updateSliderTrack(inflationSlider);
}

// ─── Share Functionality ──────────────────────────────────────────────────────
function initShare() {
  const modal = document.getElementById('share-modal');

  // Open modal
  document.getElementById('btn-share-card').addEventListener('click', () => {
    modal.classList.add('open');
  });

  // Close modal
  document.getElementById('share-modal-close').addEventListener('click', () => {
    modal.classList.remove('open');
  });

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  // Tweet
  document.getElementById('btn-tweet').addEventListener('click', () => {
    if (!lastResult) return;
    const year = lastResult.capped ? '2075+' : lastResult.targetYear;
    const yrs = lastResult.capped ? '50+ years' : formatYears(lastResult.years);
    const text = `I'll be a millionaire by ${year} (${yrs} away) according to this calculator 🚀💰`;
    const url = 'https://whenwillimakeamillion.com';
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank',
      'width=550,height=420'
    );
  });

  // Copy roast
  document.getElementById('btn-copy-roast').addEventListener('click', () => {
    const roast = document.getElementById('roast-text').textContent;
    const year = lastResult ? lastResult.targetYear : '';
    const copyText = `${roast} — Find your millionaire date at whenwillimakeamillion.com`;
    navigator.clipboard.writeText(copyText).then(() => {
      showToast('✅ Copied to clipboard!');
    });
  });

  // Copy link
  document.getElementById('btn-copy-link').addEventListener('click', () => {
    navigator.clipboard.writeText('https://whenwillimakeamillion.com').then(() => {
      showToast('✅ Link copied!');
      document.getElementById('btn-copy-link').textContent = '✅ Copied!';
      setTimeout(() => {
        document.getElementById('btn-copy-link').textContent = '📋 Copy to Clipboard';
      }, 2000);
    });
  });
}

// ─── Calculate Button ────────────────────────────────────────────────────────
function initCalculateBtn() {
  document.getElementById('btn-calculate').addEventListener('click', runCalculation);

  // Also run on Enter key in any input
  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') runCalculation();
    });
  });
}

// ─── Auto-run on URL params ───────────────────────────────────────────────────
function checkUrlParams() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('s')) {
    const s = parseInt(params.get('s'));
    const m = parseInt(params.get('m'));
    const r = parseFloat(params.get('r'));
    if (!isNaN(s)) document.getElementById('current-savings').value = s;
    if (!isNaN(m)) document.getElementById('monthly-savings').value = m;
    if (!isNaN(r)) {
      document.getElementById('return-rate').value = r;
      document.getElementById('return-rate-display').textContent = r.toFixed(1) + '%';
    }
    runCalculation();
  }
}

// ─── Init ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initVibePills();
  initSliders();
  initShare();
  initCalculateBtn();
  checkUrlParams();
});
