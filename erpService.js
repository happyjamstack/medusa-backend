const validateStringMinMax = require('./validateStringMinMax.js')
const { cond, T } = require('ramda')

const brightpearlConfigured = 
  (env) =>
    validateStringMinMax(1)(200)(env['BRIGHTPEARL_ACCOUNT'])
    && validateStringMinMax(1)(200)(env['BRIGHTPEARL_BACKEND_URL'])
    && validateStringMinMax(1)(200)(env['BRIGHTPEARL_CHANNEL_ID'])
    && validateStringMinMax(1)(200)(env['BRIGHTPEARL_EVENT_OWNER'])
    && validateStringMinMax(1)(200)(env['BRIGHTPEARL_WAREHOUSE'])

const brightpearlErpService =
  (env) => (
    { resolve: `medusa-plugin-brightpearl`
    , options:
      { account: env['BRIGHTPEARL_ACCOUNT']
      , backend_url: env['BRIGHTPEARL_BACKEND_URL']
      , channel_id: env['BRIGHTPEARL_CHANNEL_ID']
      , event_owner: env['BRIGHTPEARL_EVENT_OWNER']
      , warehouse: env['BRIGHTPEARL_WAREHOUSE']
      , default_status_id: env['BRIGHTPEARL_DEFAULT_STATUS_ID']
      , swap_status_id: env['BRIGHTPEARL_SWAP_STATUS_ID']
      , claim_status_id: env['BRIGHTPEARL_CLAIM_STATUS_ID']
      , payment_method_code: env['BRIGHTPEARL_PAYMENT_METHOD_CODE']
      , sales_account_code: env['BRIGHTPEARL_SALES_ACCOUNT_CODE']
      , shipping_account_code: env['BRIGHTPEARL_SHIPPING_ACCOUNT_CODE']
      , discount_account_code: env['BRIGHTPEARL_DISCOUNT_ACCOUNT_CODE']
      , gift_card_account_code: env['BRIGHTPEARL_GIFT_CARD_ACCOUNT_CODE']
      , inventory_sync_cron: env['BRIGHTPEARL_INVENTORY_SYNC_CRON']
      , cost_price_list: env['BRIGHTPEARL_COST_PRICE_LIST']
      , base_currency: env['BRIGHTPEARL_BASE_CURRENCY']
      }
    })

const erpService = cond(
  [ [ brightpearlConfigured, brightpearlErpService ]
  , [ T, env => ({}) ]
  ])

module.exports = notificationService
