import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Ul, Li, A } from '../elements/elements';
import { NextRouter } from 'next/router';
import { NavNode } from '@kvn/data';

const MenuList = styled(Ul)<{ isShowing: boolean }>`
  display: ${props => (props.isShowing ? 'flex' : 'none')};
  flex-direction: column;
`;

interface SideMenuProps {
  router: NextRouter;
  navRoutes: NavNode[];
  isShowing: boolean;
}

export function SideMenu({ router, navRoutes, isShowing }: SideMenuProps) {
  return (
    <MenuList isShowing={isShowing}>
      {navRoutes.map((route, index) => {
        return (
          <Li key={`li-${route.href}-${index}`}>
            <Link href={route.href} replace>
              <A href={route.href} selected={router.asPath === route.href}>
                {route.title}
              </A>
            </Link>
          </Li>
        );
      })}
    </MenuList>
  );
}
