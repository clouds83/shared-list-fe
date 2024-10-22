'use server';

import { api } from '@/lib/api';
import { Item } from '@/lib/types/Item';
import { cookies } from 'next/headers';

export async function handleAddItem(itemData: Item) {
  const userCookie = cookies().get('user');
  const { subscriptionId } = JSON.parse(userCookie?.value as string);

  // TODO: parei aqui
  const response = await api.post('/add-item', {
    ...itemData,
    subscriptionId,
  });

  return response.data;
}
