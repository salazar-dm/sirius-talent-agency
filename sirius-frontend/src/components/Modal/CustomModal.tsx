import React from "react";
import "./CustomModal.css";
import {CloseButton} from "../Button/CloseButton.tsx";
import {BackButton} from "../Button/BackButton.tsx";

interface CustomModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

export const CustomModal: React.FC<CustomModalProps> = ({children, isOpen, onClose}) => {
    const onModalClose = () => {
        const delay = setTimeout(() => {
        }, 300)

        onClose()
        document.body.classList.remove('no-scroll');

        return clearTimeout(delay)
    }

    return (
        <div className={`CustomModal__container ${isOpen && "CustomModal__container--open"}`}>
            <div className="CustomModal__scrollable">
                <div className="CustomModal__button-container">
                    <BackButton onClick={onModalClose}/>
                </div>
                {children}
            </div>
        </div>
    )
}