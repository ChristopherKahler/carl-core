# Domain File Template

Use this template when creating a new domain file.

## Standard Domain

```
# {DOMAIN} Domain Rules
# =====================
# Description: What this domain is for
# Recall: keyword1, keyword2, keyword3
# Created: {DATE}

{DOMAIN}_RULE_0=First rule - clear instruction
{DOMAIN}_RULE_1=Second rule - another instruction
{DOMAIN}_RULE_2=Third rule - additional guideline
```

## Example: TESTING Domain

```
# TESTING Domain Rules
# ====================
# Description: Rules for test-driven development
# Recall: test, testing, TDD, unit test, integration test
# Created: 2026-01-27

TESTING_RULE_0=Write tests before implementation when feasible
TESTING_RULE_1=Each test should test one specific behavior
TESTING_RULE_2=Use descriptive test names that explain the scenario
TESTING_RULE_3=Mock external dependencies in unit tests
TESTING_RULE_4=Run existing tests before committing changes
```

## Example: CLIENT-SPECIFIC Domain

```
# ACMECORP Domain Rules
# =====================
# Description: Client-specific rules for Acme Corp project
# Recall: acme, acmecorp, client acme
# Created: 2026-01-27

ACMECORP_RULE_0=All deliverables go to clients/acmecorp/ folder
ACMECORP_RULE_1=Use client's brand colors: #FF5733, #333333
ACMECORP_RULE_2=Client prefers bullet points over paragraphs
ACMECORP_RULE_3=Include ROI metrics in all proposals
```

## Naming Conventions

| Element | Format | Example |
|---------|--------|---------|
| Filename | lowercase, no extension | `.carl/testing` |
| Rule prefix | UPPERCASE | `TESTING_RULE_0` |
| Index | Sequential from 0 | `_RULE_0`, `_RULE_1`, `_RULE_2` |

## Best Practices

1. **Be specific** - Rules should be actionable, not vague
2. **Keep it short** - One clear instruction per rule
3. **Use active voice** - "Do X" not "X should be done"
4. **Number meaningfully** - Group related rules by index ranges
5. **Add comments** - Use `#` lines for context (not injected)
