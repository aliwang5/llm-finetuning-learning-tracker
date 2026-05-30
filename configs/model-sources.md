# 推荐模型下载地址

本项目不强制绑定某个模型。学习者应根据硬件、云资源、语言需求和许可证选择模型。初学者建议先用小模型跑通完整流程，再尝试更大模型。

## 通用选择原则

1. 先选 instruct/chat 模型，降低数据格式和对话模板难度。
2. 先选小模型，优先跑通数据、训练、评估闭环。
3. 需要中文能力时优先选中文表现较好的模型家族。
4. 使用模型前检查许可证、使用限制和下载权限。
5. 记录模型版本和 commit，保证实验可复现。

## 模型主页

| 模型家族 | 地址 | 适合场景 |
|---|---|---|
| Qwen | https://huggingface.co/Qwen | 中文、英文、代码、通用指令 |
| Llama | https://huggingface.co/meta-llama | 英文通用、研究对比 |
| Gemma | https://huggingface.co/google | 通用指令、小模型实验 |
| Phi | https://huggingface.co/microsoft | 小模型、低成本实验 |
| Mistral | https://huggingface.co/mistralai | 英文通用、工程实践 |

## 数据集主页

| 数据集来源 | 地址 | 用途 |
|---|---|---|
| Hugging Face Datasets | https://huggingface.co/datasets | 搜索公开数据集 |
| OpenAssistant | https://huggingface.co/datasets/OpenAssistant/oasst1 | 指令和对话样本参考 |
| Databricks Dolly | https://huggingface.co/datasets/databricks/databricks-dolly-15k | 指令数据格式参考 |
| UltraChat | https://huggingface.co/datasets/HuggingFaceH4/ultrachat_200k | 多轮对话格式参考 |

## 下载示例

使用 Hugging Face Transformers：

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model_id = "Qwen/Qwen2.5-0.5B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id)
```

使用 datasets：

```python
from datasets import load_dataset

dataset = load_dataset("json", data_files="data/dataset-template.jsonl")
```
