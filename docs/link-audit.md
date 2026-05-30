# 链接可达性与任务匹配检查

本项目中的学习链接需要同时满足两个条件：

1. 可以直接访问。
2. 与所在任务的学习目标匹配。

## 最近一次检查

检查日期：2026-05-31

检查结果：

- 学习资料、论文、数据集、文档、模型主页链接：全部可达。
- `https://api.openai.com` 是 API Base URL 示例，不是网页资料链接；部分网络环境下直接访问根地址会返回 421，这不影响作为接口根地址使用。
- 如果短时间内反复检查 Hugging Face 链接，可能出现 429 限流。脚本会把 429 记录为限流状态，而不是直接判定为坏链。

## 已替换的链接

以下链接因 401、404、重定向不稳定或不够适合作为直接学习入口，已替换：

| 原链接 | 替换为 |
|---|---|
| `https://huggingface.co/datasets/code_search_net` | `https://huggingface.co/datasets/code-search-net/code_search_net` |
| `https://huggingface.co/datasets/financial_phrasebank` | `https://huggingface.co/datasets/takala/financial_phrasebank` |
| `https://huggingface.co/datasets/scientific_papers` | `https://huggingface.co/datasets/armanc/scientific_papers` |
| `https://huggingface.co/datasets/allenai/s2orc` | `https://huggingface.co/datasets/AlgorithmicResearchGroup/s2orc-cs-enriched` |
| `https://huggingface.co/datasets/consumer-finance-complaints/customer-support-tweets` | `https://huggingface.co/datasets/MohammadOthman/mo-customer-support-tweets-945k` |
| `https://docs.axolotl.ai/docs/config.html` | `https://docs.axolotl.ai/docs/config-reference.html` |
| W&B 重定向链接 | Hugging Face Evaluate、Transformers Trainer 或 MLflow Tracking 文档 |

## 如何重新检查

在项目根目录运行：

```powershell
PowerShell -ExecutionPolicy Bypass -File .\scripts\check-links.ps1
```

脚本会跳过 API Base URL 示例和 GitHub 占位 URL，并检查其余外链是否返回 2xx/3xx 状态。

## 任务匹配原则

- 概念学习任务优先链接到官方文档、课程或论文。
- 数据构建任务优先链接到真实数据集页面、Datasets 文档和数据处理文档。
- 训练任务优先链接到 PEFT、TRL、Transformers Trainer 和量化文档。
- 评估任务优先链接到 Evaluate、OpenAI Evals 和 lm-evaluation-harness。
- 领域选择任务优先链接到可下载数据集，而不是博客或二手教程。
