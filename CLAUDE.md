# CARL Core - Claude Code Installation

You are installing CARL (Context Augmentation & Reinforcement Layer) for the user.

## Installation Steps

### 1. Copy Hook Script

Copy the hook script to the user's Claude hooks directory:

```bash
mkdir -p ~/.claude/hooks
cp hooks/drl-engine.py ~/.claude/hooks/drl-engine.py
chmod +x ~/.claude/hooks/drl-engine.py
```

### 2. Initialize Workspace

Copy the `.carl-template` to the current workspace as `.carl`:

```bash
cp -r .carl-template ./.carl
```

### 3. Wire the Hook in Settings

Read the user's `~/.claude/settings.json` file. Add the CARL hook to the `UserPromptSubmit` hooks array:

```json
{
  "type": "command",
  "command": "python3 ~/.claude/hooks/drl-engine.py \"$PROMPT\" \"$WORKSPACE\""
}
```

If the file doesn't exist or has no hooks section, create it with:

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "type": "command",
        "command": "python3 ~/.claude/hooks/drl-engine.py \"$PROMPT\" \"$WORKSPACE\""
      }
    ]
  }
}
```

### 4. Verify

Confirm these files exist:
- `~/.claude/hooks/drl-engine.py`
- `./.carl/manifest`
- `./.carl/GLOBAL`
- `./.carl/CONTEXT`
- `./.carl/COMMANDS`

### 5. Optional: Install /carl Command

If the user wants the `/carl` command for managing domains:

```bash
mkdir -p ~/.claude/commands
cp resources/commands/carl.md ~/.claude/commands/
cp -r resources/commands/carl ~/.claude/commands/
```

## Success Message

After completing installation, inform the user:

"CARL has been installed! Start a new Claude Code session to activate it. You'll see rule injections in your context automatically.

**Quick tips:**
- Use `*dev` to activate development mode
- Use `*brief` for concise responses
- Edit `.carl/manifest` to customize which domains are active
- Set `devmode = true` in manifest for debug output"
