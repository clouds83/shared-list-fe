'use server';

import { deleteItemService } from '@/server/services/item-service';
import { revalidatePath } from 'next/cache';

export default async function deleteItemAction(id: string) {
  try {
    const data = await deleteItemService(id);

    revalidatePath('/dashboard');
    return data;
  } catch (error: any) {
    console.error('deleteItemAction Error:', error);
    throw new Error(error.message || 'An unexpected error occurred.');
  }
}
