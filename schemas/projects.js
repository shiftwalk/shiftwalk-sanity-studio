import { FiExternalLink } from 'react-icons/fi'
import slugify from '../utils/slugify'
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';

export default {
  title: "Projects",
  name: 'projects',
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'category', hidden: true }),
    {
      title: "Title",
      description: "The name of this project",
      name: "title",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      title: "Project Code",
      description: "The code for this project, eg: 'SW.056'",
      name: "projectCode",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      title: 'Teaser Image',
      description: "The teaser image displayed on the projects index",
      name: 'teaserImage',
      type: 'defaultImage',
      validation: Rule => Rule.required()
    },
    {
      title: 'Services',
      description: 'The list of services for this project, eg: "Brand", "Visual Direction", "Web Development" etc...',
      name: 'services',
      type: 'array',
      of: [{
        type: 'string',
        validation: Rule => Rule.required()
      }],
    },
    {
      title: 'Overview',
      description: "The overview text for this project",
      name: 'overview',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.required()
    },
    {
      title: 'Image Blocks',
      name: 'imageBlocks',
      description: 'The modular image blocks for this project',
      type: 'array',
      of: [
        {type: 'singleImageBlock', title: 'Single Image'},
        {type: 'doubleImageBlock', title: 'Double Image'}
      ],
    },
    {
      title: "Live URL",
      description: "The live URL for this project",
      name: "liveUrl",
      type: "url"
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
      teaserImage: 'teaserImage',
      projectCode: 'projectCode',
    },
    prepare(selection) {
      const {title, teaserImage, projectCode} = selection
      return {
        title: title,
        subtitle: `${projectCode}`,
        media: teaserImage
      }
    }
  }
}