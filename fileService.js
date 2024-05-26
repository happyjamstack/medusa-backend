const validateStringMinMax = require('./validateStringMinMax.js')
const { cond, T } = require('ramda')

const cloudinaryConfigured =
  (env) =>
    validateStringMinMax(1)(1000)(env['CLOUDINARY_CLOUD_NAME'])
    && validateStringMinMax(15)(15)(env['CLOUDINARY_API_KEY'])
    && validateStringMinMax(27)(27)(env['CLOUDINARY_API_SECRET'])

const cloudinaryFileService =
  (env) => (
    { resolve: 'medusa-file-cloudinary'
    , options:
      { cloud_name: env.CLOUDINARY_CLOUD_NAME
      , api_key: env.CLOUDINARY_API_KEY
      , api_secret: env.CLOUDINARY_API_SECRET
      , secure: true
      }
    })

const minioConfigured =
  (env) =>
    validateStringMinMax(1)(100)(env['MINIO_ENDPOINT'])
    && validateStringMinMax(1)(100)(env['MINIO_BUCKET'])
    && validateStringMinMax(1)(100)(env['MINIO_ACCESS_KEY'])
    && validateStringMinMax(1)(100)(env['MINIO_SECRET_KEY'])

const minioFileService =
  (env) => (
    { resolve: 'medusa-file-minio'
    , options:
      { endpoint: env['MINIO_ENDPOINT']
      , bucket: env['MINIO_BUCKET']
      , access_key_id: env ['MINIO_ACCESS_KEY']
      , secret_access_key: ['MINIO_SECRET_KEY']
      }
    }
  )

const localFileService =
  (env) => (
    { resolve: '@medusajs/file-local'
    , options: { upload_dir: 'uploads' }
    }
  )

const pinataConfigured = 
  (env) =>
    validateStringMinMax(683)(683)(env['PINATA_JWT'])
    && validateStringMinMax(20)(20)(env['PINATA_API_KEY'])
    && validateStringMinMax(64)(64)(env['PINATA_API_SECRET'])

const pinataFileService =
  (env) => (
    { resolve: 'medusa-file-pinata'
    , options:
      { pinata_api_key: env['PINATA_API_KEY']
      , pinata_api_secret: env['PINATA_API_SECRET']
      , pinata_jwt: env['PINATA_JWT']
      , pinata_gateway: env['PINATA_GATEWAY']
      }
    }
  )

const supabaseConfigured = (env) => true

const supabaseFileService =
  (env) => (
    { resolve: 'medusa-storage-supabase'
    , options:
      { referenceID: env['SUPABASE_STORAGE_BUCKET_REF']
      , serviceKey: env['SUPABASE_SERVICE_ROLE_KEY']
      , bucketName: env['SUPABASE_BUCKET_NAME']
      }
    }
  )

const fileService = cond(
  [ [ cloudinaryConfigured, cloudinaryFileService ]
  , [ minioConfigured, minioFileService ]
  , [ pinataConfigured, pinataFileService ]
  , [ supabaseConfigured, supabaseFileService ]
  , [ T, localFileService ]
  ])

module.exports = fileService
