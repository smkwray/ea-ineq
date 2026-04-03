function fmtNum(x) {
  const n = Number(x);
  if (!Number.isFinite(n)) return x ?? "";
  if (Math.abs(n) >= 1e4 || (Math.abs(n) > 0 && Math.abs(n) < 1e-4)) return n.toExponential(2);
  return n.toFixed(4);
}

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderQuestions() {
  const grid = document.getElementById("questions-grid");
  for (const q of DATA.questions) {
    const card = el("div", "q-card");
    card.appendChild(el("div", "q-tag", q.tag));
    card.appendChild(el("strong", "", q.title));
    card.appendChild(el("p", "", q.description));
    grid.appendChild(card);
  }
}

function renderVariables() {
  const body = document.getElementById("var-body");
  for (const row of DATA.key_variables) {
    const tr = document.createElement("tr");
    const tdName = el("td");
    tdName.innerHTML = `<code>${row.name}</code>`;
    const tdDef = el("td", "", row.definition);
    tr.appendChild(tdName);
    tr.appendChild(tdDef);
    body.appendChild(tr);
  }
}

function findingsTable(title, rows) {
  const wrap = el("div", "table-wrap");
  wrap.appendChild(el("h3", "", title));
  const table = el("table", "var-table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>Treatment</th>
        <th>Outcome</th>
        <th>H</th>
        <th>Beta</th>
        <th>p</th>
        <th>q</th>
        <th>Robust</th>
      </tr>
    </thead>
  `;
  const tbody = el("tbody");
  for (const r of rows) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><code>${r.treatment}</code></td>
      <td><code>${r.outcome}</code></td>
      <td>${r.horizon}</td>
      <td>${fmtNum(r.beta)}</td>
      <td>${fmtNum(r.p_value)}</td>
      <td>${fmtNum(r.q_value)}</td>
      <td>${String(r.robust)}</td>
    `;
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  wrap.appendChild(table);
  return wrap;
}

function renderRuns() {
  const cards = document.getElementById("run-cards");
  const tables = document.getElementById("run-tables");
  for (const run of DATA.runs) {
    const card = el("div", "q-card");
    card.appendChild(el("div", "q-tag", "Run"));
    card.appendChild(el("strong", "", run.name));
    card.appendChild(el("p", "", `IRF rows: ${run.irf_rows}; ranked findings: ${run.findings_rows}; robust rows: ${run.robust_rows}.`));
    cards.appendChild(card);
    tables.appendChild(findingsTable(run.name + " top findings", run.top_findings));
  }
}

function confirmatoryTable(title, rows) {
  const wrap = el("div", "table-wrap");
  wrap.appendChild(el("h3", "", title));
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
        <th>p</th>
        <th>q</th>
      </tr>
    </thead>
  `;
  const tbody = el("tbody");
  for (const r of rows) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><code>${r.treatment}</code></td>
      <td><code>${r.outcome}</code></td>
      <td>${r.horizon}</td>
      <td><code>${r.iv_candidate}</code></td>
      <td><code>${r.negative_control_candidate}</code></td>
      <td>${r.status}</td>
      <td>${fmtNum(r.p_value)}</td>
      <td>${fmtNum(r.q_value)}</td>
    `;
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  wrap.appendChild(table);
  return wrap;
}

function renderConfirmatory() {
  const summary = document.getElementById("confirmatory-summary");
  const tables = document.getElementById("confirmatory-tables");
  const metrics = [
    ["IV candidates", DATA.confirmatory.iv_candidates],
    ["NC candidates", DATA.confirmatory.nc_candidates],
    ["Manifest ready", DATA.confirmatory.manifest_ready],
    ["Ready confirmatory", DATA.confirmatory.ready_confirmatory.length],
  ];
  for (const [label, value] of metrics) {
    const card = el("div", "q-card");
    card.appendChild(el("div", "q-tag", "Confirmatory"));
    card.appendChild(el("strong", "", String(value)));
    card.appendChild(el("p", "", label));
    summary.appendChild(card);
  }
  tables.appendChild(confirmatoryTable("Ready confirmatory rows", DATA.confirmatory.ready_confirmatory));
  tables.appendChild(confirmatoryTable("Ready-contract but screening-only rows", DATA.confirmatory.screening_only_ready));
}

function init() {
  document.getElementById("title").textContent = DATA.meta.title;
  document.getElementById("subtitle").textContent = `${DATA.meta.subtitle} Archived ${DATA.meta.archive_date}.`;
  document.getElementById("headline-stat").textContent = `${DATA.runs[1].robust_rows} robust outcomes rows`;
  document.getElementById("headline-label").textContent = "Transfer-led poverty and inequality results remain the archive headline.";
  document.getElementById("brief-text").textContent = DATA.brief_markdown;
  renderQuestions();
  renderVariables();
  renderRuns();
  renderConfirmatory();
}

window.addEventListener("DOMContentLoaded", init);
