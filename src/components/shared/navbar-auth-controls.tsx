'use client'

import type React from 'react'
import Link from 'next/link'
import { Building2, ChevronDown, FileText, Image as ImageIcon, LayoutGrid, LogOut, Plus, Tag, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

const taskIcons: Record<TaskKey, React.ComponentType<{ className?: string }>> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <>
      <div className="flex items-center gap-1 sm:gap-2" title={user?.email ? `${user?.name} · ${user.email}` : user?.name}>
        <Avatar className="h-9 w-9 shrink-0 border border-[rgba(110,26,55,0.12)]">
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          aria-label="Sign out"
          className="h-9 rounded-full px-2.5 text-[#5f4750] hover:bg-[rgba(110,26,55,0.06)] hover:text-[#8f1f3f] sm:px-3"
        >
          <LogOut className="h-4 w-4 sm:mr-1.5" />
          <span className="hidden sm:inline">Sign out</span>
        </Button>
      </div>

      <div className="pointer-events-none fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="pointer-events-auto h-11 gap-1.5 rounded-full border border-[rgba(110,26,55,0.12)] bg-[rgba(255,250,244,0.98)] px-4 text-[#35131f] shadow-[0_12px_40px_rgba(26,26,26,0.12)] backdrop-blur-sm hover:bg-[#fffaf4] hover:text-[#1a0a10]"
            >
              <Plus className="h-4 w-4" />
              Create
              <ChevronDown className="h-3 w-3 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="end"
            sideOffset={10}
            className="w-56 border-[rgba(110,26,55,0.12)] bg-[rgba(255,250,244,0.98)]"
          >
            {SITE_CONFIG.tasks
              .filter((task) => task.enabled)
              .map((task) => {
                const Icon = taskIcons[task.key] ?? LayoutGrid
                return (
                  <DropdownMenuItem key={task.key} asChild>
                    <Link href={`/create/${task.key}`}>
                      <Icon className="mr-2 h-4 w-4" />
                      Create {task.label}
                    </Link>
                  </DropdownMenuItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
