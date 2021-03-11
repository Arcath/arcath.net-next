import path from 'path'
import {bundleMDX} from 'mdx-bundler'
import remarkHighlight from 'remark-highlight.js'


export const prepareMDX = async (source: string, files?: Record<string, string>) => { 
  if(process.platform === "win32"){
    process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), 'node_modules', 'esbuild', 'esbuild.exe')
  }else{
    process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), 'node_modules', 'esbuild', 'bin', 'esbuild')
  }

  const {code} = await bundleMDX(source, {
    files,
    remarkPlugins: [
      remarkHighlight
    ]
  })

  return code
}