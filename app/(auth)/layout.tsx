import React from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-grow items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-md">
        {children}
      </div>
    </main>
  );
}
