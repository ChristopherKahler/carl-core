# Create Domain Task

## Input
- Domain name (will be uppercased for rules, lowercased for filename)
- Recall keywords (optional)
- Initial rules (optional)

## Workflow

1. **Validate domain name** - Alphanumeric only, no spaces
2. **Check if domain exists** - Error if `.carl/{domain}` already exists
3. **Create domain file** at `.carl/{domain}` (lowercase filename)
4. **Add initial rules** if provided, numbered starting at RULE_0
5. **Add manifest entries:**
   ```
   {DOMAIN}_STATE=active
   {DOMAIN}_RECALL={keywords}
   {DOMAIN}_EXCLUDE=
   {DOMAIN}_ALWAYS_ON=false
   ```
6. **Report success** with exact file paths and content

## Validation Rules
- Domain name must be alphanumeric (underscores allowed)
- Cannot create reserved domains: GLOBAL, CONTEXT, COMMANDS (use edit instead)
- Filename is lowercase, rule prefix is UPPERCASE

## Output Format

```
Created domain: MYDOMAIN

.carl/mydomain:
+ # MYDOMAIN Domain Rules
+ MYDOMAIN_RULE_0=First rule here

.carl/manifest:
+ MYDOMAIN_STATE=active
+ MYDOMAIN_RECALL=keyword1, keyword2
+ MYDOMAIN_EXCLUDE=
+ MYDOMAIN_ALWAYS_ON=false

Done. Domain ready for use. Inject via recall keywords: keyword1, keyword2
```

## Error Cases

**Domain exists:**
```
Error: Domain MYDOMAIN already exists at .carl/mydomain
Use *edit or *add to modify existing domain.
```

**Invalid name:**
```
Error: Domain name must be alphanumeric. Got: my-domain
Suggestion: Use MYDOMAIN instead.
```
