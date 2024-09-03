import React from 'react';
import Header from './_components/Header';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex flex-grow p-6">{children}</main>
    </>
  );
}
