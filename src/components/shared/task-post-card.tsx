import { ContentImage } from '@/components/shared/content-image'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink, FileText, Globe, Mail, MapPin, Tag } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import type { TaskKey } from '@/lib/site-config'
import { SITE_THEME } from '@/config/site.theme'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_POST_CARD_OVERRIDE_ENABLED, TaskPostCardOverride } from '@/overrides/task-post-card'

type ListingContent = {
  location?: string
  category?: string
  description?: string
  email?: string
  website?: string
  name?: string
  brandName?: string
  companyName?: string
}

const stripHtml = (value?: string | null) =>
  (value || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getExcerpt = (value?: string | null, maxLength = 140) => {
  const text = stripHtml(value)
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}...`
}

const getContent = (post: SitePost): ListingContent => {
  const content = post.content && typeof post.content === 'object' ? post.content : {}
  return content as ListingContent
}

const getImageUrl = (post: SitePost, content: ListingContent) => {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media[0]?.url
  if (mediaUrl) return mediaUrl

  const contentAny = content as Record<string, unknown>
  const contentImage = typeof contentAny.image === 'string' ? contentAny.image : null
  if (contentImage) return contentImage

  const contentImages = Array.isArray(contentAny.images) ? contentAny.images : []
  const firstImage = contentImages.find((value) => typeof value === 'string')
  if (firstImage) return firstImage as string

  const contentLogo = typeof contentAny.logo === 'string' ? contentAny.logo : null
  if (contentLogo) return contentLogo

  return '/placeholder.svg?height=640&width=960'
}

const cardStyles = {
  'listing-elevated': {
    frame: 'rounded-[1.9rem] border border-[#e5ddd4] bg-white shadow-[0_20px_55px_rgba(26,26,26,0.07)] hover:-translate-y-1 hover:shadow-[0_28px_72px_rgba(26,26,26,0.1)]',
    muted: 'text-[#5c5652]',
    title: 'text-[#1a1a1a]',
    badge: 'bg-[#1a1a1a] text-white',
  },
  'editorial-feature': {
    frame: 'rounded-[1.9rem] border border-[#e5ddd4] bg-[#faf8f6] shadow-[0_18px_52px_rgba(26,26,26,0.06)] hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(26,26,26,0.09)]',
    muted: 'text-[#5c5652]',
    title: 'text-[#1a1a1a]',
    badge: 'bg-[#1a1a1a] text-white',
  },
  'studio-panel': {
    frame: 'rounded-[1.9rem] border border-[#e5ddd4] bg-white shadow-[0_22px_60px_rgba(26,26,26,0.08)] hover:-translate-y-1 hover:shadow-[0_30px_78px_rgba(26,26,26,0.11)]',
    muted: 'text-[#5c5652]',
    title: 'text-[#1a1a1a]',
    badge: 'bg-[#1a1a1a] text-white',
  },
  'catalog-grid': {
    frame: 'rounded-[1.9rem] border border-[#e5ddd4] bg-[#faf8f6] shadow-[0_18px_52px_rgba(26,26,26,0.06)] hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(26,26,26,0.09)]',
    muted: 'text-[#5c5652]',
    title: 'text-[#1a1a1a]',
    badge: 'bg-[#1a1a1a] text-white',
  },
} as const

const getVariantForTask = (taskKey: TaskKey) => SITE_THEME.cards[taskKey] || 'listing-elevated'

export function TaskPostCard({
  post,
  href,
  taskKey,
  compact,
}: {
  post: SitePost
  href: string
  taskKey?: TaskKey
  compact?: boolean
}) {
  if (TASK_POST_CARD_OVERRIDE_ENABLED) {
    return <TaskPostCardOverride post={post} href={href} taskKey={taskKey} compact={compact} />
  }

  const content = getContent(post)
  const image = getImageUrl(post, content)
  const rawCategory = content.category || post.tags?.[0] || 'Post'
  const normalizedCategory = normalizeCategory(rawCategory)
  const category = CATEGORY_OPTIONS.find((item) => item.slug === normalizedCategory)?.name || rawCategory
  const variant = taskKey || 'listing'
  const visualVariant = cardStyles[getVariantForTask(variant)]
  const isBookmarkVariant = variant === 'sbm' || variant === 'social'
  const imageAspect = variant === 'image' ? 'aspect-[4/5]' : variant === 'article' ? 'aspect-[16/10]' : variant === 'pdf' ? 'aspect-[4/5]' : variant === 'classified' ? 'aspect-[16/11]' : 'aspect-[4/3]'
  const altText = `${post.title} ${category} ${variant === 'listing' ? 'business listing' : variant} image`
  const imageSizes = variant === 'article' ? '(max-width: 640px) 90vw, (max-width: 1024px) 48vw, 420px' : variant === 'image' ? '(max-width: 640px) 82vw, (max-width: 1024px) 34vw, 320px' : '(max-width: 640px) 85vw, (max-width: 1024px) 42vw, 340px'
  const websiteDomain =
    typeof content.website === 'string' && content.website
      ? content.website.replace(/^https?:\/\//i, '').replace(/\/.*$/, '')
      : ''
  const profileLabel = content.brandName || content.companyName || content.name || category

  const { recipe } = getFactoryState()
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'
  const isDirectorySurface = isDirectoryProduct && (variant === 'listing' || variant === 'classified' || variant === 'profile')

  if (isDirectorySurface) {
    const cardTone = recipe.brandPack === 'market-utility'
      ? {
          frame: 'rounded-[1.75rem] border border-[#d7deca] bg-white shadow-[0_18px_44px_rgba(64,76,34,0.08)] hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(64,76,34,0.14)]',
          badge: 'bg-[#1f2617] text-[#edf5dc]',
          muted: 'text-[#5b664c]',
          title: 'text-[#1f2617]',
          cta: 'text-[#1f2617]',
        }
      : {
          frame: 'rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.08)] hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(15,23,42,0.14)]',
          badge: 'bg-slate-950 text-white',
          muted: 'text-slate-600',
          title: 'text-slate-950',
          cta: 'text-slate-950',
        }

    return (
      <Link href={href} className={`group flex h-full flex-col overflow-hidden transition duration-300 ${cardTone.frame}`}>
        <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
          <ContentImage src={image} alt={altText} fill sizes={imageSizes} quality={75} className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" intrinsicWidth={960} intrinsicHeight={720} />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${cardTone.badge}`}>
              <Tag className="h-3.5 w-3.5" />
              {category}
            </span>
            <span className="rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-900">
              {variant === 'classified' ? 'Open now' : 'Verified'}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className={`line-clamp-2 text-xl font-semibold leading-snug ${cardTone.title}`}>{post.title}</h3>
            <ArrowUpRight className={`h-5 w-5 shrink-0 ${cardTone.muted}`} />
          </div>
          <p className={`mt-3 line-clamp-3 text-sm leading-7 ${cardTone.muted}`}>{getExcerpt(content.description || post.summary) || 'Explore this local listing.'}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs">
            {content.location ? <span className={`inline-flex items-center gap-1 ${cardTone.muted}`}><MapPin className="h-3.5 w-3.5" />{content.location}</span> : null}
            {content.email ? <span className={`inline-flex items-center gap-1 ${cardTone.muted}`}><Mail className="h-3.5 w-3.5" />{content.email}</span> : null}
          </div>
          <div className={`mt-auto pt-5 text-sm font-semibold ${cardTone.cta}`}>{variant === 'classified' ? 'View offer' : 'View details'}</div>
        </div>
      </Link>
    )
  }

  if (isBookmarkVariant) {
    return (
      <Link href={href} className={`group flex h-full flex-row items-start gap-4 overflow-hidden p-5 transition duration-300 ${visualVariant.frame}`}>
        <div className="mt-1 rounded-full bg-white/10 p-2.5 text-current transition group-hover:scale-105">
          <ExternalLink className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${visualVariant.badge}`}>
              <Tag className="h-3.5 w-3.5" />
              {category}
            </span>
            {content.location ? <span className={`inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><MapPin className="h-3.5 w-3.5" />{content.location}</span> : null}
          </div>
          <h3 className={`mt-3 line-clamp-2 text-lg font-semibold leading-snug group-hover:opacity-85 ${visualVariant.title}`}>{post.title}</h3>
          <p className={`mt-2 line-clamp-3 text-sm leading-7 ${visualVariant.muted}`}>{getExcerpt(content.description || post.summary, compact ? 120 : 180) || 'Explore this bookmark.'}</p>
          {content.email ? <div className={`mt-3 inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><Mail className="h-3.5 w-3.5" />{content.email}</div> : null}
        </div>
      </Link>
    )
  }

  if (variant === 'image') {
    return (
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#e8ded1] bg-white shadow-[0_18px_45px_rgba(26,26,26,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(26,26,26,0.14)]"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[#ece6df]">
          <ContentImage
            src={image}
            alt={altText}
            fill
            sizes={imageSizes}
            quality={78}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            intrinsicWidth={960}
            intrinsicHeight={1200}
          />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/92 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a] shadow-sm">
              <Tag className="h-3.5 w-3.5" />
              {category}
            </span>
            <span className="rounded-full bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
              Gallery
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7b736d]">Featured image</p>
              <h3 className="mt-2 line-clamp-2 text-xl font-semibold leading-snug text-[#1a1a1a]">{post.title}</h3>
            </div>
            <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[#7b736d]" />
          </div>
          <p className="line-clamp-3 text-sm leading-7 text-[#5c5652]">
            {getExcerpt(content.description || post.summary, compact ? 110 : 145) || 'Open this gallery item for the full visual story.'}
          </p>
          <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#eee6de] pt-4">
            {content.location ? (
              <span className="inline-flex items-center gap-1 text-xs text-[#5c5652]">
                <MapPin className="h-3.5 w-3.5" />
                {content.location}
              </span>
            ) : (
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#8b837d]">Curated visual</span>
            )}
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1a1a1a]">View gallery</span>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'profile') {
    return (
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#e5ddd4] bg-[linear-gradient(180deg,#fffdfb_0%,#ffffff_100%)] shadow-[0_20px_55px_rgba(26,26,26,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_75px_rgba(26,26,26,0.13)]"
      >
        <div className="relative h-48 overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(176,141,68,0.16),transparent_38%),linear-gradient(180deg,rgba(250,248,246,1)_0%,rgba(244,239,234,1)_100%)]">
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
            <span className="inline-flex items-center gap-1 rounded-full border border-[#e8ded1] bg-white/92 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1a1a1a]">
              <Tag className="h-3.5 w-3.5" />
              {category}
            </span>
            <ArrowUpRight className="h-5 w-5 text-[#7b736d]" />
          </div>
          <div className="absolute bottom-0 left-5 flex translate-y-1/2 items-end gap-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-[1.75rem] border border-white/90 bg-white shadow-[0_14px_30px_rgba(26,26,26,0.12)]">
              <ContentImage
                src={image}
                alt={altText}
                fill
                sizes="96px"
                quality={78}
                className="object-cover"
                intrinsicWidth={240}
                intrinsicHeight={240}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5 pt-16">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7b736d]">Profile</p>
              <h3 className="mt-2 line-clamp-2 text-xl font-semibold leading-snug text-[#1a1a1a]">{post.title}</h3>
            </div>
          </div>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#5c5652]">
            {getExcerpt(content.description || post.summary, compact ? 110 : 150) || 'Discover this profile and the story behind the work.'}
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs text-[#5c5652]">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#f7f2ed] px-3 py-1">
              <Globe className="h-3.5 w-3.5" />
              {websiteDomain || profileLabel}
            </span>
            {content.location ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#f7f2ed] px-3 py-1">
                <MapPin className="h-3.5 w-3.5" />
                {content.location}
              </span>
            ) : null}
          </div>
          {content.email ? (
            <div className="mt-3 inline-flex items-center gap-1 text-xs text-[#5c5652]">
              <Mail className="h-3.5 w-3.5" />
              {content.email}
            </div>
          ) : null}
          <div className="mt-auto pt-5 text-sm font-semibold text-[#1a1a1a]">View profile</div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className={`group flex h-full flex-col overflow-hidden transition duration-300 ${visualVariant.frame}`}>
      <div className={`relative ${imageAspect} overflow-hidden bg-[#ede2dc]`}>
        <ContentImage src={image} alt={altText} fill sizes={imageSizes} quality={75} className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" intrinsicWidth={960} intrinsicHeight={720} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80" />
        <span className={`absolute left-4 top-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${visualVariant.badge}`}>
          <Tag className="h-3.5 w-3.5" />
          {category}
        </span>
        {variant === 'pdf' && <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/88 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-950 shadow"><FileText className="h-3.5 w-3.5" />PDF</span>}
      </div>
      <div className={`flex flex-1 flex-col p-5 ${compact ? 'py-4' : ''}`}>
        <h3 className={`line-clamp-2 font-semibold leading-snug ${variant === 'article' ? 'text-[1.35rem]' : 'text-lg'} ${visualVariant.title}`}>{post.title}</h3>
        <p className={`mt-3 text-sm leading-7 ${variant === 'article' ? 'line-clamp-4' : 'line-clamp-3'} ${visualVariant.muted}`}>{getExcerpt(content.description || post.summary) || 'Explore this post.'}</p>
        <div className="mt-auto pt-4">
          {content.location && <div className={`inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><MapPin className="h-3.5 w-3.5" />{content.location}</div>}
          {content.email && <div className={`mt-2 inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><Mail className="h-3.5 w-3.5" />{content.email}</div>}
        </div>
      </div>
    </Link>
  )
}
