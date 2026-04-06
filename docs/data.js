const DATA = {
  "meta": {
    "title": "Fiscal Transfers, Poverty, Inequality, and Consumption Composition",
    "subtitle": "Project-specific archive built on econark\u2019s R pipeline",
    "archive_date": "2026-04-06",
    "econark_commit": "7cb68eb"
  },
  "snapshot": {
    "headline_robust": 11,
    "consumption_robust": 2,
    "transfer_rows": 10,
    "distinct_outcomes": 5,
    "distinct_treatments": 2,
    "confirmatory_ready": 1,
    "dass_estimators": [
      "LP",
      "DML",
      "TMLE",
      "CF",
      "LP-IV",
      "DML-IV"
    ]
  },
  "overview": {
    "headline_stat": "11 robust rows",
    "headline_label": "10 are transfer-composite rows, covering 5 distinct poverty or inequality outcomes.",
    "takeaway": "Transfers are the dominant story in this archive. The transfer composite drives robust responses in poverty, child poverty, household inequality, and the wealth-share gap. UI benefits serve as the strongest internal cross-suite link, appearing in both distributional outcomes and the consumption-composition block. The canon v2 consumption basket adds a secondary result: UI benefits tilt spending toward essentials one quarter out."
  },
  "questions": [
    {
      "tag": "Q1",
      "tier": "headline",
      "title": "Do transfer shocks move poverty and inequality outcomes?",
      "description": "Archive headline. The full outcomes run is dominated by transfer-composite responses across poverty, child poverty, inequality, and wealth-gap outcomes."
    },
    {
      "tag": "Q2",
      "tier": "secondary",
      "title": "Which transfer programs matter individually?",
      "description": "UI benefits is the strongest individual-program result inside this archive. SNAP participation is stable-suggestive. Social Security is method-dependent."
    },
    {
      "tag": "Q3",
      "tier": "secondary",
      "title": "Do shocks shift essential versus discretionary spending?",
      "description": "The canon v2 basket ports the essential-versus-discretionary logic from ea-gender. UI benefits shifts the spending balance one quarter out."
    },
    {
      "tag": "Q4",
      "tier": "suggestive",
      "title": "How do rates, credit, and wealth compare with transfers?",
      "description": "Fed funds, credit conditions, and household net worth are included as contrasts. They do not dominate the archive the way transfers do."
    },
    {
      "tag": "Q5",
      "tier": "methods",
      "title": "How much of this survives the confirmatory layer?",
      "description": "Confirmatory coverage is narrower than screening evidence. One row achieves ready-confirmatory status."
    }
  ],
  "key_variables": [
    {
      "name": "transfer_composite",
      "display": "Transfer Composite",
      "definition": "Broad transfer-support measure combining government transfers, Social Security, and unemployment insurance."
    },
    {
      "name": "ui_benefits",
      "display": "UI Benefits",
      "definition": "Unemployment-insurance transfer flow. Appears in both distributional-outcomes and consumption-composition suites."
    },
    {
      "name": "snap_persons",
      "display": "SNAP Participation",
      "definition": "Supplemental Nutrition Assistance Program beneficiary count proxy."
    },
    {
      "name": "social_security",
      "display": "Social Security",
      "definition": "Social Security payment flow. Shows DASS support but does not survive LP-based DFLMX screening."
    },
    {
      "name": "poverty_all_q",
      "display": "Overall Poverty Rate",
      "definition": "Quarterly poverty rate for the full population."
    },
    {
      "name": "poverty_child_q",
      "display": "Child Poverty Rate",
      "definition": "Quarterly poverty rate for children."
    },
    {
      "name": "gini_households_q",
      "display": "Household Gini",
      "definition": "Quarterly household-level inequality measure."
    },
    {
      "name": "median_real_income_fred_q",
      "display": "Median Real Income",
      "definition": "Quarterly median real income from FRED."
    },
    {
      "name": "wealth_share_gap_top1_bottom50",
      "display": "Top 1% vs Bottom 50% Wealth Gap",
      "definition": "Difference between top-1% and bottom-50% wealth shares."
    },
    {
      "name": "wealth_share_gap_top10_bottom50",
      "display": "Top 10% vs Bottom 50% Wealth Gap",
      "definition": "Difference between top-10% and bottom-50% wealth shares."
    },
    {
      "name": "pce_essential_v2_idx",
      "display": "Essential Spending Index",
      "definition": "Canon v2 basket: CE-weighted housing, food, and healthcare."
    },
    {
      "name": "pce_discretionary_v2_idx",
      "display": "Discretionary Spending Index",
      "definition": "Canon v2 basket: CE-weighted recreation, transport, and clothing."
    },
    {
      "name": "pce_gap_v2",
      "display": "Essential vs Discretionary Gap",
      "definition": "Log ratio of essential to discretionary spending, log(E/D)."
    },
    {
      "name": "pce_eshare_v2",
      "display": "Essential Spending Share",
      "definition": "Essential spending as a share of essential plus discretionary, E/(E+D)."
    }
  ],
  "hierarchy": [
    {
      "treatment": "transfer_composite",
      "label": "Transfer Composite",
      "tier": "headline",
      "description": "Dominant signal across all poverty and inequality outcomes. 10 of 11 robust rows.",
      "robust_count": 10,
      "near_count": 2,
      "outcomes_covered": [
        "poverty_child_q",
        "poverty_all_q",
        "gini_households_q",
        "median_real_income_fred_q",
        "wealth_share_gap_top1_bottom50"
      ],
      "diagnostic": {
        "lp_sig": 2,
        "lp_total": 12,
        "dml_sig": 6,
        "dml_total": 12
      }
    },
    {
      "treatment": "ui_benefits",
      "label": "UI Benefits",
      "tier": "bridge",
      "description": "Cross-suite bridge: appears in both distributional-outcomes and consumption-composition suites.",
      "robust_count": 0,
      "near_count": 3,
      "outcomes_covered": [],
      "diagnostic": {
        "lp_sig": 4,
        "lp_total": 12,
        "dml_sig": 5,
        "dml_total": 12
      }
    },
    {
      "treatment": "snap_persons",
      "label": "SNAP Participation",
      "tier": "suggestive",
      "description": "Near the FDR boundary. Survives targeted DASS shock diagnostics but does not clear DFLMX FDR.",
      "robust_count": 0,
      "near_count": 1,
      "outcomes_covered": [],
      "diagnostic": {
        "lp_sig": 8,
        "lp_total": 12,
        "dml_sig": 5,
        "dml_total": 12
      }
    },
    {
      "treatment": "social_security",
      "label": "Social Security",
      "tier": "appendix",
      "description": "Support in DASS (especially DML) but not in LP-based DFLMX. Method-dependent.",
      "robust_count": 0,
      "near_count": 0,
      "outcomes_covered": [],
      "diagnostic": {
        "lp_sig": 6,
        "lp_total": 12,
        "dml_sig": 5,
        "dml_total": 12
      }
    }
  ],
  "headline_findings": [
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "treatment_tier": "headline",
      "outcome": "gini_households_q",
      "outcome_label": "Household Gini",
      "horizon": 4,
      "beta": 1.65271659654922e-08,
      "se": 2.18848312685905e-09,
      "ci_low": 1.22377390368484e-08,
      "ci_high": 2.08165928941359e-08,
      "p_value": 6.51001222084906e-12,
      "q_value": 6.83551283189151e-10,
      "r2": 0.865275372313606,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": true,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 3,
        "nominal_sig_count": 2,
        "supportive_count": 1,
        "consensus": "directional support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": 2.78640730578539e-08,
            "ci_low": 1.13087397995208e-08,
            "ci_high": 4.4419406316187e-08,
            "p_value": 0.00136730561823652,
            "q_bh": 0.00633384220212506,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": 1.17485614535847e-08,
            "ci_low": -1.33726610780519e-08,
            "ci_high": 3.68697839852214e-08,
            "p_value": 0.360929114276733,
            "q_bh": 0.475701552289418,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": -0.0452738105984677,
            "ci_low": -0.0853054373223187,
            "ci_high": -0.00524218387461674,
            "p_value": 0.0266460555393168,
            "q_bh": 0.0687992417613508,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": true
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": 1.05110608164951e-07,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "Transfer Composite \u2192 Household Gini (h=4)",
      "lead_p": 6.51001222084906e-12,
      "lead_reject": true,
      "episode_all_pass": true,
      "episode_any_flip": false,
      "confirmatory_status": "insufficient_contract",
      "confirmatory_contract": "insufficient_candidates"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "treatment_tier": "headline",
      "outcome": "poverty_all_q",
      "outcome_label": "Overall Poverty Rate",
      "horizon": 4,
      "beta": 1.94463299768093e-06,
      "se": 3.06561336275569e-07,
      "ci_low": 1.34377277858081e-06,
      "ci_high": 2.54549321678105e-06,
      "p_value": 3.36741108810146e-09,
      "q_value": 1.76789082125327e-07,
      "r2": 0.826382145624947,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": true,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 3,
        "nominal_sig_count": 2,
        "supportive_count": 1,
        "consensus": "directional support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": 9.1350910959616e-09,
            "ci_low": -2.60835597489719e-06,
            "ci_high": 2.62662615708911e-06,
            "p_value": 0.99455650879319,
            "q_bh": 0.99455650879319,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": -4.40779702592666e-06,
            "ci_low": -8.48538323435882e-06,
            "ci_high": -3.30210817494499e-07,
            "p_value": 0.0359053410390033,
            "q_bh": 0.086337270437298,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": true
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": 5.95319448704956,
            "ci_low": 2.18350101113905,
            "ci_high": 9.72288796296007,
            "p_value": 0.00196626411342814,
            "q_bh": 0.00836990805040357,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": 6.78460533013563e-06,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "Transfer Composite \u2192 Overall Poverty Rate (h=4)",
      "lead_p": 3.36741108810146e-09,
      "lead_reject": true,
      "episode_all_pass": true,
      "episode_any_flip": false,
      "confirmatory_status": "insufficient_contract",
      "confirmatory_contract": "insufficient_candidates"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "treatment_tier": "headline",
      "outcome": "poverty_child_q",
      "outcome_label": "Child Poverty Rate",
      "horizon": 4,
      "beta": 3.41941254589341e-06,
      "se": 5.66712062286966e-07,
      "ci_low": 2.30865690381095e-06,
      "ci_high": 4.53016818797586e-06,
      "p_value": 1.53784654931706e-08,
      "q_value": 5.38246292260971e-07,
      "r2": 0.871444207596058,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": true,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 2,
        "nominal_sig_count": 2,
        "supportive_count": 1,
        "consensus": "directional support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": -1.59152039208657e-07,
            "ci_low": -3.9904621065941e-06,
            "ci_high": 3.67215802817678e-06,
            "p_value": 0.935280740415047,
            "q_bh": 0.956537120879025,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": false
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": -5.62577164843058e-06,
            "ci_low": -1.05632154069027e-05,
            "ci_high": -6.88327889958456e-07,
            "p_value": 0.027142878032507,
            "q_bh": 0.069512248619835,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": true
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": 10.6377549487787,
            "ci_low": 4.34540582792025,
            "ci_high": 16.9301040696372,
            "p_value": 0.00092120353629663,
            "q_bh": 0.00453404865520998,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": 7.34849086758601e-06,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "Transfer Composite \u2192 Child Poverty Rate (h=4)",
      "lead_p": 1.53784654931706e-08,
      "lead_reject": true,
      "episode_all_pass": true,
      "episode_any_flip": false,
      "confirmatory_status": "insufficient_contract",
      "confirmatory_contract": "insufficient_candidates"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "treatment_tier": "headline",
      "outcome": "gini_households_q",
      "outcome_label": "Household Gini",
      "horizon": 2,
      "beta": 9.88156467708069e-09,
      "se": 1.69885292182346e-09,
      "ci_low": 6.55181295030671e-09,
      "ci_high": 1.32113164038547e-08,
      "p_value": 4.24828691041706e-08,
      "q_value": 1.11517531398448e-06,
      "r2": 0.956915365726201,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": true,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 4,
        "nominal_sig_count": 2,
        "supportive_count": 2,
        "consensus": "multi-estimator support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": 2.21468593711713e-08,
            "ci_low": 8.41215496377277e-09,
            "ci_high": 3.58815637785699e-08,
            "p_value": 0.00210175514618425,
            "q_bh": 0.00882737161397385,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": 1.14904001699981e-08,
            "ci_low": -3.21218512966351e-10,
            "ci_high": 2.33020188529626e-08,
            "p_value": 0.0586086288076069,
            "q_bh": 0.122263033605273,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": 0.021361259060771,
            "ci_low": -0.0130863814895452,
            "ci_high": 0.0558088996110872,
            "p_value": 0.224209081318646,
            "q_bh": 0.331576810400814,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": 6.15536924487774e-08,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "Transfer Composite \u2192 Household Gini (h=2)",
      "lead_p": 4.24828691041706e-08,
      "lead_reject": true,
      "episode_all_pass": true,
      "episode_any_flip": false
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "treatment_tier": "headline",
      "outcome": "poverty_all_q",
      "outcome_label": "Overall Poverty Rate",
      "horizon": 2,
      "beta": 1.12062632637146e-06,
      "se": 2.14388896797793e-07,
      "ci_low": 7.00424088647783e-07,
      "ci_high": 1.54082856409513e-06,
      "p_value": 6.50143969364507e-07,
      "q_value": 1.36530233566546e-05,
      "r2": 0.929875513745829,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": true,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 2,
        "nominal_sig_count": 1,
        "supportive_count": 1,
        "consensus": "directional support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": -1.29822232798334e-06,
            "ci_low": -3.43398040955523e-06,
            "ci_high": 8.37535753588555e-07,
            "p_value": 0.236408431071306,
            "q_bh": 0.343173528974476,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": false
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": -2.26428797069609e-06,
            "ci_low": -5.09856669928423e-06,
            "ci_high": 5.69990757892042e-07,
            "p_value": 0.119645513655939,
            "q_bh": 0.21054936760682,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": false
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": 6.04241502809973,
            "ci_low": 2.5692031108968,
            "ci_high": 9.51562694530267,
            "p_value": 0.000649984942218355,
            "q_bh": 0.00347025858980986,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": 3.01085926084349e-06,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "Transfer Composite \u2192 Overall Poverty Rate (h=2)",
      "lead_p": 6.50143969364507e-07,
      "lead_reject": true,
      "episode_all_pass": true,
      "episode_any_flip": false
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "treatment_tier": "headline",
      "outcome": "poverty_child_q",
      "outcome_label": "Child Poverty Rate",
      "horizon": 2,
      "beta": 1.96448064464099e-06,
      "se": 4.10881491707341e-07,
      "ci_low": 1.1591529208946e-06,
      "ci_high": 2.76980836838738e-06,
      "p_value": 4.553986187813e-06,
      "q_value": 7.96947582867275e-05,
      "r2": 0.95147104994832,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": true,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 2,
        "nominal_sig_count": 2,
        "supportive_count": 1,
        "consensus": "directional support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": -2.51233313775352e-06,
            "ci_low": -5.75230436500423e-06,
            "ci_high": 7.27638089497203e-07,
            "p_value": 0.131809197702901,
            "q_bh": 0.223968725785267,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": false
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": -2.60960682471287e-06,
            "ci_low": -5.64731293417821e-06,
            "ci_high": 4.28099284752472e-07,
            "p_value": 0.0944525729089514,
            "q_bh": 0.171984910106703,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": true
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": 8.14079941944221,
            "ci_low": 2.74476285917006,
            "ci_high": 13.5368359797144,
            "p_value": 0.00310669262578913,
            "q_bh": 0.0118346836090345,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": 4.0286651776671e-06,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "Transfer Composite \u2192 Child Poverty Rate (h=2)",
      "lead_p": 4.553986187813e-06,
      "lead_reject": true,
      "episode_all_pass": true,
      "episode_any_flip": false
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "treatment_tier": "headline",
      "outcome": "wealth_share_gap_top1_bottom50",
      "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
      "horizon": 2,
      "beta": 2.06443990217345e-06,
      "se": 5.00580324332083e-07,
      "ci_low": 1.08330246648257e-06,
      "ci_high": 3.04557733786434e-06,
      "p_value": 6.51812817137315e-05,
      "q_value": 0.000865627480980218,
      "r2": 0.961113749122024,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": true,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 2,
        "nominal_sig_count": 1,
        "supportive_count": 1,
        "consensus": "directional support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": -6.5003633639342e-08,
            "ci_low": -3.13087097056659e-06,
            "ci_high": 3.0008637032879e-06,
            "p_value": 0.966937564815962,
            "q_bh": 0.976235041400731,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": false
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": 2.10261640028152e-06,
            "ci_low": -6.76708975764954e-07,
            "ci_high": 4.881941776328e-06,
            "p_value": 0.140380456948195,
            "q_bh": 0.230311687180632,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": 7.76791445162571,
            "ci_low": 0.115539089718535,
            "ci_high": 15.4202898135329,
            "p_value": 0.0466357897344039,
            "q_bh": 0.102733266291336,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": -4.67963382481306e-06,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "Transfer Composite \u2192 Top 1% vs Bottom 50% Wealth Gap (h=2)",
      "lead_p": 6.51812817137315e-05,
      "lead_reject": true,
      "episode_all_pass": true,
      "episode_any_flip": false
    },
    {
      "treatment": "household_networth",
      "treatment_label": "Household Net Worth",
      "treatment_tier": "contrast",
      "outcome": "wealth_share_gap_top1_bottom50",
      "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
      "horizon": 2,
      "beta": 1.09709592250939e-10,
      "se": 2.66218457070904e-11,
      "ci_low": 5.75307746650414e-11,
      "ci_high": 1.61888409836836e-10,
      "p_value": 6.59525699794452e-05,
      "q_value": 0.000865627480980218,
      "r2": 0.964520426246874,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": true,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 2,
        "nominal_sig_count": 2,
        "supportive_count": 2,
        "consensus": "multi-estimator support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": 1.16808852193711e-10,
            "ci_low": 1.40740457144218e-11,
            "ci_high": 2.19543658673001e-10,
            "p_value": 0.0281558587689297,
            "q_bh": 0.0709527640977028,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": -4.96975469905051e-11,
            "ci_low": -1.60820186486716e-10,
            "ci_high": 6.14250925057054e-11,
            "p_value": 0.382219805542259,
            "q_bh": 0.497833034621515,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": false
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": 7.76791445162571,
            "ci_low": 0.115539089718535,
            "ci_high": 15.4202898135329,
            "p_value": 0.0466357897344039,
            "q_bh": 0.102733266291336,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": -8.31330947649004e-11,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "Household Net Worth \u2192 Top 1% vs Bottom 50% Wealth Gap (h=2)",
      "lead_p": 6.59525699794452e-05,
      "lead_reject": true,
      "episode_all_pass": true,
      "episode_any_flip": false
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "treatment_tier": "headline",
      "outcome": "wealth_share_gap_top1_bottom50",
      "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
      "horizon": 4,
      "beta": 2.24970939782917e-06,
      "se": 5.83450436710765e-07,
      "ci_low": 1.10614654187607e-06,
      "ci_high": 3.39327225378227e-06,
      "p_value": 0.000179943555654677,
      "q_value": 0.0020993414826379,
      "r2": 0.926376629717418,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": true,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 2,
        "nominal_sig_count": 1,
        "supportive_count": 1,
        "consensus": "directional support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": 2.60630776187767e-06,
            "ci_low": -2.54293584734644e-07,
            "ci_high": 5.46690910848998e-06,
            "p_value": 0.0773280486708248,
            "q_bh": 0.152239595820686,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": -9.06816670541484e-07,
            "ci_low": -3.79119192812686e-06,
            "ci_high": 1.97755858704389e-06,
            "p_value": 0.538775655488876,
            "q_bh": 0.645085530701879,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": false
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": 4.78613980997262,
            "ci_low": -7.14044078251416,
            "ci_high": 16.7127204024594,
            "p_value": 0.431546219336143,
            "q_bh": 0.552589671101159,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": -9.39854611708133e-06,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "Transfer Composite \u2192 Top 1% vs Bottom 50% Wealth Gap (h=4)",
      "lead_p": 0.000179943555654677,
      "lead_reject": true,
      "episode_all_pass": true,
      "episode_any_flip": false,
      "confirmatory_status": "ready_confirmatory",
      "confirmatory_contract": "ready"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "treatment_tier": "headline",
      "outcome": "gini_households_q",
      "outcome_label": "Household Gini",
      "horizon": 8,
      "beta": 1.10917747235986e-08,
      "se": 2.97290278507517e-09,
      "ci_low": 5.26488526485131e-09,
      "ci_high": 1.6918664182346e-08,
      "p_value": 0.000286407258513702,
      "q_value": 0.00300727621439387,
      "r2": 0.790896535448532,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": true,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 2,
        "nominal_sig_count": 1,
        "supportive_count": 1,
        "consensus": "directional support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": -4.42478521185793e-09,
            "ci_low": -2.07729520212726e-08,
            "ci_high": 1.19233815975568e-08,
            "p_value": 0.597048734311903,
            "q_bh": 0.690717167766294,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": false
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": -7.5722829228585e-10,
            "ci_low": -1.1780078931029e-08,
            "ci_high": 1.02656223464573e-08,
            "p_value": 0.893094897274398,
            "q_bh": 0.925410831057353,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": false
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": 0.158036482911521,
            "ci_low": 0.0284246376616396,
            "ci_high": 0.287648328161403,
            "p_value": 0.0168557374341925,
            "q_bh": 0.0491719321789655,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": 9.14536588974526e-08,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "Transfer Composite \u2192 Household Gini (h=8)",
      "lead_p": 0.000286407258513702,
      "lead_reject": true,
      "episode_all_pass": true,
      "episode_any_flip": false
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "treatment_tier": "headline",
      "outcome": "median_real_income_fred_q",
      "outcome_label": "Median Real Income",
      "horizon": 8,
      "beta": -0.00514925208371746,
      "se": 0.0016011537239398,
      "ci_low": -0.00828751338263947,
      "ci_high": -0.00201099078479546,
      "p_value": 0.00164916625469235,
      "q_value": 0.0157420415220633,
      "r2": 0.803946941247167,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": true,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 0,
        "nominal_sig_count": 0,
        "supportive_count": 0,
        "consensus": "mixed",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": 0.00367442174307868,
            "ci_low": -0.00249394907945975,
            "ci_high": 0.0098427925656171,
            "p_value": 0.246006346276662,
            "q_bh": 0.355467885674993,
            "sign": "positive",
            "sign_match": false,
            "nominal_sig": false
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": 0.00594148304403904,
            "ci_low": -0.00725820774849387,
            "ci_high": 0.019141173836572,
            "p_value": 0.379226437602125,
            "q_bh": 0.497734699352789,
            "sign": "positive",
            "sign_match": false,
            "nominal_sig": false
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": 740.84349978731,
            "ci_low": -5687.7109211962,
            "ci_high": 7169.39792077082,
            "p_value": 0.821298215410048,
            "q_bh": 0.879962373653623,
            "sign": "positive",
            "sign_match": false,
            "nominal_sig": false
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": 0.0524844637290769,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "positive",
            "sign_match": false,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "Transfer Composite \u2192 Median Real Income (h=8)",
      "lead_p": 0.00164916625469235,
      "lead_reject": true,
      "episode_all_pass": true,
      "episode_any_flip": false,
      "confirmatory_status": "screening_only",
      "confirmatory_contract": "ready"
    }
  ],
  "secondary_findings": [
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "treatment_tier": "headline",
      "outcome": "poverty_all_q",
      "outcome_label": "Overall Poverty Rate",
      "horizon": 8,
      "beta": 1.8082243168973e-06,
      "se": 7.36055543685653e-07,
      "ci_low": 3.65555451273419e-07,
      "ci_high": 3.25089318252118e-06,
      "p_value": 0.0153748252916479,
      "q_value": 0.134529721301919,
      "r2": 0.559993884829675,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": false,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 1,
        "nominal_sig_count": 1,
        "supportive_count": 0,
        "consensus": "mixed",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": -2.87048328838805e-06,
            "ci_low": -4.80086879540403e-06,
            "ci_high": -9.40097781372076e-07,
            "p_value": 0.00447280819456984,
            "q_bh": 0.0160106202419261,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": -1.73831381220821e-06,
            "ci_low": -6.64754072219876e-06,
            "ci_high": 3.17091309778234e-06,
            "p_value": 0.488871916807061,
            "q_bh": 0.598181888108711,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": false
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": 0.29639905239744,
            "ci_low": -1.72221081591639,
            "ci_high": 2.31500892071127,
            "p_value": 0.773505062162803,
            "q_bh": 0.834431830757818,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": -1.01215637256517e-06,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "Transfer Composite \u2192 Overall Poverty Rate (h=8)",
      "lead_p": 0.0153748252916479,
      "lead_reject": true,
      "episode_all_pass": true,
      "episode_any_flip": false
    },
    {
      "treatment": "ui_benefits",
      "treatment_label": "UI Benefits",
      "treatment_tier": "bridge",
      "outcome": "gini_households_q",
      "outcome_label": "Household Gini",
      "horizon": 2,
      "beta": 5.42920399389045e-08,
      "se": 2.2819316368489e-08,
      "ci_low": 9.56617985666601e-09,
      "ci_high": 9.90179000211431e-08,
      "p_value": 0.0187703941208803,
      "q_value": 0.151607029437879,
      "r2": 0.955222933370193,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": false,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 3,
        "nominal_sig_count": 2,
        "supportive_count": 2,
        "consensus": "multi-estimator support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": 1.00192548955092e-07,
            "ci_low": -6.19205211472165e-09,
            "ci_high": 2.06577150024905e-07,
            "p_value": 0.0679537967639696,
            "q_bh": 0.135477506206648,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": 5.77038023420095e-08,
            "ci_low": -9.46670204495125e-09,
            "ci_high": 1.2487430672897e-07,
            "p_value": 0.0944552045982846,
            "q_bh": 0.171984910106703,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": -0.0202122044957461,
            "ci_low": -0.0942159953325002,
            "ci_high": 0.0537915863410081,
            "p_value": 0.592426622897046,
            "q_bh": 0.688613971264094,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": false
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": 5.59803239458502e-07,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "UI Benefits \u2192 Household Gini (h=2)",
      "lead_p": 0.0187703941208803,
      "lead_reject": true,
      "episode_all_pass": true,
      "episode_any_flip": false
    },
    {
      "treatment": "household_networth",
      "treatment_label": "Household Net Worth",
      "treatment_tier": "contrast",
      "outcome": "wealth_share_gap_top10_bottom50",
      "outcome_label": "Top 10% vs Bottom 50% Wealth Gap",
      "horizon": 4,
      "beta": -5.94527626573464e-11,
      "se": 2.54137580828223e-11,
      "ci_low": -1.09263728499678e-10,
      "ci_high": -9.64179681501475e-12,
      "p_value": 0.0208274418667397,
      "q_value": 0.156205814000548,
      "r2": 0.941553504835294,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": false,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 2,
        "nominal_sig_count": 3,
        "supportive_count": 2,
        "consensus": "multi-estimator support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": -2.04470651357863e-10,
            "ci_low": -3.25650820452197e-10,
            "ci_high": -8.32904822635293e-11,
            "p_value": 0.00133147600880264,
            "q_bh": 0.00628620150377459,
            "sign": "negative",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": -3.13692568810591e-10,
            "ci_low": -5.1433145907114e-10,
            "ci_high": -1.13053678550043e-10,
            "p_value": 0.00262385795652181,
            "q_bh": 0.0104622184342325,
            "sign": "negative",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": 13.0707625919727,
            "ci_low": 5.68228679107428,
            "ci_high": 20.4592383928712,
            "p_value": 0.000525547370945236,
            "q_bh": 0.00300995312450453,
            "sign": "positive",
            "sign_match": false,
            "nominal_sig": true
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": 1.4755611877051e-10,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "positive",
            "sign_match": false,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "Household Net Worth \u2192 Top 10% vs Bottom 50% Wealth Gap (h=4)",
      "lead_p": 0.0208274418667397,
      "lead_reject": true,
      "episode_all_pass": true,
      "episode_any_flip": false
    },
    {
      "treatment": "revolving_credit",
      "treatment_label": "Revolving Credit",
      "treatment_tier": "contrast",
      "outcome": "poverty_all_q",
      "outcome_label": "Overall Poverty Rate",
      "horizon": 2,
      "beta": -4.08135278086229e-09,
      "se": 1.81237630686773e-09,
      "ci_low": -7.63361034232305e-09,
      "ci_high": -5.2909521940153e-10,
      "p_value": 0.0259657089022917,
      "q_value": 0.181759962316042,
      "r2": 0.927357890295737,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": false,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 2,
        "nominal_sig_count": 1,
        "supportive_count": 0,
        "consensus": "directional support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": -3.80847326628021e-09,
            "ci_low": -1.59926142775295e-08,
            "ci_high": 8.37566774496906e-09,
            "p_value": 0.541541798758511,
            "q_bh": 0.645085530701879,
            "sign": "negative",
            "sign_match": true,
            "nominal_sig": false
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": 1.09369987918477e-09,
            "ci_low": -1.23402564857407e-08,
            "ci_high": 1.45276562441102e-08,
            "p_value": 0.873450068011089,
            "q_bh": 0.917122571411644,
            "sign": "positive",
            "sign_match": false,
            "nominal_sig": false
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": 43.773908826973,
            "ci_low": 4.87725981011472,
            "ci_high": 82.6705578438313,
            "p_value": 0.0274004683958627,
            "q_bh": 0.0696060285862641,
            "sign": "positive",
            "sign_match": false,
            "nominal_sig": true
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": -1.05273152550493e-08,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "negative",
            "sign_match": true,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "Revolving Credit \u2192 Overall Poverty Rate (h=2)",
      "lead_p": 0.0259657089022917,
      "lead_reject": true,
      "episode_all_pass": true,
      "episode_any_flip": false
    },
    {
      "treatment": "ui_benefits",
      "treatment_label": "UI Benefits",
      "treatment_tier": "bridge",
      "outcome": "gini_households_q",
      "outcome_label": "Household Gini",
      "horizon": 4,
      "beta": 8.67268656206855e-08,
      "se": 3.90735992662137e-08,
      "ci_low": 1.01426110589067e-08,
      "ci_high": 1.63311120182464e-07,
      "p_value": 0.0281676183075565,
      "q_value": 0.18484999514334,
      "r2": 0.858993624380512,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": false,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 4,
        "nominal_sig_count": 3,
        "supportive_count": 3,
        "consensus": "multi-estimator support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": 1.49315631542906e-07,
            "ci_low": 2.22589349794048e-08,
            "ci_high": 2.76372328106407e-07,
            "p_value": 0.0234388617039667,
            "q_bh": 0.0627138233506973,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": 1.07285032849703e-07,
            "ci_low": 1.68988229890128e-08,
            "ci_high": 1.97671242710394e-07,
            "p_value": 0.021451006799784,
            "q_bh": 0.0585473111753904,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": 0.178489885424593,
            "ci_low": 0.0588394276011801,
            "ci_high": 0.298140343248006,
            "p_value": 0.00345729594101127,
            "q_bh": 0.0128123320166888,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": 5.39508532340995e-07,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "UI Benefits \u2192 Household Gini (h=4)",
      "lead_p": 0.0281676183075565,
      "lead_reject": true,
      "episode_all_pass": true,
      "episode_any_flip": false
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "treatment_tier": "headline",
      "outcome": "poverty_child_q",
      "outcome_label": "Child Poverty Rate",
      "horizon": 8,
      "beta": 3.09238232640632e-06,
      "se": 1.41417748623197e-06,
      "ci_low": 3.20594453391653e-07,
      "ci_high": 5.86417019942098e-06,
      "p_value": 0.0305966375221101,
      "q_value": 0.188979231754209,
      "r2": 0.65008020949884,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": false,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 2,
        "nominal_sig_count": 2,
        "supportive_count": 1,
        "consensus": "directional support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": -4.66512202094005e-06,
            "ci_low": -7.55860376285916e-06,
            "ci_high": -1.77164027902095e-06,
            "p_value": 0.00213524087214111,
            "q_bh": 0.00885001150953223,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": -4.32087484955851e-06,
            "ci_low": -1.08809931717219e-05,
            "ci_high": 2.23924347260492e-06,
            "p_value": 0.198936915422602,
            "q_bh": 0.309358042167569,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": false
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": 4.17591055889517,
            "ci_low": 1.48758366530018,
            "ci_high": 6.86423745249016,
            "p_value": 0.00233017438260283,
            "q_bh": 0.00941031962204989,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": 8.95247726249924e-07,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "Transfer Composite \u2192 Child Poverty Rate (h=8)",
      "lead_p": 0.0305966375221101,
      "lead_reject": true,
      "episode_all_pass": true,
      "episode_any_flip": false
    },
    {
      "treatment": "ui_benefits",
      "treatment_label": "UI Benefits",
      "treatment_tier": "bridge",
      "outcome": "poverty_all_q",
      "outcome_label": "Overall Poverty Rate",
      "horizon": 4,
      "beta": 9.84587991941564e-06,
      "se": 4.62959187393614e-06,
      "ci_low": 7.71879846500815e-07,
      "ci_high": 1.89198799923305e-05,
      "p_value": 0.0353177032879282,
      "q_value": 0.206019935846248,
      "r2": 0.817655165230761,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": false,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 2,
        "nominal_sig_count": 2,
        "supportive_count": 1,
        "consensus": "directional support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": -1.03427005713146e-05,
            "ci_low": -2.92677371467224e-05,
            "ci_high": 8.58233600409312e-06,
            "p_value": 0.286812439301806,
            "q_bh": 0.401537415022528,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": false
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": 4.31080745611609e-05,
            "ci_low": 6.75909686094938e-06,
            "ci_high": 7.94570522613724e-05,
            "p_value": 0.0215602796709374,
            "q_bh": 0.0585473111753904,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": -63.948917059952,
            "ci_low": -96.0474958898116,
            "ci_high": -31.8503382300924,
            "p_value": 9.4286982202206e-05,
            "q_bh": 0.000848582839819854,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": true
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": 3.48238158648037e-05,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "UI Benefits \u2192 Overall Poverty Rate (h=4)",
      "lead_p": 0.0353177032879282,
      "lead_reject": true,
      "episode_all_pass": true,
      "episode_any_flip": false
    },
    {
      "treatment": "household_networth",
      "treatment_label": "Household Net Worth",
      "treatment_tier": "contrast",
      "outcome": "wealth_share_gap_top1_bottom50",
      "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
      "horizon": 4,
      "beta": 6.55912080404378e-11,
      "se": 3.19753114586177e-11,
      "ci_low": 2.91959758154715e-12,
      "ci_high": 1.28262818499328e-10,
      "p_value": 0.0422300419832876,
      "q_value": 0.22170772041226,
      "r2": 0.92982063677862,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": false,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 3,
        "nominal_sig_count": 1,
        "supportive_count": 0,
        "consensus": "directional support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": 3.98596969550105e-11,
            "ci_low": -7.28589610430822e-11,
            "ci_high": 1.52578354953103e-10,
            "p_value": 0.489939451212849,
            "q_bh": 0.598181888108711,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": -1.95994902666557e-10,
            "ci_low": -3.80937516489346e-10,
            "ci_high": -1.10522888437674e-11,
            "p_value": 0.0396435226422055,
            "q_bh": 0.0931918629275726,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": true
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": 4.78613980997262,
            "ci_low": -7.14044078251416,
            "ci_high": 16.7127204024594,
            "p_value": 0.431546219336143,
            "q_bh": 0.552589671101159,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": 1.78971991111866e-10,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "Household Net Worth \u2192 Top 1% vs Bottom 50% Wealth Gap (h=4)",
      "lead_p": 0.0422300419832876,
      "lead_reject": true,
      "episode_all_pass": true,
      "episode_any_flip": false
    },
    {
      "treatment": "household_networth",
      "treatment_label": "Household Net Worth",
      "treatment_tier": "contrast",
      "outcome": "wealth_share_gap_top10_bottom50",
      "outcome_label": "Top 10% vs Bottom 50% Wealth Gap",
      "horizon": 2,
      "beta": -3.15724686134103e-11,
      "se": 1.52856881457871e-11,
      "ci_low": -6.1532417379153e-11,
      "ci_high": -1.6125198476676e-12,
      "p_value": 0.040818196486757,
      "q_value": 0.22170772041226,
      "r2": 0.975007723202128,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": false,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 3,
        "nominal_sig_count": 2,
        "supportive_count": 2,
        "consensus": "multi-estimator support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": -2.05704143800878e-10,
            "ci_low": -3.18398032903353e-10,
            "ci_high": -9.30102546984027e-11,
            "p_value": 0.000543079576335595,
            "q_bh": 0.00305482261688772,
            "sign": "negative",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": -2.56111876863541e-10,
            "ci_low": -3.78329045630073e-10,
            "ci_high": -1.33894708097008e-10,
            "p_value": 6.77747052294617e-05,
            "q_bh": 0.00062791271021413,
            "sign": "negative",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": 1.82284685329736,
            "ci_low": -2.91444677535153,
            "ci_high": 6.56014048194625,
            "p_value": 0.450740166352874,
            "q_bh": 0.558988788980926,
            "sign": "positive",
            "sign_match": false,
            "nominal_sig": false
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": -5.98407988049887e-11,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "negative",
            "sign_match": true,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "Household Net Worth \u2192 Top 10% vs Bottom 50% Wealth Gap (h=2)",
      "lead_p": 0.040818196486757,
      "lead_reject": true,
      "episode_all_pass": true,
      "episode_any_flip": false
    },
    {
      "treatment": "fed_funds",
      "treatment_label": "Fed Funds Rate",
      "treatment_tier": "contrast",
      "outcome": "median_real_income_fred_q",
      "outcome_label": "Median Real Income",
      "horizon": 2,
      "beta": 867.857582782774,
      "se": 458.842706418151,
      "ci_low": -31.4741217968017,
      "ci_high": 1767.18928736235,
      "p_value": 0.0607448333589015,
      "q_value": 0.255128300107386,
      "r2": 0.960812623293335,
      "priority": "moderate",
      "priority_label": "Supportive",
      "robust": false,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 3,
        "nominal_sig_count": 2,
        "supportive_count": 2,
        "consensus": "multi-estimator support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": 1245.03873487531,
            "ci_low": -0.320254960323609,
            "ci_high": 2490.39772471094,
            "p_value": 0.053981370333412,
            "q_bh": 0.115208827682385,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": 845.301938433258,
            "ci_low": -738.402135286369,
            "ci_high": 2429.00601215288,
            "p_value": 0.29778523283081,
            "q_bh": 0.411413808516251,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": 7214.78510742082,
            "ci_low": 2391.64815634464,
            "ci_high": 12037.922058497,
            "p_value": 0.0033688990305988,
            "q_bh": 0.0126333713647455,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": -337.432686113963,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "Fed Funds Rate \u2192 Median Real Income (h=2)",
      "lead_p": 0.0607448333589015,
      "lead_reject": true
    },
    {
      "treatment": "snap_persons",
      "treatment_label": "SNAP Participation",
      "treatment_tier": "suggestive",
      "outcome": "poverty_all_q",
      "outcome_label": "Overall Poverty Rate",
      "horizon": 4,
      "beta": 2.52270029901919e-05,
      "se": 1.32539946883244e-05,
      "ci_low": -7.50826598923964e-07,
      "ci_high": 5.12048325793077e-05,
      "p_value": 0.059188650045312,
      "q_value": 0.255128300107386,
      "r2": 0.821716819604704,
      "priority": "moderate",
      "priority_label": "Supportive",
      "robust": false,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 4,
        "nominal_sig_count": 3,
        "supportive_count": 3,
        "consensus": "multi-estimator support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": 1.42015985547267e-05,
            "ci_low": 9.59038867443134e-06,
            "ci_high": 1.88128084350221e-05,
            "p_value": 3.03475592247724e-08,
            "q_bh": 1.36564016511476e-06,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": 7.29941632729986e-05,
            "ci_low": 4.20824402269536e-05,
            "ci_high": 0.000103905886319044,
            "p_value": 8.41302472160898e-06,
            "q_bh": 0.000165631424206677,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": 7.99311893404374,
            "ci_low": 4.24705557177958,
            "ci_high": 11.7391822963079,
            "p_value": 2.88794437469572e-05,
            "q_bh": 0.000330173438795351,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": 4.21489493069347e-05,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "SNAP Participation \u2192 Overall Poverty Rate (h=4)",
      "lead_p": 0.059188650045312,
      "lead_reject": true
    },
    {
      "treatment": "revolving_credit",
      "treatment_label": "Revolving Credit",
      "treatment_tier": "contrast",
      "outcome": "poverty_all_q",
      "outcome_label": "Overall Poverty Rate",
      "horizon": 4,
      "beta": -7.46166861153686e-09,
      "se": 3.87310239000938e-09,
      "ci_low": -1.50529492959553e-08,
      "ci_high": 1.29612072881528e-10,
      "p_value": 0.0562032783955591,
      "q_value": 0.255128300107386,
      "r2": 0.818090809023856,
      "priority": "moderate",
      "priority_label": "Supportive",
      "robust": false,
      "estimator_summary": {
        "available": 4,
        "sign_match_count": 2,
        "nominal_sig_count": 2,
        "supportive_count": 1,
        "consensus": "directional support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": -1.24446713194863e-08,
            "ci_low": -2.67430796134333e-08,
            "ci_high": 1.85373697446076e-09,
            "p_value": 0.0912954581117821,
            "q_bh": 0.168770860766332,
            "sign": "negative",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": 2.04266151513934e-09,
            "ci_low": -1.10110943342963e-08,
            "ci_high": 1.5096417364575e-08,
            "p_value": 0.759532284661302,
            "q_bh": 0.825009205752794,
            "sign": "positive",
            "sign_match": false,
            "nominal_sig": false
          },
          {
            "estimator": "tmle",
            "label": "TMLE",
            "estimate": 33.4485680085653,
            "ci_low": -5.00815491941764,
            "ci_high": 71.9052909365483,
            "p_value": 0.0882405999402029,
            "q_bh": 0.166935142396414,
            "sign": "positive",
            "sign_match": false,
            "nominal_sig": true
          },
          {
            "estimator": "cf",
            "label": "CF",
            "estimate": -8.95531152594929e-09,
            "ci_low": null,
            "ci_high": null,
            "p_value": null,
            "q_bh": null,
            "sign": "negative",
            "sign_match": true,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "Revolving Credit \u2192 Overall Poverty Rate (h=4)",
      "lead_p": 0.0562032783955591,
      "lead_reject": true
    }
  ],
  "consumption_findings": [
    {
      "treatment": "ui_benefits",
      "treatment_label": "UI Benefits",
      "treatment_tier": "bridge",
      "outcome": "pce_gap_v2",
      "outcome_label": "Essential vs Discretionary Gap",
      "horizon": 1,
      "beta": 1.89058595318254e-06,
      "se": 3.45666518929526e-07,
      "ci_low": 1.21307957608067e-06,
      "ci_high": 2.56809233028441e-06,
      "p_value": 3.6464902428428e-07,
      "q_value": 2.04203453599197e-05,
      "r2": 0.601155119308255,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": true,
      "estimator_summary": {
        "available": 2,
        "sign_match_count": 2,
        "nominal_sig_count": 2,
        "supportive_count": 2,
        "consensus": "multi-estimator support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": 3.57789495864641e-06,
            "ci_low": 2.55950013247132e-06,
            "ci_high": 4.59628978482149e-06,
            "p_value": 3.15648735350742e-09,
            "q_bh": 7.07053167185662e-08,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": 3.25191893759144e-06,
            "ci_low": 1.99009380535543e-06,
            "ci_high": 4.51374406982746e-06,
            "p_value": 1.93024385122606e-06,
            "q_bh": 1.93281194413422e-05,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          }
        ]
      },
      "row_label": "UI Benefits \u2192 Essential vs Discretionary Gap (h=1)"
    },
    {
      "treatment": "ui_benefits",
      "treatment_label": "UI Benefits",
      "treatment_tier": "bridge",
      "outcome": "pce_eshare_v2",
      "outcome_label": "Essential Spending Share",
      "horizon": 1,
      "beta": 2.39612423862593e-07,
      "se": 5.41804570073768e-08,
      "ci_low": 1.33418728128134e-07,
      "ci_high": 3.45806119597051e-07,
      "p_value": 2.59600694670588e-05,
      "q_value": 0.000726881945077646,
      "r2": 0.640192554353701,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": true,
      "estimator_summary": {
        "available": 2,
        "sign_match_count": 2,
        "nominal_sig_count": 2,
        "supportive_count": 2,
        "consensus": "multi-estimator support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": 4.94851255331523e-07,
            "ci_low": 3.4777349431602e-07,
            "ci_high": 6.41929016347027e-07,
            "p_value": 1.01178407788848e-08,
            "q_bh": 1.8886636120585e-07,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": 4.2660833092707e-07,
            "ci_low": 2.2439732373656e-07,
            "ci_high": 6.2881933811758e-07,
            "p_value": 7.29955361837826e-05,
            "q_bh": 0.000480911767799038,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          }
        ]
      },
      "row_label": "UI Benefits \u2192 Essential Spending Share (h=1)"
    }
  ],
  "consumption_supporting": [
    {
      "treatment": "ui_benefits",
      "treatment_label": "UI Benefits",
      "treatment_tier": "bridge",
      "outcome": "pce_gap_v2",
      "outcome_label": "Essential vs Discretionary Gap",
      "horizon": 2,
      "beta": 1.47793925655794e-06,
      "se": 5.26886754395656e-07,
      "ci_low": 4.45241217942458e-07,
      "ci_high": 2.51063729517343e-06,
      "p_value": 0.00611386859183448,
      "q_value": 0.114125547047577,
      "r2": 0.359147781329619,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": false,
      "estimator_summary": {
        "available": 2,
        "sign_match_count": 1,
        "nominal_sig_count": 1,
        "supportive_count": 1,
        "consensus": "mixed",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": 2.60330357077336e-06,
            "ci_low": 1.37200592015763e-06,
            "ci_high": 3.83460122138909e-06,
            "p_value": 0.000103688297301986,
            "q_bh": 0.000635515445298502,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": -5.92977575026117e-07,
            "ci_low": -5.30469616102598e-06,
            "ci_high": 4.11874101097374e-06,
            "p_value": 0.805659973042135,
            "q_bh": 0.863687940373437,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "UI Benefits \u2192 Essential vs Discretionary Gap (h=2)"
    },
    {
      "treatment": "ui_benefits",
      "treatment_label": "UI Benefits",
      "treatment_tier": "bridge",
      "outcome": "pce_discretionary_v2_idx",
      "outcome_label": "Discretionary Spending Index",
      "horizon": 1,
      "beta": -0.170418459970456,
      "se": 0.0665766301710209,
      "ci_low": -0.300908655105657,
      "ci_high": -0.039928264835255,
      "p_value": 0.012052793982239,
      "q_value": 0.168739115751346,
      "r2": 0.949731013603769,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": false,
      "estimator_summary": {
        "available": 2,
        "sign_match_count": 2,
        "nominal_sig_count": 2,
        "supportive_count": 2,
        "consensus": "multi-estimator support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": -0.372485343440073,
            "ci_low": -0.464680009401922,
            "ci_high": -0.280290677478223,
            "p_value": 4.9482001680206e-11,
            "q_bh": 2.77099209409154e-09,
            "sign": "negative",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": -0.266000476071751,
            "ci_low": -0.4686902912705,
            "ci_high": -0.0633106608730029,
            "p_value": 0.0115455514129752,
            "q_bh": 0.0313716044243629,
            "sign": "negative",
            "sign_match": true,
            "nominal_sig": true
          }
        ]
      },
      "row_label": "UI Benefits \u2192 Discretionary Spending Index (h=1)"
    },
    {
      "treatment": "ui_benefits",
      "treatment_label": "UI Benefits",
      "treatment_tier": "bridge",
      "outcome": "pce_eshare_v2",
      "outcome_label": "Essential Spending Share",
      "horizon": 2,
      "beta": 1.89454746923296e-07,
      "se": 7.95559386934633e-08,
      "ci_low": 3.35251070841077e-08,
      "ci_high": 3.45384386762484e-07,
      "p_value": 0.0192625201706858,
      "q_value": 0.215740225911681,
      "r2": 0.397769558041538,
      "priority": "strong",
      "priority_label": "Headline-grade",
      "robust": false,
      "estimator_summary": {
        "available": 2,
        "sign_match_count": 1,
        "nominal_sig_count": 1,
        "supportive_count": 1,
        "consensus": "mixed",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": 3.61328266882146e-07,
            "ci_low": 1.83904006610943e-07,
            "ci_high": 5.38752527153349e-07,
            "p_value": 0.000173907803739456,
            "q_bh": 0.000925017136701433,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": -6.79265572858523e-08,
            "ci_low": -6.43120614987188e-07,
            "ci_high": 5.07267500415484e-07,
            "p_value": 0.817418943567717,
            "q_bh": 0.863687940373437,
            "sign": "negative",
            "sign_match": false,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "UI Benefits \u2192 Essential Spending Share (h=2)"
    },
    {
      "treatment": "fed_funds",
      "treatment_label": "Fed Funds Rate",
      "treatment_tier": "contrast",
      "outcome": "pce_discretionary_v2_idx",
      "outcome_label": "Discretionary Spending Index",
      "horizon": 2,
      "beta": 6227.56273815488,
      "se": 4355.28880921966,
      "ci_low": -2308.80332791566,
      "ci_high": 14763.9288042254,
      "p_value": 0.156065378676739,
      "q_value": 0.429384470379254,
      "r2": 0.912177430417823,
      "priority": "weak",
      "priority_label": "Exploratory",
      "robust": false,
      "estimator_summary": {
        "available": 2,
        "sign_match_count": 2,
        "nominal_sig_count": 1,
        "supportive_count": 1,
        "consensus": "directional support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": 11718.5372618564,
            "ci_low": -4058.59747632414,
            "ci_high": 27495.6720000369,
            "p_value": 0.152546886115276,
            "q_bh": 0.247773472774334,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": 33536.5726098137,
            "ci_low": 18794.0896050587,
            "ci_high": 48279.0556145686,
            "p_value": 2.62683679409113e-05,
            "q_bh": 0.000208370050660763,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          }
        ]
      },
      "row_label": "Fed Funds Rate \u2192 Discretionary Spending Index (h=2)"
    },
    {
      "treatment": "fed_funds",
      "treatment_label": "Fed Funds Rate",
      "treatment_tier": "contrast",
      "outcome": "pce_discretionary_v2_idx",
      "outcome_label": "Discretionary Spending Index",
      "horizon": 1,
      "beta": 5081.4451150054,
      "se": 4055.93937919979,
      "ci_low": -2868.19606822619,
      "ci_high": 13031.086298237,
      "p_value": 0.213338844861106,
      "q_value": 0.429384470379254,
      "r2": 0.942378627418844,
      "priority": "weak",
      "priority_label": "Exploratory",
      "robust": false,
      "estimator_summary": {
        "available": 2,
        "sign_match_count": 2,
        "nominal_sig_count": 1,
        "supportive_count": 1,
        "consensus": "directional support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": 10337.4970607171,
            "ci_low": -5204.74090452267,
            "ci_high": 25879.7350259569,
            "p_value": 0.199135992335322,
            "q_bh": 0.309767099188279,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": false
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": 29175.2577579303,
            "ci_low": 16303.2624785886,
            "ci_high": 42047.253037272,
            "p_value": 2.7906703213495e-05,
            "q_bh": 0.000208370050660763,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          }
        ]
      },
      "row_label": "Fed Funds Rate \u2192 Discretionary Spending Index (h=1)"
    },
    {
      "treatment": "snap_persons",
      "treatment_label": "SNAP Participation",
      "treatment_tier": "suggestive",
      "outcome": "pce_essential_v2_idx",
      "outcome_label": "Essential Spending Index",
      "horizon": 2,
      "beta": 0.345200848160945,
      "se": 0.208968659411663,
      "ci_low": -0.064377724285914,
      "ci_high": 0.754779420607803,
      "p_value": 0.101886355823224,
      "q_value": 0.429384470379254,
      "r2": 0.995763051459695,
      "priority": "weak",
      "priority_label": "Exploratory",
      "robust": false,
      "estimator_summary": {
        "available": 2,
        "sign_match_count": 2,
        "nominal_sig_count": 2,
        "supportive_count": 2,
        "consensus": "multi-estimator support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": 0.224040840785761,
            "ci_low": 0.117235495982927,
            "ci_high": 0.330846185588595,
            "p_value": 0.000115899719998664,
            "q_bh": 0.000649038431992518,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": 0.781223768032699,
            "ci_low": 0.556592305329146,
            "ci_high": 1.00585523073625,
            "p_value": 6.69785619021293e-10,
            "q_bh": 1.87539973325962e-08,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          }
        ]
      },
      "row_label": "SNAP Participation \u2192 Essential Spending Index (h=2)"
    },
    {
      "treatment": "snap_persons",
      "treatment_label": "SNAP Participation",
      "treatment_tier": "suggestive",
      "outcome": "pce_essential_v2_idx",
      "outcome_label": "Essential Spending Index",
      "horizon": 1,
      "beta": 0.17419988268956,
      "se": 0.129670181993426,
      "ci_low": -0.0799536740175546,
      "ci_high": 0.428353439396675,
      "p_value": 0.182340389103291,
      "q_value": 0.429384470379254,
      "r2": 0.998255039830768,
      "priority": "weak",
      "priority_label": "Exploratory",
      "robust": false,
      "estimator_summary": {
        "available": 2,
        "sign_match_count": 2,
        "nominal_sig_count": 2,
        "supportive_count": 2,
        "consensus": "multi-estimator support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": 0.237740609092251,
            "ci_low": 0.124985222841998,
            "ci_high": 0.350495995342504,
            "p_value": 0.000107810655898853,
            "q_bh": 0.000635515445298502,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": 0.722365011325579,
            "ci_low": 0.463246916679148,
            "ci_high": 0.981483105972009,
            "p_value": 3.30654059061028e-07,
            "q_bh": 5.29046494497645e-06,
            "sign": "positive",
            "sign_match": true,
            "nominal_sig": true
          }
        ]
      },
      "row_label": "SNAP Participation \u2192 Essential Spending Index (h=1)"
    },
    {
      "treatment": "ui_benefits",
      "treatment_label": "UI Benefits",
      "treatment_tier": "bridge",
      "outcome": "pce_discretionary_v2_idx",
      "outcome_label": "Discretionary Spending Index",
      "horizon": 2,
      "beta": -0.121833977268526,
      "se": 0.0927170679539899,
      "ci_low": -0.303559430458346,
      "ci_high": 0.0598914759212939,
      "p_value": 0.192030322341034,
      "q_value": 0.429384470379254,
      "r2": 0.918156781721705,
      "priority": "weak",
      "priority_label": "Exploratory",
      "robust": false,
      "estimator_summary": {
        "available": 2,
        "sign_match_count": 2,
        "nominal_sig_count": 1,
        "supportive_count": 1,
        "consensus": "directional support",
        "items": [
          {
            "estimator": "lp",
            "label": "LP",
            "estimate": -0.29041922908194,
            "ci_low": -0.412476322644304,
            "ci_high": -0.168362135519577,
            "p_value": 1.66453174833004e-05,
            "q_bh": 0.000143405812163819,
            "sign": "negative",
            "sign_match": true,
            "nominal_sig": true
          },
          {
            "estimator": "dml",
            "label": "DML",
            "estimate": -0.142860519199806,
            "ci_low": -0.406112314587981,
            "ci_high": 0.12039127618837,
            "p_value": 0.290000894800893,
            "q_bh": 0.421819483346754,
            "sign": "negative",
            "sign_match": true,
            "nominal_sig": false
          }
        ]
      },
      "row_label": "UI Benefits \u2192 Discretionary Spending Index (h=2)"
    }
  ],
  "heatmap": {
    "cells": [
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 4,
        "q_value": 6.83551283189151e-10,
        "p_value": 6.51001222084906e-12,
        "beta": 1.65271659654922e-08,
        "robust": true
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 4,
        "q_value": 1.76789082125327e-07,
        "p_value": 3.36741108810146e-09,
        "beta": 1.94463299768093e-06,
        "robust": true
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 4,
        "q_value": 5.38246292260971e-07,
        "p_value": 1.53784654931706e-08,
        "beta": 3.41941254589341e-06,
        "robust": true
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 2,
        "q_value": 1.11517531398448e-06,
        "p_value": 4.24828691041706e-08,
        "beta": 9.88156467708069e-09,
        "robust": true
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 2,
        "q_value": 1.36530233566546e-05,
        "p_value": 6.50143969364507e-07,
        "beta": 1.12062632637146e-06,
        "robust": true
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 2,
        "q_value": 7.96947582867275e-05,
        "p_value": 4.553986187813e-06,
        "beta": 1.96448064464099e-06,
        "robust": true
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 2,
        "q_value": 0.000865627480980218,
        "p_value": 6.51812817137315e-05,
        "beta": 2.06443990217345e-06,
        "robust": true
      },
      {
        "treatment": "household_networth",
        "treatment_label": "Household Net Worth",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 2,
        "q_value": 0.000865627480980218,
        "p_value": 6.59525699794452e-05,
        "beta": 1.09709592250939e-10,
        "robust": true
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 4,
        "q_value": 0.0020993414826379,
        "p_value": 0.000179943555654677,
        "beta": 2.24970939782917e-06,
        "robust": true
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 8,
        "q_value": 0.00300727621439387,
        "p_value": 0.000286407258513702,
        "beta": 1.10917747235986e-08,
        "robust": true
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "median_real_income_fred_q",
        "outcome_label": "Median Real Income",
        "horizon": 8,
        "q_value": 0.0157420415220633,
        "p_value": 0.00164916625469235,
        "beta": -0.00514925208371746,
        "robust": true
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 8,
        "q_value": 0.134529721301919,
        "p_value": 0.0153748252916479,
        "beta": 1.8082243168973e-06,
        "robust": false
      },
      {
        "treatment": "ui_benefits",
        "treatment_label": "UI Benefits",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 2,
        "q_value": 0.151607029437879,
        "p_value": 0.0187703941208803,
        "beta": 5.42920399389045e-08,
        "robust": false
      },
      {
        "treatment": "household_networth",
        "treatment_label": "Household Net Worth",
        "outcome": "wealth_share_gap_top10_bottom50",
        "outcome_label": "Top 10% vs Bottom 50% Wealth Gap",
        "horizon": 4,
        "q_value": 0.156205814000548,
        "p_value": 0.0208274418667397,
        "beta": -5.94527626573464e-11,
        "robust": false
      },
      {
        "treatment": "revolving_credit",
        "treatment_label": "Revolving Credit",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 2,
        "q_value": 0.181759962316042,
        "p_value": 0.0259657089022917,
        "beta": -4.08135278086229e-09,
        "robust": false
      },
      {
        "treatment": "ui_benefits",
        "treatment_label": "UI Benefits",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 4,
        "q_value": 0.18484999514334,
        "p_value": 0.0281676183075565,
        "beta": 8.67268656206855e-08,
        "robust": false
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 8,
        "q_value": 0.188979231754209,
        "p_value": 0.0305966375221101,
        "beta": 3.09238232640632e-06,
        "robust": false
      },
      {
        "treatment": "ui_benefits",
        "treatment_label": "UI Benefits",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 4,
        "q_value": 0.206019935846248,
        "p_value": 0.0353177032879282,
        "beta": 9.84587991941564e-06,
        "robust": false
      },
      {
        "treatment": "household_networth",
        "treatment_label": "Household Net Worth",
        "outcome": "wealth_share_gap_top10_bottom50",
        "outcome_label": "Top 10% vs Bottom 50% Wealth Gap",
        "horizon": 2,
        "q_value": 0.22170772041226,
        "p_value": 0.040818196486757,
        "beta": -3.15724686134103e-11,
        "robust": false
      },
      {
        "treatment": "household_networth",
        "treatment_label": "Household Net Worth",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 4,
        "q_value": 0.22170772041226,
        "p_value": 0.0422300419832876,
        "beta": 6.55912080404378e-11,
        "robust": false
      },
      {
        "treatment": "household_networth",
        "treatment_label": "Household Net Worth",
        "outcome": "wealth_share_gap_top10_bottom50",
        "outcome_label": "Top 10% vs Bottom 50% Wealth Gap",
        "horizon": 8,
        "q_value": 0.255128300107386,
        "p_value": 0.0555945054448362,
        "beta": -8.45157914950412e-11,
        "robust": false
      },
      {
        "treatment": "revolving_credit",
        "treatment_label": "Revolving Credit",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 4,
        "q_value": 0.255128300107386,
        "p_value": 0.0562032783955591,
        "beta": -7.46166861153686e-09,
        "robust": false
      },
      {
        "treatment": "snap_persons",
        "treatment_label": "SNAP Participation",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 4,
        "q_value": 0.255128300107386,
        "p_value": 0.059188650045312,
        "beta": 2.52270029901919e-05,
        "robust": false
      },
      {
        "treatment": "revolving_credit",
        "treatment_label": "Revolving Credit",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 2,
        "q_value": 0.255128300107386,
        "p_value": 0.0602942819005574,
        "beta": -5.77790904093109e-09,
        "robust": false
      },
      {
        "treatment": "fed_funds",
        "treatment_label": "Fed Funds Rate",
        "outcome": "median_real_income_fred_q",
        "outcome_label": "Median Real Income",
        "horizon": 2,
        "q_value": 0.255128300107386,
        "p_value": 0.0607448333589015,
        "beta": 867.857582782774,
        "robust": false
      },
      {
        "treatment": "snap_persons",
        "treatment_label": "SNAP Participation",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 2,
        "q_value": 0.290060806477017,
        "p_value": 0.0718245806514518,
        "beta": 1.39712909174533e-05,
        "robust": false
      },
      {
        "treatment": "ui_benefits",
        "treatment_label": "UI Benefits",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 2,
        "q_value": 0.319303137510498,
        "p_value": 0.082106521074128,
        "beta": 5.17664072341427e-06,
        "robust": false
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "median_real_income_fred_q",
        "outcome_label": "Median Real Income",
        "horizon": 2,
        "q_value": 0.341783817182786,
        "p_value": 0.0911423512487429,
        "beta": 0.00186631143326168,
        "robust": false
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "wealth_share_gap_top10_bottom50",
        "outcome_label": "Top 10% vs Bottom 50% Wealth Gap",
        "horizon": 8,
        "q_value": 0.368272730820176,
        "p_value": 0.103637374698965,
        "beta": -2.15640599349187e-06,
        "robust": false
      },
      {
        "treatment": "fed_funds",
        "treatment_label": "Fed Funds Rate",
        "outcome": "median_real_income_fred_q",
        "outcome_label": "Median Real Income",
        "horizon": 4,
        "q_value": 0.368272730820176,
        "p_value": 0.105220780234336,
        "beta": 1184.41739014992,
        "robust": false
      },
      {
        "treatment": "revolving_credit",
        "treatment_label": "Revolving Credit",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 4,
        "q_value": 0.380393733864781,
        "p_value": 0.112306721426745,
        "beta": -1.07292501264689e-08,
        "robust": false
      },
      {
        "treatment": "snap_persons",
        "treatment_label": "SNAP Participation",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 4,
        "q_value": 0.403313948494571,
        "p_value": 0.123597784893403,
        "beta": 3.33163067510693e-05,
        "robust": false
      },
      {
        "treatment": "ui_benefits",
        "treatment_label": "UI Benefits",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 4,
        "q_value": 0.403313948494571,
        "p_value": 0.130466449688122,
        "beta": 1.30998141756821e-05,
        "robust": false
      },
      {
        "treatment": "snap_persons",
        "treatment_label": "SNAP Participation",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 2,
        "q_value": 0.403313948494571,
        "p_value": 0.130596897607766,
        "beta": 1.83921213912766e-05,
        "robust": false
      },
      {
        "treatment": "snap_persons",
        "treatment_label": "SNAP Participation",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 8,
        "q_value": 0.407873793669662,
        "p_value": 0.139595750702279,
        "beta": 2.9182499082195e-05,
        "robust": false
      },
      {
        "treatment": "household_networth",
        "treatment_label": "Household Net Worth",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 2,
        "q_value": 0.407873793669662,
        "p_value": 0.139842443543884,
        "beta": 1.29157459533428e-13,
        "robust": false
      },
      {
        "treatment": "home_equity",
        "treatment_label": "Home Equity",
        "outcome": "wealth_share_gap_top10_bottom50",
        "outcome_label": "Top 10% vs Bottom 50% Wealth Gap",
        "horizon": 2,
        "q_value": 0.442078540586016,
        "p_value": 0.155780057158882,
        "beta": -1.43697588281025e-10,
        "robust": false
      },
      {
        "treatment": "ui_benefits",
        "treatment_label": "UI Benefits",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 2,
        "q_value": 0.449384631429192,
        "p_value": 0.162634438041041,
        "beta": 7.19199405965614e-06,
        "robust": false
      },
      {
        "treatment": "snap_persons",
        "treatment_label": "SNAP Participation",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 8,
        "q_value": 0.472053280975637,
        "p_value": 0.175334075790951,
        "beta": 4.10147626412373e-05,
        "robust": false
      },
      {
        "treatment": "household_networth",
        "treatment_label": "Household Net Worth",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 4,
        "q_value": 0.544040340508724,
        "p_value": 0.207410381549297,
        "beta": 1.88340735302981e-13,
        "robust": false
      },
      {
        "treatment": "fed_funds",
        "treatment_label": "Fed Funds Rate",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 8,
        "q_value": 0.544040340508724,
        "p_value": 0.212434799627216,
        "beta": -0.519668734221339,
        "robust": false
      },
      {
        "treatment": "credit_composite",
        "treatment_label": "Credit Composite",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 4,
        "q_value": 0.728061907843098,
        "p_value": 0.291224763137239,
        "beta": -5.56310107399777e-09,
        "robust": false
      },
      {
        "treatment": "fed_funds",
        "treatment_label": "Fed Funds Rate",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 4,
        "q_value": 0.767242693494301,
        "p_value": 0.316206345168512,
        "beta": -0.174130664028859,
        "robust": false
      },
      {
        "treatment": "revolving_credit",
        "treatment_label": "Revolving Credit",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 8,
        "q_value": 0.767242693494301,
        "p_value": 0.321511223940469,
        "beta": -5.83030965079254e-09,
        "robust": false
      },
      {
        "treatment": "revolving_credit",
        "treatment_label": "Revolving Credit",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 8,
        "q_value": 0.783442111795185,
        "p_value": 0.351191540387994,
        "beta": -8.5683013349775e-09,
        "robust": false
      },
      {
        "treatment": "fed_funds",
        "treatment_label": "Fed Funds Rate",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 8,
        "q_value": 0.783442111795185,
        "p_value": 0.369003180384653,
        "beta": -0.244765780720299,
        "robust": false
      },
      {
        "treatment": "credit_composite",
        "treatment_label": "Credit Composite",
        "outcome": "median_real_income_fred_q",
        "outcome_label": "Median Real Income",
        "horizon": 2,
        "q_value": 0.783442111795185,
        "p_value": 0.373982310310543,
        "beta": -8.26986180066317e-06,
        "robust": false
      },
      {
        "treatment": "fed_funds",
        "treatment_label": "Fed Funds Rate",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 4,
        "q_value": 0.783442111795185,
        "p_value": 0.379784605983147,
        "beta": -0.227507161956099,
        "robust": false
      },
      {
        "treatment": "ui_benefits",
        "treatment_label": "UI Benefits",
        "outcome": "median_real_income_fred_q",
        "outcome_label": "Median Real Income",
        "horizon": 8,
        "q_value": 0.783442111795185,
        "p_value": 0.385085913036216,
        "beta": -0.0312460818803908,
        "robust": false
      },
      {
        "treatment": "fed_funds",
        "treatment_label": "Fed Funds Rate",
        "outcome": "median_real_income_fred_q",
        "outcome_label": "Median Real Income",
        "horizon": 8,
        "q_value": 0.783442111795185,
        "p_value": 0.391269871596405,
        "beta": 763.029132826336,
        "robust": false
      },
      {
        "treatment": "ui_benefits",
        "treatment_label": "UI Benefits",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 8,
        "q_value": 0.783442111795185,
        "p_value": 0.392717406139212,
        "beta": 7.11598068384924e-06,
        "robust": false
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "wealth_share_gap_top10_bottom50",
        "outcome_label": "Top 10% vs Bottom 50% Wealth Gap",
        "horizon": 4,
        "q_value": 0.783442111795185,
        "p_value": 0.397042712647913,
        "beta": -9.27175310489576e-07,
        "robust": false
      },
      {
        "treatment": "credit_composite",
        "treatment_label": "Credit Composite",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 4,
        "q_value": 0.783442111795185,
        "p_value": 0.399775313771938,
        "beta": -7.38424970073326e-09,
        "robust": false
      },
      {
        "treatment": "home_equity",
        "treatment_label": "Home Equity",
        "outcome": "wealth_share_gap_top10_bottom50",
        "outcome_label": "Top 10% vs Bottom 50% Wealth Gap",
        "horizon": 4,
        "q_value": 0.783442111795185,
        "p_value": 0.402913086066095,
        "beta": -1.32171329519278e-10,
        "robust": false
      },
      {
        "treatment": "household_networth",
        "treatment_label": "Household Net Worth",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 8,
        "q_value": 0.85159803513519,
        "p_value": 0.44607516126129,
        "beta": 2.88471385413517e-11,
        "robust": false
      },
      {
        "treatment": "credit_composite",
        "treatment_label": "Credit Composite",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 4,
        "q_value": 0.857606883446145,
        "p_value": 0.457390337837944,
        "beta": -3.73127341282018e-09,
        "robust": false
      },
      {
        "treatment": "credit_composite",
        "treatment_label": "Credit Composite",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 2,
        "q_value": 0.859107597218511,
        "p_value": 0.466372695632906,
        "beta": -2.10939048929093e-09,
        "robust": false
      },
      {
        "treatment": "credit_composite",
        "treatment_label": "Credit Composite",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 2,
        "q_value": 0.919882115832808,
        "p_value": 0.511398671730711,
        "beta": -2.95770408690691e-09,
        "robust": false
      },
      {
        "treatment": "social_security",
        "treatment_label": "Social Security",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 2,
        "q_value": 0.919882115832808,
        "p_value": 0.522545269741601,
        "beta": 1.85927414870114e-05,
        "robust": false
      },
      {
        "treatment": "social_security",
        "treatment_label": "Social Security",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 2,
        "q_value": 0.919882115832808,
        "p_value": 0.525646923333033,
        "beta": 1.1944077110568e-07,
        "robust": false
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "median_real_income_fred_q",
        "outcome_label": "Median Real Income",
        "horizon": 4,
        "q_value": 0.936545247245658,
        "p_value": 0.544088191257001,
        "beta": 0.000698189664144637,
        "robust": false
      },
      {
        "treatment": "fed_funds",
        "treatment_label": "Fed Funds Rate",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 2,
        "q_value": 0.944714460728023,
        "p_value": 0.565355645124446,
        "beta": -0.058525104189188,
        "robust": false
      },
      {
        "treatment": "home_equity",
        "treatment_label": "Home Equity",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 4,
        "q_value": 0.944714460728023,
        "p_value": 0.570396747491653,
        "beta": -1.13042942042003e-10,
        "robust": false
      },
      {
        "treatment": "ui_benefits",
        "treatment_label": "UI Benefits",
        "outcome": "median_real_income_fred_q",
        "outcome_label": "Median Real Income",
        "horizon": 2,
        "q_value": 0.944714460728023,
        "p_value": 0.593518934490164,
        "beta": 0.0059617854970296,
        "robust": false
      },
      {
        "treatment": "ui_benefits",
        "treatment_label": "UI Benefits",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 8,
        "q_value": 0.944714460728023,
        "p_value": 0.601844540265338,
        "beta": 6.9793745396557e-06,
        "robust": false
      },
      {
        "treatment": "social_security",
        "treatment_label": "Social Security",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 8,
        "q_value": 0.944714460728023,
        "p_value": 0.61174045767716,
        "beta": -2.91773901252704e-07,
        "robust": false
      },
      {
        "treatment": "fed_funds",
        "treatment_label": "Fed Funds Rate",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 8,
        "q_value": 0.944714460728023,
        "p_value": 0.613217380893843,
        "beta": -0.000788813845710438,
        "robust": false
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "wealth_share_gap_top10_bottom50",
        "outcome_label": "Top 10% vs Bottom 50% Wealth Gap",
        "horizon": 2,
        "q_value": 0.944714460728023,
        "p_value": 0.622861317365694,
        "beta": -4.68882653870249e-07,
        "robust": false
      },
      {
        "treatment": "fed_funds",
        "treatment_label": "Fed Funds Rate",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 8,
        "q_value": 0.944714460728023,
        "p_value": 0.632626541620097,
        "beta": -0.235673085869741,
        "robust": false
      },
      {
        "treatment": "social_security",
        "treatment_label": "Social Security",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 4,
        "q_value": 0.944714460728023,
        "p_value": 0.632993298045685,
        "beta": 2.77456220262858e-05,
        "robust": false
      },
      {
        "treatment": "social_security",
        "treatment_label": "Social Security",
        "outcome": "median_real_income_fred_q",
        "outcome_label": "Median Real Income",
        "horizon": 2,
        "q_value": 0.944714460728023,
        "p_value": 0.640569709190916,
        "beta": 0.0554170568402941,
        "robust": false
      },
      {
        "treatment": "credit_composite",
        "treatment_label": "Credit Composite",
        "outcome": "median_real_income_fred_q",
        "outcome_label": "Median Real Income",
        "horizon": 8,
        "q_value": 0.944714460728023,
        "p_value": 0.657504136896512,
        "beta": 1.50142783434255e-05,
        "robust": false
      },
      {
        "treatment": "home_equity",
        "treatment_label": "Home Equity",
        "outcome": "wealth_share_gap_top10_bottom50",
        "outcome_label": "Top 10% vs Bottom 50% Wealth Gap",
        "horizon": 8,
        "q_value": 0.944714460728023,
        "p_value": 0.664135221899033,
        "beta": 1.60718720759335e-10,
        "robust": false
      },
      {
        "treatment": "credit_composite",
        "treatment_label": "Credit Composite",
        "outcome": "median_real_income_fred_q",
        "outcome_label": "Median Real Income",
        "horizon": 4,
        "q_value": 0.944714460728023,
        "p_value": 0.685253277823631,
        "beta": -6.75252536354961e-06,
        "robust": false
      },
      {
        "treatment": "fed_funds",
        "treatment_label": "Fed Funds Rate",
        "outcome": "wealth_share_gap_top10_bottom50",
        "outcome_label": "Top 10% vs Bottom 50% Wealth Gap",
        "horizon": 2,
        "q_value": 0.944714460728023,
        "p_value": 0.688760420621688,
        "beta": -0.0755911542263267,
        "robust": false
      },
      {
        "treatment": "social_security",
        "treatment_label": "Social Security",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 2,
        "q_value": 0.944714460728023,
        "p_value": 0.696009389016727,
        "beta": 1.66638165784754e-05,
        "robust": false
      },
      {
        "treatment": "social_security",
        "treatment_label": "Social Security",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 8,
        "q_value": 0.944714460728023,
        "p_value": 0.701251097376515,
        "beta": 3.69174597183499e-05,
        "robust": false
      },
      {
        "treatment": "social_security",
        "treatment_label": "Social Security",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 4,
        "q_value": 0.944714460728023,
        "p_value": 0.701787885112246,
        "beta": 1.40185544581794e-07,
        "robust": false
      },
      {
        "treatment": "ui_benefits",
        "treatment_label": "UI Benefits",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 8,
        "q_value": 0.964314529908578,
        "p_value": 0.725531884407406,
        "beta": -1.69416711880867e-08,
        "robust": false
      },
      {
        "treatment": "fed_funds",
        "treatment_label": "Fed Funds Rate",
        "outcome": "wealth_share_gap_top10_bottom50",
        "outcome_label": "Top 10% vs Bottom 50% Wealth Gap",
        "horizon": 8,
        "q_value": 0.974150126817044,
        "p_value": 0.750735502783497,
        "beta": -0.126129036671537,
        "robust": false
      },
      {
        "treatment": "credit_composite",
        "treatment_label": "Credit Composite",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 8,
        "q_value": 0.974150126817044,
        "p_value": 0.751487240687434,
        "beta": 2.2121107595515e-09,
        "robust": false
      },
      {
        "treatment": "social_security",
        "treatment_label": "Social Security",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 8,
        "q_value": 0.99646741182828,
        "p_value": 0.786636129588216,
        "beta": 3.77593695835828e-05,
        "robust": false
      },
      {
        "treatment": "home_equity",
        "treatment_label": "Home Equity",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 2,
        "q_value": 0.99646741182828,
        "p_value": 0.788369082088936,
        "beta": -5.87682753170378e-11,
        "robust": false
      },
      {
        "treatment": "social_security",
        "treatment_label": "Social Security",
        "outcome": "median_real_income_fred_q",
        "outcome_label": "Median Real Income",
        "horizon": 8,
        "q_value": 0.99646741182828,
        "p_value": 0.800219086881641,
        "beta": -0.0784886183175442,
        "robust": false
      },
      {
        "treatment": "cc_delinquency",
        "treatment_label": "Credit Card Delinquency",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 4,
        "q_value": 0.99646741182828,
        "p_value": 0.810508198110669,
        "beta": 0.148742475863025,
        "robust": false
      },
      {
        "treatment": "credit_composite",
        "treatment_label": "Credit Composite",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 8,
        "q_value": 0.99646741182828,
        "p_value": 0.826746727669848,
        "beta": -1.87083791011082e-09,
        "robust": false
      },
      {
        "treatment": "cc_delinquency",
        "treatment_label": "Credit Card Delinquency",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 8,
        "q_value": 0.99646741182828,
        "p_value": 0.847695603799861,
        "beta": -0.12824194713376,
        "robust": false
      },
      {
        "treatment": "fed_funds",
        "treatment_label": "Fed Funds Rate",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 2,
        "q_value": 0.99646741182828,
        "p_value": 0.861425571216438,
        "beta": 0.0386014598030307,
        "robust": false
      },
      {
        "treatment": "social_security",
        "treatment_label": "Social Security",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 4,
        "q_value": 0.99646741182828,
        "p_value": 0.869165320658583,
        "beta": 1.44466719171516e-05,
        "robust": false
      },
      {
        "treatment": "home_equity",
        "treatment_label": "Home Equity",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 8,
        "q_value": 0.99646741182828,
        "p_value": 0.874714744780199,
        "beta": 4.11753419139721e-11,
        "robust": false
      },
      {
        "treatment": "social_security",
        "treatment_label": "Social Security",
        "outcome": "median_real_income_fred_q",
        "outcome_label": "Median Real Income",
        "horizon": 4,
        "q_value": 0.99646741182828,
        "p_value": 0.889767467477365,
        "beta": 0.032512234907891,
        "robust": false
      },
      {
        "treatment": "cc_delinquency",
        "treatment_label": "Credit Card Delinquency",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 2,
        "q_value": 0.99646741182828,
        "p_value": 0.898505156483513,
        "beta": -0.0303322183196397,
        "robust": false
      },
      {
        "treatment": "fed_funds",
        "treatment_label": "Fed Funds Rate",
        "outcome": "wealth_share_gap_top10_bottom50",
        "outcome_label": "Top 10% vs Bottom 50% Wealth Gap",
        "horizon": 4,
        "q_value": 0.99646741182828,
        "p_value": 0.905834852575266,
        "beta": -0.0326555836263564,
        "robust": false
      },
      {
        "treatment": "fed_funds",
        "treatment_label": "Fed Funds Rate",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 2,
        "q_value": 0.99646741182828,
        "p_value": 0.919594600154019,
        "beta": -0.0155673399771683,
        "robust": false
      },
      {
        "treatment": "fed_funds",
        "treatment_label": "Fed Funds Rate",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 4,
        "q_value": 0.99646741182828,
        "p_value": 0.928786600437297,
        "beta": -0.000132819242216221,
        "robust": false
      },
      {
        "treatment": "credit_composite",
        "treatment_label": "Credit Composite",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 2,
        "q_value": 0.99646741182828,
        "p_value": 0.954399082482728,
        "beta": 2.21164898516676e-10,
        "robust": false
      },
      {
        "treatment": "cc_delinquency",
        "treatment_label": "Credit Card Delinquency",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 4,
        "q_value": 0.99646741182828,
        "p_value": 0.961435887918388,
        "beta": 0.0192332895943362,
        "robust": false
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 8,
        "q_value": 0.99646741182828,
        "p_value": 0.972385703436079,
        "beta": 3.27335125568861e-08,
        "robust": false
      },
      {
        "treatment": "household_networth",
        "treatment_label": "Household Net Worth",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 8,
        "q_value": 0.99646741182828,
        "p_value": 0.973154335396633,
        "beta": -5.75354342148441e-15,
        "robust": false
      },
      {
        "treatment": "fed_funds",
        "treatment_label": "Fed Funds Rate",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 4,
        "q_value": 0.99646741182828,
        "p_value": 0.984633265507187,
        "beta": -0.00640552969652869,
        "robust": false
      },
      {
        "treatment": "ui_benefits",
        "treatment_label": "UI Benefits",
        "outcome": "median_real_income_fred_q",
        "outcome_label": "Median Real Income",
        "horizon": 4,
        "q_value": 0.99646741182828,
        "p_value": 0.987636524595508,
        "beta": -0.000343702883503663,
        "robust": false
      },
      {
        "treatment": "cc_delinquency",
        "treatment_label": "Credit Card Delinquency",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 8,
        "q_value": 0.99646741182828,
        "p_value": 0.991526115154562,
        "beta": -0.0101989568145757,
        "robust": false
      },
      {
        "treatment": "credit_composite",
        "treatment_label": "Credit Composite",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 8,
        "q_value": 0.99646741182828,
        "p_value": 0.993342306677333,
        "beta": -1.15939069930443e-10,
        "robust": false
      },
      {
        "treatment": "fed_funds",
        "treatment_label": "Fed Funds Rate",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 2,
        "q_value": 0.99646741182828,
        "p_value": 0.994580316187998,
        "beta": -5.80646751777165e-06,
        "robust": false
      },
      {
        "treatment": "cc_delinquency",
        "treatment_label": "Credit Card Delinquency",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 2,
        "q_value": 0.99646741182828,
        "p_value": 0.99646741182828,
        "beta": 0.00164469189393726,
        "robust": false
      }
    ],
    "treatments": [
      {
        "name": "transfer_composite",
        "label": "Transfer Composite",
        "tier": "headline"
      },
      {
        "name": "ui_benefits",
        "label": "UI Benefits",
        "tier": "bridge"
      },
      {
        "name": "snap_persons",
        "label": "SNAP Participation",
        "tier": "suggestive"
      },
      {
        "name": "social_security",
        "label": "Social Security",
        "tier": "appendix"
      },
      {
        "name": "household_networth",
        "label": "Household Net Worth",
        "tier": "contrast"
      },
      {
        "name": "home_equity",
        "label": "Home Equity",
        "tier": "contrast"
      },
      {
        "name": "fed_funds",
        "label": "Fed Funds Rate",
        "tier": "contrast"
      },
      {
        "name": "credit_composite",
        "label": "Credit Composite",
        "tier": "contrast"
      },
      {
        "name": "revolving_credit",
        "label": "Revolving Credit",
        "tier": "contrast"
      },
      {
        "name": "cc_delinquency",
        "label": "Credit Card Delinquency",
        "tier": "contrast"
      }
    ],
    "outcomes": [
      {
        "name": "gini_households_q",
        "label": "Household Gini"
      },
      {
        "name": "poverty_all_q",
        "label": "Overall Poverty Rate"
      },
      {
        "name": "poverty_child_q",
        "label": "Child Poverty Rate"
      },
      {
        "name": "wealth_share_gap_top1_bottom50",
        "label": "Top 1% vs Bottom 50% Wealth Gap"
      },
      {
        "name": "wealth_share_gap_top10_bottom50",
        "label": "Top 10% vs Bottom 50% Wealth Gap"
      },
      {
        "name": "median_real_income_fred_q",
        "label": "Median Real Income"
      }
    ],
    "horizons": [
      2,
      4,
      8
    ]
  },
  "irf_curves": {
    "transfer_composite": {
      "poverty_all_q": [
        {
          "horizon": 2,
          "beta": 1.12062632637146e-06,
          "se": 2.14388896797793e-07,
          "ci_low": 7.00424088647783e-07,
          "ci_high": 1.54082856409513e-06,
          "p_value": 6.50143969364507e-07,
          "q_value": 1.36530233566546e-05,
          "robust": true
        },
        {
          "horizon": 4,
          "beta": 1.94463299768093e-06,
          "se": 3.06561336275569e-07,
          "ci_low": 1.34377277858081e-06,
          "ci_high": 2.54549321678105e-06,
          "p_value": 3.36741108810146e-09,
          "q_value": 1.76789082125327e-07,
          "robust": true
        },
        {
          "horizon": 8,
          "beta": 1.8082243168973e-06,
          "se": 7.36055543685653e-07,
          "ci_low": 3.65555451273419e-07,
          "ci_high": 3.25089318252118e-06,
          "p_value": 0.0153748252916479,
          "q_value": 0.134529721301919,
          "robust": false
        }
      ],
      "poverty_child_q": [
        {
          "horizon": 2,
          "beta": 1.96448064464099e-06,
          "se": 4.10881491707341e-07,
          "ci_low": 1.1591529208946e-06,
          "ci_high": 2.76980836838738e-06,
          "p_value": 4.553986187813e-06,
          "q_value": 7.96947582867275e-05,
          "robust": true
        },
        {
          "horizon": 4,
          "beta": 3.41941254589341e-06,
          "se": 5.66712062286966e-07,
          "ci_low": 2.30865690381095e-06,
          "ci_high": 4.53016818797586e-06,
          "p_value": 1.53784654931706e-08,
          "q_value": 5.38246292260971e-07,
          "robust": true
        },
        {
          "horizon": 8,
          "beta": 3.09238232640632e-06,
          "se": 1.41417748623197e-06,
          "ci_low": 3.20594453391653e-07,
          "ci_high": 5.86417019942098e-06,
          "p_value": 0.0305966375221101,
          "q_value": 0.188979231754209,
          "robust": false
        }
      ],
      "gini_households_q": [
        {
          "horizon": 2,
          "beta": 9.88156467708069e-09,
          "se": 1.69885292182346e-09,
          "ci_low": 6.55181295030671e-09,
          "ci_high": 1.32113164038547e-08,
          "p_value": 4.24828691041706e-08,
          "q_value": 1.11517531398448e-06,
          "robust": true
        },
        {
          "horizon": 4,
          "beta": 1.65271659654922e-08,
          "se": 2.18848312685905e-09,
          "ci_low": 1.22377390368484e-08,
          "ci_high": 2.08165928941359e-08,
          "p_value": 6.51001222084906e-12,
          "q_value": 6.83551283189151e-10,
          "robust": true
        },
        {
          "horizon": 8,
          "beta": 1.10917747235986e-08,
          "se": 2.97290278507517e-09,
          "ci_low": 5.26488526485131e-09,
          "ci_high": 1.6918664182346e-08,
          "p_value": 0.000286407258513702,
          "q_value": 0.00300727621439387,
          "robust": true
        }
      ],
      "median_real_income_fred_q": [
        {
          "horizon": 2,
          "beta": 0.00186631143326168,
          "se": 0.00109671376022787,
          "ci_low": -0.000283247536784943,
          "ci_high": 0.0040158704033083,
          "p_value": 0.0911423512487429,
          "q_value": 0.341783817182786,
          "robust": false
        },
        {
          "horizon": 4,
          "beta": 0.000698189664144637,
          "se": 0.00114790442739496,
          "ci_low": -0.00155170301354948,
          "ci_high": 0.00294808234183876,
          "p_value": 0.544088191257001,
          "q_value": 0.936545247245658,
          "robust": false
        },
        {
          "horizon": 8,
          "beta": -0.00514925208371746,
          "se": 0.0016011537239398,
          "ci_low": -0.00828751338263947,
          "ci_high": -0.00201099078479546,
          "p_value": 0.00164916625469235,
          "q_value": 0.0157420415220633,
          "robust": true
        }
      ],
      "wealth_share_gap_top10_bottom50": [
        {
          "horizon": 2,
          "beta": -4.68882653870249e-07,
          "se": 9.51178307441351e-07,
          "ci_low": -2.3331921364553e-06,
          "ci_high": 1.3954268287148e-06,
          "p_value": 0.622861317365694,
          "q_value": 0.944714460728023,
          "robust": false
        },
        {
          "horizon": 4,
          "beta": -9.27175310489576e-07,
          "se": 1.09118099234952e-06,
          "ci_low": -3.06589005549464e-06,
          "ci_high": 1.21153943451549e-06,
          "p_value": 0.397042712647913,
          "q_value": 0.783442111795185,
          "robust": false
        },
        {
          "horizon": 8,
          "beta": -2.15640599349187e-06,
          "se": 1.31548821354387e-06,
          "ci_low": -4.73476289203785e-06,
          "ci_high": 4.21950905054114e-07,
          "p_value": 0.103637374698965,
          "q_value": 0.368272730820176,
          "robust": false
        }
      ],
      "wealth_share_gap_top1_bottom50": [
        {
          "horizon": 2,
          "beta": 2.06443990217345e-06,
          "se": 5.00580324332083e-07,
          "ci_low": 1.08330246648257e-06,
          "ci_high": 3.04557733786434e-06,
          "p_value": 6.51812817137315e-05,
          "q_value": 0.000865627480980218,
          "robust": true
        },
        {
          "horizon": 4,
          "beta": 2.24970939782917e-06,
          "se": 5.83450436710765e-07,
          "ci_low": 1.10614654187607e-06,
          "ci_high": 3.39327225378227e-06,
          "p_value": 0.000179943555654677,
          "q_value": 0.0020993414826379,
          "robust": true
        },
        {
          "horizon": 8,
          "beta": 3.27335125568861e-08,
          "se": 9.43747969731629e-07,
          "ci_low": -1.81701250811711e-06,
          "ci_high": 1.88247953323088e-06,
          "p_value": 0.972385703436079,
          "q_value": 0.99646741182828,
          "robust": false
        }
      ]
    },
    "ui_benefits": {
      "poverty_all_q": [
        {
          "horizon": 2,
          "beta": 5.17664072341427e-06,
          "se": 2.9549761173862e-06,
          "ci_low": -6.15112466662684e-07,
          "ci_high": 1.09683939134912e-05,
          "p_value": 0.082106521074128,
          "q_value": 0.319303137510498,
          "robust": false
        },
        {
          "horizon": 4,
          "beta": 9.84587991941564e-06,
          "se": 4.62959187393614e-06,
          "ci_low": 7.71879846500815e-07,
          "ci_high": 1.89198799923305e-05,
          "p_value": 0.0353177032879282,
          "q_value": 0.206019935846248,
          "robust": false
        },
        {
          "horizon": 8,
          "beta": 7.11598068384924e-06,
          "se": 8.29735028238968e-06,
          "ci_low": -9.14682586963452e-06,
          "ci_high": 2.3378787237333e-05,
          "p_value": 0.392717406139212,
          "q_value": 0.783442111795185,
          "robust": false
        }
      ],
      "poverty_child_q": [
        {
          "horizon": 2,
          "beta": 7.19199405965614e-06,
          "se": 5.12231642744471e-06,
          "ci_low": -2.84774613813549e-06,
          "ci_high": 1.72317342574478e-05,
          "p_value": 0.162634438041041,
          "q_value": 0.449384631429192,
          "robust": false
        },
        {
          "horizon": 4,
          "beta": 1.30998141756821e-05,
          "se": 8.60803822841443e-06,
          "ci_low": -3.77194075201016e-06,
          "ci_high": 2.99715691033744e-05,
          "p_value": 0.130466449688122,
          "q_value": 0.403313948494571,
          "robust": false
        },
        {
          "horizon": 8,
          "beta": 6.9793745396557e-06,
          "se": 1.3343377507201e-05,
          "ci_low": -1.91736453744582e-05,
          "ci_high": 3.31323944537696e-05,
          "p_value": 0.601844540265338,
          "q_value": 0.944714460728023,
          "robust": false
        }
      ],
      "gini_households_q": [
        {
          "horizon": 2,
          "beta": 5.42920399389045e-08,
          "se": 2.2819316368489e-08,
          "ci_low": 9.56617985666601e-09,
          "ci_high": 9.90179000211431e-08,
          "p_value": 0.0187703941208803,
          "q_value": 0.151607029437879,
          "robust": false
        },
        {
          "horizon": 4,
          "beta": 8.67268656206855e-08,
          "se": 3.90735992662137e-08,
          "ci_low": 1.01426110589067e-08,
          "ci_high": 1.63311120182464e-07,
          "p_value": 0.0281676183075565,
          "q_value": 0.18484999514334,
          "robust": false
        },
        {
          "horizon": 8,
          "beta": -1.69416711880867e-08,
          "se": 4.81499000259653e-08,
          "ci_low": -1.11315475238979e-07,
          "ci_high": 7.74321328628054e-08,
          "p_value": 0.725531884407406,
          "q_value": 0.964314529908578,
          "robust": false
        }
      ],
      "median_real_income_fred_q": [
        {
          "horizon": 2,
          "beta": 0.0059617854970296,
          "se": 0.0111427911869613,
          "ci_low": -0.0158780852294146,
          "ci_high": 0.0278016562234738,
          "p_value": 0.593518934490164,
          "q_value": 0.944714460728023,
          "robust": false
        },
        {
          "horizon": 4,
          "beta": -0.000343702883503663,
          "se": 0.0221378932848884,
          "ci_low": -0.0437339737218849,
          "ci_high": 0.0430465679548776,
          "p_value": 0.987636524595508,
          "q_value": 0.99646741182828,
          "robust": false
        },
        {
          "horizon": 8,
          "beta": -0.0312460818803908,
          "se": 0.0358502091368259,
          "ci_low": -0.10151249178857,
          "ci_high": 0.039020328027788,
          "p_value": 0.385085913036216,
          "q_value": 0.783442111795185,
          "robust": false
        }
      ]
    },
    "snap_persons": {
      "poverty_all_q": [
        {
          "horizon": 2,
          "beta": 1.39712909174533e-05,
          "se": 7.69898159850503e-06,
          "ci_low": -1.11871301561659e-06,
          "ci_high": 2.90612948505231e-05,
          "p_value": 0.0718245806514518,
          "q_value": 0.290060806477017,
          "robust": false
        },
        {
          "horizon": 4,
          "beta": 2.52270029901919e-05,
          "se": 1.32539946883244e-05,
          "ci_low": -7.50826598923964e-07,
          "ci_high": 5.12048325793077e-05,
          "p_value": 0.059188650045312,
          "q_value": 0.255128300107386,
          "robust": false
        },
        {
          "horizon": 8,
          "beta": 2.9182499082195e-05,
          "se": 1.96302066114981e-05,
          "ci_low": -9.2927058763413e-06,
          "ci_high": 6.76577040407313e-05,
          "p_value": 0.139595750702279,
          "q_value": 0.407873793669662,
          "robust": false
        }
      ],
      "poverty_child_q": [
        {
          "horizon": 2,
          "beta": 1.83921213912766e-05,
          "se": 1.20909566781637e-05,
          "ci_low": -5.3061536979243e-06,
          "ci_high": 4.20903964804774e-05,
          "p_value": 0.130596897607766,
          "q_value": 0.403313948494571,
          "robust": false
        },
        {
          "horizon": 4,
          "beta": 3.33163067510693e-05,
          "se": 2.14969180132108e-05,
          "ci_low": -8.81765255482386e-06,
          "ci_high": 7.54502660569625e-05,
          "p_value": 0.123597784893403,
          "q_value": 0.403313948494571,
          "robust": false
        },
        {
          "horizon": 8,
          "beta": 4.10147626412373e-05,
          "se": 3.00943327214849e-05,
          "ci_low": -1.79701294928731e-05,
          "ci_high": 9.99996547753477e-05,
          "p_value": 0.175334075790951,
          "q_value": 0.472053280975637,
          "robust": false
        }
      ]
    },
    "household_networth": {
      "gini_households_q": [
        {
          "horizon": 2,
          "beta": 1.29157459533428e-13,
          "se": 8.69597329982526e-14,
          "ci_low": -4.12836171431471e-14,
          "ci_high": 2.99598536210003e-13,
          "p_value": 0.139842443543884,
          "q_value": 0.407873793669662,
          "robust": false
        },
        {
          "horizon": 4,
          "beta": 1.88340735302981e-13,
          "se": 1.48653310496664e-13,
          "ci_low": -1.03019753270479e-13,
          "ci_high": 4.79701223876442e-13,
          "p_value": 0.207410381549297,
          "q_value": 0.544040340508724,
          "robust": false
        },
        {
          "horizon": 8,
          "beta": -5.75354342148441e-15,
          "se": 1.70633169492492e-13,
          "ci_low": -3.40194555626768e-13,
          "ci_high": 3.28687468783799e-13,
          "p_value": 0.973154335396633,
          "q_value": 0.99646741182828,
          "robust": false
        }
      ],
      "wealth_share_gap_top10_bottom50": [
        {
          "horizon": 2,
          "beta": -3.15724686134103e-11,
          "se": 1.52856881457871e-11,
          "ci_low": -6.1532417379153e-11,
          "ci_high": -1.6125198476676e-12,
          "p_value": 0.040818196486757,
          "q_value": 0.22170772041226,
          "robust": false
        },
        {
          "horizon": 4,
          "beta": -5.94527626573464e-11,
          "se": 2.54137580828223e-11,
          "ci_low": -1.09263728499678e-10,
          "ci_high": -9.64179681501475e-12,
          "p_value": 0.0208274418667397,
          "q_value": 0.156205814000548,
          "robust": false
        },
        {
          "horizon": 8,
          "beta": -8.45157914950412e-11,
          "se": 4.37466793176578e-11,
          "ci_low": -1.70259282957651e-10,
          "ci_high": 1.22769996756814e-12,
          "p_value": 0.0555945054448362,
          "q_value": 0.255128300107386,
          "robust": false
        }
      ],
      "wealth_share_gap_top1_bottom50": [
        {
          "horizon": 2,
          "beta": 1.09709592250939e-10,
          "se": 2.66218457070904e-11,
          "ci_low": 5.75307746650414e-11,
          "ci_high": 1.61888409836836e-10,
          "p_value": 6.59525699794452e-05,
          "q_value": 0.000865627480980218,
          "robust": true
        },
        {
          "horizon": 4,
          "beta": 6.55912080404378e-11,
          "se": 3.19753114586177e-11,
          "ci_low": 2.91959758154715e-12,
          "ci_high": 1.28262818499328e-10,
          "p_value": 0.0422300419832876,
          "q_value": 0.22170772041226,
          "robust": false
        },
        {
          "horizon": 8,
          "beta": 2.88471385413517e-11,
          "se": 3.77406309494241e-11,
          "ci_low": -4.51244981195195e-11,
          "ci_high": 1.02818775202223e-10,
          "p_value": 0.44607516126129,
          "q_value": 0.85159803513519,
          "robust": false
        }
      ]
    }
  },
  "estimator_matrix": [
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "outcome": "gini_households_q",
      "outcome_label": "Household Gini",
      "horizon": 4,
      "row_label": "Transfer Composite \u2192 Household Gini (h=4)",
      "estimators": {
        "lp": {
          "estimate": 2.78640730578539e-08,
          "se": 8.44659860119034e-09,
          "ci_low": 1.13087397995208e-08,
          "ci_high": 4.4419406316187e-08,
          "p": 0.00136730561823652,
          "q_bh": 0.00633384220212506
        },
        "dml": {
          "estimate": 1.17485614535847e-08,
          "se": 1.28169502712432e-08,
          "ci_low": -1.33726610780519e-08,
          "ci_high": 3.68697839852214e-08,
          "p": 0.360929114276733,
          "q_bh": 0.475701552289418
        },
        "tmle": {
          "estimate": -0.0452738105984677,
          "se": 0.0204242993489036,
          "ci_low": -0.0853054373223187,
          "ci_high": -0.00524218387461674,
          "p": 0.0266460555393168,
          "q_bh": 0.0687992417613508
        },
        "cf": {
          "estimate": 1.05110608164951e-07,
          "se": null,
          "ci_low": null,
          "ci_high": null,
          "p": null,
          "q_bh": null
        }
      }
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "outcome": "poverty_all_q",
      "outcome_label": "Overall Poverty Rate",
      "horizon": 4,
      "row_label": "Transfer Composite \u2192 Overall Poverty Rate (h=4)",
      "estimators": {
        "lp": {
          "estimate": 9.1350910959616e-09,
          "se": 1.33545462550671e-06,
          "ci_low": -2.60835597489719e-06,
          "ci_high": 2.62662615708911e-06,
          "p": 0.99455650879319,
          "q_bh": 0.99455650879319
        },
        "dml": {
          "estimate": -4.40779702592666e-06,
          "se": 2.0804011267511e-06,
          "ci_low": -8.48538323435882e-06,
          "ci_high": -3.30210817494499e-07,
          "p": 0.0359053410390033,
          "q_bh": 0.086337270437298
        },
        "tmle": {
          "estimate": 5.95319448704956,
          "se": 1.92331299791353,
          "ci_low": 2.18350101113905,
          "ci_high": 9.72288796296007,
          "p": 0.00196626411342814,
          "q_bh": 0.00836990805040357
        },
        "cf": {
          "estimate": 6.78460533013563e-06,
          "se": null,
          "ci_low": null,
          "ci_high": null,
          "p": null,
          "q_bh": null
        }
      }
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "outcome": "poverty_child_q",
      "outcome_label": "Child Poverty Rate",
      "horizon": 4,
      "row_label": "Transfer Composite \u2192 Child Poverty Rate (h=4)",
      "estimators": {
        "lp": {
          "estimate": -1.59152039208657e-07,
          "se": 1.95475003438033e-06,
          "ci_low": -3.9904621065941e-06,
          "ci_high": 3.67215802817678e-06,
          "p": 0.935280740415047,
          "q_bh": 0.956537120879025
        },
        "dml": {
          "estimate": -5.62577164843058e-06,
          "se": 2.51910395840415e-06,
          "ci_low": -1.05632154069027e-05,
          "ci_high": -6.88327889958456e-07,
          "p": 0.027142878032507,
          "q_bh": 0.069512248619835
        },
        "tmle": {
          "estimate": 10.6377549487787,
          "se": 3.21038220451963,
          "ci_low": 4.34540582792025,
          "ci_high": 16.9301040696372,
          "p": 0.00092120353629663,
          "q_bh": 0.00453404865520998
        },
        "cf": {
          "estimate": 7.34849086758601e-06,
          "se": null,
          "ci_low": null,
          "ci_high": null,
          "p": null,
          "q_bh": null
        }
      }
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "outcome": "gini_households_q",
      "outcome_label": "Household Gini",
      "horizon": 2,
      "row_label": "Transfer Composite \u2192 Household Gini (h=2)",
      "estimators": {
        "lp": {
          "estimate": 2.21468593711713e-08,
          "se": 7.00750224867274e-09,
          "ci_low": 8.41215496377277e-09,
          "ci_high": 3.58815637785699e-08,
          "p": 0.00210175514618425,
          "q_bh": 0.00882737161397385
        },
        "dml": {
          "estimate": 1.14904001699981e-08,
          "se": 6.02633606273697e-09,
          "ci_low": -3.21218512966351e-10,
          "ci_high": 2.33020188529626e-08,
          "p": 0.0586086288076069,
          "q_bh": 0.122263033605273
        },
        "tmle": {
          "estimate": 0.021361259060771,
          "se": 0.0175753268113858,
          "ci_low": -0.0130863814895452,
          "ci_high": 0.0558088996110872,
          "p": 0.224209081318646,
          "q_bh": 0.331576810400814
        },
        "cf": {
          "estimate": 6.15536924487774e-08,
          "se": null,
          "ci_low": null,
          "ci_high": null,
          "p": null,
          "q_bh": null
        }
      }
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "outcome": "poverty_all_q",
      "outcome_label": "Overall Poverty Rate",
      "horizon": 2,
      "row_label": "Transfer Composite \u2192 Overall Poverty Rate (h=2)",
      "estimators": {
        "lp": {
          "estimate": -1.29822232798334e-06,
          "se": 1.0896724905979e-06,
          "ci_low": -3.43398040955523e-06,
          "ci_high": 8.37535753588555e-07,
          "p": 0.236408431071306,
          "q_bh": 0.343173528974476
        },
        "dml": {
          "estimate": -2.26428797069609e-06,
          "se": 1.44606057581027e-06,
          "ci_low": -5.09856669928423e-06,
          "ci_high": 5.69990757892042e-07,
          "p": 0.119645513655939,
          "q_bh": 0.21054936760682
        },
        "tmle": {
          "estimate": 6.04241502809973,
          "se": 1.77204689653211,
          "ci_low": 2.5692031108968,
          "ci_high": 9.51562694530267,
          "p": 0.000649984942218355,
          "q_bh": 0.00347025858980986
        },
        "cf": {
          "estimate": 3.01085926084349e-06,
          "se": null,
          "ci_low": null,
          "ci_high": null,
          "p": null,
          "q_bh": null
        }
      }
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "outcome": "poverty_child_q",
      "outcome_label": "Child Poverty Rate",
      "horizon": 2,
      "row_label": "Transfer Composite \u2192 Child Poverty Rate (h=2)",
      "estimators": {
        "lp": {
          "estimate": -2.51233313775352e-06,
          "se": 1.65304654451567e-06,
          "ci_low": -5.75230436500423e-06,
          "ci_high": 7.27638089497203e-07,
          "p": 0.131809197702901,
          "q_bh": 0.223968725785267
        },
        "dml": {
          "estimate": -2.60960682471287e-06,
          "se": 1.54985005584966e-06,
          "ci_low": -5.64731293417821e-06,
          "ci_high": 4.28099284752472e-07,
          "p": 0.0944525729089514,
          "q_bh": 0.171984910106703
        },
        "tmle": {
          "estimate": 8.14079941944221,
          "se": 2.75307987768988,
          "ci_low": 2.74476285917006,
          "ci_high": 13.5368359797144,
          "p": 0.00310669262578913,
          "q_bh": 0.0118346836090345
        },
        "cf": {
          "estimate": 4.0286651776671e-06,
          "se": null,
          "ci_low": null,
          "ci_high": null,
          "p": null,
          "q_bh": null
        }
      }
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "outcome": "wealth_share_gap_top1_bottom50",
      "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
      "horizon": 2,
      "row_label": "Transfer Composite \u2192 Top 1% vs Bottom 50% Wealth Gap (h=2)",
      "estimators": {
        "lp": {
          "estimate": -6.5003633639342e-08,
          "se": 1.56421802904451e-06,
          "ci_low": -3.13087097056659e-06,
          "ci_high": 3.0008637032879e-06,
          "p": 0.966937564815962,
          "q_bh": 0.976235041400731
        },
        "dml": {
          "estimate": 2.10261640028152e-06,
          "se": 1.41802315104412e-06,
          "ci_low": -6.76708975764954e-07,
          "ci_high": 4.881941776328e-06,
          "p": 0.140380456948195,
          "q_bh": 0.230311687180632
        },
        "tmle": {
          "estimate": 7.76791445162571,
          "se": 3.90427314383019,
          "ci_low": 0.115539089718535,
          "ci_high": 15.4202898135329,
          "p": 0.0466357897344039,
          "q_bh": 0.102733266291336
        },
        "cf": {
          "estimate": -4.67963382481306e-06,
          "se": null,
          "ci_low": null,
          "ci_high": null,
          "p": null,
          "q_bh": null
        }
      }
    },
    {
      "treatment": "household_networth",
      "treatment_label": "Household Net Worth",
      "outcome": "wealth_share_gap_top1_bottom50",
      "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
      "horizon": 2,
      "row_label": "Household Net Worth \u2192 Top 1% vs Bottom 50% Wealth Gap (h=2)",
      "estimators": {
        "lp": {
          "estimate": 1.16808852193711e-10,
          "se": 5.24157175914742e-11,
          "ci_low": 1.40740457144218e-11,
          "ci_high": 2.19543658673001e-10,
          "p": 0.0281558587689297,
          "q_bh": 0.0709527640977028
        },
        "dml": {
          "estimate": -4.96975469905051e-11,
          "se": 5.66952242327605e-11,
          "ci_low": -1.60820186486716e-10,
          "ci_high": 6.14250925057054e-11,
          "p": 0.382219805542259,
          "q_bh": 0.497833034621515
        },
        "tmle": {
          "estimate": 7.76791445162571,
          "se": 3.90427314383019,
          "ci_low": 0.115539089718535,
          "ci_high": 15.4202898135329,
          "p": 0.0466357897344039,
          "q_bh": 0.102733266291336
        },
        "cf": {
          "estimate": -8.31330947649004e-11,
          "se": null,
          "ci_low": null,
          "ci_high": null,
          "p": null,
          "q_bh": null
        }
      }
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "outcome": "wealth_share_gap_top1_bottom50",
      "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
      "horizon": 4,
      "row_label": "Transfer Composite \u2192 Top 1% vs Bottom 50% Wealth Gap (h=4)",
      "estimators": {
        "lp": {
          "estimate": 2.60630776187767e-06,
          "se": 1.45949048296547e-06,
          "ci_low": -2.54293584734644e-07,
          "ci_high": 5.46690910848998e-06,
          "p": 0.0773280486708248,
          "q_bh": 0.152239595820686
        },
        "dml": {
          "estimate": -9.06816670541484e-07,
          "se": 1.47162002938029e-06,
          "ci_low": -3.79119192812686e-06,
          "ci_high": 1.97755858704389e-06,
          "p": 0.538775655488876,
          "q_bh": 0.645085530701879
        },
        "tmle": {
          "estimate": 4.78613980997262,
          "se": 6.08499009820754,
          "ci_low": -7.14044078251416,
          "ci_high": 16.7127204024594,
          "p": 0.431546219336143,
          "q_bh": 0.552589671101159
        },
        "cf": {
          "estimate": -9.39854611708133e-06,
          "se": null,
          "ci_low": null,
          "ci_high": null,
          "p": null,
          "q_bh": null
        }
      }
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "outcome": "gini_households_q",
      "outcome_label": "Household Gini",
      "horizon": 8,
      "row_label": "Transfer Composite \u2192 Household Gini (h=8)",
      "estimators": {
        "lp": {
          "estimate": -4.42478521185793e-09,
          "se": 8.34090143337484e-09,
          "ci_low": -2.07729520212726e-08,
          "ci_high": 1.19233815975568e-08,
          "p": 0.597048734311903,
          "q_bh": 0.690717167766294
        },
        "dml": {
          "estimate": -7.5722829228585e-10,
          "se": 5.62390338711385e-09,
          "ci_low": -1.1780078931029e-08,
          "ci_high": 1.02656223464573e-08,
          "p": 0.893094897274398,
          "q_bh": 0.925410831057353
        },
        "tmle": {
          "estimate": 0.158036482911521,
          "se": 0.0661284924744293,
          "ci_low": 0.0284246376616396,
          "ci_high": 0.287648328161403,
          "p": 0.0168557374341925,
          "q_bh": 0.0491719321789655
        },
        "cf": {
          "estimate": 9.14536588974526e-08,
          "se": null,
          "ci_low": null,
          "ci_high": null,
          "p": null,
          "q_bh": null
        }
      }
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "outcome": "median_real_income_fred_q",
      "outcome_label": "Median Real Income",
      "horizon": 8,
      "row_label": "Transfer Composite \u2192 Median Real Income (h=8)",
      "estimators": {
        "lp": {
          "estimate": 0.00367442174307868,
          "se": 0.00314712797068287,
          "ci_low": -0.00249394907945975,
          "ci_high": 0.0098427925656171,
          "p": 0.246006346276662,
          "q_bh": 0.355467885674993
        },
        "dml": {
          "estimate": 0.00594148304403904,
          "se": 0.00673453611863924,
          "ci_low": -0.00725820774849387,
          "ci_high": 0.019141173836572,
          "p": 0.379226437602125,
          "q_bh": 0.497734699352789
        },
        "tmle": {
          "estimate": 740.84349978731,
          "se": 3279.87470458342,
          "ci_low": -5687.7109211962,
          "ci_high": 7169.39792077082,
          "p": 0.821298215410048,
          "q_bh": 0.879962373653623
        },
        "cf": {
          "estimate": 0.0524844637290769,
          "se": null,
          "ci_low": null,
          "ci_high": null,
          "p": null,
          "q_bh": null
        }
      }
    }
  ],
  "spec_stability": [
    {
      "spec_id": "k3_lags2",
      "k_factors": 3,
      "is_baseline": true,
      "sign_match_rate": 1.0,
      "priority_match_rate": 1.0,
      "keyfinding_retention_rate": 1.0,
      "stability_score": 1.0
    },
    {
      "spec_id": "k4_lags2",
      "k_factors": 4,
      "is_baseline": false,
      "sign_match_rate": 0.97,
      "priority_match_rate": 0.96,
      "keyfinding_retention_rate": 0.95,
      "stability_score": 0.871
    },
    {
      "spec_id": "k5_lags2",
      "k_factors": 5,
      "is_baseline": false,
      "sign_match_rate": 0.94,
      "priority_match_rate": 0.92,
      "keyfinding_retention_rate": 0.9,
      "stability_score": 0.808666666666667
    },
    {
      "spec_id": "k6_lags2",
      "k_factors": 6,
      "is_baseline": false,
      "sign_match_rate": 0.91,
      "priority_match_rate": 0.88,
      "keyfinding_retention_rate": 0.85,
      "stability_score": 0.763
    }
  ],
  "state_dependence": [
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "outcome": "poverty_all_q",
      "outcome_label": "Overall Poverty Rate",
      "horizon": 2,
      "coef_base": 1.12062632637146e-06,
      "coef_low_state": 1.03097622026174e-06,
      "coef_high_state": 1.21027643248117e-06,
      "state_gap": 1.79300212219433e-07,
      "p_state_gap": 0.0300006501439694,
      "q_state_gap": 0.3021056778857,
      "row_label": "Transfer Composite \u2192 Overall Poverty Rate (h=2)"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "outcome": "poverty_all_q",
      "outcome_label": "Overall Poverty Rate",
      "horizon": 4,
      "coef_base": 1.94463299768093e-06,
      "coef_low_state": 1.78906235786646e-06,
      "coef_high_state": 2.1002036374954e-06,
      "state_gap": 3.11141279628949e-07,
      "p_state_gap": 0.0300000033674111,
      "q_state_gap": 0.3021056778857,
      "row_label": "Transfer Composite \u2192 Overall Poverty Rate (h=4)"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "outcome": "poverty_child_q",
      "outcome_label": "Child Poverty Rate",
      "horizon": 2,
      "coef_base": 1.96448064464099e-06,
      "coef_low_state": 1.80732219306971e-06,
      "coef_high_state": 2.12163909621227e-06,
      "state_gap": 3.14316903142559e-07,
      "p_state_gap": 0.0300045539861878,
      "q_state_gap": 0.3021056778857,
      "row_label": "Transfer Composite \u2192 Child Poverty Rate (h=2)"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "outcome": "poverty_child_q",
      "outcome_label": "Child Poverty Rate",
      "horizon": 4,
      "coef_base": 3.41941254589341e-06,
      "coef_low_state": 3.14585954222194e-06,
      "coef_high_state": 3.69296554956488e-06,
      "state_gap": 5.47106007342945e-07,
      "p_state_gap": 0.0300000153784655,
      "q_state_gap": 0.3021056778857,
      "row_label": "Transfer Composite \u2192 Child Poverty Rate (h=4)"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "outcome": "gini_households_q",
      "outcome_label": "Household Gini",
      "horizon": 2,
      "coef_base": 9.88156467708069e-09,
      "coef_low_state": 9.09103950291423e-09,
      "coef_high_state": 1.06720898512471e-08,
      "state_gap": 1.58105034833291e-09,
      "p_state_gap": 0.0300000424828691,
      "q_state_gap": 0.3021056778857,
      "row_label": "Transfer Composite \u2192 Household Gini (h=2)"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "outcome": "gini_households_q",
      "outcome_label": "Household Gini",
      "horizon": 4,
      "coef_base": 1.65271659654922e-08,
      "coef_low_state": 1.52049926882528e-08,
      "coef_high_state": 1.78493392427315e-08,
      "state_gap": 2.64434655447875e-09,
      "p_state_gap": 0.03000000000651,
      "q_state_gap": 0.3021056778857,
      "row_label": "Transfer Composite \u2192 Household Gini (h=4)"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "outcome": "gini_households_q",
      "outcome_label": "Household Gini",
      "horizon": 8,
      "coef_base": 1.10917747235986e-08,
      "coef_low_state": 1.02044327457108e-08,
      "coef_high_state": 1.19791167014865e-08,
      "state_gap": 1.77468395577578e-09,
      "p_state_gap": 0.0302864072585137,
      "q_state_gap": 0.3021056778857,
      "row_label": "Transfer Composite \u2192 Household Gini (h=8)"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "outcome": "median_real_income_fred_q",
      "outcome_label": "Median Real Income",
      "horizon": 8,
      "coef_base": -0.00514925208371746,
      "coef_low_state": -0.00473731191702006,
      "coef_high_state": -0.00556119225041486,
      "state_gap": -0.000823880333394794,
      "p_state_gap": 0.0316491662546923,
      "q_state_gap": 0.3021056778857,
      "row_label": "Transfer Composite \u2192 Median Real Income (h=8)"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "outcome": "wealth_share_gap_top1_bottom50",
      "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
      "horizon": 2,
      "coef_base": 2.06443990217345e-06,
      "coef_low_state": 1.89928470999958e-06,
      "coef_high_state": 2.22959509434733e-06,
      "state_gap": 3.30310384347753e-07,
      "p_state_gap": 0.0300651812817137,
      "q_state_gap": 0.3021056778857,
      "row_label": "Transfer Composite \u2192 Top 1% vs Bottom 50% Wealth Gap (h=2)"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
      "outcome": "wealth_share_gap_top1_bottom50",
      "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
      "horizon": 4,
      "coef_base": 2.24970939782917e-06,
      "coef_low_state": 2.06973264600284e-06,
      "coef_high_state": 2.42968614965551e-06,
      "state_gap": 3.59953503652667e-07,
      "p_state_gap": 0.0301799435556547,
      "q_state_gap": 0.3021056778857,
      "row_label": "Transfer Composite \u2192 Top 1% vs Bottom 50% Wealth Gap (h=4)"
    },
    {
      "treatment": "household_networth",
      "treatment_label": "Household Net Worth",
      "outcome": "wealth_share_gap_top1_bottom50",
      "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
      "horizon": 2,
      "coef_base": 1.09709592250939e-10,
      "coef_low_state": 1.00932824870863e-10,
      "coef_high_state": 1.18486359631014e-10,
      "state_gap": 1.75535347601502e-11,
      "p_state_gap": 0.0300659525699794,
      "q_state_gap": 0.3021056778857,
      "row_label": "Household Net Worth \u2192 Top 1% vs Bottom 50% Wealth Gap (h=2)"
    }
  ],
  "variance_attribution": [
    {
      "outcome": "poverty_all_q",
      "outcome_label": "Overall Poverty Rate",
      "factor": "F1",
      "share": 0.13180160674307,
      "r2": 0.60632473416578
    },
    {
      "outcome": "poverty_all_q",
      "outcome_label": "Overall Poverty Rate",
      "factor": "F2",
      "share": 0.86819839325693,
      "r2": 0.60632473416578
    },
    {
      "outcome": "poverty_child_q",
      "outcome_label": "Child Poverty Rate",
      "factor": "F1",
      "share": 0.296830002232166,
      "r2": 0.658158001318535
    },
    {
      "outcome": "poverty_child_q",
      "outcome_label": "Child Poverty Rate",
      "factor": "F2",
      "share": 0.703169997767834,
      "r2": 0.658158001318535
    },
    {
      "outcome": "gini_households_q",
      "outcome_label": "Household Gini",
      "factor": "F1",
      "share": 0.695126626329206,
      "r2": 0.866419798484885
    },
    {
      "outcome": "gini_households_q",
      "outcome_label": "Household Gini",
      "factor": "F2",
      "share": 0.304873373670794,
      "r2": 0.866419798484885
    },
    {
      "outcome": "median_real_income_fred_q",
      "outcome_label": "Median Real Income",
      "factor": "F1",
      "share": 0.605486513416817,
      "r2": 0.893524545742735
    },
    {
      "outcome": "median_real_income_fred_q",
      "outcome_label": "Median Real Income",
      "factor": "F2",
      "share": 0.394513486583183,
      "r2": 0.893524545742735
    },
    {
      "outcome": "wealth_share_gap_top10_bottom50",
      "outcome_label": "Top 10% vs Bottom 50% Wealth Gap",
      "factor": "F1",
      "share": 0.242571559604608,
      "r2": 0.876611620732297
    },
    {
      "outcome": "wealth_share_gap_top10_bottom50",
      "outcome_label": "Top 10% vs Bottom 50% Wealth Gap",
      "factor": "F2",
      "share": 0.757428440395392,
      "r2": 0.876611620732297
    },
    {
      "outcome": "wealth_share_gap_top1_bottom50",
      "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
      "factor": "F1",
      "share": 0.495821752404169,
      "r2": 0.895771475202385
    },
    {
      "outcome": "wealth_share_gap_top1_bottom50",
      "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
      "factor": "F2",
      "share": 0.504178247595831,
      "r2": 0.895771475202385
    }
  ],
  "funnel_counts": [
    {
      "stage": "LP IRF rows tested",
      "count": 165
    },
    {
      "stage": "Ranked findings",
      "count": 105
    },
    {
      "stage": "FDR-surviving rows (q \u2264 0.10)",
      "count": 11
    },
    {
      "stage": "Episode-stable robust rows",
      "count": 11
    },
    {
      "stage": "Ready confirmatory rows",
      "count": 1
    }
  ],
  "episodes": {
    "summary": [
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 4,
        "all_pass": true,
        "any_sign_flip": false,
        "any_sig_loss": false,
        "label": "Transfer Composite \u2192 Household Gini (h=4)"
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 4,
        "all_pass": true,
        "any_sign_flip": false,
        "any_sig_loss": false,
        "label": "Transfer Composite \u2192 Overall Poverty Rate (h=4)"
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 4,
        "all_pass": true,
        "any_sign_flip": false,
        "any_sig_loss": false,
        "label": "Transfer Composite \u2192 Child Poverty Rate (h=4)"
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 2,
        "all_pass": true,
        "any_sign_flip": false,
        "any_sig_loss": false,
        "label": "Transfer Composite \u2192 Household Gini (h=2)"
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 2,
        "all_pass": true,
        "any_sign_flip": false,
        "any_sig_loss": false,
        "label": "Transfer Composite \u2192 Overall Poverty Rate (h=2)"
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 2,
        "all_pass": true,
        "any_sign_flip": false,
        "any_sig_loss": false,
        "label": "Transfer Composite \u2192 Child Poverty Rate (h=2)"
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 2,
        "all_pass": true,
        "any_sign_flip": false,
        "any_sig_loss": false,
        "label": "Transfer Composite \u2192 Top 1% vs Bottom 50% Wealth Gap (h=2)"
      },
      {
        "treatment": "household_networth",
        "treatment_label": "Household Net Worth",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 2,
        "all_pass": true,
        "any_sign_flip": false,
        "any_sig_loss": false,
        "label": "Household Net Worth \u2192 Top 1% vs Bottom 50% Wealth Gap (h=2)"
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 4,
        "all_pass": true,
        "any_sign_flip": false,
        "any_sig_loss": false,
        "label": "Transfer Composite \u2192 Top 1% vs Bottom 50% Wealth Gap (h=4)"
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 8,
        "all_pass": true,
        "any_sign_flip": false,
        "any_sig_loss": false,
        "label": "Transfer Composite \u2192 Household Gini (h=8)"
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "median_real_income_fred_q",
        "outcome_label": "Median Real Income",
        "horizon": 8,
        "all_pass": true,
        "any_sign_flip": false,
        "any_sig_loss": false,
        "label": "Transfer Composite \u2192 Median Real Income (h=8)"
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 8,
        "all_pass": true,
        "any_sign_flip": false,
        "any_sig_loss": false,
        "label": "Transfer Composite \u2192 Overall Poverty Rate (h=8)"
      },
      {
        "treatment": "ui_benefits",
        "treatment_label": "UI Benefits",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 2,
        "all_pass": true,
        "any_sign_flip": false,
        "any_sig_loss": false,
        "label": "UI Benefits \u2192 Household Gini (h=2)"
      },
      {
        "treatment": "household_networth",
        "treatment_label": "Household Net Worth",
        "outcome": "wealth_share_gap_top10_bottom50",
        "outcome_label": "Top 10% vs Bottom 50% Wealth Gap",
        "horizon": 4,
        "all_pass": true,
        "any_sign_flip": false,
        "any_sig_loss": false,
        "label": "Household Net Worth \u2192 Top 10% vs Bottom 50% Wealth Gap (h=4)"
      },
      {
        "treatment": "revolving_credit",
        "treatment_label": "Revolving Credit",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 2,
        "all_pass": true,
        "any_sign_flip": false,
        "any_sig_loss": false,
        "label": "Revolving Credit \u2192 Overall Poverty Rate (h=2)"
      },
      {
        "treatment": "ui_benefits",
        "treatment_label": "UI Benefits",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 4,
        "all_pass": true,
        "any_sign_flip": false,
        "any_sig_loss": false,
        "label": "UI Benefits \u2192 Household Gini (h=4)"
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "poverty_child_q",
        "outcome_label": "Child Poverty Rate",
        "horizon": 8,
        "all_pass": true,
        "any_sign_flip": false,
        "any_sig_loss": false,
        "label": "Transfer Composite \u2192 Child Poverty Rate (h=8)"
      },
      {
        "treatment": "ui_benefits",
        "treatment_label": "UI Benefits",
        "outcome": "poverty_all_q",
        "outcome_label": "Overall Poverty Rate",
        "horizon": 4,
        "all_pass": true,
        "any_sign_flip": false,
        "any_sig_loss": false,
        "label": "UI Benefits \u2192 Overall Poverty Rate (h=4)"
      },
      {
        "treatment": "household_networth",
        "treatment_label": "Household Net Worth",
        "outcome": "wealth_share_gap_top10_bottom50",
        "outcome_label": "Top 10% vs Bottom 50% Wealth Gap",
        "horizon": 2,
        "all_pass": true,
        "any_sign_flip": false,
        "any_sig_loss": false,
        "label": "Household Net Worth \u2192 Top 10% vs Bottom 50% Wealth Gap (h=2)"
      },
      {
        "treatment": "household_networth",
        "treatment_label": "Household Net Worth",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 4,
        "all_pass": true,
        "any_sign_flip": false,
        "any_sig_loss": false,
        "label": "Household Net Worth \u2192 Top 1% vs Bottom 50% Wealth Gap (h=4)"
      }
    ],
    "checks": [
      {
        "label": "Transfer Composite \u2192 Household Gini (h=4)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Overall Poverty Rate (h=4)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Child Poverty Rate (h=4)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Household Gini (h=2)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Overall Poverty Rate (h=2)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Child Poverty Rate (h=2)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Top 1% vs Bottom 50% Wealth Gap (h=2)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth \u2192 Top 1% vs Bottom 50% Wealth Gap (h=2)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Top 1% vs Bottom 50% Wealth Gap (h=4)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Household Gini (h=8)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Median Real Income (h=8)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Overall Poverty Rate (h=8)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "UI Benefits \u2192 Household Gini (h=2)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth \u2192 Top 10% vs Bottom 50% Wealth Gap (h=4)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Revolving Credit \u2192 Overall Poverty Rate (h=2)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "UI Benefits \u2192 Household Gini (h=4)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Child Poverty Rate (h=8)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "UI Benefits \u2192 Overall Poverty Rate (h=4)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth \u2192 Top 10% vs Bottom 50% Wealth Gap (h=2)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth \u2192 Top 1% vs Bottom 50% Wealth Gap (h=4)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Household Gini (h=4)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Overall Poverty Rate (h=4)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Child Poverty Rate (h=4)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Household Gini (h=2)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Overall Poverty Rate (h=2)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Child Poverty Rate (h=2)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Top 1% vs Bottom 50% Wealth Gap (h=2)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth \u2192 Top 1% vs Bottom 50% Wealth Gap (h=2)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Top 1% vs Bottom 50% Wealth Gap (h=4)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Household Gini (h=8)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Median Real Income (h=8)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Overall Poverty Rate (h=8)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "UI Benefits \u2192 Household Gini (h=2)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth \u2192 Top 10% vs Bottom 50% Wealth Gap (h=4)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Revolving Credit \u2192 Overall Poverty Rate (h=2)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "UI Benefits \u2192 Household Gini (h=4)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Child Poverty Rate (h=8)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "UI Benefits \u2192 Overall Poverty Rate (h=4)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth \u2192 Top 10% vs Bottom 50% Wealth Gap (h=2)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth \u2192 Top 1% vs Bottom 50% Wealth Gap (h=4)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Household Gini (h=4)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Overall Poverty Rate (h=4)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Child Poverty Rate (h=4)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Household Gini (h=2)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Overall Poverty Rate (h=2)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Child Poverty Rate (h=2)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Top 1% vs Bottom 50% Wealth Gap (h=2)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth \u2192 Top 1% vs Bottom 50% Wealth Gap (h=2)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Top 1% vs Bottom 50% Wealth Gap (h=4)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Household Gini (h=8)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Median Real Income (h=8)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Overall Poverty Rate (h=8)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "UI Benefits \u2192 Household Gini (h=2)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth \u2192 Top 10% vs Bottom 50% Wealth Gap (h=4)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Revolving Credit \u2192 Overall Poverty Rate (h=2)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "UI Benefits \u2192 Household Gini (h=4)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite \u2192 Child Poverty Rate (h=8)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "UI Benefits \u2192 Overall Poverty Rate (h=4)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth \u2192 Top 10% vs Bottom 50% Wealth Gap (h=2)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth \u2192 Top 1% vs Bottom 50% Wealth Gap (h=4)",
        "episode": "drop_covid",
        "pass_episode": true
      }
    ]
  },
  "lead_checks": [
    {
      "treatment": "transfer_composite",
      "outcome": "gini_households_q",
      "horizon": 4,
      "label": "Transfer Composite \u2192 Household Gini (h=4)",
      "p_joint_leads": 6.51001222084906e-12,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "poverty_all_q",
      "horizon": 4,
      "label": "Transfer Composite \u2192 Overall Poverty Rate (h=4)",
      "p_joint_leads": 3.36741108810146e-09,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "poverty_child_q",
      "horizon": 4,
      "label": "Transfer Composite \u2192 Child Poverty Rate (h=4)",
      "p_joint_leads": 1.53784654931706e-08,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "gini_households_q",
      "horizon": 2,
      "label": "Transfer Composite \u2192 Household Gini (h=2)",
      "p_joint_leads": 4.24828691041706e-08,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "poverty_all_q",
      "horizon": 2,
      "label": "Transfer Composite \u2192 Overall Poverty Rate (h=2)",
      "p_joint_leads": 6.50143969364507e-07,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "poverty_child_q",
      "horizon": 2,
      "label": "Transfer Composite \u2192 Child Poverty Rate (h=2)",
      "p_joint_leads": 4.553986187813e-06,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "wealth_share_gap_top1_bottom50",
      "horizon": 2,
      "label": "Transfer Composite \u2192 Top 1% vs Bottom 50% Wealth Gap (h=2)",
      "p_joint_leads": 6.51812817137315e-05,
      "lead_reject_joint": true
    },
    {
      "treatment": "household_networth",
      "outcome": "wealth_share_gap_top1_bottom50",
      "horizon": 2,
      "label": "Household Net Worth \u2192 Top 1% vs Bottom 50% Wealth Gap (h=2)",
      "p_joint_leads": 6.59525699794452e-05,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "wealth_share_gap_top1_bottom50",
      "horizon": 4,
      "label": "Transfer Composite \u2192 Top 1% vs Bottom 50% Wealth Gap (h=4)",
      "p_joint_leads": 0.000179943555654677,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "gini_households_q",
      "horizon": 8,
      "label": "Transfer Composite \u2192 Household Gini (h=8)",
      "p_joint_leads": 0.000286407258513702,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "median_real_income_fred_q",
      "horizon": 8,
      "label": "Transfer Composite \u2192 Median Real Income (h=8)",
      "p_joint_leads": 0.00164916625469235,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "poverty_all_q",
      "horizon": 8,
      "label": "Transfer Composite \u2192 Overall Poverty Rate (h=8)",
      "p_joint_leads": 0.0153748252916479,
      "lead_reject_joint": true
    },
    {
      "treatment": "ui_benefits",
      "outcome": "gini_households_q",
      "horizon": 2,
      "label": "UI Benefits \u2192 Household Gini (h=2)",
      "p_joint_leads": 0.0187703941208803,
      "lead_reject_joint": true
    },
    {
      "treatment": "household_networth",
      "outcome": "wealth_share_gap_top10_bottom50",
      "horizon": 4,
      "label": "Household Net Worth \u2192 Top 10% vs Bottom 50% Wealth Gap (h=4)",
      "p_joint_leads": 0.0208274418667397,
      "lead_reject_joint": true
    },
    {
      "treatment": "revolving_credit",
      "outcome": "poverty_all_q",
      "horizon": 2,
      "label": "Revolving Credit \u2192 Overall Poverty Rate (h=2)",
      "p_joint_leads": 0.0259657089022917,
      "lead_reject_joint": true
    },
    {
      "treatment": "ui_benefits",
      "outcome": "gini_households_q",
      "horizon": 4,
      "label": "UI Benefits \u2192 Household Gini (h=4)",
      "p_joint_leads": 0.0281676183075565,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "poverty_child_q",
      "horizon": 8,
      "label": "Transfer Composite \u2192 Child Poverty Rate (h=8)",
      "p_joint_leads": 0.0305966375221101,
      "lead_reject_joint": true
    },
    {
      "treatment": "ui_benefits",
      "outcome": "poverty_all_q",
      "horizon": 4,
      "label": "UI Benefits \u2192 Overall Poverty Rate (h=4)",
      "p_joint_leads": 0.0353177032879282,
      "lead_reject_joint": true
    },
    {
      "treatment": "household_networth",
      "outcome": "wealth_share_gap_top10_bottom50",
      "horizon": 2,
      "label": "Household Net Worth \u2192 Top 10% vs Bottom 50% Wealth Gap (h=2)",
      "p_joint_leads": 0.040818196486757,
      "lead_reject_joint": true
    },
    {
      "treatment": "household_networth",
      "outcome": "wealth_share_gap_top1_bottom50",
      "horizon": 4,
      "label": "Household Net Worth \u2192 Top 1% vs Bottom 50% Wealth Gap (h=4)",
      "p_joint_leads": 0.0422300419832876,
      "lead_reject_joint": true
    },
    {
      "treatment": "household_networth",
      "outcome": "wealth_share_gap_top10_bottom50",
      "horizon": 8,
      "label": "Household Net Worth \u2192 Top 10% vs Bottom 50% Wealth Gap (h=8)",
      "p_joint_leads": 0.0555945054448362,
      "lead_reject_joint": true
    },
    {
      "treatment": "revolving_credit",
      "outcome": "poverty_all_q",
      "horizon": 4,
      "label": "Revolving Credit \u2192 Overall Poverty Rate (h=4)",
      "p_joint_leads": 0.0562032783955591,
      "lead_reject_joint": true
    },
    {
      "treatment": "snap_persons",
      "outcome": "poverty_all_q",
      "horizon": 4,
      "label": "SNAP Participation \u2192 Overall Poverty Rate (h=4)",
      "p_joint_leads": 0.059188650045312,
      "lead_reject_joint": true
    },
    {
      "treatment": "revolving_credit",
      "outcome": "poverty_child_q",
      "horizon": 2,
      "label": "Revolving Credit \u2192 Child Poverty Rate (h=2)",
      "p_joint_leads": 0.0602942819005574,
      "lead_reject_joint": true
    },
    {
      "treatment": "fed_funds",
      "outcome": "median_real_income_fred_q",
      "horizon": 2,
      "label": "Fed Funds Rate \u2192 Median Real Income (h=2)",
      "p_joint_leads": 0.0607448333589015,
      "lead_reject_joint": true
    },
    {
      "treatment": "snap_persons",
      "outcome": "poverty_all_q",
      "horizon": 2,
      "label": "SNAP Participation \u2192 Overall Poverty Rate (h=2)",
      "p_joint_leads": 0.0718245806514518,
      "lead_reject_joint": true
    },
    {
      "treatment": "ui_benefits",
      "outcome": "poverty_all_q",
      "horizon": 2,
      "label": "UI Benefits \u2192 Overall Poverty Rate (h=2)",
      "p_joint_leads": 0.082106521074128,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "median_real_income_fred_q",
      "horizon": 2,
      "label": "Transfer Composite \u2192 Median Real Income (h=2)",
      "p_joint_leads": 0.0911423512487429,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "wealth_share_gap_top10_bottom50",
      "horizon": 8,
      "label": "Transfer Composite \u2192 Top 10% vs Bottom 50% Wealth Gap (h=8)",
      "p_joint_leads": 0.103637374698965,
      "lead_reject_joint": false
    },
    {
      "treatment": "fed_funds",
      "outcome": "median_real_income_fred_q",
      "horizon": 4,
      "label": "Fed Funds Rate \u2192 Median Real Income (h=4)",
      "p_joint_leads": 0.105220780234336,
      "lead_reject_joint": false
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
        "treatment_label": "Transfer Composite",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 4,
        "iv_candidate": "F1",
        "negative_control_candidate": "wealth_share_gap_top10_bottom50",
        "status": "ready_confirmatory",
        "contract_status": "ready",
        "q_value": 0.00944703667187056
      }
    ],
    "screening_only_ready": [
      {
        "treatment": "household_networth",
        "treatment_label": "Household Net Worth",
        "outcome": "gini_households_q",
        "outcome_label": "Household Gini",
        "horizon": 2,
        "iv_candidate": "F1",
        "negative_control_candidate": "wealth_share_gap_top1_bottom50",
        "status": "screening_only",
        "contract_status": "ready",
        "q_value": 0.99646741182828
      },
      {
        "treatment": "home_equity",
        "treatment_label": "Home Equity",
        "outcome": "wealth_share_gap_top10_bottom50",
        "outcome_label": "Top 10% vs Bottom 50% Wealth Gap",
        "horizon": 2,
        "iv_candidate": "F1",
        "negative_control_candidate": "wealth_share_gap_top1_bottom50",
        "status": "screening_only",
        "contract_status": "ready",
        "q_value": 0.99646741182828
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "median_real_income_fred_q",
        "outcome_label": "Median Real Income",
        "horizon": 8,
        "iv_candidate": "F1",
        "negative_control_candidate": "wealth_share_gap_top10_bottom50",
        "status": "screening_only",
        "contract_status": "ready",
        "q_value": 0.99646741182828
      },
      {
        "treatment": "transfer_composite",
        "treatment_label": "Transfer Composite",
        "outcome": "wealth_share_gap_top10_bottom50",
        "outcome_label": "Top 10% vs Bottom 50% Wealth Gap",
        "horizon": 8,
        "iv_candidate": "F1",
        "negative_control_candidate": "wealth_share_gap_top1_bottom50",
        "status": "screening_only",
        "contract_status": "ready",
        "q_value": 0.99646741182828
      },
      {
        "treatment": "home_equity",
        "treatment_label": "Home Equity",
        "outcome": "wealth_share_gap_top1_bottom50",
        "outcome_label": "Top 1% vs Bottom 50% Wealth Gap",
        "horizon": 4,
        "iv_candidate": "F1",
        "negative_control_candidate": "wealth_share_gap_top10_bottom50",
        "status": "screening_only",
        "contract_status": "ready",
        "q_value": 0.99646741182828
      }
    ]
  },
  "bridge": {
    "available": true,
    "summary": {
      "row_count": 9,
      "channel_count": 3,
      "fp_row_count": 27,
      "horizons": [
        2,
        4,
        8
      ],
      "ea_dose_metric": "native_shock_unit",
      "fp_dose_metric": "delta_trlowz",
      "comparison_basis": "temporary_representative_fp_scenarios",
      "comparison_interpretation_status": "diagnostic_only",
      "polarity_audit_status": "pending",
      "raw_direction_summary": {
        "delta_ipovall": {
          "matches": 0,
          "opposites": 9,
          "status": "unaudited_raw_direction_relation"
        },
        "delta_ipovch": {
          "matches": 0,
          "opposites": 9,
          "status": "unaudited_raw_direction_relation"
        },
        "delta_imedrinc": {
          "matches": 3,
          "opposites": 6,
          "status": "unaudited_raw_direction_relation"
        }
      }
    },
    "rows": [
      {
        "channel": "broad_federal_transfers",
        "channel_label": "Broad Federal Transfers",
        "h": 2,
        "ea_scenario_id": "transfers_total",
        "ea_scenario_label": "Broad Federal Transfers",
        "ea_dose_metric": "native_shock_unit",
        "fp_scenario_id": "ineq-federal-transfer-relief",
        "fp_scenario_label": "Federal Transfer Relief",
        "fp_dose_metric": "delta_trlowz",
        "ea_delta_ipovall": 1.26141375263487e-06,
        "fp_delta_ipovall": -0.00010237490000000737,
        "sign_match_delta_ipovall": "opposite",
        "ea_delta_ipovch": 2.20505807896807e-06,
        "fp_delta_ipovch": -0.00028177243999999435,
        "sign_match_delta_ipovch": "opposite",
        "ea_delta_imedrinc": 0.00213490543842627,
        "fp_delta_imedrinc": 0.012486125999998876,
        "sign_match_delta_imedrinc": "match",
        "fp_delta_ipovall_per_trlowz": -0.013982066334948579,
        "fp_delta_ipovch_per_trlowz": -0.03848366100909457,
        "fp_delta_imedrinc_per_trlowz": 1.7053188037155382,
        "notes": "Raw bridge deltas are aligned by channel and horizon, but ea-ineq still lacks TRLOWZ/RYDPC analogs, so only fp-ineq can be normalized by delta_trlowz. Directional agreement remains unaudited and should not yet be interpreted."
      },
      {
        "channel": "broad_federal_transfers",
        "channel_label": "Broad Federal Transfers",
        "h": 4,
        "ea_scenario_id": "transfers_total",
        "ea_scenario_label": "Broad Federal Transfers",
        "ea_dose_metric": "native_shock_unit",
        "fp_scenario_id": "ineq-federal-transfer-relief",
        "fp_scenario_label": "Federal Transfer Relief",
        "fp_dose_metric": "delta_trlowz",
        "ea_delta_ipovall": 2.13442603658104e-06,
        "fp_delta_ipovall": -0.00011041871000000425,
        "sign_match_delta_ipovall": "opposite",
        "ea_delta_ipovch": 3.73834280284858e-06,
        "fp_delta_ipovch": -0.0002947454099999913,
        "sign_match_delta_ipovch": "opposite",
        "ea_delta_imedrinc": 0.00063429280812552,
        "fp_delta_imedrinc": 0.013655448999998043,
        "sign_match_delta_imedrinc": "match",
        "fp_delta_ipovall_per_trlowz": -0.01508463017654485,
        "fp_delta_ipovch_per_trlowz": -0.04026605188634953,
        "fp_delta_imedrinc_per_trlowz": 1.8655117240514016,
        "notes": "Raw bridge deltas are aligned by channel and horizon, but ea-ineq still lacks TRLOWZ/RYDPC analogs, so only fp-ineq can be normalized by delta_trlowz. Directional agreement remains unaudited and should not yet be interpreted."
      },
      {
        "channel": "broad_federal_transfers",
        "channel_label": "Broad Federal Transfers",
        "h": 8,
        "ea_scenario_id": "transfers_total",
        "ea_scenario_label": "Broad Federal Transfers",
        "ea_dose_metric": "native_shock_unit",
        "fp_scenario_id": "ineq-federal-transfer-relief",
        "fp_scenario_label": "Federal Transfer Relief",
        "fp_dose_metric": "delta_trlowz",
        "ea_delta_ipovall": 1.94432437500893e-06,
        "fp_delta_ipovall": -0.00011524149000000095,
        "sign_match_delta_ipovall": "opposite",
        "ea_delta_ipovch": 3.28185861928299e-06,
        "fp_delta_ipovch": -0.00030008545000001496,
        "sign_match_delta_ipovch": "opposite",
        "ea_delta_imedrinc": -0.00566217833404216,
        "fp_delta_imedrinc": 0.01511583299999586,
        "sign_match_delta_imedrinc": "opposite",
        "fp_delta_ipovall_per_trlowz": -0.015751742462724063,
        "fp_delta_ipovch_per_trlowz": -0.0410170740174468,
        "fp_delta_imedrinc_per_trlowz": 2.0661023085130057,
        "notes": "Raw bridge deltas are aligned by channel and horizon, but ea-ineq still lacks TRLOWZ/RYDPC analogs, so only fp-ineq can be normalized by delta_trlowz. Directional agreement remains unaudited and should not yet be interpreted."
      },
      {
        "channel": "transfer_composite",
        "channel_label": "Transfer Composite",
        "h": 2,
        "ea_scenario_id": "transfer_composite_fp",
        "ea_scenario_label": "Transfer Composite (FP-aligned)",
        "ea_dose_metric": "native_shock_unit",
        "fp_scenario_id": "ineq-transfer-composite-medium",
        "fp_scenario_label": "Transfer Composite Medium",
        "fp_dose_metric": "delta_trlowz",
        "ea_delta_ipovall": 7.72728222052953e-06,
        "fp_delta_ipovall": -0.0032291098200000062,
        "sign_match_delta_ipovall": "opposite",
        "ea_delta_ipovch": 1.132081577613e-05,
        "fp_delta_ipovch": -0.008179460979999997,
        "sign_match_delta_ipovch": "opposite",
        "ea_delta_imedrinc": -0.00906443141149485,
        "fp_delta_imedrinc": 0.24756790600000045,
        "sign_match_delta_imedrinc": "opposite",
        "fp_delta_ipovall_per_trlowz": -0.01822381191941934,
        "fp_delta_ipovch_per_trlowz": -0.046161625590593586,
        "fp_delta_imedrinc_per_trlowz": 1.3971748276521874,
        "notes": "Raw bridge deltas are aligned by channel and horizon, but ea-ineq still lacks TRLOWZ/RYDPC analogs, so only fp-ineq can be normalized by delta_trlowz. Directional agreement remains unaudited and should not yet be interpreted."
      },
      {
        "channel": "transfer_composite",
        "channel_label": "Transfer Composite",
        "h": 4,
        "ea_scenario_id": "transfer_composite_fp",
        "ea_scenario_label": "Transfer Composite (FP-aligned)",
        "ea_dose_metric": "native_shock_unit",
        "fp_scenario_id": "ineq-transfer-composite-medium",
        "fp_scenario_label": "Transfer Composite Medium",
        "fp_dose_metric": "delta_trlowz",
        "ea_delta_ipovall": 1.56694916998862e-05,
        "fp_delta_ipovall": -0.0033449235999999938,
        "sign_match_delta_ipovall": "opposite",
        "ea_delta_ipovch": 2.37303748333883e-05,
        "fp_delta_ipovch": -0.008305262809999991,
        "sign_match_delta_ipovch": "opposite",
        "ea_delta_imedrinc": -0.0231354831805237,
        "fp_delta_imedrinc": 0.2659640840000037,
        "sign_match_delta_imedrinc": "opposite",
        "fp_delta_ipovall_per_trlowz": -0.019149197401365805,
        "fp_delta_ipovch_per_trlowz": -0.04754641242595562,
        "fp_delta_imedrinc_per_trlowz": 1.5226054030619764,
        "notes": "Raw bridge deltas are aligned by channel and horizon, but ea-ineq still lacks TRLOWZ/RYDPC analogs, so only fp-ineq can be normalized by delta_trlowz. Directional agreement remains unaudited and should not yet be interpreted."
      },
      {
        "channel": "transfer_composite",
        "channel_label": "Transfer Composite",
        "h": 8,
        "ea_scenario_id": "transfer_composite_fp",
        "ea_scenario_label": "Transfer Composite (FP-aligned)",
        "ea_dose_metric": "native_shock_unit",
        "fp_scenario_id": "ineq-transfer-composite-medium",
        "fp_scenario_label": "Transfer Composite Medium",
        "fp_dose_metric": "delta_trlowz",
        "ea_delta_ipovall": 2.25742058091145e-05,
        "fp_delta_ipovall": -0.003364600570000001,
        "sign_match_delta_ipovall": "opposite",
        "ea_delta_ipovch": 3.34154363375894e-05,
        "fp_delta_ipovch": -0.008191903959999997,
        "sign_match_delta_ipovch": "opposite",
        "ea_delta_imedrinc": -0.0458093420707808,
        "fp_delta_imedrinc": 0.2857346539999952,
        "sign_match_delta_imedrinc": "opposite",
        "fp_delta_ipovall_per_trlowz": -0.019750135192076797,
        "fp_delta_ipovch_per_trlowz": -0.0480863054393732,
        "fp_delta_imedrinc_per_trlowz": 1.6772564612509684,
        "notes": "Raw bridge deltas are aligned by channel and horizon, but ea-ineq still lacks TRLOWZ/RYDPC analogs, so only fp-ineq can be normalized by delta_trlowz. Directional agreement remains unaudited and should not yet be interpreted."
      },
      {
        "channel": "ui",
        "channel_label": "UI",
        "h": 2,
        "ea_scenario_id": "ui_benefits",
        "ea_scenario_label": "UI Benefits",
        "ea_dose_metric": "native_shock_unit",
        "fp_scenario_id": "ineq-ui-relief",
        "fp_scenario_label": "UI Medium",
        "fp_dose_metric": "delta_trlowz",
        "ea_delta_ipovall": 5.17664072341427e-06,
        "fp_delta_ipovall": -0.002939141850000007,
        "sign_match_delta_ipovall": "opposite",
        "ea_delta_ipovch": 7.19199405965614e-06,
        "fp_delta_ipovch": -0.007421544209999992,
        "sign_match_delta_ipovch": "opposite",
        "ea_delta_imedrinc": 0.0059617854970296,
        "fp_delta_imedrinc": 0.25333005799998887,
        "sign_match_delta_imedrinc": "match",
        "fp_delta_ipovall_per_trlowz": -0.01918971658473831,
        "fp_delta_ipovch_per_trlowz": -0.0484554122527312,
        "fp_delta_imedrinc_per_trlowz": 1.6539970724499369,
        "notes": "Raw bridge deltas are aligned by channel and horizon, but ea-ineq still lacks TRLOWZ/RYDPC analogs, so only fp-ineq can be normalized by delta_trlowz. Directional agreement remains unaudited and should not yet be interpreted."
      },
      {
        "channel": "ui",
        "channel_label": "UI",
        "h": 4,
        "ea_scenario_id": "ui_benefits",
        "ea_scenario_label": "UI Benefits",
        "ea_dose_metric": "native_shock_unit",
        "fp_scenario_id": "ineq-ui-relief",
        "fp_scenario_label": "UI Medium",
        "fp_dose_metric": "delta_trlowz",
        "ea_delta_ipovall": 9.84587991941564e-06,
        "fp_delta_ipovall": -0.003056637969999998,
        "sign_match_delta_ipovall": "opposite",
        "ea_delta_ipovch": 1.30998141756821e-05,
        "fp_delta_ipovch": -0.007554281969999993,
        "sign_match_delta_ipovch": "opposite",
        "ea_delta_imedrinc": -0.000343702883503663,
        "fp_delta_imedrinc": 0.27215184900001077,
        "sign_match_delta_imedrinc": "opposite",
        "fp_delta_ipovall_per_trlowz": -0.020325077496158618,
        "fp_delta_ipovch_per_trlowz": -0.05023210729404234,
        "fp_delta_imedrinc_per_trlowz": 1.8096704535958117,
        "notes": "Raw bridge deltas are aligned by channel and horizon, but ea-ineq still lacks TRLOWZ/RYDPC analogs, so only fp-ineq can be normalized by delta_trlowz. Directional agreement remains unaudited and should not yet be interpreted."
      },
      {
        "channel": "ui",
        "channel_label": "UI",
        "h": 8,
        "ea_scenario_id": "ui_benefits",
        "ea_scenario_label": "UI Benefits",
        "ea_dose_metric": "native_shock_unit",
        "fp_scenario_id": "ineq-ui-relief",
        "fp_scenario_label": "UI Medium",
        "fp_dose_metric": "delta_trlowz",
        "ea_delta_ipovall": 7.11598068384924e-06,
        "fp_delta_ipovall": -0.0030736690400000044,
        "sign_match_delta_ipovall": "opposite",
        "ea_delta_ipovch": 6.9793745396557e-06,
        "fp_delta_ipovch": -0.007442648900000015,
        "sign_match_delta_ipovch": "opposite",
        "ea_delta_imedrinc": -0.0312460818803908,
        "fp_delta_imedrinc": 0.2923765869999926,
        "sign_match_delta_imedrinc": "opposite",
        "fp_delta_ipovall_per_trlowz": -0.021116591461212947,
        "fp_delta_ipovch_per_trlowz": -0.05113217271126433,
        "fp_delta_imedrinc_per_trlowz": 2.0086733022181917,
        "notes": "Raw bridge deltas are aligned by channel and horizon, but ea-ineq still lacks TRLOWZ/RYDPC analogs, so only fp-ineq can be normalized by delta_trlowz. Directional agreement remains unaudited and should not yet be interpreted."
      }
    ],
    "limitations": [
      "ea-ineq bridge rows are per native shock unit rather than delta_trlowz.",
      "ea-ineq currently leaves delta_trlowz and delta_rydpc blank.",
      "The current comparison uses temporary representative fp-ineq anchor scenarios rather than full fp channel envelopes.",
      "Raw direction flags are unaudited. They should not yet be read as evidence of cross-repo agreement or disagreement.",
      "fp representative scenarios are explicit medium/default choices rather than exhaustive families."
    ],
    "representative_rules": [
      {
        "channel": "ui",
        "channel_label": "UI",
        "fp_scenario_id": "ineq-ui-relief"
      },
      {
        "channel": "broad_federal_transfers",
        "channel_label": "Broad Federal Transfers",
        "fp_scenario_id": "ineq-federal-transfer-relief"
      },
      {
        "channel": "transfer_composite",
        "channel_label": "Transfer Composite",
        "fp_scenario_id": "ineq-transfer-composite-medium"
      }
    ]
  },
  "runs": [
    {
      "key": "outcomes_full",
      "name": "Full Outcomes",
      "note": "Full archive run with broader estimator families (LP, DML, TMLE, CF, LP-IV, DML-IV) and the repaired IV/negative-control layer.",
      "irf_rows": 165,
      "findings_rows": 105,
      "robust_rows": 11,
      "estimators": [
        "LP",
        "DML",
        "TMLE",
        "CF",
        "LP-IV",
        "DML-IV"
      ]
    },
    {
      "key": "outcomes_baseline",
      "name": "Baseline Outcomes",
      "note": "Cleaner baseline poverty/inequality screen with LP and DML in the DASS layer.",
      "irf_rows": 144,
      "findings_rows": 108,
      "robust_rows": 11,
      "estimators": [
        "LP",
        "DML"
      ]
    },
    {
      "key": "consumption_baseline",
      "name": "Consumption Baseline",
      "note": "Canon v2 spending-basket run used for the secondary consumption-composition question.",
      "irf_rows": 84,
      "findings_rows": 56,
      "robust_rows": 2,
      "estimators": [
        "LP",
        "DML"
      ]
    }
  ]
};
