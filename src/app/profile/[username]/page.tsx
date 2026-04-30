import Link from "next/link";
import { notFound } from "next/navigation";
import { Globe, Mail, MapPin } from "lucide-react";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { RichContent, formatRichHtml } from "@/components/shared/rich-content";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/site-config";

export const revalidate = 3;

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) {
    notFound();
  }

  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;
  const location =
    (content.location as string | undefined) ||
    (content.address as string | undefined) ||
    undefined;
  const email = content.email as string | undefined;
  const category =
    (content.category as string | undefined) ||
    (Array.isArray(post.tags) ? post.tags.find((tag) => typeof tag === "string") : undefined) ||
    "Profile";
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const descriptionHtml = formatRichHtml(description, "Profile details will appear here once available.");
  const suggestedArticles = await fetchTaskPosts("article", 6);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Profiles",
        item: `${baseUrl}/profile`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `${baseUrl}/profile/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-14 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />

        <section className="overflow-hidden rounded-[2.25rem] border border-[#e5ddd4] bg-[linear-gradient(180deg,#fffdfb_0%,#ffffff_100%)] shadow-[0_24px_70px_rgba(26,26,26,0.07)]">
          <div className="relative border-b border-[#eee5dc] bg-[radial-gradient(circle_at_top_left,rgba(176,141,68,0.18),transparent_32%),radial-gradient(circle_at_top_right,rgba(27,48,34,0.08),transparent_30%),linear-gradient(180deg,#faf8f6_0%,#f5efe8_100%)] px-8 py-10 md:px-12 md:py-12">
            <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:items-end">
              <div className="flex justify-center lg:justify-start">
                <div className="relative h-40 w-40 overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_20px_50px_rgba(26,26,26,0.12)]">
                  {logoUrl ? (
                    <ContentImage src={logoUrl} alt={post.title} fill className="object-cover" sizes="160px" intrinsicWidth={160} intrinsicHeight={160} />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-muted-foreground">
                      {post.title.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em]">
                    {category}
                  </Badge>
                  {domain ? <span className="text-sm font-medium text-[#6d665f]">{domain}</span> : null}
                </div>
                <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-[#1a1a1a] sm:text-5xl">
                  {brandName}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-8 text-[#5c5652]">
                  A cleaner profile presentation with stronger identity cues, clearer contact context, and more breathing room for brand or creator storytelling.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {website ? (
                    <Button asChild size="lg" className="px-7 text-base">
                      <Link href={website} target="_blank" rel="noopener noreferrer">
                        Visit Official Site
                      </Link>
                    </Button>
                  ) : null}
                  <Link
                    href="/profile"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-[#e5ddd4] bg-white px-6 text-sm font-semibold text-[#1a1a1a] transition hover:border-[#d7c9bb]"
                  >
                    Browse more profiles
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 px-8 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7b736d]">About this profile</p>
              <RichContent
                html={descriptionHtml}
                className="mt-4 max-w-3xl text-base leading-8 text-[#5c5652] prose-p:my-5 prose-h2:text-3xl prose-h3:text-2xl"
              />
            </div>

            <aside className="space-y-5">
              <div className="rounded-[1.75rem] border border-[#e8ded1] bg-[#faf8f6] p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7b736d]">Profile details</p>
                <div className="mt-4 space-y-4 text-sm text-[#5c5652]">
                  {website ? (
                    <div className="flex items-start gap-3">
                      <Globe className="mt-0.5 h-4 w-4 text-[#1a1a1a]" />
                      <div>
                        <p className="font-medium text-[#1a1a1a]">Website</p>
                        <Link href={website} target="_blank" rel="noopener noreferrer" className="break-all hover:underline">
                          {website}
                        </Link>
                      </div>
                    </div>
                  ) : null}
                  {location ? (
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 text-[#1a1a1a]" />
                      <div>
                        <p className="font-medium text-[#1a1a1a]">Location</p>
                        <p>{location}</p>
                      </div>
                    </div>
                  ) : null}
                  {email ? (
                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-4 w-4 text-[#1a1a1a]" />
                      <div>
                        <p className="font-medium text-[#1a1a1a]">Email</p>
                        <a href={`mailto:${email}`} className="break-all hover:underline">
                          {email}
                        </a>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </aside>
          </div>
        </section>

        {suggestedArticles.length ? (
          <section className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Suggested articles</h2>
              <Link href="/articles" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {suggestedArticles.slice(0, 3).map((article) => (
                <TaskPostCard
                  key={article.id}
                  post={article}
                  href={buildPostUrl("article", article.slug)}
                  compact
                />
              ))}
            </div>
            <nav className="mt-6 rounded-[1.75rem] border border-[#e5ddd4] bg-[#faf8f6] p-5">
              <p className="text-sm font-semibold text-[#1a1a1a]">Related links</p>
              <ul className="mt-2 space-y-2 text-sm">
                {suggestedArticles.slice(0, 3).map((article) => (
                  <li key={`related-${article.id}`}>
                    <Link
                      href={buildPostUrl("article", article.slug)}
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/profile" className="text-primary underline-offset-4 hover:underline">
                    Browse all profiles
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
