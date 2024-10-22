'use client';

import logoutAction from '@/server/actions/auth/logout-action';

export default function LogoutButton() {
  return <button onClick={() => logoutAction()}>Sign out</button>;
}
