import time
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain.agents import create_agent
from langchain.agents.middleware import AgentMiddleware, AgentState
from langchain.messages import SystemMessage, HumanMessage

load_dotenv()

class HooksDemo(AgentMiddleware):
  def __init__(self):
    super().__init__()
    self.start_time = 0.0
  
  def before_agent(self, state: AgentState, runtime):
    self.start_time = time.time()
    print("before_agent triggered")

  def before_model(self, state: AgentState, runtime):
    print("before_model")
  
  def after_agent(self, state: AgentState, runtime):
    print("after_model")
  
  def after_agent(self, state: AgentState, runtime):
    print("after_agent:", time.time() - self.start_time)

# model = ChatGroq(model="llama-3.1-8b-instant")
model = ChatGroq(model="llama-3.3-70b-versatile")
agent = create_agent(
  model=model,
  middleware=[HooksDemo()]
)

response = agent.invoke({
  "messages": [
    SystemMessage("You are a helpful assistant."),
    HumanMessage("What is PCA?")
  ]
})

print(response["messages"][-1].content)
