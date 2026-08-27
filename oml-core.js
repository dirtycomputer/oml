export const OML_VERSION = "0.1.0";

export const DIMENSIONS = [
  { id: "OPEN", index: 0, name: "开放探索", en: "Openness", low: "熟悉聚焦", high: "新奇探索", code: null, description: "对新经验、陌生观点与试验性路径的主动接近程度。" },
  { id: "SOC", index: 1, name: "社交充能", en: "Social energy", low: "独处充能", high: "共处充能", code: ["S", "C"], description: "能量更常从独处反思，还是从人与环境的互动中获得。" },
  { id: "ABS", index: 2, name: "抽象整合", en: "Abstraction", low: "具体落地", high: "模式整合", code: ["G", "P"], description: "加工信息时更重具体事实，还是模式、隐喻与未来联系。" },
  { id: "LOG", index: 3, name: "逻辑权衡", en: "Analytical judgment", low: "价值关照", high: "系统逻辑", code: ["V", "L"], description: "作决定时首先使用情境价值与关系影响，还是一致规则与因果分析。" },
  { id: "STR", index: 4, name: "结构执行", en: "Structure", low: "开放流动", high: "计划闭环", code: ["F", "O"], description: "行动时偏好保留选择与即兴调整，还是计划、排序与完成闭环。" },
  { id: "AGE", index: 5, name: "主动能动", en: "Agency", low: "观察响应", high: "发起推动", code: null, description: "在不确定场景中主动发起、承担与影响进程的倾向。" },
  { id: "REG", index: 6, name: "情绪调节", en: "Regulation", low: "敏锐响应", high: "稳定复原", code: ["R", "S"], description: "压力中的清晰度、复原速度与情绪—事实分离能力。" },
  { id: "COO", index: 7, name: "协作互惠", en: "Cooperation", low: "竞争独立", high: "协同互惠", code: null, description: "冲突与资源分配中对互惠、修复与共同收益的重视程度。" },
  { id: "AUT", index: 8, name: "边界自主", en: "Autonomy", low: "关系联结", high: "边界独立", code: null, description: "亲密关系中对独立决策、私人空间和清晰边界的需要。" },
  { id: "ADP", index: 9, name: "情境适应", en: "Adaptability", low: "一致稳定", high: "灵活切换", code: null, description: "面对规则、角色或计划变化时快速重构行为的能力与偏好。" },
  { id: "EXP", index: 10, name: "外显表达", en: "Expressiveness", low: "含蓄内敛", high: "公开外显", code: null, description: "情绪、热情、关爱与思考过程在外部可见的程度。" },
  { id: "SYM", index: 11, name: "象征意义", en: "Symbolic meaning", low: "经验实证", high: "象征叙事", code: null, description: "理解经验时对仪式、隐喻、神话与主观意义线索的使用程度。" },
];

const item = (text, keyed) => ({ text, keyed });

export const QUESTION_BANK = {
  OPEN: [
    item("陌生领域通常会激起我的好奇心。", 1),
    item("即使有替代方案，我也更愿意沿用熟悉的方法。", -1),
    item("我会主动尝试从未体验过的活动。", 1),
    item("新观点在得到广泛认可前会让我不太舒服。", -1),
    item("我享受重新审视自己长期相信的观点。", 1),
    item("我很少研究与眼前任务无直接关系的主题。", -1),
    item("面对问题时，我常能提出几种不同可能。", 1),
    item("稳定的日常比探索未知更吸引我。", -1),
    item("非传统的艺术或想法容易引起我的兴趣。", 1),
    item("只要原有看法还能使用，我就不觉得需要改变它。", -1),
    item("我会有意识地改变惯例，以观察新的结果。", 1),
    item("专业范围之外的事物很少让我产生持续好奇。", -1),
  ],
  SOC: [
    item("与人进行有来有往的交谈会让我更有精神。", 1),
    item("参加社交活动后，我通常需要很长时间恢复。", -1),
    item("我常在说话的过程中把想法想清楚。", 1),
    item("相比多人讨论，我明显更偏好单独交流。", -1),
    item("在陌生群体里，我往往会先发起联系。", 1),
    item("如果可以，我会尽量避开大型聚会。", -1),
    item("共同完成事情通常比独自完成更能激励我。", 1),
    item("我更习惯先在心里形成完整结论，再与人沟通。", -1),
    item("我愿意维护一个较广的联系网络。", 1),
    item("认识新朋友很少成为我的主动目标。", -1),
    item("在适当场合成为注意中心并不会让我紧张。", 1),
    item("群体互动太久会显著消耗我的注意力。", -1),
  ],
  ABS: [
    item("我会自然地寻找不同事件之间的共同模式。", 1),
    item("如果一个观点不能立刻落地，我很难对它保持兴趣。", -1),
    item("理论框架能帮助我理解大量零散信息。", 1),
    item("长时间讨论抽象概念会让我疲惫。", -1),
    item("我常从当下线索推演更长期的可能影响。", 1),
    item("我更信任逐步说明，而不是整体性的直觉判断。", -1),
    item("隐喻和类比常能帮助我发现新联系。", 1),
    item("我通常只处理明确说出来的信息。", -1),
    item("我擅长把不同领域的观点组合成一个整体。", 1),
    item("没有具体案例时，我很难理解一个概念。", -1),
    item("我会先把握全局，再进入细节。", 1),
    item("对于尚无证据支持的未来推演，我通常不愿展开。", -1),
  ],
  LOG: [
    item("作决定时，我重视标准能否对所有人一致适用。", 1),
    item("即使规则一致，我也会优先照顾当事人的具体处境。", -1),
    item("我能把对一个人的感受与对问题的分析分开。", 1),
    item("如果某个结论会伤害关系，我往往不愿采纳它。", -1),
    item("我习惯主动寻找自己推理中的反例。", 1),
    item("在规则与我感到的公平冲突时，我更相信后者。", -1),
    item("比较方案时，我会明确列出成本、收益与风险。", 1),
    item("他人的批评很容易被我理解为对关系的评价。", -1),
    item("可靠数据会促使我修正原先偏好的结论。", 1),
    item("维持和谐有时比找到最优方案更重要。", -1),
    item("我愿意直接指出论证中的矛盾。", 1),
    item("决定是否正确，对我而言常取决于它是否照顾人的感受。", -1),
  ],
  STR: [
    item("开始复杂任务前，我通常会先安排步骤。", 1),
    item("保留尽可能多的选择比尽早定案更重要。", -1),
    item("我会把截止日期拆分为更早的阶段节点。", 1),
    item("我更愿意边做边决定下一步。", -1),
    item("清单和明确优先级能显著提高我的效率。", 1),
    item("只要能找到东西，工作空间是否整齐并不重要。", -1),
    item("完成并关闭一项任务会给我明显满足感。", 1),
    item("临近截止时间的压力常是我主要的启动动力。", -1),
    item("我会为可能的延误预留时间。", 1),
    item("详细计划常让我感到受限制。", -1),
    item("我倾向于先完成当前任务，再切换到下一项。", 1),
    item("同时保持多个未完成项目对我来说很自然。", -1),
  ],
  AGE: [
    item("看到需要推进的事情时，我常会先行动。", 1),
    item("没有明确授权时，我通常等待别人给出方向。", -1),
    item("结果不理想时，我会先确认自己能承担的部分。", 1),
    item("群体意见不清晰时，我倾向于延后表达立场。", -1),
    item("我愿意在讨论中提出不受欢迎但必要的问题。", 1),
    item("我更习惯顺着已经形成的进程行动。", -1),
    item("在信息不完全时，我仍能作出可逆的初步决定。", 1),
    item("除非被指定，我一般不会主动担任负责人。", -1),
    item("我能把分散的人和资源组织到共同目标上。", 1),
    item("影响他人的选择会让我感到不自在。", -1),
    item("需要协商资源时，我会清楚提出自己的诉求。", 1),
    item("面对持续存在的问题，我有时会希望它自行缓解。", -1),
  ],
  REG: [
    item("遭遇挫折后，我通常能在合理时间内恢复节奏。", 1),
    item("一次不顺利容易影响我之后很长一段时间。", -1),
    item("压力较大时，我仍能分辨事实与自己的感受。", 1),
    item("紧张情绪会迅速扩散到我正在处理的其他事情。", -1),
    item("面对暂时没有答案的情况，我能保持基本行动。", 1),
    item("不确定性常会占据我大部分注意力。", -1),
    item("我有几种可靠的方法让自己逐渐平静。", 1),
    item("小的意外也可能明显打乱我整天的状态。", -1),
    item("收到负面反馈时，我能先理解内容再作反应。", 1),
    item("情绪强烈时，我很难暂停并重新选择回应方式。", -1),
    item("我不会把一次失败直接等同于对自我价值的否定。", 1),
    item("我的当下情绪经常决定我是否能继续推进任务。", -1),
  ],
  COO: [
    item("出现利益冲突时，我会寻找双方都能接受的方案。", 1),
    item("多数合作最终仍取决于谁能争取到更多。", -1),
    item("即使不同意，我也会先准确复述对方的观点。", 1),
    item("讨论激烈时，理解对方通常不如证明自己正确重要。", -1),
    item("我会主动让贡献者获得应有的认可。", 1),
    item("如果信息能给我优势，我倾向于先保留它。", -1),
    item("关系受损后，我愿意发起具体的修复行动。", 1),
    item("我对没有明确回报的帮助通常比较谨慎。", -1),
    item("能力允许时，我愿意帮助团队成员补位。", 1),
    item("共同任务中，我首先确保自己的部分不吃亏。", -1),
    item("我能在不放弃底线的情况下作出合理让步。", 1),
    item("竞争通常比协作更能带来好结果。", -1),
  ],
  AUT: [
    item("即使在亲密关系中，我也需要稳定的私人空间。", 1),
    item("重要决定若不能与亲近的人共同作出，我会不安。", -1),
    item("我习惯对自己的重大选择承担最终责任。", 1),
    item("与重要的人长时间分开会明显削弱我的安全感。", -1),
    item("我能清楚说明哪些要求超出了自己的边界。", 1),
    item("我倾向于让彼此的日常安排尽可能重合。", -1),
    item("拥有不依赖伴侣或朋友的个人项目对我很重要。", 1),
    item("拒绝亲近之人的请求对我来说非常困难。", -1),
    item("我可以不同意重要的人，同时保持关系稳定。", 1),
    item("我常需要他人的确认才能相信自己的判断。", -1),
    item("我的身份认同不会完全由一段关系定义。", 1),
    item("如果亲近的人不参与，我往往不愿独自开展活动。", -1),
  ],
  ADP: [
    item("新信息出现时，我能较快调整原有计划。", 1),
    item("临时变化会让我付出很高的重新启动成本。", -1),
    item("在不同团队中，我能切换合适的沟通方式。", 1),
    item("我更愿意在不同情境中保持同一套做法。", -1),
    item("规则尚不完整时，我能先用临时方案推进。", 1),
    item("没有明确规范时，我很难判断该怎样行动。", -1),
    item("计划被打断后，我通常能找到另一条可行路径。", 1),
    item("进入新角色前，我需要较长的准备期。", -1),
    item("我能根据反馈迅速改变方法而不执着于原方案。", 1),
    item("突然改变已确认的安排会让我强烈抗拒。", -1),
    item("即兴处理意外情况通常是我的优势。", 1),
    item("找到有效方法后，我很少主动尝试另一种做法。", -1),
  ],
  EXP: [
    item("熟悉我的人通常能看出我当下的情绪。", 1),
    item("即使内心波动很大，我的外表通常仍很平静。", -1),
    item("谈到感兴趣的事时，我会自然表现出热情。", 1),
    item("我习惯淡化自己的兴奋和成就感。", -1),
    item("适当时，我愿意公开庆祝自己或他人的成果。", 1),
    item("我的关心通常通过不易察觉的小行动表达。", -1),
    item("我会用清楚的语言表达喜爱、感谢或想念。", 1),
    item("我很少向别人说明自己正在经历什么。", -1),
    item("我的语气、表情或动作通常富有变化。", 1),
    item("我倾向于保持克制而中性的外在形象。", -1),
    item("讨论中，我会让别人知道自己的即时反应。", 1),
    item("除非被直接询问，我通常不会分享思考过程。", -1),
  ],
  SYM: [
    item("象征和隐喻能帮助我理解难以言说的经验。", 1),
    item("我更愿意只用可观察事实解释个人经历。", -1),
    item("仪式感有时能帮助我标记重要的人生转变。", 1),
    item("如果没有可验证作用，仪式对我就没有价值。", -1),
    item("神话或传统故事能为现代处境提供反思材料。", 1),
    item("巧合对我而言通常就只是概率事件。", -1),
    item("季节、纪念日或周期会影响我组织生活意义的方式。", 1),
    item("不能直接测量的解释很难进入我的判断。", -1),
    item("我会把直觉作为线索，再与事实一起检验。", 1),
    item("古老叙事与我今天的选择关系不大。", -1),
    item("为经历建立个人象征能帮助我记忆和整合它。", 1),
    item("比起象征解释，我始终更偏好字面说明。", -1),
  ],
};

export const QUESTIONS = Array.from({ length: 12 }, (_, round) =>
  DIMENSIONS.map((dimension) => ({
    ...QUESTION_BANK[dimension.id][round],
    dimension: dimension.id,
    dimensionIndex: dimension.index,
    round,
  })),
).flat().map((question, index) => ({ ...question, id: `Q${String(index + 1).padStart(3, "0")}` }));

export const MAPPING_ROWS = [
  ["开放探索", "开放性 O", "N（弱映射）", "火/风；变动", "木/火", "新经验取向"],
  ["社交充能", "外向性 E", "E ↔ I", "风/火；阳性", "火；阳", "互动能量"],
  ["抽象整合", "开放性·智性", "N ↔ S", "风；水", "水/木", "模式加工"],
  ["逻辑权衡", "宜人性（反向部分）", "T ↔ F", "土/风 ↔ 水", "金 ↔ 水", "决策首要线索"],
  ["结构执行", "尽责性 C", "J ↔ P", "基本宫/土", "土/金", "闭环与计划"],
  ["主动能动", "外向性·果断", "E/J（部分）", "火；基本宫", "火/木；阳", "发起与影响"],
  ["情绪调节", "情绪稳定性", "-A/-T（非官方网络后缀）", "固定宫/土", "土/金", "复原与稳定"],
  ["协作互惠", "宜人性 A；诚实-谦逊", "F（部分）", "水/金星象征", "水/土", "互惠与修复"],
  ["边界自主", "依恋/人际圆环", "I（弱映射）", "土星/天王星象征", "金/水", "亲密中的独立"],
  ["情境适应", "开放性＋尽责性（反向部分）", "P（部分）", "变动宫", "水/木", "切换与重构"],
  ["外显表达", "外向性·热情", "E（部分）", "火/太阳象征", "火；阳", "可见表达"],
  ["象征意义", "开放性·审美/观念", "N（弱映射）", "海王星/第九宫象征", "水/木", "意义建构"],
];

const systems = [
  ["西方热带占星", "地中海—全球", "传统历法", "文化传统", 98, 91, 94, 98, 78],
  ["生肖／属相", "中国—东亚—全球华人", "传统历法", "文化传统", 95, 98, 96, 94, 84],
  ["MBTI 类型", "美国—全球", "现代类型", "商业类型", 94, 88, 52, 99, 94],
  ["印度 Jyotiṣa", "南亚—侨民社群", "传统历法", "文化传统", 89, 94, 96, 88, 88],
  ["塔罗", "欧洲—全球", "象征占卜", "文化／商业", 93, 81, 76, 99, 72],
  ["数字命理", "多源—全球", "象征占卜", "文化传统", 91, 84, 88, 94, 66],
  ["大五人格", "国际心理学", "心理测量", "研究支持", 91, 78, 48, 91, 99],
  ["八字／四柱／사주", "中国—韩半岛—东亚", "传统历法", "文化传统", 83, 91, 90, 89, 82],
  ["九型人格", "现代跨文化", "现代类型", "商业类型", 88, 79, 58, 96, 84],
  ["手相", "南亚—欧亚—全球", "身体占卜", "文化传统", 89, 83, 92, 85, 62],
  ["《易经》卦象", "中国—东亚—全球", "象征占卜", "文化经典", 78, 83, 99, 85, 90],
  ["DISC", "美国—全球职场", "现代类型", "商业类型", 86, 76, 48, 89, 92],
  ["依恋风格", "国际心理学", "关系分类", "研究支持", 84, 75, 52, 92, 96],
  ["风水／堪舆", "中国—东亚—全球", "环境术数", "文化传统", 82, 85, 94, 87, 74],
  ["Human Design", "欧美—全球网络", "混合类型", "新兴商业", 78, 63, 34, 97, 70],
  ["紫微斗数", "中国—东南亚华人", "传统历法", "文化传统", 67, 75, 78, 84, 67],
  ["RIASEC 霍兰德兴趣", "国际教育／职业", "职业分类", "研究支持", 77, 69, 58, 78, 94],
  ["日本血型性格", "日本—东亚流行文化", "现代民俗", "流行类型", 62, 72, 48, 83, 58],
  ["藏历占星", "西藏文化圈—喜马拉雅", "传统历法", "文化传统", 49, 58, 94, 57, 77],
  ["姓名学／测名", "东亚及多种文字文化", "象征占卜", "文化传统", 69, 66, 80, 78, 55],
  ["六爻／梅花易数", "中国—华人社群", "象征占卜", "文化传统", 55, 63, 88, 72, 62],
  ["Ifá 占卜", "约鲁巴—非洲侨民", "口传占卜", "世界遗产传统", 49, 58, 98, 58, 89],
  ["伊斯兰占星／字母数术", "西亚北非—历史伊斯兰世界", "历法／数术", "历史传统", 55, 62, 93, 54, 70],
  ["土占／Raml Geomancy", "非洲—阿拉伯—欧洲历史", "符号占卜", "历史传统", 52, 54, 91, 56, 60],
  ["奇门遁甲", "中国—东亚", "时空术数", "文化传统", 45, 55, 88, 69, 59],
  ["九星气学／Onmyōdō 系", "日本—东亚", "传统历法", "文化传统", 47, 55, 89, 61, 65],
  ["缅甸 Mahabote", "缅甸—东南亚", "传统历法", "文化传统", 38, 54, 91, 52, 68],
  ["泰国占星", "泰国—东南亚", "传统历法", "文化传统", 39, 56, 90, 55, 67],
  ["越南 Tử Vi", "越南—侨民社群", "传统历法", "文化传统", 41, 57, 82, 62, 63],
  ["玛雅 Tzolkʼin 当代应用", "中美洲—全球新世纪社群", "历法占卜", "传统／复兴", 48, 50, 94, 65, 57],
  ["卡巴拉数字／Gematria", "犹太传统—全球神秘学", "文字数术", "宗教／文化", 51, 47, 92, 63, 67],
  ["凯尔特树历当代类型", "欧美新异教社群", "现代复兴", "新兴文化", 48, 42, 43, 74, 52],
  ["Socionics", "东欧—网络社群", "现代类型", "商业／社群", 45, 39, 45, 67, 58],
  ["HEXACO", "国际心理学", "心理测量", "研究支持", 55, 33, 28, 55, 91],
];

export const INFLUENCE_WEIGHTS = { reach: 0.35, exposure: 0.25, continuity: 0.2, digital: 0.1, institution: 0.1 };

export const GLOBAL_SYSTEMS = systems.map(([name, origin, family, evidence, reach, exposure, continuity, digital, institution]) => {
  const score = Math.round(
    reach * INFLUENCE_WEIGHTS.reach +
    exposure * INFLUENCE_WEIGHTS.exposure +
    continuity * INFLUENCE_WEIGHTS.continuity +
    digital * INFLUENCE_WEIGHTS.digital +
    institution * INFLUENCE_WEIGHTS.institution,
  );
  return { name, origin, family, evidence, reach, exposure, continuity, digital, institution, score };
}).sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

const clamp = (value, min = 0, max = 100) => Math.min(max, Math.max(min, value));
const mod = (value, divisor) => ((value % divisor) + divisor) % divisor;
const mean = (values) => values.reduce((sum, value) => sum + value, 0) / values.length;

export function scoreQuestionnaire(answerMap) {
  const scores = DIMENSIONS.map((dimension) => {
    const items = QUESTIONS.filter((question) => question.dimension === dimension.id);
    const values = items
      .filter((question) => Number.isFinite(Number(answerMap[question.id])))
      .map((question) => {
        const response = Number(answerMap[question.id]);
        return question.keyed === 1 ? ((response - 1) / 4) * 100 : ((5 - response) / 4) * 100;
      });
    return values.length ? Math.round(mean(values)) : null;
  });

  const rawResponses = QUESTIONS
    .map((question) => Number(answerMap[question.id]))
    .filter((value) => Number.isFinite(value));
  const completeness = rawResponses.length / QUESTIONS.length;
  const responseMean = rawResponses.length ? mean(rawResponses) : 0;
  const variance = rawResponses.length
    ? mean(rawResponses.map((value) => (value - responseMean) ** 2))
    : 0;
  const dispersion = Math.sqrt(variance);

  const pairGaps = [];
  for (const dimension of DIMENSIONS) {
    const items = QUESTIONS.filter((question) => question.dimension === dimension.id);
    for (let i = 0; i < 6; i += 1) {
      const positive = items[i * 2];
      const negative = items[i * 2 + 1];
      const p = Number(answerMap[positive.id]);
      const n = Number(answerMap[negative.id]);
      if (Number.isFinite(p) && Number.isFinite(n)) pairGaps.push(Math.abs(p - (6 - n)));
    }
  }
  const consistency = pairGaps.length ? clamp(100 - mean(pairGaps) * 25) : 0;
  const dispersionQuality = clamp((dispersion / 1.1) * 100);
  const qualityScore = Math.round(completeness * 55 + consistency * 0.3 + dispersionQuality * 0.15);
  const qualityBand = qualityScore >= 82 ? "较高" : qualityScore >= 65 ? "中等" : "需复核";

  return { scores, completeness, dispersion, consistency: Math.round(consistency), qualityScore, qualityBand };
}

const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const STEM_ELEMENTS = ["木", "木", "火", "火", "土", "土", "金", "金", "水", "水"];
const BRANCH_ELEMENTS = ["水", "土", "木", "木", "土", "火", "火", "土", "金", "金", "土", "水"];
const ZODIAC = [
  ["白羊座", "火", "基本"], ["金牛座", "土", "固定"], ["双子座", "风", "变动"],
  ["巨蟹座", "水", "基本"], ["狮子座", "火", "固定"], ["处女座", "土", "变动"],
  ["天秤座", "风", "基本"], ["天蝎座", "水", "固定"], ["射手座", "火", "变动"],
  ["摩羯座", "土", "基本"], ["水瓶座", "风", "固定"], ["双鱼座", "水", "变动"],
];
const ANIMALS = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];

export function julianDay(dateString, timeString = "12:00", timezoneOffset = 0) {
  const [year, month, day] = dateString.split("-").map(Number);
  const [hour = 12, minute = 0] = timeString.split(":").map(Number);
  const utcMillis = Date.UTC(year, month - 1, day, hour, minute) - Number(timezoneOffset) * 3_600_000;
  return utcMillis / 86_400_000 + 2440587.5;
}

export function solarLongitude(jd) {
  const d = jd - 2451545.0;
  const g = mod(357.529 + 0.98560028 * d, 360) * Math.PI / 180;
  const q = mod(280.459 + 0.98564736 * d, 360);
  return mod(q + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g), 360);
}

function reduceNumerology(dateString) {
  let value = dateString.replaceAll("-", "").split("").reduce((sum, digit) => sum + Number(digit), 0);
  while (value > 9 && ![11, 22, 33].includes(value)) {
    value = String(value).split("").reduce((sum, digit) => sum + Number(digit), 0);
  }
  return value;
}

function dateDiffFromJiazi(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const target = Date.UTC(year, month - 1, day);
  const reference = Date.UTC(1949, 9, 1);
  return Math.round((target - reference) / 86_400_000);
}

const ELEMENT_VECTORS = {
  木: [7, 2, 4, -1, -3, 6, 0, 3, 1, 6, 3, 4],
  火: [6, 6, 1, 2, -2, 7, -2, 2, -1, 5, 8, 4],
  土: [-3, -2, -5, 3, 8, 0, 7, 5, 2, -4, -3, -2],
  金: [-2, -2, -1, 8, 6, 2, 4, -1, 6, -3, -3, -4],
  水: [3, -3, 7, -5, -2, -2, -1, 6, 2, 7, -1, 8],
  风: [7, 7, 8, 2, -4, 3, -1, 2, 1, 6, 5, 3],
};
const MODALITY_VECTORS = {
  基本: [2, 2, 0, 1, 4, 7, 0, 0, 1, 1, 3, 0],
  固定: [-2, -1, -1, 2, 5, 0, 7, 2, 2, -6, -1, 1],
  变动: [5, 2, 4, -1, -5, -1, -2, 2, -1, 8, 2, 4],
};
const LIFE_VECTORS = {
  1: [2, 0, 0, 2, 1, 6, 1, -1, 4, 1, 2, 0],
  2: [0, -1, 1, -3, 0, -2, 0, 6, -4, 2, 1, 2],
  3: [4, 5, 3, -1, -3, 3, -1, 2, -1, 4, 7, 3],
  4: [-2, -2, -3, 4, 7, 0, 5, 2, 2, -4, -2, -1],
  5: [7, 3, 3, 0, -6, 2, -2, 1, 2, 7, 4, 3],
  6: [1, 2, 1, -4, 3, 0, 2, 7, -3, 1, 3, 4],
  7: [2, -5, 6, 4, 1, -2, 2, -1, 5, 0, -4, 6],
  8: [-1, 2, -1, 6, 6, 7, 2, -2, 5, -1, 1, -2],
  9: [4, 3, 4, -4, -1, 2, 0, 7, -2, 3, 4, 7],
  11: [5, 1, 7, -2, -3, 0, -3, 5, -1, 5, 3, 8],
  22: [4, 1, 3, 3, 7, 6, 3, 4, 2, 3, 2, 5],
  33: [4, 4, 4, -5, 0, 2, 0, 8, -3, 4, 6, 8],
};

export function calculateBirthProfile({ date, time = "12:00", timezoneOffset = 0, timeKnown = true }) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) throw new Error("需要有效出生日期");
  const jd = julianDay(date, time || "12:00", timezoneOffset);
  const longitude = solarLongitude(jd);
  const signIndex = Math.floor(longitude / 30);
  const [sunSign, westernElement, modality] = ZODIAC[signIndex];
  const [year, month, day] = date.split("-").map(Number);
  const localHour = Number((time || "12:00").split(":")[0]);
  const baziYear = month < 2 || (month === 2 && day < 4) ? year - 1 : year;
  const yearCycle = mod(baziYear - 4, 60);
  const yearStem = yearCycle % 10;
  const yearBranch = yearCycle % 12;
  const solarMonth = Math.floor(mod(longitude - 315, 360) / 30);
  const monthBranch = mod(2 + solarMonth, 12);
  const monthStem = mod((yearStem % 5) * 2 + 2 + solarMonth, 10);
  const dayCycle = mod(dateDiffFromJiazi(date), 60);
  const dayStem = dayCycle % 10;
  const dayBranch = dayCycle % 12;
  const hourBranch = Math.floor(mod(localHour + 1, 24) / 2);
  const hourStem = mod((dayStem % 5) * 2 + hourBranch, 10);

  const pillars = [
    { name: "年", stem: yearStem, branch: yearBranch },
    { name: "月", stem: monthStem, branch: monthBranch },
    { name: "日", stem: dayStem, branch: dayBranch },
    ...(timeKnown ? [{ name: "时", stem: hourStem, branch: hourBranch }] : []),
  ].map((pillar) => ({
    ...pillar,
    label: `${STEMS[pillar.stem]}${BRANCHES[pillar.branch]}`,
    elements: [STEM_ELEMENTS[pillar.stem], BRANCH_ELEMENTS[pillar.branch]],
  }));

  const elementCounts = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  pillars.forEach((pillar) => pillar.elements.forEach((element) => { elementCounts[element] += 1; }));
  const totalElements = Object.values(elementCounts).reduce((sum, value) => sum + value, 0);
  const dominantElement = Object.entries(elementCounts).sort((a, b) => b[1] - a[1])[0][0];
  const yangCount = pillars.reduce((sum, pillar) => sum + (pillar.stem % 2 === 0 ? 1 : 0) + (pillar.branch % 2 === 0 ? 1 : 0), 0);
  const yinYang = yangCount / totalElements;
  const lifePath = reduceNumerology(date);

  const westernVector = ELEMENT_VECTORS[westernElement];
  const modalityVector = MODALITY_VECTORS[modality];
  const lifeVector = LIFE_VECTORS[lifePath] || LIFE_VECTORS[reduceNumerology(String(lifePath).padStart(8, "0"))] || LIFE_VECTORS[1];
  const symbolicScores = DIMENSIONS.map((_, index) => {
    let baziContribution = 0;
    for (const [element, count] of Object.entries(elementCounts)) {
      const centeredShare = count / totalElements - 0.2;
      baziContribution += centeredShare * ELEMENT_VECTORS[element][index] * 2.2;
    }
    const polarityContribution = [0, 4, 0, 1, 0, 4, 0, 0, 2, 1, 5, 0][index] * (yinYang - 0.5);
    return Math.round(clamp(
      50 + westernVector[index] * 0.55 + modalityVector[index] * 0.35 + baziContribution + lifeVector[index] * 0.3 + polarityContribution,
      35,
      65,
    ));
  });

  const moonAge = mod(jd - 2451550.1, 29.530588853);
  const moonPhase = moonAge < 1.85 || moonAge >= 27.68 ? "新月附近" : moonAge < 7.38 ? "上弦渐盈" : moonAge < 9.23 ? "上弦附近" : moonAge < 14.77 ? "盈凸月" : moonAge < 16.61 ? "满月附近" : moonAge < 22.15 ? "亏凸月" : moonAge < 24 ? "下弦附近" : "残月渐亏";

  return {
    jd,
    solarLongitude: Math.round(longitude * 100) / 100,
    sunSign,
    westernElement,
    modality,
    moonPhase,
    pillars,
    yearAnimal: ANIMALS[yearBranch],
    elementCounts,
    dominantElement,
    yinYang: Math.round(yinYang * 100),
    lifePath,
    symbolicScores,
    confidence: timeKnown ? "日期与时刻已提供；节气边界仍为近似" : "未提供准确时刻；时柱已省略",
  };
}

export function blendScores(questionnaireScores, symbolicScores = null, lambda = 0.15) {
  return questionnaireScores.map((score, index) => {
    if (!Number.isFinite(score)) return symbolicScores?.[index] ?? 50;
    if (!symbolicScores || lambda <= 0) return Math.round(score);
    return Math.round(clamp(score * (1 - lambda) + symbolicScores[index] * lambda));
  });
}

export function makeOmlCode(scores) {
  const pairs = [DIMENSIONS[1], DIMENSIONS[2], DIMENSIONS[3], DIMENSIONS[4]];
  const core = pairs.map((dimension) => dimension.code[scores[dimension.index] >= 50 ? 1 : 0]).join("");
  const regulation = DIMENSIONS[6].code[scores[6] >= 50 ? 1 : 0];
  return `${core}-${regulation}`;
}

export function describeCode(scores) {
  return [
    scores[1] >= 50 ? "共处充能" : "独处充能",
    scores[2] >= 50 ? "模式整合" : "具体落地",
    scores[3] >= 50 ? "系统逻辑" : "价值关照",
    scores[4] >= 50 ? "计划闭环" : "开放流动",
    scores[6] >= 50 ? "稳定复原" : "敏锐响应",
  ].join(" · ");
}

const MATCH_RULES = [
  { mode: "similarity", weight: 0.06 }, { mode: "complement", weight: 0.08 },
  { mode: "similarity", weight: 0.05 }, { mode: "similarity", weight: 0.10 },
  { mode: "balance", weight: 0.08 }, { mode: "complement", weight: 0.08 },
  { mode: "support", weight: 0.10 }, { mode: "similarity", weight: 0.12 },
  { mode: "similarity", weight: 0.12 }, { mode: "balance", weight: 0.07 },
  { mode: "complement", weight: 0.05 }, { mode: "similarity", weight: 0.09 },
];

function dimensionMatch(a, b, mode) {
  const gap = Math.abs(a - b);
  const similarity = 100 - gap;
  if (mode === "similarity") return similarity;
  if (mode === "complement") return clamp(100 - Math.abs(gap - 18) * 1.6);
  if (mode === "balance") return clamp(similarity * 0.65 + (100 - Math.abs((a + b) / 2 - 50) * 1.2) * 0.35);
  if (mode === "support") return clamp(similarity * 0.6 + ((a + b) / 2) * 0.4);
  return similarity;
}

function modeCompatibility(a, b) {
  if (!a || !b || a === "unsure" || b === "unsure") return 85;
  if (a === b) return 100;
  if ([a, b].every((value) => ["open", "poly"].includes(value))) return 78;
  return 30;
}

export function calculateCompatibility(profileA, profileB, preferences = {}) {
  const dimensionScores = MATCH_RULES.map((rule, index) => Math.round(dimensionMatch(profileA[index], profileB[index], rule.mode)));
  const personality = dimensionScores.reduce((sum, value, index) => sum + value * MATCH_RULES[index].weight, 0);
  const communicationA = Number(preferences.communicationA || 3);
  const communicationB = Number(preferences.communicationB || 3);
  const communication = clamp(100 - Math.abs(communicationA - communicationB) * 25);
  const relationshipMode = modeCompatibility(preferences.modeA, preferences.modeB);
  const total = Math.round(personality * 0.82 + communication * 0.1 + relationshipMode * 0.08);
  const strengths = dimensionScores
    .map((score, index) => ({ score, name: DIMENSIONS[index].name }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  const conversations = dimensionScores
    .map((score, index) => ({ score, name: DIMENSIONS[index].name }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);
  return { total, personality: Math.round(personality), communication, relationshipMode, dimensionScores, strengths, conversations };
}

export const SAMPLE_SCORES = [78, 42, 81, 66, 73, 59, 64, 71, 68, 57, 46, 74];

