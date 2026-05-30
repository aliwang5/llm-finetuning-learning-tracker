# 推荐训练领域、数据集与处理规则

本系统提供多个适合初学者和研究者练习微调的训练领域。每个领域都包含可下载数据集链接、推荐任务和数据处理规则。

## 课程助教

任务：课程材料问答、概念解释、作业提示、复习计划。

数据集：

- OpenAssistant/oasst1: https://huggingface.co/datasets/OpenAssistant/oasst1
- Databricks Dolly 15k: https://huggingface.co/datasets/databricks/databricks-dolly-15k
- FLAN collection: https://huggingface.co/datasets/Muennighoff/flan

处理规则：

- 把长文材料拆成单概念、单知识点、单任务样本。
- 答案中区分直接结论、推理过程和引用来源。
- 避免训练模型直接代写完整作业。
- 加入“材料未覆盖”样本，降低幻觉。

## 客服问答

任务：产品问答、售后、退款、故障排查、升级路径。

数据集：

- Bitext customer support dataset: https://huggingface.co/datasets/bitext/Bitext-customer-support-llm-chatbot-training-dataset
- Customer support tweets: https://huggingface.co/datasets/consumer-finance-complaints/customer-support-tweets
- Ubuntu Dialogue QA: https://huggingface.co/datasets/sedthh/ubuntu_dialogue_qa

处理规则：

- 清除姓名、邮箱、电话、订单号、地址等个人信息。
- 统一品牌语气和回复格式。
- 标注意图，例如退款、物流、账号、故障。
- 高风险场景加入转人工规则。

## 论文阅读助手

任务：摘要、贡献、方法、局限、复现建议、相关工作比较。

数据集：

- arXiv summarization: https://huggingface.co/datasets/ccdv/arxiv-summarization
- Scientific Papers: https://huggingface.co/datasets/scientific_papers
- S2ORC: https://huggingface.co/datasets/allenai/s2orc

处理规则：

- 按标题、摘要、方法、实验、结论字段切分。
- 摘要任务和批判性分析任务分开。
- 要求模型标注不确定性。
- 长论文优先结合 RAG，微调用于统一输出格式。

## 代码解释助手

任务：解释代码、定位报错、生成测试、重构建议。

数据集：

- CodeSearchNet: https://huggingface.co/datasets/code_search_net
- MBPP: https://huggingface.co/datasets/google-research-datasets/mbpp
- HumanEval: https://huggingface.co/datasets/openai/openai_humaneval

处理规则：

- 保留语言、文件名、函数签名、错误栈。
- 把解释、修复、测试生成分成不同任务类型。
- 检查代码许可证。
- 评测时使用可执行测试。

## 医学问答

任务：医学知识解释、患者教育、文献摘要。

数据集：

- MedQA: https://huggingface.co/datasets/bigbio/med_qa
- PubMedQA: https://huggingface.co/datasets/qiaojin/PubMedQA
- MedMCQA: https://huggingface.co/datasets/openlifescienceai/medmcqa

处理规则：

- 加入免责声明和就医建议边界。
- 删除患者个人身份信息。
- 把考试题、科普问答、临床建议分开。
- 高风险症状、用药、剂量问题建议咨询专业医生。

## 法律问答

任务：法律概念解释、法规检索辅助、合同条款风险提示。

数据集：

- LexGLUE: https://huggingface.co/datasets/coastalcph/lex_glue
- CUAD: https://huggingface.co/datasets/theatticusproject/cuad-qa
- Pile of Law: https://huggingface.co/datasets/pile-of-law/pile-of-law

处理规则：

- 明确司法辖区和时间范围。
- 加入非法律意见声明。
- 法规条文、案例摘要、合同审查分开。
- 保留引用来源字段。

## 金融分析

任务：财报摘要、指标解释、风险提示、研究报告结构化输出。

数据集：

- FinGPT: https://huggingface.co/FinGPT
- Financial PhraseBank: https://huggingface.co/datasets/financial_phrasebank
- FiQA: https://huggingface.co/datasets/pauri32/fiqa-2018

处理规则：

- 不训练模型给出确定性买卖建议。
- 保留时间、市场、币种、公司代码。
- 把情绪分类、财报摘要、风险提示、问答任务分开。
- 涉及投资建议时输出风险披露和不确定性说明。
