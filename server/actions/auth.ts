'use server';

import { api } from '@/lib/api';
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

    cookies().set('auth_session', response.data.token, {
      maxAge: 24 * 60 * 60 * 1000 * 30,
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
    });
  } catch (error) {
    console.error('Something went wrong. Please try again.');
  }
}
