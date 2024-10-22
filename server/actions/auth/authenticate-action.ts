'use server';

import { setAuthToken, setSubscriptionId } from '@/server/cookies';
import { authenticateService } from '@/server/services/auth-service';
import { cookies } from 'next/headers';

export default async function authenticateAction(
  email: string,
  password: string,
) {
  try {
    const result = await authenticateService(email, password);

    const {
      token,
      id,
      firstName,
      lastName,
      email: userEmail,
      subscriptionId,
    } = result;

    await setAuthToken(token);
    await setSubscriptionId(subscriptionId);

    return {
      id,
      firstName,
      lastName,
      email: userEmail,
      subscriptionId,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Authentication failed. Please try again later.');
  }
}
