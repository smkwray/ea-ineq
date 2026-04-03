import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

function isDark() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

function themeColors() {
  const dark = isDark();
  return {
    text: dark ? "#e6edf3" : "#2C2C2C",
    textSecondary: dark ? "#8b949e" : "#6B6B6B",
    grid: dark ? "#30363d" : "#E0DDD8",
    transfer_composite: dark ? "#3DBFBF" : "#2B8C8C",
    ui_benefits: dark ? "#6A9FE8" : "#4472C4",
    household_networth: dark ? "#D4A843" : "#B8922E",
    social_security: dark ? "#C89FD4" : "#8B5E9B",
    snap_persons: dark ? "#8FA8B5" : "#6A7F8A",
    fed_funds: dark ? "#E07070" : "#C44E52",
    pass: dark ? "#7AB87A" : "#5B8C5A",
    fail: dark ? "#E07070" : "#C44E52",
    neutral: dark ? "#8b949e" : "#8A8175",
    bar: dark ? "#5588BB" : "#7BA7C9",
  };
}

function treatmentColor(treatment) {
  const colors = themeColors();
  return colors[treatment] || colors.bar;
}

function fmtQ(value) {
  if (value == null) return "N/A";
  if (value < 0.0001) return value.toExponential(1);
  return value.toFixed(4);
}

function fmtP(value) {
  if (value == null) return "N/A";
  if (value < 0.0001) return value.toExponential(1);
  if (value < 0.01) return value.toFixed(4);
  return value.toFixed(3);
}

function fmtEstimate(value) {
  if (value == null) return "N/A";
  const abs = Math.abs(value);
  if ((abs > 0 && abs < 0.001) || abs >= 1000) return value.toExponential(2);
  return value.toFixed(3);
}

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
}

function mount(id, builder) {
  const node = document.getElementById(id);
  if (!node) return;
  node.innerHTML = "";
  try {
    const out = builder();
    if (out instanceof Node) {
      node.appendChild(out);
    }
  } catch (err) {
    console.error(id, err);
    node.textContent = `Render error: ${err.message}`;
  }
}

const W = 960;

function renderOverview() {
  document.getElementById("subtitle").textContent = `${DATA.meta.subtitle} | archive date ${DATA.meta.archive_date}`;
  document.getElementById("headline-stat").textContent = DATA.overview.headline_stat;
  document.getElementById("headline-label").textContent = DATA.overview.headline_label;
  document.getElementById("overview-takeaway").textContent = DATA.overview.takeaway;
}

function renderQuestions() {
  const grid = document.getElementById("questions-grid");
  if (!grid) return;
  grid.innerHTML = "";
  for (const q of DATA.questions) {
    const card = el("div", "q-card");
    const tag = el("div", "q-tag", q.tag);
    card.appendChild(tag);
    const title = el("strong");
    title.innerHTML = `<span class="tier tier-${q.tier}">${q.tier}</span>${q.title}`;
    card.appendChild(title);
    card.appendChild(el("p", "", q.description));
    grid.appendChild(card);
  }
}

function renderEvidenceSummary(containerId, items) {
  const node = document.getElementById(containerId);
  if (!node) return;
  node.innerHTML = "";
  for (const item of items) {
    const box = el("div", "ev-item");
    box.innerHTML = item;
    node.appendChild(box);
  }
}

function renderHeadlineSummary() {
  const counts = DATA.story_counts;
  renderEvidenceSummary("headline-summary", [
    `<span class="ev-num">${counts.headline_robust_rows}</span> robust full-run rows`,
    `<span class="ev-num">${counts.transfer_headline_rows}</span> transfer-composite rows`,
    `<span class="ev-num">${counts.headline_outcomes_covered}</span> distinct outcome families`,
    `<span class="ev-num">${counts.confirmatory_ready_rows}</span> ready-confirmatory row`,
  ]);
}

function renderConsumptionSummary() {
  const counts = DATA.story_counts;
  renderEvidenceSummary("consumption-summary", [
    `<span class="ev-num">${counts.consumption_robust_rows}</span> robust consumption rows`,
    `strongest support in <code>ui_benefits</code>`,
    `canon <code>v2</code> basket imported from the ea-gender logic`,
  ]);
}

function renderConfirmatorySummary() {
  const conf = DATA.confirmatory;
  renderEvidenceSummary("confirmatory-summary", [
    `<span class="ev-num">${conf.iv_candidates}</span> IV candidates`,
    `<span class="ev-num">${conf.nc_candidates}</span> negative-control candidates`,
    `<span class="ev-num">${conf.manifest_ready}</span> ready contracts`,
    `<span class="ev-num">${conf.ready_confirmatory.length}</span> ready-confirmatory row`,
  ]);
}

function renderHeadlineForest() {
  const colors = themeColors();
  const rows = [...DATA.headline_findings].sort((a, b) => a.q_value - b.q_value);
  const labels = rows.map((row) => row.row_label);
  const maxX = Math.max(...rows.map((row) => row.ci_high ?? row.beta ?? 0), 0);
  return Plot.plot({
    width: W,
    height: Math.max(320, rows.length * 34 + 70),
    marginLeft: 290,
    marginRight: 100,
    x: { label: "DFLMX LP estimate with 95% CI", grid: true },
    y: { label: null, domain: labels, padding: 0.25 },
    style: { background: "transparent", color: colors.text, fontSize: "13px" },
    marks: [
      Plot.ruleX([0], { stroke: colors.textSecondary, strokeDasharray: "4,3" }),
      Plot.ruleY(rows, {
        y: "row_label",
        x1: "ci_low",
        x2: "ci_high",
        stroke: (row) => treatmentColor(row.treatment),
        strokeWidth: isDark() ? 2.5 : 1.8,
      }),
      Plot.dot(rows, {
        y: "row_label",
        x: "beta",
        r: 5,
        fill: (row) => treatmentColor(row.treatment),
        tip: true,
        title: (row) =>
          `${row.row_label}\nEstimate: ${fmtEstimate(row.beta)}\nCI: [${fmtEstimate(row.ci_low)}, ${fmtEstimate(row.ci_high)}]\nq = ${fmtQ(row.q_value)}`,
      }),
      Plot.text(rows, {
        y: "row_label",
        x: () => maxX * 1.03,
        text: (row) => `q=${fmtQ(row.q_value)}`,
        dx: 6,
        fill: colors.textSecondary,
        fontSize: 11,
        fontFamily: "JetBrains Mono, monospace",
        textAnchor: "start",
      }),
    ],
  });
}

function renderFunnel() {
  const colors = themeColors();
  return Plot.plot({
    width: W,
    height: 260,
    marginLeft: 220,
    marginRight: 70,
    x: { label: "Rows", type: "linear" },
    y: { label: null, domain: DATA.funnel_counts.map((row) => row.stage), padding: 0.3 },
    style: { background: "transparent", color: colors.text, fontSize: "13px" },
    marks: [
      Plot.barX(DATA.funnel_counts, {
        y: "stage",
        x: "count",
        fill: (row, i) => (i >= 3 ? colors.pass : colors.bar),
      }),
      Plot.text(DATA.funnel_counts, {
        y: "stage",
        x: "count",
        text: (row) => row.count.toLocaleString(),
        dx: 8,
        fill: colors.text,
        textAnchor: "start",
        fontWeight: 600,
      }),
      Plot.ruleX([0], { stroke: colors.grid }),
    ],
  });
}

function renderHeadlineInsights() {
  const container = el("div", "implication-grid");
  const counts = DATA.story_counts;
  const cards = [
    {
      title: "Why the transfer block is the headline",
      text: `${counts.transfer_headline_rows} of the ${counts.headline_robust_rows} robust rows come from the transfer composite, and those rows cover poverty, child poverty, inequality, and wealth-gap outcomes rather than clustering in just one dependent variable.`,
    },
    {
      title: "Why the archive is richer than an LP-only story",
      text: "The page now pulls estimator-level rows from DASS for the same findings. That lets you see whether a screen-surviving row is backed by broader estimator support or is mostly an LP-screen result.",
    },
    {
      title: "What still limits the claims",
      text: "Cross-estimator support is not uniformly strong for every headline row, and the confirmatory layer remains narrow. The archive supports disciplined screening claims more comfortably than broad causal claims.",
    },
  ];
  for (const card of cards) {
    const node = el("div", "impl-card");
    node.appendChild(el("strong", "", card.title));
    node.appendChild(el("p", "", card.text));
    container.appendChild(node);
  }
  return container;
}

function renderConsumptionPlot() {
  const colors = themeColors();
  const rows = [...DATA.consumption_findings, ...DATA.consumption_supporting].sort(
    (a, b) => a.q_value - b.q_value
  );
  const labels = rows.map((row) => row.row_label);
  const qValues = rows.map((row) => row.q_value).filter((value) => value > 0);
  return Plot.plot({
    width: W,
    height: Math.max(260, rows.length * 28 + 60),
    marginLeft: 300,
    marginRight: 40,
    x: {
      label: "DFLMX q-value",
      type: "log",
      grid: true,
      domain: [Math.min(...qValues) * 0.5, Math.max(...qValues) * 1.4],
      tickFormat: (d) => (d < 0.001 ? d.toExponential(0) : d.toFixed(2)),
    },
    y: { label: null, domain: labels, padding: 0.25 },
    style: { background: "transparent", color: colors.text, fontSize: "13px" },
    marks: [
      Plot.ruleX([0.10], { stroke: colors.fail, strokeDasharray: "6,3" }),
      Plot.dot(rows, {
        y: "row_label",
        x: "q_value",
        r: 5,
        fill: (row) => (row.robust ? treatmentColor(row.treatment) : "transparent"),
        stroke: (row) => treatmentColor(row.treatment),
        strokeWidth: 1.5,
        tip: true,
        title: (row) => `${row.row_label}\nq = ${fmtQ(row.q_value)}`,
      }),
    ],
  });
}

function renderEpisodes() {
  const colors = themeColors();
  const labels = DATA.episodes.summary.map((row) => row.label);
  const episodes = [...new Set(DATA.episodes.checks.map((row) => row.episode))];
  return Plot.plot({
    width: W,
    height: Math.max(340, labels.length * 24 + 70),
    marginLeft: 300,
    marginBottom: 40,
    x: { label: null, domain: episodes, padding: 0.2 },
    y: { label: null, domain: labels, padding: 0.15 },
    color: { domain: [true, false], range: [colors.pass, colors.fail] },
    style: { background: "transparent", color: colors.text, fontSize: "13px" },
    marks: [
      Plot.cell(DATA.episodes.checks, {
        x: "episode",
        y: "label",
        fill: "pass_episode",
        tip: true,
        title: (row) => `${row.label}\n${row.episode}: ${row.pass_episode ? "pass" : "fail"}`,
      }),
      Plot.text(DATA.episodes.checks, {
        x: "episode",
        y: "label",
        text: (row) => (row.pass_episode ? "✓" : "✗"),
        fill: "white",
        fontWeight: 700,
        fontSize: 11,
      }),
    ],
  });
}

function renderLeads() {
  const colors = themeColors();
  const rows = DATA.lead_checks.filter((row) => row.p_joint_leads != null && row.p_joint_leads > 0);
  return Plot.plot({
    width: W,
    height: Math.max(320, rows.length * 22 + 60),
    marginLeft: 300,
    marginRight: 40,
    x: {
      label: "Joint lead p-value",
      type: "log",
      grid: true,
      domain: [Math.min(...rows.map((row) => row.p_joint_leads)) * 0.4, 1],
      tickFormat: (d) => (d < 0.001 ? d.toExponential(0) : d.toFixed(2)),
    },
    y: { label: null, domain: rows.map((row) => row.label), padding: 0.15 },
    style: { background: "transparent", color: colors.text, fontSize: "13px" },
    marks: [
      Plot.ruleX([0.10], { stroke: colors.fail, strokeDasharray: "6,3" }),
      Plot.dot(rows, {
        x: "p_joint_leads",
        y: "label",
        fill: (row) => (row.lead_reject_joint ? colors.fail : colors.pass),
        r: 4,
        tip: true,
        title: (row) => `${row.label}\np = ${fmtP(row.p_joint_leads)}\n${row.lead_reject_joint ? "flagged" : "passes"}`,
      }),
    ],
  });
}

function renderEstimatorBadges(items) {
  const wrap = el("div", "est-badges");
  for (const item of items) {
    const badge = el("span", "est-pill");
    const classes = [];
    if (item.sign_match && item.nominal_sig) classes.push("is-strong");
    else if (item.sign_match) classes.push("is-match");
    else if (item.nominal_sig) classes.push("is-sig");
    else classes.push("is-neutral");
    badge.classList.add(...classes);
    const arrow = item.sign === "positive" ? "↑" : item.sign === "negative" ? "↓" : "•";
    const star = item.nominal_sig ? "*" : "";
    badge.textContent = `${item.label} ${arrow}${star}`;
    badge.title = `${item.label}: estimate ${fmtEstimate(item.estimate)}, p=${fmtP(item.p_value)}`;
    wrap.appendChild(badge);
  }
  return wrap;
}

function renderEstimatorTable(containerId, rows, showPriority = false) {
  const host = document.getElementById(containerId);
  if (!host) return;
  host.innerHTML = "";
  const table = el("table", "var-table estimator-table");
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Finding</th>
      <th>DFLMX q</th>
      ${showPriority ? "<th>Tier</th>" : ""}
      <th>DASS support</th>
      <th>Estimators</th>
    </tr>
  `;
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  for (const row of rows) {
    const tr = document.createElement("tr");
    const support = `${row.estimator_summary.supportive_count}/${row.estimator_summary.available} same-sign and p≤0.10`;
    const findingCell = document.createElement("td");
    findingCell.innerHTML = `<strong>${row.treatment_label}</strong><br>${row.outcome_label} (h=${row.horizon})`;
    tr.appendChild(findingCell);

    const qCell = el("td", "mono", fmtQ(row.q_value));
    tr.appendChild(qCell);

    if (showPriority) {
      const pCell = el("td");
      const badge = el("span", `tier ${row.robust ? "tier-headline" : "tier-suggestive"}`, row.priority_label);
      pCell.appendChild(badge);
      tr.appendChild(pCell);
    }

    const supportCell = el("td");
    supportCell.innerHTML = `<strong>${row.estimator_summary.consensus}</strong><br><span class="est-summary">${support}</span>`;
    tr.appendChild(supportCell);

    const estimatorCell = el("td");
    estimatorCell.appendChild(renderEstimatorBadges(row.estimator_summary.items));
    tr.appendChild(estimatorCell);

    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  host.appendChild(table);
}

function renderSecondaryFindings() {
  const host = document.getElementById("secondary-findings");
  if (!host) return;
  host.innerHTML = "";
  const grid = el("div", "questions-grid");
  for (const row of DATA.secondary_findings) {
    const card = el("div", "result-card");
    const title = el("h3");
    title.innerHTML = `<span class="tier tier-suggestive">${row.priority_label}</span>${row.treatment_label} -> ${row.outcome_label}`;
    card.appendChild(title);
    const claim = el("p", "", `Horizon ${row.horizon}, q = ${fmtQ(row.q_value)}. This is part of the outer supporting ring around the transfer headline, but it does not clear the same publication threshold.`);
    card.appendChild(claim);
    const summary = el("div", "evidence-summary");
    const items = [
      `${row.estimator_summary.supportive_count}/${row.estimator_summary.available} supportive estimators`,
      `consensus: ${row.estimator_summary.consensus}`,
    ];
    for (const item of items) {
      const box = el("div", "ev-item");
      box.textContent = item;
      summary.appendChild(box);
    }
    card.appendChild(summary);
    card.appendChild(renderEstimatorBadges(row.estimator_summary.items));
    grid.appendChild(card);
  }
  host.appendChild(grid);
}

function renderConfirmatoryTables() {
  const host = document.getElementById("confirmatory-tables");
  if (!host) return;
  host.innerHTML = "";

  const ready = DATA.confirmatory.ready_confirmatory;
  const screening = DATA.confirmatory.screening_only_ready.slice(0, 6);

  const sections = [
    {
      title: "Ready Confirmatory Rows",
      rows: ready,
      empty: "No ready-confirmatory rows are packaged in this archive.",
    },
    {
      title: "Contract-Ready But Still Screening-Only",
      rows: screening,
      empty: "No contract-ready screening-only rows are packaged in this archive.",
    },
  ];

  for (const section of sections) {
    const wrap = el("div", "table-wrap");
    wrap.appendChild(el("h3", "", section.title));
    if (!section.rows.length) {
      wrap.appendChild(el("p", "", section.empty));
      host.appendChild(wrap);
      continue;
    }
    const table = el("table", "var-table");
    table.innerHTML = `
      <thead>
        <tr>
          <th>Treatment</th>
          <th>Outcome</th>
          <th>H</th>
          <th>IV</th>
          <th>NC</th>
          <th>Status</th>
        </tr>
      </thead>
    `;
    const tbody = document.createElement("tbody");
    for (const row of section.rows) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.treatment_label}</td>
        <td>${row.outcome_label}</td>
        <td>${row.horizon}</td>
        <td><code>${row.iv_candidate}</code></td>
        <td><code>${row.negative_control_candidate}</code></td>
        <td>${row.status}</td>
      `;
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    wrap.appendChild(table);
    host.appendChild(wrap);
  }
}

function renderRuns() {
  const host = document.getElementById("run-cards");
  if (!host) return;
  host.innerHTML = "";
  for (const run of DATA.runs) {
    const card = el("div", "q-card");
    const tag = el("div", "q-tag");
    tag.textContent = `${run.robust_rows} robust`;
    card.appendChild(tag);
    card.appendChild(el("strong", "", run.name));
    card.appendChild(el("p", "", run.note));
    const summary = el("div", "evidence-summary");
    for (const line of [
      `<span class="ev-num">${run.irf_rows}</span> LP IRF rows`,
      `<span class="ev-num">${run.findings_rows}</span> ranked findings`,
      `estimators: ${run.estimators.join(", ")}`,
    ]) {
      const box = el("div", "ev-item");
      box.innerHTML = line;
      summary.appendChild(box);
    }
    card.appendChild(summary);
    host.appendChild(card);
  }
}

function renderVariables() {
  const body = document.getElementById("var-body");
  if (!body) return;
  body.innerHTML = "";
  for (const variable of DATA.key_variables) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><code>${variable.name}</code></td>
      <td>${variable.display}</td>
      <td>${variable.definition}</td>
    `;
    body.appendChild(tr);
  }
}

function renderBrief() {
  const node = document.getElementById("brief-text");
  if (node) node.textContent = DATA.brief_markdown || "";
}

function renderAll() {
  renderOverview();
  renderQuestions();
  renderHeadlineSummary();
  renderConsumptionSummary();
  renderConfirmatorySummary();
  renderRuns();
  renderVariables();
  renderBrief();
  renderSecondaryFindings();
  renderConfirmatoryTables();
  renderEstimatorTable("headline-estimator-table", DATA.headline_findings, true);
  renderEstimatorTable("consumption-estimator-table", DATA.consumption_findings, false);

  mount("chart-headline", renderHeadlineForest);
  mount("chart-funnel", renderFunnel);
  mount("headline-insights", renderHeadlineInsights);
  mount("chart-consumption", renderConsumptionPlot);
  mount("chart-episodes", renderEpisodes);
  mount("chart-leads", renderLeads);
}

function init() {
  renderAll();
  window.addEventListener("theme-change", renderAll);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
