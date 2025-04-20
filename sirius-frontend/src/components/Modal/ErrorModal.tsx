import React from 'react';
import ReactDOM from 'react-dom';
import './ErrorModal.css';
import '../../App.css';

interface ErrorModalProps {
    title: string;
    message: string;
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ title, message, onClose }) => {
    return ReactDOM.createPortal(
        <div className="error-modal-overlay">
            <div className="ErrorModal__container">
                <h2 className="ErrorModal__title">{title}</h2>
                <p className="ErrorModal__message">{message}</p>
                <button className="error-modal-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>,
        document.body
    );
};

export default ErrorModal;
