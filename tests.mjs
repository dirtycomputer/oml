import assert from "node:assert/strict";
import {
  DIMENSIONS,
  QUESTIONS,
  QUESTION_BANK,
  GLOBAL_SYSTEMS,
  SAMPLE_SCORES,
  scoreQuestionnaire,
  calculateBirthProfile,
  blendScores,
  makeOmlCode,
  calculateCompatibility,
} from "./oml-core.js";

assert.equal(DIMENSIONS.length, 12, "OML must expose exactly 12 dimensions");
assert.equal(QUESTIONS.length, 144, "candidate questionnaire must contain 144 items");

for (const dimension of DIMENSIONS) {
  const items = QUESTION_BANK[dimension.id];
  assert.equal(items.length, 12, `${dimension.id} must contain 12 items`);
  assert.equal(items.filter((item) => item.keyed === 1).length, 6, `${dimension.id} needs six forward items`);
  assert.equal(items.filter((item) => item.keyed === -1).length, 6, `${dimension.id} needs six reverse items`);
}

const highAnswers = Object.fromEntries(QUESTIONS.map((question) => [question.id, question.keyed === 1 ? 5 : 1]));
const lowAnswers = Object.fromEntries(QUESTIONS.map((question) => [question.id, question.keyed === 1 ? 1 : 5]));
const straightAnswers = Object.fromEntries(QUESTIONS.map((question) => [question.id, 5]));

assert.deepEqual(scoreQuestionnaire(highAnswers).scores, Array(12).fill(100));
assert.deepEqual(scoreQuestionnaire(lowAnswers).scores, Array(12).fill(0));
assert.deepEqual(scoreQuestionnaire(straightAnswers).scores, Array(12).fill(50));
assert.equal(scoreQuestionnaire(highAnswers).completeness, 1);

const reference = calculateBirthProfile({ date: "1949-10-01", time: "12:00", timezoneOffset: 8, timeKnown: true });
assert.equal(reference.pillars.find((pillar) => pillar.name === "日").label, "甲子", "reference Jiazi day must remain stable");
assert.equal(reference.symbolicScores.length, 12);
assert.ok(reference.symbolicScores.every((score) => score >= 35 && score <= 65));

const unknownTime = calculateBirthProfile({ date: "2000-01-01", time: "12:00", timezoneOffset: 0, timeKnown: false });
assert.equal(unknownTime.pillars.length, 3, "unknown time must omit hour pillar");

assert.deepEqual(blendScores(Array(12).fill(100), Array(12).fill(0), .15), Array(12).fill(85));
assert.match(makeOmlCode(SAMPLE_SCORES), /^[SC][GP][VL][FO]-[RS]$/);

const identicalMatch = calculateCompatibility(SAMPLE_SCORES, SAMPLE_SCORES, {
  communicationA: 3,
  communicationB: 3,
  modeA: "mono",
  modeB: "mono",
});
assert.ok(identicalMatch.total >= 85 && identicalMatch.total <= 100);

for (let index = 1; index < GLOBAL_SYSTEMS.length; index += 1) {
  assert.ok(GLOBAL_SYSTEMS[index - 1].score >= GLOBAL_SYSTEMS[index].score, "global systems must stay sorted by influence score");
}

console.log(`OML tests passed: ${QUESTIONS.length} items, ${DIMENSIONS.length} dimensions, ${GLOBAL_SYSTEMS.length} systems.`);

