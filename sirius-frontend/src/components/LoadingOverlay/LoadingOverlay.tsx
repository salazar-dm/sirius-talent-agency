import React, {useEffect} from "react";
import "./LoadingOverlay.css";
import "../../App.css";

const LoadingOverlay: React.FC = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="LoadingOverlay__container">
            <div className="LoadingOverlay__spinner-wrapper">
                <span className="loader"></span>
            </div>
        </div>
    );
};

export default LoadingOverlay;