import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react'
import { cn } from '@/utils'

type ToastVariant = 'success' | 'error' | 'warning' | 'info'

interface ToastItem {
  id: number
  message: string
  description?: string
  variant: ToastVariant
}

interface ToastContextValue {
  toast: (message: string, opts?: { variant?: ToastVariant; description?: string }) => void
  success: (message: string, description?: string) => void
  error: (message: string, description?: string) => void
  warning: (message: string, description?: string) => void
  info: (message: string, description?: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const iconStyles = {
  success: 'text-success',
  error: 'text-error',
  warning: 'text-accent',
  info: 'text-primary',
}

const DEFAULT_DURATION = 4000

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const counter = useRef(0)

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const show = useCallback(
    (message: string, opts?: { variant?: ToastVariant; description?: string }) => {
      const id = ++counter.current
      const variant = opts?.variant ?? 'info'
      setToasts((prev) => [...prev, { id, message, description: opts?.description, variant }])
      window.setTimeout(() => dismiss(id), DEFAULT_DURATION)
    },
    [dismiss],
  )

  const value: ToastContextValue = {
    toast: show,
    success: (m, d) => show(m, { variant: 'success', description: d }),
    error: (m, d) => show(m, { variant: 'error', description: d }),
    warning: (m, d) => show(m, { variant: 'warning', description: d }),
    info: (m, d) => show(m, { variant: 'info', description: d }),
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div
          aria-live="assertive"
          className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 p-4"
        >
          {toasts.map((t) => {
            const Icon = icons[t.variant]
            return (
              <div
                key={t.id}
                role="status"
                className={cn(
                  'pointer-events-auto flex items-start gap-3 rounded-md border bg-white p-4 shadow-lg transition animate-[fadeIn_0.2s_ease-out]',
                  'border-slate-200',
                )}
              >
                <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', iconStyles[t.variant])} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-secondary">{t.message}</p>
                  {t.description && <p className="mt-0.5 text-xs text-muted">{t.description}</p>}
                </div>
                <button
                  type="button"
                  aria-label="Dismiss notification"
                  onClick={() => dismiss(t.id)}
                  className="text-muted transition hover:text-secondary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )
          })}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}