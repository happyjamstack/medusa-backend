const { pipe, toPairs, fromPairs, map, over, lensIndex } = require('ramda')
const mapKeys =
  (fn) => (obj) => pipe
    ( toPairs
    , map( over(lensIndex(0), fn ))
    , fromPairs
    ) (obj)

module.exports = mapKeys 
