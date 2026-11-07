import { Benefits } from '../components/home/Benefits'
import { Categories } from '../components/home/Categories'
import { Faq } from '../components/home/Faq'
import { FinalCta } from '../components/home/FinalCta'
import { Hero } from '../components/home/Hero'
import { HowItWorks } from '../components/home/HowItWorks'
import { ReportAnatomy } from '../components/home/ReportAnatomy'
import { useSeo } from '../lib/seo'

export default function Home() {
  useSeo({ path: '/' })
  return (
    <>
      <Hero />
      <Benefits />
      <HowItWorks />
      <ReportAnatomy />
      <Categories />
      <Faq />
      <FinalCta />
    </>
  )
}
