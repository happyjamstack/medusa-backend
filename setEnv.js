const { keys, cond, pipe, filter, omit, pick, isNotNil, isNotEmpty } = require('ramda')
const dotenv = require('@dotenvx/dotenvx')
const systemVars = { ...process.env }


const medusaEnv =
  (envPath) => {
    dotenv.config({path:envPath})
    dotenv.config({path:'.env.defaults'})
    const env = omit(keys(systemVars))(process.env)
    env['DEPLOY_ADMIN']  = process.env['DEPLOY_ADMIN']
    env['DEPLOY_SERVER'] = process.env['DEPLOY_SERVER']
    console.log('en aontehav')
    console.log(env)
    return env
  }

module.exports = medusaEnv
