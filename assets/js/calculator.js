/**
 * WhenWillIMakeAMillion.com — Calculator Engine v2
 * Compound interest + gamification + roasts + chaos
 */

'use strict';

// ─── Vibe Mode Config ───────────────────────────────────────────────────────
const VIBES = {
  realistic: {
    label: 'Realistic',
    emoji: '😐',
    tagline: 'Boring, effective, probably right.',
    returnRate: 7,
    raiseMultiplier: 1.0,
    savingsMultiplier: 1.0,
    roasts: [
      "Solid plan. You're not getting rich quick — you're getting rich eventually.",
      "Methodical. Boring. Effective. This is how wealth actually works and it sucks to admit.",
      "The S&P 500 averaged 10% historically. You're being conservative. Your future self says thanks.",
      "Your financial advisor would approve. Your Instagram followers will not.",
      "Realistic mode: for people who've been burned before and learned. Respect.",
      "No drama, no memes, no crypto. Just the slow march to rich. You've got this.",
    ]
  },
  optimist: {
    label: 'Optimist',
    emoji: '🌟',
    tagline: '10% returns forever. Sure.',
    returnRate: 10,
    raiseMultiplier: 1.2,
    savingsMultiplier: 1.1,
    roasts: [
      "Big vibes. The market has your back — until the next recession. Hope that 10% holds, champ.",
      "Optimism is free. Sustained 10% returns are not. But hey, historically it's worked.",
      "Glass half full AND earning compound interest. You're either delusional or right. Unclear.",
      "You're betting on blue skies every year. Historically that's worked out. Statistically you'll panic sell in 2031.",
      "12% raise per year, 10% returns. That's two very spicy assumptions but I'm here for it.",
      "Optimist mode: because life is short and pessimism is exhausting.",
    ]
  },
  fire: {
    label: 'FIRE Mode',
    emoji: '🔥',
    tagline: '50%+ savings rate. Monk life.',
    returnRate: 8,
    raiseMultiplier: 1.0,
    savingsMultiplier: 1.5,
    roasts: [
      "50%+ savings rate? You're basically a monk with a brokerage account and a podcast nobody listens to.",
      "Your coworkers are buying Teslas. You're buying index funds. You'll win. They'll look better doing it.",
      "Financial Independence. Retiring Early. Eating rice and beans. Living your best frugal life.",
      "The FIRE community salutes you. Please never stop posting your savings rate on Reddit.",
      "You spend less than a medieval peasant and invest the rest. The math absolutely loves you.",
      "FIRE mode activated. Your social life is dead but your net worth is thriving.",
    ]
  },
  techbro: {
    label: 'Tech Bro',
    emoji: '💻',
    tagline: 'RSUs go brrr.',
    returnRate: 12,
    raiseMultiplier: 1.5,
    savingsMultiplier: 1.3,
    roasts: [
      "RSUs, signing bonuses, and a savings rate that would make Dave Ramsey weep with joy.",
      "You're either going to be very rich or very laid off. The FAANG path has no chill.",
      "50% YoY raises and 12% returns? Either you're at a unicorn or you're delusional. Could be both.",
      "Your stock options are going to moon. Or vest into nothing. Toss a coin, pray to Nvidia.",
      "ChatGPT wrote your cover letter, your code, and maybe your savings plan too. And honestly, it's working.",
      "15-hour days, meal prepped lunches, and a Jira board that haunts your dreams. Millionaire by 38.",
    ]
  },
  crypto: {
    label: 'Crypto Gambler',
    emoji: '🎰',
    tagline: '25% returns. Diamond hands.',
    returnRate: 25,
    raiseMultiplier: 1.0,
    savingsMultiplier: 0.8,
    roasts: [
      "25% annual returns! That's the dream. Also the average loss in a bear market. Vibes-based investing.",
      "You've probably already made and lost $1M in crypto. This time's different though, right? Right??",
      "Diamond hands, paper wallet, and a timeline that only works if you don't panic sell at -80%. Good luck.",
      "The calculator says 3 years. The market says LOL then cries then laughs again. Stay hydrated.",
      "You have a dedicated Telegram for shitcoin alpha. This is not financial advice. Neither is this.",
      "Crypto bro mode: statistically reckless, emotionally unhinged, and occasionally very right.",
    ]
  },
  slowburn: {
    label: 'Slow & Steady',
    emoji: '🐢',
    tagline: 'The tortoise always wins. Probably.',
    returnRate: 5,
    raiseMultiplier: 0.8,
    savingsMultiplier: 0.9,
    roasts: [
      "The tortoise always wins. Even if it takes 40 years and a hip replacement.",
      "5% returns, modest raises, realistic savings. You won't retire at 40 but you will retire.",
      "Slow money is real money. You're playing the long game and that is genuinely admirable.",
      "Your grandparents did it this way. They're fine. Probably complaining about property taxes somewhere.",
      "Safe, steady, sustainable. The personal finance answer nobody makes YouTube videos about.",
      "Slow & Steady: the official mode of people who've read one too many 'don't time the market' articles.",
    ]
  },
  hustle: {
    label: 'Hustle Lord',
    emoji: '💪',
    tagline: '3 income streams before breakfast.',
    returnRate: 9,
    raiseMultiplier: 1.3,
    savingsMultiplier: 2.0,
    roasts: [
      "Day job. Side job. Side-side job. Your calendar has no weekends and your therapist has a Notion board for your issues.",
      "You're saving twice what a normal person makes. That's either inspiring or a cry for help. Or both.",
      "Three revenue streams before breakfast. Your cortisol levels are a war crime.",
      "The grind is real. The compound interest is realer. Keep going, you absolutely unhinged legend.",
      "Hustle mode: because sleeping 8 hours felt like leaving money on the table.",
      "You've automated 6 income streams, outsourced your laundry, and still somehow have imposter syndrome.",
    ]
  },
  minimalist: {
    label: 'Monk Mode',
    emoji: '🧘',
    tagline: 'No subscriptions. No fun. No regrets.',
    returnRate: 7,
    raiseMultiplier: 0.6,
    savingsMultiplier: 1.9,
    roasts: [
      "You don't want more money. You want fewer expenses. That's actually the cheat code and everyone hates you for it.",
      "Monk mode: no subscriptions, no dining out, no friends who spend money — and also no working until 65.",
      "Your idea of a luxury purchase is a name-brand tin of sardines. The numbers absolutely love you for it.",
      "You spend less than a medieval peasant and invest the rest. Monastic wealth-building.",
      "Netflix? Canceled. Gym? Canceled. Social life? Strategically deprioritized. Net worth? Ascending.",
      "Monk mode activated. You live in a studio, eat rice, and are quietly going to be richer than everyone.",
    ]
  },
  yolo: {
    label: 'YOLO',
    emoji: '💀',
    tagline: 'All in. Eyes closed.',
    returnRate: 22,
    raiseMultiplier: 1.0,
    savingsMultiplier: 0.5,
    roasts: [
      "You're betting it all on 22% returns and saving almost nothing. Bold strategy, Cotton. Let's see how it plays out.",
      "The math says yes. The market says hold my beer. Your therapist says please stabilize.",
      "This is either going to be a great story or a deeply humbling subreddit post. We'll find out.",
      "YOLO mode: statistically unlikely, emotionally chaotic, and weirdly respectable.",
      "You spend freely, bet aggressively, and live fully. Millionaire or cautionary tale. No in-between.",
      "Every financial advisor just felt a chill run down their spine and they don't know why.",
    ]
  },
  latebloomer: {
    label: 'Late Bloomer',
    emoji: '🌱',
    tagline: 'Started late. Still in the game.',
    returnRate: 7,
    raiseMultiplier: 1.0,
    savingsMultiplier: 1.2,
    roasts: [
      "Starting late doesn't mean finishing last. Compound interest doesn't care when you showed up.",
      "Better late than never. Literally — the math on 'never' is catastrophically worse.",
      "Warren Buffett made 90% of his wealth after age 65. You're still very much in the game.",
      "You found the path after everyone else started running. Paths don't expire. You're fine.",
      "Late bloomer: wasted your 20s, found your 30s, about to absolutely eat in your 40s.",
      "The best time to start was 20. The second best time is now. You chose second best. Not bad.",
    ]
  }
};

// ─── Instant Input Roasts (by monthly savings amount) ──────────────────────
function getInstantRoast(monthly) {
  if (monthly === 0) return "Saving $0/month. Bold. Brave. Broke.";
  if (monthly < 20) return `$${monthly}/month? That's not savings, that's a rounding error.`;
  if (monthly < 50) return `$${monthly}/month. At this rate you'll retire when you're 147.`;
  if (monthly < 100) return `$${monthly}/month. Your coffee habit costs more than this.`;
  if (monthly < 200) return `$${monthly}/month. It's a start. A very small, humble start.`;
  if (monthly < 500) return `$${monthly}/month. Getting warmer. Not warm, but warmer.`;
  if (monthly < 1000) return `$${monthly}/month. Solid. Compound interest is noticing you.`;
  if (monthly < 2000) return `$${monthly}/month. This is real money. You're actually doing it.`;
  if (monthly < 3000) return `$${monthly}/month. Power saver. Your future self is crying happy tears.`;
  if (monthly < 5000) return `$${monthly}/month. Are you okay? (In the best possible way.)`;
  if (monthly < 10000) return `$${monthly}/month. You don't need this calculator. You need a yacht brochure.`;
  return `$${monthly.toLocaleString()}/month. Okay. We're done here. You're going to be fine.`;
}

// ─── Roast Messages by Timeline ────────────────────────────────────────────
const TIMELINE_ROASTS = {
  under3: [
    "Under 3 years?! You're already basically rich. Why are you on this site?",
    "Speed run complete. You're the final boss of personal finance.",
    "3 years to $1M. That's not a timeline, that's a trailer.",
  ],
  under5: [
    "Under 5 years? You made a math error or you're already wealthy. Either way — congrats.",
    "5 years or less. That's Speed Run tier. The algorithm bows to you.",
    "You'll hit $1M before most people finish paying off their student loans. Obscene wealth incoming.",
  ],
  '5to10': [
    "Less than a decade. You're top tier. Do not blow it on a boat. Seriously. Not a boat.",
    "Single digit years. That's what aggressive savings + compound interest actually looks like.",
    "10 years to a million. You'll be in your prime with full pockets. Don't you dare lifestyle inflate.",
  ],
  '10to20': [
    "10-20 years is completely normal. You're fine. Boring, but fine. Boring wins.",
    "A decade and a half. You'll look back and be shocked how fast it went.",
    "Steady and achievable. The compounding hasn't hit overdrive yet, but just wait.",
  ],
  '20to30': [
    "Two decades. Compound interest is just warming up. Your 50-year-old self will be ecstatic.",
    "20+ years. Your future self will be grateful your current self didn't give up and buy a boat.",
    "The money you put in today won't feel real for 15 years. Then it explodes. Trust the math.",
  ],
  over30: [
    "30+ years. This is your wake-up call. Time to boost that savings rate significantly.",
    "That's a long runway but the math changes completely if you save $500 more per month.",
    "30 years is a long time but also compound interest doesn't care about your excuses.",
  ],
  capped: [
    "Not in your lifetime at this rate, pal. Bit harsh but I'm being honest.",
    "The math says no. But the math can be changed. Start with monthly savings.",
    "50+ years. Time to get creative. Pick up a side hustle, sell stuff, or dramatically up your savings rate.",
    "Better luck in your next life. Or, alternatively, save more this one.",
  ]
};

// ─── Result Messages (shown after calculation, by timeline) ────────────────
const RESULT_MESSAGES = {
  under3: [
    "You absolute unit. You're basically already there.",
    "Are you sure you didn't accidentally input your trust fund?",
    "Speed. Runner. Status. Unlocked.",
  ],
  under5: [
    "Genuinely impressive. Don't screw this up.",
    "You're going to make it. You might actually make it.",
    "5 years. That's one bad relationship and two job changes away. Focus.",
  ],
  '5to10': [
    "Solid. Not flashy, but solid. Stay the course.",
    "Under a decade. You're doing way better than you think.",
    "Don't lifestyle inflate when you get the raise. I'm watching.",
  ],
  '10to20': [
    "You're on the right path. Just... try not to buy a timeshare.",
    "Fifteen years sounds long. It isn't. Keep going.",
    "You'll get there. Boring wins. Boring always wins.",
  ],
  '20to30': [
    "Start adding $500/month and watch this number shrink dramatically.",
    "You have time to fix this. Please fix this.",
    "25 years is a long time. It's also 300 months of compound interest. It adds up.",
  ],
  over30: [
    "Sorry pal, not in your lifetime unless something changes.",
    "Time to pick up a side hustle. Or three. Your future self is begging.",
    "Second job. Night shifts. eBay hustle. Whatever it takes — the math responds fast.",
    "Start a side gig, sell everything you don't use, and crank that savings rate up.",
    "Not great. Not permanent. Something needs to change and it's probably not the calculator.",
  ],
  capped: [
    "Not in your lifetime, chief. I'm sorry.",
    "The math has spoken and it's not kind. Add savings. Urgently.",
    "Have you considered inheriting money? Asking for a calculator.",
    "In this economy? With these numbers? Thoughts and prayers.",
  ]
};

// ─── Level System ────────────────────────────────────────────────────────────
const LEVELS = [
  { name: 'Broke Boi', icon: '😬', maxYears: 100, minYears: 35 },
  { name: 'Struggling', icon: '😤', maxYears: 35, minYears: 25 },
  { name: 'On Track', icon: '😌', maxYears: 25, minYears: 15 },
  { name: 'Solid Saver', icon: '💪', maxYears: 15, minYears: 10 },
  { name: 'Decade Club', icon: '🎯', maxYears: 10, minYears: 5 },
  { name: 'Speed Runner', icon: '⚡', maxYears: 5, minYears: 0 },
];

function getLevel(years) {
  if (years >= 50) return { name: 'Broke Boi', icon: '😬' };
  for (const level of LEVELS) {
    if (years >= level.minYears && years < level.maxYears) return level;
  }
  return LEVELS[LEVELS.length - 1];
}

// ─── Daily Challenges ────────────────────────────────────────────────────────
const DAILY_CHALLENGES = [
  { text: 'Try FIRE mode and see how fast savings rate changes your timeline', emoji: '🔥' },
  { text: 'Add exactly $100 more to monthly savings and watch the years drop', emoji: '💯' },
  { text: 'Calculate in Monk Mode — you might be surprised', emoji: '🧘' },
  { text: 'What if you got a 5% raise next year? Try it in the inputs', emoji: '📈' },
  { text: 'Crank the return rate to 12% and dream a little', emoji: '🌙' },
  { text: 'Try Hustle Lord mode — what if you had a side hustle?', emoji: '💼' },
  { text: 'What does another $50/month of savings buy you in years?', emoji: '⏰' },
  { text: 'Share your result and roast a friend into saving more', emoji: '🚀' },
  { text: 'Calculate your FIRE number — what return rate hits $1M fastest?', emoji: '🎯' },
  { text: 'Try Crypto Gambler mode. Then switch to Realistic. Feel the difference.', emoji: '🎰' },
];

function getDailyChallenge() {
  const day = Math.floor(Date.now() / 86400000);
  return DAILY_CHALLENGES[day % DAILY_CHALLENGES.length];
}

// ─── Streak Counter ───────────────────────────────────────────────────────────
function getStreak() {
  const today = Math.floor(Date.now() / 86400000);
  const lastVisit = parseInt(localStorage.getItem('ww_last_visit') || '0');
  let streak = parseInt(localStorage.getItem('ww_streak') || '0');

  if (today === lastVisit) return streak;
  if (today === lastVisit + 1) {
    streak += 1;
  } else {
    streak = 1;
  }

  localStorage.setItem('ww_streak', streak);
  localStorage.setItem('ww_last_visit', today);
  return streak;
}

// ─── Extra Cash Ideas ─────────────────────────────────────────────────────────
const EXTRA_CASH_IDEAS = [
  { title: 'Weekend bartending', income: '$400–1,200/mo', effort: 'Low bar', emoji: '🍸', desc: 'Friday and Saturday nights. Cash tips, social scene, zero sitting at a desk. One of the best bang-for-time hustles out there.' },
  { title: 'Food delivery', income: '$500–1,500/mo', effort: 'Medium effort', emoji: '🛵', desc: 'Uber Eats, DoorDash, or Instacart. Nights and weekends. Decent hourly if you optimize your zone.' },
  { title: 'Freelance skills', income: '$500–5,000/mo', effort: 'High effort', emoji: '💻', desc: 'Writing, design, dev, video editing. Fiverr or direct clients. Highest ceiling of any hustle on this list.' },
  { title: 'Rent your car', income: '$300–700/mo', effort: 'Low effort', emoji: '🚗', desc: 'Turo while it sits in your driveway. Your car becomes a vending machine.' },
  { title: 'Sell stuff', income: '$200–2,000 one-time', effort: 'One-time', emoji: '📦', desc: 'Facebook Marketplace, eBay, Depop. Most people have $1,000–3,000 of sellable stuff doing nothing.' },
  { title: 'Survey sites', income: '$50–200/mo', effort: 'Very low', emoji: '📋', desc: 'Swagbucks, Survey Junkie. Bottom of the barrel earnings but literally requires zero skill.' },
  { title: 'Teach something', income: '$200–2,000/mo', effort: 'Medium', emoji: '🎓', desc: 'Tutor online via Wyzant or Chegg. Teach a skill on Teachable. People pay for what you already know.' },
  { title: 'Resell thrift finds', income: '$300–1,500/mo', effort: 'Medium', emoji: '🏷️', desc: 'Thrift stores, garage sales, then eBay. Takes an eye and some hustle but the margins are insane.' },
];

// ─── Share Templates (TikTok / IG) ───────────────────────────────────────────

// ─── Pure JS Canvas Confetti ────────────────────────────────────────────────
function launchConfetti(duration = 4000) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#f5c842', '#22d3ee', '#4ade80', '#f87171', '#a78bfa', '#fb923c', '#38bdf8'];
  const particles = Array.from({ length: 200 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 8 + 3,
    d: Math.random() * 200 + 20,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.random() * 10 - 10,
    tiltAngleIncrement: Math.random() * 0.07 + 0.04,
    tiltAngle: 0,
    shape: Math.random() > 0.5 ? 'rect' : 'circle',
    w: Math.random() * 12 + 6,
    h: Math.random() * 6 + 4,
  }));

  let angle = 0;
  const startTime = performance.now();

  function draw() {
    const elapsed = performance.now() - startTime;
    const alpha = elapsed > duration - 1000 ? Math.max(0, 1 - (elapsed - (duration - 1000)) / 1000) : 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    angle += 0.01;

    particles.forEach((p) => {
      p.tiltAngle += p.tiltAngleIncrement;
      p.y += (Math.cos(angle + p.d) + 1 + p.r / 2) * 1.8;
      p.x += Math.sin(angle) * 0.6;
      p.tilt = Math.sin(p.tiltAngle) * 15;

      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(p.x + p.tilt, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.save();
        ctx.translate(p.x + p.tilt, p.y);
        ctx.rotate(p.tiltAngle);
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    });

    if (elapsed < duration) {
      requestAnimationFrame(draw);
    } else {
      ctx.globalAlpha = 1;
      document.body.removeChild(canvas);
    }
  }

  requestAnimationFrame(draw);
}

// ─── Rocket Launch Animation ─────────────────────────────────────────────────
function triggerRocketLaunch() {
  const rocket = document.getElementById('launch-rocket');
  if (!rocket) return;

  rocket.style.display = 'block';
  rocket.classList.remove('launched');

  // Force reflow
  void rocket.offsetWidth;
  rocket.classList.add('launched');

  setTimeout(() => {
    rocket.style.display = 'none';
    rocket.classList.remove('launched');
  }, 2000);
}

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
    const eased = 1 - Math.pow(1 - progress, 3);
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

// ─── Core Calculation Engine ─────────────────────────────────────────────────
function calculateMillionTimeline(params) {
  const {
    currentSavings,
    monthlySavings,
    annualReturnRate,
    inflationRate,
    targetAmount,       // user-defined goal, defaults to 1,000,000
  } = params;

  const TARGET = targetAmount > 0 ? targetAmount : 1_000_000;
  const realReturnRate = (1 + annualReturnRate / 100) / (1 + inflationRate / 100) - 1;
  const monthlyRealReturn = Math.pow(1 + realReturnRate, 1 / 12) - 1;

  let balance = currentSavings;
  let currentMonthly = monthlySavings;
  let totalContributed = currentSavings;
  let months = 0;
  const MAX_MONTHS = 600; // 50-year cap
  const chartData = [{ month: 0, balance: currentSavings, contributed: currentSavings }];

  while (balance < TARGET && months < MAX_MONTHS) {
    balance = balance * (1 + monthlyRealReturn) + currentMonthly;
    totalContributed += currentMonthly;
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
    targetAmount: TARGET,
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
  if (wealthChart) wealthChart.destroy();

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
      interaction: { mode: 'index', intersect: false },
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
            label: function (ctx) {
              return ` ${ctx.dataset.label}: ${formatCurrency(ctx.raw, true)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: '#1e2d45', drawBorder: false },
          ticks: { color: '#4a5568', font: { size: 10, family: 'Inter' }, maxTicksLimit: 8 }
        },
        y: {
          grid: { color: '#1e2d45', drawBorder: false },
          ticks: { color: '#4a5568', font: { size: 10, family: 'Inter' }, callback: (v) => formatCurrency(v, true) }
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

  if (result.capped) {
    return pick(TIMELINE_ROASTS.capped);
  }

  let timelineRoasts;
  if (years <= 3) timelineRoasts = TIMELINE_ROASTS.under3;
  else if (years <= 5) timelineRoasts = TIMELINE_ROASTS.under5;
  else if (years <= 10) timelineRoasts = TIMELINE_ROASTS['5to10'];
  else if (years <= 20) timelineRoasts = TIMELINE_ROASTS['10to20'];
  else if (years <= 30) timelineRoasts = TIMELINE_ROASTS['20to30'];
  else timelineRoasts = TIMELINE_ROASTS.over30;

  const pool = [...vibeRoasts, ...timelineRoasts];
  return pick(pool);
}

// ─── Result Message Generator ────────────────────────────────────────────────
function getResultMessage(result) {
  const years = result.years;
  if (result.capped) return pick(RESULT_MESSAGES.capped);
  if (years <= 3) return pick(RESULT_MESSAGES.under3);
  if (years <= 5) return pick(RESULT_MESSAGES.under5);
  if (years <= 10) return pick(RESULT_MESSAGES['5to10']);
  if (years <= 20) return pick(RESULT_MESSAGES['10to20']);
  if (years <= 30) return pick(RESULT_MESSAGES['20to30']);
  return pick(RESULT_MESSAGES.over30);
}

// ─── Progress Bar ────────────────────────────────────────────────────────────
function animateProgress(currentSavings, target) {
  const pct = Math.min((currentSavings / target) * 100, 95);
  const fill = document.getElementById('progress-fill');
  setTimeout(() => {
    fill.style.width = Math.max(pct, 2) + '%';
  }, 200);
}

// ─── Level Badge ─────────────────────────────────────────────────────────────
function updateLevel(years, capped) {
  const levelEl = document.getElementById('result-level');
  if (!levelEl) return;
  const level = capped ? { name: 'Broke Boi', icon: '😬' } : getLevel(years);
  levelEl.textContent = `${level.icon} ${level.name}`;
  levelEl.dataset.level = level.name.toLowerCase().replace(/\s/g, '-');
}

// ─── Extra Cash Section ───────────────────────────────────────────────────────
function renderExtraCashSection() {
  const container = document.getElementById('extra-cash-grid');
  if (!container) return;
  container.innerHTML = EXTRA_CASH_IDEAS.map(idea => `
    <div class="cash-idea-card">
      <div class="cash-idea-emoji">${idea.emoji}</div>
      <div class="cash-idea-title">${idea.title}</div>
      <div class="cash-idea-income">${idea.income}</div>
      <div class="cash-idea-effort">${idea.effort}</div>
      <div class="cash-idea-desc">${idea.desc}</div>
    </div>
  `).join('');
}

// ─── Daily Challenge ─────────────────────────────────────────────────────────
function initDailyChallenge() {
  const el = document.getElementById('daily-challenge-text');
  const emojiEl = document.getElementById('daily-challenge-emoji');
  if (!el) return;
  const challenge = getDailyChallenge();
  el.textContent = challenge.text;
  if (emojiEl) emojiEl.textContent = challenge.emoji;
}

// ─── Streak Counter ───────────────────────────────────────────────────────────
function initStreak() {
  const el = document.getElementById('streak-count');
  if (!el) return;
  const streak = getStreak();
  el.textContent = streak;
  const label = document.getElementById('streak-label');
  if (label) label.textContent = streak === 1 ? 'day streak' : 'day streak';
}


// ─── Main Calculate Function ─────────────────────────────────────────────────
let currentVibe = 'realistic';
let lastResult = null;

function runCalculation() {
  const currentAge    = parseInt(document.getElementById('current-age').value) || 30;
  const currentSavings = parseFloat(document.getElementById('current-savings').value) || 0;
  const monthlySavings = parseFloat(document.getElementById('monthly-savings').value) || 0;
  const targetAmount   = parseFloat(document.getElementById('target-amount').value) || 1_000_000;
  const returnRate    = parseFloat(document.getElementById('return-rate').value) || 7;
  const inflationRate  = parseFloat(document.getElementById('inflation-rate').value) || 2.5;

  const vibe = VIBES[currentVibe];
  const adjustedMonthly = monthlySavings * vibe.savingsMultiplier;

  const result = calculateMillionTimeline({
    currentSavings,
    monthlySavings: adjustedMonthly,
    annualReturnRate: returnRate,
    inflationRate,
    targetAmount,
  });

  result.monthlySavings = adjustedMonthly;
  result.returnRate = returnRate;
  result.currentAge = currentAge;
  lastResult = result;

  // Trigger rocket launch
  triggerRocketLaunch();

  // Confetti for fast results
  if (!result.capped && result.years <= 10) {
    setTimeout(() => launchConfetti(3500), 600);
  }

  // ── Result label — dynamic target ──
  const labelEl = document.getElementById('result-target-label');
  if (labelEl) labelEl.textContent = `You'll hit ${formatCurrency(targetAmount)} in`;

  // ── Years (animated) ──
  const yearsEl = document.getElementById('result-years');
  if (result.capped) {
    yearsEl.textContent = '50+ yrs';
    yearsEl.style.fontSize = 'clamp(36px, 6vw, 56px)';
  } else {
    yearsEl.style.fontSize = '';
    const floorYears = Math.floor(result.years);
    animateValue(yearsEl, 0, floorYears, 1200, (v) => {
      return Math.round(v) + (Math.round(v) === 1 ? ' year' : ' years');
    });
  }

  // ── Target year + age at goal ──
  const dateStr = document.getElementById('result-date-str');
  if (result.capped) {
    dateStr.textContent = 'way too long from now';
  } else {
    dateStr.textContent = result.targetYear;
  }

  const ageAtGoal = currentAge + Math.ceil(result.years);
  const ageEl = document.getElementById('result-age-at-goal');
  if (ageEl) ageEl.textContent = result.capped ? '—' : `You'll be ${ageAtGoal} years old.`;

  // ── Roast + result message ──
  document.getElementById('roast-text').textContent = generateRoast(result, currentVibe);
  const msgEl = document.getElementById('result-message');
  if (msgEl) msgEl.textContent = getResultMessage(result);

  // ── Level badge ──
  updateLevel(result.years, result.capped);

  // ── Progress bar (toward the actual target, not hardcoded $1M) ──
  animateProgress(currentSavings, targetAmount);

  // ── Progress bar label ──
  const progressMax = document.getElementById('progress-max-label');
  if (progressMax) progressMax.textContent = formatCurrency(targetAmount, true) + ' 🏁';

  // ── Stats ──
  animateValue(document.getElementById('stat-total-contributed'), 0, result.totalContributed, 1000, (v) => formatCurrency(v, true));
  animateValue(document.getElementById('stat-interest-earned'), 0, result.totalInterest, 1000, (v) => formatCurrency(v, true));
  animateValue(document.getElementById('stat-net-worth-real'), 0, result.realValue, 1000, (v) => formatCurrency(v, true));

  // ── Chart ──
  if (result.chartData.length > 1) renderChart(result.chartData);

  // ── Badges ──
  evaluateBadges(result);

  // ── Share modal ──
  document.getElementById('share-year').textContent = result.capped ? '2075+' : result.targetYear;
  document.getElementById('share-years-text').textContent = result.capped ? '50+ years' : formatYears(result.years);
  const shareTargetEl = document.getElementById('share-target');
  if (shareTargetEl) shareTargetEl.textContent = formatCurrency(result.targetAmount || 1_000_000, true);

  // ── Show results ──
  const panel = document.getElementById('results-panel');
  panel.classList.add('visible');
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ─── Instant Roast on Input ───────────────────────────────────────────────────
function initInstantRoast() {
  const monthlyInput = document.getElementById('monthly-savings');
  const roastEl = document.getElementById('input-roast');
  if (!monthlyInput || !roastEl) return;

  let debounce;
  monthlyInput.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      const val = parseFloat(monthlyInput.value) || 0;
      roastEl.textContent = getInstantRoast(val);
      roastEl.classList.add('visible');
    }, 300);
  });
}

// ─── Vibe Mode Switching ─────────────────────────────────────────────────────
function initVibePills() {
  document.querySelectorAll('.vibe-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.vibe-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentVibe = pill.dataset.vibe;

      const vibe = VIBES[currentVibe];
      if (vibe) {
        const slider = document.getElementById('return-rate');
        slider.value = vibe.returnRate;
        document.getElementById('return-rate-display').textContent = vibe.returnRate.toFixed(1) + '%';

        // Update vibe description
        const descEl = document.getElementById('vibe-desc');
        if (descEl) {
          descEl.textContent = vibe.tagline;
          descEl.style.opacity = '1';
        }

        // Update slider track
        const min = parseFloat(slider.min);
        const max = parseFloat(slider.max);
        const val = parseFloat(slider.value);
        const pct = ((val - min) / (max - min)) * 100;
        slider.style.background = `linear-gradient(to right, var(--color-gold) 0%, var(--color-gold) ${pct}%, var(--color-surface-3) ${pct}%, var(--color-surface-3) 100%)`;
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

  updateSliderTrack(returnSlider);
  updateSliderTrack(inflationSlider);
}

// ─── Result Card Canvas Generation ───────────────────────────────────────────
function generateResultCard(result) {
  const W = 1080, H = 1920;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#080b12';
  ctx.fillRect(0, 0, W, H);

  // Subtle grid lines
  ctx.strokeStyle = 'rgba(245,200,66,0.04)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 60) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += 60) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // Gold top accent bar
  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, '#f5c842');
  grad.addColorStop(0.5, '#22d3ee');
  grad.addColorStop(1, '#f5c842');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, 6);

  // Site URL — top
  ctx.fillStyle = 'rgba(245,200,66,0.5)';
  ctx.font = '600 32px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('whenwillimakeamillion.com', W / 2, 80);

  // Rocket emoji
  ctx.font = '180px serif';
  ctx.textAlign = 'center';
  ctx.fillText('🚀', W / 2, 460);

  // Headline
  const year = result.capped ? '2075+' : result.targetYear;
  const yrs = result.capped ? '50+ years' : formatYears(result.years);
  const target = formatCurrency(result.targetAmount || 1_000_000, true);

  ctx.fillStyle = '#f5c842';
  ctx.font = 'bold 92px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`I'll hit ${target}`, W / 2, 640);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 76px system-ui, sans-serif';
  ctx.fillText(`by ${year}`, W / 2, 750);

  // Subtext line
  ctx.fillStyle = '#22d3ee';
  ctx.font = '500 50px system-ui, sans-serif';
  ctx.fillText(`That's ${yrs} from now.`, W / 2, 860);

  // Age at goal
  const ageAtGoal = document.getElementById('result-age-at-goal')?.textContent || '';
  if (ageAtGoal) {
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '400 44px system-ui, sans-serif';
    ctx.fillText(ageAtGoal, W / 2, 950);
  }

  // Divider
  ctx.strokeStyle = 'rgba(245,200,66,0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(120, 1020); ctx.lineTo(W - 120, 1020);
  ctx.stroke();

  // Roast text
  const roast = document.getElementById('roast-text')?.textContent || '';
  if (roast) {
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = 'italic 500 46px Georgia, serif';
    ctx.textAlign = 'center';
    // Word-wrap roast text
    const maxWidth = W - 160;
    const lineHeight = 64;
    const words = roast.split(' ');
    let line = '';
    let lines = [];
    for (const word of words) {
      const test = line ? line + ' ' + word : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    const totalH = lines.length * lineHeight;
    let startY = 1100;
    ctx.fillStyle = 'rgba(245,200,66,0.9)';
    ctx.font = 'italic 600 48px Georgia, serif';
    lines.forEach((l, i) => ctx.fillText(`"${i === 0 ? '' : ''}${l}${i === lines.length - 1 ? '"' : ''}`, W / 2, startY + i * lineHeight));
  }

  // Stats row
  const stats = [
    { label: 'Starting', value: formatCurrency(parseFloat(document.getElementById('current-savings')?.value) || 0, true) },
    { label: 'Monthly', value: formatCurrency(parseFloat(document.getElementById('monthly-savings')?.value) || 0, true) + '/mo' },
    { label: 'Return', value: (document.getElementById('return-rate')?.value || '7') + '%/yr' },
  ];

  const statsY = 1420;
  const colW = W / 3;
  stats.forEach((s, i) => {
    const cx = colW * i + colW / 2;
    ctx.fillStyle = '#f5c842';
    ctx.font = 'bold 52px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(s.value, cx, statsY);
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '400 34px system-ui, sans-serif';
    ctx.fillText(s.label, cx, statsY + 50);
  });

  // Bottom CTA
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.font = '400 38px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Calculate yours →', W / 2, 1750);
  ctx.fillStyle = '#f5c842';
  ctx.font = 'bold 44px system-ui, sans-serif';
  ctx.fillText('whenwillimakeamillion.com', W / 2, 1820);

  // Bottom gold bar
  ctx.fillStyle = grad;
  ctx.fillRect(0, H - 6, W, 6);

  return canvas.toDataURL('image/png');
}

function downloadResultCard() {
  if (!lastResult) return;
  const dataUrl = generateResultCard(lastResult);
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = 'millionaire-date.png';
  a.click();

  const hint = document.getElementById('stories-hint');
  if (hint) {
    hint.textContent = '📲 Now open Instagram (or TikTok) → Stories → and upload the image you just saved!';
    hint.classList.add('visible');
    setTimeout(() => hint.classList.remove('visible'), 8000);
  }
}

// ─── Share Functionality ──────────────────────────────────────────────────────
function getShareText() {
  if (!lastResult) return { text: '', url: 'https://whenwillimakeamillion.com' };
  const year = lastResult.capped ? '2075+' : lastResult.targetYear;
  const yrs = lastResult.capped ? '50+ years' : formatYears(lastResult.years);
  const target = formatCurrency(lastResult.targetAmount || 1_000_000, true);
  const roast = document.getElementById('roast-text')?.textContent || '';
  const url = 'https://whenwillimakeamillion.com';
  const text = `I'll hit ${target} by ${year} (${yrs} away) 🚀💰 Calculator roasted me: "${roast}"`;
  return { text, url };
}

function setShareModalHint(msg) {
  const el = document.getElementById('share-modal-hint');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('visible');
  setTimeout(() => el.classList.remove('visible'), 6000);
}

function initShare() {
  const modal = document.getElementById('share-modal');

  // ── Open modal ──────────────────────────────────────────────────────────────
  document.getElementById('btn-save-stories').addEventListener('click', downloadResultCard);

  document.getElementById('btn-share-link').addEventListener('click', () => {
    modal.classList.add('open');
  });

  // ── Close modal ─────────────────────────────────────────────────────────────
  document.getElementById('share-modal-close').addEventListener('click', () => {
    modal.classList.remove('open');
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  // ── Update modal text when result changes ───────────────────────────────────
  // (done in runCalculation via share-year, share-years-text, share-target)

  // ── Facebook ────────────────────────────────────────────────────────────────
  document.getElementById('btn-share-facebook').addEventListener('click', () => {
    const { url } = getShareText();
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank', 'width=580,height=480'
    );
  });

  // ── Instagram Stories — download card ───────────────────────────────────────
  document.getElementById('btn-share-ig-stories').addEventListener('click', () => {
    modal.classList.remove('open');
    downloadResultCard();
  });

  // ── Bluesky ─────────────────────────────────────────────────────────────────
  document.getElementById('btn-share-bluesky').addEventListener('click', () => {
    const { text, url } = getShareText();
    window.open(
      `https://bsky.app/intent/compose?text=${encodeURIComponent(text + ' ' + url)}`,
      '_blank', 'width=600,height=500'
    );
  });

  // ── Twitter / X ─────────────────────────────────────────────────────────────
  document.getElementById('btn-tweet').addEventListener('click', () => {
    const { text, url } = getShareText();
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank', 'width=550,height=420'
    );
  });

  // ── LinkedIn ────────────────────────────────────────────────────────────────
  document.getElementById('btn-share-linkedin').addEventListener('click', () => {
    const { url } = getShareText();
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank', 'width=600,height=540'
    );
  });

  // ── Copy Link ───────────────────────────────────────────────────────────────
  document.getElementById('btn-copy-link').addEventListener('click', () => {
    const copyBtn = document.getElementById('btn-copy-link');
    navigator.clipboard.writeText('https://whenwillimakeamillion.com').then(() => {
      const prev = copyBtn.querySelector('span:last-child').textContent;
      copyBtn.querySelector('span:last-child').textContent = 'Copied!';
      setShareModalHint('✅ Link copied — paste it anywhere.');
      setTimeout(() => {
        copyBtn.querySelector('span:last-child').textContent = prev;
      }, 2000);
    });
  });

  // ── Copy Roast (in results panel) ───────────────────────────────────────────
  document.getElementById('btn-copy-roast').addEventListener('click', () => {
    const roast = document.getElementById('roast-text')?.textContent || '';
    navigator.clipboard.writeText(`${roast} — whenwillimakeamillion.com`).then(() => {
      showToast('✅ Roast copied. Absolutely devastating.');
    });
  });
}

// ─── Calculate Button ────────────────────────────────────────────────────────
function initCalculateBtn() {
  document.getElementById('btn-calculate').addEventListener('click', runCalculation);

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

// ─── Hamburger menu ──────────────────────────────────────────────────────────
function initHamburger() {
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// ─── Init ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initVibePills();
  initSliders();
  initShare();
  initCalculateBtn();
  initInstantRoast();
  initDailyChallenge();
  initStreak();
  renderExtraCashSection();
  checkUrlParams();
  initHamburger();
});
