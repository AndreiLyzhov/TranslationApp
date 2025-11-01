

import OpenAI from "openai"
import Form from "./Form.jsx"
import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"
import parrotImg from "./assets/parrot.png"


export default function App() {

    const [response, setResponse] = useState([]);
    const [pending, setPending] = useState(false)
    const [correctInput, setCorrectInput] = useState("")
    const formElement = useRef(null);

  
    const fetchOpenAi = async (input, language) => {
      
      const openai = new OpenAI({
        dangerouslyAllowBrowser: true,
        apiKey: "YOUR_API_KEY"
      })

      const messages = [
        {
          role: "system", 
          content: `You are experienced translator translating from ${language} to english. Translate the given text to English.`,
        },
        
        {
          role: "user",
          content: input,
        },
        
      ]

      setPending(true);

      try {
        const res = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: messages,
          temperature: 0.8,
          max_completion_tokens: 400,
        })

        console.log(res.choices[0].message.content + " - Translation")

        setResponse(prev => [...prev, {textContent: res.choices[0].message.content, className: "response"}])

      } catch(err) {
        console.log(err)
      } finally {
        setPending(false);
      }
    }






    const checkMistakes = async (input) => {
      
      const openai = new OpenAI({
        dangerouslyAllowBrowser: true,
        apiKey: "YOUR_API_KEY"
      })

      const messages = [
        {
          role: "system", 
          content: `Correct mistakes of the input if there are any. 
          Output the correct output(just output the input as it is in case it is correct) 
          and only and if there is a mistake in input add "###" to the end of your output`,
        },
        
        {
          role: "user",
          content: input,
        },
        
      ]

      setPending(true);

      try {
        const res = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: messages,
          temperature: 0.8,
          max_completion_tokens: 400,
        })

        setCorrectInput(res.choices[0].message.content)

        console.log(res.choices[0].message.content + " - Checking Mistakes")
        
      } catch(error) {
        console.log(error)
      } finally {
        setPending(false)
      }
    }

    

    const checkLanguage = async (input, language) => {
      const openai = new OpenAI({
        apiKey: "YOUR_API_KEY",
        dangerouslyAllowBrowser: true,
      })

      const messages = [
        {
          role: "system",
          content: `If the input is in ${language} language - respond with word "Yes". 
          Otherwise respond with empty output. 
          Stick to this binary algorithm`,
        },
        {
          role: "user",
          content: input,
        },
      ]

      setPending(true)

      try {
        const res = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages,
          temperature: 0.7,
          max_completion_tokens: 400,
        })

        console.log(res.choices[0].message.content + " - Checking Langugage")

        return res.choices[0].message.content;

      } catch(error) {
        console.log(error)
      } finally {
        setPending(false)
      }
    }




    const generateBackground = async (input) => {
      const openai = new OpenAI({
        apiKey: "YOUR_API_KEY",
        dangerouslyAllowBrowser: true,
      })

      setPending(true)

      try{
        const res = await openai.images.generate({
          model: "dall-e-2",
          prompt: `${input}`,
          response_format: "url",
        })

        console.log(JSON.stringify(res) + "  - Generating Background");

        formElement.current.style.backgroundImage = `url(${res.data[0].url})`;

      } catch(error) {
        console.log(error)
      } finally {
        setPending(false)
      }
    }




  return (
    <>
      <header>
        <img className="pigeon-img" src={parrotImg} alt="PollyGlot" />
        <div className="titles">
          <p className="green title">PollyGlot</p>
          <p className="title">Perfect Translation Every Time</p>
        </div>
      </header>
      <Form
        fetchOpenAi={fetchOpenAi}
        response={response}
        setResponse={setResponse}
        pending={pending}
        correctInput={correctInput}
        checkMistakes={checkMistakes}
        checkLanguage={checkLanguage}
        generateBackground={generateBackground}
        formElement={formElement}
        
      />
    </>
  )
}