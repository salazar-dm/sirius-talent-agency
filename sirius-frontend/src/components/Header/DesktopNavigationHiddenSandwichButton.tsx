import React, {useEffect} from "react";
import './DesktopNavigationHiddenSandwichButton.css';
import '../../App.css';

interface DesktopNavigationHiddenSandwichButtonProps {
    hideNavigationOnScrollPixels?: number
}

const DesktopNavigationHiddenSandwichButton: React.FC<DesktopNavigationHiddenSandwichButtonProps> = ({hideNavigationOnScrollPixels = 300}) => {
    const [sandwichBarTransformation, setSandwichBarTransformation] = React.useState({
        currentValue: 0,
    });
    const sandwichBarMultipliers = [3, 2, 1];

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const handleScroll = () => {
        const currentScroll = window.scrollY;
        setSandwichBarTransformation({
            currentValue: currentScroll,
        });
    }

    return (
        <>
            <button className="DesktopNavigation__sandwich-button" onClick={() => window.scrollTo({
                top: 0,
                behavior: "smooth",
            })}>
                {sandwichBarMultipliers.map((multiplier, number) => (
                    <span key={number} className="DesktopNavigation__sandwich-bar" style={{
                        transform: `translateX(-${Math.max(0, (hideNavigationOnScrollPixels - sandwichBarTransformation.currentValue * multiplier) / hideNavigationOnScrollPixels * 100)}%)`,
                        opacity: Math.min(1, (sandwichBarTransformation.currentValue * multiplier) / hideNavigationOnScrollPixels),
                    }}>
                    </span>
                ))}
            </button>
        </>
    )
}

export default DesktopNavigationHiddenSandwichButton