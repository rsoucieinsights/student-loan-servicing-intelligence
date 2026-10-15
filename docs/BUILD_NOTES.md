# Build and handoff notes

## Human direction

The human analytical work in this prototype included:

- Defining the executive user, decision, and monthly operating questions
- Framing the product as early warning and issue discovery rather than a scorecard
- Choosing trend, decomposition, concentration, and company–issue views
- Distinguishing contextual data from valid exposure denominators
- Setting evidence labels, incomplete-period rules, and narrative-coverage guardrails
- Challenging the first headline and finding the more decision-relevant movement beneath it
- Deciding what could be repeated automatically and what required expert release review
- Translating the analysis into an executive product and handoff structure

## AI assistance

AI coding assistance accelerated:

- Structuring and validating public source data
- Producing repeatable aggregate calculations and candidate issue views
- Implementing and refining the static dashboard
- Drafting documentation and testable analytical checks
- Iterating on product language, layout, and review cues from human feedback

AI assistance did not replace source evaluation, denominator judgment, claim calibration, privacy decisions, or final interpretation.

## Intended operating model

### Automate

- Scheduled public-source retrieval and immutable archiving
- Schema, duplicate, missingness, date-coverage, and publication-lag checks
- Complete-period detection and comparison-window selection
- Aggregate KPI, contribution, concentration, and candidate-theme production
- Draft dashboard and executive-readout refreshes

### Keep under human review

- Company-name, portfolio, or taxonomy changes that could break comparability
- Whether contextual sources are conceptually compatible with the complaint data
- Whether a theme reflects mechanism, coincidence, or publication noise
- Alternative explanations for a change
- Evidence labeling, escalation language, and final release

## Handoff requirements

A production owner would need documented source versions, transformation tests, exception alerts, review sign-offs, and a release log. The refresh should fail visibly when a schema changes, a period is incomplete, or narrative coverage falls below the agreed threshold.

The public-review package is intentionally smaller. It contains the working static product and aggregate evidence, but excludes complaint-level records and source archives.
