# CARL Core - Manual Installation

## Prerequisites

- Claude Code CLI installed
- Python 3.10+ (for the hook script)

## Step 1: Copy the Hook Script

Copy `hooks/carl-hook.py` to your Claude hooks directory:

```bash
cp hooks/carl-hook.py ~/.claude/hooks/carl-hook.py
```

## Step 2: Initialize Your Workspace

Copy the `.carl-template` folder to your workspace as `.carl`:

```bash
cp -r .carl-template /path/to/your/workspace/.carl
```

## Step 3: Wire the Hook

Add the hook to your `~/.claude/settings.json`:

**Linux/macOS:**
```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 $HOME/.claude/hooks/carl-hook.py"
          }
        ]
      }
    ]
  }
}
```

**Windows:**
```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 %USERPROFILE%\\.claude\\hooks\\carl-hook.py"
          }
        ]
      }
    ]
  }
}
```

If you already have hooks configured, add the CARL hook entry to your existing `UserPromptSubmit` array.

## Step 4: Verify Installation

Start a new Claude Code session in your workspace and check for CARL rules in the context.

## Optional: Install Workflow Resources

The `/carl` command and `carl-manager` skill help you manage domains from within Claude Code.

### Install /carl command

```bash
mkdir -p ~/.claude/commands
cp -r resources/commands/carl.md ~/.claude/commands/
cp -r resources/commands/carl ~/.claude/commands/
```

### Install carl-manager skill

```bash
mkdir -p ~/.claude/skills
cp -r resources/skills/carl-manager ~/.claude/skills/
```

Then add to your `~/.claude/settings.json`:

```json
{
  "skills": ["~/.claude/skills/carl-manager/SKILL.md"]
}
```

## Customization

Edit your `.carl/manifest` to:
- Enable/disable domains
- Set `devmode = true` for verbose debug output
- Add recall keywords to trigger domains contextually

Edit domain files (GLOBAL, CONTEXT, COMMANDS) to customize rules.

## Troubleshooting

**Rules not appearing?**
- Check that `.carl/manifest` exists in your workspace
- Verify the hook path in settings.json is correct
- Try `devmode = true` in manifest for debug output

**Hook errors?**
- Ensure Python 3.10+ is installed
- Check file permissions on the hook script
