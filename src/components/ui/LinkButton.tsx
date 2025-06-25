import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";
import { buttonStyle, ButtonProps } from "./Button"; // ButtonProps를 import 합니다.

type LinkButtonProps = LinkProps & ButtonProps;

const LinkButton = styled(Link)<LinkButtonProps>`
  ${buttonStyle}
`;

export default LinkButton;
