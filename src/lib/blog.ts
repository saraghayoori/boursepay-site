import type { ComponentType } from 'react'

export interface PostFrontmatter {
  title: string
  slug: string
  date: string
  excerpt: string
  cover?: string
  tags?: string[]
  author?: string
}

export interface BlogPost extends PostFrontmatter {
  Content: ComponentType
}

interface MdxModule {
  default: ComponentType
  frontmatter?: Partial<PostFrontmatter>
}

const modules = import.meta.glob<MdxModule>('/src/content/blog/*.mdx', {
  eager: true,
})

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

const posts: BlogPost[] = Object.entries(modules)
  .map(([path, mod]) => {
    const fileSlug = path.split('/').pop()!.replace(/\.mdx$/, '')
    const fm = mod.frontmatter ?? {}
    return {
      title: asString(fm.title, fileSlug),
      slug: asString(fm.slug, fileSlug),
      date: asString(fm.date, '1970-01-01'),
      excerpt: asString(fm.excerpt),
      cover: typeof fm.cover === 'string' ? fm.cover : undefined,
      tags: Array.isArray(fm.tags) ? fm.tags.map(String) : undefined,
      author: typeof fm.author === 'string' ? fm.author : undefined,
      Content: mod.default,
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export const blogPosts = posts

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

/** Format an ISO date as Persian (e.g. ۱۸ اردیبهشت ۱۴۰۵). */
export function formatPostDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}
