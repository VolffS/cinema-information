import "./dropdown.scss"
import {useState} from "react";
import arrowSvg from "../../assets/arrow.svg"

export const Dropdown = ({Children, text}: {text:string, Children: () => JSX.Element[] }) => {
    const [isOpen, setIsOpen] = useState(false)

    const btnHandler = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <div className="dropdown">
                <button onClick={btnHandler} className="btn btn-genres">
                    {text}
                    <img className={`btn-img ${isOpen && "content-open"}`} src={arrowSvg} alt=""/>

                </button>
                <ul className={`dropdown-menu ${isOpen && "content-open"}`}>
                    <Children/>
                </ul>

            </div>
        </div>
    )
}

