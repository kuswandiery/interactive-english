import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input, type InputProps } from '@/components/ui/Input'

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(function PasswordInput(
  props,
  ref,
) {
  const [visible, setVisible] = useState(false)
  const showLabel = 'Show password'
  const hideLabel = 'Hide password'

  return (
    <div className="relative">
      <Input ref={ref} type={visible ? 'text' : 'password'} {...props} className="pr-11" />
      <button
        type="button"
        aria-label={visible ? hideLabel : showLabel}
        aria-pressed={visible}
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-[34px] flex h-6 w-6 items-center justify-center rounded text-muted transition-colors hover:text-secondary"
      >
        {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  )
})