# Add Rule Task

## Input
- Domain name
- Rule text

## Workflow

1. **Read domain file** at `.carl/{domain}`
2. **Parse existing rules** to find highest RULE_N index
3. **Create new rule** at index max_index + 1
4. **Write updated file**
5. **Report success** with exact change

## Finding Max Index

Parse lines matching pattern: `{DOMAIN}_RULE_N=...`
Extract N from each, find max, add 1.

If no rules exist yet, start at RULE_0.

## Output Format

```
Adding to DEVELOPMENT domain:

.carl/development:
+ DEVELOPMENT_RULE_5=New rule text here

Done. Rule added at index 5.
```

## Error Cases

**Domain doesn't exist:**
```
Error: Domain MYDOMAIN not found at .carl/mydomain
Use *create MYDOMAIN to create it first.
```

**Empty rule text:**
```
Error: Rule text cannot be empty.
Usage: *add rule DOMAIN 'rule text here'
```

## Notes

- Rules are always appended (never inserted)
- To change rule order, use *edit to modify individual rules
- Rule text should be a complete instruction (no need for quotes in final output)
