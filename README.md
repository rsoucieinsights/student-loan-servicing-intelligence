# Student-Loan Servicing Intelligence

An AI-assisted public-data prototype for turning student-loan complaint records into a governed early-warning product.

This project is designed for an operations, customer-experience, risk, or executive-insights leader who needs to answer three questions each month:

1. What changed enough to deserve attention?
2. Which company–issue intersections appear to be driving the movement?
3. Is the evidence confirmed, directional, or still an emerging watch?

The product is deliberately **not** a servicer scorecard. Complaint volume is not a complaint rate, and the public data does not support claims about borrower prevalence, causation, or comparative servicer performance without compatible exposure data.

## What to review

- [Live interactive dashboard](https://rsoucieinsights.github.io/student-loan-servicing-intelligence/dashboard/) — explore the hosted portfolio prototype in your browser. You can also run it locally using the instructions below.
- [Case study](CASE_STUDY.md) — the product question, evidence system, analytical turning point, governance, and automation boundary.
- [Analysis notes](docs/ANALYSIS_NOTES.md) — the initial aggregate findings and interpretation guardrails.
- [Build and handoff notes](docs/BUILD_NOTES.md) — what was directed by the human analyst, where AI assisted, and how the product could be maintained.

## What I built

I defined the user, decision, analytical framework, product requirements, evidence hierarchy, exception rules, and executive story. I used AI coding assistance to accelerate data handling, analysis, interface implementation, documentation, and iteration. I then reviewed the logic, challenged unsupported comparisons, refined the claims, and decided what could be automated versus what still required expert judgment.

That distinction is central to the project: AI helped build the system, but it did not own the research question, the analytical boundaries, or the final interpretation.

## Representative finding

The first headline—July 2026 complaint volume increased 1.8% from June—was accurate but not especially useful. Decomposition showed that one company added 87 complaints while all other companies combined declined by 56. Payment-handling complaints rose 31.1%, much faster than total volume.

That turns a broad market headline into a focused investigation cue. It does not establish a complaint rate, root cause, or relative company performance.

## Public-review data policy

This review package contains only aggregate dashboard data. Complaint-level records, IDs, and narrative excerpts are intentionally excluded, even though the underlying records are public. No employer, client, or proprietary data was used.

The source snapshot covered CFPB student-loan complaints received from January 1, 2024 through August 25, 2026, with Federal Student Aid files used only as structural context. Source links and methodological limits are documented in the case study.

## Run locally

Open `dashboard/index.html` directly in a browser. The dashboard is a lightweight static product with no package installation, account, API key, analytics, or network request.

## Status

This is a portfolio prototype, not a production monitoring service. The public-review package demonstrates the product logic and interface; scheduled source retrieval, transformation code, monitoring, and release approval would be implemented as the next operational layer.
