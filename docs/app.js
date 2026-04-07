// ea-ineq static site -- chart rendering
// Uses Observable Plot via CDN + DATA global from data.js

import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

// ─── Theme ──────────────────────────────────────────────────────────────────

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
    heatStrong: dark ? "#3DBFBF" : "#2B8C8C",
    heatWeak: dark ? "#1a2332" : "#f5f3f0",
  };
}

function treatmentColor(treatment) {
  return themeColors()[treatment] || themeColors().bar;
}

// ─── Formatters ─────────────────────────────────────────────────────────────

function fmtQ(v) {
  if (v == null) return "N/A";
  if (v < 0.0001) return v.toExponential(1);
  return v.toFixed(4);
}

function fmtP(v) {
  if (v == null) return "N/A";
  if (v < 0.0001) return v.toExponential(1);
  if (v < 0.01) return v.toFixed(4);
  return v.toFixed(3);
}

function fmtEst(v) {
  if (v == null) return "N/A";
  const a = Math.abs(v);
  if ((a > 0 && a < 0.001) || a >= 1000) return v.toExponential(2);
  return v.toFixed(3);
}

function fmtPct(v) {
  if (v == null) return "N/A";
  return (v * 100).toFixed(0) + "%";
}

function signBadgeClass(value) {
  if (value === "match") return "pass-text";
  if (value === "opposite") return "fail-text";
  return "";
}

function signBadgeText(value) {
  if (value === "match") return "match";
  if (value === "opposite") return "opposite";
  return "\u2014";
}

// ─── DOM helpers ────────────────────────────────────────────────────────────

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
    const out = builder(node);
    if (out instanceof Node) node.appendChild(out);
  } catch (err) {
    console.error(id, err);
    node.textContent = `Render error: ${err.message}`;
  }
}

function containerWidth(node, fallback = 900) {
  if (!node) return fallback;
  const wrap = node.closest(".chart-wrap") || node.closest(".method-details") || node.parentElement;
  if (!wrap) return fallback;
  const style = getComputedStyle(wrap);
  const padL = parseFloat(style.paddingLeft) || 0;
  const padR = parseFloat(style.paddingRight) || 0;
  const w = wrap.clientWidth - padL - padR;
  return w > 200 ? w : fallback;
}

// ─── Overview ───────────────────────────────────────────────────────────────

function renderOverview() {
  document.getElementById("subtitle").textContent =
    `${DATA.meta.subtitle} | archive date ${DATA.meta.archive_date}`;
  document.getElementById("headline-stat").textContent = DATA.overview.headline_stat;
  document.getElementById("headline-label").textContent = DATA.overview.headline_label;
  document.getElementById("overview-takeaway").textContent = DATA.overview.takeaway;
}

function renderSnapshot() {
  const grid = document.getElementById("snapshot-grid");
  if (!grid) return;
  grid.innerHTML = "";
  const s = DATA.snapshot;
  const cards = [
    { num: s.headline_robust, label: "robust headline rows" },
    { num: s.transfer_rows, label: "transfer-composite rows" },
    { num: s.distinct_outcomes, label: "distinct outcomes" },
    { num: s.consumption_robust, label: "robust consumption rows" },
    { num: s.confirmatory_ready, label: "ready confirmatory" },
    { num: s.dass_estimators.length, label: "DASS estimators" },
  ];
  for (const c of cards) {
    const card = el("div", "snapshot-card");
    card.appendChild(el("div", "snapshot-num", String(c.num)));
    card.appendChild(el("div", "snapshot-label", c.label));
    grid.appendChild(card);
  }
}

// ─── Questions ──────────────────────────────────────────────────────────────

function renderQuestions() {
  const grid = document.getElementById("questions-grid");
  if (!grid) return;
  grid.innerHTML = "";
  for (const q of DATA.questions) {
    const card = el("div", "q-card");
    card.appendChild(el("div", "q-tag", q.tag));
    const title = el("strong");
    title.innerHTML = `<span class="tier tier-${q.tier}">${q.tier}</span>${q.title}`;
    card.appendChild(title);
    card.appendChild(el("p", "", q.description));
    grid.appendChild(card);
  }
}

// ─── Bridge ────────────────────────────────────────────────────────────────

function renderBridgeSummary() {
  if (!DATA.bridge || !DATA.bridge.available) return;
  const s = DATA.bridge.summary;
  renderEvidenceSummary("bridge-summary", [
    `<span class="ev-num">${s.channel_count}</span> aligned channels`,
    `<span class="ev-num">${s.row_count}</span> side-by-side rows`,
    `<span class="ev-num">${s.max_fp_scenarios_per_cell}</span> max fp scenarios per cell`,
    `interpretation: <code>${s.comparison_interpretation_status}</code>`,
    `polarity audit: <code>${s.polarity_audit_status}</code>`,
    `ea dose metric: <code>${s.ea_dose_metric}</code>`,
    `fp dose metric: <code>${s.fp_dose_metric}</code>`,
  ]);
}

function renderBridgeRules() {
  const host = document.getElementById("bridge-rules");
  if (!host || !DATA.bridge || !DATA.bridge.available) return;
  host.innerHTML = "";
  for (const channel of ["ui", "broad_federal_transfers", "transfer_composite"]) {
    const channelRows = DATA.bridge.rows.filter((row) => row.channel === channel);
    if (!channelRows.length) continue;
    const maxCount = Math.max(...channelRows.map((row) => row.fp_scenario_count || 0));
    const card = el("div", "impl-card");
    card.appendChild(el("strong", "", channelRows[0].channel_label));
    card.appendChild(el("p", "", `fp envelope uses up to ${maxCount} published scenario(s) per channel-horizon cell.`));
    host.appendChild(card);
  }
}

function bridgeEnvelopeText(row, metric) {
  const minVal = row[`fp_delta_${metric}_min`];
  const maxVal = row[`fp_delta_${metric}_max`];
  if (minVal == null && maxVal == null) return "fp n/a";
  if (minVal === maxVal) return `fp ${fmtEst(minVal)}`;
  return `fp ${fmtEst(minVal)} to ${fmtEst(maxVal)}`;
}

function bridgeEnvelopeSignText(row, metric) {
  const pos = row[`fp_delta_${metric}_positive_count`] || 0;
  const neg = row[`fp_delta_${metric}_negative_count`] || 0;
  if (pos > 0 && neg > 0) return "fp envelope spans both signs";
  if (pos > 0) return "fp envelope is entirely positive";
  if (neg > 0) return "fp envelope is entirely negative";
  return "fp envelope sign unavailable";
}

function renderBridgeComparisonTable() {
  const host = document.getElementById("bridge-compare-table");
  if (!host || !DATA.bridge || !DATA.bridge.available) return;
  host.innerHTML = "";

  const table = el("table", "var-table bridge-table");
  table.innerHTML = `<thead><tr>
    <th>Channel</th>
    <th>H</th>
    <th>ea-ineq</th>
    <th>fp-ineq</th>
    <th>\u0394 Poverty</th>
    <th>\u0394 Child Poverty</th>
    <th>\u0394 Median Income</th>
  </tr></thead>`;

  const tbody = document.createElement("tbody");
  for (const row of DATA.bridge.rows) {
    const tr = document.createElement("tr");
    const channelCell = document.createElement("td");
    channelCell.innerHTML = `<strong>${row.channel_label}</strong>`;
    tr.appendChild(channelCell);

    tr.appendChild(el("td", "mono", String(row.h)));

    const eaCell = document.createElement("td");
    eaCell.innerHTML = `<strong>${row.ea_scenario_label}</strong><br><span class="bridge-subtle">${row.ea_dose_metric}</span>`;
    tr.appendChild(eaCell);

    const fpCell = document.createElement("td");
    fpCell.innerHTML = `<strong>${row.fp_scenario_count} fp scenario(s)</strong><br><span class="bridge-subtle">${row.fp_dose_metric}</span>`;
    tr.appendChild(fpCell);

    for (const metric of ["ipovall", "ipovch", "imedrinc"]) {
      const cell = document.createElement("td");
      const eaVal = row[`ea_delta_${metric}`];
      cell.innerHTML = `
        <div class="bridge-metric">
          <span class="bridge-values">ea ${fmtEst(eaVal)} | ${bridgeEnvelopeText(row, metric)}</span>
          <span class="bridge-subtle">${bridgeEnvelopeSignText(row, metric)}</span>
        </div>`;
      tr.appendChild(cell);
    }

    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
  host.appendChild(table);
}

function renderBridgePolarityAudit() {
  const host = document.getElementById("bridge-polarity-audit");
  if (!host || !DATA.bridge || !DATA.bridge.available || !DATA.bridge.polarity_audit) return;
  host.innerHTML = "";
  const audit = DATA.bridge.polarity_audit;
  if (audit.summary) host.appendChild(el("p", "", audit.summary));
  for (const [treatment, item] of Object.entries(audit.per_treatment || {})) {
    const card = el("div", "q-card");
    card.appendChild(el("div", "q-tag", "Polarity"));
    card.appendChild(el("strong", "", treatment.replaceAll("_", " ")));
    card.appendChild(el(
      "p",
      "",
      `corr(shock, level) = ${fmtEst(item.corr_shock_level)}; corr(shock, quarter-to-quarter treatment change) = ${fmtEst(item.corr_shock_delta_level)}`
    ));
    card.appendChild(el("p", "", item.conclusion || ""));
    host.appendChild(card);
  }
}

function renderBridgeLimitations() {
  const host = document.getElementById("bridge-limitations");
  if (!host || !DATA.bridge || !DATA.bridge.available) return;
  host.innerHTML = "";
  for (const item of DATA.bridge.limitations) {
    const card = el("div", "q-card");
    card.appendChild(el("div", "q-tag", "Bridge"));
    card.appendChild(el("p", "", item));
    host.appendChild(card);
  }
}

// ─── Evidence summary bars ──────────────────────────────────────────────────

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
  const s = DATA.snapshot;
  renderEvidenceSummary("headline-summary", [
    `<span class="ev-num">${s.headline_robust}</span> robust full-run rows`,
    `<span class="ev-num">${s.transfer_rows}</span> transfer-composite rows`,
    `<span class="ev-num">${s.distinct_outcomes}</span> distinct outcome families`,
    `<span class="ev-num">${s.confirmatory_ready}</span> ready-confirmatory row`,
  ]);
}

function renderConsumptionSummary() {
  const s = DATA.snapshot;
  renderEvidenceSummary("consumption-summary", [
    `<span class="ev-num">${s.consumption_robust}</span> robust consumption rows`,
    `strongest support in UI Benefits`,
    `canon v2 basket ported from ea-gender`,
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

// ─── Heatmap ────────────────────────────────────────────────────────────────

function renderHeatmap(container) {
  const c = themeColors();
  const W = containerWidth(container);
  const { cells, treatments, outcomes, horizons } = DATA.heatmap;

  // Build compact labels: treatment (short) x "outcome h=N"
  const data = cells.map(cell => ({
    ...cell,
    x_label: `${cell.outcome_label} h=${cell.horizon}`,
    y_label: cell.treatment_label,
    logq: cell.q_value ? -Math.log10(cell.q_value) : 0,
  }));

  // Get unique x/y labels
  const yLabels = treatments.map(t => t.label);
  const xSet = new Set();
  for (const o of outcomes) {
    for (const h of horizons) {
      xSet.add(`${o.label} h=${h}`);
    }
  }
  const xLabels = [...xSet];

  return Plot.plot({
    width: W,
    height: Math.max(280, yLabels.length * 36 + 80),
    marginLeft: 160,
    marginBottom: 120,
    marginTop: 10,
    x: { label: null, domain: xLabels, padding: 0.05, tickRotate: -45 },
    y: { label: null, domain: yLabels, padding: 0.1 },
    color: {
      label: "-log10(q)",
      scheme: isDark() ? "viridis" : "YlGnBu",
      domain: [0, 10],
    },
    style: { background: "transparent", color: c.text, fontSize: "11px" },
    marks: [
      Plot.cell(data, {
        x: "x_label",
        y: "y_label",
        fill: "logq",
        stroke: d => d.robust ? (isDark() ? "#fff" : "#000") : "transparent",
        strokeWidth: d => d.robust ? 2 : 0,
        tip: true,
        title: d => `${d.treatment_label} \u2192 ${d.outcome_label} (h=${d.horizon})\nq = ${fmtQ(d.q_value)}\n\u03B2 = ${fmtEst(d.beta)}${d.robust ? "\n\u2713 Robust" : ""}`,
      }),
    ],
  });
}

// ─── Headline forest plot ───────────────────────────────────────────────────

function renderHeadlineForest(container) {
  const c = themeColors();
  const W = containerWidth(container);
  const rows = [...DATA.headline_findings].sort((a, b) => a.q_value - b.q_value);
  const labels = rows.map(r => r.row_label);
  const maxX = Math.max(...rows.map(r => r.ci_high ?? r.beta ?? 0), 0);
  const longestLabel = labels.reduce((a, b) => a.length > b.length ? a : b, "");
  const mLeft = Math.min(Math.max(longestLabel.length * 6.5 + 20, 300), W * 0.48);

  return Plot.plot({
    width: W,
    height: Math.max(380, rows.length * 38 + 80),
    marginLeft: mLeft,
    marginRight: 110,
    marginTop: 20,
    marginBottom: 40,
    x: { label: "DFLMX LP estimate with 95% CI", grid: true },
    y: { label: null, domain: labels, padding: 0.3 },
    style: { background: "transparent", color: c.text, fontSize: "13px" },
    marks: [
      Plot.ruleX([0], { stroke: c.textSecondary, strokeDasharray: "4,3" }),
      Plot.ruleY(rows, {
        y: "row_label", x1: "ci_low", x2: "ci_high",
        stroke: r => treatmentColor(r.treatment),
        strokeWidth: isDark() ? 2.5 : 1.8,
      }),
      Plot.dot(rows, {
        y: "row_label", x: "beta", r: 5,
        fill: r => treatmentColor(r.treatment),
        tip: true,
        title: r => `${r.row_label}\nEstimate: ${fmtEst(r.beta)}\nCI: [${fmtEst(r.ci_low)}, ${fmtEst(r.ci_high)}]\nq = ${fmtQ(r.q_value)}`,
      }),
      Plot.text(rows, {
        y: "row_label", x: () => maxX * 1.03,
        text: r => `q=${fmtQ(r.q_value)}`,
        dx: 6, fill: c.textSecondary, fontSize: 11,
        fontFamily: "JetBrains Mono, monospace", textAnchor: "start",
      }),
    ],
  });
}

// ─── IRF small multiples ────────────────────────────────────────────────────

function renderIRFMultiples(container, treatmentKey) {
  const c = themeColors();
  const W = containerWidth(container);
  const curves = DATA.irf_curves[treatmentKey];
  if (!curves) {
    container.textContent = "No IRF data available for this treatment.";
    return;
  }

  const outcomes = Object.keys(curves);
  const cols = Math.min(outcomes.length, 3);
  const cellW = Math.floor((W - (cols - 1) * 16) / cols);
  const cellH = 180;

  const grid = el("div", "irf-grid");
  grid.style.cssText = `display:grid;grid-template-columns:repeat(${cols},1fr);gap:16px;`;

  for (const outcome of outcomes) {
    const data = curves[outcome];
    if (!data || data.length === 0) continue;

    const wrap = el("div", "");
    const title = el("div", "irf-title", outcome_label_short(outcome));
    wrap.appendChild(title);

    const chart = Plot.plot({
      width: cellW,
      height: cellH,
      marginLeft: 60,
      marginRight: 10,
      marginBottom: 30,
      x: { label: "Horizon (quarters)", domain: [0, 8], ticks: [0, 2, 4, 8] },
      y: { label: null, grid: true },
      style: { background: "transparent", color: c.text, fontSize: "11px" },
      marks: [
        Plot.ruleY([0], { stroke: c.textSecondary, strokeDasharray: "4,3" }),
        Plot.areaY(data, {
          x: "horizon", y1: "ci_low", y2: "ci_high",
          fill: treatmentColor(treatmentKey), fillOpacity: 0.15,
          curve: "monotone-x",
        }),
        Plot.line(data, {
          x: "horizon", y: "beta",
          stroke: treatmentColor(treatmentKey), strokeWidth: 2,
          curve: "monotone-x",
        }),
        Plot.dot(data, {
          x: "horizon", y: "beta", r: 4,
          fill: d => d.robust ? treatmentColor(treatmentKey) : "transparent",
          stroke: treatmentColor(treatmentKey), strokeWidth: 1.5,
          tip: true,
          title: d => `h=${d.horizon}\n\u03B2=${fmtEst(d.beta)}\nq=${fmtQ(d.q_value)}${d.robust ? "\n\u2713 Robust" : ""}`,
        }),
      ],
    });
    wrap.appendChild(chart);
    grid.appendChild(wrap);
  }
  return grid;
}

function outcome_label_short(name) {
  const labels = {
    "poverty_all_q": "Poverty Rate",
    "poverty_child_q": "Child Poverty",
    "gini_households_q": "Household Gini",
    "median_real_income_fred_q": "Median Income",
    "wealth_share_gap_top1_bottom50": "Wealth Gap (1%/50%)",
    "wealth_share_gap_top10_bottom50": "Wealth Gap (10%/50%)",
    "pce_gap_v2": "E/D Gap",
    "pce_eshare_v2": "Essential Share",
    "pce_essential_v2_idx": "Essential Index",
    "pce_discretionary_v2_idx": "Discretionary Index",
  };
  return labels[name] || name.replace(/_/g, " ");
}

// ─── Funnel ─────────────────────────────────────────────────────────────────

function renderFunnel(container) {
  const c = themeColors();
  const W = containerWidth(container);
  const stages = DATA.funnel_counts;
  const longestStage = stages.reduce((a, b) => a.stage.length > b.stage.length ? a : b, stages[0]);
  const mLeft = Math.min(Math.max(longestStage.stage.length * 6.5 + 20, 200), W * 0.4);

  return Plot.plot({
    width: W,
    height: Math.max(260, stages.length * 52 + 40),
    marginLeft: mLeft,
    marginRight: 80,
    marginTop: 10,
    marginBottom: 30,
    x: { label: "Rows", type: "linear" },
    y: { label: null, domain: stages.map(r => r.stage), padding: 0.3 },
    style: { background: "transparent", color: c.text, fontSize: "14px" },
    marks: [
      Plot.barX(stages, {
        y: "stage", x: "count",
        fill: (r, i) => i >= 3 ? c.pass : c.bar,
        tip: true, title: r => `${r.stage}: ${r.count.toLocaleString()} rows`,
      }),
      Plot.text(stages, {
        y: "stage", x: "count",
        text: r => r.count.toLocaleString(),
        dx: 8, fill: c.text, textAnchor: "start", fontWeight: 600, fontSize: 14,
      }),
      Plot.ruleX([0], { stroke: c.grid }),
    ],
  });
}

// ─── Headline insights ───────────────────────────────────────���──────────────

function renderHeadlineInsights() {
  const container = el("div", "implication-grid");
  const s = DATA.snapshot;
  const cards = [
    { title: "Why transfers dominate",
      text: `${s.transfer_rows} of the ${s.headline_robust} robust rows come from the transfer composite, spanning poverty, child poverty, inequality, and wealth-gap outcomes rather than clustering in one dependent variable.` },
    { title: "Cross-estimator depth",
      text: "The DASS layer provides LP, DML, TMLE, CF, LP-IV, and DML-IV estimates for the same findings. This lets you see whether a screen-surviving row has broad estimator support or is LP-only." },
    { title: "What still limits the claims",
      text: "Cross-estimator support is not uniformly strong for every headline row, and the confirmatory layer remains narrow. The archive supports disciplined screening claims more comfortably than broad causal claims." },
  ];
  for (const card of cards) {
    const node = el("div", "impl-card");
    node.appendChild(el("strong", "", card.title));
    node.appendChild(el("p", "", card.text));
    container.appendChild(node);
  }
  return container;
}

// ─── Consumption plot ───────────────────────────────────────────────────────

function renderConsumptionPlot(container) {
  const c = themeColors();
  const W = containerWidth(container);
  const rows = [...DATA.consumption_findings, ...DATA.consumption_supporting].sort(
    (a, b) => a.q_value - b.q_value
  );
  if (rows.length === 0) return;
  const labels = rows.map(r => r.row_label);
  const qValues = rows.map(r => r.q_value).filter(v => v > 0);
  const longestLabel = labels.reduce((a, b) => a.length > b.length ? a : b, "");
  const mLeft = Math.min(Math.max(longestLabel.length * 6.2 + 20, 280), W * 0.48);

  return Plot.plot({
    width: W,
    height: Math.max(300, rows.length * 32 + 60),
    marginLeft: mLeft,
    marginRight: 40,
    x: {
      label: "DFLMX q-value", type: "log", grid: true,
      domain: [Math.min(...qValues) * 0.5, Math.max(...qValues) * 1.4],
      tickFormat: d => d < 0.001 ? d.toExponential(0) : d.toFixed(2),
    },
    y: { label: null, domain: labels, padding: 0.25 },
    style: { background: "transparent", color: c.text, fontSize: "13px" },
    marks: [
      Plot.ruleX([0.10], { stroke: c.fail, strokeDasharray: "6,3" }),
      Plot.dot(rows, {
        y: "row_label", x: "q_value", r: 5,
        fill: r => r.robust ? treatmentColor(r.treatment) : "transparent",
        stroke: r => treatmentColor(r.treatment), strokeWidth: 1.5,
        tip: true, title: r => `${r.row_label}\nq = ${fmtQ(r.q_value)}`,
      }),
    ],
  });
}

// ─── Episodes heatmap ───────────────────────────────────────────────────────

function renderEpisodes(container) {
  const c = themeColors();
  const W = containerWidth(container);
  const labels = DATA.episodes.summary.map(r => r.label);
  if (labels.length === 0) return;
  const episodes = [...new Set(DATA.episodes.checks.map(r => r.episode))];
  const longestLabel = labels.reduce((a, b) => a.length > b.length ? a : b, "");
  const mLeft = Math.min(Math.max(longestLabel.length * 6.2 + 20, 280), W * 0.48);

  return Plot.plot({
    width: W,
    height: Math.max(380, labels.length * 26 + 70),
    marginLeft: mLeft,
    marginBottom: 40,
    x: { label: null, domain: episodes, padding: 0.2 },
    y: { label: null, domain: labels, padding: 0.15 },
    color: { domain: [true, false], range: [c.pass, c.fail] },
    style: { background: "transparent", color: c.text, fontSize: "13px" },
    marks: [
      Plot.cell(DATA.episodes.checks, {
        x: "episode", y: "label", fill: "pass_episode",
        tip: true, title: r => `${r.label}\n${r.episode}: ${r.pass_episode ? "pass" : "fail"}`,
      }),
      Plot.text(DATA.episodes.checks, {
        x: "episode", y: "label",
        text: r => r.pass_episode ? "\u2713" : "\u2717",
        fill: "white", fontWeight: 700, fontSize: 11,
      }),
    ],
  });
}

// ─── Leads plot ─────────────────────────────────────────────────────────────

function renderLeads(container) {
  const c = themeColors();
  const W = containerWidth(container);
  const rows = DATA.lead_checks.filter(r => r.p_joint_leads != null && r.p_joint_leads > 0);
  if (rows.length === 0) return;
  const rowLabels = rows.map(r => r.label);
  const longestLabel = rowLabels.reduce((a, b) => a.length > b.length ? a : b, "");
  const mLeft = Math.min(Math.max(longestLabel.length * 6.2 + 20, 280), W * 0.48);

  return Plot.plot({
    width: W,
    height: Math.max(380, rows.length * 24 + 60),
    marginLeft: mLeft,
    marginRight: 40,
    x: {
      label: "Joint lead p-value", type: "log", grid: true,
      domain: [Math.min(...rows.map(r => r.p_joint_leads)) * 0.4, 1],
      tickFormat: d => d < 0.001 ? d.toExponential(0) : d.toFixed(2),
    },
    y: { label: null, domain: rows.map(r => r.label), padding: 0.15 },
    style: { background: "transparent", color: c.text, fontSize: "13px" },
    marks: [
      Plot.ruleX([0.10], { stroke: c.fail, strokeDasharray: "6,3" }),
      Plot.dot(rows, {
        x: "p_joint_leads", y: "label",
        fill: r => r.lead_reject_joint ? c.fail : c.pass,
        r: 4, tip: true,
        title: r => `${r.label}\np = ${fmtP(r.p_joint_leads)}\n${r.lead_reject_joint ? "flagged" : "passes"}`,
      }),
    ],
  });
}

// ─── Spec stability ─────────────────────────────────────────────────────────

function renderSpecStability(container) {
  const c = themeColors();
  const W = containerWidth(container);
  const specs = DATA.spec_stability;
  if (!specs || specs.length === 0) return;

  const data = specs.map(s => ({
    ...s,
    label: s.spec_id,
  }));

  return Plot.plot({
    width: W,
    height: 220,
    marginLeft: 100,
    marginRight: 40,
    marginBottom: 40,
    x: { label: "Stability score", domain: [0, 1.05], grid: true },
    y: { label: null, domain: data.map(d => d.label), padding: 0.3 },
    style: { background: "transparent", color: c.text, fontSize: "13px" },
    marks: [
      Plot.barX(data, {
        y: "label", x: "stability_score",
        fill: d => d.is_baseline ? c.pass : c.bar,
        tip: true,
        title: d => `${d.spec_id} (k=${d.k_factors})\nStability: ${fmtPct(d.stability_score)}\nSign match: ${fmtPct(d.sign_match_rate)}\nKey-finding retention: ${fmtPct(d.keyfinding_retention_rate)}`,
      }),
      Plot.text(data, {
        y: "label", x: "stability_score",
        text: d => fmtPct(d.stability_score),
        dx: 8, fill: c.text, fontSize: 12, fontWeight: 600, textAnchor: "start",
      }),
      Plot.ruleX([0], { stroke: c.grid }),
    ],
  });
}

// ─��─ Variance attribution ───────────────────────────────────────────────────

function renderVarianceAttribution(container) {
  const c = themeColors();
  const W = containerWidth(container);
  const data = DATA.variance_attribution;
  if (!data || data.length === 0) return;

  const factorColors = { F1: c.transfer_composite, F2: c.ui_benefits };

  return Plot.plot({
    width: W,
    height: Math.max(200, data.length * 22 + 60),
    marginLeft: 180,
    marginRight: 40,
    marginBottom: 40,
    x: { label: "Variance share", domain: [0, 1], grid: true },
    y: {
      label: null,
      domain: [...new Set(data.map(d => d.outcome_label))],
      padding: 0.2,
    },
    color: { domain: ["F1", "F2"], range: [factorColors.F1, factorColors.F2] },
    style: { background: "transparent", color: c.text, fontSize: "12px" },
    marks: [
      Plot.barX(data, Plot.stackX({
        y: "outcome_label", x: "share", fill: "factor",
        tip: true,
        title: d => `${d.outcome_label}\n${d.factor}: ${fmtPct(d.share)}\nModel R\u00b2: ${d.r2?.toFixed(2) || "N/A"}`,
      })),
      Plot.ruleX([0], { stroke: c.grid }),
    ],
  });
}

// ─── Estimator badges ───────────────────────────────────────────────────────

function renderEstimatorBadges(items) {
  const wrap = el("div", "est-badges");
  for (const item of items) {
    const badge = el("span", "est-pill");
    const cls = item.sign_match && item.nominal_sig ? "is-strong"
      : item.sign_match ? "is-match"
      : item.nominal_sig ? "is-sig" : "is-neutral";
    badge.classList.add(cls);
    const arrow = item.sign === "positive" ? "\u2191" : item.sign === "negative" ? "\u2193" : "\u2022";
    const star = item.nominal_sig ? "*" : "";
    badge.textContent = `${item.label} ${arrow}${star}`;
    badge.title = `${item.label}: est ${fmtEst(item.estimate)}, p=${fmtP(item.p_value)}`;
    wrap.appendChild(badge);
  }
  return wrap;
}

// ─── Estimator table ────────────────────────────────────────────────────────

function renderEstimatorTable(containerId, rows, showDrilldown = false) {
  const host = document.getElementById(containerId);
  if (!host) return;
  host.innerHTML = "";
  const table = el("table", "var-table estimator-table");
  const thead = document.createElement("thead");
  thead.innerHTML = `<tr>
    <th>Finding</th><th>DFLMX q</th>
    ${showDrilldown ? "<th>Lead</th><th>Episode</th>" : ""}
    <th>DASS Support</th><th>Estimators</th>
  </tr>`;
  table.appendChild(thead);
  const tbody = document.createElement("tbody");

  for (const row of rows) {
    const tr = document.createElement("tr");
    const support = `${row.estimator_summary.supportive_count}/${row.estimator_summary.available} same-sign & p\u22640.10`;

    const findingCell = document.createElement("td");
    findingCell.innerHTML = `<strong>${row.treatment_label}</strong><br>${row.outcome_label} (h=${row.horizon})`;
    tr.appendChild(findingCell);

    tr.appendChild(el("td", "mono", fmtQ(row.q_value)));

    if (showDrilldown) {
      const leadCell = el("td");
      if (row.lead_p != null) {
        const pass = !row.lead_reject;
        leadCell.innerHTML = `<span class="${pass ? "pass-text" : "fail-text"}">${pass ? "\u2713" : "\u2717"}</span> <span class="mono">${fmtP(row.lead_p)}</span>`;
      } else {
        leadCell.textContent = "\u2014";
      }
      tr.appendChild(leadCell);

      const epCell = el("td");
      if (row.episode_all_pass != null) {
        epCell.innerHTML = `<span class="${row.episode_all_pass ? "pass-text" : "fail-text"}">${row.episode_all_pass ? "\u2713 stable" : "\u2717 fragile"}</span>`;
      } else {
        epCell.textContent = "\u2014";
      }
      tr.appendChild(epCell);
    }

    const supportCell = el("td");
    supportCell.innerHTML = `<strong>${row.estimator_summary.consensus}</strong><br><span class="est-summary">${support}</span>`;
    tr.appendChild(supportCell);

    const estCell = el("td");
    estCell.appendChild(renderEstimatorBadges(row.estimator_summary.items));
    tr.appendChild(estCell);

    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  host.appendChild(table);
}

// ─── Estimator agreement matrix ─────────────────────────────────────────────

function renderEstimatorMatrix(container) {
  const matrix = DATA.estimator_matrix;
  if (!matrix || matrix.length === 0) return;

  const allEst = ["lp", "dml", "tmle", "cf", "lp_iv", "dml_iv"];
  const estLabels = { lp: "LP", dml: "DML", tmle: "TMLE", cf: "CF", lp_iv: "LP-IV", dml_iv: "DML-IV" };

  const table = el("table", "var-table estimator-matrix-table");
  const thead = document.createElement("thead");
  let headerRow = "<tr><th>Finding</th>";
  for (const e of allEst) headerRow += `<th>${estLabels[e]}</th>`;
  headerRow += "</tr>";
  thead.innerHTML = headerRow;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  for (const row of matrix) {
    const tr = document.createElement("tr");
    const labelCell = document.createElement("td");
    labelCell.innerHTML = `<strong>${row.treatment_label}</strong><br>${row.outcome_label} h=${row.horizon}`;
    tr.appendChild(labelCell);

    for (const e of allEst) {
      const cell = document.createElement("td");
      cell.style.textAlign = "center";
      const d = row.estimators[e];
      if (d) {
        const sig = d.p != null && d.p <= 0.10;
        const sign = d.estimate > 0 ? "+" : d.estimate < 0 ? "\u2212" : "0";
        cell.innerHTML = `<span class="${sig ? "pass-text" : "fail-text"}" style="font-weight:600">${sign}</span><br><span class="mono" style="font-size:10px">${fmtP(d.p)}</span>`;
      } else {
        cell.textContent = "\u2014";
        cell.style.color = "var(--text-secondary)";
      }
      tr.appendChild(cell);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  return table;
}

// ─── Secondary findings ─────────────────────────────────────────────────────

function renderSecondaryFindings() {
  const host = document.getElementById("secondary-findings");
  if (!host) return;
  host.innerHTML = "";
  const grid = el("div", "questions-grid");
  for (const row of DATA.secondary_findings) {
    const card = el("div", "result-card");
    const title = el("h3");
    title.innerHTML = `<span class="tier tier-suggestive">${row.priority_label}</span>${row.treatment_label} \u2192 ${row.outcome_label}`;
    card.appendChild(title);
    card.appendChild(el("p", "", `Horizon ${row.horizon}, q = ${fmtQ(row.q_value)}. This row is part of the supporting ring around the transfer headline but does not clear FDR.`));
    const summary = el("div", "evidence-summary");
    for (const item of [
      `${row.estimator_summary.supportive_count}/${row.estimator_summary.available} supportive estimators`,
      `consensus: ${row.estimator_summary.consensus}`,
    ]) {
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

// ─── Program hierarchy ──────────────────────────────────────────────────────

function renderHierarchy() {
  const host = document.getElementById("hierarchy-cards");
  if (!host) return;
  host.innerHTML = "";

  const tierStyles = {
    headline: "tier-headline",
    bridge: "tier-secondary",
    suggestive: "tier-suggestive",
    appendix: "tier-exploratory",
  };

  for (const prog of DATA.hierarchy) {
    const card = el("div", "result-card");
    const title = el("h3");
    title.innerHTML = `<span class="tier ${tierStyles[prog.tier] || "tier-suggestive"}">${prog.tier}</span>${prog.label}`;
    card.appendChild(title);
    card.appendChild(el("p", "", prog.description));

    const summary = el("div", "evidence-summary");
    summary.innerHTML = `
      <div class="ev-item"><span class="ev-num">${prog.robust_count}</span> robust DFLMX rows</div>
      <div class="ev-item"><span class="ev-num">${prog.near_count}</span> near-threshold rows</div>
      ${prog.outcomes_covered.length ? `<div class="ev-item">${prog.outcomes_covered.length} outcome families</div>` : ""}
    `;

    if (prog.diagnostic) {
      const d = prog.diagnostic;
      summary.innerHTML += `
        <div class="ev-item">Shock diagnostic: <span class="ev-num">${d.lp_sig}</span>/${d.lp_total} LP sig, <span class="ev-num">${d.dml_sig}</span>/${d.dml_total} DML sig</div>
      `;
    }
    card.appendChild(summary);
    host.appendChild(card);
  }
}

// ─── Confirmatory tables ────────────────────────────────────────────────────

function renderConfirmatoryTables() {
  const host = document.getElementById("confirmatory-tables");
  if (!host) return;
  host.innerHTML = "";

  const sections = [
    { title: "Ready Confirmatory Rows", rows: DATA.confirmatory.ready_confirmatory,
      empty: "No ready-confirmatory rows packaged in this archive." },
    { title: "Contract-Ready But Still Screening-Only", rows: DATA.confirmatory.screening_only_ready.slice(0, 6),
      empty: "No contract-ready screening-only rows packaged." },
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
    table.innerHTML = `<thead><tr>
      <th>Treatment</th><th>Outcome</th><th>H</th><th>IV</th><th>NC</th><th>Status</th>
    </tr></thead>`;
    const tbody = document.createElement("tbody");
    for (const row of section.rows) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.treatment_label}</td><td>${row.outcome_label}</td><td>${row.horizon}</td>
        <td><code>${row.iv_candidate}</code></td><td><code>${row.negative_control_candidate || "\u2014"}</code></td>
        <td>${row.status}</td>`;
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    wrap.appendChild(table);
    host.appendChild(wrap);
  }
}

// ─── Run cards ──────────────────────────────────────────────────────────────

function renderRuns() {
  const host = document.getElementById("run-cards");
  if (!host) return;
  host.innerHTML = "";
  for (const run of DATA.runs) {
    const card = el("div", "q-card");
    card.appendChild(el("div", "q-tag", `${run.robust_rows} robust`));
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

// ─── Variables table ────────────────────────────────────────────────────────

function renderVariables() {
  const body = document.getElementById("var-body");
  if (!body) return;
  body.innerHTML = "";
  for (const v of DATA.key_variables) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td><code>${v.name}</code></td><td>${v.display}</td><td>${v.definition}</td>`;
    body.appendChild(tr);
  }
}

// ─── Render all ─────────────────────────────────────────────────────────────

function renderAll() {
  renderOverview();
  renderSnapshot();
  renderQuestions();
  renderBridgeSummary();
  renderBridgeRules();
  renderBridgeComparisonTable();
  renderBridgePolarityAudit();
  renderBridgeLimitations();
  renderHeadlineSummary();
  renderConsumptionSummary();
  renderConfirmatorySummary();
  renderHierarchy();
  renderSecondaryFindings();
  renderConfirmatoryTables();
  renderEstimatorTable("headline-estimator-table", DATA.headline_findings, true);
  renderEstimatorTable("consumption-estimator-table", DATA.consumption_findings, false);
  renderRuns();
  renderVariables();

  mount("chart-heatmap", renderHeatmap);
  mount("chart-headline", renderHeadlineForest);
  mount("chart-irf-transfer", c => renderIRFMultiples(c, "transfer_composite"));
  mount("chart-irf-ui", c => renderIRFMultiples(c, "ui_benefits"));
  mount("chart-funnel", renderFunnel);
  mount("headline-insights", renderHeadlineInsights);
  mount("chart-consumption", renderConsumptionPlot);
  mount("chart-episodes", renderEpisodes);
  mount("chart-leads", renderLeads);
  mount("chart-spec-stability", renderSpecStability);
  mount("chart-variance", renderVarianceAttribution);
  mount("chart-estimator-matrix", renderEstimatorMatrix);
}

// ─── Init ───────────────────────────────────────────────────────────────────

function init() {
  renderAll();
  window.addEventListener("theme-change", renderAll);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
