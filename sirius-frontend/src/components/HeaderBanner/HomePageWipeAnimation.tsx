import React, {useEffect, useState} from "react";
import "./HomePageWipeAnimation.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";

interface HomePageWipeAnimationProps {
    className?: string
}

const HomePageWipeAnimation: React.FC<HomePageWipeAnimationProps> = ({className}) => {
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        setStartAnimation(true);
    }, []);

    return (
        <>
            <div className={`Grid_grid__item WipeAnimation__wipe-animation ${startAnimation ? "WipeAnimation__wipe-animation--active" : ""} ${className}`}
                 style={columnsStyle(1, 9, 1, 9, 2, 17, 2, 17)}>
            </div>
        </>
    );
}

export default HomePageWipeAnimation