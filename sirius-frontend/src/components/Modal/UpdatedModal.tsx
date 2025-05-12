import React from 'react';
import ReactDOM from 'react-dom';
import './ErrorModal.css';
import '../../App.css';

interface UpdatedModalProps {
    title: string;
    message: string;
    children?: React.ReactNode;
}

const UpdatedModal: React.FC<UpdatedModalProps> = ({ title, message, children }) => {
    return ReactDOM.createPortal(
        <div className="error-modal-overlay">
            <div className="ErrorModal__container">
                <h2 className="ErrorModal__title">{title}</h2>
                <p className="ErrorModal__message">{message}</p>
                <div className="UpdatedModal__children-container">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default UpdatedModal;