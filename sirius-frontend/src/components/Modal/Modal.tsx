import React from 'react';
import './Modal.css';
import Button from '../Button/Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    onAction?: () => void;
    actionText?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message, onAction, actionText }) => {
    if (!isOpen) return null;

    return (
        <div className="Modal__overlay" onClick={onClose}>
            <div className="Modal__content-wrapper" onClick={(e) => e.stopPropagation()}>
                <Button buttonStyle="primaryTextOnClick" buttonOnClick={onClose} buttonText="Close" />
                <div className="Modal__container">
                    <div className="Modal__title">
                        <h2>{title}</h2>
                    </div>
                    <div className="Modal__message">
                        <p>{message}</p>
                        {onAction && actionText && (
                            <Button buttonStyle="primaryTextOnClick" buttonOnClick={onAction} buttonText={actionText} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;