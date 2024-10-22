'use server';

import { cookies } from 'next/headers';

const cookiesConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 30, // 30 days
};

export const getAuthToken = async () => {
  return cookies().get('token');
};

export const setAuthToken = async (token: string) => {
  cookies().set({
    name: 'token',
    value: token,
    ...cookiesConfig,
  });
};

export const getSubscriptionId = async () => {
  return cookies().get('subscriptionId');
};

export const setSubscriptionId = async (subscriptionId: string) => {
  cookies().set({
    name: 'subscriptionId',
    value: subscriptionId,
    ...cookiesConfig,
  });
};

export const destroyCookies = async () => {
  cookies().delete('token');
  cookies().delete('subscriptionId');
};
