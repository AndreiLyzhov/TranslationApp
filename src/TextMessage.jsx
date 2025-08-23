
import clsx from "clsx"

export default function TextMessage(props) {
    

    const messageClass = clsx("text-message", props.className, {wrong: props.wrong})
    return (
        <div className={messageClass}>
            {props.textContent}
        </div>
    )
}