import React, {useEffect, useState} from "react";
import "./PerformerProfileCard.css";
import "../../App.css";
import {PerformerType} from "../../types/PerformerType.tsx";
import PerformerProfileCardDetails from "./PerformerProfileCardDetails.tsx";
import {LocalUserType} from "../../types/LocalUserType.tsx";
import {NextButton} from "../Button/NextButton.tsx";
import {PrevButton} from "../Button/PrevButton.tsx";

interface PerformerProfileCardProps {
    performer: LocalUserType
    isSticky: boolean
    onUpdateClick?: () => void
}

export const PerformerProfileCard: React.FC<PerformerProfileCardProps> = ({performer, isSticky, onUpdateClick}) => {
    const imageList = [
        performer.profile.keyName,
        performer.profile.fullBodyKeyName,
        performer.profile.documentKeyName,
        performer.profile.actraCardKeyName,
        performer.profile.whasaKeyName
    ]

    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        let newIndex = currentImage;

        do {
            newIndex = newIndex === imageList.length - 1 ? 0 : newIndex + 1;
        } while (imageList[newIndex] === "" && newIndex !== currentImage);

        setCurrentImage(newIndex);
    };

    const previousImage = () => {
        let newIndex = currentImage;

        do {
            newIndex = newIndex === 0 ? imageList.length - 1 : newIndex - 1;
        } while (imageList[newIndex] === "" && newIndex !== currentImage);

        setCurrentImage(newIndex);
    };

    return (
        <>
            <div className={`PerformerProfileCard__container ${isSticky ? "PerformerProfileCard__container--sticky" : ""}`}>
                <div className="PerformerProfileCard__image-container">
                    {<img src={imageList[currentImage]} alt={performer.profile.firstName + " " + performer.profile.lastName}/>}
                    <NextButton onClick={nextImage}/>
                    <PrevButton onClick={previousImage}/>
                </div>
                <PerformerProfileCardDetails performer={performer} onUpdateClick={onUpdateClick}/>
            </div>
        </>
    )
}