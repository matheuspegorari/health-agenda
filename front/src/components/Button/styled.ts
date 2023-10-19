import { Button } from "@mui/material";
import styled from "styled-components";

export const ButtonCustom = styled(Button)`
  background-color: var(--secondary-color) !important;
  height: 48px !important;
  text-transform: none !important;
  font-size: 14px !important;

  &:hover {
    opacity: 0.8;
  }
`;
