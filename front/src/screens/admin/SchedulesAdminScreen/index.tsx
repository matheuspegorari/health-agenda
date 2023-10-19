import { useEffect, useState } from "react";
import { Box, Container, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useSnackbar } from "notistack";

import Header from "@/components/Header";
import { Card, Filter, Title } from "./styled";
import Button from "@/components/Button";
import { api } from "@/utils/api";

export default function SchedulesAdminScreen() {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(true);

  const [nomeUnidadeFiltro, setNomeUnidadeFiltro] =
    useState("Unidade centro II");

  const [agendamentos, setAgendamentos] = useState<
    {
      idagend: string;
      nome: string;
      sobrenome: string;
      idmed: string;
      crm: string;
      especialidade: string;
      idunid: string;
      nomeunidade: string;
      endereco: string;
      tipo: string;
      dtagend: string;
      hragend: string;
      obs: string;
      statusagend: "A" | "S" | "N";
    }[]
  >([]);

  const apiGetSchedules = () => {
    setLoading(true);

    const unityHealth = localStorage.getItem(
      "filtro_admin_agendamento_unidade"
    );

    api
      .get("/consultar_unidade.php", { params: { idunid: unityHealth } })
      .then((response) => {
        setAgendamentos(response.data);
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

  function converterHoraTextoParaHora(horaTexto: any) {
    // Verifica se a string de hora tem menos de 4 caracteres
    if (horaTexto.length < 4) {
      horaTexto = "0" + horaTexto; // Adiciona um zero à esquerda, se necessário
    }

    // Extrai as horas e minutos da string
    var horas = horaTexto.substring(0, 2);
    var minutos = horaTexto.substring(2);

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
    setNomeUnidadeFiltro(
      localStorage?.getItem("filtro_admin_agendamento_unidade_name") ||
        "Unidade centro II"
    );

    apiGetSchedules();
  }, []);

  return (
    <main>
      <Header route="/admin/home" />

      <Container maxWidth="xs" sx={{ pb: "80px" }}>
        <Title>Consultar agendamento</Title>

        <Filter>
          Filtro(s) selecionado(s):
          <Typography
            sx={{
              fontSize: "14px",
              color: "var(--secondary-color)",
              padding: "4px 8px",
              border: "1px solid var(--secondary-color)",
              borderRadius: "8px",
            }}
          >
            {nomeUnidadeFiltro}
          </Typography>
        </Filter>

        <Box
          sx={{
            mb: "80px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {loading ? (
            <>
              {[...Array(3)].map((item, index) => (
                <Skeleton
                  key={index}
                  style={{ borderRadius: "16px" }}
                  variant="rounded"
                  width="100%"
                  height="240px"
                />
              ))}
            </>
          ) : (
            <>
              {agendamentos?.map((item, index) => (
                <Card
                  key={item.idagend}
                  status={item.statusagend === "N" ? "reschedule" : "active"}
                >
                  <Box>
                    <h2>Paciente {item.sobrenome}</h2>
                    <h3>Tipo de agenda: {item.especialidade}</h3>
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
                      <h4>{item.nomeunidade}</h4>

                      <p>
                        <b>Endereço:</b> {item.endereco}
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
                      {obterNomeDiaDaSemana(item.dtagend)},{" "}
                      {item.dtagend
                        ? new Date(item.dtagend)
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
                      {converterHoraTextoParaHora(item.hragend)} - 16:00
                    </span>
                  </Box>

                  {item.statusagend === "N" ? (
                    <Box sx={{ mt: "24px" }}>
                      <Link href="/admin/reagendar-paciente">
                        <Button fullWidth>Reagendar outro paciente</Button>
                      </Link>
                    </Box>
                  ) : null}
                </Card>
              ))}
            </>
          )}
        </Box>
      </Container>
    </main>
  );
}
