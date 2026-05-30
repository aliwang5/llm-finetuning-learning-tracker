# 大模型微调学习打卡系统

这是一个面向大模型微调初学者和研究者的两周学习项目。项目包含一个可直接运行的前端打卡系统、每日学习任务、资料入口、数据集模板、训练配置示例，以及 OpenAI-compatible 聊天接口接入说明。

## 适合谁

- 想系统学习 LLM 微调，但不知道从哪里开始的人。
- 想理解 SFT、LoRA、QLoRA、DPO、RAG 边界的研究者。
- 想用自己的模型或 API 对学习过程做实时反馈的人。
- 想把学习过程沉淀成可复现实验项目的人。

## 快速开始

不需要安装依赖，直接打开：

```text
index.html
```

推荐用浏览器打开后完成：

1. 在左侧填写 API Base URL、API Key、Model。
2. 每天按任务列表勾选完成项。
3. 点击每个任务下方的资料链接，直接跳转到对应学习材料。
4. 在右侧选择推荐训练领域，查看可用数据集和处理规则。
5. 在学习日志中记录当天实验和问题。
6. 点击“生成学习反馈”，让模型给出表现评价和下一步建议。
7. 点击“导出进度”保存学习记录。

## API 接入说明

本系统调用 OpenAI-compatible Chat Completions 接口：

```text
POST {API_BASE_URL}/v1/chat/completions
```

请求体格式：

```json
{
  "model": "your-model-name",
  "messages": [
    {"role": "system", "content": "你是一位学习教练。"},
    {"role": "user", "content": "请根据我的学习进度给出建议。"}
  ],
  "temperature": 0.4
}
```

如果使用 OpenAI 官方接口，API Base URL 通常为：

```text
https://api.openai.com
```

如果使用本地或第三方 OpenAI-compatible 服务，例如 vLLM、Ollama 兼容网关、LiteLLM、OpenRouter 或自建推理服务，请填写对应服务的 base URL 和模型名。

浏览器直连 API 时可能遇到 CORS 限制。生产环境建议通过自己的后端代理 API Key。

## 项目结构

```text
.
├── index.html
├── styles.css
├── app.js
├── docs/
│   ├── daily-plan.md
│   ├── resources.md
│   └── openai-compatible-api.md
├── data/
│   ├── dataset-template.jsonl
│   └── evaluation-template.csv
├── configs/
│   ├── sft-lora-config.example.yaml
│   └── model-sources.md
└── reports/
    └── experiment-report-template.md
```

## 两周学习目标

完成后你应能做到：

1. 解释 SFT、LoRA、QLoRA、DPO、RAG 的关系。
2. 为一个明确任务设计可训练数据集。
3. 选择合适的开源模型与微调方法。
4. 配置并解释训练参数。
5. 建立 base model 与 fine-tuned model 的评测表。
6. 产出一份可复现的微调实验报告。

## 前端任务资料

每个每日任务都内置了 1-3 个具体学习地址。用户不需要先去资料库里搜索，而是可以在任务卡片里直接点击对应资料，例如论文、官方文档、数据集页面、模型主页、评测工具或部署文档。

## 推荐训练领域

前端内置了多个可选训练领域：

- 课程助教
- 客服问答
- 论文阅读助手
- 代码解释助手
- 医学问答
- 法律问答
- 金融分析

每个领域都给出实际可用的数据集链接、推荐任务、数据处理规则和建议数据格式。完整说明见 `docs/training-domains.md`。

## 核心资料

- Hugging Face Learn: https://huggingface.co/learn
- Transformers: https://huggingface.co/docs/transformers
- Datasets: https://huggingface.co/docs/datasets
- PEFT: https://huggingface.co/docs/peft
- TRL SFTTrainer: https://huggingface.co/docs/trl/sft_trainer
- OpenAI API Reference: https://platform.openai.com/docs/api-reference
- LoRA paper: https://arxiv.org/abs/2106.09685
- QLoRA paper: https://arxiv.org/abs/2305.14314

## 链接检查

项目提供了外链检查脚本：

```powershell
PowerShell -ExecutionPolicy Bypass -File .\scripts\check-links.ps1
```

最近一次检查结果与替换记录见 `docs/link-audit.md`。

## 推荐学习方式

每天保持三个产物：

1. 一个勾选完成的任务清单。
2. 一段学习日志。
3. 一个可保存的文件，例如数据样本、配置、评测表或实验报告。

不要只看资料。微调能力来自“数据设计 -> 训练 -> 评估 -> 失败分析 -> 数据迭代”的闭环。
