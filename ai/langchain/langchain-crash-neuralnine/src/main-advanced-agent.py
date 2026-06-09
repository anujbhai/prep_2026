import requests

from dataclasses import dataclass

from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain.agents import create_agent
from langchain.tools import tool, ToolRuntime
from langchain.chat_models import init_chat_model
from langgraph.checkpoint.memory import InMemorySaver

load_dotenv()

@dataclass
class Context:
  user_id: str

@dataclass
class ResponseFormat:
  weather_report: str
  temperature_celsius: float
  temperature_farenheit: float
  humidity: float

@tool("get_weather", description="Return weather information for a given city", return_direct=False)
def get_weather(city: str):
  print(f"TOOL CALLED: get_weather({city})")

  response = requests.get(f"https://wttr.in/{city}/?format=j1", timeout=10)
  # return response.json()

  try:
    data = response.json()
  except Exception:
    return {
      "error": f"Could not retrieve weather for '${city}'"
    }

  if "current_condition" not in data:
    return {
      "error": f"No weather data found for '${city}'"
    }

  current = response.json()["current_condition"][0]

  return {
    "weather": current["weatherDesc"][0]["value"],
    "temp_c": current["temp_C"],
    "temp_f": current["temp_F"],
    "humidity": current["humidity"]
  }

@tool("locate_user", description="Look up a user's city based on the context")
def locate_user(runtime: ToolRuntime[Context]):
  print(f"TOOL CALLED: locate_user({runtime.context.user_id})")

  match runtime.context.user_id:
    case "ABC123":
      return "Ho Chi Minh City"
    case "XYZ123":
      return "Vientiane"
    case "SSS123":
      return "Colombo"
    case _:
      return "Unknown"

llm_1 = ChatGroq(
  # model="llama-3.3-70b-versatile",
  model="gpt-4.1-mini",
  temperature=0.0
)

model = init_chat_model(
  "llama-3.1-8b-instant",
  model_provider="groq",
  temperature=0.3
)

checkpointer = InMemorySaver()

agent = create_agent(
  model=model,
  tools=[get_weather, locate_user],
  system_prompt="""
    You are a weather assistant.

    You MUST:
    1. Determine the user's location using locate_user.
    2. Retrieve weather information using get_weather.
    3. Never invent weather data.
    4. If weather data cannot be retrieved, say so.
  """,
  context_schema=Context,
  response_format=ResponseFormat,
  checkpointer=checkpointer
)

config = {"configurable": {"thread_id": "1"}}

response = agent.invoke({
  "messages": [
    {
      "role": "user",
      "content": """
        Determine my location using the available tools.
        Then use the weather tool to retrieve the current weather.
      """
    }
  ]},
  config=config,
  context=Context(user_id="SSS123")
)

# print(response["messages"][-1].content)
print(response["structured_response"])
print(response["structured_response"].weather_report)
print(response["structured_response"].temperature_celsius)
