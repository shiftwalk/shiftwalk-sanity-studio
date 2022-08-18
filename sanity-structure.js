import S from "@sanity/desk-tool/structure-builder";
import IframePreview from './preview/IFramePreview'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

import {
  FiHome,
  FiCamera,
  FiFileText,
} from 'react-icons/fi'

import { getGlobalSlug, previewURL } from './utils/resolveProductionUrl'

export const getDefaultDocumentNode = ({ schemaType }) => S.document().views(getPreview(schemaType))

const getPreview = (schemaType) => {
  const globalSlug = getGlobalSlug(schemaType)
  if (globalSlug) {
    return [
      S.view.form(),
      S.view
        .component(IframePreview)
        .title('Web preview')
        .options({ previewURL, isMobile: false, globalSlug }),
      S.view
        .component(IframePreview)
        .title('Mobile preview')
        .options({ previewURL, isMobile: true, globalSlug })
    ]
  }
  return [S.view.form()]
}

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem().title('Home').child(S.editor().id('home').schemaType('home').documentId('singleton-home').views(getPreview('home'))).icon(FiHome),
      S.divider(),
      orderableDocumentListDeskItem({
        type: 'projects',
        title: 'Projects',
        icon: FiCamera
      }),
      S.divider(),
      orderableDocumentListDeskItem({
        type: 'journal',
        title: 'Journal',
        icon: FiFileText
      }),
    ]);