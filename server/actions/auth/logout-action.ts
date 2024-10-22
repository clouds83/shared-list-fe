'use server';

import { destroyCookies } from '@/server/cookies';
import { redirect } from 'next/navigation';

export default async function logoutAction() {
  await destroyCookies();

  redirect('/login');
}
