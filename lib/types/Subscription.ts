import { Item } from './Item';
import { User } from './User';

export type Subscription = {
  id: string;
  ownerId: string;
  users?: User[];
  items?: Item[];
};
