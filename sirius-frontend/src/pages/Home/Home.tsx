import React from "react";
import HeaderBanner from "../../components/HeaderBanner/HeaderBanner.tsx";
import ContentBlockWrapper from "../../components/ContentBlockWrapper/ContentBlockWrapper.tsx";
import ResultsList from "../../components/ResultsList/ResultsList.tsx";
import ResultsListCarousel from "../../components/ResultsList/ResultsListCarousel.tsx";
import Spacer from "../../components/Spacer/Spacer.tsx";
import {CommonProps} from "../../props/Common.tsx";
import {SignpostPromo} from "../../components/SignpostPromo/SignpostPromo.tsx";
import SignpostPromoText from "../../components/SignpostPromo/SignpostPromoText.tsx";
import {SignpostPromoAnimatedImage} from "../../components/SignpostPromo/SignpostPromoAnimatedImage.tsx";
import {Directory} from "../../components/Directory/Directory.tsx";
import Signpost from "../../components/Signpost/Signpost.tsx";
import ElevatorText from "../../templates/ElevatorText/ElevatorText.tsx";
import SignpostNavigation from "../../components/Signpost/SignpostNavigation.tsx";
import {SignpostNavigationDummyData} from "../../dummy-data/SignpostNavigationDummyData.tsx";
import SecondaryButton from "../../components/Button/SecondaryButton.tsx";
import PrimaryButton from "../../components/Button/PrimaryButton.tsx";

interface HomeProps extends CommonProps {
    isDesktop: boolean
}

const Home : React.FC<HomeProps> = ({isDesktop}) => {

    return (
        <>
            <HeaderBanner image={"https://res.cloudinary.com/da7bqrpqb/image/upload/v1745092089/website-pictures/wwynrqk2pw8befv42hew.webp"}
                          imageAlt={"Man standing at the top of the mountain and looking in the telescope"}
                          eyebrow={"REDEFINING BACKGROUND WORK"}
                          title={"Who’s really behind every great scene?"}
                          description={"Smart systems, faster payments, and real support for performers. Sirius Talent is what we wish existed when we started. Now it does."}
            />

            {/*<ElevatorText text="See why we are uniquely equipped to support global businesses in a fast-changing world." buttonText="Read more" buttonLink="/about-us"></ElevatorText>*/}

            <ResultsList
                eyebrow="Spotlight on"
                title="Universal simplicity"
                children={[
                    {
                        title: "Performers",
                        carousel: <ResultsListCarousel isDesktop={isDesktop} props={[
                            {
                                category: "Reliability",
                                title: "The first completely automated background agency in Canada",
                                description: "Eliminating human error and reducing time costs to efficiently cover every production day",
                                imageSrc: "https://res.cloudinary.com/da7bqrpqb/image/upload/v1745092089/website-pictures/bzeouxtacjqypln02td4.webp",
                                imageAlt: "Man standing at the top of the mountain and looking in the telescope"
                            },
                            {
                                category: "Convenience",
                                title: "Effortless start with an intuitive interface",
                                description: "An easy-to-use platform with a seamless interface, designed to get you up and running quickly without any hassle",
                                imageSrc: "https://res.cloudinary.com/da7bqrpqb/image/upload/v1745092089/website-pictures/ypxzivo5lnmxgdakjz0d.webp",
                                imageAlt: "Abstract grey illustration of architectural pattern"
                            },
                            {
                                category: "Efficiency",
                                title: "Lightning-fast response times with automated booking",
                                description: "Streamlining the process by removing the middleman, allowing casting to work directly with the system for more efficient bookings every time",
                                imageSrc: "https://res.cloudinary.com/da7bqrpqb/image/upload/v1745092089/website-pictures/cfhdj7mkdmieuetklaeg.webp",
                                imageAlt: "Man shoulder in a black striped tuxedo"
                            }
                        ]}/>
                    }
                ]}
            />
            <Spacer/>

            <Signpost title="Navigate your work on set"
                      text="From union status and agency rules to payments and paperwork — our information hub helps Toronto background actors stay prepared, compliant, and confident on every production."
                      eyebrow="INFORMATION" button={<PrimaryButton text="Full guide" href="/"/>}>
                <SignpostNavigation navigationList={SignpostNavigationDummyData}/>
            </Signpost>

                <SignpostPromo>
                    <SignpostPromoText eyebrow="Join us" title="No ordinary gig" text="All the opportunities you’d expect from a leading background talent agency - and a few you wouldn’t. " button={{text: "Register", link: "https://siriustalent.ca/registration"}}/>
                    <SignpostPromoAnimatedImage image="https://res.cloudinary.com/da7bqrpqb/image/upload/v1745092088/website-pictures/kkaikyx6tio1hgmvcoim.webp"/>
                </SignpostPromo>
        </>
    );
}

export default Home;