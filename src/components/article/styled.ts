import styled from "styled-components";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";

export const StyledArticlePreview = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 0;
`;

export const StyledIconButton = styled(IconButton)`
  font-size: inherit;
  color: inherit;
  padding: 5px;
  margin-left: 5px;
  transform: scale(0.9);
`;
