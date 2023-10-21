import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSnackbar } from "notistack";

import { Description, Subtitle, Text, Title } from "./styled";
import { api } from "@/utils/api";

export default function HealthUnitScreen() {
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const [healthUnit, setHealthUnit] = useState<{
    id: number;
    centerName: string;
    closingTime: string | null;
    email: string | null;
    manager: string | null;
    openingTime: string | null;
    address: {
      city: {
        city: string;
        country: string;
        id: number;
        state: string;
      };
      cep: string | null;
      complement: string | null;
      district: string | null;
      id: number;
      number: string | null;
      streetName: string | null;
    };
  } | null>(null);

  const apiGetHealthUnit = () => {
    setLoading(true);

    api
      .get(`/healthcenter/${router?.query?.id}`)
      .then((response) => {
        setHealthUnit(response.data);
      })
      .catch((error) => {
        enqueueSnackbar(
          error?.response?.data?.message || "Tente novamente mais tarde!",
          {
            variant: "error",
          }
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (router?.query?.id) {
      apiGetHealthUnit();
    }
  }, [router?.query?.id]);

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

        <Title>Unidade de Saúde</Title>
        <Subtitle>{healthUnit?.centerName}</Subtitle>

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
        <Description>{healthUnit?.email}</Description>

        <Text>
          <Image
            src="/assets/images/icone_telefone.svg"
            alt="Ícone"
            width="16"
            height="16"
          />
          Telefone:
        </Text>
        <Description>{healthUnit?.id}</Description>

        <Text>
          <Image
            src="/assets/images/icone_horario.svg"
            alt="Ícone"
            width="16"
            height="16"
          />
          Horário de atendimento:
        </Text>
        <Description>
          Segunda a Sexta - {healthUnit?.openingTime} às{" "}
          {healthUnit?.closingTime}
        </Description>

        <Text>
          <Image
            src="/assets/images/icone_usuario.svg"
            alt="Ícone"
            width="16"
            height="16"
          />
          Gerente/Administrativo:
        </Text>
        <Description>{healthUnit?.manager}</Description>
      </Container>
    </main>
  );
}
