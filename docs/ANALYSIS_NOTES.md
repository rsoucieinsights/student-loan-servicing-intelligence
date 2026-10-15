# Student-Loan Servicing Intelligence: MVP Findings

Data snapshot: 49,492 CFPB student-loan complaints received from January 1, 2024 through August 25, 2026. Of these, 22,573 include a published consumer narrative.

## Initial signals

1. **MOHELA dominates complaint volume.** It appears in 18,405 complaints, or 37.2% of the snapshot. Nelnet is second with 8,900 complaints (18.0%), followed by Maximus Federal Services with 5,534 (11.2%). These are volumes, not exposure-adjusted complaint rates.

2. **Basic servicing interactions are the central friction point.** The largest issue/sub-issue combination is “Dealing with your lender or servicer” / “Received bad information about your loan,” with 11,105 complaints. “Trouble with how payments are being handled” follows with 9,852.

3. **Payment and billing language is widespread in narratives.** The transparent keyword rule matches 9,393 narratives, or 41.6% of all published narratives. Interest/balance language matches 33.8%; forgiveness/PSLF matches 27.9%; and forbearance/deferment matches 26.0%. Themes overlap.

4. **Complaint volume peaked in March 2025.** That month recorded 3,413 complaints. The latest complete month, July 2026, recorded 1,744—1.8% above June. August 2026 is partial and should not be compared directly with full months.

5. **Narrative availability fell sharply in the newest data.** Overall narrative coverage is 45.6%, but it declines substantially in 2026 and reaches near-zero in the most recent months. Treat narrative-theme trends near the end of the series as publication-coverage effects unless later refreshes restore comparable coverage.

## Recommended MVP story

Frame the project as an early-warning and issue-discovery system rather than a servicer scorecard. Lead with complaint and issue trends, use narrative themes only as coverage-qualified directional context, and clearly distinguish raw complaint volume from exposure-adjusted rates. The next analytical upgrade should be a compatible borrower or serviced-account denominator by servicer and period.

## Guardrails

- CFPB complaints are not a statistical sample of borrower experiences.
- Complaint counts reflect company size, borrower mix, transfers, policy changes, awareness, and willingness to complain.
- Keyword themes are transparent directional signals, not mutually exclusive machine-learning classifications.
- FSA FY2024 Q4 repayment-plan data supplies structural context but does not align with the full complaint period and should not be used directly as a complaint-rate denominator.
