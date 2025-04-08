import React from "react";
import HeaderHub from "../components/HeaderHub/HeaderHub.tsx";
import {SignpostPromo} from "../components/SignpostPromo/SignpostPromo.tsx";
import RichText from "../components/RichText/RichText.tsx";
import {RichTextHeading2} from "../components/RichText/RichTextHeading2.tsx";
import {RichTextParagraph} from "../components/RichText/RichTextParagraph.tsx";
import ContentBlockWrapper from "../components/ContentBlockWrapper/ContentBlockWrapper.tsx";
import SignpostPromoText from "../components/SignpostPromo/SignpostPromoText.tsx";
import {SignpostPromoImage} from "../components/SignpostPromo/SingpostPromoImage.tsx";

export const AboutUs: React.FC = () => {
    const image: string = "https://www.aoshearman.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fallenoveryllp1-aoshearmanwe0db-production-ecf3%2Fmedia%2Fproject%2Faoshearman%2Faoshearman%2Fhomepage%2Faoshearmanvideothumbnail1742-x-982.jpg%3Fh%3D982%26iar%3D0%26w%3D1742&w=1920&q=75"
    const title: string = "A firm built to achieve unparalleled outcomes"
    const text: string = "With nearly 4,000 lawyers globally, we are equally fluent in English law, U.S. law and the laws of the world’s most dynamic markets.\n" +
        "\n" +
        "This combination creates a new kind of law firm, one built to achieve unparalleled outcomes for our clients on their most complex, multijurisdictional matters – everywhere in the world.  A firm that advises at the forefront of the forces changing the current of global business and that is unrivalled in its global strength. "

    return (
        <>
            <ContentBlockWrapper>
                <HeaderHub title="About us" text="A&O Shearman was formed in 2024 via the merger of two historic firms, Allen & Overy and Shearman & Sterling."/>
                <SignpostPromo>
                    <SignpostPromoText title={title} text={text}/>
                    <SignpostPromoImage image={image}/>
                </SignpostPromo>
                <RichText>
                    <RichTextHeading2 text="A firm that delivers unmatched insight with seamless services"/>
                    <RichTextParagraph text="A firm whose teams deliver unmatched insight with seamless service. A firm with strong values and a commitment to sustainability, where diverse individuals, perspectives and backgrounds belong, excel, and make a decisive difference. "/>
                    <RichTextParagraph text="Our lawyers have long enjoyed a reputation for cultivating powerful relationships, thriving on seamless collaboration with each other and with their clients and earning the right to be trusted advisors.  "/>
                    <RichTextHeading2 text="Collective experience with many of the world’s most influential companies "/>
                    <RichTextParagraph text="Our clients benefit from the collective experience of teams who work with many of the world’s most influential companies and institutions, and have a history of precedent-setting innovations. "/>
                    <RichTextParagraph text="Together our lawyers advise more than a third of NYSE-listed businesses, a fifth of the NASDAQ and a notable proportion of the London Stock Exchange, the Euronext, Euronext Paris and the Tokyo and Hong Kong Stock Exchanges. "/>
                    <RichTextHeading2 text="A firm with the power to shape our clients’ fortunes "/>
                    <RichTextParagraph text="This experience and expertise creates a firm with the power to shape our clients’ fortunes and apply the law in groundbreaking ways – whether through innovative thinking or new products, services and technologies. "/>
                </RichText>
            </ContentBlockWrapper>
        </>
    )
}