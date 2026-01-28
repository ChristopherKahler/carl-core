# CARL Core - Installation Instructions

You are helping install CARL (Context Augmentation & Reinforcement Layer).

## STEP 1: Ask Install Type

Ask the user:

**"How would you like to install CARL?"**
1. **Global** - Rules apply to ALL Claude Code projects
2. **Project-specific** - Rules apply only to THIS workspace
3. **Both** - Global defaults + project overrides

Wait for their answer before proceeding.

---

## STEP 2: Determine Paths

Get the user's home directory path. You need the ABSOLUTE path (no `~` or env vars).

- Linux/macOS: typically `/home/username` or `/Users/username`
- Windows: typically `C:\Users\Username`

Store this as `$HOME_PATH` for the steps below.

---

## STEP 3: Copy Hook Script

```bash
mkdir -p $HOME_PATH/.claude/hooks
cp hooks/carl-hook.py $HOME_PATH/.claude/hooks/carl-hook.py
chmod +x $HOME_PATH/.claude/hooks/carl-hook.py
```

**Verify:** File exists at `$HOME_PATH/.claude/hooks/carl-hook.py`

---

## STEP 4: Copy Commands

```bash
mkdir -p $HOME_PATH/.claude/commands
cp resources/commands/carl.md $HOME_PATH/.claude/commands/carl.md
cp -r resources/commands/carl $HOME_PATH/.claude/commands/carl
```

**Verify:**
- File exists: `$HOME_PATH/.claude/commands/carl.md`
- Folder exists: `$HOME_PATH/.claude/commands/carl/`

---

## STEP 5: Copy Skills

```bash
mkdir -p $HOME_PATH/.claude/skills
cp -r resources/skills/carl-manager $HOME_PATH/.claude/skills/carl-manager
```

**Verify:** Folder exists with SKILL.md: `$HOME_PATH/.claude/skills/carl-manager/SKILL.md`

---

## STEP 6: Copy CARL Config

**For GLOBAL install:**
```bash
mkdir -p $HOME_PATH/.carl
cp -r .carl-template/* $HOME_PATH/.carl/
```

**For PROJECT-SPECIFIC install:**
```bash
cp -r .carl-template ./.carl
```

**For BOTH:**
```bash
mkdir -p $HOME_PATH/.carl
cp -r .carl-template/* $HOME_PATH/.carl/
cp -r .carl-template ./.carl
```

**Verify:** `manifest` file exists in the .carl folder(s)

---

## STEP 7: Configure Hook in settings.json

Read `$HOME_PATH/.claude/settings.json` (create if doesn't exist).

Add the CARL hook using the **ABSOLUTE PATH**:

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 $HOME_PATH/.claude/hooks/carl-hook.py"
          }
        ]
      }
    ]
  }
}
```

**IMPORTANT:** Replace `$HOME_PATH` with the actual absolute path. Do NOT use `~` or environment variables.

If hooks already exist, merge the CARL hook into the existing `UserPromptSubmit` array.

---

## STEP 8: Final Verification Checklist

Confirm ALL of these exist:

- [ ] `$HOME_PATH/.claude/hooks/carl-hook.py`
- [ ] `$HOME_PATH/.claude/commands/carl.md`
- [ ] `$HOME_PATH/.claude/commands/carl/` (folder with task files)
- [ ] `$HOME_PATH/.claude/skills/carl-manager/SKILL.md`
- [ ] `$HOME_PATH/.claude/settings.json` (with hook configured)
- [ ] `.carl/manifest` (global and/or project-specific based on install type)

---

## STEP 9: Success Message

Show this message:

```
CARL installed successfully!

Start a NEW Claude Code session to activate.

Quick commands:
- /carl - Manage CARL configuration
- *dev - Enable development mode
- *brief - Concise responses

Edit .carl/manifest to customize domains and rules.
```
