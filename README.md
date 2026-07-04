# 🎮 Sharp-chan
**An anime-guided C# and Unity tutor for people who want to build the game, not just talk about it.**
*She doesn't teach syntax. She teaches you how to ship a vision.*
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)](https://vite.dev/)
[![Zustand](https://img.shields.io/badge/Zustand-5-orange)](https://zustand-demo.pmnd.rs/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055ff)](https://www.framer.com/motion/)
[![License: PolyForm Noncommercial](https://img.shields.io/badge/License-PolyForm_Noncommercial-blue)](./LICENSE)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-sharp--chan.vercel.app-7c6fff?logo=vercel&logoColor=white)](https://sharp-chan.vercel.app)

Built by [Omega Mu Gamma Studio](https://github.com/Omega-Mu-Gamma-Studio) · the team behind [SeeDS](https://see-ds.vercel.app), [KMapX](https://kmapx.vercel.app), [EG Suite](https://eg-suite.vercel.app), [GateLab](https://gatelab.vercel.app), [Java-chan](https://java-chan.vercel.app), and [Sharp-chan](https://sharp-chan.vercel.app).

---

## What is Sharp-chan?

Sharp-chan is a browser-based C# and Unity learning app where a visionary, creative mascot character teaches game development like she's pitching you her next project — because in a sense, she is. Every lesson is framed as a step toward something you'll actually want to show people: a level, a mechanic, a published game.

The curriculum runs straight through **Unity game development** — `MonoBehaviour` lifecycle isn't abstract, it's the heartbeat of your game loop. Coroutines aren't a trick, they're how your boss fight breathes. By the end of all 75 lessons, you've designed, built, polished, and shipped a complete 2D game to Itch.io.

No dry syntax drills. No "trust the process" without a payoff. Just C#, taught by someone who's already imagining what you'll build with it.

🔗 **[Try it live → sharp-chan.vercel.app](https://sharp-chan.vercel.app)**

---

## The Teaching Model

Every single lesson — all 75 of them — follows this exact structure:

| Phase | Name | What Happens |
| --- | --- | --- |
| **1** | See It Work | Sharp-chan shows working code, the in-editor result, and explains what's happening line by line |
| **2** | See It Break | Same code, deliberately broken — she explains the error, what caused it, and what it would've done to your game |
| **3** | You Try | Student writes code or fills in blanks; pattern-based validation gives immediate feedback |

Validation is regex/pattern-based — no code execution in the browser. For full scripts, students run them in their own Unity Editor.

---

## Curriculum — 75 Lessons Across 5 Units

All five units are complete, published, and available from day one.

| Unit | Topic | Lessons |
| --- | --- | --- |
| 1 | C# and Unity Foundations | 15 |
| 2 | OOP and Unity Scripting | 15 |
| 3 | 2D Game Systems | 15 |
| 4 | Polish and Advanced C# | 15 |
| 5 | Final Game Project | 15 |

<details>
<summary>📖 View all 75 lessons</summary>

**Unit 1 — C# and Unity Foundations** `1.1` Why C# for Game Dev · `1.2` Installing Unity and Android Studio Tour · `1.3` The Unity Editor — Panels and Workflow · `1.4` GameObjects and Components · `1.5` Your First C# Script · `1.6` Variables and Data Types in C# · `1.7` Operators and Expressions · `1.8` Conditionals · `1.9` Loops · `1.10` Functions and Methods · `1.11` MonoBehaviour Lifecycle · `1.12` Start and Update · `1.13` Transform and Movement · `1.14` Time.deltaTime and Frame Independence · `1.15` Mini Challenge — Move an Object

**Unit 2 — OOP and Unity Scripting** `2.1` Classes and Objects in C# · `2.2` Constructors · `2.3` Inheritance · `2.4` Interfaces in C# · `2.5` Access Modifiers · `2.6` ScriptableObjects · `2.7` The Component Pattern · `2.8` Singleton Pattern · `2.9` Event Systems · `2.10` Game Manager Design · `2.11` Input System · `2.12` Rigidbody and Forces · `2.13` Colliders · `2.14` OnCollisionEnter and OnTriggerEnter · `2.15` Mini Challenge — Pick Up Items

**Unit 3 — 2D Game Systems** `3.1` 2D vs 3D in Unity · `3.2` Sprites and SpriteRenderer · `3.3` 2D Physics · `3.4` Tilemaps · `3.5` Camera Setup and Follow Script · `3.6` Raycasting · `3.7` Animator Component · `3.8` Animation Clips and States · `3.9` Transitions and Parameters · `3.10` Scripting Animations · `3.11` Canvas and UI Basics · `3.12` Buttons and UI Events · `3.13` Health Bars and Progress UI · `3.14` Menus and Scene Transitions · `3.15` Mini Challenge — Build a 2D Platformer Level

**Unit 4 — Polish and Advanced C#** `4.1` AudioSource and AudioClip · `4.2` Playing SFX on Events · `4.3` Background Music and Looping · `4.4` Particle Systems · `4.5` Screen Shake and Game Feel · `4.6` Post Processing Effects · `4.7` Cinemachine Camera · `4.8` PlayerPrefs · `4.9` JSON Serialization · `4.10` Saving and Loading Game State · `4.11` Generics in C# · `4.12` Delegates and Events · `4.13` Coroutines · `4.14` LINQ Basics · `4.15` Mini Challenge — Add Save System to Your Game

**Unit 5 — Final Game Project** `5.1` Game Design Document · `5.2` Prototyping the Core Loop · `5.3` Building the Player Controller · `5.4` Enemy AI and NavMesh Basics · `5.5` Level Design Principles · `5.6` UI and HUD Implementation · `5.7` Audio and Polish Pass · `5.8` Playtesting and Iteration · `5.9` Performance Optimization Basics · `5.10` Shader Basics · `5.11` Building and Exporting · `5.12` Publishing to Itch.io · `5.13` Project — Core Loop Complete · `5.14` Project — Full Playthrough Ready · `5.15` Project — Ship It

</details>

---

## Features

### 🎓 Learning System

- **Three-phase lesson structure** — See It Work → See It Break → You Try, on every lesson, no exceptions
- **Game-dev context throughout** — every script is part of one growing 2D game project
- **Contextual hint escalation** — hint appears at 2 wrong attempts, solution unlocks at 5
- **Pattern-based validation** — instant feedback without a server or code execution engine
- **Full lesson navigation** — collapsible sidebar with per-lesson completion tracking

### 🎮 Progression & Rewards

- **XP system** — earn XP on lesson completion; bonus XP for first-attempt success and hint-free runs
- **10 levels** — clear thresholds (100 XP per level) with a persistent progress bar
- **Level-gated cosmetics** — new rewards unlock as you level up, alternating themes and outfits
- **localStorage persistence** — no account needed, progress is saved in the browser

### 🎨 The Shop

**App Themes** (equippable backgrounds):

| Level | Item | Style |
| --- | --- | --- |
| 1 | Sketchbook Studio 🎨 | Concept art pinned to a corkboard — the default |
| 3 | Pixel Sunset 🌇 | Hand-placed pixel-art clouds drifting over a warm gradient |
| 5 | Editor Viewport Violet 🟪 | Unity's own scene-view purple-grey, but dressed up |
| 7 | Game Jam Neon 🌃 | Hot pink and electric blue, 48 hours on the clock |
| 9 | Release Day Gold ✨ | Warm gold light, the splash screen finally has her name on it |

**Character Outfits** (equippable; all with full 6-expression sprite art):

| Level | Outfit | Vibe |
| --- | --- | --- |
| 1 | Artist's Smock 🎨 | Paint-flecked, sleeves rolled. Her signature look, always equipped |
| 2 | Indie Dev Hoodie 🕹️ | Game Dev Mode — ON. Coffee in one hand, tablet pen in the other |
| 4 | Concept Artist's Beret 🖌️ | She's already three concepts ahead of where you are |
| 5 | Game Jam Crunch Tee 😅 | 4am. The build still compiles. Somehow |
| 6 | Pixel Sorceress 🪄✨ | Sprites bend to her will. The animator believes her |
| 7 | Director's Jacket 🎬 | Cinemachine Mode — ON. She's framing the next cutscene in her head |
| 7 | Idol — Frame Perfect ✨ | She already performs a Celebration. Naturally, it has a particle effect |
| 8 | Showcase Blazer 🏆 | She's pitching this build to a publisher. It's going well |
| 8 | NPC Cosplay 🤖 | She dressed as her own boss-fight enemy. For testing purposes |
| 10 | Shipped Game Crown 👑 | It's live on Itch.io. Wear the crown |
| 10 | Off the Clock 🏖️ | The build is exported. She is, finally, playing someone else's game |

**Downloadable Wallpapers** (phone/desktop art, save to your device):

| Level | Wallpaper | Vibe |
| --- | --- | --- |
| 3 | First Build Sunrise 🌅 | The editor finally hit Play without an error |
| 3 | Cherry Blossom Concept Art 🌸 | Watercolor sketch, her game's protagonist mid-sketch |
| 5 | The Sprite Atlas 🏰 | Every frame of animation laid out like a stained-glass window |
| 5 | Mountain Summit — Core Loop Complete 🏔️ | She made it to the top. The flag is a checkpoint flag from her own game |
| 5 | Pixel Library 📚 | Retro shelves, an open game design document |
| 7 | Rainy Studio Window 🌧️ | Even on a slow day, the prototype keeps running |
| 7 | Rooftop Garden Jam 🌿 | City skyline, the sign reads `// TODO: ship it` |
| 7 | Neon Arcade Cabinet 🕹️ | Her own game, glowing on a cabinet between two classics |
| 9 | Shrine Steps — Release Day 🏮 | Stone steps, dawn lanterns, the calmest the launch day gets |
| 9 | Vacation Build 🌅 | Even the longest crunch ends with a sunset and a finished game |

### ✨ Character & Expressions

Sharp-chan has 6 distinct expressions that fire contextually throughout lessons:

| State | Trigger |
| --- | --- |
| `idle` | Phase 1 — explaining working code |
| `thinking` | Hint mode; waiting for input |
| `surprised` | Correct answer |
| `happy` | Phase transitions and encouragement |
| `sad` | Wrong answer (first few times) |
| `idle-sleep` | Idle between interactions |

Each equipped outfit has its own full set of 6 expression sprites — swapping outfits changes Sharp-chan's entire look, not just a filter.

**Domain Expansion** — a fullscreen celebration effect fires on milestone level-ups, complete with confetti (and, fittingly, a particle system she'd be proud of).

---

## Tech Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Frontend | React 19 + Vite 8 | Fast HMR, ES modules, modern JSX transform |
| Styling | Plain CSS + Framer Motion 12 | No CSS framework overhead; animations via Motion |
| State | Zustand 5 | Minimal boilerplate, works with `persist` middleware out of the box |
| Data | JSON files + localStorage | Zero backend for Phase 1; data adapter ready for Phase 2 |
| Routing | React Router v7 | File-level page components |
| Hosting | Vercel | Zero-config deployment |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Running Locally

```bash
# Clone the repo
git clone https://github.com/Omega-Mu-Gamma-Studio/Sharp-Chan.git
cd Sharp-Chan

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app runs at `http://localhost:5173` by default.

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

### Deploying to Vercel

This repo is Vercel-ready with no configuration needed. Connect the repo in the Vercel dashboard and it'll detect the Vite setup automatically. No environment variables required for Phase 1.

---

## Project Structure

```
Sharp-Chan/
├── public/
│   ├── sprites/                      # Character expressions (Artist's Smock — base outfit)
│   │   ├── teaching.png
│   │   ├── excited.png
│   │   ├── frustrated.png
│   │   ├── thinking.png
│   │   ├── oops.png
│   │   ├── idle.png
│   │   └── uniforms/                 # Outfit-specific sprite sets (6 expressions each)
│   │       ├── indie-dev-hoodie/
│   │       ├── concept-beret/
│   │       ├── jam-crunch-tee/
│   │       ├── pixel-sorceress/
│   │       ├── directors-jacket/
│   │       ├── idol/
│   │       ├── showcase-blazer/
│   │       ├── npc-cosplay/
│   │       ├── shipped-crown/
│   │       └── off-the-clock/
│   └── wallpapers/                   # Downloadable device wallpapers (10 total)
│       ├── sharpchan-first-build.png
│       ├── sharpchan-sakura-concept-art.png
│       ├── sharpchan-sprite-atlas.png
│       ├── sharpchan-core-loop-summit.png
│       ├── sharpchan-pixel-library.png
│       ├── sharpchan-rainy-studio.png
│       ├── sharpchan-rooftop-jam.png
│       ├── sharpchan-neon-arcade.png
│       ├── sharpchan-shrine-release.png
│       └── sharpchan-vacation-build.png
│
├── src/
│   ├── components/
│   │   ├── character/SharpChan.jsx     # Sprite renderer; reads spriteOverrides from equipped outfit
│   │   ├── layout/AppLayout.jsx        # Root layout; applies theme + background
│   │   ├── lesson/                     # LessonCanvas, CodeBlock, PhaseIndicator
│   │   └── ui/                         # Sidebar, BottomBar, XPDisplay, ProgressBar
│   │
│   ├── data/
│   │   ├── lessons/                  # 75 JSON lesson files (unit1–5, lessons 1–15)
│   │   ├── units/                    # 5 unit JSON files (id, title, lesson list)
│   │   └── shopItems.js              # All cosmetic definitions (outfits, themes, downloadables)
│   │
│   ├── hooks/
│   │   ├── useLesson.js              # Lesson phase state machine
│   │   ├── useProgress.js            # Progress store bindings
│   │   └── useSound.js               # Sound effect hooks
│   │
│   ├── pages/
│   │   ├── Home.jsx                  # Dashboard / unit selection
│   │   ├── UnitPage.jsx              # Lesson list for a unit
│   │   ├── LessonPage.jsx            # The actual lesson experience
│   │   └── Shop.jsx                  # Cosmetics shop
│   │
│   ├── services/
│   │   ├── lessonService.js          # JSON loader + lesson data access
│   │   └── storageService.js         # localStorage adapter (Phase 2: swap for API)
│   │
│   ├── store/
│   │   ├── progressStore.js          # Zustand store: XP, level, outfits, progress
│   │   └── lessonStore.js            # Zustand store: active lesson state
│   │
│   └── utils/
│       ├── xpCalculator.js           # XP thresholds, level math, earned XP calculation
│       ├── patternMatcher.js         # Regex-based answer validation engine
│       └── csharpHighlighter.js      # C# syntax highlighting for code blocks
```

---

## Adding Content

### Adding a New Lesson

Lesson JSON files live at `src/data/lessons/unit{N}/{N}.{M}.json`. Each file follows this structure:

```json
{
  "id": "1.5",
  "title": "Your First C# Script",
  "xp": 10,
  "phases": [
    {
      "phase": 1,
      "title": "See It Work",
      "dialogue": "Sharp-chan's explanation text here",
      "code": "void Start() {\n    Debug.Log(\"Hello, Player!\");\n}",
      "output": "Hello, Player!"
    },
    {
      "phase": 2,
      "title": "See It Break",
      "dialogue": "Here's what happens when...",
      "code": "void Start() {\n    Debug.Log(\"Hello, Player!\")\n}",
      "error": "CS1002: ; expected"
    },
    {
      "phase": 3,
      "title": "You Try",
      "dialogue": "Your turn — let's see what you'd build.",
      "prompt": "What MonoBehaviour method runs once when a GameObject is first activated?",
      "answer": "Start()",
      "hint": "It happens once, right at the beginning.",
      "solution": "Start()"
    }
  ]
}
```

### Adding a New Outfit

1. Create a folder under `public/sprites/uniforms/<outfit-name>/`
2. Drop in 6 PNGs named: `teaching.png`, `idle.png`, `oops.png`, `thinking.png`, `frustrated.png`, `excited.png`
3. Add an entry to `src/data/shopItems.js` with `spriteOverrides` mapping each expression state to the correct file path
4. That's it — `SharpChan.jsx` and `Shop.jsx` both read `spriteOverrides` automatically

### Developer Cheat Mode

In the Shop page, **triple-click the Shop title** to toggle the dev cheat:

- First triple-click → instantly sets XP to 9999 and level to 10 (unlocks everything)
- Second triple-click → resets XP and level back to 0 / 1

---

## Roadmap

### Phase 1 (Current) ✅

- All 75 lessons authored and published
- Full cosmetics system (11 outfits, 5 themes, 10 downloadable wallpapers)
- XP/leveling, shop, expressions, domain expansion
- localStorage persistence, no account required

### Phase 2 (Planned)

- PostgreSQL + Express API backend
- User accounts and cross-device sync
- Progress stored server-side (the store already has a `_resetForMigration` hook and storage adapter pattern ready for this)
- Instructor view: class-wide completion dashboards
- No frontend rewrite required — only the storage layer changes

---

## Credits & Assets

**Character Art**: Sharp-chan's sprites were generated using AI tools and hand-curated for expression consistency by the Omega Mu Gamma Studio team. All character designs are proprietary to Omega Mu Gamma Studio.

**Note**: As a free, open-source educational tool, we prioritized shipping a complete learning experience over commissioning custom art. If you're an artist interested in contributing official character designs, reach out — we'd love to collaborate.

---

## Part of Omega Mu Gamma Studio

Sharp-chan is part of a student-built suite of open-source engineering and CS education tools from Omega Mu Gamma Studio.

| Tool | What it does |
| --- | --- |
| [SeeDS](https://see-ds.vercel.app) | 3D data structure visualizer with drag-and-drop Playground mode |
| [KMapX](https://kmapx.vercel.app) | Karnaugh map simplifier with don't-care support |
| [EG Suite](https://eg-suite.vercel.app) | 3D Engineering Graphics simulator for ME22201 |
| [GateLab](https://gatelab.vercel.app) | 2D digital logic schematic playground (CS22303) |
| [Java-chan](https://java-chan.vercel.app) | Anime-guided Java tutor for CS22301 |
| [Sharp-chan](https://sharp-chan.vercel.app) | Anime-guided C# tutor for aspiring game developers |
| **Sharp-chan** | Anime-guided C# and Unity tutor for game developers — *this repo* |

---

## License

This project is licensed under the **[PolyForm Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0/)**.

You may use, modify, and share this software for **noncommercial purposes** only. This includes:
- Personal study and hobby projects
- Educational and research use
- Use by noncommercial organizations (charities, educational institutions, government bodies)

**Commercial use is prohibited** without a separate commercial license from Omega Mu Gamma Studio.

**The character art, sprites, and visual assets for this project are also proprietary.** They may not be reproduced, redistributed, or used outside this project without explicit permission.

For commercial licensing inquiries, contact Omega Mu Gamma Studio.

© 2026 Omega Mu Gamma Studio
