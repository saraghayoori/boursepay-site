import { Link } from 'react-router-dom'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import Eyebrow from '@/components/ui/Eyebrow'
import Section from '@/components/ui/Section'
import BlogVisual from '@/components/brand/BlogVisual'
import { blogPosts, formatPostDate } from '@/lib/blog'

export default function BlogIndex() {
  return (
    <>
      <title>بلاگ · بورس‌پی</title>
      <meta name="description" content="یادداشت‌ها، تصمیم‌های فنی و داستان‌های پشتِ بورس‌پی." />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-cloud text-ink">
        <Container className="relative grid items-center gap-12 py-24 sm:py-32 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow tone="sky">۰۲ · بلاگ</Eyebrow>
            <Heading
              fa="یادداشت‌ها"
              en="Field notes"
              level={1}
              className="mt-4"
            />
            <p className="mt-9 max-w-xl text-[16.5px] leading-[1.85] text-ink-2">
              تصمیم‌های فنی، روایت‌های مشتری‌ها و آنچه از ساختنِ ریل‌های پرداختِ
              بازار سرمایه می‌آموزیم.
            </p>
          </div>

          <div className="lg:col-span-5">
            <BlogVisual />
          </div>
        </Container>
      </section>

      {/* POSTS LIST */}
      <Section tone="paper" spacing="loose">
        <Container size="narrow">
          {blogPosts.length === 0 ? (
            <div className="rounded-2xl border border-hairline-2 bg-paper-2 px-8 py-16 text-center">
              <div
                className="font-en-body text-[10.5px] uppercase tracking-[0.22em] text-ink-3"
                style={{ unicodeBidi: 'isolate' }}
              >
                empty for now
              </div>
              <p className="mt-3 font-display text-[20px] font-bold text-ink">
                هنوز پستی منتشر نشده.
              </p>
              <p className="mt-3 text-[14px] text-ink-3">
                به‌زودی نخستین یادداشت‌ها منتشر می‌شوند.
              </p>
            </div>
          ) : (
            <ol className="space-y-1">
              {blogPosts.map((post, i) => (
                <li key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group relative grid items-start gap-6 rounded-2xl border border-transparent p-6 transition-all duration-300 hover:border-hairline-2 hover:bg-paper-2 md:grid-cols-12 md:gap-10 md:p-8"
                  >
                    {/* Index number */}
                    <div className="md:col-span-2">
                      <div
                        className="font-en-display text-[36px] font-bold leading-none text-ink-4 transition-colors duration-300 group-hover:text-indigo"
                        style={{ unicodeBidi: 'isolate' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11.5px] text-ink-3">
                        <span
                          className="font-en-body uppercase tracking-[0.18em]"
                          style={{ unicodeBidi: 'isolate' }}
                        >
                          {formatPostDate(post.date)}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-10">
                      <h2 className="font-display text-[26px] font-bold leading-tight text-ink transition-colors duration-300 group-hover:text-indigo sm:text-[32px]">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-3 text-[15px] leading-[1.85] text-ink-2">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-5 flex items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-2 text-[11.5px] text-ink-3">
                          {post.tags?.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="rounded-full bg-cloud px-2.5 py-0.5"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-accent transition-transform group-hover:-translate-x-1">
                          <span>ادامه</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
                            <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>

                    {/* Separator hairline at the bottom (not for last item) */}
                    {i < blogPosts.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute bottom-0 left-6 right-6 h-px bg-hairline-2 transition-opacity duration-300 group-hover:opacity-0 md:left-8 md:right-8"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </Container>
      </Section>
    </>
  )
}
