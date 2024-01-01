import React from 'react'
import { graphql } from 'gatsby'
import { SectionTitle, SectionDescription } from '../components/Section'
import { PageContainer } from '../components/Container'
import { LatestArticles } from '../containers/LatestArticles'
import { Seo } from '../containers/Seo'

export default function Blog({ data }) {
  return (
    <>
      <Seo title="Jin Schofield — Blog" />
      <PageContainer>
        <SectionTitle>Blog</SectionTitle>
        <SectionDescription>
          Check out my current substack blog <a href="https://jinschofield.substack.com/"><strong><u>here</u></strong></a>.
          <br></br><br></br>
          You can also check out my old personal website <a href="https://jinschofield.wordpress.com/"><strong><u>here</u></strong></a> (it has a lot of creative writing and a map of where I've travelled!) and an archive of my old blog posts <a href="https://drive.google.com/drive/folders/1wV2xIEoVyFOZ-db18BvUNSKjrN4PCMk0?usp=drive_link"><strong><u>here</u></strong></a>!
        </SectionDescription>
      </PageContainer>
    </>
  )
}

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { published: { ne: false } }
        fields: { langKey: { eq: "en" } }
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
