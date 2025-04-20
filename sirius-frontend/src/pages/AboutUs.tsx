import React from "react";
import HeaderHub from "../components/HeaderHub/HeaderHub.tsx";
import {SignpostPromo} from "../components/SignpostPromo/SignpostPromo.tsx";
import RichText from "../components/RichText/RichText.tsx";
import {RichTextHeading2} from "../components/RichText/RichTextHeading2.tsx";
import {RichTextParagraph} from "../components/RichText/RichTextParagraph.tsx";
import ContentBlockWrapper from "../components/ContentBlockWrapper/ContentBlockWrapper.tsx";
import SignpostPromoText from "../components/SignpostPromo/SignpostPromoText.tsx";
import {SignpostPromoImage} from "../components/SignpostPromo/SingpostPromoImage.tsx";
import RichTextList from "../components/RichText/RichTextList.tsx";
import {columnsStyle} from "../shared/columnsStyle.tsx";
import PageProgress from "../components/Article/PageProgress.tsx";

export const AboutUs: React.FC = () => {
    const image: string = "https://www.aoshearman.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fallenoveryllp1-aoshearmanwe0db-production-ecf3%2Fmedia%2Fproject%2Faoshearman%2Faoshearman%2Fhomepage%2Faoshearmanvideothumbnail1742-x-982.jpg%3Fh%3D982%26iar%3D0%26w%3D1742&w=1920&q=75"
    const title: string = "About us"
    const contentRef = React.useRef<HTMLDivElement>(null);

    return (
        <>
            <ContentBlockWrapper>
                <HeaderHub title={title} text="Sirius Talent Agency was built by performers — for performers"/>
                <div ref={contentRef} className="AboutUs__content-wrapper">
                    <div className="Grid_grid__container">
                        <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 5, 13, 5, 13)}>
                            <RichText>
                                <RichTextHeading2 text="A story shaped by real on-set experience" />
                                <RichTextParagraph text="Sirius Talent Agency was founded by two people who never planned to start a talent agency - and that’s exactly why it turned out the way it should be." />
                                <RichTextParagraph text="Alison is a chemist-geneticist by education who unexpectedly became a customs inspector and later spent three years working as a background actor. She earned her ACTRA status the hard way - through early call times, long shooting days, and learning everything on set." />
                                <RichTextParagraph text="Igor is a former nuclear physicist who traded atoms for algorithms and now successfully works in IT. Also an ACTRA member, he experienced icy arenas, 17-hour shoot days, unpredictable weather, and just 2 hours of sleep per night." />

                                <RichTextHeading2 text="A talent agency built for actors, by actors" />
                                <RichTextParagraph text="When Igor first stepped onto a set, he stayed there for a long time. His dream was to build a smart and easy-to-use booking system where everything runs smoothly and without paperwork." />
                                <RichTextParagraph text="That’s how Sirius Talent Agency was born - a mix of real-life experience and digital solutions. We decided to create the agency we ourselves needed at the beginning of our journey - smart, user-friendly, and genuinely caring about its actors." />

                                <RichTextHeading2 text="What we offer at Sirius" />
                                <RichTextList>
                                    <li>Free registration - no annual fees at all</li>
                                    <li>Support for newcomers on set</li>
                                    <li>A personal account to update your information anytime</li>
                                    <li>An automated invoicing system - so your payment arrives faster</li>
                                    <li>Guides, tips, and set etiquette - for a confident start</li>
                                </RichTextList>

                                <RichTextParagraph text="We believe background performers deserve better. So, we built better." />
                            </RichText>
                        </div>
                    </div>
                </div>
            </ContentBlockWrapper>

            <PageProgress targetRef={contentRef} title={title} />
        </>
    );
}
