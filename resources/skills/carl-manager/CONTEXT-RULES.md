# CONTEXT Domain (Bracket System)

## Overview

The CONTEXT domain provides rules that adapt based on how much conversation context remains. This helps Claude adjust behavior as context depletes.

## Brackets

| Bracket | Threshold | Purpose |
|---------|-----------|---------|
| FRESH | >75% remaining | Full detail, thorough explanations |
| MODERATE | 40-75% remaining | Balanced approach |
| DEPLETED | <40% remaining | Maximum efficiency, prepare handoff |

## File Format

`.carl/context`:

```
# CONTEXT Bracket Rules
# =====================

# Fresh context (>75% remaining)
FRESH_ENABLED=true
FRESH_RULE_0=Context is fresh, be thorough with explanations
FRESH_RULE_1=Include full code examples and reasoning
FRESH_RULE_2=Explore edge cases proactively

# Moderate context (40-75% remaining)
MODERATE_ENABLED=true
MODERATE_RULE_0=Balance thoroughness with brevity
MODERATE_RULE_1=Summarize where possible, detail on request

# Depleted context (<40% remaining)
DEPLETED_ENABLED=true
DEPLETED_RULE_0=Context is low, maximize efficiency
DEPLETED_RULE_1=Prepare handoff summary if task incomplete
DEPLETED_RULE_2=Prioritize completing current task
DEPLETED_RULE_3=Use bullet points, avoid lengthy explanations
```

## Bracket Fields

### {BRACKET}_ENABLED
- `true` - Rules for this bracket are active
- `false` - Skip this bracket's rules

### {BRACKET}_RULE_N
Sequential rules for the bracket, starting at 0.

## How Injection Works

1. Hook calculates context % remaining
2. Determines which bracket applies
3. Checks if bracket is enabled
4. Injects all `{BRACKET}_RULE_N` entries for that bracket

Only ONE bracket's rules are injected per prompt (based on current context %).

## Example Rules by Bracket

### FRESH (>75%)
```
FRESH_RULE_0=Context is fresh, be thorough
FRESH_RULE_1=Include full explanations with examples
FRESH_RULE_2=Proactively consider edge cases
FRESH_RULE_3=Don't hesitate to explore related topics
```

### MODERATE (40-75%)
```
MODERATE_RULE_0=Balance detail with efficiency
MODERATE_RULE_1=Summarize context when helpful
MODERATE_RULE_2=Focus on user's explicit request
```

### DEPLETED (<40%)
```
DEPLETED_RULE_0=Context is limited, be concise
DEPLETED_RULE_1=Use bullet points over paragraphs
DEPLETED_RULE_2=If task may not complete, prepare handoff notes
DEPLETED_RULE_3=Avoid introducing new complex topics
DEPLETED_RULE_4=Prioritize actionable outputs
```

## Manifest Entry

CONTEXT domain in manifest:
```
CONTEXT_STATE=active
CONTEXT_RECALL=
CONTEXT_EXCLUDE=
CONTEXT_ALWAYS_ON=true
```

- No recall keywords needed (always injected)
- `ALWAYS_ON=true` ensures injection regardless of prompt content
- STATE can be set to `inactive` to disable entirely

## Best Practices

1. **FRESH rules** - Enable thorough exploration
2. **MODERATE rules** - Maintain quality while conserving
3. **DEPLETED rules** - Focus on completion and handoff
4. **Test thresholds** - Verify bracket transitions work
5. **Don't overload** - Keep rules actionable and specific
