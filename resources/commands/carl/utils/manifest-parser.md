# Manifest Parser Reference

How to read and write the CARL manifest file.

## File Location
`.carl/manifest` (no extension)

## Format
```
KEY=VALUE
```

- No spaces around `=`
- One entry per line
- Lines starting with `#` are comments
- Empty lines are ignored

## Parsing Rules

### Read Manifest
```python
# Pseudocode
manifest = {}
for line in file.readlines():
    line = line.strip()
    if not line or line.startswith('#'):
        continue
    if '=' in line:
        key, value = line.split('=', 1)
        manifest[key] = value
```

### Get All Domains
```python
# Find all {DOMAIN}_STATE entries
domains = []
for key in manifest:
    if key.endswith('_STATE'):
        domain = key.replace('_STATE', '')
        domains.append(domain)
```

### Get Domain Config
```python
def get_domain_config(domain):
    return {
        'state': manifest.get(f'{domain}_STATE', 'inactive'),
        'recall': manifest.get(f'{domain}_RECALL', '').split(', '),
        'exclude': manifest.get(f'{domain}_EXCLUDE', '').split(', '),
        'always_on': manifest.get(f'{domain}_ALWAYS_ON', 'false') == 'true'
    }
```

## Writing Rules

### Update Single Value
1. Read entire manifest
2. Find line with matching key
3. Replace value (or append if not found)
4. Write entire file back

### Add New Domain
Append four lines:
```
{DOMAIN}_STATE=active
{DOMAIN}_RECALL=keyword1, keyword2
{DOMAIN}_EXCLUDE=
{DOMAIN}_ALWAYS_ON=false
```

### Preserve Comments
When rewriting, keep `#` lines in place.

## Common Operations

### Toggle Domain State
```
Before: DEVELOPMENT_STATE=active
After:  DEVELOPMENT_STATE=inactive
```

### Update Recall Keywords
```
Before: DEVELOPMENT_RECALL=*dev, coding
After:  DEVELOPMENT_RECALL=*dev, coding, programming, fix bug
```

### Set Always-On
```
Before: SECURITY_ALWAYS_ON=false
After:  SECURITY_ALWAYS_ON=true
```

## Domain Order

The `DOMAIN_ORDER` key controls injection sequence:
```
DOMAIN_ORDER=GLOBAL,CONTEXT,DEVELOPMENT,PROJECTS,COMMANDS
```

- Domains are injected in this order
- Domains not in list are injected after listed ones (alphabetically)
- GLOBAL should typically be first
- COMMANDS typically last (user-invoked)

## Validation

When editing manifest, verify:
1. All keys use `=` delimiter
2. No trailing whitespace
3. STATE values are `active` or `inactive`
4. ALWAYS_ON values are `true` or `false`
5. Each domain has all four entries (STATE, RECALL, EXCLUDE, ALWAYS_ON)
