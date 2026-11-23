import Groq from "groq-sdk"

const groq = new Groq()

process.stdin.addListener("data", async function(input) {
  const user_input = input.toString().trim()
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "You are a helpful chatbot"
      },
      {
        role: "user",
        content: user_input
      }
    ]
  })

  console.log(response.choices[0].message.content)
})
