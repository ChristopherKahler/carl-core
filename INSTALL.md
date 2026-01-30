# CARL Installation Guide

## Quick Install (Recommended)

```bash
npx carl-core
```

The installer will:
1. Prompt for install location (global or local)
2. Copy the hook script and wire it into settings.json
3. Copy commands and skills
4. Create your `.carl/` configuration
5. Optionally add the CARL integration block to CLAUDE.md

### Non-interactive Install

```bash
npx carl-core --global       # Install to ~/.claude and ~/.carl
npx carl-core --local        # Install to ./.claude and ./.carl
npx carl-core --skip-claude-md  # Don't modify CLAUDE.md
```

### Staying Updated

```bash
npx carl-core@latest
```

---

## Prerequisites

- Claude Code CLI installed
- Python 3.x (for the hook script)
- Node.js 16.7+ (for npx)

---

## Manual Installation

If you prefer manual setup or npx isn't available:

### Step 1: Clone the Repository

```bash
git clone https://github.com/ChristopherKahler/carl-core.git
cd carl-core
```

### Step 2: Copy Hook Script

```bash
mkdir -p ~/.claude/hooks
cp hooks/carl-hook.py ~/.claude/hooks/carl-hook.py
chmod +x ~/.claude/hooks/carl-hook.py
```

### Step 3: Copy Commands

```bash
mkdir -p ~/.claude/commands
cp -r resources/commands/carl ~/.claude/commands/carl
```

### Step 4: Copy Skills

```bash
mkdir -p ~/.claude/skills
cp -r resources/skills/* ~/.claude/skills/
```

### Step 5: Copy CARL Config

**Global (all projects):**
```bash
cp -r .carl-template ~/.carl
```

**Project-specific:**
```bash
cp -r .carl-template ./.carl
```

### Step 6: Configure Hook in settings.json

Edit `~/.claude/settings.json` (create if it doesn't exist).

**CRITICAL:** Use your actual absolute home directory path.

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 /home/YOUR_USERNAME/.claude/hooks/carl-hook.py"
          }
        ]
      }
    ]
  }
}
```

### Step 7: Add CARL Block to CLAUDE.md

Add this near the **top** of your CLAUDE.md:

```markdown
<!-- CARL-MANAGED: Do not remove this section -->
## CARL Integration

Follow all rules in <carl-rules> blocks from system-reminders.
These are dynamically injected based on context and MUST be obeyed.
<!-- END CARL-MANAGED -->
```

See [CARL-BLOCK.md](CARL-BLOCK.md) for details.

---

## Verify Installation

All of these should exist:

```
~/.claude/hooks/carl-hook.py
~/.claude/commands/carl/manager.md
~/.claude/skills/carl-manager/SKILL.md
~/.claude/settings.json (with hook configured)
~/.carl/manifest
```

---

## Usage

**Restart Claude Code** after installation.

- `*carl` — Interactive help and guidance
- `/carl:manager` — Manage domains and rules

---

## Troubleshooting

**Rules not appearing?**
- Check `.carl/manifest` exists
- Verify hook path in settings.json is absolute
- Set `devmode = true` in manifest for debug output

**Hook errors?**
- Ensure Python 3.x is installed and in PATH
- Check file permissions: `chmod +x ~/.claude/hooks/carl-hook.py`

**CARL block not recognized?**
- Ensure it's near the top of CLAUDE.md
- Check for typos in the HTML comments
