import {GetStaticPropsContext, NextPage, GetStaticPaths, InferGetStaticPropsType} from 'next'

import {getProjects, getProjectBySlug} from '~/lib/data/projects'

import {Content} from '~/lib/components/mdx'
import {Layout} from '~/lib/components/layout'
import {OpenGraph} from '~/lib/components/open-graph'

import {prepareMDX} from '~/lib/functions/prepare-mdx'

export const getStaticProps = async ({params}: GetStaticPropsContext) => {
  if(params?.slug && Array.isArray(params.slug)){
    const project = await getProjectBySlug(['projects', ...params.slug], ['slug', 'title', 'content', 'lead'])
    const source = await prepareMDX(project.content)

    return {
      props: {
        project,
        source
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getProjects(['slug'], {limit: false})

  const paths = projects.map(({slug}) => {
    return {params: {slug: [slug[1]]}}
  })

  return {
    paths,
    fallback: false
  }
}

const MDXProject: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({project, source}) => {
  return <Layout>
    <OpenGraph title={project.title} description={project.lead} />
    <Content source={source} heading={project.title} />
  </Layout>
}

export default MDXProject