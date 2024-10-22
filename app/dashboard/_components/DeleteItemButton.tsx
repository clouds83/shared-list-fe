'use client';

import { Button } from '@/app/_components';
import deleteItemAction from '@/server/actions/items/delete-item-action';
import { TrashIcon } from '@heroicons/react/20/solid';

export function DeleteItemButton({ id }: { id: string }) {
  return (
    <Button
      as="button"
      variant="error"
      onClick={() => deleteItemAction(id)}
      Icon={<TrashIcon className="size-4" />}
      size="xs"
    />
  );
}
