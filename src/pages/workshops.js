import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled, {
  up,
  css,
  keyframes,
  Box,
  useColorMode,
} from '@xstyled/styled-components'
import { Seo } from '../containers/Seo'
import { ReviewCard } from '../components/ReviewCard'
import { SectionTitle, SectionDescription } from '../components/Section'
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
} from '../components/Card'
import { PageContainer } from '../components/Container'
import { WorkshopForm } from '../containers/WorkshopForm'
import { AdvancedReactLogo } from '../components/AdvancedReactLogo'
import reviews from '../../data/reviews.en.json'

const clients = [
  {
    name: 'Le Monde',
    slug: 'le-monde',
  },
  {
    name: 'Canal Plus',
    slug: 'canal-plus',
  },
  {
    name: 'Doctolib',
    slug: 'doctolib',
  },
  {
    name: 'Welcome to the Jungle',
    slug: 'welcome-to-the-jungle',
  },
  {
    name: 'Alan',
    slug: 'alan',
  },
  {
    name: 'Scaleway',
    slug: 'scaleway',
  },
  {
    name: 'Sncf',
    slug: 'sncf',
  },
]

const rotation = keyframes`
  from {
    transform: translate(20%, 50%) perspective(200px) rotate(-20deg);
  }

  to {
    transform: translate(20%, 50%) perspective(200px) rotate(-5deg) rotateY(-5deg) scale(0.95);
  }
`

const rotationMd = keyframes`
  from {
    transform: translate(20%, -32%) perspective(200px) rotate(-20deg);
  }

  to {
    transform: translate(20%, -32%) perspective(200px) rotate(-5deg) rotateY(-5deg) scale(0.95);
  }
`

const Logo = styled(AdvancedReactLogo)`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: auto;
  transform: translate(20%, 30%);
  animation: ${rotation} 5s ease-in-out infinite;
  animation-direction: alternate-reverse;

  ${up(
    'md',
    css`
      animation-name: ${rotationMd};
    `,
  )}
`

const WorkshopTitle = styled.h2`
  margin: 0;
  font-size: 50;
  color: lighter;
`

const ClientLogoImg = styled(Img)`
  &.mode-dark {
    filter: brightness(0) invert(1);
  }

  &.mode-light {
    filter: brightness(0);
  }
`

function Clients({ clientLogos }) {
  const [colorMode] = useColorMode()

  return (
    <Box row m={-2} justifyContent="space-around">
      {clients.map((client) => {
        const logo = clientLogos.edges.find((edge) =>
          edge.node.relativePath.includes(client.slug),
        )
        return (
          <Box key={client.slug} col="auto" p={2}>
            <ClientLogoImg
              className={`mode-${colorMode}`}
              alt={client.name}
              fixed={logo.node.childImageSharp.fixed}
            />
          </Box>
        )
      })}
    </Box>
  )
}

function Reviews({ avatars }) {
  return (
    <Box row m={-3} my={4} justifyContent="center">
      {reviews.map((review, index) => {
        const edge = avatars.edges.find((edge) =>
          edge.node.relativePath.includes(review.slug),
        )
        return (
          <Box key={index} col={{ xs: 1, md: 1 / 2 }} p={3}>
            <ReviewCard
              review={{ ...review, avatar: edge.node.childImageSharp }}
            />
          </Box>
        )
      })}
    </Box>
  )
}

export default function Workshops() {
  const data = useStaticQuery(graphql`
    query {
      avatars: allFile(filter: { relativePath: { glob: "avatars/*" } }) {
        edges {
          node {
            relativePath
            childImageSharp {
              fixed(height: 60) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }

      clientLogos: allFile(filter: { relativePath: { glob: "clients/*" } }) {
        edges {
          node {
            relativePath
            childImageSharp {
              fixed(height: 20) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `)

  return (
    <>
      <Seo title="React Hooks Workshop by Greg Bergé" />
      <PageContainer>
        <SectionTitle>Experience</SectionTitle>
        <SectionDescription>
          Here are a list of some of my past <strong> experiences</strong> and <strong> awards</strong> .
        </SectionDescription>
        <Card as="section" my={5} overflow="hidden" position="relative">
          <CardBody>
            <div>
              <CardTitle>Product Intern - GPTZero AI(May 2023 - August 2023) </CardTitle>
              <p>
              I contributed to product design, lead marketing initiatives, as well as conducted user interviews with target users, relaying recommendations to the design and product teams of GPTZero, an AI edtech start-up with $3.5 million in funding.
              </p>
              <ul>
                <li>Worked on the product team to design new features</li>
                <li>Wrote a weekly newsletter for 45 000 subscribers</li>
                <li>Conducted product beta tests and user interviews</li>
                <li>Published blog posts about the progress in AI in education</li>
              </ul>
            </div>
          </CardBody>
        </Card>
        <Card as="section" my={5} overflow="hidden" position="relative">
          <CardBody>
            <div>
              <CardTitle>Data Science and Machine Learning Intern - Oxford Clinical Research Unit (July 2023 - August 2023)</CardTitle>
              <p>
              I used descriptive statistics and machine learning algorithms to analyze 300-patient data sets and identify factors contributing to patient outcomes in Hanoi's National Hospital for Tropical Disease. 
              </p>
              <ul>
                <li>Used R to conduct descriptive statistics and multivariate linear and logistic regressions</li>
                <li>Cleaned and organized 300-patient dataset</li>
                <li>Shared findings with Oxford University research institutions</li>
              </ul>
            </div>
          </CardBody>
        </Card>
        <Card as="section" my={5} overflow="hidden" position="relative">
          <CardBody>
            <div>
              <CardTitle>Research Intern - ARiEAL Laboratory, McMaster University(July 2022 - August 2022)</CardTitle>
              <p>
              I conducted literature reviews about the event-related potential (ERP) EEG analysis technique when applied to cognitive linguistics EEG experiments.
              I contributed to the design of research-grade experimentation seeking out how to preserve the teaching of indigenous languages in Ontario.
              </p>
              <ul>
                <li>Identified optimal impedance levels for research-grade EEG use</li>
                <li>Identified optimal experiment design for syntactic EEG P600 experimentation</li>
                <li>Helped design and conduct pilot study</li>
              </ul>
            </div>
          </CardBody>
        </Card>
        <Card as="section" my={5} overflow="hidden" position="relative">
          <CardBody>
            <div>
              <CardTitle>Software Development Intern - Hybrid Biomedical Optics Laboratory at York University (June 2021 - August 2021)</CardTitle>
              <p>
              I interned to help in the creation of an immunoassay bodily fluid THC detection device.
              </p>
              <ul>
                <li>Manipulated back-end C++ code of SeekThermal infrared cameras</li>
                <li>Used Python to help design and program an interactive user interface prototype for the THC detection device</li>
                <li>Researched C++ libraries for next steps in device development</li>
              </ul>
            </div>
          </CardBody>
        </Card>
        <Card as="section" my={5} overflow="hidden" position="relative">
          <CardBody>
            <div>
              <CardTitle>President - Princeton University Neurotech Club (October 2022 - Present) </CardTitle>
              <p>
              I am president of Princeton University's Neurotech Club.
              </p>
              <ul>
                <li>3D-prints and assembles 16-channel OpenBCI EEG device </li>
                <li>Tinkers with Muse headsets</li>
                <li>Hosts wokshops, lessons, and get-togethers</li>
              </ul>
            </div>
          </CardBody>
        </Card>
        <Card as="section" my={5} overflow="hidden" position="relative">
          <CardBody>
            <div>
              <CardTitle>Other Princeton University Extracurriculars </CardTitle>
              <ul>
                <li>Princeton AI Club - Officer</li>
                <li>Princeton Blockchain Club - Officer</li>
                <li>Prospect Student Ventures - Analyst</li>
                <li>Bioventures Alimtas - Member</li>
                <li>Entrepreneurship Club: Forge - Member</li>
              </ul>
            </div>
          </CardBody>
        </Card>
        <Card as="section" my={5} overflow="hidden" position="relative">
          <CardBody>
            <div>
              <CardTitle>Awards</CardTitle>
              <ul>
                <li>Finalist at Princeton 2023 Pitch Competition (April 2023)</li>
                <li>1st place at Junior Achievement Americas (Competed Against 21 Nationally-Placing Teams from 11 countries), International</li>
                <li>$10 000 Youth Impact Challenge Winner (August 2021), National</li>
                <li>$5000 DMZ Basecamp Champion (August 2020), International</li>
                <li>Canada-Wide Science Fair, Winner of Silver Excellence in Senior category, UofT Engineering Award ($1000 Prize; $11 000 in scholarships)</li>
                <li>1st Place HOSA Nationals FLC in Medical Innovation (December 2020), National</li>
                <li>Best Pitch - RBC Ideathon Pitch Competition (August 2019)</li>
                <li>Winner - The University of Toronto's Women in Science and Engineering Design Competition </li>
              </ul>
            </div>
          </CardBody>
        </Card>
        
        
        
      </PageContainer>
    </>
  )
}
