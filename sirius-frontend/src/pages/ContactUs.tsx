import React from "react";
import HeaderHub from "../components/HeaderHub/HeaderHub.tsx";
import ContentBlockWrapper from "../components/ContentBlockWrapper/ContentBlockWrapper.tsx";
import RichText from "../components/RichText/RichText.tsx";
import {RichTextParagraphUpdated} from "../components/RichText/RichTextParagraphUpdated.tsx";
import {columnsStyle} from "../shared/columnsStyle.tsx";

export const ContactUs: React.FC = () => {

    return (
        <ContentBlockWrapper>
            <HeaderHub title="Contact us" text="Please use the special emegrency number if you need urgent help"/>
            <div className="Grid_grid__container">
                <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 3, 8, 3, 8)}>
                    <RichText>
                        <RichTextParagraphUpdated>Emergency contact: <a href={"tel:0123456789"}>+1 (647) 525-4023</a> (Mon-Fri, 9am-8pm)</RichTextParagraphUpdated>
                        <RichTextParagraphUpdated>For any other queries, please email us at <a href={"mailto:office@siriustalent.ca"}>office@siriustalent.ca</a></RichTextParagraphUpdated>
                    </RichText>
                </div>
            </div>
        </ContentBlockWrapper>
    )
}