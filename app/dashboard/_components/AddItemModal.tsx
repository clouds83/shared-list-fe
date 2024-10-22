'use client'

import { Button, Input, Modal } from '@/app/_components'
import addItemAction, {
  AddItemData,
} from '@/server/actions/items/add-item-action'
import { FormEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AddItemModal() {
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const PARAM_NAME = 'addItem'
  const router = useRouter()

  const closeDialog = () => {
    const params = new URLSearchParams(searchParams)
    params.delete(PARAM_NAME)
    router.push(`?${params.toString()}`)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const itemData = Object.fromEntries(formData.entries())

    try {
      const itemAdded = await addItemAction(itemData as unknown as AddItemData)

      if (itemAdded) {
        closeDialog()
      }
    } catch (error: any) {
      console.error('handleSubmit Error:', error)
      setError(error.message || 'Failed to add item. Please try again.')
    }
  }

  return (
    <Modal
      paramName={PARAM_NAME}
      onClose={closeDialog}
      aria-labelledby="add-item-modal-title"
    >
      <h2 className="mb-4 text-xl font-semibold" id="add-item-modal-title">
        Add Item Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-4">
          <div className="w-full space-y-2">
            <label htmlFor="name">Name</label>
            <Input id="name" name="name" />
          </div>
          <div className="w-full space-y-2">
            <label htmlFor="category">Category</label>
            <Input id="category" name="category" />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-full space-y-2">
            <label htmlFor="unit">Unit</label>
            <Input id="unit" name="unit" />
          </div>
          <div className="w-full space-y-2">
            <label htmlFor="quantity">Quantity</label>
            <Input id="quantity" name="quantity" type="number" />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-full space-y-2">
            <label htmlFor="price1Name">Sold at</label>
            <Input id="price1Name" name="price1Name" />
          </div>
          <div className="w-full space-y-2">
            <label htmlFor="price1">Price</label>
            <Input id="price1" name="price1" type="number" step={0.01} />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-full space-y-2">
            <label htmlFor="price2Name">Sold at</label>
            <Input id="price2Name" name="price2Name" />
          </div>
          <div className="w-full space-y-2">
            <label htmlFor="price2">Price</label>
            <Input id="price2" name="price2" type="number" step={0.01} />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-full space-y-2">
            <label htmlFor="price3Name">Sold at</label>
            <Input id="price3Name" name="price3Name" />
          </div>
          <div className="w-full space-y-2">
            <label htmlFor="price3">Price</label>
            <Input id="price3" name="price3" type="number" step={0.01} />
          </div>
        </div>

        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="flex w-full justify-center gap-4">
          <Button
            as="button"
            variant="outline"
            type="button"
            onClick={() => closeDialog()}
          >
            Cancel
          </Button>

          <Button as="button" type="submit">
            Save item
          </Button>
        </div>
      </form>
    </Modal>
  )
}
