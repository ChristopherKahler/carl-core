# Manifest Reference

## Location
`.carl/manifest` (no extension)

## Format
```
KEY=VALUE
```
- No spaces around `=`
- One entry per line
- Lines starting with `#` are comments
- Empty lines allowed

## Domain Entries

Each domain has four manifest entries:

| Key | Values | Purpose |
|-----|--------|---------|
| `{DOMAIN}_STATE` | `active` / `inactive` | Enable/disable domain |
| `{DOMAIN}_RECALL` | comma-separated | Keywords that trigger injection |
| `{DOMAIN}_EXCLUDE` | comma-separated | Keywords that prevent injection |
| `{DOMAIN}_ALWAYS_ON` | `true` / `false` | Always inject regardless of recall |

### STATE
Controls whether domain is enabled.
- `active` - Domain can be injected (if conditions met)
- `inactive` - Domain never injected

### RECALL
Comma-separated keywords that trigger injection.
- Matched against user's prompt
- Case-insensitive matching
- Partial word matches (e.g., "test" matches "testing")

Example:
```
DEVELOPMENT_RECALL=*dev, write code, fix bug, programming
```

### EXCLUDE
Comma-separated keywords that prevent injection.
- Checked after recall matches
- If exclude keyword found, domain skipped
- Useful for edge cases

Example:
```
DEVELOPMENT_EXCLUDE=documentation only, no code
```

### ALWAYS_ON
When `true`, domain injects regardless of recall keywords.
- Typically used for GLOBAL and CONTEXT
- STATE still respected (inactive = no injection)

## Global Settings

| Key | Values | Purpose |
|-----|--------|---------|
| `DOMAIN_ORDER` | comma-separated | Injection sequence |
| `DEVMODE` | `true` / `false` | Show debug output |

### DOMAIN_ORDER
Controls order domains are injected:
```
DOMAIN_ORDER=GLOBAL,CONTEXT,DEVELOPMENT,PROJECTS,COMMANDS
```
- Domains not in list injected after (alphabetically)
- GLOBAL typically first
- COMMANDS typically last

### DEVMODE
When `true`, adds debug block to responses:
```
DEVMODE=true
```

Debug output shows:
- Domains loaded
- Rules applied
- Decision reasoning

## Complete Example

```
# CARL Manifest
# =============

# Global Settings
DOMAIN_ORDER=GLOBAL,CONTEXT,DEVELOPMENT,PROJECTS,COMMANDS
DEVMODE=false

# Core Domains
GLOBAL_STATE=active
GLOBAL_RECALL=
GLOBAL_EXCLUDE=
GLOBAL_ALWAYS_ON=true

CONTEXT_STATE=active
CONTEXT_RECALL=
CONTEXT_EXCLUDE=
CONTEXT_ALWAYS_ON=true

COMMANDS_STATE=active
COMMANDS_RECALL=
COMMANDS_EXCLUDE=
COMMANDS_ALWAYS_ON=false

# Custom Domains
DEVELOPMENT_STATE=active
DEVELOPMENT_RECALL=*dev, write code, fix bug, implement feature
DEVELOPMENT_EXCLUDE=documentation only
DEVELOPMENT_ALWAYS_ON=false

PROJECTS_STATE=active
PROJECTS_RECALL=project status, ACTIVE.md, deadline, target date
PROJECTS_EXCLUDE=
PROJECTS_ALWAYS_ON=false

TESTING_STATE=active
TESTING_RECALL=test, testing, TDD, unit test
TESTING_EXCLUDE=
TESTING_ALWAYS_ON=false
```

## Validation Checklist

When editing manifest:
- [ ] All keys use `=` delimiter
- [ ] No trailing whitespace
- [ ] STATE values are `active` or `inactive`
- [ ] ALWAYS_ON values are `true` or `false`
- [ ] RECALL keywords are comma-separated
- [ ] Each domain has all four entries
