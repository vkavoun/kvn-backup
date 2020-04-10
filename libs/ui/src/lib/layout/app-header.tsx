import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { Ul, Li, A } from '../elements/elements';
import { ReactComponent as SvgButton } from './hamburger.svg';
import { device } from '../media/device';

export const Header = styled.header`
  -webkit-box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  -moz-box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  display: block;
  padding: 0 3rem;
  width: 100%;

  @media screen and ${device.mobileS} {
    padding: 0 1rem;
  }

  @media screen and ${device.mobileM} {
    padding: 0 1rem;
  }

  @media screen and ${device.mobileL} {
    padding: 0 1rem;
  }

  @media screen and ${device.tablet} {
    padding: 0 3rem;
  }

  @media screen and ${device.tabletL} {
    padding: 0 3rem;
  }

  @media screen and ${device.laptop} {
    padding: 0 3rem;
  }

  @media screen and ${device.desktop} {
    padding: 0 3rem;
  }
`;

export const MainSection = styled.section`
  padding: 0 5rem;
`;

export const MainSectionHeader = styled.h2`
  font-size: 3.8rem;
  font-weight: 600;
`;

export const NavAside = styled.nav`
  display: grid;
  height: 6.4rem;
  max-height: 6.4rem;

  @media screen and ${device.mobileS} {
    grid-template-columns: 6rem 1fr 14rem;
  }

  @media screen and ${device.mobileM} {
    grid-template-columns: 6rem 1fr 14rem;
  }

  @media screen and ${device.mobileL} {
    grid-template-columns: 6rem 1fr 14rem;
  }

  @media screen and ${device.tablet} {
    grid-template-columns: 10rem 1fr 20rem;
  }

  @media screen and ${device.laptop} {
    grid-template-columns: 10rem 1fr 20rem;
  }
`;

export const LogoWrapper = styled.div`
  display: grid;
  font-size: 2.8rem;
  font-weight: 200;
`;

export const LogoText = styled.a`
  color: #111;
  place-self: center start;
  text-decoration: none;
`;

const LoginContainer = styled.div`
  display: flex;
  grid-column: 3 / 4;
  place-self: center end;
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

const NavList = styled(Ul)`
  grid-column-start: 2;
  display: flex;
  flex-direction: row;

  @media screen and ${device.mobileS} {
    display: none;
  }

  @media screen and ${device.mobileM} {
    display: none;
  }

  @media screen and ${device.mobileL} {
    display: none;
  }
`;

const MenuButton = styled.div`
  display: none;

  @media screen and ${device.mobileS} {
    display: grid;
  }

  @media screen and ${device.mobileM} {
    display: grid;
  }

  @media screen and ${device.mobileL} {
    display: grid;
  }
`;

export function AppHeader({ router, navRoutes, hiddenRoutes, deviceInfo }) {
  const { device: { type = 'desktop' } = {} } = deviceInfo;

  const isMobile = type === 'mobile';
  return (
    <>
      <Header>
        <NavAside>
          <MenuButton>
            <SvgButton />
          </MenuButton>
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
        </NavAside>
      </Header>
    </>
  );
}

export const EnhancedAppHeader = withRouter(AppHeader);
