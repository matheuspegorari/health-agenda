import { ButtonProps } from "@mui/material";
import { ButtonCustom } from "./styled";

export default function Button(props: ButtonProps) {
  return <ButtonCustom variant="contained" {...props} />;
}
