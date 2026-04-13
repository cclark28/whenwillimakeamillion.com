# DESIGN.md — WhenWillIMakeAMillion.com
## Design System: "Millionaire Mode"

---

## 1. Visual Theme & Atmosphere

Dark, cinematic wealth aesthetic. Think late-night trading floor meets SpaceX launch control. Deep blacks and navy blues create a focused, serious backdrop — then gold and electric teal break through for moments of triumph and progress. The UI should feel like a premium financial tool that someone actually wants to spend time in, not a sterile spreadsheet. Rocket and space metaphors run through the product: launching toward a goal, escape velocity, reaching orbit. Typography is confident and modern, never stuffy.

---

## 2. Color Palette & Roles

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#080b12` | Page background — near-void black |
| `--color-surface` | `#0f1420` | Card/panel surface |
| `--color-surface-2` | `#161d2e` | Elevated surface, input bg |
| `--color-surface-3` | `#1e2840` | Hover states, subtle lift |
| `--color-border` | `#1e2d45` | Default border |
| `--color-border-bright` | `#2a3f5f` | Active/focus border |
| `--color-gold` | `#f5c842` | Primary accent — gold/amber, success, CTAs |
| `--color-gold-dim` | `#c49a1a` | Muted gold for hover |
| `--color-gold-glow` | `rgba(245,200,66,0.15)` | Gold glow backgrounds |
| `--color-teal` | `#22d3ee` | Secondary accent — electric teal, charts, progress |
| `--color-teal-dim` | `#0891b2` | Muted teal |
| `--color-green` | `#4ade80` | Success, positive delta |
| `--color-red` | `#f87171` | Warning, negative |
| `--color-text-primary` | `#f1f5f9` | Primary text — near-white |
| `--color-text-secondary` | `#94a3b8` | Secondary/label text |
| `--color-text-tertiary` | `#4a5568` | Disabled/placeholder text |
| `--color-text-on-gold` | `#0a0d14` | Text on gold background |

Dark mode is the default and only mode.

---

## 3. Typography Rules

Google Fonts: **Space Grotesk** (display/headings) + **Inter** (body/UI).

```
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
```

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| `--font-display` | Space Grotesk | 4rem / 64px | 700 | 1.05 | -0.03em |
| `--font-h1` | Space Grotesk | 2.5rem / 40px | 700 | 1.1 | -0.025em |
| `--font-h2` | Space Grotesk | 1.875rem / 30px | 600 | 1.2 | -0.02em |
| `--font-h3` | Space Grotesk | 1.25rem / 20px | 600 | 1.3 | -0.01em |
| `--font-body-lg` | Inter | 1.125rem / 18px | 400 | 1.7 | 0 |
| `--font-body` | Inter | 1rem / 16px | 400 | 1.65 | 0 |
| `--font-body-sm` | Inter | 0.875rem / 14px | 400 | 1.6 | 0 |
| `--font-label` | Inter | 0.75rem / 12px | 600 | 1.4 | 0.06em |
| `--font-mono` | 'JetBrains Mono', monospace | 0.875rem | 500 | 1.5 | 0 |

Number displays (years to million, dollar amounts) use Space Grotesk 700 with tabular-nums feature.

---

## 4. Component Stylings

### Buttons

**Primary (Gold)**
```
background: var(--color-gold)
color: var(--color-text-on-gold)
padding: 14px 28px
border-radius: 10px
font: Inter 600 15px
hover: background: var(--color-gold-dim), transform: translateY(-1px), box-shadow: 0 4px 20px var(--color-gold-glow)
active: transform: translateY(0)
```

**Secondary (Ghost)**
```
background: transparent
border: 1.5px solid var(--color-border-bright)
color: var(--color-text-primary)
padding: 14px 28px
border-radius: 10px
hover: background: var(--color-surface-3), border-color: var(--color-teal)
```

**Share (Teal)**
```
background: linear-gradient(135deg, var(--color-teal-dim), var(--color-teal))
color: #fff
padding: 12px 24px
border-radius: 10px
font: Inter 600 14px
```

### Cards
```
background: var(--color-surface)
border: 1px solid var(--color-border)
border-radius: 16px
padding: 28px
hover: border-color: var(--color-border-bright), box-shadow: 0 8px 32px rgba(0,0,0,0.4)
```

### Inputs & Sliders
```
Input background: var(--color-surface-2)
border: 1.5px solid var(--color-border)
border-radius: 10px
padding: 12px 16px
color: var(--color-text-primary)
font: Inter 500 16px
focus: border-color: var(--color-gold), outline: none, box-shadow: 0 0 0 3px var(--color-gold-glow)
prefix ($, %): color: var(--color-text-secondary)
```

Range slider:
```
track: var(--color-surface-3) height 4px, border-radius 2px
fill: var(--color-gold)
thumb: 20px circle, background gold, border 2px surface, shadow: 0 2px 8px gold-glow
```

### Vibe Mode Pills
```
background: var(--color-surface-2)
border: 1.5px solid var(--color-border)
border-radius: 999px
padding: 8px 16px
font: Inter 500 13px
color: var(--color-text-secondary)
selected: border-color: var(--color-gold), color: var(--color-gold), background: var(--color-gold-glow)
```

### Result Display
Big number (years):
```
font: Space Grotesk 700 80px
color: var(--color-gold)
letter-spacing: -0.04em
text-shadow: 0 0 40px rgba(245,200,66,0.3)
```

### Badges
```
background: var(--color-surface-2)
border: 1px solid var(--color-border)
border-radius: 12px
padding: 16px 20px
unlocked: border-color: var(--color-gold), background: linear-gradient(135deg, var(--color-gold-glow), transparent)
```

### Progress Bar (Rocket Track)
```
track: var(--color-surface-2), height 8px, border-radius 4px
fill: linear-gradient(90deg, var(--color-teal), var(--color-gold))
rocket emoji at leading edge, animates with CSS transform
```

---

## 5. Layout Principles

- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128
- Max content width: 760px (calculator), 1080px (blog)
- Section vertical padding: 80px desktop, 48px mobile
- Grid: CSS grid, 12-column conceptually, but mostly single or 2-col
- Calculator card: max-width 680px, centered

```css
--space-xs: 4px
--space-sm: 8px
--space-md: 16px
--space-lg: 24px
--space-xl: 40px
--space-2xl: 64px
--space-3xl: 96px
--max-width-calc: 760px
--max-width-content: 1080px
--max-width-blog: 720px
```

---

## 6. Depth & Elevation

| Level | Usage | Shadow |
|---|---|---|
| 0 | Flat (base surface) | none |
| 1 | Cards | `0 2px 8px rgba(0,0,0,0.3)` |
| 2 | Elevated cards, dropdowns | `0 8px 32px rgba(0,0,0,0.5)` |
| 3 | Modals, overlays | `0 20px 60px rgba(0,0,0,0.7)` |
| Gold glow | CTA elements | `0 4px 24px rgba(245,200,66,0.25)` |
| Teal glow | Progress, active states | `0 4px 24px rgba(34,211,238,0.2)` |

---

## 7. Do's and Don'ts

**Do:**
- Use Space Grotesk exclusively for numbers, headlines, hero text
- Use gold for the primary action, the result number, and key milestones
- Use teal for charts, progress bars, and interactive data
- Keep backgrounds very dark — let the content glow
- Animate number changes with requestAnimationFrame counter-up
- Round all percentage displays to 1 decimal place
- Use tabular-nums for all financial figures
- Add `transition: all 0.2s ease` to interactive elements

**Don't:**
- Never use white backgrounds or light mode
- Never use more than 2 accent colors on one screen
- Never use centered text for body copy
- Never add border-radius > 16px to major containers
- Never use sans-serif for large display numbers — always Space Grotesk
- Never make charts taller than 280px on desktop
- Never use pure black (#000) — use `--color-bg`
- Don't add decorative borders or dividers — use spacing

---

## 8. Responsive Behavior

| Breakpoint | Token | Value |
|---|---|---|
| Mobile | `--bp-sm` | 480px |
| Tablet | `--bp-md` | 768px |
| Desktop | `--bp-lg` | 1024px |

- Calculator inputs: 2-col grid on desktop, 1-col on mobile
- Vibe mode pills: horizontal scroll on mobile (no wrap)
- Result number: 80px desktop → 52px mobile
- Hero headline: 4rem → 2.25rem
- Card padding: 28px → 20px
- Navigation: full on desktop, hamburger on mobile
- Touch targets: minimum 44px height on all interactive elements
- Share card modal: full-screen on mobile

---

## 9. Agent Prompt Guide

**Quick tokens:**
```
Primary BG: #080b12 (--color-bg)
Surface: #0f1420 (--color-surface)
Gold accent: #f5c842 (--color-gold)
Teal accent: #22d3ee (--color-teal)
Text primary: #f1f5f9 (--color-text-primary)
Text secondary: #94a3b8 (--color-text-secondary)
Border: #1e2d45 (--color-border)
Radius: 16px cards, 10px buttons/inputs, 999px pills
Font display: Space Grotesk 700
Font body: Inter 400/500
```

**Example prompts:**
- "Build a card component using --color-surface background, --color-border border, 16px radius, 28px padding, Space Grotesk heading in --color-text-primary, and Inter body in --color-text-secondary"
- "Create a CTA button with background --color-gold, text --color-text-on-gold, Inter 600, 14px 28px padding, 10px radius, hover darken to --color-gold-dim"
- "Style a range input with --color-surface-2 track, --color-gold fill, 20px gold thumb, and a subtle --color-gold-glow box-shadow on focus"
