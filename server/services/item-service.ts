import { getAuthToken } from '../cookies'
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export async function addItemService(itemData: any, subscriptionId: string) {
  const token = (await getAuthToken())?.value

  try {
    const response = await fetch(`${apiUrl}/add-item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...itemData, subscriptionId }),
    })

    const data = await response.json()

    if (!response.ok) {
      const errorMessage = data.error || 'Failed to add item.'
      throw new Error(errorMessage)
    }

    return data
  } catch (error: any) {
    console.error('addItemService Error:', error)
    throw new Error(error.message || 'An unexpected error occurred.')
  }
}

export async function getAllItemsService(subscriptionId: string, page: number) {
  const params = new URLSearchParams()
  params.append('page', String(page))

  const token = (await getAuthToken())?.value

  try {
    const response = await fetch(`${apiUrl}/all-items?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        body: JSON.stringify({ subscriptionId }),
        authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      const errorMessage = data.error || 'Failed to get items.'
      throw new Error(errorMessage)
    }

    return data
  } catch (error: any) {
    console.error('getAllItemsService Error:', error)
    throw new Error(error.message || 'An unexpected error occurred.')
  }
}

export async function deleteItemService(id: string) {
  const token = (await getAuthToken())?.value

  try {
    const response = await fetch(`${apiUrl}/delete-item`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    })

    const data = await response.json()

    if (!response.ok) {
      const errorMessage = data.error || 'Failed to delete item.'
      throw new Error(errorMessage)
    }

    return data
  } catch (error: any) {
    console.error('deleteItemService Error:', error)
    throw new Error(error.message || 'An unexpected error occurred.')
  }
}
