import openai
openai.api_key = "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"

def send_to_openai(prompt):
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}, ],

    )
    ext_response = response.choices[0].message['content']

    return ext_response