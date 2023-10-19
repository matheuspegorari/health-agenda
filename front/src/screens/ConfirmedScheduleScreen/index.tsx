import { Box, Container } from "@mui/material";
import Image from "next/image";

import Header from "@/components/Header";
import { Title } from "./styled";
import Button from "@/components/Button";
import Link from "next/link";

export default function ConfirmedScheduleScreen() {
  return (
    <main>
      <Header route="/home" />

      <Container maxWidth="xs">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            height: "300px",
            justifyContent: "center",
          }}
        >
          <Image
            src="/assets/images/draw_success.svg"
            alt="Sucesso"
            width="320"
            height="326"
          />
        </Box>

        <Title>
          <b>Parabéns!</b> <br /> Sua consulta foi confirmada com sucesso!
        </Title>

        <Link href="/home">
          <Button fullWidth>Voltar</Button>
        </Link>
      </Container>
    </main>
  );
}
