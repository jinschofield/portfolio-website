import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { SectionTitle, SectionDescription } from '../components/Section'
import { Container } from '../components/Container'
import { Seo } from '../containers/Seo'
import { AboutContainer, AboutText, AboutImage } from '../containers/About'

export default function AboutPage() {
  const data = useStaticQuery(graphql`
    query {
      photo: file(relativePath: { eq: "react-europe.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 5000) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)
  return (
    <>
      <Seo title="About Jin Schofield" />
      <AboutContainer>
        <Container>
          <SectionTitle>Hi I&#39;m Jin!</SectionTitle>
          <SectionDescription>
            I&#39;m studying computer science at Princeton. I update this website with projects I've been working on, things I am learning about in my blog, and experiences I have had!
            You can download my resume <a href="https://docs.google.com/document/d/1EqM_QyBgrJ9MmGcO9X_MxrWknADoW0WvGyxmj2btwJo/edit?usp=sharing"><strong><u>here</u></strong></a>.
          </SectionDescription>
        </Container>
        <AboutImage img={data.photo.childImageSharp} />
      </AboutContainer>
    </>
  )
}


