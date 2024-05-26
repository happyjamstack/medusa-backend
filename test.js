require('@dotenvx/dotenvx').config({path:'.env.production'})
//require('@dotenvx/dotenvx').config()
    //"build": "cross-env npm run clean && npm run build:server && if [ \"${DEPLOYMENT_TYPE}\" == 'admin' ]; then npm run build:admin; fi",
//    "build": "cross-env npm run clean && npm run build:server && npm run build:admin",

console.log(process.env)
