'use server';

import { getSubscriptionId } from '@/server/cookies';
import { addItemService } from '@/server/services/item-service';
import { revalidatePath } from 'next/cache';

export interface AddItemData {
  quantity: string;
  price1: string;
  price2: string;
  price3: string;
}

export default async function addItemAction(itemData: AddItemData) {
  const subscriptionId = (await getSubscriptionId())?.value;

  const { quantity, price1, price2, price3 } = itemData;
  const transformedData = {
    ...itemData,
    quantity: Number(quantity),
    price1: Number(price1),
    price2: Number(price2),
    price3: Number(price3),
  };

  try {
    const result = await addItemService(
      transformedData,
      subscriptionId as string,
    );

    revalidatePath('/dashboard');
    return result;
  } catch (error: any) {
    console.error('addItemAction Error:', error);
    throw new Error(
      error.message || 'Authentication failed. Please try again later.',
    );
  }
}
