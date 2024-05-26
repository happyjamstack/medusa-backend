const mapKeys = require('./mapKeys.js')
const fileService = require('./fileService.js')

const getEnvFileName =
  (envName) => (
    envName === 'development'
    ? '.env'
    : '.env.' + envName
  )

const medusaEnv = require('./setEnv.js')(getEnvFileName('production'))

const plugins =
  [ `medusa-fulfillment-manual`
  , `medusa-payment-manual`
  , fileService(medusaEnv)
  , { resolve: "@medusajs/admin"
    , options:
      { autoRebuild: true
      , serve: false//process.env['DEPLOYMENT_TYPE'] === 'admin' ? true : false
      , host: medusaEnv['MEDUSA_ADMIN_BACKEND_URL']
      , port: 443
      , develop:
        { open: "false"
        , port: process.env.ADMIN_APP_PORT
        }
      }
    }
  ]

const eventBus =  
    { resolve: "@medusajs/event-bus-redis"
    , options: { redisUrl: medusaEnv['REDIS_URL'] }
    }
const cacheService = 
    { resolve: "@medusajs/cache-redis"
    , options: { redisUrl: medusaEnv['REDIS_URL'] }
    }

const modules = { /*eventBus, cacheService*/ }

const projectConfig = mapKeys
    ( x => x.toLowerCase() )
    ( medusaEnv )

module.exports =
  { projectConfig: {...projectConfig, redis_url: process.env['REDIS_URL']}
  , plugins
  , modules
  }

console.log('###----------------###')

console.log('> projectConfig:')
console.log(projectConfig)

console.log('>  medusaEnv:')
console.log(medusaEnv)

console.log('> plugins:')
console.log(plugins)
/*
console.log('### process.env    ###')
console.log(process.env)
*/

console.log('###----------------###')
