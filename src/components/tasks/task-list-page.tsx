import Link from 'next/link'
import { ArrowRight, Building2, FileText, Image as ImageIcon, LayoutGrid, Tag, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_LIST_PAGE_OVERRIDE_ENABLED, TaskListPageOverride } from '@/overrides/task-list-page'

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

/** Unified soft gallery shell — warm neutrals + logo-inspired forest green & gold hints */
const LIST_PAGE_SHELL =
  'bg-[#f5f5f5] text-[#1a1a1a] bg-[radial-gradient(circle_at_10%_12%,rgba(176,141,68,0.09),transparent_42%),radial-gradient(circle_at_92%_4%,rgba(27,48,34,0.06),transparent_36%),radial-gradient(circle_at_12%_8%,rgba(217,197,193,0.26),transparent_38%),linear-gradient(180deg,#f5f5f5_0%,#f0ece8_100%)]'

const UI_SOFT = {
  muted: 'text-[#5c5652]',
  panel: 'border border-[#e5ddd4] bg-white shadow-[0_20px_55px_rgba(26,26,26,0.07)] ring-1 ring-[rgba(176,141,68,0.12)]',
  soft: 'border border-[#e8ded1] bg-[#faf8f6]',
  input: 'border border-[#e5ddd4] bg-white text-[#1a1a1a]',
  button: 'bg-[#1B3022] text-[#faf8f6] hover:bg-[#243d2e]',
} as const

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  if (TASK_LIST_PAGE_OVERRIDE_ENABLED) {
    return await TaskListPageOverride({ task, category })
  }

  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))
  const { recipe } = getFactoryState()
  const layoutKey = recipe.taskLayouts[task as keyof typeof recipe.taskLayouts] || `${task}-${task === 'listing' ? 'directory' : 'editorial'}`
  const shellClass = LIST_PAGE_SHELL
  const Icon = taskIcons[task] || LayoutGrid
  const ui = UI_SOFT

  return (
    <div className={`min-h-screen ${shellClass}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        {layoutKey === 'listing-directory' || layoutKey === 'listing-showcase' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className={`rounded-[2rem] p-7 shadow-[0_24px_70px_rgba(15,23,42,0.07)] ${ui.panel}`}>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] opacity-70"><Icon className="h-4 w-4" /> {taskConfig?.label || task}</div>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#1a1a1a]">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-4 max-w-2xl text-sm leading-7 ${ui.muted}`}>Built with a cleaner scan rhythm, stronger metadata grouping, and a structure designed for business discovery rather than editorial reading.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={taskConfig?.route || '#'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.button}`}>Explore results <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/search" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.soft}`}>Open search</Link>
              </div>
            </div>
            <form className={`grid gap-3 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ${ui.soft}`} action={taskConfig?.route || '#'}>
              <div>
                <label className={`text-xs uppercase tracking-[0.2em] ${ui.muted}`}>Category</label>
                <select name="category" defaultValue={normalizedCategory} className={`mt-2 h-11 w-full rounded-full px-4 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className={`h-11 rounded-full text-sm font-medium ${ui.button}`}>Apply filters</button>
            </form>
          </section>
        ) : null}

        {layoutKey === 'article-editorial' || layoutKey === 'article-journal' ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-[#1a1a1a]">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This reading surface uses slower pacing, stronger typographic hierarchy, and more breathing room so long-form content feels intentional rather than squeezed into a generic feed.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${ui.muted}`}>Reading note</p>
              <p className={`mt-4 text-sm leading-7 ${ui.muted}`}>Use category filters to jump between topics without collapsing the page into the same repeated card rhythm used by other task types.</p>
              <form className="mt-5 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-full px-4 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-full px-5 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {layoutKey === 'image-masonry' || layoutKey === 'image-portfolio' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full border border-[#e5ddd4] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1a1a1a]`}>
                <Icon className="h-3.5 w-3.5" /> Visual feed
              </div>
              <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-[#1a1a1a]">
                A more curated image gallery with stronger spacing, hierarchy, and showcase energy.
              </h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>
                Inspired by premium portfolio browsing, this layout gives photography and image-led posts room to breathe, prioritizing clean covers, lighter metadata, and a stronger sense of collection.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.22em] text-[#7b736d]">
                <span className="rounded-full border border-[#e5ddd4] bg-white px-4 py-2">Editorial covers</span>
                <span className="rounded-full border border-[#e5ddd4] bg-white px-4 py-2">Gallery-first browsing</span>
                <span className="rounded-full border border-[#e5ddd4] bg-white px-4 py-2">Cleaner detail rhythm</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="min-h-[280px] rounded-[2rem] border border-[#e5ddd4] bg-[linear-gradient(180deg,rgba(34,34,34,0.06)_0%,rgba(34,34,34,0.16)_100%),url('/placeholder.svg?height=900&width=700')] bg-cover bg-center shadow-[0_22px_65px_rgba(26,26,26,0.1)]" />
              <div className="min-h-[220px] rounded-[2rem] border border-[#e8ded1] bg-[linear-gradient(180deg,rgba(250,248,246,0.15)_0%,rgba(250,248,246,0.65)_100%),url('/placeholder.svg?height=900&width=700')] bg-cover bg-center" />
              <div className={`col-span-2 min-h-[145px] rounded-[2rem] p-6 ${ui.panel}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7b736d]">Collection note</p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-[#5c5652]">
                  Browse for visuals the way people browse finished sessions and featured albums: larger covers, softer chrome, and faster visual scanning.
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'profile-creator' || layoutKey === 'profile-business' ? (
          <section className={`mb-12 rounded-[2.2rem] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.1)] ${ui.panel}`}>
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="relative min-h-[260px] overflow-hidden rounded-[2rem] border border-[#e8ded1] bg-[radial-gradient(circle_at_top_left,rgba(176,141,68,0.14),transparent_35%),linear-gradient(180deg,#faf8f6_0%,#f2ece7_100%)] p-6">
                <div className="absolute left-6 top-6 h-16 w-16 rounded-[1.5rem] border border-white/70 bg-white shadow-[0_14px_35px_rgba(26,26,26,0.08)]" />
                <div className="absolute left-24 top-14 h-24 w-24 rounded-full border border-white/70 bg-[#e8ded1]" />
                <div className="absolute bottom-6 left-6 right-6 rounded-[1.5rem] border border-white/80 bg-white/85 p-5 backdrop-blur-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7b736d]">Identity-led cards</p>
                  <p className="mt-2 text-sm leading-7 text-[#5c5652]">Profiles now present as people and brands first, not as generic posts with a thumbnail.</p>
                </div>
              </div>
              <div>
                <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
                <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-[#1a1a1a]">Profiles with stronger identity, trust, and reputation cues.</h1>
                <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This layout pulls inspiration from polished client and creator directories, giving every profile a clearer avatar moment, cleaner metadata grouping, and a more credible first impression.</p>
                <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.22em] text-[#7b736d]">
                  <span className="rounded-full border border-[#e5ddd4] bg-white px-4 py-2">Brand-first cards</span>
                  <span className="rounded-full border border-[#e5ddd4] bg-white px-4 py-2">Stronger trust cues</span>
                  <span className="rounded-full border border-[#e5ddd4] bg-white px-4 py-2">Cleaner profile previews</span>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'classified-bulletin' || layoutKey === 'classified-market' ? (
          <section className="mb-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className={`rounded-[1.8rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[#1a1a1a]">Fast-moving notices, offers, and responses in a compact board format.</h1>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {['Quick to scan', 'Shorter response path', 'Clearer urgency cues'].map((item) => (
                <div key={item} className={`rounded-[1.5rem] p-5 ${ui.soft}`}>
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {layoutKey === 'sbm-curation' || layoutKey === 'sbm-library' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[#1a1a1a]">Curated resources arranged more like collections than a generic post feed.</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>Bookmarks, saved resources, and reference-style items need calmer grouping and lighter metadata. This variant gives them that separation.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.24em] ${ui.muted}`}>Collection filter</p>
              <form className="mt-4 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-full px-4 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-full px-5 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {intro ? (
          <section className={`mb-12 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8 ${ui.panel}`}>
            <h2 className="text-2xl font-semibold text-[#1a1a1a]">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mt-4 text-sm leading-7 ${ui.muted}`}>{paragraph}</p>
            ))}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {intro.links.map((link) => (
                <a key={link.href} href={link.href} className="font-semibold text-[#1a1a1a] hover:underline">{link.label}</a>
              ))}
            </div>
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
      <Footer />
    </div>
  )
}
