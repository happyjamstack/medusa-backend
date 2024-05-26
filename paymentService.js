const validateStringMinMax = require('./validateStringMinMax.js')
const { cond, T } = require('ramda')

const stripeConfigured =
  (env) =>
    validateStringMinMax(1)(200)(env['STRIPE_API_KEY'])
//    && validateStringMinMax(1)(200)(env['STRIPE_WEBHOOK_SECRET'])

const stripePaymentService =
  (env) => (
    { resolve: 'medusa-payment-stripe'
    , options:
      { api_key: env['STRIPE_API_KEY']
      , webhook_secret: env['STRIPE_WEBHOOK_SECRET']
      }
    })

const klarnaConfigured =
  (env) =>
    validateStringMinMax(1)(100)(env['KLARNA_BACKEND_URL'])
    && validateStringMinMax(1)(100)(env['KLARNA_URL'])
    && validateStringMinMax(1)(100)(env['KLARNA_USER'])
    && validateStringMinMax(1)(100)(env['KLARNA_PASSWORD'])
    && validateStringMinMax(1)(100)(env['KLARNA_TERMS_URL'])
    && validateStringMinMax(1)(100)(env['KLARNA_CHECKOUT_URL'])
    && validateStringMinMax(1)(100)(env['KLARNA_CONFIRMATION_URL'])

const klarnaPaymentService =
  (env) => (
    { resolve: 'medusa-payment-klarna'
    , options:
      { backend_url: env['KLARNA_BACKEND_URL']
      , url: env['KLARNA_URL']
      , user: env['KLARNA_USER']
      , password: env['KLARNA_PASSWORD']
      , merchant_urls:
        { terms: env['KLARNA_TERMS_URL']
        , checkout: env['KLARNA_CHECKOUT_URL']
        , confirmation: env['KLARNA_CONFIRMATION_URL']
        }
      }
    })

const paypalConfigured = 
  (env) =>
    validateStringMinMax(1)(100)(env['PAYPAL_SANDBOX'])
    && validateStringMinMax(1)(100)(env['PAYPAL_CLIENT_ID'])
    && validateStringMinMax(1)(100)(env['PAYPAL_SECRET'])
    && validateStringMinMax(1)(100)(env['PAYPAL_AUTH_WEBHOOK_ID'])

const paypalPaymentService =
  (env) => (
    { resolve: 'medusa-payment-paypal'
    , options:
      { sandbox: env['PAYPAL_SANDBOX']
      , clientId: env['PAYPAL_CLIENT_ID']
      , clientSecret: env['PAYPAL_CLIENT_SECRET']
      , authWebhookId: env['PAYPAL_AUTH_WEBHOOK_ID']
      , capture: env['PAYPAL_CAPTURE'] ? env['PAYPAL_CAPTURE'] : false
      }
    })

const paymentService = cond(
  [ [ stripeConfigured, stripePaymentService ]
  , [ paypalConfigured, paypalPaymentService ]
  , [ klarnaConfigured, klarnaPaymentService ]
  , [ T, env => 'medusa-payment-manual']
  ])

module.exports = paymentService
