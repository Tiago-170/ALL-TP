import { apiKey } from "./env.js";

async function aiAnswer(userMessage) { 
  const url = "https://api.mistral.ai/v1/chat/completions"; 

  try { 
    const response = await fetch(url, { 
      method: "POST", 
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${apiKey}` 
      }, 
      body: JSON.stringify({ 
        model: "ministral-14b-2512", 
        messages: [ 
          { 
            role: "user", 
            content: `${userMessage}` 
          } 
        ] 
      }) 
    }); 

    if (!response.ok) { 
      throw new Error(`Response status: ${response.status}`); 
    } 

    const result = await response.json(); 
    return result.choices[0].message.content; 
  } catch (error) { 
    console.error(error.message); 
  } 
}

const submitBtn = document.querySelector('#btn-submit')
const userMessageContainer = document.querySelector('#message-user')

const answerContainer = document.querySelector('#answer-container')

submitBtn.addEventListener('click', async () => {
  const answer = await aiAnswer(userMessageContainer.value);
  console.log(answer);
  answerContainer.innerHTML = answer;
});