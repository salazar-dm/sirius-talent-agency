import React from "react";
import "../../../App.css";
import {HeroHeader} from "../../../components/HeroHeader/HeroHeader.tsx";
import RichText from "../../../components/RichText/RichText.tsx";
import RichTextList from "../../../components/RichText/RichTextList.tsx";
import {RichTextParagraph} from "../../../components/RichText/RichTextParagraph.tsx";
import {ArticleContent} from "../../../components/Article/ArticleContent.tsx";
import PageProgress from "../../../components/Article/PageProgress.tsx";
import {RichTextHeading2} from "../../../components/RichText/RichTextHeading2.tsx";

export const AgencyRequiredAndRulesBeforeSet: React.FC = () => {
    const infoRef = React.useRef<HTMLDivElement>(null);
    const pageRef = React.useRef<HTMLDivElement>(null);
    const title = "Agency required and Rules before set";

    return (
        <>
            <div ref={pageRef} className={"PrintArea__print-area"}>
                <HeroHeader eyebrow="Information" title={title} />
                <div ref={infoRef} className="Information__content-wrapper">
                    <ArticleContent pageUpLink={{title: "Actors Guide", href: "/actors-guide"}} articleDetails={{readTime: 4}}>
                        <RichText>
                            <RichTextHeading2 text="What photos are required for your profile" />
                            <RichTextList>
                                <li>Headshot: Clear photo of your face and shoulders (from the chest up)</li>
                                <li>Full-Length Photo: From head to toe, showing your full body</li>
                                <li>Phone photos are accepted — as long as the lighting is good and the background is plain (e.g., a wall)</li>
                                <li>Do not use professional photos: no filters, minimal makeup</li>
                                <li>Optional: To increase your chances of being selected, you can upload extra photos in different looks or outfits (if available) — use the Specials section in your profile</li>
                            </RichTextList>

                            <RichTextHeading2 text="What to do if your information changes" />
                            <RichTextParagraph text="If your contact details, status, or appearance changes — please update your profile on our website." />

                            <RichTextHeading2 text="How casting works" />
                            <RichTextList>
                                <li>Casting directors use our database to find suitable background performers, so keeping your profile up to date is essential.</li>
                                <li>Check the requirements: Before responding to a role, always make sure you match the listed criteria (e.g., measurements, age, look, ability to get to set if no shuttle is provided, etc.).</li>
                                <li>Email notification: We send casting details to your email — including project name, dates, location, role type, transportation info, wardrobe instructions. In urgent cases, we may also call or text you.</li>
                            </RichTextList>

                            <RichTextHeading2 text="Participating in a casting" />
                            <RichTextList>
                                <li>Accept: If the role suits you and you meet all the criteria, click the confirmation button in the email to participate.</li>
                                <li>Decline: If any conditions don’t work for you, click the decline button to reject the offer.</li>
                            </RichTextList>

                            <RichTextHeading2 text="Confirming Your Availability" />
                            <RichTextParagraph text="After you confirm your availability, the final booking decision is made by the casting director. If you are not selected, don’t worry — you will receive a notification email as soon as possible. There will be many more opportunities ahead!" />

                            <RichTextHeading2 text="What else does casting consider" />
                            <RichTextList>
                                <li>The character descriptions provided by the production</li>
                                <li>The balance between union and non-union performers</li>
                                <li>How many background performers are being booked from each agency</li>
                                <li>Diversity and representation in the scene</li>
                            </RichTextList>

                            <RichTextHeading2 text="Booking confirmation" />
                            <RichTextParagraph text="If you’ve been selected — congratulations! You’ll receive a confirmation email from us. Please keep the listed dates available for:" />
                            <RichTextList>
                                <li>Fitting (may take up to 3 hours)</li>
                                <li>Shoot day (be prepared for an early call time, late finish, or an overnight shoot).</li>
                                <li>You must be available for the entire day.</li>
                            </RichTextList>
                            <RichTextParagraph text="Make sure you have transportation, appropriate clothing, and wait for your official Call Time." />

                            <RichTextHeading2 text="Call Time (Report Time)" />
                            <RichTextParagraph text="The Night Before the Shoot:" />
                            <RichTextList>
                                <li>Your wardrobe is prepared</li>
                                <li>You know the filming location</li>
                                <li>You have your Health & Safety certificate</li>
                                <li>Your documents are ready</li>
                            </RichTextList>
                            <RichTextParagraph text="Now you just need to wait for your Call Time. Call Time is scheduled based on the previous day’s shoot, so it’s often sent late in the evening (after 9:00 PM). As soon as you receive it — confirm immediately." />

                            <RichTextHeading2 text="Along with your call time, you may also receive:" />
                            <RichTextParagraph text="Additional instructions such as:" />
                            <RichTextList>
                                <li>Meal order details</li>
                                <li>Document submission info</li>
                                <li>Wardrobe guidelines, etc.</li>
                            </RichTextList>
                            <RichTextParagraph text="It is very important to read everything carefully to be fully prepared for your shoot day." />

                            <RichTextHeading2 text="How to get to set" />
                            <RichTextParagraph text="In the first email with your casting details, we will include:" />
                            <RichTextList>
                                <li>The location of the shoot and/or fitting</li>
                                <li>Whether a shuttle will be provided or if you need to get there on your own</li>
                                <li>The shuttle pickup location, if one is arranged</li>
                            </RichTextList>
                            <RichTextParagraph text="If you can’t get there on your own — don’t worry! There will be other projects with shuttle service or locations closer to you." />

                            <RichTextHeading2 text="Shuttles" />
                            <RichTextParagraph text="If a shuttle is provided, your Call Time will include the shuttle departure time. Confirm your participation and arrive on time. When you arrive at the shuttle pickup point, inform the driver or a production representative. Shuttles are typically yellow, white, or green school buses, but sometimes may be 12-seat white minivans." />

                            <RichTextHeading2 text="Self-drive" />
                            <RichTextParagraph text="If you're getting to set on your own, you may be eligible for travel compensation: If the filming location is more than 40 km from downtown Toronto, you might receive travel time pay. This only applies to ACTRA Full and Apprentice members, and only if no shuttle is provided (mileage-based)." />

                            <RichTextHeading2 text="Working conditions" />
                            <RichTextParagraph text="You are fully responsible for your behavior and interactions on and off set. The agency does not conduct background checks on registered users. The agency is not liable for the actions of its performers and makes no guarantees regarding their professional or personal qualities." />
                        </RichText>

                    </ArticleContent>
                </div>
            </div>
            <PageProgress targetRef={infoRef} title={title}/>
        </>
    )
}