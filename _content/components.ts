import dynamic from 'next/dynamic'

export const CONTENT_COMPONENTS = {
  Demo: dynamic(() => import('./posts/2020-03-09-moving-to-mdx/demo'))
}