import React from "react";
import "../App.css";
import HeaderHub from "../components/HeaderHub/HeaderHub.tsx";
import RichText from "../components/RichText/RichText.tsx";
import {RichTextParagraph} from "../components/RichText/RichTextParagraph.tsx";
import {columnsStyle} from "../shared/columnsStyle.tsx";
import {RichTextHeading2} from "../components/RichText/RichTextHeading2.tsx";
import RichTextList from "../components/RichText/RichTextList.tsx";

const LicenseAgreement: React.FC = () => {
    return (
        <div style={{marginBottom: "100px", marginTop: "140px"}}>
            <HeaderHub title="License Agreement" text="Background actor license agreement for Sirius Talent Agency"/>

            <div className="Grid_grid__container Grid_grid__container__margin">
                <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 5, 13, 5, 13)}>
                    <RichText>
                        <RichTextParagraph
                            text={`This Agreement ("Agreement") is made between the background actor ("Actor") and Sirius Talent Agency ("Agency") and becomes effective upon the Actor's registration on the Agency's platform.`}/>

                        <RichTextHeading2 text="1. Subject of the Agreement"/>
                        <RichTextParagraph
                            text="The Actor grants the Agency permission to represent their interests in the film, television, and advertising industries under the terms specified below."/>

                        <RichTextHeading2 text="2. Agency's Obligations"/>
                        <RichTextList>
                            <li><strong>Information Provision:</strong> The Agency agrees to provide the Actor with
                                complete and
                                timely information regarding call times, shooting locations, shooting day conditions,
                                and other
                                relevant details.
                            </li>
                            <li><strong>Representation:</strong> The Agency represents the Actor's interests before
                                casting
                                directors and production companies.
                            </li>
                            <li><strong>Support for Newcomers:</strong> The Agency assists newcomers participating in
                                shoots for the
                                first time with on-set registration and completion of the initial voucher.
                            </li>
                        </RichTextList>

                        <RichTextHeading2 text="3. Actor's Obligations"/>
                        <RichTextList>
                            <li><strong>Commission Payment:</strong> The Actor agrees to promptly pay the Agency's
                                commission after receiving compensation.
                            </li>
                            <li><strong>Data Updates:</strong> The Actor must maintain up-to-date profile information,
                                including measurements, photographs, contact details, etc., upon any changes.
                            </li>
                            <li><strong>Booking Confirmations:</strong> Confirm call times promptly (both preliminary
                                and final).
                            </li>
                            <li><strong>Non-Union Testing:</strong> Actors with Non-Union status are required to undergo
                                mandatory testing upon registration to activate their account in the system.
                            </li>
                        </RichTextList>

                        <RichTextHeading2 text="4. Agency Commissions"/>
                        <RichTextParagraph
                            text="The Agency's commission is calculated based on the gross amount on the paycheque, plus 13% HST:"/>
                        <RichTextList>
                            <li>Non-Union and AABP: 10%</li>
                            <li>ACTRA Apprentice: 15%</li>
                            <li>ACTRA Full Member: 10%</li>
                            <li>SSE / Credit / Principal Roles: 15% (unless otherwise specified in the project
                                description)
                            </li>
                        </RichTextList>

                        <RichTextHeading2 text="5. Identification and Data"/>
                        <RichTextList>
                            <li><strong>Documents:</strong> The Actor provides valid identification documents and
                                authorizes the Agency to collect, process, and store personal data within the Agency's
                                operations.
                            </li>
                            <li><strong>Data Usage:</strong> All data is used exclusively for selecting and representing
                                the Actor for projects.
                            </li>
                        </RichTextList>

                        <RichTextHeading2 text="6. Responsibilities of the Parties"/>
                        <RichTextList>
                            <li><strong>Booking Quantity:</strong> The Agency is not responsible for the number of
                                bookings provided and does not guarantee regular work.
                            </li>
                            <li><strong>Third-Party Actions:</strong> The Agency is not liable for actions of third
                                parties, including film crews and casting directors, or situations arising on set.
                            </li>
                            <li><strong>Selection Decisions:</strong> All selection decisions are made solely by the
                                production or casting director.
                            </li>
                        </RichTextList>

                        <RichTextHeading2 text="7. Conduct and On-Set Etiquette"/>
                        <RichTextList>
                            <li><strong>Rule Compliance:</strong> The Actor agrees to adhere to conduct rules, be
                                punctual, and follow instructions from the film crew and Agency.
                            </li>
                            <li><strong>On-Set Photography:</strong> Photographing or recording videos on set is
                                prohibited.
                            </li>
                            <li><strong>Confidentiality:</strong> Sharing project information before the official
                                release, including plot, titles, participants, etc., is prohibited.
                            </li>
                        </RichTextList>

                        <RichTextHeading2 text="8. Penalties"/>
                        <RichTextList>
                            <li><strong>Delayed Commission Payment:</strong> More than 2 weeks after receiving payment —
                                $25 fine.
                            </li>
                            <li><strong>Booking Cancellation:</strong> Less than 24 hours before the shoot without a
                                valid reason — $25 penalty.
                            </li>
                            <li><strong>No-Show:</strong> Failure to show up for the shoot without notice and a valid
                                reason — $25 penalty. (If a valid reason is provided, the penalty may be waived at the
                                Agency’s discretion.)
                            </li>
                        </RichTextList>

                        <RichTextHeading2 text="9. Term and Termination"/>
                        <RichTextList>
                            <li><strong>Term:</strong> The Agreement becomes effective upon registration and remains in
                                force indefinitely until terminated by either party.
                            </li>
                            <li><strong>Termination by Actor:</strong> The Actor may terminate the Agreement at any time
                                through their profile or in writing. Termination takes effect after the account is
                                deactivated.
                            </li>
                            <li><strong>Termination by Agency:</strong> The Agency reserves the right to suspend or
                                terminate cooperation in case of Agreement violations or complaints from production.
                            </li>
                        </RichTextList>

                        <RichTextHeading2 text="10. Additional Agreement for Minors (Under 18 Years)"/>
                        <RichTextParagraph
                            text="If the Actor is under 18 years old, registration and participation in projects are possible only with written consent from a parent or legal guardian."/>
                        <RichTextParagraph text="Parent/Guardian Obligations:"/>
                        <RichTextList>
                            <li>Provide full name, as well as valid contact details (email address and phone number), to
                                which all information about bookings, call times, schedule changes, and other important
                                information will be duplicated.
                            </li>
                            <li>Provide copies of identification documents of the parent/guardian, as well as documents
                                confirming the right to represent the minor's interests (e.g., birth certificate or
                                guardianship document).
                            </li>
                            <li>Authorize the Agency to collect and store personal data of both the minor and the
                                parent/guardian, exclusively for organizing and supporting participation in shoots.
                            </li>
                            <li>Confirm or decline shoot offers on behalf of the minor participant.</li>
                            <li>Update the child's profile information upon changes (photos, measurements, contact
                                details, etc.).
                            </li>
                            <li>Ensure the child's timely arrival at shoots and monitor their adherence to on-set
                                conduct rules.
                            </li>
                        </RichTextList>
                        <RichTextParagraph
                            text="The parent/guardian agrees to the terms of this License Agreement on behalf of the minor, including provisions on commissions, responsibilities, penalties, conduct rules, as well as confidentiality and data processing."/>
                        <RichTextParagraph
                            text="By accepting this Agreement, the Actor (or parent/guardian) confirms that they have read, understand, and voluntarily agree to its terms."/>
                    </RichText>
                </div>
            </div>
        </div>
    );
};

export default LicenseAgreement