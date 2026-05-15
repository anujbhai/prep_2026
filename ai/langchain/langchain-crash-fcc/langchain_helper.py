from dotenv import load_dotenv
from pydantic import BaseModel, Field
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
# from langchain_core.output_parsers import StrOutputParser
from langchain_core.output_parsers.json import JsonOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain.agents import create_agent
from langchain.tools import tool
from langchain_community.tools import WikipediaQueryRun
from langchain_community.utilities import WikipediaAPIWrapper, wikipedia


load_dotenv()

# schema
class PetNames(BaseModel):
  animal_type: str = Field(
    description="Type of the pet animal"
  )

  pet_color: str = Field(
    description="Color of the pet"
  )

  names: list[str] = Field(
    description="List of cool pet names"
  )

# model
llm = ChatGroq(
  model="llama-3.1-8b-instant",
  temperature=0.7,
)

# parser
# parser = StrOutputParser()
parser = JsonOutputParser(
  pydantic_object=PetNames
)

# prompt
prompt_template_name = PromptTemplate(
  template="""
    I have a {animal_type} pet and I want a cool name for it. It is {pet_color} in color. Suggest me five cool names for my pet. Return the animal type and pet color too.
    {format_instructions}
  """,
  input_variables=["animal_type", "pet_color"],
  partial_variables={
    "format_instructions": parser.get_format_instructions()
  }
)

# LCEL chain
name_chain = prompt_template_name | llm | parser

# final composed chain
final_chain = RunnablePassthrough.assign(
  pet_name=name_chain
)

# Wikipedia tool
wikipedia_tool = WikipediaQueryRun(
  api_wrapper=WikipediaAPIWrapper()
)

# custom tool
@tool
def multiply_by_three(number: float) -> float:
  """
  Multiply a number by 3.
  """
  return number * 3

@tool
def generate_pet_name_tool(
  animal_type: str,
  pet_color: str
):
  """
  Generate cool names for a pet based on
  animal type and pet color.
  """
  response = name_chain.invoke({
    "animal_type": animal_type,
    "pet_color": pet_color
  })

  return f"""
  Animal Type: {response["animal_type"]}
  Pet Color: {response["pet_color"]}
  Suggested Name: {", ".join(response["names"])}
  """

# tools list
tools = [
  wikipedia_tool,
  multiply_by_three,
  generate_pet_name_tool
]

# agent
agent = create_agent(
  model=llm,
  tools=tools,
  system_prompt="""
  You are a helpful AI assistant.

  Rules:
  - Use generate_pet_name_tool for pet naming requests.
  - Use multiply_by_three only for mathematical calculations.
  - Use wikipedia_tool ONLY if the user explicitly asks
    for factual encyclopedic information.

  Do NOT use Wikipedia for pet naming tasks.
  Do NOT perform unnecessary searches.
  """
)

def run_agent(user_input: str):
  response = agent.invoke({
    "messages": [
      {
        "role": "user",
        "content": user_input
      }
    ]
  })

  messages = response["messages"]

  final_answer = ""
  wikipedia_content = ""
  pet_names_output = ""

  for message in messages:
    if message.__class__.__name__ == "ToolMessage":
      if message.name == "wikipedia":
        wikipedia_content = message.content
      elif message.name == "generate_pet_name_tool":
        pet_names_output = message.content

    elif message.__class__.__name__ == "AIMessage":
      if message.content:
        final_answer = message.content
  
  return {
    "final_answer": final_answer,
    "pet_names": pet_names_output,
    "wikipedia_content": wikipedia_content
  }
    

if __name__ == "__main__":
  # result = (generate_pet_name_tool("cow", "white"))
  result = run_agent(
    """
    I have a white cow.


    Suggest cool pet name for it
    """
  )
  print("\nFINAL ANSWER\n")
  print(result["final_answer"])
  print("\nPET NAME\n")
  print(result["pet_names"])
  print("\nWIKI_CONTENT\n")
  print(result["wikipedia_content"])


# response = llm.invoke("Explain LangChain to a JavaScript developer")

# print(response.content)
