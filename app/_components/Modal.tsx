'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/utils'
import { useSearchParams } from 'next/navigation'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { toCapitalized } from '@/utils/toCapitalized'

type ModalProps = {
  paramName: string
  children: React.ReactNode
  onClose: () => void
  closeButton?: boolean
  className?: string
}

export function Modal({
  onClose,
  paramName,
  children,
  closeButton = true,
  className,
  ...props
}: ModalProps) {
  const searchParams = useSearchParams()
  const modalRef = useRef<HTMLDivElement>(null)
  const OPEN_STATE = 'true'
  const isOpen = searchParams.get(paramName) === OPEN_STATE

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current?.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
      modalRef.current.focus()

      return () => {
        modalRef.current?.removeEventListener('keydown', handleEsc)
        document.body.style.overflow = ''
      }
    }
  }, [isOpen, modalRef.current])

  const closeDialog = () => {
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeDialog()
    }
  }

  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeDialog()
    }
  }

  return isOpen ? (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-blue-950 bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${toCapitalized(paramName)} Modal`}
        tabIndex={-1}
        className={cn(
          'relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg focus:outline-none',
          className,
        )}
        {...props}
      >
        {closeButton && (
          <button
            onClick={closeDialog}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <XMarkIcon className="size-5" />
          </button>
        )}
        {children}
      </div>
    </div>
  ) : null
}
