'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import Input from './Input'
import Action from './Action'
import { PlusCircleIcon, CircleStackIcon, TrashIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { recipeFormSchema } from '@/lib/schemas/recipeForm'
import { createRecipe, updateRecipe } from '@/server/actions/recipeActions'
import { Recipe } from '@/lib/types'

const defaultValues: Recipe = {
  id: '',
  name: '',
  userId: '',
  servings: 0,
  prepTime: 0,
  instructions: '',
  ingredients: [],
  imageUrl:
    'https://images.unsplash.com/photo-1719937206158-cad5e6775044?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}

export default function RecipeForm({ actionType, recipeData }: { actionType: 'add' | 'edit'; recipeData?: Recipe }) {
  if (actionType === 'edit' && !recipeData) return null

  if (recipeData && typeof recipeData.ingredients === 'string') {
    recipeData.ingredients = JSON.parse(recipeData.ingredients)
  }
  const {
    register,
    formState: { errors, isValid },
    getValues,
    trigger,
    control,
  } = useForm({
    defaultValues: actionType === 'add' ? defaultValues : recipeData,
    resolver: yupResolver(recipeFormSchema),
    mode: 'onChange',
  })

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: 'ingredients', // unique name for your Field Array
  })

  const handleFormAction = async () => {
    const result = await trigger()

    if (!result) return

    const formData = getValues()

    console.log(formData)

    // return

    try {
      if (actionType === 'add') {
        await createRecipe(formData as Recipe)
      }

      if (actionType === 'edit' && recipeData && recipeData.id) {
        await updateRecipe(recipeData.id, formData as Recipe)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form action={handleFormAction} className='grid gap-6 mt-6'>
      <div>
        <label htmlFor='name'>Name</label>
        <Input id='name' {...register('name')} type='text' error={!!errors?.name} autoComplete='off' />
      </div>

      <div>
        <label htmlFor='servings'>Servings</label>
        <Input
          id='servings'
          {...register('servings', { valueAsNumber: true })}
          type='number'
          error={!!errors?.servings}
        />
      </div>

      <div>
        <label htmlFor='prepTime'>Prep Time</label>
        <Input
          id='prepTime'
          {...register('prepTime', { valueAsNumber: true })}
          type='number'
          error={!!errors?.prepTime}
        />
      </div>

      <div className='grid gap-4'>
        <h3>Ingredients</h3>

        {fields.map((field, index) => (
          <div key={field.id} className='flex gap-6 '>
            <label>
              Amount
              <Input {...register(`ingredients.${index}.amount`, { valueAsNumber: true })} type='number' />
            </label>

            <label>
              Unit <Input {...register(`ingredients.${index}.unit`)} type='text' />
            </label>

            <label>
              Name <Input {...register(`ingredients.${index}.name`)} type='text' />
            </label>

            <Action
              as='button'
              variant='destructive'
              className='mt-auto'
              type='button'
              onClick={() => remove(index)}
              Icon={<TrashIcon className='size-6 text-white' />}
              iconRight>
              Remove
            </Action>
          </div>
        ))}

        <Action
          as='button'
          type='button'
          onClick={() => append({ name: '', amount: 0, unit: '' })}
          Icon={<PlusCircleIcon className='size-7 text-white' />}
          iconRight>
          Add
        </Action>
      </div>

      <div>
        <label htmlFor='instructions'>Instructions</label>
        <textarea
          id='instructions'
          {...register('instructions')}
          className='w-full border border-gray-300 rounded-md p-4'
        />
      </div>

      <div>
        <label htmlFor='imageUrl'>Image URL</label>
        <Input id='imageUrl' {...register('imageUrl')} type='url' />
      </div>

      <Action
        as='button'
        type='submit'
        Icon={
          actionType === 'add' ? (
            <PlusCircleIcon className='size-7 text-white' />
          ) : (
            <CircleStackIcon className='size-6 text-white' />
          )
        }
        iconRight
        disabled={!isValid}>
        {actionType === 'add' ? 'Add Recipe' : 'Save Changes'}
      </Action>
    </form>
  )
}
