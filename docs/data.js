const DATA = {
  "meta": {
    "title": "Fiscal Transfers, Poverty, Inequality, and Consumption Composition",
    "subtitle": "Project-specific econark-r archive for the ea-ineq package.",
    "archive_date": "2026-04-03"
  },
  "questions": [
    {
      "tag": "Headline",
      "title": "Transfers and poverty",
      "description": "Do transfer shocks move poverty and inequality outcomes over short and medium horizons?"
    },
    {
      "tag": "Decomposition",
      "title": "Program-level channels",
      "description": "Do UI, Social Security, and SNAP line up with the broader transfer-composite signal?"
    },
    {
      "tag": "Consumption",
      "title": "Canon v2 basket",
      "description": "Under the ea-gender-style essential/discretionary split, do shocks shift pce_gap_v2 and pce_eshare_v2?"
    },
    {
      "tag": "Contrast",
      "title": "Rates, credit, and wealth",
      "description": "How do fed funds, credit, and wealth shocks compare with transfer shocks on poverty and wealth-gap outcomes?"
    },
    {
      "tag": "Methods",
      "title": "Confirmatory screen",
      "description": "Which rows survive the repaired IV/NC discovery layer, and which remain screening-only?"
    }
  ],
  "key_variables": [
    {
      "name": "pce_essential_v2_idx",
      "definition": "CE-weighted essential basket: housing + food + healthcare"
    },
    {
      "name": "pce_discretionary_v2_idx",
      "definition": "CE-weighted discretionary basket: recreation + transport + clothing"
    },
    {
      "name": "pce_gap_v2",
      "definition": "log(E/D) under the canon v2 basket"
    },
    {
      "name": "pce_eshare_v2",
      "definition": "E / (E + D) under the canon v2 basket"
    },
    {
      "name": "transfer_composite",
      "definition": "transfers_total + social_security + ui_benefits"
    },
    {
      "name": "wealth_share_gap_top1_bottom50",
      "definition": "top1 wealth share minus bottom50 wealth share"
    }
  ],
  "runs": [
    {
      "name": "Consumption baseline",
      "dir": "poverty_consumption_baseline",
      "irf_rows": 84,
      "findings_rows": 56,
      "robust_rows": 2,
      "report_excerpt": "# DFLMX-R Report\n\n- IRF rows: 84\n- Outcome rows: 56\n- Robust rows (q<=0.10): 2\n- Ranking source: outcome\n- Tie-break effect size: abs(beta * shock_sd) when available\n\n## Top findings\n- ui_benefits -> pce_gap_v2 (h=1): beta=1.891e-06, beta@1sd=0.0146 (sd=7710.0575), p=3.646e-07, q=2.042e-05\n- ui_benefits -> pce_eshare_v2 (h=1): beta=2.396e-07, beta@1sd=0.0018 (sd=7710.0575), p=2.596e-05, q=0.0007\n- ui_benefits -> pce_gap_v2 (h=2): beta=1.478e-06, beta@1sd=0.0114 (sd=7710.0575), p=0.0061, q=0.1141\n- ui_benefits -> pce_discretionary_v2_idx (h=1): beta=-0.1704, beta@1sd=-1313.9361 (sd=7710.0575), p=0.0121, q=0.1687\n- ui_benefits -> pce_eshare_v2 (h=2): beta=1.895e-07, beta@1sd=0.0015 (sd=7710.0575), p=0.0193, q=0.2157\n- transfer_composite -> pce_gap_v2 (h=1): beta=2.041e-07, beta@1sd=0.0187 (sd=9.168e+04), p=0.0667, q=0.4294\n- credit_composite -> pce_essential_v2_idx (h=1): beta=8.182e-05, beta@1sd=763.1395 (sd=9.327e+06), p=0.0727, q=0.4294",
      "top_findings": [
        {
          "treatment": "ui_benefits",
          "outcome": "pce_gap_v2",
          "horizon": "1",
          "beta": "1.89058595318254e-06",
          "p_value": "3.6464902428428e-07",
          "q_value": "2.04203453599197e-05",
          "robust": "TRUE"
        },
        {
          "treatment": "ui_benefits",
          "outcome": "pce_eshare_v2",
          "horizon": "1",
          "beta": "2.39612423862593e-07",
          "p_value": "2.59600694670588e-05",
          "q_value": "0.000726881945077646",
          "robust": "TRUE"
        },
        {
          "treatment": "ui_benefits",
          "outcome": "pce_gap_v2",
          "horizon": "2",
          "beta": "1.47793925655794e-06",
          "p_value": "0.00611386859183448",
          "q_value": "0.114125547047577",
          "robust": "FALSE"
        },
        {
          "treatment": "ui_benefits",
          "outcome": "pce_discretionary_v2_idx",
          "horizon": "1",
          "beta": "-0.170418459970456",
          "p_value": "0.012052793982239",
          "q_value": "0.168739115751346",
          "robust": "FALSE"
        },
        {
          "treatment": "ui_benefits",
          "outcome": "pce_eshare_v2",
          "horizon": "2",
          "beta": "1.89454746923296e-07",
          "p_value": "0.0192625201706858",
          "q_value": "0.215740225911681",
          "robust": "FALSE"
        },
        {
          "treatment": "transfer_composite",
          "outcome": "pce_gap_v2",
          "horizon": "1",
          "beta": "2.04136763771931e-07",
          "p_value": "0.0666605410429702",
          "q_value": "0.429384470379254",
          "robust": "FALSE"
        },
        {
          "treatment": "credit_composite",
          "outcome": "pce_essential_v2_idx",
          "horizon": "1",
          "beta": "8.18161775368914e-05",
          "p_value": "0.0727306922818525",
          "q_value": "0.429384470379254",
          "robust": "FALSE"
        },
        {
          "treatment": "snap_persons",
          "outcome": "pce_eshare_v2",
          "horizon": "2",
          "beta": "3.15946229851941e-07",
          "p_value": "0.0977959967216708",
          "q_value": "0.429384470379254",
          "robust": "FALSE"
        }
      ]
    },
    {
      "name": "Outcomes baseline",
      "dir": "poverty_outcomes_baseline",
      "irf_rows": 144,
      "findings_rows": 108,
      "robust_rows": 11,
      "report_excerpt": "# DFLMX-R Report\n\n- IRF rows: 144\n- Outcome rows: 108\n- Robust rows (q<=0.10): 11\n- Ranking source: outcome\n- Tie-break effect size: abs(beta * shock_sd) when available\n\n## Top findings\n- transfer_composite -> gini_households_q (h=4): beta=1.653e-08, beta@1sd=0.0015 (sd=9.168e+04), p=6.510e-12, q=7.031e-10\n- transfer_composite -> poverty_all_q (h=4): beta=1.945e-06, beta@1sd=0.1783 (sd=9.168e+04), p=3.367e-09, q=1.818e-07\n- transfer_composite -> poverty_child_q (h=4): beta=3.419e-06, beta@1sd=0.3135 (sd=9.168e+04), p=1.538e-08, q=5.536e-07\n- transfer_composite -> gini_households_q (h=2): beta=9.882e-09, beta@1sd=0.0009 (sd=9.168e+04), p=4.248e-08, q=1.147e-06\n- transfer_composite -> poverty_all_q (h=2): beta=1.121e-06, beta@1sd=0.1027 (sd=9.168e+04), p=6.501e-07, q=1.404e-05\n- transfer_composite -> poverty_child_q (h=2): beta=1.964e-06, beta@1sd=0.1801 (sd=9.168e+04), p=4.554e-06, q=8.197e-05\n- transfer_composite -> wealth_share_gap_top1_bottom50 (h=2): beta=2.064e-06, beta@1sd=0.1893 (sd=9.168e+04), p=6.518e-05, q=0.0010",
      "top_findings": [
        {
          "treatment": "transfer_composite",
          "outcome": "gini_households_q",
          "horizon": "4",
          "beta": "1.65271659654922e-08",
          "p_value": "6.51001222084906e-12",
          "q_value": "7.03081319851699e-10",
          "robust": "TRUE"
        },
        {
          "treatment": "transfer_composite",
          "outcome": "poverty_all_q",
          "horizon": "4",
          "beta": "1.94463299768093e-06",
          "p_value": "3.36741108810146e-09",
          "q_value": "1.81840198757479e-07",
          "robust": "TRUE"
        },
        {
          "treatment": "transfer_composite",
          "outcome": "poverty_child_q",
          "horizon": "4",
          "beta": "3.41941254589341e-06",
          "p_value": "1.53784654931706e-08",
          "q_value": "5.53624757754142e-07",
          "robust": "TRUE"
        },
        {
          "treatment": "transfer_composite",
          "outcome": "gini_households_q",
          "horizon": "2",
          "beta": "9.88156467708069e-09",
          "p_value": "4.24828691041706e-08",
          "q_value": "1.14703746581261e-06",
          "robust": "TRUE"
        },
        {
          "treatment": "transfer_composite",
          "outcome": "poverty_all_q",
          "horizon": "2",
          "beta": "1.12062632637146e-06",
          "p_value": "6.50143969364507e-07",
          "q_value": "1.40431097382734e-05",
          "robust": "TRUE"
        },
        {
          "treatment": "transfer_composite",
          "outcome": "poverty_child_q",
          "horizon": "2",
          "beta": "1.96448064464099e-06",
          "p_value": "4.553986187813e-06",
          "q_value": "8.1971751380634e-05",
          "robust": "TRUE"
        },
        {
          "treatment": "transfer_composite",
          "outcome": "wealth_share_gap_top1_bottom50",
          "horizon": "2",
          "beta": "2.06443990217345e-06",
          "p_value": "6.51812817137315e-05",
          "q_value": "0.00100565406072614",
          "robust": "TRUE"
        },
        {
          "treatment": "transfer_composite",
          "outcome": "wealth_share_gap_top1_bottom50",
          "horizon": "4",
          "beta": "2.24970939782917e-06",
          "p_value": "0.000179943555654677",
          "q_value": "0.00242923800133814",
          "robust": "TRUE"
        }
      ]
    },
    {
      "name": "Outcomes full",
      "dir": "poverty_outcomes_full",
      "irf_rows": 165,
      "findings_rows": 105,
      "robust_rows": 11,
      "report_excerpt": "# DFLMX-R Report\n\n- IRF rows: 165\n- Outcome rows: 105\n- Robust rows (q<=0.10): 11\n- Ranking source: outcome\n- Tie-break effect size: abs(beta * shock_sd) when available\n\n## Top findings\n- transfer_composite -> gini_households_q (h=4): beta=1.653e-08, beta@1sd=0.0015 (sd=9.168e+04), p=6.510e-12, q=6.836e-10\n- transfer_composite -> poverty_all_q (h=4): beta=1.945e-06, beta@1sd=0.1783 (sd=9.168e+04), p=3.367e-09, q=1.768e-07\n- transfer_composite -> poverty_child_q (h=4): beta=3.419e-06, beta@1sd=0.3135 (sd=9.168e+04), p=1.538e-08, q=5.382e-07\n- transfer_composite -> gini_households_q (h=2): beta=9.882e-09, beta@1sd=0.0009 (sd=9.168e+04), p=4.248e-08, q=1.115e-06\n- transfer_composite -> poverty_all_q (h=2): beta=1.121e-06, beta@1sd=0.1027 (sd=9.168e+04), p=6.501e-07, q=1.365e-05\n- transfer_composite -> poverty_child_q (h=2): beta=1.964e-06, beta@1sd=0.1801 (sd=9.168e+04), p=4.554e-06, q=7.969e-05\n- transfer_composite -> wealth_share_gap_top1_bottom50 (h=2): beta=2.064e-06, beta@1sd=0.1893 (sd=9.168e+04), p=6.518e-05, q=0.0009",
      "top_findings": [
        {
          "treatment": "transfer_composite",
          "outcome": "gini_households_q",
          "horizon": "4",
          "beta": "1.65271659654922e-08",
          "p_value": "6.51001222084906e-12",
          "q_value": "6.83551283189151e-10",
          "robust": "TRUE"
        },
        {
          "treatment": "transfer_composite",
          "outcome": "poverty_all_q",
          "horizon": "4",
          "beta": "1.94463299768093e-06",
          "p_value": "3.36741108810146e-09",
          "q_value": "1.76789082125327e-07",
          "robust": "TRUE"
        },
        {
          "treatment": "transfer_composite",
          "outcome": "poverty_child_q",
          "horizon": "4",
          "beta": "3.41941254589341e-06",
          "p_value": "1.53784654931706e-08",
          "q_value": "5.38246292260971e-07",
          "robust": "TRUE"
        },
        {
          "treatment": "transfer_composite",
          "outcome": "gini_households_q",
          "horizon": "2",
          "beta": "9.88156467708069e-09",
          "p_value": "4.24828691041706e-08",
          "q_value": "1.11517531398448e-06",
          "robust": "TRUE"
        },
        {
          "treatment": "transfer_composite",
          "outcome": "poverty_all_q",
          "horizon": "2",
          "beta": "1.12062632637146e-06",
          "p_value": "6.50143969364507e-07",
          "q_value": "1.36530233566546e-05",
          "robust": "TRUE"
        },
        {
          "treatment": "transfer_composite",
          "outcome": "poverty_child_q",
          "horizon": "2",
          "beta": "1.96448064464099e-06",
          "p_value": "4.553986187813e-06",
          "q_value": "7.96947582867275e-05",
          "robust": "TRUE"
        },
        {
          "treatment": "transfer_composite",
          "outcome": "wealth_share_gap_top1_bottom50",
          "horizon": "2",
          "beta": "2.06443990217345e-06",
          "p_value": "6.51812817137315e-05",
          "q_value": "0.000865627480980218",
          "robust": "TRUE"
        },
        {
          "treatment": "household_networth",
          "outcome": "wealth_share_gap_top1_bottom50",
          "horizon": "2",
          "beta": "1.09709592250939e-10",
          "p_value": "6.59525699794452e-05",
          "q_value": "0.000865627480980218",
          "robust": "TRUE"
        }
      ]
    }
  ],
  "confirmatory": {
    "discovery_enabled": "1",
    "iv_candidates": "9",
    "nc_candidates": "51",
    "manifest_ready": "6",
    "ready_confirmatory": [
      {
        "treatment": "transfer_composite",
        "outcome": "wealth_share_gap_top1_bottom50",
        "horizon": "4",
        "factor": "F1",
        "iv_candidate": "F1",
        "negative_control_candidate": "wealth_share_gap_top10_bottom50",
        "contract_status": "ready",
        "status": "ready_confirmatory",
        "p_value": "0.000179943555654677",
        "q_value": "0.00944703667187056"
      }
    ],
    "screening_only_ready": [
      {
        "treatment": "household_networth",
        "outcome": "gini_households_q",
        "horizon": "2",
        "factor": "F1",
        "iv_candidate": "F1",
        "negative_control_candidate": "wealth_share_gap_top1_bottom50",
        "contract_status": "ready",
        "status": "screening_only",
        "p_value": "0.139842443543884",
        "q_value": "0.99646741182828"
      },
      {
        "treatment": "home_equity",
        "outcome": "wealth_share_gap_top10_bottom50",
        "horizon": "2",
        "factor": "F1",
        "iv_candidate": "F1",
        "negative_control_candidate": "wealth_share_gap_top1_bottom50",
        "contract_status": "ready",
        "status": "screening_only",
        "p_value": "0.155780057158882",
        "q_value": "0.99646741182828"
      },
      {
        "treatment": "transfer_composite",
        "outcome": "median_real_income_fred_q",
        "horizon": "8",
        "factor": "F1",
        "iv_candidate": "F1",
        "negative_control_candidate": "wealth_share_gap_top10_bottom50",
        "contract_status": "ready",
        "status": "screening_only",
        "p_value": "0.300884467818414",
        "q_value": "0.99646741182828"
      },
      {
        "treatment": "transfer_composite",
        "outcome": "wealth_share_gap_top10_bottom50",
        "horizon": "8",
        "factor": "F1",
        "iv_candidate": "F1",
        "negative_control_candidate": "wealth_share_gap_top1_bottom50",
        "contract_status": "ready",
        "status": "screening_only",
        "p_value": "0.300884467818414",
        "q_value": "0.99646741182828"
      },
      {
        "treatment": "home_equity",
        "outcome": "wealth_share_gap_top1_bottom50",
        "horizon": "4",
        "factor": "F2",
        "iv_candidate": "F1",
        "negative_control_candidate": "wealth_share_gap_top10_bottom50",
        "contract_status": "ready",
        "status": "screening_only",
        "p_value": "0.570396747491653",
        "q_value": "0.99646741182828"
      }
    ]
  },
  "brief_markdown": "# Results Brief (2026-04-03)\n\n## Runs\n\n- Baseline both-suites run with canon v2 basket and expanded transfer/outcomes grid:\n  - `results/dass/poverty_consumption_baseline`\n  - `results/dass/poverty_outcomes_baseline`\n  - `results/dflmx/poverty_consumption_baseline`\n  - `results/dflmx/poverty_outcomes_baseline`\n- Full outcomes-suite run with repaired IV/NC screening:\n  - `results/dass/poverty_outcomes_full`\n  - `results/dflmx/poverty_outcomes_full`\n\n## What changed\n\n- Ported the `ea-gender` canon logic into this poverty project as a non-destructive `v2` basket:\n  - `pce_essential_v2_idx`\n  - `pce_discretionary_v2_idx`\n  - `pce_gap_v2 = log(E/D)`\n  - `pce_eshare_v2 = E / (E + D)`\n- Re-centered the consumption suite on the `v2` basket rather than the older mixed necessity/discretionary split.\n- Expanded the outcomes suite around transfer decomposition:\n  - `transfer_composite`\n  - `ui_benefits`\n  - `social_security`\n  - `snap_persons`\n  - plus secondary monetary/credit/wealth contrasts\n- Repaired DFLMX negative-control discovery so outcomes no longer self-nominate as their own NC candidates.\n- Enforced an allowlist for NC outcomes in the full outcomes suite:\n  - `wealth_share_gap_top10_bottom50`\n  - `wealth_share_gap_top1_bottom50`\n\n## Quality gates\n\n- CoFlow publication gates: pass\n- DASS contract manifests: fail=0\n- DFLMX regression checks: PASS\n- The required `econark-r` framework fixes are now upstream in `smkwray/econark` commit `7cb68eb`; the packaged project corresponds to that patched April 3, 2026 runtime state\n\n## High-level signals\n\n### Consumption suite (`dflmx-R/poverty_consumption_baseline`)\n\n- DFLMX robust rows (`q<=0.10`): `2`\n- Strongest v2 findings:\n  - `ui_benefits -> pce_gap_v2 (h=1)` with `q\u22482.0e-05`\n  - `ui_benefits -> pce_eshare_v2 (h=1)` with `q\u22487.3e-04`\n- Interpretation:\n  - the canon basket improves the consumption suite materially versus the prior `0` robust-row baseline\n  - the strongest surviving signal is concentrated in `ui_benefits`, not the broad transfer composite\n\n### Outcomes suite baseline (`dflmx-R/poverty_outcomes_baseline`)\n\n- DFLMX robust rows (`q<=0.10`): `11`\n- Headline pattern remains transfer-led:\n  - `transfer_composite -> gini_households_q` at `h=2,4,8`\n  - `transfer_composite -> poverty_all_q` at `h=2,4`\n  - `transfer_composite -> poverty_child_q` at `h=2,4`\n  - `transfer_composite -> wealth_share_gap_top1_bottom50` at `h=2,4`\n  - `transfer_composite -> median_real_income_fred_q` at `h=8`\n- Program-decomposition additions:\n  - `ui_benefits -> wealth_share_gap_top1_bottom50 (h=4)` is robust\n  - `ui_benefits` also shows sub-robust but suggestive rows on `gini_households_q` and `poverty_all_q`\n  - `snap_persons` is suggestive but not robust\n  - `social_security` remains weak in this screening pass\n\n### Outcomes suite full (`dflmx-R/poverty_outcomes`)\n\n- DFLMX robust rows (`q<=0.10`): `11`\n- The transfer headline survives the full run\n- Additional strong secondary row appears:\n  - `household_networth -> wealth_share_gap_top1_bottom50 (h=2)`\n\n## Confirmatory / IV-NC status\n\n- The NC miner fix worked:\n  - NC candidates now come from alternate allowlisted outcomes, not the focal outcome itself\n- Full outcomes discovery summary:\n  - `iv_candidates = 9`\n  - `nc_candidates = 51`\n  - `manifest_ready = 6`\n- Substantive limitation remains:\n  - most transfer poverty rows are still `insufficient_contract` because no allowlisted NC survives for those focal outcomes\n- The only `ready_confirmatory` row in this run is:\n  - `transfer_composite -> wealth_share_gap_top1_bottom50 (h=4)` using `F1` with `wealth_share_gap_top10_bottom50` as NC\n- Practical interpretation:\n  - poverty/inequality headline claims should still be framed as screening/reduced-form evidence\n  - the repaired confirmatory layer is cleaner, but it is not yet strong enough to support a broad causal claim\n\n## Packaging recommendation for `ea-ineq`\n\n- Ready to package:\n  - yes; the archive is already aligned to the patched runtime state now upstreamed in `smkwray/econark` commit `7cb68eb`\n- Headline archive focus:\n  - poverty/inequality outcomes suite first\n  - canon v2 consumption suite second\n- Methods note to carry into the archive:\n  - `econark-r` required stage/config/NC fixes, now upstreamed in `smkwray/econark`, before this project could run cleanly end-to-end\n"
};
