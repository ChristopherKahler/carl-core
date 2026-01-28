# CARL Core - Claude Code Installation

You are helping the user install CARL (Context Augmentation & Reinforcement Layer).

## First: Ask the User

Before installing, ask the user:

**"How would you like to install CARL?"**

1. **Global** - CARL rules apply to ALL your Claude Code projects
   - Hook goes to `~/.claude/hooks/`
   - Config goes to `~/.carl/` (created in home directory)

2. **Project-specific** - CARL rules apply only to THIS workspace
   - Hook goes to `~/.claude/hooks/` (shared)
   - Config goes to `./.carl/` (in current workspace)

3. **Both** - Global defaults + project overrides
   - Same as Global, but also creates `./.carl/` in current workspace
   - Project config takes precedence when present

Wait for their answer before proceeding.

---

## Installation Steps

### For ALL install types: Copy Hook Script

```bash
mkdir -p ~/.claude/hooks
cp hooks/carl-hook.py ~/.claude/hooks/carl-hook.py
chmod +x ~/.claude/hooks/carl-hook.py
```

### For GLOBAL install:

```bash
mkdir -p ~/.carl
cp -r .carl-template/* ~/.carl/
```

### For PROJECT-SPECIFIC install:

```bash
cp -r .carl-template ./.carl
```

### For BOTH:

```bash
mkdir -p ~/.carl
cp -r .carl-template/* ~/.carl/
cp -r .carl-template ./.carl
```

### Wire the Hook in Settings

Read `~/.claude/settings.json`. Add the CARL hook to `UserPromptSubmit`.

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

## Verify Installation

Confirm these files exist based on install type:

**Global:**
- `~/.claude/hooks/carl-hook.py`
- `~/.carl/manifest`

**Project-specific:**
- `~/.claude/hooks/carl-hook.py`
- `./.carl/manifest`

## Success Message

"CARL installed! Start a new Claude Code session to activate.

**Quick tips:**
- `*dev` - Development mode
- `*brief` - Concise responses
- `*plan` - Planning mode
- Edit `.carl/manifest` to customize
- Set `devmode = true` for debug output"
