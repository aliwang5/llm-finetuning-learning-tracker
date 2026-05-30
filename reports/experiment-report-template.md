# 微调实验报告模板

## 1. 实验目标

- 项目主题：
- 模型应该学会的行为：
- 模型不应该做的行为：

## 2. 模型与环境

- Base model：
- 模型下载地址：
- 训练框架：
- GPU/CPU/云资源：
- 关键依赖版本：

## 3. 数据集

- 数据来源：
- 样本数量：
- 数据格式：
- train/eval/test 划分：
- 数据清洗规则：

## 4. 训练参数

| 参数 | 值 | 选择理由 |
|---|---|---|
| learning rate |  |  |
| epochs |  |  |
| batch size |  |  |
| gradient accumulation |  |  |
| max sequence length |  |  |
| LoRA rank |  |  |
| LoRA alpha |  |  |
| LoRA dropout |  |  |

## 5. 训练结果

- 训练 loss 变化：
- eval loss 变化：
- 训练耗时：
- 显存或资源占用：
- checkpoint 或 adapter 路径：

## 6. 评测结果

| 问题类别 | Base model 得分 | Fine-tuned model 得分 | 是否改善 |
|---|---:|---:|---|
| 概念解释 |  |  |  |
| 复杂场景 |  |  |  |
| 格式控制 |  |  |  |
| 安全拒答 |  |  |  |

## 7. 失败案例

| 问题 | 模型输出 | 失败类型 | 改进动作 |
|---|---|---|---|
|  |  |  |  |

## 8. 结论

- 明显改善：
- 仍然不足：
- 下一轮数据迭代方向：
- 下一轮参数调整方向：
