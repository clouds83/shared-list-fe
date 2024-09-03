'use server';

import { api } from '@/lib/api';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function handleRegistration(formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (email === '' || password === '' || confirmPassword === '') {
    return alert('Please fill in all fields');
  }

  if (password !== confirmPassword) {
    return alert('Passwords do not match');
  }

  try {
    await api.post('/create-user', {
      firstName,
      lastName,
      email,
      password,
    });

    await handleLogin(formData);
  } catch (error) {
    console.error(error);
  }
}

export async function handleLogin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (email === '' || password === '') {
    console.log('Please fill in all fields');
  }

  try {
    const response = await api.post('/authenticate', { email, password });

    if (response.status !== 200) {
      console.log('Invalid email or password');
    }

    const { token, ...rest } = response.data;

    cookies().set('auth_session', token, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
    });

    cookies().set('user', JSON.stringify(rest), {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
    });
  } catch (error) {
    console.error('Something went wrong. Please try again.');
  }
}

export async function handleLogout() {
  cookies().delete('auth_session');
  redirect('/login');
}
