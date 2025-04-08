import React, {useState} from "react";
import "./FormMessage.css";
import "../../App.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {modules} from "../../config/QuillConfig.tsx";
import 'react-quill/dist/quill.snow.css';

interface FormMessageContainerProps {
    label?: string;
    input: {
        id: string;
        onChange: (text: string) => void;
        placeholder?: string;
        required?: boolean;
    }
    errorMessage?: string;
    className?: string;
}

export const FormMessage: React.FC<FormMessageContainerProps> = ({label, input, errorMessage, className}) => {
    const [editorContent, setEditorContent] = useState(input.placeholder || '');

    const handleEditorChange = (content: string) => {
        setEditorContent(content);
    };

    return (
        <div className={`FormMessage__input-container ${className || ''}`}>
            {label && <label htmlFor={input.id} className="FormMessage__input-label">{label}</label>}
            <ReactQuill
                id={input.id}
                className="FormMessage__input"
                value={editorContent}
                onChange={handleEditorChange}
                placeholder={input.placeholder}
                modules={modules}
            />
            {errorMessage && <span className="FormMessage__error-message">{errorMessage}</span>}
        </div>
    );
}