import React from "react";
import "./SecondaryButton.css";
import "../../App.css";

interface SecondaryButtonProps {
    text: string,
    href?: string
    onClick?: () => void
    type?: "submit"
    icon?: React.ReactNode
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({text, href, onClick, type, icon}) => {

    return (
        <>
            {href &&
                <a href={href} className="SecondaryButton__secondary-button">
                    <span className="SecondaryButton__text">{text}</span>
                    <span className="SecondaryButton__icon">
                            {icon && icon}
                    </span>
                </a>
            }

            {onClick &&
                <button className="SecondaryButton__secondary-button" onClick={onClick}>
                    <span className="SecondaryButton__text">{text}</span>
                    <span className="SecondaryButton__icon">
                            {icon && icon}
                    </span>
                </button>
            }

            {type &&
                <button className="SecondaryButton__secondary-button" type={type}>
                    <span className="SecondaryButton__text">{text}</span>
                    <span className="SecondaryButton__icon">
                            {icon && icon}
                    </span>
                </button>
            }
        </>
    )
}

export default SecondaryButton