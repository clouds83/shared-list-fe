import { Container } from '@/app/_components';

export function Footer() {
  return (
    <footer className="flex h-8 w-full items-center bg-gray-100">
      <Container className="flex items-center justify-center">
        <span className="text-sm">SharedList &copy; 2024</span>
      </Container>
    </footer>
  );
}
