import React from 'react';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-grow items-center justify-center p-6">
      {children}
    </main>
  );
}
