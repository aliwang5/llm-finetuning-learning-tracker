# OpenAI-compatible API 接入说明

前端系统使用标准聊天接口风格：

```text
POST {API_BASE_URL}/v1/chat/completions
```

## 页面设置项

| 字段 | 说明 | 示例 |
|---|---|---|
| API Base URL | 接口根地址，不包含 `/v1/chat/completions` | `https://api.openai.com` |
| API Key | Bearer Token | `sk-...` |
| Model | 模型名称 | `gpt-4.1-mini`、`qwen-plus`、`local-model` |
| Temperature | 输出随机性 | `0.4` |

## 请求格式

```json
{
  "model": "your-model-name",
  "messages": [
    {
      "role": "system",
      "content": "你是一位大模型微调学习教练。"
    },
    {
      "role": "user",
      "content": "请根据我的学习进度给出建议。"
    }
  ],
  "temperature": 0.4
}
```

## 返回格式

系统会读取：

```text
choices[0].message.content
```

如果你的模型服务返回格式不同，需要在 `app.js` 的 `askCoach()` 函数中适配。

## 安全建议

浏览器直连 API 适合个人本地学习，不适合公开部署。公开部署时不要把 API Key 暴露在前端，建议增加一个后端代理：

```text
Browser -> Your Backend -> Model Provider
```

## 常见问题

### 调用失败：CORS

说明模型服务不允许浏览器跨域请求。解决方式：

1. 开启服务端 CORS。
2. 使用本地代理。
3. 改成后端转发。

### 401 Unauthorized

检查 API Key 是否正确，以及服务商是否要求额外 header。

### 404 Not Found

检查 API Base URL 是否只填到根地址。例如应填写：

```text
https://api.example.com
```

不要填写：

```text
https://api.example.com/v1/chat/completions
```

### 模型无响应或返回空内容

检查返回 JSON 是否符合 OpenAI-compatible 格式。如果服务使用 Responses API 或其他格式，需要修改解析逻辑。
