import { useNavigate } from "react-router-dom"
import { HeroSection } from "../components/learnMore/HeroSection"
import { AboutProjectSection } from "../components/learnMore/AboutProjectSection"
import { FeaturesSection } from "../components/learnMore/FeaturesSection"
import { UserRolesSection } from "../components/learnMore/UserRolesSection"
import { LearningProcessSection } from "../components/learnMore/LearningProcessSection"
import { ResourceRepositorySection } from "../components/learnMore/ResourceRepositorySection"
import { SignupCTASection } from "../components/learnMore/SignupCTASection"
import FooterSection from "../components/common/Footer/footer"
import { LearnMoreNavbar } from "../components/learnMore/LearnMoreNavbar"

export default function LearnMorePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LearnMoreNavbar handleBack={() => navigate("/home")} />
      <main>
        <HeroSection />
        <AboutProjectSection />
        <FeaturesSection />
        <UserRolesSection />
        <LearningProcessSection />
        <ResourceRepositorySection />
        <SignupCTASection onSignup={() => navigate("/register")} />
      </main>
      <FooterSection />
    </div>
  )
}
