import React from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-grow items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4 rounded-lg border px-6 py-4">
        {children}
      </div>
    </main>
  );
}
