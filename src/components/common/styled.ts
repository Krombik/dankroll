import styled from "styled-components";
import Divider from "@material-ui/core/Divider";

type StyledBannerProps = { backgroundColor: string };

export const StyledBanner = styled.div<StyledBannerProps>`
  padding: 25px 0;
  position: relative;
  width: 100%;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    width: 100vw;
    transform: translateX(-50%);
    left: 50%;
    height: 100%;
    background: ${(props) => props.backgroundColor};
    box-shadow: inset 0px 0px 25px 20px rgba(0, 0, 0, 0.1);
  }
  [class*="MuiIconButton"] {
    font-size: inherit;
  }
`;

export const FullWidthDivider = styled(Divider)`
  width: 200%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;
