# CLAUDE.md Audit Guide

Help users identify content in their CLAUDE.md that could be migrated to CARL domains for leaner context.

## Purpose

This guide helps Claude audit a user's CLAUDE.md and **suggest** (not automatically change) content that could become CARL domains. The goal is to reduce static context bloat while preserving the user's preferences.

## Audit Process

When a user asks to audit their CLAUDE.md for CARL migration:

### Step 1: Read Their CLAUDE.md

```
Read the user's CLAUDE.md (project or global)
```

### Step 2: Categorize Content

Identify content types:

| Type | Should Stay in CLAUDE.md | Could Become CARL Domain |
|------|--------------------------|--------------------------|
| Project identity | Yes | No |
| Directory structure | Yes | No |
| Team/business context | Yes | No |
| Git conventions | Yes | No |
| **Coding preferences** | Maybe | **Yes** |
| **Response formatting rules** | Maybe | **Yes** |
| **Workflow-specific instructions** | Maybe | **Yes** |
| **Tool usage preferences** | Maybe | **Yes** |
| **Domain-specific rules** (testing, content, etc.) | No | **Yes** |

### Step 3: Identify Candidates

Look for patterns that indicate domain candidates:

**Development preferences:**
```
"Always use TypeScript strict mode"
"Prefer functional components"
"Run tests after changes"
```
→ Suggest: DEVELOPMENT domain

**Content/writing rules:**
```
"Use active voice"
"Keep paragraphs short"
"Include code examples"
```
→ Suggest: CONTENT domain

**Review/quality rules:**
```
"Check for security issues"
"Note performance implications"
"Suggest improvements"
```
→ Suggest: REVIEW domain (or star-command)

**Response format rules:**
```
"Be concise"
"Use bullet points"
"Skip explanations unless asked"
```
→ Suggest: Star-command (*brief, *concise, etc.)

### Step 4: Present Findings

Format your audit report:

```markdown
## CLAUDE.md Audit Report

### Summary
- Total lines: X
- Identity/context content: X lines (keep)
- Migration candidates: X lines

### Keep in CLAUDE.md
These sections provide essential project context:
- [Section name] - [reason]

### Migration Candidates

#### Candidate 1: Development Preferences
**Current location:** Lines X-Y
**Content:**
> [quote the relevant content]

**Suggested domain:** DEVELOPMENT
**Suggested recall keywords:** write code, fix bug, implement
**Why migrate:** These rules only apply when coding, not for all interactions.

#### Candidate 2: ...

### Recommended Actions
1. [First recommended action]
2. [Second recommended action]

### Questions for User
- [Any clarifications needed]
```

### Step 5: Wait for Approval

**CRITICAL:** Do NOT modify the user's CLAUDE.md without explicit approval.

After presenting the audit:
1. Ask which candidates they want to migrate
2. Confirm the domain names and recall keywords
3. Only then create the domains (using /carl:manager or manually)
4. Only then remove content from CLAUDE.md (with user approval)

## Example Audit Conversation

**User:** Can you audit my CLAUDE.md for CARL migration?

**Claude:** I'll read your CLAUDE.md and identify content that could become CARL domains.

[Reads file, analyzes content]

**Claude:** Here's my audit:

### Migration Candidates

**1. Coding Preferences (Lines 45-52)**
> "Always use TypeScript strict mode. Prefer editing existing files. Run tests after changes. Keep changes minimal."

This could become a DEVELOPMENT domain with recall keywords: "write code, fix bug, implement"

**2. Response Formatting (Lines 60-63)**
> "Be concise. Use bullet points. Skip explanations unless asked."

This could become a `*brief` star-command.

**Questions:**
- Should I create these domains?
- Any adjustments to the recall keywords?

**User:** Yes, create the DEVELOPMENT domain but I want *concise instead of *brief.

**Claude:** [Creates DEVELOPMENT domain and *concise command, then asks permission to remove the migrated lines from CLAUDE.md]

## Key Principles

1. **Diagnostic first** — Analyze and report before suggesting changes
2. **User approval required** — Never modify CLAUDE.md without explicit consent
3. **Preserve identity content** — Project context stays in CLAUDE.md
4. **Migrate behavioral content** — Rules and preferences can become domains
5. **Explain the benefit** — Show how migration reduces context usage
