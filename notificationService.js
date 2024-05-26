const validateStringMinMax = require('./validateStringMinMax.js')
const { cond, T } = require('ramda')

const sendgridConfigured =
  (env) =>
    validateStringMinMax(1)(100)(env['SENDGRID_API_KEY'])
    && validateStringMinMax(1)(200)(env['SENDGRID_FROM'])

const sendgridNotificationService =
  (env) => (
    { resolve: 'medusa-plugin-sendgrid'
    , options:
      { api_key: env['SENDGRID_API_KEY']
      , from: env['SENDGRID_FROM']
      , order_placed_template: env['SENDGRID_ORDER_PLACED_ID']
      , localization:
        { "de-DE": { order_placed_template: env['SENDGRID_ORDER_PLACED_ID_LOCALIZED']}
        }
      }
    })

const mailchimpConfigured = 
  (env) =>
    validateStringMinMax(1)(100)(env['MAILCHIMP_API_KEY'])
    && validateStringMinMax(1)(100)(env['MAILCHIMP_NEWSLETTER_LIST_ID'])

const mailchimpNotificationService =
  (env) => (
    { resolve: 'medusa-plugin-mailchimp'
    , options:
      { api_key: env['MAILCHIMP_API_KEY']
      , newsletter_list_id: env['MAILCHIMP_NEWSLETTER_LIST_ID']
      }
    })

const notificationService = cond(
  [ [ sendgridConfigured, sendgridNotificationService ]
  , [ mailchimpConfigured, mailchimpNotificationService ]
  , [ T, env => ({}) ]
  ])

module.exports = notificationService
