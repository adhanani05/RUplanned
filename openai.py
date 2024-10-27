import openai

API_KEY = open("API_KEY", "r").read()
openai.api_key = API_KEY

respone = openai.ChatCompletion(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": "What is the difference between Celsius and Farenheight?"}
    ]
)

print(respone)