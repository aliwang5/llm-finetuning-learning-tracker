const STORAGE_KEY = "llm-finetuning-tracker-v1";

const resources = [
  {
    title: "Hugging Face Course",
    url: "https://huggingface.co/learn",
    note: "从 tokenizer、datasets、transformers 到训练流程的通用入门。"
  },
  {
    title: "Transformers 文档",
    url: "https://huggingface.co/docs/transformers",
    note: "模型加载、推理、chat template、Trainer 等基础能力。"
  },
  {
    title: "PEFT LoRA 文档",
    url: "https://huggingface.co/docs/peft",
    note: "LoRA、QLoRA、adapter 保存与加载的主要参考。"
  },
  {
    title: "TRL SFTTrainer 文档",
    url: "https://huggingface.co/docs/trl/sft_trainer",
    note: "监督微调、对话数据、completion-only loss 等实操入口。"
  },
  {
    title: "OpenAI API Reference",
    url: "https://platform.openai.com/docs/api-reference",
    note: "接入 OpenAI 或 OpenAI-compatible API 时参考请求格式。"
  },
  {
    title: "LoRA Paper",
    url: "https://arxiv.org/abs/2106.09685",
    note: "理解低秩适配为什么能降低训练成本。"
  },
  {
    title: "QLoRA Paper",
    url: "https://arxiv.org/abs/2305.14314",
    note: "理解 4-bit 量化训练、NF4、paged optimizer 等概念。"
  }
];

const plan = [
  {
    day: 1,
    phase: "foundation",
    title: "建立微调地图",
    priority: "P0",
    outcome: "能解释预训练、SFT、LoRA、QLoRA、DPO 的区别。",
    tasks: [
      ["阅读 Hugging Face Course 的 LLM 基础章节", "写下大模型训练的三个阶段：预训练、监督微调、对齐。"],
      ["阅读 LoRA 和 QLoRA 摘要", "用自己的话写出二者为什么能降低训练成本。"],
      ["建立术语表", "记录 tokenizer、context length、epoch、batch size、learning rate、adapter。"]
    ]
  },
  {
    day: 2,
    phase: "foundation",
    title: "掌握工具链",
    priority: "P0",
    outcome: "知道 Transformers、Datasets、PEFT、TRL、bitsandbytes 分别解决什么问题。",
    tasks: [
      ["浏览 Transformers 和 Datasets 文档", "理解模型、分词器、数据集加载的基本代码结构。"],
      ["浏览 PEFT 文档", "记录 LoRAConfig 中 r、alpha、dropout、target_modules 的含义。"],
      ["浏览 TRL SFTTrainer 文档", "记录 SFTTrainer 需要的模型、tokenizer、dataset 和训练参数。"]
    ]
  },
  {
    day: 3,
    phase: "data",
    title: "定义学习项目与数据任务",
    priority: "P0",
    outcome: "确定一个微调目标，并写出数据 schema。",
    tasks: [
      ["选择项目主题", "建议从课程助教、客服问答、论文摘要、代码解释、领域术语问答中选一个。"],
      ["定义输入输出边界", "写清楚模型应该学会什么、不要学什么。"],
      ["选择数据格式", "优先使用 messages 格式；记录 system、user、assistant 的职责。"]
    ]
  },
  {
    day: 4,
    phase: "data",
    title: "构建第一批样本",
    priority: "P0",
    outcome: "完成 30 条高质量样本。",
    tasks: [
      ["写 10 条基础问答样本", "覆盖定义、对比、流程说明。"],
      ["写 10 条复杂场景样本", "覆盖约束、异常、反例或边界情况。"],
      ["写 10 条格式控制样本", "让输出稳定包含表格、步骤、检查清单或固定字段。"]
    ]
  },
  {
    day: 5,
    phase: "data",
    title: "清洗与扩展数据集",
    priority: "P0",
    outcome: "形成可训练的 dataset_v1.jsonl。",
    tasks: [
      ["检查重复和矛盾样本", "删除表达重复、答案冲突、空泛套话的样本。"],
      ["扩展到 100 条左右", "每类能力至少 10 条样本。"],
      ["划分 train/eval/test", "按 80/10/10 或 85/10/5 记录划分规则。"]
    ]
  },
  {
    day: 6,
    phase: "training",
    title: "跑通最小训练闭环",
    priority: "P0",
    outcome: "完成一次小数据 SFT 或 LoRA 训练。",
    tasks: [
      ["选择一个小模型", "优先选择 0.5B 到 3B 级别模型先跑通流程。"],
      ["配置训练参数", "设置 batch size、gradient accumulation、learning rate、epoch、max sequence length。"],
      ["保存训练日志", "记录显存、速度、loss、checkpoint 路径和训练命令。"]
    ]
  },
  {
    day: 7,
    phase: "training",
    title: "理解参数影响",
    priority: "P0",
    outcome: "能解释主要训练参数如何影响成本与效果。",
    tasks: [
      ["制作参数表", "写下 learning rate、epoch、rank、alpha、dropout、seq length 的作用。"],
      ["调整一组参数重训", "只改变一个变量，例如 learning rate 或 LoRA rank。"],
      ["比较两次输出", "用相同测试问题比较回答质量和格式稳定性。"]
    ]
  },
  {
    day: 8,
    phase: "evaluation",
    title: "建立评测集",
    priority: "P0",
    outcome: "拥有一组固定评测问题。",
    tasks: [
      ["编写 30 条测试问题", "覆盖基础、复杂、边界、拒答、格式要求。"],
      ["设计评分维度", "至少包含准确性、完整性、可操作性、格式稳定性、幻觉风险。"],
      ["建立 base vs fine-tuned 对比表", "保留原模型与微调模型的原始输出。"]
    ]
  },
  {
    day: 9,
    phase: "evaluation",
    title: "分析失败案例",
    priority: "P1",
    outcome: "知道模型哪里没学会，以及该补什么数据。",
    tasks: [
      ["挑选 10 个失败输出", "标记失败类型：答非所问、遗漏约束、幻觉、格式错误、过度自信。"],
      ["反推数据缺口", "为每个失败类型写 2 条补充样本。"],
      ["更新 dataset_v2", "把补充样本加入数据集，并记录版本变化。"]
    ]
  },
  {
    day: 10,
    phase: "training",
    title: "第二轮训练",
    priority: "P1",
    outcome: "完成基于数据迭代的第二轮训练。",
    tasks: [
      ["使用 dataset_v2 重训", "保持大部分参数不变，避免同时改变太多因素。"],
      ["比较 v1 与 v2", "观察失败类型是否减少。"],
      ["保存 adapter 与配置", "确保别人可以复现模型版本。"]
    ]
  },
  {
    day: 11,
    phase: "project",
    title: "整理可复现实验",
    priority: "P1",
    outcome: "形成可交付项目结构。",
    tasks: [
      ["整理 README", "说明目标、环境、数据、训练、评估、结论。"],
      ["整理 configs", "保存训练配置、模型地址、数据路径、参数解释。"],
      ["整理 reports", "保存实验结果、评测表和失败案例。"]
    ]
  },
  {
    day: 12,
    phase: "foundation",
    title: "学习偏好优化与 RAG 边界",
    priority: "P2",
    outcome: "知道 SFT、DPO、RAG 分别适合什么场景。",
    tasks: [
      ["学习 DPO 的基本思想", "理解 chosen/rejected 偏好数据。"],
      ["比较 RAG 与微调", "写下哪些问题适合检索，哪些问题适合微调。"],
      ["补充技术路线图", "把预训练、SFT、PEFT、DPO、RAG 放到同一张图里。"]
    ]
  },
  {
    day: 13,
    phase: "project",
    title: "写最终学习报告",
    priority: "P0",
    outcome: "完成一份可以分享的学习报告。",
    tasks: [
      ["总结数据规则", "写清楚样本来源、筛选标准、格式规范和质量风险。"],
      ["总结训练参数", "列出最终参数，并解释为什么这样选。"],
      ["总结评测结论", "说明模型改善了什么、仍然失败在哪里。"]
    ]
  },
  {
    day: 14,
    phase: "project",
    title: "复盘与下一阶段计划",
    priority: "P0",
    outcome: "完成项目收尾并制定下一步。",
    tasks: [
      ["复现完整流程", "从数据、训练、评估到报告跑一遍检查清单。"],
      ["导出打卡进度", "保存本系统中的学习记录。"],
      ["制定下一阶段", "选择深入方向：更大数据、偏好优化、多模态、推理加速或部署。"]
    ]
  }
];

const defaultState = {
  completed: {},
  reflections: {},
  settings: {
    apiBase: "https://api.openai.com",
    apiKey: "",
    modelName: "gpt-4.1-mini",
    temperature: 0.4
  }
};

let state = loadState();
let activePhase = "all";

function loadState() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function taskKey(day, index) {
  return `day-${day}-task-${index}`;
}

function getVisiblePlan() {
  return activePhase === "all" ? plan : plan.filter((day) => day.phase === activePhase);
}

function calculateProgress(days = plan) {
  const total = days.reduce((sum, day) => sum + day.tasks.length, 0);
  const done = days.reduce((sum, day) => {
    return sum + day.tasks.filter((_, index) => state.completed[taskKey(day.day, index)]).length;
  }, 0);
  return { total, done, percent: total ? Math.round((done / total) * 100) : 0 };
}

function renderPlan() {
  const dayList = document.querySelector("#dayList");
  dayList.innerHTML = "";

  getVisiblePlan().forEach((day) => {
    const dayDone = day.tasks.filter((_, index) => state.completed[taskKey(day.day, index)]).length;
    const article = document.createElement("article");
    article.className = "day-card";
    article.innerHTML = `
      <div class="day-head">
        <div>
          <h2>Day ${day.day}: ${day.title}</h2>
          <div class="meta">
            <span class="badge">${phaseName(day.phase)}</span>
            <span class="badge priority">${day.priority}</span>
            <span class="badge">${day.outcome}</span>
          </div>
        </div>
        <div class="day-progress">${dayDone}/${day.tasks.length} 完成</div>
      </div>
      <div class="task-list"></div>
    `;

    const taskList = article.querySelector(".task-list");
    day.tasks.forEach(([title, detail], index) => {
      const key = taskKey(day.day, index);
      const label = document.createElement("label");
      label.className = "task";
      label.innerHTML = `
        <input type="checkbox" ${state.completed[key] ? "checked" : ""} />
        <span>
          <strong>${title}</strong>
          <p>${detail}</p>
        </span>
      `;
      label.querySelector("input").addEventListener("change", (event) => {
        state.completed[key] = event.target.checked;
        saveState();
        renderPlan();
        renderProgress();
      });
      taskList.appendChild(label);
    });

    dayList.appendChild(article);
  });
}

function phaseName(phase) {
  return {
    foundation: "基础",
    data: "数据",
    training: "训练",
    evaluation: "评估",
    project: "项目"
  }[phase];
}

function renderProgress() {
  const progress = calculateProgress();
  const ring = document.querySelector(".progress-ring");
  document.querySelector("#progressText").textContent = `${progress.percent}%`;
  document.querySelector("#progressSummary").textContent = `已完成 ${progress.done}/${progress.total} 个任务。`;
  ring.style.background = `conic-gradient(var(--brand) ${progress.percent * 3.6}deg, #e8edf0 0deg)`;
}

function renderResources() {
  const resourceList = document.querySelector("#resourceList");
  resourceList.innerHTML = resources
    .map((resource) => `
      <div class="resource">
        <a href="${resource.url}" target="_blank" rel="noreferrer">${resource.title}</a>
        <p>${resource.note}</p>
      </div>
    `)
    .join("");
}

function renderSettings() {
  document.querySelector("#apiBase").value = state.settings.apiBase;
  document.querySelector("#apiKey").value = state.settings.apiKey;
  document.querySelector("#modelName").value = state.settings.modelName;
  document.querySelector("#temperature").value = state.settings.temperature;
  const today = nextUnfinishedDay();
  document.querySelector("#dailyAdvice").textContent = today
    ? `建议优先完成 Day ${today.day}: ${today.title}。`
    : "所有任务都已完成，可以导出进度并开始下一阶段项目。";
}

function nextUnfinishedDay() {
  return plan.find((day) => day.tasks.some((_, index) => !state.completed[taskKey(day.day, index)]));
}

function saveSettings() {
  state.settings = {
    apiBase: document.querySelector("#apiBase").value.trim().replace(/\/$/, ""),
    apiKey: document.querySelector("#apiKey").value.trim(),
    modelName: document.querySelector("#modelName").value.trim(),
    temperature: Number(document.querySelector("#temperature").value || 0.4)
  };
  saveState();
  renderSettings();
}

function saveReflection() {
  const today = nextUnfinishedDay()?.day || plan.length;
  state.reflections[`day-${today}`] = document.querySelector("#reflectionInput").value.trim();
  saveState();
}

async function askCoach() {
  saveSettings();
  const dialog = document.querySelector("#coachDialog");
  const output = document.querySelector("#coachOutput");
  dialog.showModal();
  output.textContent = "正在生成...";

  if (!state.settings.apiKey || !state.settings.apiBase || !state.settings.modelName) {
    output.textContent = "请先填写 API Base URL、API Key 和 Model。";
    return;
  }

  const progress = calculateProgress();
  const unfinished = plan
    .map((day) => {
      const remaining = day.tasks
        .filter((_, index) => !state.completed[taskKey(day.day, index)])
        .map(([title]) => title);
      return remaining.length ? `Day ${day.day} ${day.title}: ${remaining.join("；")}` : null;
    })
    .filter(Boolean)
    .slice(0, 5)
    .join("\n");

  const reflection = Object.values(state.reflections).filter(Boolean).slice(-3).join("\n\n");
  const messages = [
    {
      role: "system",
      content: "你是一位大模型微调学习教练。请根据用户的学习进度给出具体、简洁、可执行的反馈。"
    },
    {
      role: "user",
      content: `当前完成率：${progress.percent}% (${progress.done}/${progress.total})。\n未完成任务：\n${unfinished || "无"}\n最近学习日志：\n${reflection || "暂无"}\n请给出：1. 当前表现评价；2. 明天最重要的三步；3. 一个风险提醒。`
    }
  ];

  try {
    const response = await fetch(`${state.settings.apiBase}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.settings.apiKey}`
      },
      body: JSON.stringify({
        model: state.settings.modelName,
        messages,
        temperature: state.settings.temperature
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${response.status} ${response.statusText}\n${errorText}`);
    }

    const data = await response.json();
    output.textContent = data.choices?.[0]?.message?.content || "接口返回成功，但没有找到 choices[0].message.content。";
  } catch (error) {
    output.textContent = `调用失败：\n${error.message}\n\n请检查 API Base URL 是否支持 /v1/chat/completions，或浏览器是否被 CORS 策略拦截。`;
  }
}

function exportProgress() {
  const payload = {
    exportedAt: new Date().toISOString(),
    progress: calculateProgress(),
    completed: state.completed,
    reflections: state.reflections,
    plan
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "llm-finetuning-progress.json";
  a.click();
  URL.revokeObjectURL(url);
}

function resetProgress() {
  if (!confirm("确认清空所有打卡记录和本地设置吗？")) return;
  state = structuredClone(defaultState);
  saveState();
  renderAll();
}

function bindEvents() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      activePhase = tab.dataset.phase;
      renderPlan();
    });
  });
  document.querySelector("#saveSettingsBtn").addEventListener("click", saveSettings);
  document.querySelector("#saveReflectionBtn").addEventListener("click", saveReflection);
  document.querySelector("#askCoachBtn").addEventListener("click", askCoach);
  document.querySelector("#exportBtn").addEventListener("click", exportProgress);
  document.querySelector("#resetBtn").addEventListener("click", resetProgress);
}

function renderAll() {
  renderPlan();
  renderProgress();
  renderResources();
  renderSettings();
}

bindEvents();
renderAll();
