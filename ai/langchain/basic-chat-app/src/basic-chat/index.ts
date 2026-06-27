import Groq from "groq-sdk"
import llama3Tokenizer from "llama3-tokenizer-js"

interface ContextMessage {
  role: "system" | "user" | "assistant"
  content: string
  tokenCount: number
}

const groq = new Groq()

async function init() {
  const MAX_TOKENS = 700

  const context: ContextMessage[] = [{
    role: "system",
    content: "You are a helpful chatbot",
    tokenCount: llama3Tokenizer.encode("You are a helpful chatbot").length
  }]

  let total_tokens = context[0].tokenCount

  async function createChatCompletion() {
    const messages = context.map(({ role, content }) => ({
      role,
      content
    }))

    const response = await groq.chat.completions.create({
      model: process.env.MODEL ?? "llama-3.3-70b-versatile",
      messages
    })

    const responseMessage = response.choices[0].message
    const assistantContent = typeof responseMessage.content === "string"
      ? responseMessage.content
      : ""
    const assistantTokens = llama3Tokenizer.encode(assistantContent).length

    context.push({
      role: "assistant",
      content: assistantContent,
      tokenCount: assistantTokens
    })

    total_tokens += assistantTokens

    if (total_tokens > MAX_TOKENS) {
      deleteOlderMessages()
    }

    console.log(`${responseMessage.role}: ${responseMessage.content}`)
  }

  process.stdin.on("data", async (input) => {
    const user_input = input.toString().trim()
    const user_tokens = llama3Tokenizer.encode(user_input).length
    
    context.push({
      role: "user",
      content: user_input,
      tokenCount: user_tokens
    })

    total_tokens += user_tokens

    await createChatCompletion()
  })

  function deleteOlderMessages() {

    while (total_tokens > MAX_TOKENS) {
      for (let i = 0; i < context.length; i++) {
        const message = context[i]

        if (message.role !== "system") {
          debugger
          const removedMessage = context.splice(i, 1)[0]
          total_tokens -= removedMessage.tokenCount
          
          console.log("New context length: " + total_tokens)
          break
        }
      }
    }
  }
}

init().catch((err) => {
  console.error("Error initializing the chatbot:", err)
})