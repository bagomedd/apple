//@ts-ignore 
import { TopUI } from "@components/Layout/TopUI.tsx";
//@ts-ignore
import { InnovationLayout } from "@components/Layout/InnovationLayout";
//@ts-ignore 
import { HeroProductLayout } from "@components/Layout/HeroProductLayout";
//@ts-ignore
import { TVCarousel } from "@components/Layout/TVCarousel";
//@ts-ignore
import { HeroFooter } from "@components/Layout/HeroFooter";

export function HeroPage() {
    return (
        <>
            <TopUI />
            <InnovationLayout />
            <HeroProductLayout />
            <TVCarousel />
            <HeroFooter />
        </>
    )
}
