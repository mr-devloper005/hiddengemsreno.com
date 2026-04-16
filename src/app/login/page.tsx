import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { LoginView } from '@/components/shared/login-view'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { LOGIN_PAGE_OVERRIDE_ENABLED, LoginPageOverride } from '@/overrides/login-page'

export default function LoginPage() {
  if (LOGIN_PAGE_OVERRIDE_ENABLED) {
    return <LoginPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#e5ddd4] bg-[linear-gradient(180deg,#faf8f6_0%,#ffffff_45%)] p-5 shadow-[0_24px_70px_rgba(26,26,26,0.07)] sm:p-8 lg:p-10">
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-[linear-gradient(180deg,#B08D44_0%,#D4AF37_50%,#1B3022_100%)] sm:w-1"
            aria-hidden
          />
          <div className="pointer-events-none absolute -right-24 top-0 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_68%)]" aria-hidden />
          <div className="relative pl-2 sm:pl-5">
            <LoginView productKind={productKind} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
