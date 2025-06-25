// styled-components.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      blue: string[];
      gray: string[];
      black: string;
      white: string;
      // 필요한 다른 색상 속성들을 여기에 추가하세요.
      red: string[]; // 다른 컴포넌트에서 사용될 수 있는 색상
    };
    mediaQuery: {
      tablet: string;
      mobile: string;
      // 필요한 다른 미디어 쿼리 속성들을 여기에 추가하세요.
      desktop: string;
    };
  }
}
