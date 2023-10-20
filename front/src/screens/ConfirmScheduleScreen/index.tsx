import { useEffect, useState } from "react";
import { Box, Container, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import Header from "@/components/Header";
import { Card, Description, Info, Title } from "./styled";
import Button from "@/components/Button";
import { api } from "@/utils/api";

export default function ConfirmScheduleScreen() {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(true);

  const [agendamento, setAgendamento] = useState<{
    crm: string;
    dtagend: string;
    endereco: string;
    especialidade: string;
    hragend: string;
    idmed: string;
    idunid: string;
    nome: string;
    nomeunidade: string;
    obs: string;
    statusagend: "A" | "S" | "N";
    tipo: string;
  } | null>(null);

  const apiGetSchedule = () => {
    setLoading(true);

    api
      .get("/consultar_agendamento.php", {
        params: { idagend: router?.query?.id },
      })
      .then((response) => {
        setAgendamento(response.data.data);
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

  const apiHandleConfirmSchedule = () => {
    api
      .get("/confirmar_agenda.php", {
        params: { idagend: router?.query?.id },
      })
      .then((response) => {
        router.push("/confirmado-agendamento");
      })
      .catch((error) => {
        enqueueSnackbar(
          error?.response?.data?.message || "Tente novamente mais tarde!.",
          {
            variant: "error",
          }
        );
      });
  };

  const apiHandleCancelSchedule = () => {
    api
      .get("/cancelamento_agenda.php", {
        params: { idagend: router?.query?.id },
      })
      .then((response) => {
        apiGetSchedule();

        enqueueSnackbar(
          response?.data?.message ||
            "Seu agendamento foi cancelado com sucesso!",
          {
            variant: "success",
          }
        );
      })
      .catch((error) => {
        enqueueSnackbar(
          error?.response?.data?.message || "Erro ao cancelar agendamento.",
          {
            variant: "error",
          }
        );
      });
  };

  function converterHoraTextoParaHora(horaTexto: any | null) {
    // Verifica se a string de hora tem menos de 4 caracteres
    if (horaTexto?.length < 4) {
      horaTexto = "0" + horaTexto; // Adiciona um zero à esquerda, se necessário
    }

    // Extrai as horas e minutos da string
    var horas = horaTexto?.substring(0, 2);
    var minutos = horaTexto?.substring(2);

    // Formata a hora no formato desejado
    var horaFormatada = horas + ":" + minutos;

    return horaFormatada;
  }

  function obterNomeDiaDaSemana(dataString: any) {
    var data = new Date(dataString);
    var diasDaSemana = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    var diaDaSemanaNumero = data.getDay();
    var nomeDiaDaSemana = diasDaSemana[diaDaSemanaNumero];
    return nomeDiaDaSemana;
  }

  useEffect(() => {
    if (router?.query?.id) {
      apiGetSchedule();
    }
  }, [router?.query?.id]);

  return (
    <main>
      <Header route="/agendamentos" />

      <Container maxWidth="xs">
        <Title>Confirme o agendamento</Title>

        <Description>
          Você deve confirmar comparecimento para o(s) agendamento(s) abaixo:
        </Description>

        {loading ? (
          <Skeleton
            variant="rounded"
            height="20"
            width="100%"
            sx={{ mb: "24px" }}
          />
        ) : (
          <>
            {agendamento ? (
              <Info>
                Semana -{" "}
                {agendamento?.dtagend
                  ? new Date(agendamento?.dtagend)
                      .toJSON()
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("/")
                  : ""}{" "}
                a 20/10/2023
              </Info>
            ) : null}
          </>
        )}

        {loading ? (
          <Skeleton
            style={{ borderRadius: "16px" }}
            variant="rounded"
            width="100%"
            height="320px"
          />
        ) : (
          <>
            {agendamento ? (
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <h2>{agendamento?.nome} </h2>
                    <h3>
                      {agendamento?.especialidade} - CRM {agendamento?.crm}
                    </h3>
                  </Box>

                  <Image
                    src="/assets/images/avatar_1.png"
                    alt="Avatar"
                    width="60"
                    height="60"
                  />
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
                    <h4>{agendamento?.nomeunidade}</h4>

                    <p>
                      <b>Endereço:</b> {agendamento?.endereco}
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
                    {obterNomeDiaDaSemana(agendamento?.dtagend)},{" "}
                    {agendamento?.dtagend
                      ? new Date(agendamento?.dtagend)
                          .toJSON()
                          .slice(0, 10)
                          .split("-")
                          .reverse()
                          .join("/")
                      : ""}
                  </span>

                  <span>
                    <Image
                      src="/assets/images/icone_horario.svg"
                      alt="Ícone"
                      width="16"
                      height="16"
                    />
                    {converterHoraTextoParaHora(agendamento?.hragend)} - 16:00
                  </span>
                </Box>

                <Box
                  sx={{
                    mt: "24px",
                    display: agendamento?.statusagend === "A" ? "flex" : "none",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={apiHandleConfirmSchedule}
                    sx={{ fontSize: "12px!important", width: "50%" }}
                  >
                    Confirmar consulta
                  </Button>

                  <Button
                    onClick={apiHandleCancelSchedule}
                    sx={{
                      fontSize: "12px!important",
                      backgroundColor: "transparent!important",
                      border: "1px solid var(--secondary-color)!important",
                      color: "var(--secondary-color)!important",
                      width: "50%",
                    }}
                  >
                    Cancelar consulta
                  </Button>
                </Box>

                {agendamento?.statusagend === "N" ? (
                  <Typography
                    sx={{
                      fontSize: "14px",
                      mt: "16px",
                      color: "var(--text-color)",
                    }}
                  >
                    Agendamento cancelado
                  </Typography>
                ) : null}

                {agendamento?.statusagend === "S" ? (
                  <Typography
                    sx={{
                      fontSize: "14px",
                      mt: "16px",
                      color: "var(--text-color)",
                    }}
                  >
                    Agendamento confirmado
                  </Typography>
                ) : null}
              </Card>
            ) : null}
          </>
        )}

        {!agendamento && !loading ? (
          <Box
            sx={{
              my: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "var(--text-color)" }}>
              Não encontramos nenhum agendamento
            </Typography>
          </Box>
        ) : null}
      </Container>
    </main>
  );
}
