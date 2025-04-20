import React from "react";
import "../../../App.css";
import {HeroHeader} from "../../../components/HeroHeader/HeroHeader.tsx";
import RichText from "../../../components/RichText/RichText.tsx";
import RichTextList from "../../../components/RichText/RichTextList.tsx";
import {RichTextParagraph} from "../../../components/RichText/RichTextParagraph.tsx";
import {ArticleContent} from "../../../components/Article/ArticleContent.tsx";
import PageProgress from "../../../components/Article/PageProgress.tsx";
import {RichTextHeading2} from "../../../components/RichText/RichTextHeading2.tsx";

export const Terms101: React.FC = () => {
    const infoRef = React.useRef<HTMLDivElement>(null);
    const pageRef = React.useRef<HTMLDivElement>(null);
    const title = "On-Set Terminology 101";

    return (
        <>
            <div ref={pageRef} className="PrintArea__print-area">
                <HeroHeader eyebrow="Information" title={title} />
                <div ref={infoRef} className="Information__content-wrapper">
                    <ArticleContent pageUpLink={{title: "Actors Guide", href: "/actors-guide"}} articleDetails={{readTime: 2}}>
                        <RichText>
                            <RichTextHeading2 text="Common On-Set Commands" />
                            <RichTextList>
                                <li>Call Time — your scheduled arrival time on set.</li>
                                <li>Set — the filming location.</li>
                                <li>Rolling / We're Rolling — sound is rolling; background should go silent.</li>
                                <li>Cut — command to stop filming.</li>
                                <li>Reset — return to your original position for another take.</li>
                                <li>Background — cue for background performers to begin movement.</li>
                                <li>Action — start of the scene.</li>
                                <li>Hold / Freeze / Pause — stay still and don’t move.</li>
                                <li>Quiet on set — complete silence on set.</li>
                                <li>Wrap — filming day or scene is finished.</li>
                                <li>Picture Up — camera is on and ready to roll.</li>
                            </RichTextList>

                            <RichTextHeading2 text="Locations and Positions" />
                            <RichTextList>
                                <li>Holding / Background Holding / BH — waiting area for background performers.</li>
                                <li>Base Camp — main area with trailers, hair & makeup, and wardrobe.</li>
                                <li>Craft Table — snack and drink station.</li>
                                <li>Set PA — production assistant working with background actors on set.</li>
                                <li>AD (Assistant Director) — directs and communicates with background actors.</li>
                            </RichTextList>

                            <RichTextHeading2 text="Wardrobe and Appearance" />
                            <RichTextList>
                                <li>Wardrobe — the costume department.</li>
                                <li>Fitting — trying on your costume in advance.</li>
                                <li>Continuity — consistency of your look and costume across all scenes.</li>
                                <li>Look — your overall appearance (e.g., “Today’s look is casual office”).</li>
                            </RichTextList>

                            <RichTextHeading2 text="Payment and Documents" />
                            <RichTextList>
                                <li>Voucher — document confirming your work, used for payment.</li>
                                <li>Turnaround — required rest period between shifts (8–12 hours).</li>
                                <li>Overtime — additional pay for working past regular hours.</li>
                                <li>Meal Penalty — compensation if lunch is delayed.</li>
                                <li>Upgraded — role changed from background to a more featured one (e.g., SSE).</li>
                            </RichTextList>

                            <RichTextHeading2 text="Other Useful Terms" />
                            <RichTextList>
                                <li>Cross — walking across the camera’s view.</li>
                                <li>Cheat — slight position adjustment for the camera.</li>
                                <li>Eyeline — direction you should look.</li>
                                <li>Hot Set — a prepared set; do not touch anything.</li>
                                <li>MOS — a scene filmed without sound.</li>
                                <li>Mark — the exact spot on the floor you must hit.</li>
                            </RichTextList>

                            <RichTextHeading2 text="Extra Terms Every Background Performer Should Know" />
                            <RichTextList>
                                <li>Miming — imitating conversation silently to avoid disrupting sound.</li>
                                <li>5-to-10 (bits) — pause for 5–10 seconds before performing an action.</li>
                                <li>Satellite Holding — temporary holding closer to set than Base Camp.</li>
                                <li>Blocking — rehearsal of camera and actor movement.</li>
                                <li>First Team — lead actors.</li>
                                <li>Second Team — stand-ins and doubles.</li>
                                <li>Lock It Up — everyone must stop moving/no talking.</li>
                                <li>Crossing — phrase to say when passing camera setup.</li>
                                <li>Back to One — return to your original start position.</li>
                                <li>Checking the Gate — final check of the camera/lens before finishing the scene.</li>
                                <li>Picture’s Up — filming is about to start.</li>
                                <li>Turning Around — switching camera angle, expect a break or change.</li>
                                <li>Mark — precise floor spot for you to stand on.</li>
                            </RichTextList>

                            <RichTextHeading2 text="Breaks and Between Takes" />
                            <RichTextList>
                                <li>On a Bell / On Standby — stay nearby, do not wander off.</li>
                                <li>Going 10-1 — polite way to say you’re using the washroom.</li>
                                <li>Continuity — keep hair, wardrobe, props, and position consistent.</li>
                            </RichTextList>
                        </RichText>
                    </ArticleContent>
                </div>
            </div>
            <PageProgress targetRef={infoRef} title={title} />
        </>
    );
};
