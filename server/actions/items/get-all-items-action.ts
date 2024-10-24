'use server'

import { getSubscriptionId } from '@/server/cookies'
import { getAllItemsService } from '@/server/services/item-service'

export default async function getAllItemsAction(page: number) {
  const subscriptionId = (await getSubscriptionId())?.value

  try {
    const result = await getAllItemsService(subscriptionId as string, page)
    return result
  } catch (error: any) {
    console.error('getAllItemsAction Error:', error)
    throw new Error(
      error.message || 'Authentication failed. Please try again later.',
    )
  }
}
