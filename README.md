
<div align="center">

# DSA Hub

### A focused, visual-first learning space for Data Structures & Algorithms.

Turn five units of DSA into one calm, structured study experience — with notes, revision, questions, flashcards, mind maps, visualisers, practice, and saved content in one place.

<br />

[![React](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## What is DSA Hub?

DSA Hub is a frontend learning platform built around a simple idea:

> **Studying DSA should feel like reading, exploring, and practising — not navigating a cluttered dashboard.**

The interface is intentionally editorial and content-led. Instead of scattering material across separate documents and tools, DSA Hub brings the study flow together into a single experience.

It is built for fast revision before exams, deeper topic study, and repeated practice.

---

## Explore

| Area | What it gives you |
| --- | --- |
| **Notes** | Structured unit and topic reading with definitions, explanations, code, tables, callouts, deep dives, and common mistakes |
| **Quick Revision** | High-yield revision views for each unit |
| **Question Bank** | Exam-oriented questions with structured answers |
| **Flashcards** | Fast active-recall revision |
| **Mind Maps** | Visual topic relationships and concept exploration |
| **Visualisers** | Interactive views for core DSA concepts and operations |
| **Practice** | A dedicated practice surface combining existing question and flashcard content |
| **Bookmarks** | Save important notes, questions, and flashcards for later |
| **Command Palette** | Quickly jump through the hub using search or Ctrl + K |

---

## The experience

DSA Hub is designed around a few principles:

**Content first**  
The learning material remains the center of the interface rather than being buried inside cards and navigation.

**Visual understanding**  
Algorithms and data structures benefit from diagrams, spatial relationships, and interactive exploration, so the platform treats visualisation as part of learning rather than decoration.

**Fast revision**  
Quick Revision, flashcards, bookmarks, and the question bank make it easy to move from learning → recall → practice.

**Low friction**  
Routes are lazy-loaded, the interface keeps navigation lightweight, and the command palette provides a fast way to move around the platform.

**Responsive by design**  
The experience is designed for both large screens and smaller laptop/mobile layouts, with motion and layout behaviour tuned to remain usable across viewport sizes.

---

## Tech Stack

**Core**

- React 19
- TypeScript
- Vite
- React Router

**UI & Motion**

- Tailwind CSS 4
- Framer Motion
- GSAP
- Lucide React

**State & Content**

- Zustand
- Structured TypeScript content models
- Browser localStorage for saved/bookmarked study content

**Specialised UI**

- React PDF
- XYFlow React

---

## Project Structure

~~~text
src/
├── components/      # Shared UI, navigation, palette, bookmarks, motion
├── data/            # Units, questions, flashcards and content types
├── layouts/         # Editorial application shell
├── pages/           # Route-level learning experiences
├── store/           # Client-side state
└── App.tsx          # Application routes

public/
└── assets/          # Static visual assets and supporting files
~~~

The main learning routes are:

~~~text
/                    Landing page
/notes               Unit index
/notes/:unitId       Unit reader
/revision/:unitId    Quick revision
/question-bank       Question bank
/flashcards          Flashcards
/mind-maps           Mind maps
/visualisers         Visualisers
/practice            Practice
/bookmarks           Saved content
~~~

---

## Run locally

### 1. Clone

~~~bash
git clone https://github.com/SuperVOID-og/DSA-HUB-.git
cd DSA-HUB-
~~~

### 2. Install dependencies

~~~bash
npm install
~~~

### 3. Start the development server

~~~bash
npm run dev
~~~

Vite will print the local development URL in the terminal.

### 4. Build for production

~~~bash
npm run build
~~~

### 5. Preview the production build

~~~bash
npm run preview
~~~

### 6. Lint

~~~bash
npm run lint
~~~

---

## Content model

Learning content is represented as structured TypeScript data rather than hard-coded page layouts.

Topics can contain:

- explanatory text
- headings
- code examples
- images and diagrams
- tables
- lists
- callouts
- definitions
- deep-dive material
- common mistakes

That makes the reader reusable across units while keeping the actual academic content separate from presentation.

---

## Performance notes

The application uses route-level lazy loading for larger learning surfaces, keeping secondary pages out of the initial route payload.

Static assets are kept out of the JavaScript bundle where practical, and the hero artwork is served in a compressed WebP format.

The repository also excludes generated build output and node_modules.

---

## Design direction

DSA Hub deliberately avoids the usual “AI dashboard” visual language:

- no neon-heavy interface
- no wall of identical glass cards
- no unnecessary analytics-style panels
- no generic SaaS hero template

The visual language is closer to an **editorial learning reader**: strong typography, restrained surfaces, spatial composition, purposeful motion, and visual explanations that support the content.

---

## Development philosophy

This project favours:

**Simple data → reusable presentation → focused interactions.**

The goal is not to build the largest possible DSA platform. The goal is to make the material already being studied substantially easier to understand, revise, and practise.

---

## Contributing

This repository is primarily a personal learning project. Improvements, bug fixes, and thoughtful ideas are welcome through issues or pull requests.

Before making a larger change, please keep the project's core direction in mind:

> **Reduce friction. Improve understanding. Keep the interface intentional.**

---

## Author

**SuperVOID**

Built as a focused DSA learning platform and continuously refined around real study workflows.

<br />

<a href="https://github.com/SuperVOID-og/DSA-HUB-">View the repository →</a>

</div>
