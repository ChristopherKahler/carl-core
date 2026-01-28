# Create Star-Command Task

## Input
- Command name (lowercase, no spaces, no asterisk)
- Command rules (at least one)

## Workflow

1. **Validate command name** - Lowercase, alphanumeric only
2. **Read .carl/commands file**
3. **Check if command exists** - Error if {COMMAND}_RULE_0 found
4. **Add command rules** as {COMMAND}_RULE_N entries
5. **Write updated file**
6. **Report success** with usage instruction

## Command Rule Format

First rule (RULE_0) should include the trigger syntax:
```
CHECKLIST_RULE_0=*checklist - Output verification checklist for current task
```

Additional rules provide instructions:
```
CHECKLIST_RULE_1=List all acceptance criteria as checkboxes
CHECKLIST_RULE_2=Include edge cases and error scenarios
CHECKLIST_RULE_3=Add testing steps if applicable
```

## Output Format

```
Creating *checklist command:

.carl/commands:
+ CHECKLIST_RULE_0=*checklist - Output verification checklist for current task
+ CHECKLIST_RULE_1=List all acceptance criteria as checkboxes
+ CHECKLIST_RULE_2=Include edge cases and error scenarios
+ CHECKLIST_RULE_3=Add testing steps if applicable

Done. User can now type *checklist to activate.
```

## Error Cases

**Command exists:**
```
Error: Command *checklist already exists.
Use *edit COMMANDS CHECKLIST_RULE_N to modify.
```

**Invalid name:**
```
Error: Command name must be lowercase alphanumeric.
Got: my-cmd
Suggestion: Use mycmd instead.
```

## Common Commands to Create

| Command | Purpose |
|---------|---------|
| *brief | Maximum brevity responses |
| *deep | Comprehensive analysis |
| *checklist | Verification checklists |
| *debug | Debug mode output |
| *plan | Planning mode for complex tasks |
