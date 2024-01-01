import React from 'react'
import { graphql } from 'gatsby'
import { SectionTitle } from '../components/Section'
import { Container } from '../components/Container'
import { Hero, HeroIntro, HeroTitle, HeroTeaser } from '../containers/Hero'
import { LatestArticles } from '../containers/LatestArticles'
import { Seo } from '../containers/Seo'
import AboutPage from './about'
import WorkshopPage from './workshops'
import ProjectsPage from './projects'
import BlogPage from './blog'

export default function IndexPage({ data }) {
  return (
    <>
      <Hero>
        <Seo />
        <HeroIntro>Hi there! I'm </HeroIntro>
        <HeroTitle>
          <strong>Jin Schofield.</strong>
          <br />I'm chasing my curiosity.
        </HeroTitle>
        <HeroTeaser>
          I'm a computer science student at Princeton. I'm fascinated by how AI, neurotechnology, and AR will impact the future.
        </HeroTeaser>
      </Hero>
      <AboutPage />
      <WorkshopPage />
      <ProjectsPage />
      <BlogPage /> 
    </>
  )
}

export const pageQuery = graphql`
  query($langKey: String!) {
    allMdx(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { published: { ne: false } }
        fields: { langKey: { eq: $langKey } }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 190)
          id
          fields {
            link
          }
          frontmatter {
            title
            slug
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
