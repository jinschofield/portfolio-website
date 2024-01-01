import React from 'react'
import styled, {
  keyframes,
  th,
  css,
  Box,
  useColorMode,
} from '@xstyled/styled-components'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import humanNumber from 'human-number'
import { FaGithub } from 'react-icons/fa'
import { Seo } from './Seo'
import { SectionTitle, SectionDescription } from '../components/Section'
import { useLangKey } from '../components/I18nContext'
import { PageContainer } from '../components/Container'
import { ProjectShape } from '../components/Project'
import { Card, CardBody, CardText } from '../components/Card'

const rotateRight = keyframes`
  from {
    transform: rotate(0deg)
               perspective(200px)
               translateZ(-8px)
               rotateY(2deg)
               translate(0px)
               rotate(0deg);
  }
  to {
    transform: rotate(360deg)
               perspective(200px)
               translateZ(-8px)
               rotateY(2deg)
               translate(0px) 
               rotate(-360deg);
  }
`

const ProjectImageLink = styled.a`
  display: block;
  position: relative;
  width: 30%;
  padding-top: 3%;

  animation: ${rotateRight} 5s linear infinite;

  > svg {
    position: absolute;
    transition: base;
    top: 0;
    width: 118%;
    height: auto;
  }
`

const ProjectLabel = styled.div`
  font-family: monospace;
  font-size: 13;
  color: accent;
`

const ProjectTitle = styled.h3`
  margin: 0;
  font-weight: 500;
  font-size: 22;
  color: lighter;
  margin-bottom: 3;
  margin-right: 3;

  > a {
    transition: base;

    &:hover {
      color: accent;
    }
  }
`

const ProjectBody = styled.div`
  position: relative;
  z-index: 1;
  max-width: 70%;
  flex: 0 0 70%;
`

const ProjectTags = styled.ul`
  margin: 0;
  padding: 0;
  margin-top: 3;
  font-family: monospace;
`

const Project = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transition: base;

  ${(p) => {
    switch (p.position) {
      case 'right':
        return css`
          text-align: left;
          flex-direction: row-reverse;

          ${ProjectLabel}, ${ProjectTitle} {
            margin-left: 3;
          }

          ${ProjectTags} {
            margin-left: 2;
          }

          ${ProjectImageLink} {
            padding-right: 6.5%;
            animation-direction: normal;

            > svg {
              right: 0;
            }
          }

          ${ProjectImageLink}:hover > svg {
            transform: scale(1.05);
          }
        `
      case 'left':
      default:
        return css`
          text-align: right;
          flex-direction: row;

          ${ProjectLabel}, ${ProjectTitle} {
            margin-right: 3;
          }

          ${ProjectTags} {
            margin-right: 2;
          }

          ${ProjectImageLink} {
            padding-left: 6.5%;
            animation-direction: reverse;

            > svg {
              left: 0;
            }
          }

          ${ProjectImageLink}:hover > svg {
            transform: scale(1.05);
          }
        `
    }
  }}
`

const ProjectTag = styled.li`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: inline-block;
  font-size: 12;
  color: light400;
  padding: 0 2;

  a {
    transition: base;
    color: lighter;

    > svg {
      font-size: 18;
      vertical-align: middle;
    }

    &:hover {
      color: accent;
    }
  }
`

const shine = keyframes`
  0%, 20% { mask-position: -50%; }
  80%, 100% { mask-position: 150%; }
`

const pulse = keyframes`
  0% {
    text-shadow: 0 0 2px ${th.color('accent')};
  }
  
  20%, 60% {
    text-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  
  80% {
    text-shadow: 0 0 2px ${th.color('accent')};
  }
`

const ShineTag = styled(ProjectTag)`
  cursor: help;
  color: accent;
  mask-image: linear-gradient(
    -75deg,
    rgba(0, 0, 0, 0.6) 30%,
    #000 50%,
    rgba(0, 0, 0, 0.6) 70%
  );
  mask-size: 200%;
  animation: ${shine} 3s linear infinite, ${pulse} 3s infinite;
`

function ProjectDescription({ children }) {
  return (
    <Card>
      <CardBody>
        <CardText>{children}</CardText>
      </CardBody>
    </Card>
  )
}

const locales = {
  en: {
    stars: 'Number of stars on GitHub',
    downloads: 'Number of downloads by week',
  },
  fr: {
    stars: 'Nombre d’étoiles sur GitHub',
    downloads: 'Nombre de téléchargements par semaine',
  },
}

function ProjectTemplate({
  github,
  npm,
  position,
  label,
  title,
  url,
  description,
  tags,
  color,
  logo,
  stats = true,
}) {
  const langKey = useLangKey()
  const t = locales[langKey]
  const [data, setData] = React.useState(null)
  React.useEffect(() => {
    if (!stats) return
    Promise.all([
      github
        ? fetch(
            github.replace(
              'https://github.com',
              'https://api.github.com/repos',
            ),
          ).then((res) => res.json())
        : 0,
      fetch(
        `https://api.npmjs.org/downloads/point/last-week/${npm}`,
      ).then((res) => res.json()),
    ])
      .then(setData)
      .catch(() => {
        // ignore errors
      })
  }, [stats, npm, github])

  const stars = stats && github && (
    <ShineTag key="stars" title={t.stars}>
      ★{' '}
      {data
        ? `${humanNumber(Math.floor(data[0].stargazers_count / 100) * 100)}+`
        : '.'}
    </ShineTag>
  )

  const downloads = stats && (
    <ShineTag key="downloads" title={t.downloads}>
      ↓{' '}
      {data
        ? `${humanNumber(Math.floor(data[1].downloads / 1000) * 1000)}+`
        : '.'}
    </ShineTag>
  )

  const ghTag = github ? (
    <ProjectTag key="github">
      <a href={github}>
        <FaGithub />
      </a>
    </ProjectTag>
  ) : null

  return (
    <Project position={position}>
      <ProjectImageLink href={url}>
        <ProjectShape position={position} color={color} />
        <Img fluid={logo} />
      </ProjectImageLink>
      <ProjectBody>
        <ProjectLabel>{label}</ProjectLabel>
        <ProjectTitle>
          <a href={url}>{title}</a>
        </ProjectTitle>
        <ProjectDescription>{description}</ProjectDescription>
        <ProjectTags>
          {position === 'right' && ghTag}
          {position === 'right' && stars}
          {position === 'right' && downloads}
          {tags.map((tag, index) => (
            <ProjectTag key={index}>{tag}</ProjectTag>
          ))}
          {position === 'left' && downloads}
          {position === 'left' && stars}
          {position === 'left' && ghTag}
        </ProjectTags>
      </ProjectBody>
    </Project>
  )
}

function Projects({ data, projects }) {
  const [colorMode] = useColorMode()
  const regexp = new RegExp(`^projects/logo-(.*)-${colorMode}.png$`)
  const logos = data.allFile.edges.reduce((obj, edge) => {
    const matches = edge.node.relativePath.match(regexp)
    if (!matches) return obj
    obj[matches[1]] = edge.node.childImageSharp.fluid
    return obj
  }, {})
  const projectElements = [
    <ProjectTemplate
      logo={logos['smooth-doc']}
      label={projects['smooth-doc'].label}
      title="ConchShell"
      url="https://projectboard.world/ysc/project/conchshell-a-wearable-asl-translator-leveraging-novel-machine-learning-and-computer-vision"
      color="#667EEA"
      description={projects['smooth-doc'].description}
      tags={['PyTorch', 'MediaPipe', 'Python', 'Raspberry Pi']}
      stats={false}
    />,
    <ProjectTemplate
      logo={logos.svgr}
      label={projects.svgr.label}
      title="AIstotle"
      url="https://devpost.com/software/aistotle"
      color="#FF921B"
      description={projects.svgr.description}
      tags={['GPT-4', 'GPT-4 Vision', 'RAG', 'ElevenLabs']}
      stats={false}
    />,
    <ProjectTemplate
      logo={logos['loadable-components']}
      label={projects['loadable-components'].label}
      title="Determinants of Patient Outcomes of Blood Infections at the National Hospital of Tropical Disease"
      url="https://docs.google.com/document/d/1EfsoacVy-M_9rz7G0RSBWi4ILDxNI2zdcRU4w8KmXQk/edit?usp=sharing"
      color="#fff"
      description={projects['loadable-components'].description}
      tags={['R', 'Multivariate Linear Regression', 'Descriptive Statistics', 'Data Science']}
      stats={false}
    />,
    <ProjectTemplate
      logo={logos.xstyled}
      label={projects.xstyled.label}
      title="The Rise of Allergies: An Investigation on Why It Is Occurring and How to Stop It"
      npm="@xstyled/system"
      url="https://docs.google.com/document/d/1Fhql1ublvUhtkUOrgq_cgj34XomJ5IEv/edit?usp=sharing&ouid=101433469914745476431&rtpof=true&sd=true"
      color="#D646AA"
      description={projects.xstyled.description}
      tags={['SPSS', 'Multivariate Linear Regression', 'Multivariate Logistic Regression']}
      stats={false}
    />,
    <ProjectTemplate
      logo={logos['smooth-ui']}
      label={projects['smooth-ui'].label}
      title="An Assessment of the Significance of Various Air Pollutants on Public Health on a Global Scale"
      npm="@smooth-ui/core-sc"
      url="https://docs.google.com/document/d/15BErTM7eFen6zMz1GCEUHwk_cPpiVSYeIsSp7vlfWN8/edit?usp=sharing"
      color="#E00348"
      description={projects['smooth-ui'].description}
      tags={['Multivariate Linear Regression', 'Descriptive Statistics']}
      stats={false}
    />,
    <ProjectTemplate
      logo={logos.jamtemplates}
      label={projects.jamtemplates.label}
      title=" Determinants of Views on Euthanasia in Richmond Hill, Ontario"
      url="https://docs.google.com/document/d/1iwryTkbSZ3aF6C52MKYuzH9R3HkBWuDatyrbmym9WsM/edit?usp=sharing"
      color="#8aa5ff"
      description={projects.jamtemplates.description}
      tags={['Multivariate Linear Regression', 'Descriptive Statistics']}
      stats={false}
    />,
    /*
    <ProjectTemplate
      logo={logos['bundle-analyzer']}
      label={projects['bundle-analyzer'].label}
      title="Bundle Analyzer"
      color="#097dea"
      description={projects['bundle-analyzer'].description}
      tags={[' ', ' ', ' ']}
      stats={false}
    />,
    <ProjectTemplate
      logo={logos['jest-puppeteer']}
      label={projects['jest-puppeteer'].label}
      title="Jest Puppeteer"
      npm="jest-puppeteer"
      color="#FF5600"
      description={projects['jest-puppeteer'].description}
      tags={[' ', ' ', ' ']}
      stats={false}
    />,
    <ProjectTemplate
      logo={logos.shipit}
      label={projects.shipit.label}
      title="Shipit"
      npm="shipit-cli"
      color="#FBA919"
      description={projects.shipit.description}
      tags={[' ', ' ', ' ']}
      stats={false}
    />*/ ,
  ]
  return (
    <Box mt={5} row mb={{ xs: -4, md: -5 }}>
      {projectElements.map((project, index) => (
        <Box col={1} py={{ xs: 4, md: 5 }} key={index}>
          {React.cloneElement(project, {
            position: index % 2 === 0 ? 'left' : 'right',
          })}
        </Box>
      ))}
    </Box>
  )
}

export function ProjectsPageTemplate({ title, intro, projects }) {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativePath: { glob: "projects/logo-*" } }) {
        edges {
          node {
            relativePath
            childImageSharp {
              fluid(maxWidth: 180) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  `)
  return (
    <>
      <Seo title={`Jin Schofield — ${title}`} />
      <PageContainer>
        <SectionTitle>{title}</SectionTitle>
        <SectionDescription>{intro}</SectionDescription>
        <Projects data={data} projects={projects} />
      </PageContainer>
    </>
  )
}
