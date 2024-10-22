import { Container } from '@/app/_components';
import LogoutButton from './_parts/LogoutButton';

export function Header() {
  return (
    <header className="flex h-16 w-full items-center bg-gray-100">
      <Container className="flex items-center justify-between">
        <span>SharedList</span>

        <LogoutButton />
      </Container>
    </header>
  );
}
