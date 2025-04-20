import React from "react";
import "../../../App.css";
import {HeroHeader} from "../../../components/HeroHeader/HeroHeader.tsx";
import RichText from "../../../components/RichText/RichText.tsx";
import RichTextList from "../../../components/RichText/RichTextList.tsx";
import {RichTextParagraph} from "../../../components/RichText/RichTextParagraph.tsx";
import {ArticleContent} from "../../../components/Article/ArticleContent.tsx";
import PageProgress from "../../../components/Article/PageProgress.tsx";
import {RichTextHeading2} from "../../../components/RichText/RichTextHeading2.tsx";

export const NonUnionAABPActraApprenticeActraFullExplanation: React.FC = () => {
    const infoRef = React.useRef<HTMLDivElement>(null);
    const pageRef = React.useRef<HTMLDivElement>(null);
    const title = "Non-union, AABP, ACTRA Apprentice and ACTRA Full explanation";

    return (
        <>
            <div ref={pageRef} className={"PrintArea__print-area"}>
                <HeroHeader eyebrow="Information" title={title} />
                <div ref={infoRef} className="Information__content-wrapper">
                    <ArticleContent pageUpLink={{title: "Actors Guide", href: "/actors-guide"}} articleDetails={{readTime: 4}}>
                        <RichText>
                            <RichTextHeading2 text="Types of background performers" />
                            <RichTextList>
                                <li>Standard Background: General extras — no lines or special skills required.</li>
                                <li>SSE (Special Skills Extra): Performers with specific skills (e.g., boating, diving, etc.).</li>
                                <li>Photo Doubles: Used to substitute for an actor in wide or distant shots.</li>
                                <li>Stand-In: Used to replace the main actor during lighting and camera setup.</li>
                            </RichTextList>
                            <RichTextParagraph text="If you don’t have prior experience as a Stand-In or Photo Double, your chances of being booked for these roles are significantly lower." />

                            <RichTextHeading2 text="What’s the difference between union and non-union" />
                            <RichTextList>
                                <li>Union (ACTRA – Full Member / Apprentice): The union protects actors’ rights, ensures better working conditions, and offers higher pay.</li>
                                <li>AABP (Actra Additional Background Performer): This category is part of the union but considered an entry-level stage. AABP performers are covered by union protections but do not receive higher pay or overtime rates.</li>
                                <li>Non-Union (CASH): If you are not a union member, you work at the basic rate and do not receive union protections or benefits.</li>
                            </RichTextList>

                            <RichTextHeading2 text="Why join the union" />
                            <RichTextParagraph text="It gives you more rights:" />
                            <RichTextList>
                                <li>Safer working conditions</li>
                                <li>Fair pay</li>
                                <li>Opportunities for growth as a background performer</li>
                            </RichTextList>

                            <RichTextHeading2 text="AABP (Actra Additional Background Performer)" />
                            <RichTextParagraph text="How to join:" />
                            <RichTextList>
                                <li>Confirm that you have worked 15 days as a background performer within the past 12 months.</li>
                                <li>Send your proof to the email address listed on the ACTRA Toronto website.</li>
                                <li>Provide documentation confirming Canadian citizenship or permanent resident status.</li>
                            </RichTextList>
                            <RichTextParagraph text="Additional notes:" />
                            <RichTextList>
                                <li>Once you become a Full Member, you are expected to only work on ACTRA-approved union productions</li>
                                <li>Union members are held to a higher standard of professional conduct under union rules</li>
                            </RichTextList>

                            <RichTextHeading2 text="Apprentice (ACTRA Apprentice Member)" />
                            <RichTextParagraph text="How to become an Apprentice:" />
                            <RichTextList>
                                <li>You must have one qualifying credit.</li>
                                <li>Or, if you are an AABP member, you can qualify by accumulating 1,600 work hours.</li>
                                <li>After earning three work credits, you may apply for Full Member status.</li>
                            </RichTextList>
                            <RichTextParagraph text="Rights and privileges:" />
                            <RichTextList>
                                <li>Apprentice members can work on ACTRA productions and attend union meetings</li>
                                <li>They do not have access to insurance or pension benefits.</li>
                            </RichTextList>
                            <RichTextParagraph text="Restrictions:" />
                            <RichTextList>
                                <li>Apprentice members are not allowed to work on Non-Union productions.</li>
                            </RichTextList>
                            <RichTextParagraph text="Additional notes:" />
                            <RichTextList>
                                <li>Once you become a Full Member, you are expected to only work on ACTRA-approved union productions</li>
                                <li>Union members are held to a higher standard of professional conduct under union rules</li>
                            </RichTextList>

                            <RichTextHeading2 text="Full ACTRA Member" />
                            <RichTextParagraph text="Requirements to become a Full Member:" />
                            <RichTextList>
                                <li>Earn three qualifying ACTRA work credits as an Apprentice member</li>
                                <li>Maintain good standing with ACTRA</li>
                                <li>Pay the full membership initiation fee (check current rate with ACTRA Toronto)</li>
                                <li>Must be a Canadian citizen or permanent resident</li>
                            </RichTextList>
                            <RichTextParagraph text="Rights and benefits:" />
                            <RichTextList>
                                <li>Full access to all ACTRA contracts</li>
                                <li>Health and insurance benefits, including access to ACTRA's Health and Welfare Trust</li>
                                <li>Pension contributions begin</li>
                                <li>Voting rights at union meetings and participation in ACTRA’s decision-making</li>
                                <li>Higher hourly/daily wages on union sets</li>
                                <li>Eligible for a wider range of roles, including principal and speaking roles</li>
                            </RichTextList>
                            <RichTextParagraph text="Additional notes:" />
                            <RichTextList>
                                <li>Once you become a Full Member, you are expected to only work on ACTRA-approved union productions</li>
                                <li>Full members are held to a higher standard of professional conduct under union rules</li>
                            </RichTextList>

                            <RichTextHeading2 text="How to become a member of ACTRA Toronto (actors’ union)" />
                            <RichTextParagraph text="To join the union, you must be a Canadian citizen or have permanent resident status." />
                            <RichTextParagraph text="Ways to join as a Full Member:" />
                            <RichTextList>
                                <li>Graduates of acting schools or universities may apply 60 days after graduation by submitting a diploma.</li>
                                <li>Book a credited role in a production covered by ACTRA (Union production).</li>
                                <li>Join the AABP (Actra Additional Background Performer Program) and complete the requirements to move to Apprentice level (1,600 work hours).</li>
                                <li>Transfer through agreements with other unions, especially when relocating from another province.</li>
                            </RichTextList>
                        </RichText>

                    </ArticleContent>
                </div>
            </div>
            <PageProgress targetRef={infoRef} title={title}/>
        </>
    )
}