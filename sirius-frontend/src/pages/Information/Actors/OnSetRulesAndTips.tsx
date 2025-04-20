import React from "react";
import "../../../App.css";
import {HeroHeader} from "../../../components/HeroHeader/HeroHeader.tsx";
import RichText from "../../../components/RichText/RichText.tsx";
import RichTextList from "../../../components/RichText/RichTextList.tsx";
import {RichTextParagraph} from "../../../components/RichText/RichTextParagraph.tsx";
import {ArticleContent} from "../../../components/Article/ArticleContent.tsx";
import PageProgress from "../../../components/Article/PageProgress.tsx";
import {RichTextHeading2} from "../../../components/RichText/RichTextHeading2.tsx";

export const OnSetRulesAndTips: React.FC = () => {
    const infoRef = React.useRef<HTMLDivElement>(null);
    const pageRef = React.useRef<HTMLDivElement>(null);
    const title = "On set rules and tips";

    return (
        <>
            <div ref={pageRef} className={"PrintArea__print-area"}>
                <HeroHeader eyebrow="Information" title={title} />
                <div ref={infoRef} className="Information__content-wrapper">
                    <ArticleContent pageUpLink={{title: "Actors Guide", href: "/actors-guide"}} articleDetails={{readTime: 5}}>
                        <RichText>
                            <RichTextHeading2 text="On-set etiquette & hierarchy" />
                            <RichTextParagraph text="Professional behavior is the key to success. Be prepared, respectful, and always follow instructions. Here’s what to expect:" />
                            <RichTextHeading2 text="Check-in" />
                            <RichTextParagraph text="Upon arrival to set, check in with a production representative — they will give you instructions and your voucher." />
                            <RichTextHeading2 text="Hair, makeup, wardrobe" />
                            <RichTextParagraph text="After check-in, you may be sent to one of these departments. Follow all the instructions we send you in advance — these must be completed before arriving on set." />
                            <RichTextHeading2 text="Waiting" />
                            <RichTextParagraph text="There can be a lot of downtime between scenes. Stay calm, do not leave your assigned area, and always be ready when you're called to set." />
                            <RichTextHeading2 text="On set: quick command guide" />
                            <RichTextList>
                                <li>“Picture’s Up!” — filming is about to start, get ready</li>
                                <li>“Rolling!” means camera and sound are recording — stay silent and focused</li>
                                <li>“Background!” — background actors start moving</li>
                                <li>“Action!” — the main scene begins</li>
                                <li>“Cut!” — immediately stop all movement and return to position if asked</li>
                            </RichTextList>
                            <RichTextParagraph text="Keep your eyes on the Set PA and listen for cues like “Hold,” “Reset,” or “Back to One”. Always stay quiet, alert, and respectful of the set." />

                            <RichTextHeading2 text="Be ready for a long day" />
                            <RichTextParagraph text="A shoot day can be very long! The average duration is around 9 hours, but it can go up to 17 hours. Make sure to:" />
                            <RichTextList>
                                <li>Get a good night’s sleep beforehand</li>
                                <li>Bring a water bottle</li>
                                <li>Eat breakfast</li>
                                <li>Pack a portable phone charger</li>
                                <li>Bring your own chair (e.g., camping chair from Costco)</li>
                                <li>In cold weather: thermal clothing, hand/foot warmers, thermos</li>
                            </RichTextList>

                            <RichTextHeading2 text="Encounters with celebrities" />
                            <RichTextParagraph text="Always be polite and professional — they are focused on their work. It is strictly forbidden to take photos of actors or use your phone on set. Do not distract them, start conversations, or try to take selfies." />

                            <RichTextHeading2 text="Upgrade (category change)" />
                            <RichTextParagraph text="An upgrade means your performer category changes based on what you were asked to do on set." />
                            <RichTextParagraph text="If you believe you qualify for an upgrade, speak to the 3rd Assistant Director (3rd A.D.), a producer, or the person responsible for background performers." />
                            <RichTextParagraph text="Examples: saying a line, jumping into a pool, simulating a fight, etc. If upgraded, the AD will inform the voucher issuer to reflect the change." />

                            <RichTextHeading2 text="Strictly prohibited behavior" />
                            <RichTextList>
                                <li>Arriving late (must arrive 15 minutes early)</li>
                                <li>No-show without at least 24 hours’ notice</li>
                                <li>Talking during filming (unless instructed)</li>
                                <li>Wandering without permission</li>
                                <li>Using alcohol or drugs at work (including weed)</li>
                                <li>Showing disrespect to crew or performers</li>
                                <li>Leaving set or holding without permission</li>
                                <li>Leaving without signing your voucher</li>
                                <li>Ending workday without approval</li>
                                <li>Disrupting the filming process</li>
                                <li>Using your phone on set</li>
                                <li>Aggression of any kind (bullying, racism, harassment, sexism, discrimination)</li>
                                <li>Taking others’ belongings without consent</li>
                                <li>Complaining or refusing wardrobe (exceptions: fit, physical discomfort, safety)</li>
                                <li>Complaining about hair/makeup (exceptions: allergy, pain, visible harm)</li>
                            </RichTextList>

                            <RichTextHeading2 text="Helpful tips" />
                            <RichTextList>
                                <li>Ask questions at the right time — speak to the AD when they give instructions</li>
                                <li>Be ready to react quickly — filming moves fast</li>
                                <li>If stepping away, say “Going 10-1”</li>
                                <li>Connect with other background performers</li>
                                <li>Check your email the night before</li>
                                <li>Don’t ask for upgrades or photos</li>
                                <li>Keep noise to a minimum in holding</li>
                                <li>Bring quiet entertainment (book, earbuds)</li>
                                <li>Layer your clothes</li>
                                <li>Never post anything online about the project</li>
                                <li>Label your stuff (phone, charger, bag)</li>
                                <li>Stay flexible and positive — plans change fast</li>
                            </RichTextList>
                        </RichText>

                    </ArticleContent>
                </div>
            </div>
            <PageProgress targetRef={infoRef} title={title}/>
        </>
    )
}