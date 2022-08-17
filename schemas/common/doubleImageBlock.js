import { FiColumns } from 'react-icons/fi'

export default {
  title: 'Double Image',
  type: 'object',
  name: 'doubleImageBlock',
  icon: FiColumns,
  fields: [
    {
      title: 'Images',
      name: 'images',
      description: 'The array of images.',
      type: 'array',
      of: [
        {
          name: 'image',
          type: 'defaultImage',
          title: 'Image',
        },
      ],
      options: {
        layout: 'grid',
      },
      validation: Rule => Rule.required().min(2).max(2)
    },
  ],
  preview: {
    select: {
      images: 'images'
    },
    prepare(selection) {
      const {images} = selection
      return {
        title: 'Double Image',
        media: images[0]
      }
    }
  }
}