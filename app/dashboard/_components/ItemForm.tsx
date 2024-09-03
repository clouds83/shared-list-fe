'use client';

import { Item } from '@/lib/types/Item';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFieldArray } from 'react-hook-form';
import Input from '@/components/Input';
import Action from '@/components/Action';
import { handleAddItem } from '@/server/actions/itemActions';

interface ItemFormProps {
  actionType: 'add' | 'edit';
  itemData?: Item;
}

const defaultValues = {
  name: '',
  quantity: 1,
  unit: 'pcs',
  category: '',
  price1Name: '',
  price2Name: '',
  price3Name: '',
  price1: 0,
  price2: 0,
  price3: 0,
};

function ItemForm({ actionType, itemData }: ItemFormProps) {
  if (actionType === 'edit' && !itemData) return null;

  const {
    register,
    formState: { errors, isValid },
    getValues,
    trigger,
    control,
  } = useForm({
    defaultValues: actionType === 'add' ? defaultValues : defaultValues,
    // resolver: yupResolver(itemFormSchema),
    mode: 'onChange',
  });

  const handleFormAction = async () => {
    const result = await trigger();
    if (!result) return;

    const itemData = getValues();

    // console.log(result);

    await handleAddItem(itemData as Item);
  };

  return (
    <form action={handleFormAction} className="flex max-w-xl flex-col gap-4">
      <div className="flex gap-4">
        <div>
          <label htmlFor="name">Name</label>
          <Input id="name" {...register('name')} error={!!errors.name} />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <Input
            id="category"
            {...register('category')}
            error={!!errors.category}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div>
          <label htmlFor="unit">Unit</label>
          <Input id="unit" {...register('unit')} error={!!errors.unit} />
        </div>

        <div>
          <label htmlFor="quantity">Quantity</label>
          <Input
            id="quantity"
            {...register('quantity')}
            error={!!errors.quantity}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div>
          <label htmlFor="price1Name">Store 1</label>
          <Input
            id="price1Name"
            {...register('price1Name')}
            error={!!errors.price1Name}
          />
        </div>

        <div>
          <label htmlFor="price1">Price</label>
          <Input
            id="price1"
            type="number"
            {...register('price1')}
            error={!!errors.price1}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div>
          <label htmlFor="price2Name">Store 2</label>
          <Input
            id="price2Name"
            {...register('price2Name')}
            error={!!errors.price2Name}
          />
        </div>

        <div>
          <label htmlFor="price2">Price</label>
          <Input
            id="price2"
            type="number"
            {...register('price2')}
            error={!!errors.price2}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div>
          <label htmlFor="price3Name">Store 3</label>
          <Input
            id="price3Name"
            {...register('price3Name')}
            error={!!errors.price3Name}
          />
        </div>

        <div>
          <label htmlFor="price3">Price</label>
          <Input
            id="price3"
            type="number"
            {...register('price3')}
            error={!!errors.price3}
          />
        </div>
      </div>

      <Action as="button" disabled={!isValid} className="mt-2 w-fit">
        Submit
      </Action>
    </form>
  );
}

export default ItemForm;
