import getAllItemsAction from '@/server/actions/items/get-all-items-action'
import { Button } from '../_components'
import { TrashIcon, PencilIcon } from '@heroicons/react/20/solid'
import { DeleteItemButton } from './_components/DeleteItemButton'
import AddItemModal from './_components/AddItemModal'
import { Pagination } from '../_components/Pagination'

export default async function Dashboard(props: {
  searchParams?: Promise<{
    page?: string
  }>
}) {
  const searchParams = await props.searchParams
  const page = Number(searchParams?.page)
  const data = await getAllItemsAction(page)
  const { items, totalPages, currentPage } = data

  const params = new URLSearchParams() || ''
  if (page) params.append('page', String(page))
  const paramsString = params.toString() + '&'
  const addItemModalHref = `/dashboard?${paramsString}addItem=true`

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-semibold">All items</h1>
        <Button as="link" size="sm" href={addItemModalHref}>
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
              <th className="w-[1%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id} className="h-10">
                <td className="w-1/4">{item.name}</td>
                <td className="w-1/4">{item.quantity}</td>
                <td className="w-1/4">{item.unit}</td>
                <td className="w-[1%] space-x-1 whitespace-nowrap">
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

      <div className="mt-4 flex justify-center">
        <Pagination currentPage={currentPage} pageAmount={totalPages} />
      </div>

      <AddItemModal />
    </div>
  )
}
