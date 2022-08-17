import { FiCamera } from 'react-icons/fi'

export default {
  title: 'Single Image',
  type: 'object',
  name: 'singleImageBlock',
  icon: FiCamera,
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'defaultImage',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      image: 'image'
    },
    prepare(selection) {
      const {image} = selection
      return {
        title: 'Single Image',
        media: image
      }
    }
  }
}