import React from "react";
import {PageProgressContainer} from "./PageProgressContainer.tsx";
import {PageProgressControls} from "./PageProgressControls.tsx";
import {PageProgressBar} from "./PageProgressBar.tsx";

interface PageProgressProps {
    scrollPixelsToOpen?: number
}

export const PageProgress: React.FC<PageProgressProps> = ({scrollPixelsToOpen}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const handleScroll = () => {
        if (scrollPixelsToOpen ? window.scrollY > scrollPixelsToOpen : window.scrollY > window.innerHeight) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }

    return (
        <PageProgressContainer isOpen={isOpen}>
            <PageProgressControls/>
            <PageProgressBar scrollPixelsToOpen={scrollPixelsToOpen ? scrollPixelsToOpen : window.innerHeight}/>
        </PageProgressContainer>
    )
}