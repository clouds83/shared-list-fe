'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button className="mt-8" onClick={() => signOut()}>
      Sign out
    </button>
  );
}
