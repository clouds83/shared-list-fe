import { Subscription } from './Subscription';

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  subscriptionId?: string;
};
