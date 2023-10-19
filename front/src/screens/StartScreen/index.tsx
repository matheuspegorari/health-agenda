import { Box, Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button";
import { ButtonFloating } from "./styled";

export default function StartScreen() {
  return (
    <main>
      <Container maxWidth="xs">
        <Box
          sx={{
            mt: "80px",
            mb: "64px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/assets/images/logo.svg"
            alt="Logo"
            width="280"
            height="180"
          />
        </Box>

        <Box sx={{ mb: "16px" }}>
          <Link href="/home">
            <Button fullWidth>Sou paciente</Button>
          </Link>
        </Box>

        <Link href="/home">
          <Button
            fullWidth
            sx={{
              backgroundColor: "transparent!important",
              border: "1px solid var(--secondary-color)!important",
              color: "var(--secondary-color)!important",
            }}
          >
            Sou responsável
          </Button>
        </Link>
      </Container>

      <Link href="/login-admin">
        <ButtonFloating>
          Área para funcionários
          <Image
            src="/assets/images/icone_seta_circulo.svg"
            alt="Ícone"
            width="32"
            height="32"
          />
        </ButtonFloating>
      </Link>
    </main>
  );
}
