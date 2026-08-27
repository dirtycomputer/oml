import {
  DIMENSIONS,
  QUESTIONS,
  MAPPING_ROWS,
  GLOBAL_SYSTEMS,
  SAMPLE_SCORES,
  scoreQuestionnaire,
  calculateBirthProfile,
  blendScores,
  makeOmlCode,
  describeCode,
  calculateCompatibility,
} from "./oml-core.js";

const STORAGE_KEY = "oml-v0.1-state";
const initialState = {
  answers: {},
  page: 0,
  startTime: null,
  birth: null,
  includeBirth: true,
  result: null,
};

function loadState() {
  try {
    return { ...initialState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return { ...initialState };
  }
}

let state = loadState();
let toastTimer;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* Private browsing can disable storage. */ }
}

function toast(message) {
  const node = $("#toast");
  node.textContent = message;
  node.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove("is-visible"), 2600);
}

function routeTo(route, updateHash = true) {
  $$("[data-view]").forEach((view) => view.classList.toggle("is-active", view.dataset.view === route));
  $$(".nav-button").forEach((button) => button.classList.toggle("is-active", button.dataset.route === route));
  if (updateHash) history.replaceState(null, "", `#${route}`);
  if (route === "results") renderResults();
  if (route === "match") renderMatchProfile();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateProgress() {
  const count = Object.keys(state.answers).length;
  $("#answer-count").textContent = `已答 ${count} / ${QUESTIONS.length}`;
  $("#progress-fill").style.width = `${(count / QUESTIONS.length) * 100}%`;
  $(".progress-track").setAttribute("aria-valuenow", String(count));
}

function renderQuestionPage() {
  const list = $("#question-list");
  list.replaceChildren();
  const pageQuestions = QUESTIONS.slice(state.page * 12, state.page * 12 + 12);
  $("#page-number").textContent = String(state.page + 1);
  $("#previous-page").disabled = state.page === 0;
  $("#next-page").textContent = state.page === 11 ? "生成 OML 报告" : "下一组";
  $("#question-error").textContent = "";

  pageQuestions.forEach((question) => {
    const card = el("article", "question-card");
    const copy = el("div", "question-copy");
    copy.append(el("span", "question-number", question.id));
    copy.append(el("p", "question-text", question.text));
    const fieldset = el("fieldset", "likert");
    fieldset.setAttribute("aria-label", `${question.id} 评分`);
    for (let value = 1; value <= 5; value += 1) {
      const label = el("label");
      const input = el("input");
      input.type = "radio";
      input.name = question.id;
      input.value = String(value);
      input.checked = Number(state.answers[question.id]) === value;
      input.addEventListener("change", () => {
        state.answers[question.id] = value;
        state.startTime ||= Date.now();
        saveState();
        updateProgress();
        $("#question-error").textContent = "";
      });
      label.append(input, el("span", "", String(value)));
      fieldset.append(label);
    }
    card.append(copy, fieldset);
    list.append(card);
  });
  updateProgress();
}

function currentPageComplete() {
  return QUESTIONS.slice(state.page * 12, state.page * 12 + 12).every((question) => state.answers[question.id] !== undefined);
}

function startAssessment() {
  $("#questionnaire").classList.remove("is-hidden");
  state.startTime ||= Date.now();
  saveState();
  renderQuestionPage();
  setTimeout(() => $("#questionnaire").scrollIntoView({ behavior: "smooth", block: "start" }), 20);
}

function finishAssessment() {
  const scored = scoreQuestionnaire(state.answers);
  if (scored.completeness < 1) {
    toast("仍有未完成题目");
    return;
  }
  const elapsedSeconds = state.startTime ? Math.round((Date.now() - state.startTime) / 1000) : null;
  let qualityScore = scored.qualityScore;
  if (elapsedSeconds !== null && elapsedSeconds < 480) qualityScore = Math.max(0, qualityScore - 10);
  const qualityBand = qualityScore >= 82 ? "较高" : qualityScore >= 65 ? "中等" : "需复核";
  const finalScores = blendScores(scored.scores, state.birth?.symbolicScores, state.includeBirth && state.birth ? 0.15 : 0);
  state.result = {
    questionnaireScores: scored.scores,
    finalScores,
    quality: { ...scored, qualityScore, qualityBand, elapsedSeconds },
    source: "完整问卷",
    createdAt: new Date().toISOString(),
  };
  saveState();
  renderResults();
  routeTo("results");
}

function updateBlendedResult() {
  if (!state.result) return;
  state.result.finalScores = blendScores(
    state.result.questionnaireScores,
    state.birth?.symbolicScores,
    state.includeBirth && state.birth ? 0.15 : 0,
  );
  saveState();
  renderResults();
}

function loadSample() {
  state.result = {
    questionnaireScores: [...SAMPLE_SCORES],
    finalScores: blendScores(SAMPLE_SCORES, state.birth?.symbolicScores, state.includeBirth && state.birth ? 0.15 : 0),
    quality: { qualityScore: 88, qualityBand: "示例", consistency: 86, completeness: 1, elapsedSeconds: null },
    source: "匿名示例",
    createdAt: new Date().toISOString(),
  };
  saveState();
  renderResults();
  routeTo("results");
  toast("已载入匿名示例，不代表你的真实画像");
}

function renderBirthSummary() {
  const container = $("#birth-summary");
  container.replaceChildren();
  if (!state.birth) {
    container.className = "birth-summary empty-note";
    container.textContent = "尚未计算。问卷仍可独立生成完整 OML 报告。";
    return;
  }
  container.className = "birth-summary empty-note";
  const chips = el("div", "birth-chip-row");
  [
    state.birth.sunSign,
    `${state.birth.westernElement}象 · ${state.birth.modality}宫`,
    `${state.birth.yearAnimal}年`,
    `四柱 ${state.birth.pillars.map((pillar) => pillar.label).join(" · ")}`,
    `生命路径 ${state.birth.lifePath}`,
  ].forEach((value) => chips.append(el("span", "birth-chip", value)));
  container.append(chips, el("p", "", `${state.birth.confidence}。这是一种可审计的文化象征转换，不是事件预测。`));
}

function onBirthSubmit(event) {
  event.preventDefault();
  const date = $("#birth-date").value;
  if (!date) { toast("请先填写出生日期"); return; }
  try {
    state.birth = calculateBirthProfile({
      date,
      time: $("#birth-time").value || "12:00",
      timezoneOffset: Number($("#birth-offset").value || 0),
      timeKnown: $("#birth-precision").value !== "unknown",
    });
    state.includeBirth = $("#blend-birth").checked;
    saveState();
    renderBirthSummary();
    updateBlendedResult();
    toast("出生象征层已计算");
  } catch (error) {
    toast(error.message || "出生信息计算失败");
  }
}

function svgNode(tag, attributes = {}) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
}

function radarPoints(scores, radius, center = 210) {
  return scores.map((score, index) => {
    const angle = -Math.PI / 2 + index * (Math.PI * 2 / scores.length);
    const r = radius * score / 100;
    return `${center + Math.cos(angle) * r},${center + Math.sin(angle) * r}`;
  }).join(" ");
}

function renderRadar(scores) {
  const svg = $("#radar-chart");
  svg.replaceChildren();
  [25, 50, 75, 100].forEach((level) => {
    svg.append(svgNode("polygon", { points: radarPoints(Array(12).fill(level), 135), class: "radar-grid" }));
  });
  DIMENSIONS.forEach((dimension, index) => {
    const angle = -Math.PI / 2 + index * (Math.PI * 2 / 12);
    svg.append(svgNode("line", { x1: 210, y1: 210, x2: 210 + Math.cos(angle) * 135, y2: 210 + Math.sin(angle) * 135, class: "radar-axis" }));
    const label = svgNode("text", {
      x: 210 + Math.cos(angle) * 168,
      y: 210 + Math.sin(angle) * 168 + 4,
      class: "radar-label",
      "text-anchor": Math.cos(angle) > .25 ? "start" : Math.cos(angle) < -.25 ? "end" : "middle",
    });
    label.textContent = dimension.name;
    svg.append(label);
  });
  svg.append(svgNode("polygon", { points: radarPoints(scores, 135), class: "radar-shape" }));
  scores.forEach((score, index) => {
    const angle = -Math.PI / 2 + index * (Math.PI * 2 / 12);
    const r = 135 * score / 100;
    svg.append(svgNode("circle", { cx: 210 + Math.cos(angle) * r, cy: 210 + Math.sin(angle) * r, r: 3.5, class: "radar-dot" }));
  });
}

function dimensionInterpretation(dimension, score) {
  if (score >= 67) return `明显偏向“${dimension.high}”，在多数情境中会主动使用这一侧。`;
  if (score <= 33) return `明显偏向“${dimension.low}”，这是一种偏好而非能力缺失。`;
  return `接近情境平衡区，会根据任务与关系条件切换两端策略。`;
}

function renderDimensionBars(scores) {
  const container = $("#dimension-bars");
  container.replaceChildren();
  DIMENSIONS.forEach((dimension, index) => {
    const row = el("div", "dimension-row");
    const name = el("div", "dimension-name");
    name.append(el("strong", "", dimension.name), el("span", "", `${dimension.low} ↔ ${dimension.high}`));
    const track = el("div", "dimension-track");
    const fill = el("span", "dimension-fill");
    fill.style.width = `${scores[index]}%`;
    track.title = dimensionInterpretation(dimension, scores[index]);
    track.append(fill);
    row.append(name, track, el("span", "dimension-score", String(scores[index])));
    container.append(row);
  });
}

function renderInsights(scores) {
  const container = $("#profile-insights");
  container.replaceChildren();
  const ranked = scores.map((score, index) => ({ score, dimension: DIMENSIONS[index] }));
  const high = [...ranked].sort((a, b) => b.score - a.score).slice(0, 2);
  const low = [...ranked].sort((a, b) => a.score - b.score).slice(0, 2);
  [...high, ...low].forEach((entry, index) => {
    const row = el("div", "insight-item");
    row.append(el("span", "", String(index + 1).padStart(2, "0")));
    const copy = el("div");
    copy.append(el("strong", "", `${entry.dimension.name} · ${entry.score}`), el("p", "", dimensionInterpretation(entry.dimension, entry.score)));
    row.append(copy);
    container.append(row);
  });
}

function renderBirthResult() {
  const container = $("#birth-result");
  container.replaceChildren();
  if (!state.birth) {
    container.className = "empty-note";
    container.textContent = "未提供出生信息，因此没有叠加文化象征层。";
    return;
  }
  container.className = "";
  const chips = el("div", "birth-chip-row");
  [
    `${state.birth.sunSign} · ${state.birth.solarLongitude}°`,
    `${state.birth.moonPhase}`,
    `四柱 ${state.birth.pillars.map((pillar) => pillar.label).join(" / ")}`,
    `五行偏多 ${state.birth.dominantElement}`,
    `阳性比例 ${state.birth.yinYang}%`,
    `生命路径 ${state.birth.lifePath}`,
  ].forEach((value) => chips.append(el("span", "birth-chip", value)));
  container.append(chips, el("p", "helper", `${state.birth.confidence}；太阳黄经使用低阶近似，节气边界附近应使用专业历算复核。`));
}

function renderResults() {
  const empty = $("#results-empty");
  const content = $("#results-content");
  if (!state.result) {
    empty.classList.remove("is-hidden");
    content.classList.add("is-hidden");
    return;
  }
  empty.classList.add("is-hidden");
  content.classList.remove("is-hidden");
  const scores = state.result.finalScores;
  $("#oml-code").textContent = makeOmlCode(scores);
  $("#code-description").textContent = describeCode(scores);
  $("#quality-badge").textContent = `响应质量 · ${state.result.quality.qualityBand}`;
  const blended = Boolean(state.birth && state.includeBirth);
  $("#result-source").textContent = `${state.result.source} · ${blended ? "问卷 85% + 象征 15%" : "问卷 100%"}`;
  renderRadar(scores);
  renderDimensionBars(scores);
  renderBirthResult();
  renderInsights(scores);
  renderMatchProfile();
}

function renderPartnerSliders() {
  const container = $("#partner-sliders");
  container.replaceChildren();
  DIMENSIONS.forEach((dimension, index) => {
    const row = el("div", "partner-slider");
    const label = el("label", "", dimension.name);
    label.htmlFor = `partner-${dimension.id}`;
    const input = el("input");
    input.type = "range";
    input.id = `partner-${dimension.id}`;
    input.min = "0";
    input.max = "100";
    input.value = String([54, 62, 48, 44, 57, 51, 60, 66, 45, 63, 58, 40][index]);
    const output = el("output", "", input.value);
    output.htmlFor = input.id;
    input.addEventListener("input", () => { output.textContent = input.value; });
    row.append(label, input, output);
    container.append(row);
  });
}

function getPartnerScores() {
  return DIMENSIONS.map((dimension) => Number($(`#partner-${dimension.id}`).value));
}

function renderMatchProfile() {
  if (!state.result) {
    $("#match-code-a").textContent = "尚未生成";
    $("#match-a-summary").textContent = "先完成问卷或载入示例。";
    return;
  }
  $("#match-code-a").textContent = makeOmlCode(state.result.finalScores);
  $("#match-a-summary").textContent = describeCode(state.result.finalScores);
}

function runMatch() {
  if (!state.result) { toast("请先生成当前画像"); return; }
  const match = calculateCompatibility(state.result.finalScores, getPartnerScores(), {
    communicationA: $("#communication-a").value,
    communicationB: $("#communication-b").value,
    modeA: $("#mode-a").value,
    modeB: $("#mode-b").value,
  });
  $("#match-score").textContent = String(match.total);
  $("#match-label").textContent = match.total >= 82 ? "低摩擦起点，仍需现实沟通" : match.total >= 68 ? "具备协商空间，差异可被看见" : "差异较集中，建议先谈边界与期待";
  const breakdown = $("#match-breakdown");
  breakdown.replaceChildren();
  [
    ["12 维关系模型", match.personality],
    ["沟通频率", match.communication],
    ["关系结构", match.relationshipMode],
    ["最顺畅", match.strengths.map((item) => item.name).join(" / ")],
    ["优先对话", match.conversations.map((item) => item.name).join(" / ")],
  ].forEach(([label, value]) => {
    const row = el("div", "breakdown-row");
    row.append(el("span", "", label), el("strong", "", String(value)));
    breakdown.append(row);
  });
}

function randomizePartner() {
  DIMENSIONS.forEach((dimension, index) => {
    const value = Math.round(24 + Math.random() * 58);
    const input = $(`#partner-${dimension.id}`);
    input.value = String(value);
    input.nextElementSibling.textContent = String(value);
  });
  toast("已生成一份匿名对方画像");
}

function renderSystems(filter = "all") {
  const tbody = $("#systems-table");
  tbody.replaceChildren();
  const filtered = filter === "all" ? GLOBAL_SYSTEMS : GLOBAL_SYSTEMS.filter((system) => system.family === filter);
  filtered.forEach((system) => {
    const row = el("tr");
    const rank = GLOBAL_SYSTEMS.indexOf(system) + 1;
    [rank, system.name, system.origin, system.family].forEach((value) => row.append(el("td", "", String(value))));
    const evidenceCell = el("td");
    const evidence = el("span", `evidence-chip${system.evidence === "研究支持" ? " research" : ""}`, system.evidence);
    evidenceCell.append(evidence);
    row.append(evidenceCell, el("td", "numeric", String(system.score)));
    tbody.append(row);
  });
}

function renderMapping() {
  const tbody = $("#mapping-table");
  tbody.replaceChildren();
  MAPPING_ROWS.forEach((cells) => {
    const row = el("tr");
    cells.forEach((cell) => row.append(el("td", "", cell)));
    tbody.append(row);
  });
}

async function copySummary() {
  if (!state.result) return;
  const scores = state.result.finalScores;
  const lines = [
    `OML ${makeOmlCode(scores)} — ${describeCode(scores)}`,
    ...DIMENSIONS.map((dimension, index) => `${dimension.name}: ${scores[index]}`),
    "OML v0.1 为实验性自我反思工具，不用于诊断或预测。",
  ];
  try {
    await navigator.clipboard.writeText(lines.join("\n"));
    toast("报告摘要已复制");
  } catch {
    toast("浏览器未允许复制，请手动记录代码");
  }
}

function bindEvents() {
  $$('[data-route]').forEach((button) => button.addEventListener("click", (event) => {
    event.preventDefault();
    routeTo(button.dataset.route);
  }));
  $("#start-assessment").addEventListener("click", startAssessment);
  $("#sample-report").addEventListener("click", loadSample);
  $("#sample-report-empty").addEventListener("click", loadSample);
  $("#birth-form").addEventListener("submit", onBirthSubmit);
  $("#blend-birth").addEventListener("change", (event) => {
    state.includeBirth = event.target.checked;
    saveState();
    updateBlendedResult();
    toast(state.includeBirth ? "综合分将纳入 15% 象征层" : "综合分已切换为问卷 100%");
  });
  $("#previous-page").addEventListener("click", () => {
    if (state.page > 0) { state.page -= 1; saveState(); renderQuestionPage(); $("#questionnaire").scrollIntoView({ behavior: "smooth" }); }
  });
  $("#next-page").addEventListener("click", () => {
    if (!currentPageComplete()) {
      $("#question-error").textContent = "请完成本组全部 12 道题后继续。";
      return;
    }
    if (state.page === 11) { finishAssessment(); return; }
    state.page += 1;
    saveState();
    renderQuestionPage();
    $("#questionnaire").scrollIntoView({ behavior: "smooth" });
  });
  $("#copy-summary").addEventListener("click", copySummary);
  $("#calculate-match").addEventListener("click", runMatch);
  $("#random-partner").addEventListener("click", randomizePartner);
  $("#system-filter").addEventListener("change", (event) => renderSystems(event.target.value));
}

function initialize() {
  $("#blend-birth").checked = state.includeBirth;
  const today = new Date().toISOString().slice(0, 10);
  $("#birth-date").max = today;
  renderPartnerSliders();
  const families = [...new Set(GLOBAL_SYSTEMS.map((system) => system.family))].sort((a, b) => a.localeCompare(b, "zh-CN"));
  families.forEach((family) => {
    const option = el("option", "", family);
    option.value = family;
    $("#system-filter").append(option);
  });
  renderSystems();
  renderMapping();
  renderBirthSummary();
  renderResults();
  bindEvents();
  if (Object.keys(state.answers).length) {
    $("#questionnaire").classList.remove("is-hidden");
    renderQuestionPage();
  }
  const requestedRoute = location.hash.slice(1);
  const validRoute = ["assessment", "results", "match", "atlas", "method"].includes(requestedRoute) ? requestedRoute : "assessment";
  routeTo(validRoute, false);
}

initialize();

