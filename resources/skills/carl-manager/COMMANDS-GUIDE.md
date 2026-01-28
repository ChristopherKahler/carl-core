# Star-Commands (COMMANDS Domain)

## Overview

Star-commands let users invoke specific rule sets with a simple `*commandname` syntax.

## File Location
`.carl/commands`

## Format

```
# CARL Commands
# =============

# *brief - Brevity command
BRIEF_RULE_0=*brief - Respond with maximum brevity
BRIEF_RULE_1=Use bullet points only
BRIEF_RULE_2=No explanations unless asked

# *deep - Comprehensive command
DEEP_RULE_0=*deep - Provide comprehensive analysis
DEEP_RULE_1=Consider all edge cases
DEEP_RULE_2=Include reasoning and tradeoffs
```

## Command Structure

Each command is a group of rules with format:
```
{COMMAND}_RULE_N=text
```

- **{COMMAND}** - Uppercase command name (BRIEF, DEEP, etc.)
- **RULE_N** - Sequential index starting at 0
- **text** - The rule instruction

### RULE_0 Convention

First rule (RULE_0) should include the trigger syntax:
```
BRIEF_RULE_0=*brief - Respond with maximum brevity
```

This helps document what triggers the command.

## User Invocation

User types `*commandname` anywhere in their prompt:
```
*brief explain recursion

*deep analyze this code for security issues

Can you *checklist this PR?
```

## How It Works

1. Hook scans prompt for `*{word}` patterns
2. Matches against defined commands in `.carl/commands`
3. Injects all `{COMMAND}_RULE_N` entries for matched command
4. Multiple commands can be invoked in one prompt

## Common Commands

### *brief
```
BRIEF_RULE_0=*brief - Respond with maximum brevity
BRIEF_RULE_1=Use bullet points only
BRIEF_RULE_2=No explanations unless explicitly asked
BRIEF_RULE_3=Skip pleasantries
```

### *deep
```
DEEP_RULE_0=*deep - Provide comprehensive analysis
DEEP_RULE_1=Consider all edge cases and failure modes
DEEP_RULE_2=Include reasoning and tradeoffs
DEEP_RULE_3=Provide examples where helpful
```

### *checklist
```
CHECKLIST_RULE_0=*checklist - Output verification checklist
CHECKLIST_RULE_1=List all acceptance criteria as checkboxes
CHECKLIST_RULE_2=Include edge cases to test
CHECKLIST_RULE_3=Add validation steps
```

### *plan
```
PLAN_RULE_0=*plan - Enter planning mode for complex tasks
PLAN_RULE_1=Break down into discrete steps
PLAN_RULE_2=Identify dependencies and blockers
PLAN_RULE_3=Estimate complexity per step
```

### *debug
```
DEBUG_RULE_0=*debug - Activate debug analysis mode
DEBUG_RULE_1=Show step-by-step reasoning
DEBUG_RULE_2=Include variable states and flow
DEBUG_RULE_3=Identify potential failure points
```

## Creating a New Command

1. Choose command name (lowercase, no spaces)
2. Add rules to `.carl/commands`:
   ```
   MYCOMMAND_RULE_0=*mycommand - Description of what it does
   MYCOMMAND_RULE_1=First instruction
   MYCOMMAND_RULE_2=Second instruction
   ```
3. User invokes with `*mycommand`

## Manifest Entry

COMMANDS domain in manifest:
```
COMMANDS_STATE=active
COMMANDS_RECALL=
COMMANDS_EXCLUDE=
COMMANDS_ALWAYS_ON=false
```

- No recall needed (triggered by `*` syntax)
- `ALWAYS_ON=false` because explicit invocation required

## Best Practices

1. **Clear naming** - Command name should hint at behavior
2. **Document RULE_0** - Include `*name - description` pattern
3. **Focused rules** - Each command should have clear purpose
4. **Test invocation** - Verify `*name` triggers correctly
5. **Avoid conflicts** - Don't reuse command names
