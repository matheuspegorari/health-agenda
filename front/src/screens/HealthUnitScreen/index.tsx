import { Box, Container } from "@mui/material";
import Header from "@/components/Header";

import { Description, Subtitle, Text, Title } from "./styled";
import Image from "next/image";

export default function HealthUnitScreen() {
  return (
    <main>
      <Header route={"/home"} />

      <Container
        maxWidth="xs"
        sx={{
          pb: "64px",
        }}
      >
        <Box
          sx={{
            img: {
              width: "100%",
            },
          }}
        >
          <Image
            src="/assets/images/placeholder_unidade_2.png"
            alt="Unidade"
            width="350"
            height="160"
          />
        </Box>

        <Title>Unidades de Saúde</Title>
        <Subtitle>USF CENTRO II - FARMACÊUTICO SERGIO MATSUMURA</Subtitle>

        <Text>
          <Image
            src="/assets/images/icone_pin.svg"
            alt="Ícone"
            width="16"
            height="16"
          />
          Endereço:
        </Text>

        <Description>
          Rua Clotilde Louro, nº 230 - Centro. Embu-Guaçu/SP
        </Description>

        <Text>
          <Image
            src="/assets/images/icone_envelope.svg"
            alt="Ícone"
            width="16"
            height="16"
          />
          E-mail:
        </Text>
        <Description>usf.centro.ame.saude@gmail.com</Description>

        <Text>
          <Image
            src="/assets/images/icone_telefone.svg"
            alt="Ícone"
            width="16"
            height="16"
          />
          Telefone:
        </Text>
        <Description>(11) 4661-1523</Description>

        <Text>
          <Image
            src="/assets/images/icone_horario.svg"
            alt="Ícone"
            width="16"
            height="16"
          />
          Horário de atendimento:
        </Text>
        <Description>Segunda a Sexta - 07:00h às 16:00h</Description>

        <Text>
          <Image
            src="/assets/images/icone_usuario.svg"
            alt="Ícone"
            width="16"
            height="16"
          />
          Gerente/Administrativo:
        </Text>
        <Description>Jacqueline Rocha de Oliveira</Description>
      </Container>
    </main>
  );
}
