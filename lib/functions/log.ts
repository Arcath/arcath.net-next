import chalk from 'chalk'

export const log = (namespace: string, message: string) => {
  if (process.env.NODE_ENV === 'development')
    console.log(`${chalk.blue(namespace.padEnd(5, ' '))} - ${message}`)
}
