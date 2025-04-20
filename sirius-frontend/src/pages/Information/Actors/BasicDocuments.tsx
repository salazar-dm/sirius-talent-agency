import React from "react";
import "../../../App.css";
import {HeroHeader} from "../../../components/HeroHeader/HeroHeader.tsx";
import RichText from "../../../components/RichText/RichText.tsx";
import RichTextList from "../../../components/RichText/RichTextList.tsx";
import {RichTextParagraph} from "../../../components/RichText/RichTextParagraph.tsx";
import {ArticleContent} from "../../../components/Article/ArticleContent.tsx";
import PageProgress from "../../../components/Article/PageProgress.tsx";
import {RichTextHeading2} from "../../../components/RichText/RichTextHeading2.tsx";

export const BasicDocuments: React.FC = () => {
    const infoRef = React.useRef<HTMLDivElement>(null);
    const pageRef = React.useRef<HTMLDivElement>(null);
    const title = "Basic documents";

    return (
        <>
            <div ref={pageRef} className={"PrintArea__print-area"}>
                <HeroHeader eyebrow="Information" title={title} />
                <div ref={infoRef} className="Information__content-wrapper">
                    <ArticleContent pageUpLink={{title: "Actors Guide", href: "/actors-guide"}} articleDetails={{readTime: 1.5}}>
                            <RichText>
                                <RichTextHeading2 text="List of documents required to work on a film set in Canada:"/>
                                <RichTextList>
                                    <li>Health & Safety Certificate — mandatory for all work on set. Complete the training and obtain your certificate at: <a>https://www.labour.gov.on.ca/english/hs/elearn/worker/foursteps.php</a></li>
                                    <li>Union Membership (if applicable) — ACTRA membership for union performers. A photo of your ACTRA Toronto card or a screenshot of the email showing your full name, ACTRA number, and updated status is accepted.</li>
                                    <li>Agency Registration — confirmed registration and an activated account with up-to-date information and profile photos.</li>
                                    <li>Work Permit (if not a Canadian citizen) — Valid work visa or employment authorization.</li>
                                    <li>SIN (Social Insurance Number) — Required for tax purposes in Canada.</li>
                                    <li>Recent Profile Photos — Clear headshot and full body photo, to be used for your agency profile.</li>
                                    <li>Transportation Documents (if applicable) — If you’re self-driving, you may be asked to provide proof of transportation.</li>
                                    <li>Emergency Contact Info — Names and phone numbers of people to reach in case of emergency.</li>
                                    <li>Medical Information — Any allergies or medical conditions that may impact your work on set.</li>
                                </RichTextList>
                                <RichTextParagraph text="Proof of Identity and Address for Payment Cheque Delivery:"/>
                                <RichTextList>
                                    <li>Current year’s Notice of Assessment.</li>
                                </RichTextList>
                                <RichTextParagraph text="or any other three documents confirming name and address, such as:"/>
                                <RichTextList>
                                    <li>Driver’s license.</li>
                                    <li>Ontario Health Card.</li>
                                    <li>Recent bank statement (no older than 3 months).</li>
                                    <li>Rental agreement (from the past 12 months).</li>
                                    <li>Recent phone bill.</li>
                                    <li>Proof of union membership.</li>
                                </RichTextList>
                            </RichText>
                    </ArticleContent>
                </div>
            </div>
            <PageProgress targetRef={infoRef} title={title}/>
        </>
    )
}