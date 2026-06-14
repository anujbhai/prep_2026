from dotenv import load_dotenv

load_dotenv()

# from langchain.chat_models import init_chat_model
from langchain_groq import ChatGroq
from langchain.agents import create_agent
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.tools import create_retriever_tool

embeddings = HuggingFaceEmbeddings(model_name="BAAI/bge-small-en-v1.5")

texts = [
  "I love apples.",
  "I enjoy oranges.",
  "I think pears taste very good.",
  "I hate bananas.",
  "I dislike raspberries.",
  "I despise mangoes",
  "I love Linux.",
  "I hate Windows."
]

vector_store = FAISS.from_texts(texts, embedding=embeddings)

retriever = vector_store.as_retriever(search_kwargs={"k": 3})

print(vector_store.similarity_search("what fruits does the person like?", k=3))

retriever_tool=create_retriever_tool(retriever, name="kb_search", description="Search the small product/fruit knowledge base for information.")

# model = init_chat_model(
#   model="llama-3.1-8b-instant",
#   model_provider="groq",
# )

model = ChatGroq(
  model="llama-3.1-8b-instant",
)

agent = create_agent(
  model=model,
  tools=[retriever_tool],
  system_prompt=(
    "You are helpful assistant. For questions about Macs, apples, or laptops, "
    "for call the kb_search tool to retrieve context then answer succinctly. Maybe you have to use it multiple time before answering."
  )
)

result = agent.invoke({
  "messages": [
    {
      "role": "user",
      "content": "What three fruits does the person like and what three fruits does the person dislike?"
    }
  ]
})

print(result)
print(result["messages"][-1].content)
