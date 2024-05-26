const validateStringMinMax = require('./validateStringMinMax.js')
const { cond, T } = require('ramda')

const meilisearchConfigured = 
  (env) =>
    validateStringMinMax(1)(100)(env['MEILISEARCH_HOST'])
    && validateStringMinMax(1)(200)(env['MEILISEARCH_API_KEY'])

const meilisearchSearchService =
  (env) => (
    { resolve: 'medusa-plugin-meilisearch'
    , options:
      { config: 
        { host: env['MEILISEARCH_HOST']
        , apiKey: env['MEILISEARCH_API_KEY']
        }
      , settings: {}
      }
    })

const algoliaConfigured =
  (env) =>
    validateStringMinMax(1)(100)(env['MEILISEARCH_APP_ID'])
    && validateStringMinMax(1)(200)(env['MEILISEARCH_ADMIN_API_KEY'])

const algoliaSearchService =
  (env) => (
    { resolve: 'medusa-plugin-algolia'
    , options:
      { applicationId: env['ALGOLIA_APP_ID']
      , adminApiKey: env['ALGOLIA_ADMIN_API_KEY']
      , settings: {}
      }
    })


const searchService = cond(
  [ [ meilisearchConfigured, meilisearchSearchService ]
  , [ algoliaConfigured, algoliaSearchService ]
  , [ T, env => ({}) ]
  ])

module.exports = searchService
