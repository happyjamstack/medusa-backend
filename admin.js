const admin =
  (env) => 
    ( env['DEPLOYMENT_TYPE'] === 'admin'
    ? { resolve: "@medusajs/admin"
      , options:
        { autoRebuild: true
        , serve: false//process.env['DEPLOYMENT_TYPE'] === 'admin' ? true : false
        , host: env['MEDUSA_ADMIN_BACKEND_URL']
        , port: 443
        , develop:
          { open: "false"
          , port: env['ADMIN_APP_PORT']
          }
        }
      }
    : {}
    )
    
module.exports = admin
