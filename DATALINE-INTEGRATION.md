# DataLine — integration notes

New files only. Nothing in the existing project was edited.

## Import
```tsx
import DataLine from '../components/DataLine'; // put DataLine.tsx + DataLine.css side by side
```

## Usage
Render it once, as the first child of the page's root `relative` wrapper (where `<DataLineSpine />` is today):
```tsx
<div className="min-h-screen relative">
  <LivingBackground />
  <DataLine />          {/* replaces <DataLineSpine /> */}
  ...
</div>
```

## Positioning / z-index
- The host (the page root `div`) **must be `position: relative`** and span the full page height. `min-h-screen relative` already does.
- `.data-line` is `absolute; inset: 0; pointer-events: none; z-index: 1`. Override with `--data-line-z` if needed.
- Your content sections already use `relative z-20`, so the thread passes *behind* them. The hero section has no z-index, so the thread draws *over* it (where the tangle sits). Give the hero `relative z-[2]` or similar if you prefer it behind.
- It uses `overflow: clip` on its own box only: no scroll container, no horizontal overflow, no dependence on `overflow-hidden` sections.

## How it works
- One `<path>`, one `M`, no `Z`. Geometry is `DATA_LINE_D` in `DataLine.tsx` (1000 x 8000 design space), scaled once to the host's pixel size on mount/resize so stroke width stays uniform.
- Scroll writes `stroke-dashoffset` directly from `scrollY` in a passive scroll listener. No spring, rAF loop or timer, so it stops exactly when scrolling stops and resumes from the same spot.
- The drawn head tracks the viewport down the page (checked in simulation on 1440 x 7600 and 390 x 9800 hosts).
- No dependencies beyond React.

## Assumptions
- The host wrapper contains the whole homepage (hero to footer). Scroll progress is measured over the host's height, so the end of the thread lands at the bottom of the page.
- Section positions are estimated as fractions of page height (hero ~0-9%, morph ~9-46%, units ~46-58%, features/maps/cards/lab ~58-90%, CTA ~90-97%). `StickyFeatureStory` wasn't supplied, so its height is a guess. If sections shift, nudge the waypoint coordinates in `DATA_LINE_D`; the end sits at y ~ 7450 / 8000.
- The tangle sits around x ~ 50%, y ~ 6-10% of the page; on mobile it is horizontally compressed because the one path stretches to the viewport.
- Stroke and colour come from `--data-line-width` / `--data-line-color` (defaults: 2.5px, `--color-burnt-orange`).

## Host page must provide
- A `relative` full-height wrapper, `ResizeObserver` support (all modern browsers), and nothing else.
- Remove the old `DataLineSpine` and its now-unused `useSpring` import if nothing else uses it (`noUnusedLocals` is on).
- Hero Zoom, origami, parallax, Core Features and the "developed by kashyap" pill are untouched.
