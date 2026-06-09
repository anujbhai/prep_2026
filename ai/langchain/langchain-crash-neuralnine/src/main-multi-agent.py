from dotenv import load_dotenv

from langchain.chat_models import init_chat_model
from langchain_core.messages import HumanMessage

load_dotenv()

model = init_chat_model("meta-llama/llama-4-scout-17b-16e-instruct", model_provider="groq")

# message = {
#     "role": "user",
#     "content": [
#         {"type": "text", "text": "Describe the contents of this image."},
#         {"type": "image", "url": "https://store.bistudio.com/cdn/shop/files/dayz-frostline_sakhal_map__v1.0__front_cover_-_1080x1080_11_2024.jpg"}
#     ]
# }
message = HumanMessage(
    content=[
        {
            "type": "text",
            "text": "Describe the contents of this image."
        },
        {
            "type": "image_url",
            "image_url": {
                "url": "https://i.pinimg.com/736x/a8/68/0e/a8680efedb0a95d4c43af680844a5468.jpg"
            }
        }
    ]
)

response = model.invoke([message])

print(response.content)
