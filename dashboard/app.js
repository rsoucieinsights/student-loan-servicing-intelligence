const fmt = new Intl.NumberFormat("en-US");
const pct = v => `${(v * 100).toFixed(1)}%`;
const signedNumber = v => `${v > 0 ? "+" : v < 0 ? "−" : ""}${fmt.format(Math.abs(v))}`;
const signedPct = v => `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v * 100).toFixed(1)}%`;
let dashboardData;

async function init() {
  dashboardData = window.DASHBOARD_DATA;
  const select = document.querySelector("#monthSelect");
  const complete = dashboardData.monthly.filter(d => d.month <= dashboardData.summary.latest_complete_month);
  complete.slice().reverse().forEach(d => select.add(new Option(monthLabel(d.month), d.month)));
  select.value = dashboardData.monthly_exec.report_month;
  select.addEventListener("change", () => render(select.value));
  window.addEventListener("resize", () => drawTrend(select.value));
  render(select.value);
}

function monthLabel(month) {
  return new Date(`${month}-01T00:00:00`).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function getMonth(month) { return dashboardData.monthly.find(d => d.month === month); }

function render(month) {
  const current = getMonth(month);
  const idx = dashboardData.monthly.findIndex(d => d.month === month);
  const prior = dashboardData.monthly[idx - 1];
  const priorYear = getMonth(`${Number(month.slice(0,4)) - 1}-${month.slice(5)}`);
  const year = month.slice(0,4);
  const ytd = dashboardData.monthly.filter(d => d.month >= `${year}-01` && d.month <= month).reduce((s,d) => s + d.complaints, 0);
  const priorYtd = dashboardData.monthly.filter(d => d.month >= `${Number(year)-1}-01` && d.month <= `${Number(year)-1}-${month.slice(5)}`).reduce((s,d) => s + d.complaints, 0);
  const mom = prior ? current.complaints / prior.complaints - 1 : null;
  const yoy = priorYear ? current.complaints / priorYear.complaints - 1 : null;
  const ytdChange = priorYtd ? ytd / priorYtd - 1 : null;
  const latest = month === dashboardData.monthly_exec.report_month;
  document.querySelector("#periodNote").textContent = latest ? "Latest complete month" : "Historical month";
  document.querySelector("#kpiGrid").innerHTML = [
    kpi("Monthly complaints", fmt.format(current.complaints), `${mom === null ? "—" : pct(mom)} month over month`, mom === null ? "" : mom > 0 ? "warn" : "cool"),
    kpi("Year over year", yoy === null ? "—" : pct(yoy), priorYear ? `vs ${monthLabel(priorYear.month)}` : "Comparison unavailable", yoy === null ? "" : yoy > 0 ? "warn" : "cool"),
    kpi("YTD complaints", fmt.format(ytd), priorYtd ? `${pct(ytdChange)} vs prior-year YTD` : "Comparison unavailable", ytdChange === null ? "" : ytdChange > 0 ? "warn" : "cool"),
    kpi("Timely response", pct(current.timely_response_share), `${fmt.format(current.companies)} companies represented`, "good"),
    kpi("Narrative coverage", pct(current.narrative_share), `${fmt.format(current.narratives)} narratives published`, current.narrative_share < .25 ? "warn" : "")
  ].join("");
  renderReadout(month, current, mom, yoy, ytdChange, latest);
  renderDetails(month);
  renderHeroPreview(month);
  drawTrend(month);
  const alert = document.querySelector("#alertStrip");
  if (current.narrative_share < .25) {
    alert.hidden = false;
    alert.innerHTML = `<strong>Data-quality exception:</strong> Only ${pct(current.narrative_share)} of complaints have published narratives for ${monthLabel(month)}. Use structured issue fields for current-month decisions and defer narrative-theme conclusions.`;
  } else alert.hidden = true;
  document.querySelector("#coverageFooter").textContent = `Narrative coverage for ${monthLabel(month)}: ${pct(current.narrative_share)}.`;
}

function kpi(label, value, context, state="") {
  return `<article class="kpi ${state}"><span class="label">${label}</span><span class="value">${value}</span><span class="context">${context}</span></article>`;
}

function renderReadout(month, current, mom, yoy, ytdChange, latest) {
  const details = latest ? dashboardData.monthly_exec : null;
  document.querySelector("#readoutTitle").textContent = monthLabel(month);
  const items = [
    ["Volume", `${fmt.format(current.complaints)} complaints${mom === null ? "" : `, ${pct(mom)} MoM`}${yoy === null ? "" : ` and ${pct(yoy)} YoY`}.`],
    ["Annual context", ytdChange === null ? "Prior-year YTD comparison is unavailable." : `Year-to-date volume is ${pct(Math.abs(ytdChange))} ${ytdChange < 0 ? "below" : "above"} the prior-year period.`],
    ["Data quality", `${fmt.format(current.narratives)} narratives were published (${pct(current.narrative_share)} coverage).`],
    ["Decision cue", details ? `Investigate inaccurate loan information and payment handling; ${details.companies[0].company} represents ${pct(details.companies[0].share)} of monthly complaint volume. This is concentration—not a performance rate.` : "Company and issue drilldowns are prepared for the latest complete month." ]
  ];
  document.querySelector("#readout").innerHTML = items.map(([title,text]) => `<div class="readout-item"><strong>${title}</strong><p>${text}</p></div>`).join("");
}

function renderDetails(month) {
  const details = dashboardData.monthly_details[month];
  const companies = details.companies.slice(0,5);
  document.querySelector("#companyTitle").textContent = "Top companies";
  document.querySelector("#companyScope").textContent = `${monthLabel(month)} complaint volume · counts, not rates`;
  const max = Math.max(...companies.map(d => d.complaints));
  document.querySelector("#companyBars").innerHTML = companies.map(d => `<div class="bar-row"><span>${d.company}</span><span class="track"><span class="fill" style="display:block;width:${d.complaints/max*100}%"></span></span><span class="bar-value">${fmt.format(d.complaints)}</span></div>`).join("");
  const issues = details.issues.slice(0,5);
  document.querySelector("#issueTitle").textContent = "Leading issue drivers";
  document.querySelector("#issueScope").textContent = `${monthLabel(month)} issue mix`;
  document.querySelector("#issueList").innerHTML = issues.map((d,i) => `<div class="issue"><span class="rank">0${i+1}</span><span class="issue-name">${d.sub_issue || d.issue}</span><span class="issue-meta">${fmt.format(d.complaints)}<br>${pct(d.share ?? d.complaint_share)}</span></div>`).join("");
}

function renderHeroPreview(month) {
  const details = dashboardData.monthly_details[month];
  const preview = details.preview;
  const label = monthLabel(month);
  document.querySelector("#previewKicker").textContent = `MONTHLY SIGNAL · ${label.toUpperCase()}`;
  document.querySelector("#previewMetricValue").textContent = fmt.format(details.complaints);
  const hero = document.querySelector("#heroPreview");
  hero.setAttribute("aria-label", `Jump to the ${label} interactive monthly executive monitor`);

  if (preview.comparison_available) {
    document.querySelector("#previewDriver").textContent = signedNumber(preview.driver_company_change);
    document.querySelector("#previewDriverLabel").textContent = preview.driver_company;
    document.querySelector("#previewOthers").textContent = `${signedNumber(preview.other_companies_change)} all others`;
    document.querySelector("#previewNet").textContent = `= ${signedNumber(preview.net_change)} net`;
    document.querySelector("#previewAlertValue").textContent = preview.driver_issue_pct_change === null
      ? signedNumber(preview.driver_issue_change)
      : signedPct(preview.driver_issue_pct_change);
    document.querySelector("#previewAlertLabel").textContent = preview.driver_issue;
  } else {
    document.querySelector("#previewDriver").textContent = pct(preview.top_company_share);
    document.querySelector("#previewDriverLabel").textContent = `${preview.top_company} share`;
    document.querySelector("#previewOthers").textContent = `${fmt.format(preview.top_company_complaints)} complaints`;
    document.querySelector("#previewNet").textContent = "baseline month";
    document.querySelector("#previewAlertValue").textContent = pct(preview.top_issue_share);
    document.querySelector("#previewAlertLabel").textContent = preview.top_issue;
  }
}

function drawTrend(selectedMonth) {
  const canvas = document.querySelector("#trendChart");
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
  const ctx = canvas.getContext("2d"); ctx.scale(dpr,dpr);
  const end = dashboardData.monthly.findIndex(d => d.month === selectedMonth);
  const series = dashboardData.monthly.slice(Math.max(0,end-12),end+1);
  const prior = series.map(d => getMonth(`${Number(d.month.slice(0,4))-1}-${d.month.slice(5)}`)?.complaints ?? null);
  const all = [...series.map(d=>d.complaints),...prior.filter(v=>v!==null)];
  const max = Math.ceil(Math.max(...all)/500)*500;
  const pad = {l:52,r:18,t:18,b:45}, w=rect.width-pad.l-pad.r, h=rect.height-pad.t-pad.b;
  ctx.font="11px system-ui"; ctx.fillStyle="#6b7c87"; ctx.strokeStyle="#d9ddd8"; ctx.lineWidth=1;
  for(let i=0;i<=4;i++){ const y=pad.t+h*i/4; ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(rect.width-pad.r,y);ctx.stroke();ctx.fillText(fmt.format(max*(1-i/4)),4,y+4); }
  const x = i => pad.l + (series.length===1?0:w*i/(series.length-1)); const y = v => pad.t+h-(v/max*h);
  plot(prior,"#e6b84b"); plot(series.map(d=>d.complaints),"#2374a6");
  series.forEach((d,i)=>{ctx.save();ctx.translate(x(i),rect.height-9);ctx.rotate(-Math.PI/4);ctx.fillStyle="#6b7c87";ctx.fillText(d.month,0,0);ctx.restore();});
  function plot(values,color){ctx.beginPath();values.forEach((v,i)=>{if(v===null)return;const px=x(i),py=y(v);i===0||values[i-1]===null?ctx.moveTo(px,py):ctx.lineTo(px,py)});ctx.strokeStyle=color;ctx.lineWidth=2.5;ctx.stroke();}
}

init();
