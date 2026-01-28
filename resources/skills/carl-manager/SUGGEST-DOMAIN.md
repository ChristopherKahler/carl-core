# Domain Suggestion Logic

When user says "make this a rule" or asks what domain, use this guide.

## Core Domains (Special Purpose)

| Domain | Use When Rule Is About |
|--------|------------------------|
| GLOBAL | Universal behaviors that ALWAYS apply |
| CONTEXT | Adapting behavior based on context remaining |
| COMMANDS | Creating a star-command (*brief, *deep, etc.) |

## Common Custom Domains

| Domain | Typical Rules | Keywords in Rule Text |
|--------|---------------|----------------------|
| DEVELOPMENT | Coding practices, security, testing | code, function, API, bug, implement, TypeScript |
| PROJECTS | ACTIVE.md workflows, deadlines, status | project, deadline, status, blocked, ACTIVE.md |
| BACKLOG | Future work, idea capture | backlog, idea, future, someday |
| DECISIONS | Decision logging | decision, rationale, chose, decided |
| CLIENTS | Client work, deliverables | client, deliverable, brand, customer |
| CONTENT | Content creation, publishing | content, video, script, post, publish |
| OBSIDIAN | Knowledge graph management | note, link, vault, knowledge |
| TESTING | Test-driven development | test, TDD, coverage, assert |
| SECURITY | Security practices | security, auth, credentials, vulnerability |

## Suggestion Algorithm

### Step 1: Check for Keywords

Scan rule text for domain-specific keywords:

```
Rule: "Always validate user input before processing"
Keywords found: validate, input, processing
Matches: SECURITY (validate, input), DEVELOPMENT (processing)
```

### Step 2: If Multiple Matches

Ask user:
```
This rule could fit in multiple domains:
1. SECURITY - Focus on security validation
2. DEVELOPMENT - General coding practice

Which domain should I add it to?
```

### Step 3: If No Match

Suggest options:
```
This rule doesn't match existing domains:
1. GLOBAL - Apply universally
2. Create new domain - Describe what it's for

Your choice?
```

## Domain Selection Questions

When uncertain, ask:

1. **Scope**: "Should this apply to all projects or just specific ones?"
   - All projects → GLOBAL or DEVELOPMENT
   - Specific → Create project-specific domain

2. **Trigger**: "When should this rule activate?"
   - Always → GLOBAL with ALWAYS_ON=true
   - Specific keywords → Custom domain with RECALL
   - On command → COMMANDS domain

3. **Category**: "Is this about code, workflow, or communication?"
   - Code → DEVELOPMENT
   - Workflow → PROJECTS or BACKLOG
   - Communication → Consider custom domain

## New Domain Checklist

If suggesting a new domain:

1. Propose name (e.g., TESTING, FRONTEND, CLIENTNAME)
2. Suggest recall keywords
3. Estimate if ALWAYS_ON needed
4. Check for overlap with existing domains

## Examples

### "Always use TypeScript strict mode"
- **Keywords**: TypeScript, strict, mode
- **Match**: DEVELOPMENT
- **Suggestion**: Add to DEVELOPMENT domain

### "Update ACTIVE.md after completing tasks"
- **Keywords**: ACTIVE.md, tasks, completing
- **Match**: PROJECTS
- **Suggestion**: Add to PROJECTS domain

### "Never store passwords in plain text"
- **Keywords**: passwords, plain text, store
- **Match**: SECURITY
- **Suggestion**: Add to SECURITY domain (or create if doesn't exist)

### "For Acme Corp, always use their brand colors"
- **Keywords**: Acme Corp, brand colors
- **Match**: None (client-specific)
- **Suggestion**: Create ACMECORP domain or add to CLIENTS

### "Respond briefly when context is low"
- **Keywords**: context, briefly
- **Match**: CONTEXT (bracket system)
- **Suggestion**: Add to DEPLETED bracket in CONTEXT domain
