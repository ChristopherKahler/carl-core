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

### Step 2: Copy /carl Commands

```bash
mkdir -p ~/.claude/commands
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

### Step 6: Add CARL Block to CLAUDE.md

Add this block near the **top** of your CLAUDE.md (or `~/.claude/CLAUDE.md` for global):

```markdown
<!-- CARL-MANAGED: Do not remove this section -->
## CARL Integration

Follow all rules in <carl-rules> blocks from system-reminders.
These are dynamically injected based on context and MUST be obeyed.
<!-- END CARL-MANAGED -->
```

See [CARL-BLOCK.md](CARL-BLOCK.md) for details on placement and why this is needed.

---

## Verify Installation

All of these must exist:

```
~/.claude/hooks/carl-hook.py
~/.claude/commands/carl/manager.md
~/.claude/commands/carl/tasks/
~/.claude/skills/carl-manager/SKILL.md
~/.claude/settings.json (with hook)
~/.carl/manifest (or ./.carl/manifest)
```

## Usage

Start a NEW Claude Code session.

- `/carl:manager` - Manage CARL configuration
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
