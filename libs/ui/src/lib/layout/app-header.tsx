import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { Ul, Li, A } from '../elements/elements';
import { ReactComponent as MobileMenuButton } from './hamburger.svg';
import { device } from '../media/device';

export const Header = styled.header`
  -webkit-box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  -moz-box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  display: block;
  padding: 0 3rem;
  width: 100%;

  @media screen and ${device} {
    padding: 0 1rem;
  }
`;

export const MainSection = styled.section`
  padding: 0 5rem;
`;

export const MainSectionHeader = styled.h2`
  font-size: 3.8rem;
  font-weight: 600;
`;

//grid-template-columns: 10rem auto 20rem;
export const DesktopNavAside = styled.nav`
  display: flex;
  height: 6.4rem;
  max-height: 6.4rem;
`;

export const LogoWrapper = styled.div`
  align-self: center;
  font-size: 2.8rem;
  font-weight: 200;
  width: 10rem;
`;

export const LogoText = styled.a`
  color: #111;
  display: block;
  text-align: center;
  text-decoration: none;
`;

const LoginContainer = styled.div`
  display: grid;
  grid-template-columns: 10rem 10rem;
  width: 20rem;
`;

function NavLoginContainer({ hiddenRoutes }) {
  return (
    <LoginContainer>
      <Link href={hiddenRoutes[0].href} replace>
        <A href={hiddenRoutes[0].href}>{hiddenRoutes[0].title}</A>
      </Link>
      <Link href={hiddenRoutes[1].href}>
        <A href={hiddenRoutes[1].href} round>
          {hiddenRoutes[1].title}
        </A>
      </Link>
    </LoginContainer>
  );
}

export const MobileNavAside = styled.nav`
  display: grid;
  grid-template-columns: 6rem auto 20rem;
  height: 6.4rem;
  max-height: 6.4rem;
`;

const NavList = styled(Ul)`
  padding: 0 0 0 5rem;
`;

export function AppHeader({ router, navRoutes, hiddenRoutes, deviceInfo }) {
  const { device: { type = 'desktop' } = {} } = deviceInfo;

  const isMobile = type === 'mobile';
  return (
    <>
      {!isMobile && (
        <Header>
          <DesktopNavAside>
            <LogoWrapper>
              <Link href="/" replace>
                <LogoText href="/">kvn</LogoText>
              </Link>
            </LogoWrapper>
            <NavList>
              {navRoutes.map((route, index) => {
                return (
                  <Li key={`li-${route.href}-${index}`}>
                    <Link href={route.href} replace>
                      <A
                        href={route.href}
                        selected={router.asPath === route.href}
                      >
                        {route.title}
                      </A>
                    </Link>
                  </Li>
                );
              })}
            </NavList>
            <NavLoginContainer hiddenRoutes={hiddenRoutes} />
          </DesktopNavAside>
        </Header>
      )}
      {isMobile && (
        <MobileHeader>
          <MobileNavAside>
            <MobileMenuButton />
            <LogoWrapper>
              <Link href="/" replace>
                <LogoText href="/">kvn</LogoText>
              </Link>
            </LogoWrapper>
            <NavLoginContainer hiddenRoutes={hiddenRoutes} />
          </MobileNavAside>
        </MobileHeader>
      )}
    </>
  );
}

export const EnhancedAppHeader = withRouter(AppHeader);
