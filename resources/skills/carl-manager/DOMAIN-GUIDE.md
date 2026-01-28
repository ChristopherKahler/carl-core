# Domain Structure Guide

## Naming Conventions

| Element | Format | Example |
|---------|--------|---------|
| Filename | lowercase, no extension | `.carl/development` |
| Alternative | lowercase with .env | `.carl/development.env` |
| Rule prefix | UPPERCASE | `DEVELOPMENT_RULE_0` |
| Index | Sequential from 0 | `_RULE_0`, `_RULE_1`, `_RULE_2` |

## Domain File Structure

```
# {DOMAIN} Domain Rules
# =====================
# Optional description comment
# Recall: keywords (for reference, not parsed)

{DOMAIN}_RULE_0=First rule
{DOMAIN}_RULE_1=Second rule
{DOMAIN}_RULE_2=Third rule
```

## Special Domains

### GLOBAL
- **Purpose:** Always-on universal rules
- **Filename:** `.carl/global`
- **Behavior:** Injected first, before all other domains
- **Manifest:** `GLOBAL_ALWAYS_ON=true`
- **No recall keywords needed**

Example:
```
# GLOBAL Domain Rules
GLOBAL_RULE_0=Use absolute paths in programming
GLOBAL_RULE_1=Batch tool calls when possible
GLOBAL_RULE_2=Never mark tasks complete without validation
```

### CONTEXT
- **Purpose:** Context-aware bracket injection
- **Filename:** `.carl/context`
- **Behavior:** Rules injected based on context % remaining
- **Brackets:** FRESH (>75%), MODERATE (40-75%), DEPLETED (<40%)

Example:
```
# CONTEXT Bracket Rules
FRESH_ENABLED=true
FRESH_RULE_0=Context is fresh, be thorough
FRESH_RULE_1=Include full explanations

MODERATE_ENABLED=true
MODERATE_RULE_0=Balance thoroughness with brevity

DEPLETED_ENABLED=true
DEPLETED_RULE_0=Context low, be concise
DEPLETED_RULE_1=Prepare handoff summary
```

### COMMANDS
- **Purpose:** Star-command definitions
- **Filename:** `.carl/commands`
- **Behavior:** User invokes with `*commandname`
- **Format:** Each command is a group of rules

Example:
```
# CARL Commands
BRIEF_RULE_0=*brief - Respond with maximum brevity
BRIEF_RULE_1=Use bullet points only

DEEP_RULE_0=*deep - Provide comprehensive analysis
DEEP_RULE_1=Consider all edge cases
```

## Custom Domains

Create for project-specific, client-specific, or workflow rules.

### Creating a Custom Domain

1. **Create file:** `.carl/{domainname}` (lowercase)
2. **Add rules:** Use UPPERCASE prefix
3. **Add manifest entries:** STATE, RECALL, EXCLUDE, ALWAYS_ON
4. **Optional:** Add to DOMAIN_ORDER

Example for a TESTING domain:
```
# TESTING Domain Rules
TESTING_RULE_0=Write tests before implementation
TESTING_RULE_1=Each test should test one behavior
TESTING_RULE_2=Use descriptive test names
```

Manifest entries:
```
TESTING_STATE=active
TESTING_RECALL=test, testing, TDD, unit test
TESTING_EXCLUDE=
TESTING_ALWAYS_ON=false
```

## Best Practices

1. **Be specific** - Rules should be actionable
2. **Keep it short** - One clear instruction per rule
3. **Use active voice** - "Do X" not "X should be done"
4. **Group logically** - Related rules in same domain
5. **Meaningful recalls** - Use keywords users naturally type
