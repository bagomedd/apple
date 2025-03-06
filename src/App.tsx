//@ts-ignore
import { HeroPage } from "@pages/HeroPage.tsx";
//@ts-ignore
import { NotFoundPage } from "@pages/NotFoundPage.tsx";
//@ts-ignore
import { RegisterPage } from "@pages/RegisterPage.tsx";
import { Routes, Route } from 'react-router';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
export { App }
