import styled from "styled-components";

export const ButtonFloating = styled.p`
  position: fixed;
  bottom: 5%;
  right: 16px;

  display: flex;
  align-items: center;
  gap: 16px;

  color: var(--text-color);
  font-size: 20px;
  font-weight: 400;
  line-height: normal;

  &:hover {
    opacity: 0.8;
  }
`;
