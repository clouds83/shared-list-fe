import Action from '@/components/Action';
import Container from '@/components/Container';
import { handleLogout } from '@/server/actions/authActions';
import {
  PlusCircleIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Container className="flex h-16 items-center justify-between border-b border-indigo-100 text-indigo-950">
        <Link href="/">
          <h1 className="text-xl font-bold text-indigo-500">SharedList</h1>
        </Link>

        <nav>
          <ul className="flex items-center space-x-4 text-sm">
            <li>
              <Action
                iconRight
                size="sm"
                as="a"
                href="/dashboard/add-item"
                Icon={<PlusCircleIcon className="size-5 text-white" />}
              >
                Add Item
              </Action>
            </li>
            <li>
              <form action={handleLogout}>
                <Action
                  as="button"
                  iconRight
                  variant="link"
                  size="sm"
                  Icon={
                    <ArrowLeftStartOnRectangleIcon className="size-5 rotate-180 text-indigo-950" />
                  }
                >
                  Logout
                </Action>
              </form>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
