# CARL Installation Guide

Manual installation for CARL (Context Augmentation & Reinforcement Layer).

## Prerequisites

- Claude Code CLI installed
- Python 3.x

## Full Installation (All Steps Required)

### Step 1: Copy Hook Script

```bash
mkdir -p ~/.claude/hooks
cp hooks/carl-hook.py ~/.claude/hooks/carl-hook.py
chmod +x ~/.claude/hooks/carl-hook.py
```

### Step 2: Copy /carl Command

```bash
mkdir -p ~/.claude/commands
cp resources/commands/carl.md ~/.claude/commands/carl.md
cp -r resources/commands/carl ~/.claude/commands/carl
```

### Step 3: Copy carl-manager Skill

```bash
mkdir -p ~/.claude/skills
cp -r resources/skills/carl-manager ~/.claude/skills/carl-manager
```

### Step 4: Copy CARL Config

**For global install (all projects):**
```bash
mkdir -p ~/.carl
cp -r .carl-template/* ~/.carl/
```

**For project-specific install:**
```bash
cp -r .carl-template ./.carl
```

### Step 5: Configure Hook in settings.json

Edit `~/.claude/settings.json`.

**CRITICAL:** Use the ABSOLUTE path. Replace `/home/username` with your actual home directory.

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 /home/username/.claude/hooks/carl-hook.py"
          }
        ]
      }
    ]
  }
}
```

## Verify Installation

All of these must exist:

```
~/.claude/hooks/carl-hook.py
~/.claude/commands/carl.md
~/.claude/commands/carl/
~/.claude/skills/carl-manager/SKILL.md
~/.claude/settings.json (with hook)
~/.carl/manifest (or ./.carl/manifest)
```

## Usage

Start a NEW Claude Code session.

- `/carl` - Manage CARL configuration
- `*dev` - Enable development mode
- `*brief` - Concise responses

## Troubleshooting

**Rules not appearing?**
- Check `.carl/manifest` exists
- Verify absolute path in settings.json hook command
- Set `devmode = true` in manifest for debug output

**Hook errors?**
- Ensure Python 3.x installed and in PATH
- Check file permissions on hook script
