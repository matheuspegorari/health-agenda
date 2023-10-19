import { TextField } from "@mui/material";
import styled from "styled-components";

export const TextInputCustom = styled(TextField)`
  .MuiInputBase-root {
    background-color: #fdf8ef;
    height: 40px;
  }

  fieldset {
    border-radius: 8px;
    border-color: rgba(27, 27, 27, 0.5);
  }
`;
