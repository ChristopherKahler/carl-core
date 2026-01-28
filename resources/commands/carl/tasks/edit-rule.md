# Edit Rule Task

## Input
- Domain name
- Rule index (the N in RULE_N)
- New text (or "delete" to remove)

## Workflow

1. **Read domain file** at `.carl/{domain}`
2. **Find rule** at specified index
3. **Replace rule text** (or remove line if deleting)
4. **Write updated file**
5. **Report success** with before/after

## Output Format

### Edit
```
Editing DEVELOPMENT_RULE_3:

.carl/development:
- DEVELOPMENT_RULE_3=Old rule text
+ DEVELOPMENT_RULE_3=New rule text

Done. Rule updated.
```

### Delete
```
Deleting DEVELOPMENT_RULE_3:

.carl/development:
- DEVELOPMENT_RULE_3=Old rule text

Done. Rule removed. Remaining rules unchanged (index gap allowed).
```

## Error Cases

**Rule not found:**
```
Error: DEVELOPMENT_RULE_7 not found in .carl/development
Existing rules: RULE_0, RULE_1, RULE_2

Use *view DEVELOPMENT to see all rules.
```

**Domain doesn't exist:**
```
Error: Domain MYDOMAIN not found at .carl/mydomain
```

## Notes

- Deleting a rule leaves a gap in indices (RULE_2 deleted, RULE_3 remains RULE_3)
- This is intentional - renumbering could break references
- To renumber, manually edit the file or use *view then recreate
