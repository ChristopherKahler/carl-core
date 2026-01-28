# Toggle Domain Task

## Input
- Domain name
- Target state: `active` or `inactive`

## Workflow

1. **Read manifest** at `.carl/manifest`
2. **Find {DOMAIN}_STATE entry**
3. **Update to new state**
4. **Write manifest**
5. **Report success**

## Output Format

### Disable
```
Toggling DEVELOPMENT domain:

.carl/manifest:
- DEVELOPMENT_STATE=active
+ DEVELOPMENT_STATE=inactive

Done. Domain disabled. Rules will not be injected.
```

### Enable
```
Toggling DEVELOPMENT domain:

.carl/manifest:
- DEVELOPMENT_STATE=inactive
+ DEVELOPMENT_STATE=active

Done. Domain enabled. Rules inject when recall keywords match.
```

## Error Cases

**Domain not in manifest:**
```
Error: MYDOMAIN not found in manifest.
Domain file exists at .carl/mydomain but has no manifest entries.

Add manifest entries? (y/n)
```

**Already in target state:**
```
DEVELOPMENT is already active.
No changes made.
```

## Notes

- Toggling only affects {DOMAIN}_STATE
- ALWAYS_ON domains still respect STATE (inactive = disabled regardless of ALWAYS_ON)
- Use CARL Control Panel for visual toggle management
