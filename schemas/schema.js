import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Singletons
import singletonHome from './singletonHome'

// Documents
import projects from './projects'
import journal from './journal'

// Common
import seo from './common/seo'
import defaultImage from './common/defaultImage'
import singleImageBlock from './common/singleImageBlock'
import doubleImageBlock from './common/doubleImageBlock'

export default createSchema({
  name: 'default',
  
  types: schemaTypes.concat([
    singletonHome,
    projects,
    journal,
    defaultImage,
    singleImageBlock,
    doubleImageBlock,
    seo
  ]),
})
