from dataclasses import dataclass
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain.agents import create_agent
from langchain.agents.middleware import wrap_model_call
from langchain.messages import SystemMessage, HumanMessage, AIMessage

load_dotenv()

basic_model = ChatGroq(model="llama-3.1-8b-instant")
complex_model = ChatGroq(model="llama-3.3-70b-versatile")

@wrap_model_call
def dynamic_model_selection(request, handler):
  message_count = len(request.state["messages"])

  model = complex_model if message_count > 3 else basic_model

  request = request.override(model=model)
  
  return handler(request)

agent = create_agent(
  model=basic_model,
  middleware=[dynamic_model_selection]
)

response = agent.invoke({
  "messages": [
    SystemMessage(content="You are a helpful assistant."),
    HumanMessage(content="What is 1 + 1?"),
    HumanMessage(content="What is 1 + 1?"),
    HumanMessage(content="What is 1 + 1?"),
    HumanMessage(content="What is 1 + 1?"),
    HumanMessage(content="What is 1 + 1?")
  ]
})

print(response["messages"][-1].content)
print(response["messages"][-1].response_metadata["model_name"])

# @dataclass
# class Context:
#   user_role: str

# @dynamic_prompt
# def user_role_prompt(request: ModelRequest) -> str:
#   user_role = request.runtime.context.user_role

#   base_prompt = "You are a helpful and very concise assistant."

#   match user_role:
#     case "expert":
#       return f"{base_prompt} Provide detailed technical responses."
#     case "beginner":
#       return f"{base_prompt} Keep your explanations simple and basic."
#     case "child":
#       return f"{base_prompt} Explain everything as if you were literally talking to a five year old."
#     case _:
#       return base_prompt

# model = ChatGroq(
#   model="llama-3.1-8b-instant"
# )

# agent = create_agent(
#   model = basic_model,
#   middleware=[user_role_prompt],
#   context_schema=Context
# )

# response = agent.invoke({
#   "messages": [
#     {
#       "role": "user",
#       "content": "Explain PCA."
#     }
#   ]
# }, context = Context(user_role="expert"))

# print(response)
