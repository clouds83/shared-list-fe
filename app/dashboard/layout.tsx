import React from 'react';
<<<<<<< HEAD
import { Header, Footer } from '../_components/structure';
import { Container } from '../_components';
=======
import Header from './_components/Header';
>>>>>>> e24849220fe58eee32b98bb74243de39973774b5

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
<<<<<<< HEAD
      <Container className="flex flex-grow gap-8 py-8">
        <aside className="flex w-full max-w-40">Categories</aside>
        <main className="flex w-full">{children}</main>
      </Container>
      <Footer />
=======
      <main className="flex flex-grow p-6">{children}</main>
>>>>>>> e24849220fe58eee32b98bb74243de39973774b5
    </>
  );
}
