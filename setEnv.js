const { keys, cond, pipe, filter, omit, pick, isNotNil, isNotEmpty } = require('ramda')
const dotenv = require('@dotenvx/dotenvx')
const systemVars = { ...process.env }

const medusaEnv =
  (envPath) => {
    dotenv.config({path:envPath})
    dotenv.config({path:'.env.defaults'})
    return omit(keys(systemVars))(process.env)
  }

module.exports = medusaEnv
