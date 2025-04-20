import React from "react";
import "../../../App.css";
import {HeroHeader} from "../../../components/HeroHeader/HeroHeader.tsx";
import RichText from "../../../components/RichText/RichText.tsx";
import RichTextList from "../../../components/RichText/RichTextList.tsx";
import {RichTextParagraph} from "../../../components/RichText/RichTextParagraph.tsx";
import {ArticleContent} from "../../../components/Article/ArticleContent.tsx";
import PageProgress from "../../../components/Article/PageProgress.tsx";
import {RichTextHeading2} from "../../../components/RichText/RichTextHeading2.tsx";

export const Minors: React.FC = () => {
    const infoRef = React.useRef<HTMLDivElement>(null);
    const pageRef = React.useRef<HTMLDivElement>(null);
    const title = "Minors";

    return (
        <>
            <div ref={pageRef} className={"PrintArea__print-area"}>
                <HeroHeader eyebrow="Information" title={title} />
                <div ref={infoRef} className="Information__content-wrapper">
                    <ArticleContent pageUpLink={{title: "Actors Guide", href: "/actors-guide"}} articleDetails={{readTime: 1}}>
                        <RichText>
                            <RichTextHeading2 text="Minors" />
                            <RichTextParagraph text="If you are working as a minor (under 18) or are the guardian of a minor performer, please review the following:" />

                            <RichTextHeading2 text="Guardian / adult supervisor" />
                            <RichTextParagraph text="All minors must be accompanied by a parent or legal guardian. The parent or guardian is required to complete the Minor Work Permit Form before arriving on set:" />
                            <RichTextParagraph text="If your child is 16–17 years old, a guardian is not required to accompany them, but the form must still be completed and carried with them." />

                            <RichTextHeading2 text="According to ACTRA Toronto guidelines" />
                            <RichTextList>
                                <li>Children under 12: May work up to 8 hours per day, plus 1 unpaid meal break.</li>
                                <li>Ages 12 to 15: May work up to 8 hours per day, with up to 2 hours of overtime, not exceeding 10 hours total.</li>
                                <li>Ages 16 to 17: May work up to 8 hours per day, with up to 4 hours of overtime, not exceeding 12 hours total.</li>
                            </RichTextList>

                            <RichTextParagraph text="All minors are entitled to a minimum 12-hour rest period between the end of one workday and the start of the next." />
                        </RichText>
                    </ArticleContent>
                </div>
            </div>
            <PageProgress targetRef={infoRef} title={title}/>
        </>
    )
}