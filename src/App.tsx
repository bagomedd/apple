//@ts-ignore 
import { TopUI } from "@components/Layout/TopUI.tsx";
//@ts-ignore
import { InnovationLayout } from "@components/Layout/InnovationLayout";
//@ts-ignore 
import { HeroProductLayout } from "@components/Layout/HeroProductLayout";
import { TVCarousel } from "./Components/Layout/TVCarousel";
function App() {
  return (
    <>
      <TopUI />
      <InnovationLayout />
      <HeroProductLayout />
      <TVCarousel />
    </>
  )
}
export { App }
