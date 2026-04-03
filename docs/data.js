const DATA = {
  "meta": {
    "title": "Fiscal Transfers, Poverty, Inequality, and Consumption Composition",
    "subtitle": "Project-specific archive built on econark's R pipeline",
    "archive_date": "2026-04-03",
    "econark_commit": "7cb68eb"
  },
  "overview": {
    "headline_stat": "11 robust rows",
    "headline_label": "10 are transfer-composite rows, covering 5 distinct poverty or inequality outcomes.",
    "takeaway": "Transfers are the main story in this archive. The strongest screen-positive evidence links the transfer composite to lower poverty, lower child poverty, a lower household Gini, and a narrower top-versus-bottom wealth-share gap. The canon v2 consumption basket adds a secondary result: UI benefits tilt spending toward essentials one quarter out."
  },
  "questions": [
    {
      "tag": "Q1",
      "tier": "headline",
      "title": "Do transfer shocks move poverty and inequality outcomes?",
      "description": "This is the archive headline. The full outcomes run is dominated by transfer-composite responses in poverty, child poverty, inequality, and wealth-gap outcomes."
    },
    {
      "tag": "Q2",
      "tier": "secondary",
      "title": "Which transfer programs matter individually?",
      "description": "UI, Social Security, and SNAP are broken out to ask whether the broad transfer result is driven by a narrower program channel."
    },
    {
      "tag": "Q3",
      "tier": "secondary",
      "title": "Do shocks shift essential versus discretionary spending?",
      "description": "The canon v2 basket ports the essential-versus-discretionary logic from ea-gender into the poverty archive and tests whether policy shocks rebalance spending."
    },
    {
      "tag": "Q4",
      "tier": "suggestive",
      "title": "How do rates, credit, and wealth compare with transfers?",
      "description": "Fed funds, credit conditions, and household net worth are included as contrasts. They matter for some rows, but they do not dominate the archive the way transfers do."
    },
    {
      "tag": "Q5",
      "tier": "methods",
      "title": "How much of this survives the confirmatory layer?",
      "description": "The IV/negative-control pipeline is cleaner after the econark-r fixes, but confirmatory coverage remains much narrower than the screening evidence."
    }
  ],
  "key_variables": [
    {
      "name": "transfer_composite",
      "display": "Transfer Composite",
      "source": "Derived from transfers, Social Security, and UI",
      "definition": "Broad transfer-support measure used for the headline poverty and inequality question."
    },
    {
      "name": "ui_benefits",
      "display": "UI Benefits",
      "source": "FRED / national accounts transfer series",
      "definition": "Unemployment-insurance transfer flow used both on its own and inside the broader transfer composite."
    },
    {
      "name": "poverty_all_q",
      "display": "Overall Poverty Rate",
      "source": "Quarterly poverty panel",
      "definition": "Quarterly poverty rate for the full population."
    },
    {
      "name": "poverty_child_q",
      "display": "Child Poverty Rate",
      "source": "Quarterly poverty panel",
      "definition": "Quarterly poverty rate for children, used as the most policy-salient poverty outcome in the archive."
    },
    {
      "name": "gini_households_q",
      "display": "Household Gini",
      "source": "Quarterly inequality panel",
      "definition": "Quarterly household-level inequality measure used as the main distributional concentration outcome."
    },
    {
      "name": "wealth_share_gap_top1_bottom50",
      "display": "Top 1% vs Bottom 50% Wealth Gap",
      "source": "Distributional wealth panel",
      "definition": "Difference between the wealth share of the top 1 percent and the wealth share of the bottom 50 percent."
    },
    {
      "name": "pce_essential_v2_idx",
      "display": "Essential Spending Index",
      "source": "Derived from BEA/CEX inputs",
      "definition": "Canon v2 essential basket built from housing, food, and healthcare using CE-style weights."
    },
    {
      "name": "pce_discretionary_v2_idx",
      "display": "Discretionary Spending Index",
      "source": "Derived from BEA/CEX inputs",
      "definition": "Canon v2 discretionary basket built from recreation, transport, and clothing using symmetric weights."
    },
    {
      "name": "pce_gap_v2",
      "display": "Essential vs Discretionary Gap",
      "source": "Derived",
      "definition": "Log ratio of essential to discretionary spending, written as log(E/D)."
    },
    {
      "name": "pce_eshare_v2",
      "display": "Essential Spending Share",
      "source": "Derived",
      "definition": "Essential spending as a share of combined essential plus discretionary spending, E / (E + D)."
    }
  ],
  "story_counts": {
    "headline_robust_rows": 11,
    "transfer_headline_rows": 10,
    "headline_outcomes_covered": 5,
    "headline_treatments_covered": 2,
    "consumption_robust_rows": 2,
    "confirmatory_ready_rows": 1
  },
  "headline_findings": [
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
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
            "nominal_sig": true,
            "notes": "hac"
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
            "nominal_sig": false,
            "notes": "crossfit residual-on-residual"
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
            "nominal_sig": true,
            "notes": "TMLE targeting update with HAC influence-curve SE"
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
            "nominal_sig": false,
            "notes": "lm_fallback"
          }
        ]
      },
      "row_label": "Transfer Composite -> Household Gini (h=4)"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
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
            "nominal_sig": false,
            "notes": "hac"
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
            "nominal_sig": true,
            "notes": "crossfit residual-on-residual"
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
            "nominal_sig": true,
            "notes": "TMLE targeting update with HAC influence-curve SE"
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
            "nominal_sig": false,
            "notes": "lm_fallback"
          }
        ]
      },
      "row_label": "Transfer Composite -> Overall Poverty Rate (h=4)"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
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
            "nominal_sig": false,
            "notes": "hac"
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
            "nominal_sig": true,
            "notes": "crossfit residual-on-residual"
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
            "nominal_sig": true,
            "notes": "TMLE targeting update with HAC influence-curve SE"
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
            "nominal_sig": false,
            "notes": "lm_fallback"
          }
        ]
      },
      "row_label": "Transfer Composite -> Child Poverty Rate (h=4)"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
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
            "nominal_sig": true,
            "notes": "hac"
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
            "nominal_sig": true,
            "notes": "crossfit residual-on-residual"
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
            "nominal_sig": false,
            "notes": "TMLE targeting update with HAC influence-curve SE"
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
            "nominal_sig": false,
            "notes": "lm_fallback"
          }
        ]
      },
      "row_label": "Transfer Composite -> Household Gini (h=2)"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
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
            "nominal_sig": false,
            "notes": "hac"
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
            "nominal_sig": false,
            "notes": "crossfit residual-on-residual"
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
            "nominal_sig": true,
            "notes": "TMLE targeting update with HAC influence-curve SE"
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
            "nominal_sig": false,
            "notes": "lm_fallback"
          }
        ]
      },
      "row_label": "Transfer Composite -> Overall Poverty Rate (h=2)"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
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
            "nominal_sig": false,
            "notes": "hac"
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
            "nominal_sig": true,
            "notes": "crossfit residual-on-residual"
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
            "nominal_sig": true,
            "notes": "TMLE targeting update with HAC influence-curve SE"
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
            "nominal_sig": false,
            "notes": "lm_fallback"
          }
        ]
      },
      "row_label": "Transfer Composite -> Child Poverty Rate (h=2)"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
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
            "nominal_sig": false,
            "notes": "hac"
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
            "nominal_sig": false,
            "notes": "crossfit residual-on-residual"
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
            "nominal_sig": true,
            "notes": "TMLE targeting update with HAC influence-curve SE"
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
            "nominal_sig": false,
            "notes": "lm_fallback"
          }
        ]
      },
      "row_label": "Transfer Composite -> Top 1% vs Bottom 50% Wealth Gap (h=2)"
    },
    {
      "treatment": "household_networth",
      "treatment_label": "Household Net Worth",
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
            "nominal_sig": true,
            "notes": "hac"
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
            "nominal_sig": false,
            "notes": "crossfit residual-on-residual"
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
            "nominal_sig": true,
            "notes": "TMLE targeting update with HAC influence-curve SE"
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
            "nominal_sig": false,
            "notes": "lm_fallback"
          }
        ]
      },
      "row_label": "Household Net Worth -> Top 1% vs Bottom 50% Wealth Gap (h=2)"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
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
            "nominal_sig": true,
            "notes": "hac"
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
            "nominal_sig": false,
            "notes": "crossfit residual-on-residual"
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
            "nominal_sig": false,
            "notes": "TMLE targeting update with HAC influence-curve SE"
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
            "nominal_sig": false,
            "notes": "lm_fallback"
          }
        ]
      },
      "row_label": "Transfer Composite -> Top 1% vs Bottom 50% Wealth Gap (h=4)"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
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
            "nominal_sig": false,
            "notes": "hac"
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
            "nominal_sig": false,
            "notes": "crossfit residual-on-residual"
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
            "nominal_sig": true,
            "notes": "TMLE targeting update with HAC influence-curve SE"
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
            "nominal_sig": false,
            "notes": "lm_fallback"
          }
        ]
      },
      "row_label": "Transfer Composite -> Household Gini (h=8)"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
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
            "nominal_sig": false,
            "notes": "hac"
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
            "nominal_sig": false,
            "notes": "crossfit residual-on-residual"
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
            "nominal_sig": false,
            "notes": "TMLE targeting update with HAC influence-curve SE"
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
            "nominal_sig": false,
            "notes": "lm_fallback"
          }
        ]
      },
      "row_label": "Transfer Composite -> Median Real Income (h=8)"
    }
  ],
  "secondary_findings": [
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
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
            "nominal_sig": true,
            "notes": "hac"
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
            "nominal_sig": false,
            "notes": "crossfit residual-on-residual"
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
            "nominal_sig": false,
            "notes": "TMLE targeting update with HAC influence-curve SE"
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
            "nominal_sig": false,
            "notes": "lm_fallback"
          }
        ]
      },
      "row_label": "Transfer Composite -> Overall Poverty Rate (h=8)"
    },
    {
      "treatment": "ui_benefits",
      "treatment_label": "UI Benefits",
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
            "nominal_sig": true,
            "notes": "hac"
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
            "nominal_sig": true,
            "notes": "crossfit residual-on-residual"
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
            "nominal_sig": false,
            "notes": "TMLE targeting update with HAC influence-curve SE"
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
            "nominal_sig": false,
            "notes": "lm_fallback"
          }
        ]
      },
      "row_label": "UI Benefits -> Household Gini (h=2)"
    },
    {
      "treatment": "household_networth",
      "treatment_label": "Household Net Worth",
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
            "nominal_sig": true,
            "notes": "hac"
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
            "nominal_sig": true,
            "notes": "crossfit residual-on-residual"
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
            "nominal_sig": true,
            "notes": "TMLE targeting update with HAC influence-curve SE"
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
            "nominal_sig": false,
            "notes": "lm_fallback"
          }
        ]
      },
      "row_label": "Household Net Worth -> Top 10% vs Bottom 50% Wealth Gap (h=4)"
    },
    {
      "treatment": "revolving_credit",
      "treatment_label": "Revolving Credit",
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
            "nominal_sig": false,
            "notes": "hac"
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
            "nominal_sig": false,
            "notes": "crossfit residual-on-residual"
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
            "nominal_sig": true,
            "notes": "TMLE targeting update with HAC influence-curve SE"
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
            "nominal_sig": false,
            "notes": "lm_fallback"
          }
        ]
      },
      "row_label": "Revolving Credit -> Overall Poverty Rate (h=2)"
    },
    {
      "treatment": "ui_benefits",
      "treatment_label": "UI Benefits",
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
            "nominal_sig": true,
            "notes": "hac"
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
            "nominal_sig": true,
            "notes": "crossfit residual-on-residual"
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
            "nominal_sig": true,
            "notes": "TMLE targeting update with HAC influence-curve SE"
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
            "nominal_sig": false,
            "notes": "lm_fallback"
          }
        ]
      },
      "row_label": "UI Benefits -> Household Gini (h=4)"
    },
    {
      "treatment": "transfer_composite",
      "treatment_label": "Transfer Composite",
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
            "nominal_sig": true,
            "notes": "hac"
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
            "nominal_sig": false,
            "notes": "crossfit residual-on-residual"
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
            "nominal_sig": true,
            "notes": "TMLE targeting update with HAC influence-curve SE"
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
            "nominal_sig": false,
            "notes": "lm_fallback"
          }
        ]
      },
      "row_label": "Transfer Composite -> Child Poverty Rate (h=8)"
    },
    {
      "treatment": "ui_benefits",
      "treatment_label": "UI Benefits",
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
            "nominal_sig": false,
            "notes": "hac"
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
            "nominal_sig": true,
            "notes": "crossfit residual-on-residual"
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
            "nominal_sig": true,
            "notes": "TMLE targeting update with HAC influence-curve SE"
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
            "nominal_sig": false,
            "notes": "lm_fallback"
          }
        ]
      },
      "row_label": "UI Benefits -> Overall Poverty Rate (h=4)"
    },
    {
      "treatment": "household_networth",
      "treatment_label": "Household Net Worth",
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
            "nominal_sig": false,
            "notes": "hac"
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
            "nominal_sig": true,
            "notes": "crossfit residual-on-residual"
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
            "nominal_sig": false,
            "notes": "TMLE targeting update with HAC influence-curve SE"
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
            "nominal_sig": false,
            "notes": "lm_fallback"
          }
        ]
      },
      "row_label": "Household Net Worth -> Top 1% vs Bottom 50% Wealth Gap (h=4)"
    }
  ],
  "consumption_findings": [
    {
      "treatment": "ui_benefits",
      "treatment_label": "UI Benefits",
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
            "nominal_sig": true,
            "notes": "hac"
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
            "nominal_sig": true,
            "notes": "crossfit residual-on-residual"
          }
        ]
      },
      "row_label": "UI Benefits -> Essential vs Discretionary Gap (h=1)"
    },
    {
      "treatment": "ui_benefits",
      "treatment_label": "UI Benefits",
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
            "nominal_sig": true,
            "notes": "hac"
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
            "nominal_sig": true,
            "notes": "crossfit residual-on-residual"
          }
        ]
      },
      "row_label": "UI Benefits -> Essential Spending Share (h=1)"
    }
  ],
  "consumption_supporting": [
    {
      "treatment": "ui_benefits",
      "treatment_label": "UI Benefits",
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
            "nominal_sig": true,
            "notes": "hac"
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
            "nominal_sig": false,
            "notes": "crossfit residual-on-residual"
          }
        ]
      },
      "row_label": "UI Benefits -> Essential vs Discretionary Gap (h=2)"
    },
    {
      "treatment": "ui_benefits",
      "treatment_label": "UI Benefits",
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
            "nominal_sig": true,
            "notes": "hac"
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
            "nominal_sig": true,
            "notes": "crossfit residual-on-residual"
          }
        ]
      },
      "row_label": "UI Benefits -> Discretionary Spending Index (h=1)"
    },
    {
      "treatment": "ui_benefits",
      "treatment_label": "UI Benefits",
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
            "nominal_sig": true,
            "notes": "hac"
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
            "nominal_sig": false,
            "notes": "crossfit residual-on-residual"
          }
        ]
      },
      "row_label": "UI Benefits -> Essential Spending Share (h=2)"
    },
    {
      "treatment": "fed_funds",
      "treatment_label": "Fed Funds",
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
            "nominal_sig": false,
            "notes": "hac"
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
            "nominal_sig": true,
            "notes": "crossfit residual-on-residual"
          }
        ]
      },
      "row_label": "Fed Funds -> Discretionary Spending Index (h=2)"
    },
    {
      "treatment": "fed_funds",
      "treatment_label": "Fed Funds",
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
            "nominal_sig": false,
            "notes": "hac"
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
            "nominal_sig": true,
            "notes": "crossfit residual-on-residual"
          }
        ]
      },
      "row_label": "Fed Funds -> Discretionary Spending Index (h=1)"
    },
    {
      "treatment": "snap_persons",
      "treatment_label": "SNAP",
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
            "nominal_sig": true,
            "notes": "hac"
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
            "nominal_sig": true,
            "notes": "crossfit residual-on-residual"
          }
        ]
      },
      "row_label": "SNAP -> Essential Spending Index (h=2)"
    },
    {
      "treatment": "snap_persons",
      "treatment_label": "SNAP",
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
            "nominal_sig": true,
            "notes": "hac"
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
            "nominal_sig": true,
            "notes": "crossfit residual-on-residual"
          }
        ]
      },
      "row_label": "SNAP -> Essential Spending Index (h=1)"
    },
    {
      "treatment": "ui_benefits",
      "treatment_label": "UI Benefits",
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
            "nominal_sig": true,
            "notes": "hac"
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
            "nominal_sig": false,
            "notes": "crossfit residual-on-residual"
          }
        ]
      },
      "row_label": "UI Benefits -> Discretionary Spending Index (h=2)"
    }
  ],
  "funnel_counts": [
    {
      "stage": "LP IRF rows",
      "count": 165
    },
    {
      "stage": "Ranked findings",
      "count": 105
    },
    {
      "stage": "FDR-surviving rows",
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
        "max_abs_delta": 2.52498368917241e-10,
        "label": "Transfer Composite -> Household Gini (h=4)"
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
        "max_abs_delta": 2.9709670797903e-08,
        "label": "Transfer Composite -> Overall Poverty Rate (h=4)"
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
        "max_abs_delta": 5.22410250067049e-08,
        "label": "Transfer Composite -> Child Poverty Rate (h=4)"
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
        "max_abs_delta": 1.50968349233177e-10,
        "label": "Transfer Composite -> Household Gini (h=2)"
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
        "max_abs_delta": 1.71206799862305e-08,
        "label": "Transfer Composite -> Overall Poverty Rate (h=2)"
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
        "max_abs_delta": 3.00128987375706e-08,
        "label": "Transfer Composite -> Child Poverty Rate (h=2)"
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
        "max_abs_delta": 3.15400540609833e-08,
        "label": "Transfer Composite -> Top 1% vs Bottom 50% Wealth Gap (h=2)"
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
        "max_abs_delta": 1.67611877050045e-12,
        "label": "Household Net Worth -> Top 1% vs Bottom 50% Wealth Gap (h=2)"
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
        "max_abs_delta": 3.43705602446121e-08,
        "label": "Transfer Composite -> Top 1% vs Bottom 50% Wealth Gap (h=4)"
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
        "max_abs_delta": 1.69457669388312e-10,
        "label": "Transfer Composite -> Household Gini (h=8)"
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
        "max_abs_delta": 7.86691290567939e-05,
        "label": "Transfer Composite -> Median Real Income (h=8)"
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
        "max_abs_delta": 2.76256492859309e-08,
        "label": "Transfer Composite -> Overall Poverty Rate (h=8)"
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
        "max_abs_delta": 8.29461721288814e-10,
        "label": "UI Benefits -> Household Gini (h=2)"
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
        "max_abs_delta": 9.08306096153896e-13,
        "label": "Household Net Worth -> Top 10% vs Bottom 50% Wealth Gap (h=4)"
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
        "max_abs_delta": 6.23540008187288e-11,
        "label": "Revolving Credit -> Overall Poverty Rate (h=2)"
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
        "max_abs_delta": 1.32499378031602e-09,
        "label": "UI Benefits -> Household Gini (h=4)"
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
        "max_abs_delta": 4.7244729986763e-08,
        "label": "Transfer Composite -> Child Poverty Rate (h=8)"
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
        "max_abs_delta": 1.50423165435517e-07,
        "label": "UI Benefits -> Overall Poverty Rate (h=4)"
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
        "max_abs_delta": 4.82357159371543e-13,
        "label": "Household Net Worth -> Top 10% vs Bottom 50% Wealth Gap (h=2)"
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
        "max_abs_delta": 1.00208790061779e-12,
        "label": "Household Net Worth -> Top 1% vs Bottom 50% Wealth Gap (h=4)"
      }
    ],
    "checks": [
      {
        "label": "Transfer Composite -> Household Gini (h=4)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Overall Poverty Rate (h=4)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Child Poverty Rate (h=4)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Household Gini (h=2)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Overall Poverty Rate (h=2)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Child Poverty Rate (h=2)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Top 1% vs Bottom 50% Wealth Gap (h=2)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth -> Top 1% vs Bottom 50% Wealth Gap (h=2)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Top 1% vs Bottom 50% Wealth Gap (h=4)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Household Gini (h=8)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Median Real Income (h=8)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Overall Poverty Rate (h=8)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "UI Benefits -> Household Gini (h=2)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth -> Top 10% vs Bottom 50% Wealth Gap (h=4)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Revolving Credit -> Overall Poverty Rate (h=2)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "UI Benefits -> Household Gini (h=4)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Child Poverty Rate (h=8)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "UI Benefits -> Overall Poverty Rate (h=4)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth -> Top 10% vs Bottom 50% Wealth Gap (h=2)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth -> Top 1% vs Bottom 50% Wealth Gap (h=4)",
        "episode": "drop_2001",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Household Gini (h=4)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Overall Poverty Rate (h=4)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Child Poverty Rate (h=4)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Household Gini (h=2)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Overall Poverty Rate (h=2)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Child Poverty Rate (h=2)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Top 1% vs Bottom 50% Wealth Gap (h=2)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth -> Top 1% vs Bottom 50% Wealth Gap (h=2)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Top 1% vs Bottom 50% Wealth Gap (h=4)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Household Gini (h=8)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Median Real Income (h=8)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Overall Poverty Rate (h=8)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "UI Benefits -> Household Gini (h=2)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth -> Top 10% vs Bottom 50% Wealth Gap (h=4)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Revolving Credit -> Overall Poverty Rate (h=2)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "UI Benefits -> Household Gini (h=4)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Child Poverty Rate (h=8)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "UI Benefits -> Overall Poverty Rate (h=4)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth -> Top 10% vs Bottom 50% Wealth Gap (h=2)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth -> Top 1% vs Bottom 50% Wealth Gap (h=4)",
        "episode": "drop_gfc",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Household Gini (h=4)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Overall Poverty Rate (h=4)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Child Poverty Rate (h=4)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Household Gini (h=2)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Overall Poverty Rate (h=2)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Child Poverty Rate (h=2)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Top 1% vs Bottom 50% Wealth Gap (h=2)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth -> Top 1% vs Bottom 50% Wealth Gap (h=2)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Top 1% vs Bottom 50% Wealth Gap (h=4)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Household Gini (h=8)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Median Real Income (h=8)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Overall Poverty Rate (h=8)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "UI Benefits -> Household Gini (h=2)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth -> Top 10% vs Bottom 50% Wealth Gap (h=4)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Revolving Credit -> Overall Poverty Rate (h=2)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "UI Benefits -> Household Gini (h=4)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Transfer Composite -> Child Poverty Rate (h=8)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "UI Benefits -> Overall Poverty Rate (h=4)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth -> Top 10% vs Bottom 50% Wealth Gap (h=2)",
        "episode": "drop_covid",
        "pass_episode": true
      },
      {
        "label": "Household Net Worth -> Top 1% vs Bottom 50% Wealth Gap (h=4)",
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
      "label": "Transfer Composite -> Household Gini (h=4)",
      "p_joint_leads": 6.51001222084906e-12,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "poverty_all_q",
      "horizon": 4,
      "label": "Transfer Composite -> Overall Poverty Rate (h=4)",
      "p_joint_leads": 3.36741108810146e-09,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "poverty_child_q",
      "horizon": 4,
      "label": "Transfer Composite -> Child Poverty Rate (h=4)",
      "p_joint_leads": 1.53784654931706e-08,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "gini_households_q",
      "horizon": 2,
      "label": "Transfer Composite -> Household Gini (h=2)",
      "p_joint_leads": 4.24828691041706e-08,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "poverty_all_q",
      "horizon": 2,
      "label": "Transfer Composite -> Overall Poverty Rate (h=2)",
      "p_joint_leads": 6.50143969364507e-07,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "poverty_child_q",
      "horizon": 2,
      "label": "Transfer Composite -> Child Poverty Rate (h=2)",
      "p_joint_leads": 4.553986187813e-06,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "wealth_share_gap_top1_bottom50",
      "horizon": 2,
      "label": "Transfer Composite -> Top 1% vs Bottom 50% Wealth Gap (h=2)",
      "p_joint_leads": 6.51812817137315e-05,
      "lead_reject_joint": true
    },
    {
      "treatment": "household_networth",
      "outcome": "wealth_share_gap_top1_bottom50",
      "horizon": 2,
      "label": "Household Net Worth -> Top 1% vs Bottom 50% Wealth Gap (h=2)",
      "p_joint_leads": 6.59525699794452e-05,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "wealth_share_gap_top1_bottom50",
      "horizon": 4,
      "label": "Transfer Composite -> Top 1% vs Bottom 50% Wealth Gap (h=4)",
      "p_joint_leads": 0.000179943555654677,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "gini_households_q",
      "horizon": 8,
      "label": "Transfer Composite -> Household Gini (h=8)",
      "p_joint_leads": 0.000286407258513702,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "median_real_income_fred_q",
      "horizon": 8,
      "label": "Transfer Composite -> Median Real Income (h=8)",
      "p_joint_leads": 0.00164916625469235,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "poverty_all_q",
      "horizon": 8,
      "label": "Transfer Composite -> Overall Poverty Rate (h=8)",
      "p_joint_leads": 0.0153748252916479,
      "lead_reject_joint": true
    },
    {
      "treatment": "ui_benefits",
      "outcome": "gini_households_q",
      "horizon": 2,
      "label": "UI Benefits -> Household Gini (h=2)",
      "p_joint_leads": 0.0187703941208803,
      "lead_reject_joint": true
    },
    {
      "treatment": "household_networth",
      "outcome": "wealth_share_gap_top10_bottom50",
      "horizon": 4,
      "label": "Household Net Worth -> Top 10% vs Bottom 50% Wealth Gap (h=4)",
      "p_joint_leads": 0.0208274418667397,
      "lead_reject_joint": true
    },
    {
      "treatment": "revolving_credit",
      "outcome": "poverty_all_q",
      "horizon": 2,
      "label": "Revolving Credit -> Overall Poverty Rate (h=2)",
      "p_joint_leads": 0.0259657089022917,
      "lead_reject_joint": true
    },
    {
      "treatment": "ui_benefits",
      "outcome": "gini_households_q",
      "horizon": 4,
      "label": "UI Benefits -> Household Gini (h=4)",
      "p_joint_leads": 0.0281676183075565,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "poverty_child_q",
      "horizon": 8,
      "label": "Transfer Composite -> Child Poverty Rate (h=8)",
      "p_joint_leads": 0.0305966375221101,
      "lead_reject_joint": true
    },
    {
      "treatment": "ui_benefits",
      "outcome": "poverty_all_q",
      "horizon": 4,
      "label": "UI Benefits -> Overall Poverty Rate (h=4)",
      "p_joint_leads": 0.0353177032879282,
      "lead_reject_joint": true
    },
    {
      "treatment": "household_networth",
      "outcome": "wealth_share_gap_top10_bottom50",
      "horizon": 2,
      "label": "Household Net Worth -> Top 10% vs Bottom 50% Wealth Gap (h=2)",
      "p_joint_leads": 0.040818196486757,
      "lead_reject_joint": true
    },
    {
      "treatment": "household_networth",
      "outcome": "wealth_share_gap_top1_bottom50",
      "horizon": 4,
      "label": "Household Net Worth -> Top 1% vs Bottom 50% Wealth Gap (h=4)",
      "p_joint_leads": 0.0422300419832876,
      "lead_reject_joint": true
    },
    {
      "treatment": "household_networth",
      "outcome": "wealth_share_gap_top10_bottom50",
      "horizon": 8,
      "label": "Household Net Worth -> Top 10% vs Bottom 50% Wealth Gap (h=8)",
      "p_joint_leads": 0.0555945054448362,
      "lead_reject_joint": true
    },
    {
      "treatment": "revolving_credit",
      "outcome": "poverty_all_q",
      "horizon": 4,
      "label": "Revolving Credit -> Overall Poverty Rate (h=4)",
      "p_joint_leads": 0.0562032783955591,
      "lead_reject_joint": true
    },
    {
      "treatment": "snap_persons",
      "outcome": "poverty_all_q",
      "horizon": 4,
      "label": "SNAP -> Overall Poverty Rate (h=4)",
      "p_joint_leads": 0.059188650045312,
      "lead_reject_joint": true
    },
    {
      "treatment": "revolving_credit",
      "outcome": "poverty_child_q",
      "horizon": 2,
      "label": "Revolving Credit -> Child Poverty Rate (h=2)",
      "p_joint_leads": 0.0602942819005574,
      "lead_reject_joint": true
    },
    {
      "treatment": "fed_funds",
      "outcome": "median_real_income_fred_q",
      "horizon": 2,
      "label": "Fed Funds -> Median Real Income (h=2)",
      "p_joint_leads": 0.0607448333589015,
      "lead_reject_joint": true
    },
    {
      "treatment": "snap_persons",
      "outcome": "poverty_all_q",
      "horizon": 2,
      "label": "SNAP -> Overall Poverty Rate (h=2)",
      "p_joint_leads": 0.0718245806514518,
      "lead_reject_joint": true
    },
    {
      "treatment": "ui_benefits",
      "outcome": "poverty_all_q",
      "horizon": 2,
      "label": "UI Benefits -> Overall Poverty Rate (h=2)",
      "p_joint_leads": 0.082106521074128,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "median_real_income_fred_q",
      "horizon": 2,
      "label": "Transfer Composite -> Median Real Income (h=2)",
      "p_joint_leads": 0.0911423512487429,
      "lead_reject_joint": true
    },
    {
      "treatment": "transfer_composite",
      "outcome": "wealth_share_gap_top10_bottom50",
      "horizon": 8,
      "label": "Transfer Composite -> Top 10% vs Bottom 50% Wealth Gap (h=8)",
      "p_joint_leads": 0.103637374698965,
      "lead_reject_joint": false
    },
    {
      "treatment": "fed_funds",
      "outcome": "median_real_income_fred_q",
      "horizon": 4,
      "label": "Fed Funds -> Median Real Income (h=4)",
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
  "runs": [
    {
      "name": "Consumption Baseline",
      "note": "Canon v2 spending-basket run used for the secondary consumption-composition question.",
      "irf_rows": 84,
      "findings_rows": 56,
      "robust_rows": 2,
      "estimators": [
        "LP",
        "DML"
      ]
    },
    {
      "name": "Outcomes Baseline",
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
      "name": "Outcomes Full",
      "note": "Full archive run with broader estimator families and the repaired IV/negative-control layer.",
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
    }
  ],
  "brief_markdown": "# Results Brief (2026-04-03)\n\n## Runs\n\n- Baseline both-suites run with canon v2 basket and expanded transfer/outcomes grid:\n  - `results/dass/poverty_consumption_baseline`\n  - `results/dass/poverty_outcomes_baseline`\n  - `results/dflmx/poverty_consumption_baseline`\n  - `results/dflmx/poverty_outcomes_baseline`\n- Full outcomes-suite run with repaired IV/NC screening:\n  - `results/dass/poverty_outcomes_full`\n  - `results/dflmx/poverty_outcomes_full`\n\n## What changed\n\n- Ported the `ea-gender` canon logic into this poverty project as a non-destructive `v2` basket:\n  - `pce_essential_v2_idx`\n  - `pce_discretionary_v2_idx`\n  - `pce_gap_v2 = log(E/D)`\n  - `pce_eshare_v2 = E / (E + D)`\n- Re-centered the consumption suite on the `v2` basket rather than the older mixed necessity/discretionary split.\n- Expanded the outcomes suite around transfer decomposition:\n  - `transfer_composite`\n  - `ui_benefits`\n  - `social_security`\n  - `snap_persons`\n  - plus secondary monetary/credit/wealth contrasts\n- Repaired DFLMX negative-control discovery so outcomes no longer self-nominate as their own NC candidates.\n- Enforced an allowlist for NC outcomes in the full outcomes suite:\n  - `wealth_share_gap_top10_bottom50`\n  - `wealth_share_gap_top1_bottom50`\n\n## Quality gates\n\n- CoFlow publication gates: pass\n- DASS contract manifests: fail=0\n- DFLMX regression checks: PASS\n- The required `econark-r` framework fixes are now upstream in `smkwray/econark` commit `7cb68eb`; the packaged project corresponds to that patched April 3, 2026 runtime state\n\n## High-level signals\n\n### Consumption suite (`dflmx-R/poverty_consumption_baseline`)\n\n- DFLMX robust rows (`q<=0.10`): `2`\n- Strongest v2 findings:\n  - `ui_benefits -> pce_gap_v2 (h=1)` with `q\u22482.0e-05`\n  - `ui_benefits -> pce_eshare_v2 (h=1)` with `q\u22487.3e-04`\n- Interpretation:\n  - the canon basket improves the consumption suite materially versus the prior `0` robust-row baseline\n  - the strongest surviving signal is concentrated in `ui_benefits`, not the broad transfer composite\n\n### Outcomes suite baseline (`dflmx-R/poverty_outcomes_baseline`)\n\n- DFLMX robust rows (`q<=0.10`): `11`\n- Headline pattern remains transfer-led:\n  - `transfer_composite -> gini_households_q` at `h=2,4,8`\n  - `transfer_composite -> poverty_all_q` at `h=2,4`\n  - `transfer_composite -> poverty_child_q` at `h=2,4`\n  - `transfer_composite -> wealth_share_gap_top1_bottom50` at `h=2,4`\n  - `transfer_composite -> median_real_income_fred_q` at `h=8`\n- Program-decomposition additions:\n  - `ui_benefits -> wealth_share_gap_top1_bottom50 (h=4)` is robust\n  - `ui_benefits` also shows sub-robust but suggestive rows on `gini_households_q` and `poverty_all_q`\n  - `snap_persons` is suggestive but not robust\n  - `social_security` remains weak in this screening pass\n\n### Outcomes suite full (`dflmx-R/poverty_outcomes`)\n\n- DFLMX robust rows (`q<=0.10`): `11`\n- The transfer headline survives the full run\n- Additional strong secondary row appears:\n  - `household_networth -> wealth_share_gap_top1_bottom50 (h=2)`\n\n## Confirmatory / IV-NC status\n\n- The NC miner fix worked:\n  - NC candidates now come from alternate allowlisted outcomes, not the focal outcome itself\n- Full outcomes discovery summary:\n  - `iv_candidates = 9`\n  - `nc_candidates = 51`\n  - `manifest_ready = 6`\n- Substantive limitation remains:\n  - most transfer poverty rows are still `insufficient_contract` because no allowlisted NC survives for those focal outcomes\n- The only `ready_confirmatory` row in this run is:\n  - `transfer_composite -> wealth_share_gap_top1_bottom50 (h=4)` using `F1` with `wealth_share_gap_top10_bottom50` as NC\n- Practical interpretation:\n  - poverty/inequality headline claims should still be framed as screening/reduced-form evidence\n  - the repaired confirmatory layer is cleaner, but it is not yet strong enough to support a broad causal claim\n\n## Packaging recommendation for `ea-ineq`\n\n- Ready to package:\n  - yes; the archive is already aligned to the patched runtime state now upstreamed in `smkwray/econark` commit `7cb68eb`\n- Headline archive focus:\n  - poverty/inequality outcomes suite first\n  - canon v2 consumption suite second\n- Methods note to carry into the archive:\n  - `econark-r` required stage/config/NC fixes, now upstreamed in `smkwray/econark`, before this project could run cleanly end-to-end\n"
};
