import { Box, Container, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { HeaderCustom } from "./styled";

export default function Header({ route }: { route: string }) {
  return (
    <HeaderCustom>
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            ml: "-16px",
          }}
        >
          <Link href={route} style={{ display: "flex" }}>
            <IconButton
              sx={{
                img: {
                  height: "auto",
                },
              }}
            >
              <Image
                src="/assets/images/icone_seta_voltar.svg"
                alt="Ícones"
                width="28"
                height="28"
              />
            </IconButton>
          </Link>

          <Image
            src="/assets/images/logo_horizontal.svg"
            alt="Logo"
            width="164"
            height="34"
          />
        </Box>
      </Container>
    </HeaderCustom>
  );
}
