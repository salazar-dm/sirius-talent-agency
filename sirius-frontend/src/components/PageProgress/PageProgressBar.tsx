import React from "react";
import './PageProgressBar.css';

interface PageProgressBarProps {
    scrollPixelsToOpen: number
}

export const PageProgressBar: React.FC<PageProgressBarProps> = ({scrollPixelsToOpen}) => {
    const [currentProgress, setCurrentProgress] = React.useState(0);

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const handleScroll = () => {
        if (document.querySelector("footer") === null) {
            return
        }

        const progress = (window.scrollY - scrollPixelsToOpen) / (document.body.scrollHeight - scrollPixelsToOpen - document.querySelector("footer")!.offsetHeight);

        if (progress > 0) {
            setCurrentProgress(progress);
        } else {
            setCurrentProgress(0);
        }
    }

    return (
        <>
            <div className="PageProgressBar__container">
                <div className="PageProgressBar__progress" style={{width: `${currentProgress * 100}%`}}/>
            </div>
        </>
    )
}