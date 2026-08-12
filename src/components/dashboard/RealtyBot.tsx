import { useState } from 'react'
import {
  BarChart3,
  FileText,
  Home,
  Phone,
  SendHorizontal,
  X,
} from 'lucide-react'
import chatimg from "../../assets/relity.png"

const actions = [
  { label: 'Market Insights', icon: BarChart3 },
  { label: 'Property Suggestions', icon: Home },
  { label: 'Client Follow-up', icon: Phone },
]

type RealtyBotProps = {
  variant?: 'floating' | 'card'
}

export function RealtyBot({ variant = 'floating' }: RealtyBotProps) {
  const [open, setOpen] = useState(true)
  const [message, setMessage] = useState('')

  if (variant === 'floating' && !open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-6 bottom-6 z-40 overflow-hidden rounded-full shadow-[0_16px_40px_rgba(124,58,237,0.45)] transition hover:scale-105"
        aria-label="Open RealtyBot"
      >
        <img
          src={chatimg}
          alt="RealtyBot"
          className="h-14 w-14 object-cover object-top"
        />
      </button>
    )
  }

  const content = (
    <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#0b1538] via-[#1a0f4d] to-[#4c1d95] text-white shadow-[0_20px_50px_rgba(28,10,80,0.35)]">
      {/* Glow / particles */}
      <div className="pointer-events-none absolute -top-10 -right-8 h-40 w-40 rounded-full bg-[#7c3aed]/35 blur-3xl" />
      <div className="pointer-events-none absolute top-16 right-10 h-2 w-2 rounded-full bg-white/50" />
      <div className="pointer-events-none absolute top-24 right-20 h-1.5 w-1.5 rounded-full bg-[#c4b5fd]/70" />
      <div className="pointer-events-none absolute bottom-24 left-8 h-1.5 w-1.5 rounded-full bg-white/40" />
      <div className="pointer-events-none absolute right-1/3 bottom-16 h-1 w-1 rounded-full bg-[#a78bfa]" />

      <div className="relative p-5 pb-4">
        <div className="mb-3 flex items-start justify-between">
          <p className="text-[15px] font-extrabold">AI Assistant – RealtyBot</p>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7c3aed] shadow-[0_0_18px_rgba(124,58,237,0.7)]">
              <FileText className="h-3.5 w-3.5 text-white" />
            </div>
            {variant === 'floating' && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mb-4 flex items-end gap-3">
          <div className="relative -mb-2 shrink-0">
            <img
              src={chatimg}
              alt="RealtyBot"
              className="h-[120px] w-[84px] rounded-2xl object-cover object-top shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
            />
          </div>
          <p className="pb-3 text-[13px] leading-relaxed text-white/85">
            Hi! I&apos;m RealtyBot, Your AI Real Estate Assistant. How can I help
            you today?
          </p>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#15204a]/80 px-3 py-2 text-[11px] font-semibold text-white/95 transition hover:bg-[#1e2d63]"
            >
              <action.icon className="h-3.5 w-3.5 text-[#c4b5fd]" />
              {action.label}
            </button>
          ))}
        </div>

        <form
          className="flex items-center gap-2 rounded-full bg-white py-1.5 pr-1.5 pl-4"
          onSubmit={(event) => {
            event.preventDefault()
            setMessage('')
          }}
        >
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Ask me anything..."
            className="min-w-0 flex-1 bg-transparent text-sm text-[#1b2559] outline-none placeholder:text-[#8f9bba]"
          />
          <button
            type="submit"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7c3aed] text-white shadow-[0_8px_18px_rgba(124,58,237,0.45)] transition hover:brightness-110"
            aria-label="Send"
          >
            <SendHorizontal className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  )

  if (variant === 'card') return content

  return (
    <div className="fixed right-5 bottom-5 z-40 w-[min(360px,calc(100vw-1.5rem))]">
      {content}
    </div>
  )
}
