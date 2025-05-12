import React from "react";
import ProductionDayExplorer from "../components/ProductionDayExplorer/ProductionDayExplorer.tsx";
import ContentBlockWrapper from "../components/ContentBlockWrapper/ContentBlockWrapper.tsx";
import HeaderHub from "../components/HeaderHub/HeaderHub.tsx";
import CategoryGrid from "../components/CategoryGrid/CategoryGrid.tsx";

const OldCastingHome: React.FC = () => {
    return (
        <div>
            <ContentBlockWrapper>
                <HeaderHub title="Casting" text="Explore the views of the world's leading lawyers on the issues that matter for global business. "></HeaderHub>
            </ContentBlockWrapper>
            <ContentBlockWrapper>
                <ProductionDayExplorer/>
            </ContentBlockWrapper>
        </div>
    )
}

export default OldCastingHome