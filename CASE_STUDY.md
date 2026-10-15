# Student-Loan Servicing Intelligence

## Designing a responsible early-warning and issue-discovery system

**Portfolio case study · Data snapshot through August 25, 2026**

*Personal portfolio prototype built from public CFPB and Federal Student Aid data with AI coding assistance under human research direction. No employer, client, or proprietary data was used.*

### The challenge

Student-loan servicing complaints can reveal emerging operational friction, but the obvious dashboard can also mislead. Complaint counts are not performance rates. Recent narratives may be delayed. Company names, portfolios, and issue taxonomies can change. Public complaint data is not a representative sample of all borrowers.

The design challenge was therefore not simply to chart complaint volume. It was to build a repeatable system that helps an executive decide what deserves investigation while making uncertainty and evidence boundaries visible.

### The user

The primary user is a leader in one of four closely related functions:

- Servicing operations
- Customer experience
- Regulatory or reputational risk
- Executive insights and intelligence

This user does not need a public-data league table. They need a reliable monthly answer to three questions:

1. What changed enough to deserve attention now?
2. Which company–issue intersections appear to be driving the movement?
3. Is the signal confirmed, directional, or still an emerging watch?

### The product decision

The product is intentionally framed as an **early-warning and issue-discovery system**, not a servicer scorecard. It supports prioritization and investigation. It does not claim to measure the prevalence of borrower problems or rank servicer performance without compatible exposure data.

### The evidence system

The workflow turns public evidence into an executive product through seven controlled stages:

1. **Public data** — CFPB complaint records plus Federal Student Aid context files
2. **Raw archive** — unchanged source downloads, dated and preserved
3. **Cleaning and validation** — schema inspection, date parsing, product filters, duplicates, missingness, and coverage checks
4. **Trend analysis and decomposition** — complete-period baselines, month-over-month and year-over-year comparisons, mix shifts, concentration, and contribution analysis
5. **Narrative analysis** — transparent, overlapping theme rules applied only when publication coverage is sufficient
6. **Human review** — alternative explanations, denominator checks, evidence labeling, headline calibration, and privacy review
7. **Executive delivery** — monthly monitor, executive readout, and briefing material with limitations attached to the finding

In the working analysis, complaint IDs preserve record-level traceability. This public-review package intentionally excludes complaint-level records, IDs, and narrative excerpts while retaining the aggregate evidence used by the dashboard.

### The analytical turning point

The first headline was technically accurate and strategically weak: July 2026 student-loan complaints increased **1.8%** from June.

Decomposition changed the interpretation:

- MOHELA complaints increased by **87**.
- All other companies combined declined by **56**.
- The market increased by only **31** complaints.
- MOHELA therefore contributed **281%** of the net monthly increase because other segments moved against the headline direction.
- Payment-handling complaints increased **31.1%**, substantially faster than total complaint volume.

The decision-relevant signal was not broad market deterioration. It was a concentrated operational watch involving one company and a specific failure mode.

That is an investigation cue—not proof of the company’s complaint rate, root cause, or relative performance.

### What the FSA data contributes

Federal Student Aid files make the operating context visible. The portfolio summary helps explain federal portfolio scale and repayment status. The FY2024 Q4 servicer-performance extract shows differences in repayment-plan mix across servicers. Together, they help the analyst ask better questions about portfolio composition and plausible alternative explanations.

They are not a valid denominator for this analysis:

- The servicer extract describes FY2024 Q4, while the complaint analysis extends through July 2026.
- The units and eligible populations do not align with monthly CFPB complaint counts.
- Servicing transfers, company naming, product mix, and borrower status would need to be reconciled by period.

Using those files to calculate a 2026 servicer complaint rate would create false precision. In this product, FSA data is labeled **structural context**, not exposure-adjusted performance evidence.

### Governance controls

| Risk | Product control |
|---|---|
| Incomplete month | August 2026 is labeled partial and excluded from complete-month comparisons. |
| Narrative-publication lag | Current theme conclusions are blocked when narrative coverage falls below a usable threshold. |
| Taxonomy or company-name change | Definitions and crosswalks are versioned; changes trigger review before trend publication. |
| Nonrepresentative complaint data | Findings are described as complaint signals, never borrower prevalence. |
| Overlapping narrative themes | Theme shares are not summed and are labeled as transparent directional matches. |
| Unsupported comparison | Company counts are called volume or concentration, never rates without compatible exposure. |
| Weak traceability | Complaint IDs, raw files, manifest checksums, and transformation documentation are retained. |

### What would be automated

- Daily or weekly CFPB refresh and raw-file archiving
- Schema, duplicate, date-coverage, missingness, and publication-lag checks
- Complete-month detection and comparison-window selection
- Monthly KPIs, decomposition, concentration, and candidate theme flags
- Draft dashboard, data-quality exception, and executive-readout production

### What requires human review

- Whether company or taxonomy changes invalidate a trend
- Whether joins and contextual comparisons are conceptually compatible
- Whether a narrative theme represents mechanism, coincidence, or publication noise
- Whether alternative explanations have been tested fairly
- The evidence label, headline, escalation cue, and final executive release

### What would enable fairer servicer comparisons

A defensible rate would require a compatible exposure table with, at minimum:

- Monthly borrowers, accounts, or serviced loans by servicer
- Clear numerator and denominator eligibility rules
- Servicing-transfer and company-name crosswalks
- Comparable product, repayment-status, and plan-composition fields
- Consistent time periods and revision history

With those inputs, the product could progress from concentration monitoring to exposure-adjusted comparison. Until then, the analytical boundary remains explicit.

### Why this is portfolio-worthy

The deliverable demonstrates more than dashboard construction. It shows the design of a governed intelligence product:

- A named user and decision
- A repeatable, documented evidence workflow
- A non-obvious finding created through decomposition
- Visible evidence limits
- Human review at the point where interpretation matters
- An automation roadmap that does not automate away accountability

The result is a system a leader can use to decide what to investigate next—and an analysis another reviewer can challenge, reproduce, and trace.

### Sources

- CFPB Consumer Complaint Database: https://www.consumerfinance.gov/data-research/consumer-complaints/
- FSA Data Center — Federal Student Aid Portfolio: https://studentaid.gov/data-center/student/portfolio
- FSA FY2024 Q4 Loan Servicer Performance: https://studentaid.gov/sites/default/files/loan-servicer-performance-fy2024q4.pdf

