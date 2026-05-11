'use client';

import { SessionProvider as Provider} from 'next-auth/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  session: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function AuthSessionProvider({ children ,session}: Props) {
  return <Provider session={session}>{children}</Provider>;
}
