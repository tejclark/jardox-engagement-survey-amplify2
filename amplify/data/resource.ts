import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  SurveyEntry: a
    .model({
      department: a.string().default('-- Not Set --'),
      site: a.string().default('-- Not Set --'),
      handle_food: a.string().default('-- Not Set --'),
      expected_of_me: a.string().default('-- Not Set --'),
      materials_needed: a.string().default('-- Not Set --'),
      opportunity_best: a.string().default('-- Not Set --'),
      receive_recognition: a.string().default('-- Not Set --'),
      supervisor_cares: a.string().default('-- Not Set --'),
      encourages_development: a.string().default('-- Not Set --'),
      opinions_count: a.string().default('-- Not Set --'),
      job_important: a.string().default('-- Not Set --'),
      quality_work: a.string().default('-- Not Set --'),
      good_friend: a.string().default('-- Not Set --'),
      progress_check: a.string().default('-- Not Set --'),
      learn_and_grow: a.string().default('-- Not Set --'),
      opportunities_to_grow: a.string().default('-- Not Set --'),
      paid_rewarded: a.string().default('-- Not Set --'),
      happy_facilities: a.string().default('-- Not Set --'),
      recommend_jardox: a.string().default('-- Not Set --'),
      handle_food_statements: a.string().default('-- Not Set --'),
      good_food_safety: a.string().default('-- Not Set --'),
      good_food_safety_job_done: a.string().default('-- Not Set --'),
      jardox_safety_standards: a.string().default('-- Not Set --'),
      improvements_food_safety: a.string().default('-- Not Set --'),
      food_safety_seriously: a.string().default('-- Not Set --'),
      understand_food_safety: a.string().default('-- Not Set --'),
      food_audits: a.string().default('-- Not Set --'),
      comments: a.string().default('-- Not Set --'),
    })
    .authorization(allow => [allow.publicApiKey().to(['create'])])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 },
  },
  logging: true
});