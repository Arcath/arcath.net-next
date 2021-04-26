import React from 'react'
import {GetStaticPropsContext, NextPage, InferGetStaticPropsType} from 'next'
import Link from 'next/link'
import Head from 'next/head'
import {groupedBy} from '@arcath/utils'

import {getProjects} from '~/lib/data/projects'

import {Layout} from '~/lib/components/layout'
import {OpenGraph} from '~/lib/components/open-graph'

import {pageTitle} from '~/lib/functions/page-title'

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const projects = await getProjects(['title', 'href', 'lead', 'year'], {limit: false})

  return {
    props: {
      projects: groupedBy('year', projects)
    }
  }
}

const BooksPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({projects}) => {
  return <Layout>
    <Head>
      <title>{pageTitle('Projects')}</title>
    </Head>
    <OpenGraph title={`Projects`} description={`Projects`} />
    <div className="grid grid-cols-content prose dark:prose-dark max-w-none">
      {Object.keys(projects).map((year, i) => {
        return [
          <h2 key={i} className="col-start-3">{year}</h2>,
          projects[year].map((project, j) => {
            return [
              <h3 key={`h2-${j}`} className="col-start-3">
                <Link href={project.href}>
                  <a>{project.title}</a>
                </Link>
              </h3>,
              <p key={`p-${j}`} className="col-start-3">{project.lead}</p>
            ]
          })
        ]
      })}
    </div>
  </Layout>
}

export default BooksPage