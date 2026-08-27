# OML v1.0 开发规格说明书
## Omni-Life Matrix / 多源人生矩阵

> 目标读者：Codex、软件工程师、产品经理、数据工程师、心理测量研究人员  
> 文档用途：作为 OML v1.0 MVP / Beta 的仓库级开发规范、实现依据与验收标准  
> 文档状态：Draft for Implementation  
> 版本：1.0.0  
> 语言：中文  
> 默认时区处理：IANA Time Zone  
> 默认数值范围：除非另有说明，标准分均为 `0..100`

---

# 0. Codex 执行指令

如果本文件被直接交给 Codex，请按以下原则执行：

1. **先实现确定性核心，再实现可替换的象征计算适配器。**
2. 所有核心公式、题目 ID、字段名、枚举值必须可测试、可追踪、可版本化。
3. **不要把占星、八字、Jyotisha 等象征层描述为经过科学验证的人格预测模型。**
4. 心理问卷层、现实数据层与象征层必须在数据模型、API 和 UI 上分层存储。
5. 不允许使用性别、性取向、族群、宗教等身份变量作为“吉凶”“能力”“价值”加减分因素。
6. 关系匹配不得默认异性恋、婚姻、一夫一妻制或二元性别。
7. 任何依赖出生时间精度的结果必须携带 `birth_time_confidence` 或等价置信度字段。
8. 任何无法确定的传统流派规则必须通过 `calculation_profile` 显式指定，不得写死为唯一真值。
9. 所有评分函数必须是纯函数，具备单元测试。
10. 所有结果必须可由输入重算，不依赖不可追踪的随机状态。
11. 神谕/随机层如需随机数，必须保存 `seed`、时间、牌组/卦法版本。
12. 数据库必须保存算法版本，以支持未来重算和迁移。
13. 所有最终报告应显示：
   - Evidence Profile
   - Symbolic Profile
   - Convergence
   - Confidence
   - Algorithm Version
14. 不要在 MVP 阶段加入未经本文定义的“神秘加权”“AI 自动改分”。
15. LLM 只能用于**解释文本生成**，不得修改底层原始分数。

---

# 1. 产品定义

OML（Omni-Life Matrix，多源人生矩阵）是一套将以下信息分层处理的个人画像系统：

- 核心人格问卷
- 关系与依恋问卷
- 价值观与生活选择
- 当前现实环境
- 出生信息
- 中国八字
- 西方占星
- Jyotisha / 印度占星
- 可扩展的其他文化象征系统
- 可选神谕/随机反思模块
- 情侣/伴侣兼容性
- 动态时间周期
- 多体系一致度

OML 不以“某一个命理体系正确”为前提。

OML 的基本设计原则是：

```text
Evidence Layer != Symbolic Layer
```

即：

```text
现实行为和心理测量
与
传统象征系统
必须分开建模、分开计分、分开展示。
```

---

# 2. 产品目标

## 2.1 MVP 必须实现

MVP 必须具备：

1. 用户创建 Profile。
2. 完成 144 题 OML 标准问卷。
3. 计算 12 维核心人格。
4. 计算关系 4 维。
5. 计算 12 个价值观领域。
6. 输出 OML 五字符人格代码。
7. 输出 MBTI-like Translation。
8. 接收出生日期、时间、地点及时区。
9. 计算出生时间置信度。
10. 支持 Western / BaZi / Jyotisha 的标准化接口。
11. 允许某个象征模块未实现或不可用。
12. 输出统一 12 维 Symbolic Vector。
13. 输出 Evidence / Symbolic / Convergence。
14. 支持两人匹配。
15. 支持 JSON API。
16. 支持结果版本化。
17. 支持完整自动测试。

## 2.2 Beta 目标

Beta 可进一步实现：

- 紫微斗数 Adapter
- Numerology Adapter
- Tarot / I Ching Oracle
- Dynamic Cycle
- 多语言
- 常模百分位
- EFA/CFA 数据导出
- 研究型匿名数据集
- PDF 报告
- AI 个性化解释

## 2.3 非目标

v1 不应：

- 声称疾病诊断
- 声称精神疾病诊断
- 声称医学风险
- 声称犯罪风险
- 声称用户性取向可以通过命盘推断
- 声称性别认同可以通过命盘推断
- 声称未来事件必然发生
- 将生死、事故、疾病作为确定预测
- 用命理结果替代法律、医疗、财务专业意见
- 使用象征模块覆盖用户真实回答

---

# 3. 系统分层

OML v1 使用以下六层：

```text
P = Personality Layer
R = Relationship Layer
V = Values Layer
B = Birth Symbolic Layer
C = Context Layer
O = Oracle Layer
```

其中核心综合表达：

```text
EvidenceProfile = 0.8125 * P + 0.1875 * C
SymbolicProfile = 0.75 * B + 0.25 * O
```

若 Oracle Layer 未启用：

```text
SymbolicProfile = B
```

默认综合展示分：

```text
OML = 0.65 * P
    + 0.15 * C
    + 0.15 * B
    + 0.05 * O
```

如果某一层缺失：

- 不允许将缺失值直接视为 0。
- 必须对剩余权重重新归一化。
- UI 必须显示实际有效权重。

示例：

若 O 缺失，则：

```text
effective_total = 0.65 + 0.15 + 0.15 = 0.95

P_weight = 0.65 / 0.95
C_weight = 0.15 / 0.95
B_weight = 0.15 / 0.95
```

---

# 4. 核心 12 维人格

定义：

| ID | Code | 中文 | English | 高分倾向 |
|---|---|---|---|---|
| D01 | AG | 自主驱动 | Agency | 主动决定、承担责任 |
| D02 | OP | 开放探索 | Openness | 新奇、抽象、探索 |
| D03 | DS | 结构执行 | Discipline | 计划、坚持、秩序 |
| D04 | SE | 社交能量 | Social Energy | 社交刺激需求较高 |
| D05 | CO | 合作共情 | Cooperation | 合作、换位、协调 |
| D06 | ER | 情绪调节 | Emotional Regulation | 情绪恢复与稳定 |
| D07 | RA | 风险行动 | Risk & Action | 不确定下快速行动 |
| D08 | IN | 亲密开放 | Intimacy | 接受亲密与脆弱 |
| D09 | CM | 社群取向 | Community | 集体、归属、公共参与 |
| D10 | RT | 扎根稳定 | Rootedness | 稳定、连续、定居 |
| D11 | ME | 意义取向 | Meaning | 价值、哲学、意义 |
| D12 | AD | 变化适应 | Adaptability | 转型、调整、弹性 |

注意：

```text
高分 != 优秀
低分 != 缺陷
```

所有维度都必须采用“倾向”描述。

---

# 5. 问卷结构

总题数：

```text
Core Personality = 96
Relationship = 24
Values = 24
Total = 144
```

## 5.1 普通题回答格式

Likert 1–7：

```text
1 = 非常不同意
2 = 不同意
3 = 略不同意
4 = 中性 / 不确定
5 = 略同意
6 = 同意
7 = 非常同意
```

反向题：

```text
reverse_score = 8 - answer
```

---

# 6. 96 题核心人格题库

推荐数据结构：

```ts
type QuestionnaireItem = {
  id: string;
  number: number;
  dimension: CoreDimension;
  text_zh: string;
  reverse: boolean;
  version: string;
};
```

## 6.1 AG 自主驱动 Q001-Q008

```yaml
- id: Q001
  dimension: AG
  reverse: false
  text_zh: 面对重要选择，即使身边的人不同意，我通常仍能形成自己的决定。
- id: Q002
  dimension: AG
  reverse: false
  text_zh: 没有人要求时，我也经常主动开始需要完成的事情。
- id: Q003
  dimension: AG
  reverse: false
  text_zh: 我能够为自己的重要决定承担后果。
- id: Q004
  dimension: AG
  reverse: false
  text_zh: 当自己的合理需求没有得到满足时，我通常能够直接表达。
- id: Q005
  dimension: AG
  reverse: true
  text_zh: 面对重大选择，我更希望别人替我决定。
- id: Q006
  dimension: AG
  reverse: true
  text_zh: 为了避免他人不赞同，我很容易改变原本的决定。
- id: Q007
  dimension: AG
  reverse: true
  text_zh: 如果没人明确告诉我下一步做什么，我容易停在那里。
- id: Q008
  dimension: AG
  reverse: true
  text_zh: 在团队中，我通常不希望影响事情最终向哪个方向发展。
```

## 6.2 OP 开放探索 Q009-Q016

```yaml
- id: Q009
  dimension: OP
  reverse: false
  text_zh: 我喜欢接触以前没有考虑过的观点。
- id: Q010
  dimension: OP
  reverse: false
  text_zh: 一个答案出现之后，我经常还想知道背后的机制。
- id: Q011
  dimension: OP
  reverse: false
  text_zh: 我愿意主动尝试从完全不同的角度理解问题。
- id: Q012
  dimension: OP
  reverse: false
  text_zh: 即使与工作或专业无关，我也愿意学习陌生领域。
- id: Q013
  dimension: OP
  reverse: true
  text_zh: 即使新方法可能更好，我通常仍偏爱已经熟悉的方法。
- id: Q014
  dimension: OP
  reverse: true
  text_zh: 过于抽象的问题往往让我失去兴趣。
- id: Q015
  dimension: OP
  reverse: true
  text_zh: 我很少主动怀疑自己习以为常的假设。
- id: Q016
  dimension: OP
  reverse: true
  text_zh: 新鲜体验通常不值得打乱原本的安排。
```

## 6.3 DS 结构执行 Q017-Q024

```yaml
- id: Q017
  dimension: DS
  reverse: false
  text_zh: 对于复杂目标，我通常会把它拆成若干阶段。
- id: Q018
  dimension: DS
  reverse: false
  text_zh: 即使任务枯燥，我通常也能完成必要部分。
- id: Q019
  dimension: DS
  reverse: false
  text_zh: 我会主动记录期限、资源或进展。
- id: Q020
  dimension: DS
  reverse: false
  text_zh: 对长期目标，我倾向建立稳定习惯。
- id: Q021
  dimension: DS
  reverse: true
  text_zh: 我经常开始很多事情，却很少真正完成。
- id: Q022
  dimension: DS
  reverse: true
  text_zh: 我经常依赖最后期限的压力才开始行动。
- id: Q023
  dimension: DS
  reverse: true
  text_zh: 一旦一件事失去新鲜感，我就容易忽略细节。
- id: Q024
  dimension: DS
  reverse: true
  text_zh: 长期维持固定习惯对我来说很困难。
```

## 6.4 SE 社交能量 Q025-Q032

```yaml
- id: Q025
  dimension: SE
  reverse: false
  text_zh: 认识新的人通常会增加我的精神活力。
- id: Q026
  dimension: SE
  reverse: false
  text_zh: 讨论问题时，我常常通过说出来进一步形成自己的想法。
- id: Q027
  dimension: SE
  reverse: false
  text_zh: 我通常愿意主动开启社交互动。
- id: Q028
  dimension: SE
  reverse: false
  text_zh: 我喜欢人与人互动较多的环境。
- id: Q029
  dimension: SE
  reverse: true
  text_zh: 大多数社交活动结束以后，我需要较长时间独处恢复。
- id: Q030
  dimension: SE
  reverse: true
  text_zh: 我通常不会主动和陌生人开始谈话。
- id: Q031
  dimension: SE
  reverse: true
  text_zh: 如果没有实际必要，我倾向减少与人的交流。
- id: Q032
  dimension: SE
  reverse: true
  text_zh: 人很多的环境通常很快让我感到疲劳。
```

## 6.5 CO 合作共情 Q033-Q040

```yaml
- id: Q033
  dimension: CO
  reverse: false
  text_zh: 我通常能够察觉别人没有直接说出来的合理需要。
- id: Q034
  dimension: CO
  reverse: false
  text_zh: 为了找到对双方公平的方案，我愿意调整自己的做法。
- id: Q035
  dimension: CO
  reverse: false
  text_zh: 即使强烈不同意对方，我也倾向避免羞辱对方。
- id: Q036
  dimension: CO
  reverse: false
  text_zh: 做决定时，我自然会考虑决定对其他人的影响。
- id: Q037
  dimension: CO
  reverse: true
  text_zh: 争论中证明自己是对的通常比保持关系更重要。
- id: Q038
  dimension: CO
  reverse: true
  text_zh: 对于与问题本身没有直接关系的情绪，我通常没有耐心。
- id: Q039
  dimension: CO
  reverse: true
  text_zh: 如果规则允许，我通常不会特别考虑自己的选择是否令别人吃亏。
- id: Q040
  dimension: CO
  reverse: true
  text_zh: 我很少为了他人的合理需要修改原来的安排。
```

## 6.6 ER 情绪调节 Q041-Q048

```yaml
- id: Q041
  dimension: ER
  reverse: false
  text_zh: 压力事件结束以后，我通常能够较快恢复正常状态。
- id: Q042
  dimension: ER
  reverse: false
  text_zh: 被批评后，我通常能够分析其中有用的部分，而不会持续受到影响。
- id: Q043
  dimension: ER
  reverse: false
  text_zh: 信息不完整时，我仍能够容忍一段时间的不确定。
- id: Q044
  dimension: ER
  reverse: false
  text_zh: 即使情绪强烈，我通常仍能控制自己的行为。
- id: Q045
  dimension: ER
  reverse: true
  text_zh: 一个小挫折可能让我反复想着它很久。
- id: Q046
  dimension: ER
  reverse: true
  text_zh: 信息不足时，我容易自动想到最坏结果。
- id: Q047
  dimension: ER
  reverse: true
  text_zh: 冲突结束很久以后，我的情绪仍可能保持高度激活。
- id: Q048
  dimension: ER
  reverse: true
  text_zh: 一些很小的事情就可能明显改变我的情绪。
```

## 6.7 RA 风险行动 Q049-Q056

```yaml
- id: Q049
  dimension: RA
  reverse: false
  text_zh: 如果拖延本身存在成本，我能够在信息不完全时行动。
- id: Q050
  dimension: RA
  reverse: false
  text_zh: 我愿意承担经过评估的风险来获得更大机会。
- id: Q051
  dimension: RA
  reverse: false
  text_zh: 对结果不能完全确定的决定，我通常仍能作出选择。
- id: Q052
  dimension: RA
  reverse: false
  text_zh: 一定程度的竞争或压力反而会促进我的行动。
- id: Q053
  dimension: RA
  reverse: true
  text_zh: 只要存在明显失败可能，我通常会放弃机会。
- id: Q054
  dimension: RA
  reverse: true
  text_zh: 即使潜在收益明显更高，我也常选择最安全的方案。
- id: Q055
  dimension: RA
  reverse: true
  text_zh: 我有时会分析到机会已经过去。
- id: Q056
  dimension: RA
  reverse: true
  text_zh: 不确定性常常让我难以采取行动。
```

## 6.8 IN 亲密开放 Q057-Q064

```yaml
- id: Q057
  dimension: IN
  reverse: false
  text_zh: 对信任的人，我能够谈论真正重要的感受。
- id: Q058
  dimension: IN
  reverse: false
  text_zh: 遇到困难时，我能够向亲近的人寻求支持。
- id: Q059
  dimension: IN
  reverse: false
  text_zh: 我能够允许亲密的人看到自己的脆弱。
- id: Q060
  dimension: IN
  reverse: false
  text_zh: 在亲密关系中，我能够直接讨论需要和界限。
- id: Q061
  dimension: IN
  reverse: true
  text_zh: 即使处于非常亲密的关系，我仍倾向完全自己解决情绪困难。
- id: Q062
  dimension: IN
  reverse: true
  text_zh: 别人和我过于亲近时，我容易觉得被侵犯。
- id: Q063
  dimension: IN
  reverse: true
  text_zh: 我有时会避免可能增加情感依赖的谈话。
- id: Q064
  dimension: IN
  reverse: true
  text_zh: 当一个人与我越来越亲近时，我有时会本能地拉开距离。
```

## 6.9 CM 社群取向 Q065-Q072

```yaml
- id: Q065
  dimension: CM
  reverse: false
  text_zh: 我认为自己对身边更大的群体也承担一定责任。
- id: Q066
  dimension: CM
  reverse: false
  text_zh: 我喜欢参与对许多人都有价值的项目。
- id: Q067
  dimension: CM
  reverse: false
  text_zh: 我会主动维护社区、同行或其他群体中的联系。
- id: Q068
  dimension: CM
  reverse: false
  text_zh: 做重要决定时，我有时会考虑它对更大群体的影响。
- id: Q069
  dimension: CM
  reverse: true
  text_zh: 如果一件事不能直接给我带来收益，我通常不愿承担群体责任。
- id: Q070
  dimension: CM
  reverse: true
  text_zh: 社区或集体义务对我来说通常只是负担。
- id: Q071
  dimension: CM
  reverse: true
  text_zh: 对于与自己没有直接关系的公共问题，我很少产生兴趣。
- id: Q072
  dimension: CM
  reverse: true
  text_zh: 我很少对某个社区或群体产生强烈归属感。
```

## 6.10 RT 扎根稳定 Q073-Q080

```yaml
- id: Q073
  dimension: RT
  reverse: false
  text_zh: 拥有一个稳定、熟悉的生活基地对我非常重要。
- id: Q074
  dimension: RT
  reverse: false
  text_zh: 我偏好相对可以预测的日常环境。
- id: Q075
  dimension: RT
  reverse: false
  text_zh: 连续性和长期传统能够给我安全感。
- id: Q076
  dimension: RT
  reverse: false
  text_zh: 在同一地区建立长期关系网络对我很重要。
- id: Q077
  dimension: RT
  reverse: true
  text_zh: 我能够很自在地频繁更换居住地。
- id: Q078
  dimension: RT
  reverse: true
  text_zh: 相比长期定居，我更容易被不同地方的生活吸引。
- id: Q079
  dimension: RT
  reverse: true
  text_zh: 我对熟悉的地点和生活惯例通常没有很强依恋。
- id: Q080
  dimension: RT
  reverse: true
  text_zh: 我很容易用一个新的生活环境替代已经熟悉的环境。
```

## 6.11 ME 意义取向 Q081-Q088

```yaml
- id: Q081
  dimension: ME
  reverse: false
  text_zh: 我经常思考自己追求某个目标的真正原因。
- id: Q082
  dimension: ME
  reverse: false
  text_zh: 我希望自己的重大决定能够与核心价值保持一致。
- id: Q083
  dimension: ME
  reverse: false
  text_zh: 哲学、精神或存在意义问题会吸引我。
- id: Q084
  dimension: ME
  reverse: false
  text_zh: 如果可能，我希望自己的工作具有超越收入本身的意义。
- id: Q085
  dimension: ME
  reverse: true
  text_zh: 只要现实问题得到解决，我很少追问更大的意义。
- id: Q086
  dimension: ME
  reverse: true
  text_zh: 价值观通常不会明显影响我的日常决定。
- id: Q087
  dimension: ME
  reverse: true
  text_zh: 我认为思考存在意义通常没有多少实际价值。
- id: Q088
  dimension: ME
  reverse: true
  text_zh: 对我而言，成功通常比这种成功是否符合更深层原则重要。
```

## 6.12 AD 变化适应 Q089-Q096

```yaml
- id: Q089
  dimension: AD
  reverse: false
  text_zh: 外界条件发生变化以后，我能够迅速修改计划。
- id: Q090
  dimension: AD
  reverse: false
  text_zh: 即使身处明显的过渡期，我通常仍能够维持基本功能。
- id: Q091
  dimension: AD
  reverse: false
  text_zh: 一个方法失败后，我能够比较快地更换方法。
- id: Q092
  dimension: AD
  reverse: false
  text_zh: 我能够接受自己的身份、目标或生活方式随着人生阶段发生变化。
- id: Q093
  dimension: AD
  reverse: true
  text_zh: 日常计划发生变化后，我通常需要很长时间调整。
- id: Q094
  dimension: AD
  reverse: true
  text_zh: 即使原有假设已经不成立，我仍容易坚持最初方案。
- id: Q095
  dimension: AD
  reverse: true
  text_zh: 状况模糊的过渡期经常让我不知道如何行动。
- id: Q096
  dimension: AD
  reverse: true
  text_zh: 一旦我认定自己是什么样的人，改变方向就容易让我感觉失败。
```

---

# 7. 关系模块 Q097-Q120

关系模块产生：

```text
AX = Attachment Anxiety
AV = Attachment Avoidance
RP = Repair Capacity
TR = Trust / Reliability
```

## 7.1 AX Q097-Q102

```yaml
- id: Q097
  dimension: AX
  reverse: false
  text_zh: 关系出现一点异常时，我容易担心对方已经不再重视我。
- id: Q098
  dimension: AX
  reverse: false
  text_zh: 对方长时间没有回应时，我容易反复猜测原因。
- id: Q099
  dimension: AX
  reverse: false
  text_zh: 我经常需要明确确认，才能确信一段关系仍然安全。
- id: Q100
  dimension: AX
  reverse: false
  text_zh: 我很害怕自己最终会被亲密的人抛弃。
- id: Q101
  dimension: AX
  reverse: true
  text_zh: 即使伴侣暂时需要自己的空间，我通常仍能感到关系是稳定的。
- id: Q102
  dimension: AX
  reverse: true
  text_zh: 一次意见冲突通常不会让我怀疑整个关系。
```

## 7.2 AV Q103-Q108

```yaml
- id: Q103
  dimension: AV
  reverse: false
  text_zh: 依赖伴侣会让我感觉失去自主性。
- id: Q104
  dimension: AV
  reverse: false
  text_zh: 当对方表现出强烈情感需要时，我有时会本能退出。
- id: Q105
  dimension: AV
  reverse: false
  text_zh: 我通常不希望任何人知道自己真正需要他们。
- id: Q106
  dimension: AV
  reverse: false
  text_zh: 即使处于长期关系，我也倾向保持较大的情感距离。
- id: Q107
  dimension: AV
  reverse: true
  text_zh: 在必要时依靠伴侣对我来说很自然。
- id: Q108
  dimension: AV
  reverse: true
  text_zh: 彼此依赖并不会自动让我感觉失去自由。
```

## 7.3 RP Q109-Q114

```yaml
- id: Q109
  dimension: RP
  reverse: false
  text_zh: 冲突升级时，我能够暂时停止，并在冷静后回来解决问题。
- id: Q110
  dimension: RP
  reverse: false
  text_zh: 如果自己确实有责任，我能够具体说明自己做错了什么。
- id: Q111
  dimension: RP
  reverse: false
  text_zh: 我能够把这个行为有问题和这个人不好区分开来。
- id: Q112
  dimension: RP
  reverse: false
  text_zh: 我能够讨论困难问题，而不立即把关系本身作为筹码。
- id: Q113
  dimension: RP
  reverse: true
  text_zh: 冲突时，我容易重新翻出很多以前的问题。
- id: Q114
  dimension: RP
  reverse: true
  text_zh: 生气时，我可能用撤回沟通来惩罚对方。
```

## 7.4 TR Q115-Q120

```yaml
- id: Q115
  dimension: TR
  reverse: false
  text_zh: 我通常会认真遵守自己在关系中的承诺。
- id: Q116
  dimension: TR
  reverse: false
  text_zh: 对可能明显影响伴侣的事情，我倾向主动提供必要信息。
- id: Q117
  dimension: TR
  reverse: false
  text_zh: 我对亲密关系的要求通常前后一致。
- id: Q118
  dimension: TR
  reverse: false
  text_zh: 即使不同意，我通常仍会尊重已经明确表达的合理界限。
- id: Q119
  dimension: TR
  reverse: true
  text_zh: 为了迅速结束争执，我有时会答应自己其实没有准备做到的事情。
- id: Q120
  dimension: TR
  reverse: true
  text_zh: 如果履行承诺变得不方便，我容易改变原来的约定。
```

---

# 8. 价值观模块 Q121-Q144

价值观采用成对结构：

```text
Position Question
Importance Question
```

定义：

```ts
type ValueDomain =
  | "relationship_structure"
  | "parenting"
  | "mobility"
  | "couple_finance"
  | "spending_orientation"
  | "career_priority"
  | "family_involvement"
  | "spirituality"
  | "social_life"
  | "physical_intimacy"
  | "daily_integration"
  | "life_pace";
```

| Position Q | Importance Q | Domain | 1 | 7 |
|---|---|---|---|---|
|Q121|Q122|relationship_structure|严格一对一排他|双方同意的开放/多伴侣结构|
|Q123|Q124|parenting|明确不希望育儿|明确希望育儿|
|Q125|Q126|mobility|长期定居|经常迁居/跨地区生活|
|Q127|Q128|couple_finance|高度财务独立|高度财务共同化|
|Q129|Q130|spending_orientation|储蓄/安全优先|体验/当下消费优先|
|Q131|Q132|career_priority|工作服务生活|职业成就高度中心化|
|Q133|Q134|family_involvement|强原生家庭边界|高度参与彼此家庭|
|Q135|Q136|spirituality|完全私人/世俗|共同生活核心|
|Q137|Q138|social_life|高度私人安静|高度社交开放|
|Q139|Q140|physical_intimacy|几乎不需要|非常频繁|
|Q141|Q142|daily_integration|大量独立生活|高度共享日常|
|Q143|Q144|life_pace|可预测稳定|持续变化和新鲜感|

重要度统一：

```text
1 = 几乎不重要
7 = 不可妥协
```

---

# 9. 核心问卷评分

普通题：

```ts
function scoredAnswer(answer: number, reverse: boolean): number {
  assert(answer >= 1 && answer <= 7);
  return reverse ? 8 - answer : answer;
}
```

单一维度：

```text
Raw_d = mean(scored_answers_of_dimension)
```

转 0–100：

```text
P_d = ((Raw_d - 1) / 6) * 100
```

实现：

```ts
function scaleLikertMeanTo100(mean: number): number {
  return ((mean - 1) / 6) * 100;
}
```

必须 clamp：

```text
0 <= score <= 100
```

---

# 10. 常模支持

MVP 可先使用绝对分。

Beta 引入 norm：

```text
Z_d = (P_d - mean_norm_d) / sd_norm_d
T_d = 50 + 10 * Z_d
```

常模表：

```ts
type NormRecord = {
  dimension: CoreDimension;
  locale: string;
  age_band?: string;
  sample_size: number;
  mean: number;
  sd: number;
  version: string;
};
```

百分位不得通过固定线性换算伪造。

只有存在有效 norm 数据时才返回：

```json
{
  "percentile": 82.4,
  "norm_version": "CN-2027-01"
}
```

否则：

```json
{
  "percentile": null,
  "norm_version": null
}
```

---

# 11. 答题质量 Q

总体质量：

```text
Q = 0.30 * Q_reverse
  + 0.25 * Q_variance
  + 0.25 * Q_speed
  + 0.20 * Q_consistency
```

范围：

```text
0..1
```

## 11.1 Q_reverse

检查设计上的正反题对。

建议预置 pair：