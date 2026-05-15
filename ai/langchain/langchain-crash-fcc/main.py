import langchain_helper as lch
import streamlit as st

st.title("Pet name generator")

# sidebar
user_animal_type = st.sidebar.selectbox("What pet do you own?", ("Dog", "Cat", "Cow", "Iguana", "Bird"))

if user_animal_type == "Dog":
  pet_color = st.sidebar.text_area("What color is your dog?", max_chars=15)

if user_animal_type == "Cat":
  pet_color = st.sidebar.text_area("What color is your cat?", max_chars=15)

if user_animal_type == "Cow":
  pet_color = st.sidebar.text_area("What color is your cow?", max_chars=15)

if user_animal_type == "Iguana":
  pet_color = st.sidebar.text_area("What color is your dragon?", max_chars=15)

if user_animal_type == "Bird":
  pet_color = st.sidebar.text_area("What color is your bird?", max_chars=15)

if pet_color:
  response = lch.generate_pet_name(user_animal_type, pet_color)

  st.subheader("Here are some suggestions:")

  names = response["pet_name"]["names"]

  for index, name in enumerate(names, start=1):
    st.write(f"{index}. {name}")
