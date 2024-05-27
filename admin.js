const admin =
  (env) => (
    { resolve: "@medusajs/admin"
      , options:
        { autoRebuild: true
        , serve: env['DEPLOY_ADMIN'] === 'yes' ? true : false
        , host: env['MEDUSA_ADMIN_BACKEND_URL']
        , port: env['MEDUSA_BACKEND_PORT'] || 443
        , develop:
          { open: "false"
          , port: env['ADMIN_APP_PORT']
          }
        }
    })
    
module.exports = admin
