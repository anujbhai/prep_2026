import Groq from "groq-sdk"

const groq = new Groq()

async function main() {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "You respond like a cool bro."
      },
      {
        role: "user",
        content: "Which is the highest point of land within Tezpur, Assam, India?"
      }
    ]
  })

  console.log(response.choices[0].message.content)
}
main()
