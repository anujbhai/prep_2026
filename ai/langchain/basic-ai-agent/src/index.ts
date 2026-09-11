import Groq from "groq-sdk"

const  groq = new Groq()

async function main() {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: "What is the capital of France?"
      }
    ]
  })

  console.log(response.choices[0].message.content)
}
main()
