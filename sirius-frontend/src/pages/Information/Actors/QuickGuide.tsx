import React from "react";
import "../../../App.css";
import {HeroHeader} from "../../../components/HeroHeader/HeroHeader.tsx";
import RichText from "../../../components/RichText/RichText.tsx";
import RichTextList from "../../../components/RichText/RichTextList.tsx";
import {RichTextParagraph} from "../../../components/RichText/RichTextParagraph.tsx";
import {ArticleContent} from "../../../components/Article/ArticleContent.tsx";
import PageProgress from "../../../components/Article/PageProgress.tsx";
import {RichTextHeading2} from "../../../components/RichText/RichTextHeading2.tsx";

export const QuickGuide: React.FC = () => {
    const infoRef = React.useRef<HTMLDivElement>(null);
    const pageRef = React.useRef<HTMLDivElement>(null);
    const title = "Quick guide for background performers";

    return (
        <>
            <div ref={pageRef} className={"PrintArea__print-area"}>
                <HeroHeader eyebrow="Information" title={title} />
                <div ref={infoRef} className="Information__content-wrapper">
                    <ArticleContent pageUpLink={{title: "Actors Guide", href: "/actors-guide"}} articleDetails={{readTime: 6}}>
                        <RichText>
                            <RichTextHeading2 text="Required Documents" />
                            <RichTextList>
                                <li>Workplace Safety Certificate (mandatory)</li>
                                <li>Proof of identity and address (1 NOA document or any 3: driver’s license, health card, bank statement, etc.)</li>
                                <li>Work permit (if you are not a Canadian citizen)</li>
                                <li>SIN (Social Insurance Number)</li>
                                <li>Transportation details (if you are self-driving)</li>
                                <li>A valid bank account</li>
                            </RichTextList>

                            <RichTextHeading2 text="How Payment Works" />
                            <RichTextList>
                                <li>Payment is sent by cheque to the address written on your voucher (usually within 2–4 weeks after the shoot).</li>
                                <li>You must complete the Residence Form and submit your documents to Payroll or via RABS at least one day before the shoot.</li>
                                <li>If your cheque hasn't arrived after 4 weeks:
                                    <ul>
                                        <li>Contact the agency (include your name, project, shoot date, and a photo of your voucher)</li>
                                        <li>Contact the production’s Payroll department directly</li>
                                    </ul>
                                </li>
                            </RichTextList>

                            <RichTextHeading2 text="If Your Details Change" />
                            <RichTextParagraph text="If your contact information, status, or appearance changes — please update your profile on our website immediately." />

                            <RichTextHeading2 text="Minor Performers" />
                            <RichTextParagraph text="Performers under 18 must always be accompanied by a parent or legal guardian (except those aged 16–17 with permission). A completed Minor Work Permit Form is mandatory." />

                            <RichTextHeading2 text="Casting & Bookings" />
                            <RichTextList>
                                <li>All casting offers are sent via email — confirm or decline promptly.</li>
                                <li>Before confirming, make sure you fit the requirements (look, location, transportation).</li>
                                <li>You may receive urgent updates via phone or SMS.</li>
                            </RichTextList>

                            <RichTextHeading2 text="Vouchers & Commissions" />
                            <RichTextList>
                                <li>The voucher is the main document used to receive payment — do not lose it.</li>
                                <li>Vouchers may be filled out manually or via RABS.</li>
                                <li>Commission rates:
                                    <ul>
                                        <li>ACTRA Full / Non-Union / AABP — 10%</li>
                                        <li>Apprentice / SSE / Speaking Role — 15%</li>
                                        <li>+13% HST applies to all commissions</li>
                                        <li>Commission must be paid within 2 weeks of receiving your cheque.</li>
                                    </ul>
                                </li>
                            </RichTextList>

                            <RichTextHeading2 text="Paper Vouchers" />
                            <RichTextList>
                                <li>Required to get paid.</li>
                                <li>Upon arrival: check in at Sign-In → receive a paper voucher.</li>
                                <li>At the end: sign the voucher and keep a copy.</li>
                                <li>Your cheque will be mailed to the address on the voucher.</li>
                            </RichTextList>

                            <RichTextHeading2 text="Digital Vouchers (RABS)" />
                            <RichTextList>
                                <li>Used by some productions.</li>
                                <li>Filled out on your phone.</li>
                                <li>The app also sends your Call Time and wrap time.</li>
                            </RichTextList>

                            <RichTextHeading2 text="What to Bring and How to Behave on Set" />
                            <RichTextHeading2 text="When to Arrive" />
                            <RichTextList>
                                <li>Arrive 15 minutes before your Call Time or shuttle departure.</li>
                                <li>Call Time is often sent after 9:00 PM the night before.</li>
                                <li>Confirm your Call Time immediately after receiving it.</li>
                            </RichTextList>

                            <RichTextHeading2 text="What to Bring to Set" />
                            <RichTextList>
                                <li>Pen</li>
                                <li>2–3 wardrobe options</li>
                                <li>Valid ID</li>
                                <li>Lunch and snacks (if catering is not provided)</li>
                                <li>Water, thermos, coffee/tea</li>
                                <li>Charged phone and/or power bank</li>
                                <li>Umbrella, thermal layers — if filming outdoors</li>
                                <li>Comfortable shoes or extra footwear</li>
                            </RichTextList>

                            <RichTextHeading2 text="Upon Arrival to Set" />
                            <RichTextList>
                                <li>Find the holding area</li>
                                <li>Check in with Sign-In / PA / AD</li>
                                <li>Receive your voucher (if paper-based)</li>
                                <li>Wait for instructions (fitting, makeup, blocking)</li>
                            </RichTextList>

                            <RichTextHeading2 text="How to Behave on Set" />
                            <RichTextList>
                                <li>Always follow directions from the Set PA and AD</li>
                                <li>Move only when directed</li>
                                <li>Do not touch props or equipment</li>
                                <li>Do not leave holding without permission</li>
                            </RichTextList>

                            <RichTextHeading2 text="Good to Know" />
                            <RichTextList>
                                <li>You can stand, wait, or sit — but do not disappear or fall asleep.</li>
                                <li>If you need the restroom: “Going 10-1” or “Going 10-2”</li>
                                <li>If it’s cold: wear a coat over costume, but remove when instructed.</li>
                            </RichTextList>

                            <RichTextHeading2 text="Penalties" />
                            <RichTextList>
                                <li>Late cancellation (less than 24h notice) — $25</li>
                                <li>No-show without valid reason — $25</li>
                                <li>Late commission payment — $25</li>
                                <li>False information — $25</li>
                            </RichTextList>

                            <RichTextHeading2 text="What Is Not Allowed on Set" />
                            <RichTextList>
                                <li>Arriving late or impaired</li>
                                <li>Skipping your shift without valid reason</li>
                                <li>Using your phone on set</li>
                                <li>Taking photos or videos</li>
                                <li>Talking to lead actors without invitation</li>
                                <li>Posting anything about the project online</li>
                                <li>Talking during filming</li>
                                <li>Leaving set or holding without permission</li>
                                <li>Disrespecting the AD, casting, or crew</li>
                                <li>Sharing confidential production info</li>
                                <li>Leaving early without approval</li>
                                <li>Failing to sign voucher or return wardrobe</li>
                                <li>Disrupting continuity</li>
                            </RichTextList>

                            <RichTextHeading2 text="Violations May Result In" />
                            <RichTextList>
                                <li>Fines from the agency</li>
                                <li>Removal from the project</li>
                                <li>Production complaints</li>
                                <li>Removal from agency database</li>
                            </RichTextList>

                            <RichTextHeading2 text="Key On-Set Terms" />
                            <RichTextList>
                                <li>Call Time — your arrival time on set</li>
                                <li>Set — the filming location</li>
                                <li>Rolling — recording has started</li>
                                <li>Cut — stop filming</li>
                                <li>Reset — return to your original mark</li>
                                <li>Background — cue for background actors to move</li>
                                <li>Action — start of scene</li>
                                <li>Hold / Freeze / Pause — stay still</li>
                                <li>Quiet on set — silence during filming</li>
                                <li>Wrap — filming is finished</li>
                                <li>Picture Up — filming about to start</li>
                                <li>Holding — waiting area for background</li>
                                <li>Craft Table — snack and drink station</li>
                                <li>AD — Assistant Director giving instructions</li>
                                <li>Miming — pretend talking with no sound</li>
                                <li>5-to-10 — 5–10 second background action</li>
                                <li>Satellite Holding — closer holding area near set</li>
                                <li>Blocking — rehearsal for scene movement</li>
                                <li>Back to One — return to starting position</li>
                                <li>Checking the Gate — final camera check</li>
                                <li>Picture’s Up — filming starts shortly</li>
                                <li>Turning Around — shooting opposite direction</li>
                                <li>Hissing sound — signal to be quieter</li>
                            </RichTextList>
                        </RichText>

                    </ArticleContent>
                </div>
            </div>
            <PageProgress targetRef={infoRef} title={title}/>
        </>
    )
}