import React from 'react'
import Hero from './Hero'
import StatsSection from './StatsSection'
import AnalysisSection from './AnalysisSection'
import AboutSection from './AboutSection'
import CourseList from './CourseList'
import SignalSection from './SignalSection'
import TeamSection from './TeamSection'
import PsychologySection from './PsychologySection'
import BlogSection from './BlogSection'
import NewsletterSection from './NewsletterSection'
import { getHomePage } from '@/lib/payload'
import { getServerLocale } from '@/lib/locale'

const HomeSections = async () => {
  const locale = await getServerLocale()
  const home = await getHomePage({ locale })

  return (
    <>
      {home && (
        <>
          <Hero data={home} />
          <div id="stats"><StatsSection items={home.statsSection.items} /></div>
          <div id="analysis"><AnalysisSection data={home.analysisSection} /></div>
          <div id="about"><AboutSection data={home.aboutSection} /></div>
        </>
      )}
      <div id="courses">{home && <CourseList data={home.coursesSection} />}</div>
      {home && (
        <>
          <div id="signals"><SignalSection data={home.signalSection} /></div>
          <div id="team"><TeamSection data={home.teamSection} /></div>
          <div id="psychology"><PsychologySection data={home.psychologySection} /></div>
          <div id="blog"><BlogSection data={home.blogSection} /></div>
          <NewsletterSection data={home.newsletterSection} />
        </>
      )}
    </>
  )
}

export default HomeSections
