import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { withRouter } from 'next/router';
import { ReactComponent as MobileMenuButton } from './hamburger.svg';

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: row;
  grid-column-start: 2;
`;

const Li = styled.li`
  display: inline-flex;
  position: relative;
  box-sizing: border-box;
  height: 6.4rem;
`;

const Header = styled.header`
  width: 100%;
  display: block;
  box-sizing: border-box;
  padding: 0 3rem;
  -webkit-box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  -moz-box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
`;

const MobileHeader = styled.header`
  width: 100%;
  display: block;
  box-sizing: border-box;
  padding: 0 1rem 0 1rem;
  -webkit-box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  -moz-box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
`;

const Nav = styled.nav`
  display: grid;
  grid-template-columns: 10rem auto 20rem;
  height: 6.4rem;
  max-height: 6.4rem;
`;

const A = styled.a<{ selected?: boolean; nohover?: boolean; round?: boolean }>`
  ${({ selected, nohover, round }) => {
    if (selected) {
      return `
      color: #111;
      font-weight: 325;
    `;
    } else {
      return `
      color: #757575;
      font-weight: 300;
      ${
        round
          ? `
          margin-left: 1rem;
          line-height: 2.8rem;
          outline: none;
          border: 0.1rem solid #d0d0d0;
          border-radius: 0.55rem;`
          : ''
      }
      ${
        nohover
          ? ''
          : `:hover {
              color: #111;
              ${round ? `border-color: #adadad;` : ''}
            }`
      }
    `;
    }
  }}

  text-decoration: none;
  padding: 0rem 1rem 0rem 1rem;
  place-self: center;
`;

const LogoWrapper = styled.div`
  font-size: 2.8rem;
  display: grid;
  font-weight: 200;
`;

const LogoText = styled.a`
  place-self: center start;
  text-decoration: none;
  color: #111;
`;

export const MainSection = styled.section`
  padding: 0 5rem;
`;

export const MainSectionHeader = styled.h2`
  font-size: 3.8rem;
  font-weight: 600;
`;

const LoginContainer = styled.div`
  place-self: center end;
  display: flex;
  grid-column: 3 / 4;
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

const DesktopNavAside = styled.nav`
  display: grid;
  grid-template-columns: 10rem auto 20rem;
  height: 6.4rem;
  max-height: 6.4rem;
`;

const MobileNavAside = styled.nav`
  display: grid;
  grid-template-columns: 6rem auto 20rem;
  height: 6.4rem;
  max-height: 6.4rem;
`;

function AppHeader({ router, navRoutes, hiddenRoutes, deviceInfo }) {
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
            <Ul>
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
            </Ul>
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
