import React from "react";
import "../../../App.css";
import {HeroHeader} from "../../../components/HeroHeader/HeroHeader.tsx";
import RichText from "../../../components/RichText/RichText.tsx";
import RichTextList from "../../../components/RichText/RichTextList.tsx";
import {RichTextParagraph} from "../../../components/RichText/RichTextParagraph.tsx";
import {ArticleContent} from "../../../components/Article/ArticleContent.tsx";
import PageProgress from "../../../components/Article/PageProgress.tsx";
import {RichTextHeading2} from "../../../components/RichText/RichTextHeading2.tsx";
import {RichTextParagraphUpdated} from "../../../components/RichText/RichTextParagraphUpdated.tsx";

export const VoucherCommissionAndPayment: React.FC = () => {
    const infoRef = React.useRef<HTMLDivElement>(null);
    const pageRef = React.useRef<HTMLDivElement>(null);
    const title = "Voucher, commission and payment";

    return (
        <>
            <div ref={pageRef} className={"PrintArea__print-area"}>
                <HeroHeader eyebrow="Information" title={title} />
                <div ref={infoRef} className="Information__content-wrapper">
                    <ArticleContent pageUpLink={{title: "Actors Guide", href: "/actors-guide"}} articleDetails={{readTime: 4}}>
                        <RichText>
                            <RichTextHeading2 text="How will you receive payment" />
                            <RichTextParagraph text="Payment will be sent to your home mailing address (the one you write on your voucher) within 2–4 weeks after your shoot day." />
                            <RichTextParagraph text="To ensure proper payment, it is your responsibility to:" />
                            <RichTextList>
                                <li>Complete the Residency Form on time</li>
                                <li>Submit the required documents to the production’s payroll email (you’ll receive it in your Call Time email)</li>
                                <li>Or fill out the information via RABS, which becomes available 24 hours before the shoot day</li>
                            </RichTextList>
                            <RichTextParagraph text="If you haven’t received your cheque after 4 weeks:" />
                            <RichTextList>
                                <li>Email us with your status, full name, shoot date, show title, and include a photo of your voucher</li>
                                <li>Also contact the production payroll email using the same information</li>
                            </RichTextList>
                            <RichTextParagraphUpdated>2025 Rates for Background Performers (Toronto): <a href="https://www.aqpm.ca/wp-content/uploads/2025/01/ACTRA-Grilles-tarifaires-2025-2027-EN.pdf">https://www.aqpm.ca/wp-content/uploads/2025/01/ACTRA-Grilles-tarifaires-2025-2027-EN.pdf</a></RichTextParagraphUpdated>
                            <img alt={"Background performer rates for 2025"} src={"https://res.cloudinary.com/da7bqrpqb/image/upload/v1745098287/website-pictures/rates-table.png"} />

                            <RichTextHeading2 text="Vouchers and payment" />
                            <RichTextList>
                                <li>Vouchers are required to receive payment</li>
                                <li>When you arrive on set, you check in and receive a voucher. Take care of it</li>
                                <li>At the end of the workday, you MUST sign the voucher at Sign-In before leaving</li>
                                <li>You will be given the third sheet of the voucher — keep it</li>
                            </RichTextList>
                            <RichTextParagraph text="Your payment cheque will be sent to the address you wrote on the voucher." />
                            <RichTextParagraph text="Tip – when filling out your information, press firmly with your pen, as the writing transfers to the following pages." />
                            <RichTextParagraph text="Make sure the voucher is completely filled out, and keep your copy for tax reporting." />
                            <RichTextList>
                                <li>White vouchers: used for background performers who are “off the clock”</li>
                                <img alt={"White voucher example"} src={"https://res.cloudinary.com/da7bqrpqb/image/upload/v1745098287/website-pictures/voucher-white.png"}/>
                                <li>Green vouchers: used for performers who are “on the clock” — primarily for full ACTRA members, followed by apprentices, and then others</li>
                                <img alt={"Green voucher example"} src={"https://res.cloudinary.com/da7bqrpqb/image/upload/v1745098287/website-pictures/voucher-green.png"}/>
                            </RichTextList>

                            <RichTextHeading2 text="Digital vouchers (RABS)" />
                            <RichTextParagraph text="Some productions use digital vouchers through the RABS app. You will fill out your voucher on your phone, and the app will also send notifications about your Call Time, meal breaks, and end of day." />
                            <RichTextParagraph text="If this system is being used, we will send you a link to create your RABS profile." />

                            <RichTextHeading2 text="Commissions" />
                            <RichTextParagraph text="After receiving your payment, log in to your agency profile. There, you’ll find the “Commissions” section — follow the instructions provided." />
                            <RichTextList>
                                <li>Make sure you enter the gross amount (before taxes and deductions)</li>
                                <li>Enter your card details to pay the commission</li>
                                <li>We do not store your payment information in our database</li>
                                <li>A delay in commission payment may result in a penalty</li>
                            </RichTextList>
                            <RichTextParagraph text="All penalty amounts and conditions are outlined in the License Agreement. The agency charges a commission for presenting your profile to casting directors and forwarding you casting information." />

                            <RichTextHeading2 text="Commission rates" />
                            <RichTextList>
                                <li>ACTRA Full: 10%</li>
                                <li>ACTRA Apprentice: 15%</li>
                                <li>Non-Union / AABP: 10%</li>
                                <li>Upgrade / SSE / Speaking Role: 15%</li>
                            </RichTextList>
                            <RichTextParagraph text="All commissions are subject to 13% HST and are calculated from the gross amount." />

                            <RichTextHeading2 text="Additional payments" />
                            <RichTextParagraph text="You may be eligible for additional payments (e.g., for transportation, use of personal items, etc.). These must be written clearly on your voucher — otherwise, you will not be paid for them." />
                            <RichTextList>
                                <li>Fitting: Write the date and the word “Fitting” in the comments — paid as 2 hours of your base hourly rate</li>
                                <li>Use of gown or tuxedo: Write “Gown” or “Tuxedo” in the comments — $40</li>
                                <li>Use of personal gear/equipment/vehicle: Write in the comments — $40</li>
                                <li>Use of your own suitcase: Write this in the comments — $40</li>
                                <li>Rolling lunch or a 30-minute meal break: Mention this in the comments as well</li>
                            </RichTextList>

                            <RichTextHeading2 text="Taxes" />
                            <RichTextParagraph text="The agency acts as an intermediary, so all tax documents are issued by the production company." />
                            <RichTextParagraph text="If you did not receive any tax forms, you will need to contact the production company directly — the one that hired you." />
                        </RichText>

                    </ArticleContent>
                </div>
            </div>
            <PageProgress targetRef={infoRef} title={title}/>
        </>
    )
}