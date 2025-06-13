import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import styled, { css, DefaultTheme } from "styled-components";

// SVG 컴포넌트 임포트 시 타입 오류를 피하기 위해 @svgr/webpack 설정 확인 필요
// 또는 아래와 같이 React.ComponentType<React.SVGProps<SVGSVGElement>> 타입을 명시할 수 있습니다.
import { ReactComponent as LogoSVG } from "../../assets/images/logo/logo.svg";
import { ReactComponent as TextLogoSVG } from "../../assets/images/logo/text_logo.svg";

// SVG 컴포넌트의 타입을 명시적으로 정의 (선택 사항이지만 명확성을 위해 추가)
const Logo: React.ComponentType<React.SVGProps<SVGSVGElement>> = LogoSVG;
const TextLogo: React.ComponentType<React.SVGProps<SVGSVGElement>> =
  TextLogoSVG;

// theme prop을 사용하는 styled-components를 위한 인터페이스
interface ThemeProps {
  theme: DefaultTheme;
}

const fullWidthStyle = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px;

  @media ${({ theme }: ThemeProps) => theme.mediaQuery.tablet} {
    padding: 14px 24px;
  }
`;

const Container = styled.div`
  position: relative;
  z-index: 0;
`;

const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
`;

const HeaderLogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledLogo = styled(Logo)``; // SVG 컴포넌트 자체를 styled로 감쌀 수 있습니다.

const HeaderMenu = styled.ul<ThemeProps>`
  // theme prop을 사용하므로 타입 명시
  display: flex;
  align-items: center;
  list-style: none;
  gap: 8px;
  font-weight: bold;
  font-size: 16px;
  color: #4b5563;
  gap: 47px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    margin-right: 36px;
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    gap: 16px;
    font-size: 18px;

    ${StyledLogo} {
      display: none;
    }
  }
`;

// NavLink의 className prop은 ({ isActive }) => string 형태의 함수를 받습니다.
// isActive의 타입은 boolean이므로 명시적으로 지정할 필요는 없지만,
// styled-components와 NavLink를 함께 사용할 때 필요한 타입 명시를 위해 추가했습니다.
const HeaderNavLink = styled(NavLink)<ThemeProps>`
  &.active,
  &:hover {
    color: ${({ theme }) => theme.colors.blue[0]};
  }
`;

// LoginLink는 Link 대신 일반 div이므로 to prop을 직접 갖지 않습니다.
// 주석 처리된 user 로직에 따라 Link로 변경될 수 있습니다.
// const LoginLink = styled.div`
//   font-size: 16px;
//   font-weight: 600;
//   border-radius: 8px;
//   padding: 11px 23px;
//   /* Link로 사용하려면 as={Link} 또는 Link 스타일을 상속받아야 합니다. */
// `;

// const ProfileLink = styled.div.attrs({
//   as: Link,
// })<ThemeProps>`
//   // Link를 as prop으로 사용하고 theme를 사용하므로 타입 명시
//   display: flex;
//   align-items: center;
//   gap: 6px;
// `;

// const Nickname = styled.span<ThemeProps>`
//   // theme prop을 사용하므로 타입 명시
//   @media ${({ theme }) => theme.mediaQuery.mobile} {
//     display: none;
//   }
// `;

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${fullWidthStyle}
  background-color: #ffffff;
  border-bottom: 1px solid #dfdfdf;
`;

const Main = styled.main`
  ${fullWidthStyle}
`;

function Header() {
  // const { user } = useAuth(); // useAuth 훅이 정의되어 있다면 타입 정의 필요

  // user 객체에 대한 더미 타입 (실제 useAuth 훅의 반환 타입에 따라 변경)
  // const user: { nickname: string } | null = null; // 로그인 상태를 시뮬레이션

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderNav>
          <HeaderMenu>
            <li>
              <HeaderLogoLink to="/" aria-label="홈으로 이동">
                <StyledLogo />
                <TextLogo />
              </HeaderLogoLink>
            </li>
            <li>
              <HeaderNavLink
                to="/community"
                // NavLink의 className prop은 ({ isActive: boolean }) => string | undefined | null 형태를 받습니다.
                // TypeScript에서 이를 올바르게 처리합니다.
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                자유게시판
              </HeaderNavLink>
            </li>
            <li>
              <HeaderNavLink
                to="/items"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                중고마켓
              </HeaderNavLink>
            </li>
          </HeaderMenu>
        </HeaderNav>

        {/* 사용자 로그인 상태에 따른 UI (주석 처리된 원본 코드) */}
        {/* {user ? (
          <ProfileLink to="/my" aria-label="마이페이지로 이동">
            <DefaultProfileImage />
            <Nickname>{user.nickname}</Nickname>
          </ProfileLink>
        ) : (
          <LoginLink as={Link} to="/login">로그인</LoginLink> // LoginLink가 Link처럼 작동하려면 as={Link} 필요
        )} */}
      </HeaderContainer>
    </HeaderWrapper>
  );
}

function HeaderLayout() {
  return (
    <Container>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
}

export default HeaderLayout;
