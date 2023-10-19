import { SelectProps } from "@mui/material";

import { SelectCustom } from "./styled";

export default function Select(props: SelectProps) {
  return <SelectCustom variant="outlined" {...props} />;
}
