# 上传到 GitHub

当前项目已经是一个本地 git 仓库。上传到 GitHub 有两种方式。

## 方式一：使用 GitHub CLI

安装并登录：

```powershell
winget install --id GitHub.cli
gh auth login
```

创建远程仓库并推送：

```powershell
gh repo create llm-finetuning-learning-tracker --public --source . --remote origin --push
```

如果想创建私有仓库，把 `--public` 改成 `--private`。

## 方式二：使用已有仓库

先在 GitHub 网站创建一个空仓库，然后复制仓库地址，例如：

```text
https://github.com/YOUR_NAME/llm-finetuning-learning-tracker.git
```

在项目目录运行：

```powershell
git remote add origin https://github.com/YOUR_NAME/llm-finetuning-learning-tracker.git
git branch -M main
git push -u origin main
```

## 当前本地提交

```text
Build LLM fine-tuning learning tracker
```

如果你安装 GitHub CLI 并完成登录，或提供一个空 GitHub 仓库 URL，可以继续让 Codex 帮你推送。
