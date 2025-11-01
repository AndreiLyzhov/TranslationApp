
import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"

import TextMessage from "./TextMessage";
import sendBtn from "./assets/send-btn.png";
import frFlag from "./assets/fr-flag.png";
import spFlag from "./assets/sp-flag.png";
import jpnFlag from "./assets/jpn-flag.png";


export default function Form(props) {

    
    const [language, setLanguage] = useState("");
    const wrong = useRef(false);


    useEffect(() => {
        const correctInput = props.correctInput;
        let correctInputSlice = ""

        if (correctInput) {
            if (correctInput[correctInput.length - 1] === "#") {
                correctInputSlice = correctInput.slice(0, -3);
                wrong.current = true;
            } else {
                correctInputSlice = correctInput;
            }

            props.checkLanguage(correctInputSlice, language)
                .then((correctLanguage) => {
                    console.log("Check Language: ",correctLanguage, "Language: ", language, "Input: ", correctInputSlice)
                    if (correctLanguage) {

                        props.setResponse(prev => [...prev, {textContent: correctInputSlice, className: "message", wrong: wrong.current}])

                        props.generateBackground(correctInputSlice)
                        
                        props.fetchOpenAi(correctInput, language)

                    } else {

                        props.setResponse(prev => [...prev, {textContent: "Please choose correct language", className: "response"}])
                    }
                })

            
        }

    }, [props.correctInput])


    function collectData(formData){
        if (!props.pending) {
            wrong.current = false;
            setLanguage(formData.get("language"))
            props.checkMistakes(formData.get("text-input"))
        }
    }


    const textMessages = props.response?.map((item, index) => {
        return (
            <TextMessage 
                key={index + 1}
                textContent={item.textContent}
                className={item.className} 
                wrong={item.wrong}
            />
        )
    })

   


    return (
        <>
        <section className="form-container">
            <form action={collectData} ref={props.formElement}>
                <TextMessage 
                    key={0}
                    textContent="Select the language you me to translate into, type your text and hit send!"
                    className="response"
                />
                

                {textMessages}

                <div className="chat-container">
                    <input className="text-input" type="text" name="text-input"></input>
                    <button type="submit" className="send-button">
                        <img src={sendBtn} alt="Send" />
                    </button>
                </div>

                <div className="options-container">

                    <input id="french" type="radio" name="language" value="French" defaultChecked/>
                    <label htmlFor="french"  className="label">
                        <img src={frFlag} alt="French" className="flag-img" />
                    </label>
                    



                    <input id="spanish" type="radio" name="language" value="Spanish" />
                    <label htmlFor="spanish"  className="label">
                        <img src={spFlag} alt="Spanish" className="flag-img" />
                    </label>
                    



                    <input id="japanese" type="radio" name="language" value="Japanese" />
                    <label htmlFor="japanese" className="label">
                        <img src={jpnFlag} alt="Japanese" className="flag-img" />
                    </label> 

                </div>
            </form>
        </section>

        {/*<section className="form-container">
            <form action={props.response ? "" : collectData}>

                <p className="label">{props.response ? "Original Text" : "Text to translate"} 👇</p>
                
                <textarea name="text-input" placeholder="How are you?" defaultValue={props.response ? input : ""}></textarea>
                
                <p className="label">{props.response ? "Your translation" : "Select language"} 👇</p>

                {props.response ? 

                    <textarea name="text-input" defaultValue={props.response} readOnly></textarea> :
                
                    <div className="options-container">
                        <p>
                        <input id="french" type="radio" name="language" value="French" defaultChecked/>
                        <label htmlFor="french"  className="label">French</label>
                        <img src="src/assets/fr-flag.png" className="flag-img"></img>
                        </p>

                        <p>
                        <input type="radio" name="language" value="Spanish" />
                        <label htmlFor="Spanish"  className="label">Spanish</label>
                        <img src="src/assets/sp-flag.png" className="flag-img"></img>
                        </p>

                        <p>
                        <input type="radio" name="language" value="Japanese" />
                        <label htmlFor="Japanese" className="label">Japanese</label>
                        <img src="src/assets/jpn-flag.png" className="flag-img"></img>
                        </p>
                    </div>
                }

                <button className="submit-btn" onClick={props.response ? startOver : null}>{props.response ? "Start Over" : "Translate"}</button>
            </form>
        </section>*/}
        </>
    )
}