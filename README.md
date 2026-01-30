<div align="center">

# CARL

**Context Augmentation & Reinforcement Layer** — Dynamic rules for Claude Code.

[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
<!-- TODO: Uncomment when published
[![npm version](https://img.shields.io/npm/v/carl-core?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/carl-core)
-->

<br>

```bash
npx carl-core
```

**Works on Mac, Windows, and Linux.**

<br>

![CARL Install](assets/terminal.svg?v=2)

<br>

*"Rules that load when relevant, disappear when not."*

<br>

[Why CARL](#why-carl) · [Getting Started](#getting-started) · [How It Works](#how-it-works) · [Core Concepts](#core-concepts) · [With PAUL](#carl--paul)

</div>

---

## Why CARL

Every Claude Code session starts fresh. Your preferences, workflows, and hard-won lessons? Gone. You end up repeating the same instructions:

> "Use TypeScript strict mode."
> "Don't over-engineer."
> "Run tests after changes."

Static prompts in CLAUDE.md work, but they bloat every session — even when irrelevant. Writing code? You don't need your content creation rules. Debugging? You don't need your planning workflow.

CARL fixes this with **just-in-time rule injection**:

1. **Rules load when relevant** — Mention "fix bug" and your development preferences appear
2. **Rules disappear when not** — Your context stays lean
3. **Explicit triggers available** — Star-commands (`*commandname`) for on-demand modes

The result: Claude remembers how you work without wasting context on rules you don't need right now.

---

## Who This Is For

**Claude Code users** who want persistent preferences without bloated prompts.

You've figured out what works for you — coding style, response format, workflow patterns. CARL makes those preferences stick:

- Define rules once, use them forever
- Rules activate automatically based on context
- Override or extend per-project as needed
- No manual prompt engineering each session

If you find yourself repeating instructions to Claude, CARL is for you.

---

## Getting Started

```bash
npx carl-core
```

The installer prompts you to choose:
1. **Global** — Rules apply to all Claude Code projects (`~/.claude` + `~/.carl`)
2. **Local** — Rules apply to current project only (`./.claude` + `./.carl`)

It also asks whether to add the CARL integration block to your CLAUDE.md.

**Restart Claude Code after installation.**

### Your First Interaction

After install, type `*carl` in any prompt:

```
*carl
```

This activates **CARL Help Mode** — an interactive guide that can:
- Explain how CARL works
- Help you create custom domains
- Show your current configuration
- Guide you through rule syntax

`*carl` is your entry point for learning and managing CARL.

### Staying Updated

```bash
npx carl-core@latest
```

---

## How It Works

```
You type: "help me fix this bug"
                │
                ▼
    ┌───────────────────────┐
    │   CARL Hook Scans     │
    │   Your Prompt         │
    └───────────────────────┘
                │
                ▼
    ┌───────────────────────┐
    │  Matches "fix bug"    │
    │  → DEVELOPMENT domain │
    └───────────────────────┘
                │
                ▼
    ┌───────────────────────┐
    │  Injects Your Rules   │
    │  Into Context         │
    └───────────────────────┘
                │
                ▼
    Claude responds with your
    coding preferences baked in
```

The hook runs on every interaction, reads your `.carl/manifest`, and injects only the rules that match your current task.

### Project Structure

```
.carl/
├── manifest              # Domain registry (states + keywords)
├── global                # Universal rules (always loaded)
├── commands              # Star-command definitions
├── context               # Context-aware rules (fresh/moderate/depleted)
└── {custom-domain}       # Your domain files
```

---

## Core Concepts

### Domains

A domain is a collection of related rules. Create domains for different contexts:

| Example Domain | Trigger Keywords | What It Does |
|----------------|------------------|--------------|
| DEVELOPMENT | "fix bug", "write code" | Your coding preferences |
| CONTENT | "write script", "youtube" | Your content creation style |
| CLIENTS | "client project", "deliverable" | Project-specific rules |

When your prompt matches a domain's keywords, its rules load automatically.

### Star-Commands

Explicit triggers using `*commandname` syntax:

```
*brief explain recursion
```

Unlike domains (automatic), star-commands are intentional. Use them for workflow modes:

- Response formatting (concise vs detailed)
- Task modes (planning vs execution)
- Review and analysis patterns

Create your own star-commands for frequently-used behaviors.

### The Manifest

Controls which domains exist and when they activate:

```
DEVELOPMENT_STATE=active
DEVELOPMENT_RECALL=fix bug, write code, implement
DEVELOPMENT_EXCLUDE=
DEVELOPMENT_ALWAYS_ON=false
```

| Field | Purpose |
|-------|---------|
| STATE | `active` or `inactive` |
| RECALL | Keywords that trigger loading |
| EXCLUDE | Keywords that prevent loading |
| ALWAYS_ON | Load every session if `true` |

### Rule Format

Simple `KEY=VALUE` in domain files:

```
DEVELOPMENT_RULE_0=Code over explanation - show, don't tell
DEVELOPMENT_RULE_1=Prefer editing existing files over creating new
DEVELOPMENT_RULE_2=Run tests after implementation changes
```

**Pattern:** `{DOMAIN}_RULE_{N}=instruction`

---

## Configuration

### Global vs Local

| Location | Scope | Use Case |
|----------|-------|----------|
| `~/.carl/` | All projects | Universal preferences |
| `./.carl/` | Current project | Project-specific rules |

Local rules override global when both exist.

### Creating Custom Domains

1. Create file `.carl/myworkflow` (lowercase)
2. Add rules with uppercase prefix:
   ```
   MYWORKFLOW_RULE_0=First instruction
   MYWORKFLOW_RULE_1=Second instruction
   ```
3. Register in manifest:
   ```
   MYWORKFLOW_STATE=active
   MYWORKFLOW_RECALL=keyword1, keyword2
   ```

Or use `*carl` and say "help me create a domain" for guided setup.

---

## CARL + PAUL

CARL has a companion: **[PAUL](https://github.com/ChristopherKahler/paul)** (Plan-Apply-Unify Loop).

| Tool | Purpose |
|------|---------|
| **CARL** | Dynamic rule injection — how Claude behaves |
| **PAUL** | Structured development workflow — how work flows |

They complement each other:

- CARL loads PAUL rules when you're in a `.paul/` project
- PAUL enforces loop integrity (plan → apply → unify)
- CARL keeps PAUL rules out of context when not needed

**Without CARL:** PAUL rules would bloat every session.
**Without PAUL:** Complex projects lack structure.

Together: lean context + reliable workflow.

---

## Troubleshooting

**Rules not loading?**
1. Check manifest has `STATE=active`
2. Verify recall keywords match your prompt
3. Ensure hook is configured in `~/.claude/settings.json`

**Too many rules loading?**
1. Make recall keywords more specific
2. Use EXCLUDE to block unwanted matches
3. Split broad domains into focused ones

**Need help?**
- Type `*carl` for interactive guidance
- Check `.carl/manifest` for current configuration

---

## Philosophy

### Lean Context

Static prompts waste tokens on irrelevant rules. CARL loads only what's needed:

| Approach | Context Cost |
|----------|--------------|
| Static CLAUDE.md | All rules, every session |
| CARL | Only matched rules |

More room for actual work.

### Explicit Over Magic

CARL is transparent:
- See exactly which domains loaded
- Know why rules activated (keyword match)
- Override with star-commands when needed

No hidden behavior.

### Your Rules, Your Way

CARL provides structure, not opinions. The default domains are examples — customize or replace them entirely. Your workflow, your rules.

---

## What's Included

```
carl-core/
├── hooks/carl-hook.py        # The injection engine
├── .carl-template/           # Default configuration
│   ├── manifest              # Domain registry
│   ├── global                # Universal rules
│   ├── commands              # Star-command definitions
│   └── context               # Context bracket rules
└── resources/                # Optional management tools
    ├── commands/carl/            # /carl:manager and related commands
    └── skills/               # Domain management helpers
```

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

## Author

**Chris Kahler** — [Chris AI Systems](https://github.com/ChristopherKahler)

Building tools for AI-assisted development.

---

<div align="center">

**Claude Code is powerful. CARL makes it personal.**

</div>
