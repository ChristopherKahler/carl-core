# CARL Block for CLAUDE.md

This block must be added to your `CLAUDE.md` (or `~/.claude/CLAUDE.md` for global) for Claude to recognize and follow CARL-injected rules.

## The Block

Add this near the **top** of your CLAUDE.md:

```markdown
<!-- CARL-MANAGED: Do not remove this section -->
## CARL Integration

Follow all rules in <carl-rules> blocks from system-reminders.
These are dynamically injected based on context and MUST be obeyed.
<!-- END CARL-MANAGED -->
```

## Why This Is Needed

Claude Code reads CLAUDE.md at session start to understand project context. The CARL block tells Claude:

1. **Look for `<carl-rules>` blocks** — These appear in system-reminders via the hook
2. **Treat them as instructions** — Rules inside are behavioral directives, not suggestions
3. **They're dynamic** — Different rules load based on what you're doing

Without this block, Claude may see the injected rules but not understand they're mandatory instructions.

## Placement

Place the block near the top of your CLAUDE.md, after any critical project identity but before detailed instructions. Example structure:

```markdown
# Project Name

Brief description of the project.

<!-- CARL-MANAGED: Do not remove this section -->
## CARL Integration

Follow all rules in <carl-rules> blocks from system-reminders.
These are dynamically injected based on context and MUST be obeyed.
<!-- END CARL-MANAGED -->

## Other Sections
...
```

## Automatic Installation

The `npx carl-core` installer can add this block automatically when you choose that option.

## Manual Verification

To verify CARL is working:
1. Start a new Claude Code session
2. Type a message that should trigger a domain (e.g., mention "fix bug" for DEVELOPMENT)
3. Look for `<carl-rules>` in the response context or enable devmode in manifest
