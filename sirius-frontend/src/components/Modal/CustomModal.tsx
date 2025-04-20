import React, {useEffect, useState} from "react";
import "./CustomModal.css";
import "../../App.css";
import {BackButton} from "../Button/BackButton.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";

interface CustomModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

export const CustomModal: React.FC<CustomModalProps> = ({children, isOpen, onClose}) => {
    const [triggerAnimation, setTriggerAnimation] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
            requestAnimationFrame(() => {
                setTriggerAnimation(true);
            });
        }
    }, []);

    const onModalClose = () => {
        requestAnimationFrame(() => {
            setTriggerAnimation(false);
        });

        document.body.classList.remove('no-scroll');
        setTimeout(() => {
            onClose();
        }, 300);
    };

    return (
        <div className={`CustomModal__container ${triggerAnimation && "CustomModal__container--open"}`}>
            <div className="CustomModal__scrollable">
                <div className={`CustomModal__button-container`}>
                    <BackButton onClick={onModalClose}/>
                </div>
                <div className="Grid_grid__container">
                    <div className="Grid_grid__item" style={columnsStyle(2, 9, 2, 9, 1, 17, 1, 17)}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}