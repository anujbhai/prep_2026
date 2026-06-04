import requests

from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain.agents import create_agent
from langchain.tools import tool

load_dotenv()

@tool("get_weather")
def get_weather(city: str):
  """Get the current weather in a given location"""
  response = requests.get(
    f"https://wttr.in/{city}/?format=j1"
  )

  return response.json()

llm = ChatGroq(
  model="llama-3.3-70b-versatile",
  temperature=0.0
)

agent = create_agent(
  model=llm,
  tools=[get_weather],
  system_prompt="You are a weather assistant who always cracks jokes and is humorous while remaining helpful."
)

response = agent.invoke({
  "messages": [
    {"role": "user", "content": "what is the weather like in Tezpur?"}
  ]
})

print(response["messages"][-1].content)
