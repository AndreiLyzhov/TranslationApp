
import { useEffect } from "react"
import { useState } from "react"


export default function Form(props) {

    // console.log("props:", props);
    
    const [input, setInput] = useState("");
    const [language, setLanguage] = useState("");

    console.log(language);
    
    useEffect(() => {
        if (language) {
            props.fetchOpenAi(input, language)
        }
        
    },[language])
    
    function collectData(formData){
        setInput(formData.get("text-input"))
        setLanguage(formData.get("language"))
    }

    function startOver() {
        setResponse("");
        setInput("");
        setLanguage("");
    }


    return (
        <section className="form-container">
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
        </section>
    )
}