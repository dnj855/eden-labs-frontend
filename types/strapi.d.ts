export interface StrapiImage {
  data: {
    id: number
    attributes: {
      url: string
      width: number
      height: number
      alternativeText: string
    }
  }
}

export interface Feature {
  title: string
  description: string
  icon?: string
}

export interface SEO {
  metaTitle: string
  metaDescription: string
  metaImage?: StrapiImage
  metaRobots: string
  structuredData?: any
  canonicalURL?: string
}

export interface Service {
  title: string
  slug: string
  description: string
  longDescription?: string
  icon: string
  features: Feature[]
  price: number
  duration: string
  category: 'audit' | 'formation' | 'atelier' | 'coaching'
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Tag {
  name: string
  slug: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Article {
  title: string
  slug: string
  description: string
  content: string
  coverImage: StrapiImage
  author: {
    data: {
      id: number
      attributes: {
        username: string
        email: string
      }
    }
  }
  category: 'ia-generative' | 'transformation-digitale' | 'cas-client' | 'tutoriel' | 'actualite'
  tags: {
    data: Array<{
      id: number
      attributes: Tag
    }>
  }
  seo: SEO
  createdAt: string
  updatedAt: string
  publishedAt: string
} 