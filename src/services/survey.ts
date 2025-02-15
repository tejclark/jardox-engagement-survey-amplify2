const data = [
    {
      "title": "about_your_role",
      "questions": [
        {
          "type": "select",
          "question": "site",
          "answers": [
            "sevenoaks",
            "wincanton"
          ]
        },
        {
          "type": "select",
          "question": "department",
          "answers": [
            "factory",
            "customer_service",
            "warehouse",
            "planning",
            "quality",
            "npd"
          ]
        },
        {
          "type": "select",
          "question": "handle_food",
          "answers": [
            "yes",
            "no"
          ]
        }
      ]
    },
    {
      "title": "statements",
      "questions": [
        {
          "type": "likert",
          "question": "expected_of_me"
        },
        {
          "type": "likert",
          "question": "materials_needed"
        },
        {
          "type": "likert",
          "question": "opportunity_best"
        },
        {
          "type": "likert",
          "question": "receive_recognition"
        },
        {
          "type": "likert",
          "question": "supervisor_cares"
        },
        {
          "type": "likert",
          "question": "encourages_development"
        },
        {
          "type": "likert",
          "question": "opinions_count"
        },
        {
          "type": "likert",
          "question": "job_important"
        },
        {
          "type": "likert",
          "question": "quality_work"
        },
        {
          "type": "likert",
          "question": "good_friend"
        },
        {
          "type": "likert",
          "question": "progress_check"
        },
        {
          "type": "likert",
          "question": "learn_and_grow"
        },
        {
          "type": "likert",
          "question": "paid_rewarded"
        },
        {
          "type": "likert",
          "question": "recommend_jardox"
        }
      ]
    },
    {
      "title": "handle_food_statements",
      "questions": [
        {
          "type": "likert",
          "question": "good_food_safety"
        },
        {
          "type": "likert",
          "question": "good_food_safety_job_done"
        },
        {
          "type": "likert",
          "question": "improvements_food_safety"
        },
        {
          "type": "likert",
          "question": "food_safety_seriously"
        },
        {
          "type": "likert",
          "question": "understand_food_safety"
        }
      ]
    },
    {
      "title": "comments",
      "questions": [
        {
          "type": "textarea",
          "question": "comments"
        }
      ]
    }
  ];

export function getSurveyData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 0)
  })
}