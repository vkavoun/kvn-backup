import React from 'react';
import Link from 'next/link';
import { MainSection, MainSectionHeader } from './app-header';

export interface PageProps {
  title?: string;
  children?: React.ReactNode;
}

export function BasePage(props: PageProps) {
  const { title, children } = props;
  return (
    <main>
      <MainSection>
        <MainSectionHeader>{!!title && title}</MainSectionHeader>
        {!!children && children}
        <Link href="/">
          <a className="basic">Go to Home</a>
        </Link>
      </MainSection>
    </main>
  );
}
