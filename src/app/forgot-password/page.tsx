'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a]">
      <NavbarShell />
      <main className="mx-auto flex max-w-7xl justify-center px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md rounded-[2rem] border border-[#e5ddd4] bg-white p-8 shadow-[0_24px_70px_rgba(26,26,26,0.08)] sm:p-10"
        >
          <Link href="/login" className="mb-8 inline-flex items-center gap-2 text-sm text-[#5c5652] transition hover:text-[#1B3022]">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          {!isSubmitted ? (
            <>
              <h1 className="mb-2 text-3xl font-semibold tracking-[-0.03em]">Reset your password</h1>
              <p className="mb-8 text-sm leading-7 text-[#5c5652]">Enter your email and we will send a secure link to get you back into your account.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6b6560]" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-full border-[#e5ddd4] bg-[#faf8f6] pl-10 focus-visible:ring-[#1B3022]/25"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="h-12 w-full rounded-full bg-[#1B3022] text-[#faf8f6] hover:bg-[#243d2e]" disabled={isLoading}>
                  {isLoading ? 'Sending…' : 'Send reset link'}
                </Button>
              </form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(27,48,34,0.1)]">
                <CheckCircle className="h-8 w-8 text-[#1B3022]" />
              </div>
              <h1 className="mb-2 text-3xl font-semibold tracking-[-0.03em]">Check your email</h1>
              <p className="mb-8 text-sm leading-7 text-[#5c5652]">
                We sent a reset link to <strong className="text-[#1a1a1a]">{email}</strong>
              </p>
              <Button asChild variant="outline" className="h-12 w-full rounded-full border-[#e5ddd4]">
                <Link href="/login">Back to login</Link>
              </Button>
              <p className="mt-6 text-sm text-[#5c5652]">
                Didn&apos;t receive it?{' '}
                <button type="button" onClick={() => setIsSubmitted(false)} className="font-semibold text-[#1B3022] hover:underline">
                  Try again
                </button>
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
