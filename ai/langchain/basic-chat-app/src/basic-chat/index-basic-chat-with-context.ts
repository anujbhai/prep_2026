import Groq from "groq-sdk"
import llama3Tokenizer from "llama3-tokenizer-js"

const groq = new Groq()

async function init() {
  // const tokenizer = llama3Tokenizer.("llama-3.3-70b-versatile")
  const MAX_TOKENS = 700

  const context: Groq.Chat.Completions.ChatCompletionMessageParam[] = [{
    role: "system",
    content: "You are a helpful chatbot"
  }]

  async function createChatCompletion() {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: context
    })

    const responseMessage = response.choices[0].message

    context.push(responseMessage)

    if (response.usage && response.usage.total_tokens > MAX_TOKENS) {
      deleteOlderMessages()
    }

    console.log(`${response.choices[0].message.role}: ${response.choices[0].message.content}`)
  }

  process.stdin.addListener("data", async function(input) {
    const user_input = input.toString().trim()
    context.push({
      role: "user",
      content: user_input
    })

    await createChatCompletion()
  })

  function deleteOlderMessages() {
    let contextLength = getContextLength()

    while (contextLength > MAX_TOKENS) {
      for (let i = 0; i < context.length; i++) {
        const message = context[i]

        if (message.role != "system") {
          context.splice(i, 1)
          contextLength = getContextLength()
          
          console.log("New context length: " + contextLength)
          break
        }
      }
    }
  }

  function getContextLength() {
    let tokenLength = 0

    context.forEach((message) => {
      if (typeof message.content === "string") {
        tokenLength += llama3Tokenizer.encode(message.content).length
      } else if (Array.isArray(message.content)) {
        message.content.forEach((contentItem) => {
          if (contentItem.type === "text") {
            tokenLength += llama3Tokenizer.encode(contentItem.text).length
          }
        })
      }
    })

    return tokenLength
  }
}
init().catch((err) => {
  console.error("Error initializing the chatbot:", err)
})
