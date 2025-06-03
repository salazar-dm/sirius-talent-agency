import React from "react"
import "../../App.css"
import "./ProfileFormPicRef.css"
import {ProfileFormPicRefInfo} from "../../templates/profileFormPicRefInfo.ts";

interface Props {
    heading: string
    info: ProfileFormPicRefInfo[]
}

export const ProfileFormPicRef: React.FC<Props> = ({heading, info}) => {
    return (
        <>
            <div className="ProfileFormPicRef__container">
                <h3 className="ProfileFormPicRef__heading">{heading}</h3>
                <div className="ProfileFormPicRef__body-container">
                    {
                        info.map((info, i) => (
                            <div key={i} className="ProfileFormPicRef__info">
                                <p className="ProfileFormPicRef__text">{info.text}</p>
                                <div className="ProfileFormPicRef__image-container">
                                    <img src={info.imgSrc} alt={info.imgAlt} className="ProfileFormPicRef__image"/>
                                </div>

                            </div>
                        ))
                    }

                </div>
            </div>
        </>
    )
}