import React from 'react';
import { Header, Footer } from '../_components/structure';
import { Container } from '../_components';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Container className="flex flex-grow gap-8 py-8">
        <aside className="flex w-full max-w-40">Categories</aside>
        <main className="flex w-full">{children}</main>
      </Container>
      <Footer />
    </>
  );
}
