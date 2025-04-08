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

interface HomeProps extends CommonProps {
    isDesktop: boolean
}

const Home : React.FC<HomeProps> = ({isDesktop}) => {

    return (
        <>
            <HeaderBanner image={"https://www.aoshearman.com//_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fallenoveryllp1-aoshearmanwe0db-production-ecf3%2Fmedia%2Fproject%2Faoshearman%2Faoshearman%2Fhomepage%2Fcdd-1124-027856_image_2-web1.png%3Fh%3D1568%26iar%3D0%26w%3D1319&w=1080&q=75"}
                          imageAlt={"Man standing at the top of the mountain and looking in the telescope"}
                          eyebrow={"DEMYSTIFYING DECARBONIZATION"}
                          title={"How big is the net zero financing gap?"}
                          description={"Better climate finance data can help investors and policymakers make better decisions. As COP29 begins in Baku, our landmark study reveals the amount of capital needed to decarbonize the global economy."}
            />

            <ElevatorText text="See why we are uniquely equipped to support global businesses in a fast-changing world." buttonText="Read more" buttonLink="/about-us"></ElevatorText>

            <ResultsList
                eyebrow="Spotlight on"
                title="Universal simplicity"
                children={[
                    {
                        title: "Casting",
                        carousel: <ResultsListCarousel isDesktop={isDesktop} props={[
                            {
                                category: "Reliability",
                                title: "The first completely automated background agency in Canada",
                                description: "Eliminating human error and reducing time costs to efficiently cover every production day",
                                imageSrc: "https://www.aoshearman.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fallenoveryllp1-aoshearmanwe0db-production-ecf3%2Fmedia%2Fproject%2Faoshearman%2Faoshearman%2Finsights%2Fgeneral-images%2Fgettyimages-1427461072_bwresized.jpg%3Fh%3D1063%26iar%3D0%26w%3D1600&w=1920&q=75",
                                imageAlt: "Man standing at the top of the mountain and looking in the telescope"
                            },
                            {
                                category: "Convenience",
                                title: "Effortless start with an intuitive interface",
                                description: "An easy-to-use platform with a seamless interface, designed to get you up and running quickly without any hassle",
                                imageSrc: "https://www.aoshearman.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fallenoveryllp1-aoshearmanwe0db-production-ecf3%2Fmedia%2Fproject%2Faoshearman%2Faoshearman%2Finsights%2Ffinance%2Fbr39756ldncwwaogi155438452rgb.jpg%3Fh%3D1063%26iar%3D0%26w%3D1600&w=1920&q=75",
                                imageAlt: "Man standing at the top of the mountain and looking in the telescope"
                            },
                            {
                                category: "Efficiency",
                                title: "Lightning-fast response times with automated booking",
                                description: "Streamlining the process by removing the middleman, allowing casting to work directly with the system for more efficient bookings every time",
                                imageSrc: "https://www.aoshearman.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fallenoveryllp1-aoshearmanwe0db-production-ecf3%2Fmedia%2Fproject%2Faoshearman%2Faoshearman%2Fblogs%2Fimages%2Fon-tech%2Fgettyimages-88586616_bw.jpeg%3Fh%3D1066%26iar%3D0%26w%3D1600&w=1920&q=75",
                                imageAlt: "Man standing at the top of the mountain and looking in the telescope"
                            }
                        ]}/>
                    },
                    {
                        title: "Performers",
                        carousel: <ResultsListCarousel isDesktop={isDesktop} props={[
                            {
                                category: "q",
                                title: "The first completely automated background agency in Canada",
                                description: "Eliminating human error and reducing time costs to efficiently cover every production day",
                                imageSrc: "https://www.aoshearman.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fallenoveryllp1-aoshearmanwe0db-production-ecf3%2Fmedia%2Fproject%2Faoshearman%2Faoshearman%2Finsights%2Fgeneral-images%2Fgettyimages-1427461072_bwresized.jpg%3Fh%3D1063%26iar%3D0%26w%3D1600&w=1920&q=75",
                                imageAlt: "Man standing at the top of the mountain and looking in the telescope"
                            },
                            {
                                category: "w",
                                title: "Effortless start with an intuitive interface",
                                description: "An easy-to-use platform with a seamless interface, designed to get you up and running quickly without any hassle",
                                imageSrc: "https://www.aoshearman.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fallenoveryllp1-aoshearmanwe0db-production-ecf3%2Fmedia%2Fproject%2Faoshearman%2Faoshearman%2Finsights%2Fgeneral-images%2Fgettyimages-1427461072_bwresized.jpg%3Fh%3D1063%26iar%3D0%26w%3D1600&w=1920&q=75",
                                imageAlt: "Man standing at the top of the mountain and looking in the telescope"
                            },
                            {
                                category: "e",
                                title: "Lightning-fast response times with automated booking",
                                description: "Streamlining the process by removing the middleman, allowing casting to work directly with the system for more efficient bookings every time",
                                imageSrc: "https://www.aoshearman.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fallenoveryllp1-aoshearmanwe0db-production-ecf3%2Fmedia%2Fproject%2Faoshearman%2Faoshearman%2Finsights%2Fgeneral-images%2Fgettyimages-1427461072_bwresized.jpg%3Fh%3D1063%26iar%3D0%26w%3D1600&w=1920&q=75",
                                imageAlt: "Man standing at the top of the mountain and looking in the telescope"
                            }
                        ]}/>
                    }
                ]}
            />

            <ContentBlockWrapper>
                <SignpostPromo>
                    <SignpostPromoText eyebrow="Join our roster" title="No ordinary career" text="All the opportunities you would expect from a world-leading law firm. And some you might not. " button={{text: "Register", link: "http://localhost:3000/register"}}/>
                    <SignpostPromoAnimatedImage image="https://www.aoshearman.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fallenoveryllp1-aoshearmanwe0db-production-ecf3%2Fmedia%2Fproject%2Faoshearman%2Faoshearman%2Fcareers%2Fgettyimages-1283477396.jpg%3Fh%3D4026%26iar%3D0%26w%3D6039&w=3840&q=75"/>
                </SignpostPromo>
            </ContentBlockWrapper>
        </>
    );
}

export default Home;