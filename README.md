# Song of the Highlands

A story-driven exploration game inspired by Minangkabau society.

## Concept
This game explores the idea that patriarchy is not the only possible way to organize family and community life. It does so through a respectful, human-centered story inspired by Minangkabau culture in West Sumatra.

## Setting
A Minangkabau-inspired village with:
- rumah gadang family homes
- rice fields and gardens
- village paths
- a market
- community gathering spaces
- religious and cultural spaces

## Main Character
**Sari** is a curious teenager learning how family, identity, and responsibility work in her community.

## Prototype Goal
Build a small playable experience where the player can:
- explore a village area
- talk to characters
- complete simple tasks
- learn about matrilineal family life

## Run the Prototype

The first playable is a dependency-free browser prototype with a CSS 3D village, animated characters, camera-framed scenes, and a short quest. Start a local server from the repository root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. Move Sari with WASD or the arrow keys, press E near people or ingredients, and use the scene rail to visit the market, garden, and unlocked elders' veranda.

## Values
- Respect for elders
- Cooperation
- Community decision-making
- Tradition and change living together
- Cultural accuracy and care

## What to Avoid
- Stereotypes
- Exoticism
- Gender villain/hero framing
- Oversimplifying religion or culture
- Turning the society into a fantasy costume

## Engine Choice: Godot 4 (Beginner 3D)
Godot 4 is the foundation engine for the first prototype because it is:
- beginner-friendly for first-time developers
- free and open source
- capable of small, story-driven 3D projects
- well suited for quick iteration on exploration and dialogue

## First 3D Prototype Scope (Intentionally Small)
This repository starts with a beginner-first 3D vertical slice:
- third-person movement
- camera follow
- interaction button
- simple dialogue
- one small village test scene
- one NPC

No combat, large open world, or advanced systems in this first step.

## Starter Project Structure
A beginner starter structure is included under [`godot/`](./godot/):
- starter folders for scenes, scripts, assets, and dialogue
- a short setup guide
- a first-prototype checklist with milestones

See [`godot/README.md`](./godot/README.md) to begin.

## Next Steps
1. Refine the story with research and feedback
2. Add more village locations and scene transitions
3. Replace prototype shapes with reviewed visual assets
