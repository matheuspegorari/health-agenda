import { TextFieldProps } from "@mui/material";
import { TextInputCustom } from "./styled";

export default function TextInput(props: TextFieldProps) {
  return <TextInputCustom variant="outlined" {...props} />;
}
