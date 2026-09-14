# Godot 4 Beginner 3D Starter

This folder provides a small, beginner-friendly starting point for the first playable prototype of **Song of the Highlands**.

## Goal of this setup
Build a tiny 3D prototype focused on:
1. third-person movement
2. camera follow
3. interaction button
4. simple dialogue
5. one small village test scene
6. one NPC

## First steps in Godot 4
1. Install **Godot 4.x** (stable).
2. In Godot Project Manager, create or import a project at `godot/project/`.
3. Keep the first playable area very small (for example: one house, one path, one NPC spot).
4. Add one interaction prompt (for example: "Press E to talk").
5. Add one short dialogue exchange that reflects respectful community tone.

## Starter structure
```text
godot/
└─ project/
   ├─ assets/
   │  ├─ audio/
   │  ├─ models/
   │  └─ textures/
   ├─ dialogue/
   ├─ scenes/
   │  ├─ npc/
   │  ├─ player/
   │  ├─ ui/
   │  └─ world/
   └─ scripts/
      ├─ camera/
      ├─ dialogue/
      ├─ interaction/
      └─ player/
```

Use `.gitkeep` files only to preserve the folders until actual Godot files are added.

## Beginner milestones
Use [`PROTOTYPE_CHECKLIST.md`](./PROTOTYPE_CHECKLIST.md) for a simple step-by-step build order.

## Cultural guidance for this stage
Even in prototype form, prioritize warm, respectful representation:
- avoid stereotypes and exotic framing
- keep dialogue grounded in everyday family/community life
- treat cultural spaces with care
