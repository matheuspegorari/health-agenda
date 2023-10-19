import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

import Header from "@/components/Header";
import { Card, Description, Title } from "./styled";
import Button from "@/components/Button";

export default function ReschedulePatientScreen() {
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const confirmReschedule = () => {
    enqueueSnackbar("Reagendamento realizado com sucesso", {
      variant: "success",
    });

    router.push("/admin/agendamentos");
  };

  return (
    <main>
      <Header route="/admin/home" />

      <Container maxWidth="xs" sx={{ pb: "80px" }}>
        <Title>Reagendar paciente</Title>

        <Description>
          Reagendar outro paciente para o horário selecionado:
        </Description>

        <Box
          sx={{
            padding: "0 18px",
            height: "40px",
            mt: "24px",
            mb: "24px",
            borderRadius: "8px",
            border: "0.3px solid #1B1B1B",
            background: "#FDF8EF",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "var(--text-color)",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "120%",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Image
              src="/assets/images/icone_calendario.svg"
              alt="Ícone"
              width="16"
              height="16"
            />
            Sexta, 27/10/2023
          </Typography>

          <Typography
            sx={{
              color: "var(--text-color)",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "120%",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Image
              src="/assets/images/icone_horario.svg"
              alt="Ícone"
              width="16"
              height="16"
            />
            14:00-15:00
          </Typography>
        </Box>

        <Box
          sx={{
            mb: "80px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {[...Array(3)].map((item, index) => (
            <Card key={index}>
              <Box>
                <h2>Paciente XXXXXXX</h2>
                <h3>Tipo de agenda: Exame - TSH e T4 Livre</h3>
              </Box>

              <Box
                sx={{
                  mt: "24px",
                  display: "flex",
                  gap: "8px",
                  alignItems: "start",
                }}
              >
                <Image
                  src="/assets/images/icone_pin.svg"
                  alt="Ícone"
                  width="16"
                  height="16"
                />

                <Box>
                  <h4>USF Centro II</h4>

                  <p>
                    <b>Endereço:</b> Rua Clotilde Louro, nº 230 - Centro.
                    Embu-Guaçu/SP
                  </p>
                </Box>
              </Box>

              <Box
                sx={{
                  padding: "0 18px",
                  height: "40px",
                  mt: "24px",
                  borderRadius: "8px",
                  border: "0.3px solid #1B1B1B",
                  background: "#FDF8EF",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>
                  <Image
                    src="/assets/images/icone_calendario.svg"
                    alt="Ícone"
                    width="16"
                    height="16"
                  />
                  Sexta, 27/10/2023
                </span>

                <span>
                  <Image
                    src="/assets/images/icone_horario.svg"
                    alt="Ícone"
                    width="16"
                    height="16"
                  />
                  14:00-15:00
                </span>
              </Box>

              <Box sx={{ mt: "16px" }}>
                <Button onClick={() => confirmReschedule()} fullWidth>
                  Confirmar reagendamento
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      </Container>
    </main>
  );
}
