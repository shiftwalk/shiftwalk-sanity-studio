import { FiExternalLink } from 'react-icons/fi'
import slugify from '../utils/slugify'
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';

export default {
  title: "Journal",
  name: 'journal',
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'category', hidden: true }),
    {
      title: "Title",
      description: "The name of this journal entry",
      name: "title",
      type: "string",
      validation: Rule => Rule.required()
    },
    // {
    //   title: "Post Date",
    //   description: "Press the button to the right to pick a date.",
    //   name: "date",
    //   type: "date",
    //   options: {
    //     dateFormat: "MMMM Do YYYY",
    //   },
    //   validation: Rule => Rule.required()
    // },
    {
      title: 'Images',
      name: 'images',
      description: 'The image for this journal entry, if more than 1 will creaet a gif',
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
      validation: Rule => Rule.required()
    },
    {
      title: 'Content',
      description: "The content text for this journal entry",
      name: 'content',
      type: 'text',
      rows: 6,
      validation: Rule => Rule.required()
    },
    {
      title: 'Additional Links',
      name: 'additionalLinks',
      type: 'array',
      of: [
        {
          title: 'Link',
          name: 'link',
          type: 'object',
          icon: FiExternalLink,
          fields: [
            {name: 'linkText', type: 'string', title: 'Link Text', description: 'The text the link will display, eg: "Palmar on The Brand Identity"'},
            {name: 'linkUrl', type: 'url', title: 'Link URL'},
          ],
          preview: {
            select: {
              linkText: 'linkText',
              linkUrl: 'linkUrl'
            },
            prepare(selection) {
              const {linkText, linkUrl} = selection
              return {
                title: linkText,
                subtitle: `${linkUrl}`
              }
            }
          }
        }
      ]
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'This is required for page routing and can be auto-generated by pressing "generate"',
      options: {
        source: (doc) => {
          let titleSlug = ''
          let campaignSlug = ''
          if (doc.title) {
            titleSlug = `${doc.title}`
          } else {
            titleSlug = ''
          }

          if (doc.campaignTitle) {
            campaignSlug = `-${doc.campaignTitle}`
          } else {
            campaignSlug = ''
          }

          return `${titleSlug}${campaignSlug}`;
        },
        maxLength: 96,
        slugify: (input) => slugify(`${input}`)
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo'
    }
  ],
  preview: {
    select: {
      title: 'title',
      images: 'images',
      // date: 'date',
    },
    prepare(selection) {
      const {title, images} = selection
      return {
        title: title,
        // subtitle: `${date}`,
        media: images[0]
      }
    }
  }
}