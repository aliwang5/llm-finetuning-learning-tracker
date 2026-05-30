# 14 天大模型微调学习计划

本计划面向零基础学习者，但不绑定具体显卡、云厂商或模型。每一天都包含目标、具体步骤、交付物和验收标准。

## Day 1: 建立微调地图

目标：理解大模型训练的基本阶段。

步骤：

1. 阅读 Hugging Face Learn 的 LLM 入门内容。
2. 阅读 LoRA 论文摘要和 QLoRA 论文摘要。
3. 写出预训练、SFT、LoRA、QLoRA、DPO、RAG 的一句话定义。
4. 建立术语表：tokenizer、context length、batch size、learning rate、epoch、adapter。

交付物：`reports/day-01-notes.md`

验收标准：能向别人解释“微调不是继续预训练，也不是简单让模型记资料”。

## Day 2: 掌握微调工具链

目标：知道常见库各自负责什么。

步骤：

1. 浏览 Transformers 文档，理解 model 与 tokenizer。
2. 浏览 Datasets 文档，理解 JSONL 数据加载。
3. 浏览 PEFT 文档，理解 LoRAConfig。
4. 浏览 TRL SFTTrainer 文档，理解监督微调入口。
5. 记录每个库的用途。

交付物：`reports/toolchain-map.md`

验收标准：能说出 Transformers、Datasets、PEFT、TRL、bitsandbytes 的分工。

## Day 3: 定义项目任务

目标：确定一个微调项目主题。

步骤：

1. 在以下方向中选一个：课程助教、客服问答、论文摘要、代码解释、领域术语问答。
2. 写清楚模型应该学会的输出行为。
3. 写清楚模型不应该做什么。
4. 选择数据格式，推荐使用 chat messages。

交付物：`reports/project-scope.md`

验收标准：项目边界明确，不再使用“让模型更懂某领域”这种模糊目标。

## Day 4: 构建第一批训练样本

目标：完成 30 条高质量样本。

步骤：

1. 写 10 条基础解释样本。
2. 写 10 条复杂场景样本。
3. 写 10 条格式控制样本。
4. 每条样本只训练一个明确能力。

交付物：`data/dataset-v0.jsonl`

验收标准：样本可以被程序逐行解析，每行是一个完整 JSON 对象。

## Day 5: 清洗与扩展数据集

目标：形成 `dataset-v1.jsonl`。

步骤：

1. 删除重复样本。
2. 删除答案空泛或互相矛盾的样本。
3. 扩展到 100 条左右。
4. 划分 train/eval/test。
5. 写数据集说明。

交付物：`data/dataset-v1.jsonl`、`reports/dataset-card.md`

验收标准：能解释每类样本为什么存在。

## Day 6: 跑通最小训练闭环

目标：完成一次 SFT 或 LoRA 训练。

步骤：

1. 从 `configs/model-sources.md` 中选择一个小模型。
2. 根据显存或云资源选择全参 SFT、LoRA 或 QLoRA。
3. 配置 batch size、learning rate、epoch、max sequence length。
4. 启动训练并保存日志。

交付物：训练日志、checkpoint 或 adapter 路径记录。

验收标准：训练过程可复现，即别人知道用哪个模型、哪个数据、哪个配置运行。

## Day 7: 理解参数影响

目标：知道主要参数如何影响效果和成本。

步骤：

1. 制作参数解释表。
2. 只改变一个参数重训。
3. 比较两次训练 loss 与输出。
4. 记录观察结论。

交付物：`reports/parameter-notes.md`

验收标准：能解释 learning rate、epoch、LoRA rank、sequence length 的影响。

## Day 8: 建立评测集

目标：不只看 loss，而是建立固定测试问题。

步骤：

1. 编写 30 条测试问题。
2. 设计评分维度。
3. 记录 base model 输出。
4. 记录 fine-tuned model 输出。

交付物：`data/evaluation-set.csv`

验收标准：评测集覆盖基础、复杂、边界、格式和拒答场景。

## Day 9: 分析失败案例

目标：把失败转化为数据迭代方向。

步骤：

1. 挑选 10 个失败输出。
2. 标记失败类型。
3. 为每类失败补 2 条样本。
4. 更新数据集版本。

交付物：`reports/failure-analysis.md`、`data/dataset-v2.jsonl`

验收标准：每个失败案例都有对应改进动作。

## Day 10: 第二轮训练

目标：验证数据迭代是否有效。

步骤：

1. 使用 `dataset-v2.jsonl` 训练。
2. 尽量保持其他参数不变。
3. 比较 v1 与 v2 在固定评测集上的表现。
4. 保存 adapter 和配置。

交付物：`reports/run-v2.md`

验收标准：能说明改善来自数据变化还是参数变化。

## Day 11: 整理可复现实验

目标：让项目可以被别人复现。

步骤：

1. 整理 README。
2. 整理数据说明。
3. 整理训练配置。
4. 整理评测表。

交付物：完整项目目录。

验收标准：别人不问你也能按文档复现。

## Day 12: 学习 DPO 与 RAG 边界

目标：知道微调不是唯一解法。

步骤：

1. 学习 DPO 的 chosen/rejected 数据格式。
2. 比较 RAG 与微调。
3. 写出哪些问题适合检索，哪些问题适合微调。

交付物：`reports/sft-dpo-rag-notes.md`

验收标准：不会把所有知识注入问题都交给微调解决。

## Day 13: 写最终学习报告

目标：形成可展示报告。

步骤：

1. 总结数据构建规则。
2. 总结训练参数。
3. 总结评测结论。
4. 总结失败案例。

交付物：`reports/final-report.md`

验收标准：报告能回答“你做了什么、为什么这样做、效果如何、问题在哪里”。

## Day 14: 复盘与下一阶段计划

目标：完成项目收尾。

步骤：

1. 从数据到评测完整检查一遍。
2. 导出前端打卡系统的进度。
3. 制定下一阶段路线。

交付物：`reports/next-stage-plan.md`

验收标准：明确下一阶段是数据规模、偏好优化、部署、评测、推理优化还是多模态。
