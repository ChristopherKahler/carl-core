# CARL Core

**Context Augmentation & Reinforcement Layer** - Lightweight rules engine for Claude Code.

CARL injects contextual rules into your Claude Code sessions based on:
- **GLOBAL** - Universal best practices (always active)
- **CONTEXT** - Dynamic rules based on remaining context window
- **COMMANDS** - Star-commands like `*dev`, `*review`, `*brief` for workflow modes

## Quick Install (Let Claude Do It)

Copy this to Claude Code:

```
Install CARL from https://github.com/ChristopherKahler/carl-core following the CLAUDE.md instructions
```

## Manual Install

See [INSTALL.md](INSTALL.md) for step-by-step instructions.

## What's Included

```
carl-core/
├── hooks/
│   └── carl-hook.py           # The main hook script
├── .carl-template/
│   ├── manifest                # Configuration file
│   ├── GLOBAL                  # Universal rules
│   ├── CONTEXT                 # Context-aware brackets
│   └── COMMANDS                # Star-command definitions
├── resources/                  # Optional workflow tools
│   ├── commands/carl.md        # /carl command
│   └── skills/carl-manager/    # Domain management skill
├── INSTALL.md                  # Manual installation guide
└── CLAUDE.md                   # Claude Code bootstrap prompt
```

## How It Works

1. The hook script runs on every Claude Code interaction
2. It reads your `.carl/manifest` to determine active domains
3. Rules are injected into the conversation context
4. Claude follows the rules automatically

## License

MIT
