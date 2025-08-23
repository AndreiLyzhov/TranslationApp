

import OpenAI from "openai"
import Form from "./Form.jsx"
import { useEffect } from "react"
import { useState } from "react"


export default function App() {

    const [response, setResponse] = useState("");

  
    const fetchOpenAi = async (input, language) => {
      
      const openai = new OpenAI({
        dangerouslyAllowBrowser: true,
        apiKey: "YOUR_API_KEY"
      })

      const messages = [
        {
          role: "system", 
          content: `You are experienced translator translating from ${language} to russian. Translate the given text.`,
        },
        
        {
          role: "user",
          content: input,
        },
        
      ]

      try {
        const res = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: messages,
          temperature: 1.4,
          max_completion_tokens: 400,
        })

        console.log(res.choices[0].message.content)

        setResponse(res.choices[0].message.content)

      } catch(err) {
        console.log(err)
      }
    }

    



  return (
    <>
      <header>
        <img className="pigeon-img" src="./src/assets/parrot.png"></img>
        <div className="titles">
          <p className="green title">PollyGlot</p>
          <p className="title">Perfect Translation Every Time</p>
        </div>
      </header>
      <Form
        fetchOpenAi={fetchOpenAi}
        response={response}
        setResponse={setResponse}
        
      />
    </>
  )
}