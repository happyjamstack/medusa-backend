const mapKeys = require('./mapKeys.js')
const fileService = require('./fileService.js')
const paymentService = require('./paymentService.js')
const admin = require('./admin.js')
const { filter, isNotEmpty } = require('ramda')

const getEnvFileName =
  (envName) => (
    envName === 'development'
    ? '.env'
    : '.env.' + envName
  )

const medusaEnv = require('./setEnv.js')(getEnvFileName('production'))

const plugins =
  [ 'medusa-fulfillment-manual'
//  , 'medusa-payment-manual'
  , paymentService(medusaEnv)
  , fileService(medusaEnv)
  , admin(medusaEnv)
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
  , plugins: filter(isNotEmpty)(plugins)
  , modules
  }

console.log('###----------------###')

console.log('> projectConfig:')
console.log(projectConfig)

console.log('>  medusaEnv:')
console.log(medusaEnv)

console.log('> plugins:')
console.log(filter(isNotEmpty)(plugins))
/*
console.log('### process.env    ###')
console.log(process.env)


*/
console.log('###----------------###')
