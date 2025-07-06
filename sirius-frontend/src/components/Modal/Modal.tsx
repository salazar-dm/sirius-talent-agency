import React, {ReactNode} from 'react';
import './Modal.css';
import "../../App.css"
import Button from '../Button/Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    onAction?: () => void;
    actionText?: string;
    children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message, onAction, actionText, children }) => {
    if (!isOpen) return null;

    return (
        <div className="Modal__overlay" onClick={onClose}>
            <div className="Modal__content-wrapper" onClick={(e) => e.stopPropagation()}>

                <div className="Modal__container">
                    <div className="Modal__title">
                        <h3>{title}</h3>
                    </div>
                    <div className="Modal__message">
                        <p>{message}</p>
                        {onAction && actionText && (
                            <Button buttonStyle="primaryTextOnClick" buttonOnClick={onAction} buttonText={actionText} />
                        )}
                        {children && children}
                    </div>
                    <div className="Modal__button-container">
                        <Button buttonStyle="primaryTextOnClick" buttonOnClick={onClose} buttonText="Close" />
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Modal;