const ajv = new (require('ajv'))

const validateStringMinMax =
  (min) => (max) => ajv.compile({ type: 'string', minLength: min, maxLength: max })

module.exports = validateStringMinMax
