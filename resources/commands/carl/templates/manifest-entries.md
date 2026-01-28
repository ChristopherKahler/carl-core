# Manifest Entry Template

Use this template when adding a domain to the manifest.

## Standard Entry

```
# {DOMAIN} Domain
{DOMAIN}_STATE=active
{DOMAIN}_RECALL=keyword1, keyword2, keyword3
{DOMAIN}_EXCLUDE=
{DOMAIN}_ALWAYS_ON=false
```

## Field Descriptions

| Field | Values | Purpose |
|-------|--------|---------|
| `{DOMAIN}_STATE` | `active` / `inactive` | Enable/disable the domain entirely |
| `{DOMAIN}_RECALL` | comma-separated | Keywords that trigger domain injection |
| `{DOMAIN}_EXCLUDE` | comma-separated | Keywords that prevent injection (overrides recall) |
| `{DOMAIN}_ALWAYS_ON` | `true` / `false` | Inject regardless of recall keyword matches |

## Examples

### Development Domain
```
DEVELOPMENT_STATE=active
DEVELOPMENT_RECALL=*dev, write code, fix bug, implement, programming, coding
DEVELOPMENT_EXCLUDE=documentation only, no code
DEVELOPMENT_ALWAYS_ON=false
```

### Always-On Domain (like GLOBAL)
```
SECURITY_STATE=active
SECURITY_RECALL=
SECURITY_EXCLUDE=
SECURITY_ALWAYS_ON=true
```

### Project-Specific Domain
```
MYPROJECT_STATE=active
MYPROJECT_RECALL=myproject, project x, the app
MYPROJECT_EXCLUDE=
MYPROJECT_ALWAYS_ON=false
```

## Global Settings

These go at the top of the manifest:

```
# Global Settings
DOMAIN_ORDER=GLOBAL,CONTEXT,DEVELOPMENT,COMMANDS
DEVMODE=false
```

| Setting | Purpose |
|---------|---------|
| `DOMAIN_ORDER` | Controls injection sequence (comma-separated domain names) |
| `DEVMODE` | When true, shows debug output with loaded domains/rules |

## Complete Manifest Example

```
# CARL Manifest
# =============

# Global Settings
DOMAIN_ORDER=GLOBAL,CONTEXT,DEVELOPMENT,PROJECTS,COMMANDS
DEVMODE=false

# Core Domains
GLOBAL_STATE=active
GLOBAL_ALWAYS_ON=true

CONTEXT_STATE=active
CONTEXT_ALWAYS_ON=true

COMMANDS_STATE=active
COMMANDS_ALWAYS_ON=false

# Custom Domains
DEVELOPMENT_STATE=active
DEVELOPMENT_RECALL=*dev, write code, fix bug, implement feature
DEVELOPMENT_EXCLUDE=
DEVELOPMENT_ALWAYS_ON=false

PROJECTS_STATE=active
PROJECTS_RECALL=project status, ACTIVE.md, deadline, target date
PROJECTS_EXCLUDE=
PROJECTS_ALWAYS_ON=false
```
