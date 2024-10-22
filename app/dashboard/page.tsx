import getAllItemsAction from '@/server/actions/items/get-all-items-action'
import { Button } from '../_components'
import { TrashIcon, PencilIcon } from '@heroicons/react/20/solid'
import { DeleteItemButton } from './_components/DeleteItemButton'
import AddItemModal from './_components/AddItemModal'

export default async function Dashboard() {
  const data = await getAllItemsAction()
  const { items } = data

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-semibold">All items</h1>
        <Button as="link" size="sm" href="/dashboard?addItem=true">
          Add Item
        </Button>
      </div>

      {items.length > 0 ? (
        <table className="w-full" cellPadding="0">
          <thead>
            <tr className="text-left">
              <th className="w-1/4">Name</th>
              <th className="w-1/4">Quantity</th>
              <th className="w-1/4">Unit</th>
              <th className="w-1/4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id} className="h-10">
                <td className="w-1/4">{item.name}</td>
                <td className="w-1/4">{item.quantity}</td>
                <td className="w-1/4">{item.unit}</td>
                <td className="w-1/4 space-x-1">
                  <DeleteItemButton id={item.id} />
                  <Button
                    as="button"
                    variant="primary"
                    Icon={<PencilIcon className="size-4" />}
                    size="xs"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items available.</p>
      )}

      <AddItemModal />
    </div>
  )
}
