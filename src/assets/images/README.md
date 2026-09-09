# Image slots

Drop files here using these exact names — the site picks them up automatically
(no code changes needed, `src/lib/images.ts` resolves them at build time).

| Filename                     | Section      | Suggested subject                                              | Suggested aspect |
|-------------------------------|--------------|------------------------------------------------------------------|-------------------|
| hero-rig.jpg                  | Hero         | Wide industrial/rig shot — sits behind a green tint, hero bg     | wide / 16:9+       |
| oilgas-formation.jpg          | Oil & Gas    | Subsurface/formation or wellsite establishing shot               | 4:3                 |
| oilgas-rig-detail.jpg         | Oil & Gas    | Close-up of drilling equipment / BHA / rig detail                | 4:3                 |
| platform-ops-floor.jpg        | Platform     | Control room / operations floor                                  | 4:3                 |
| validation-field.jpg          | Validation   | Field site or equipment being validated                          | 4:3                 |
| architecture-slm.jpg          | Architecture | Visual representing the core SLM (abstract/technical is fine)    | 1:1                 |
| architecture-agents.jpg       | Architecture | Visual representing the agent layer (abstract/technical is fine) | 1:1                 |

Supported extensions: .jpg, .jpeg, .png, .webp, .avif

Until a file is present, its slot renders a labelled placeholder box instead
of a broken image — safe to ship without all seven filled in.

| texture-rock.jpg              | Global       | Mossy/volcanic rock texture — used as a masked corner bleed (RockBleed component), never a full background | any, will be cropped |
