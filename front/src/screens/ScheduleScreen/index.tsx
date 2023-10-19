import { useEffect, useState } from "react";
import { Box, Container, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useSnackbar } from "notistack";

import Header from "@/components/Header";
import { Card, Description, Title } from "./styled";
import { api } from "@/utils/api";

export default function ScheduleScreen() {
  const [agendamentos, setAgendamentos] = useState<
    {
      idagend: string;
      crm: string;
      dtagend: string;
      endereco: string;
      especialidade: string;
      hragend: string;
      idmed: string;
      idunid: string;
      nome: string;
      nomeunidade: string;
      obs: string | null;
      tipo: string;
    }[]
  >([]);

  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(true);

  const apiGetSchedule = () => {
    setLoading(true);

    const cpf = localStorage.getItem("cpf");
    const birthday = localStorage.getItem("birthday");

    api
      .get("/consultar_agenda.php", {
        params: {
          cpf: cpf?.replaceAll(".", "").replace("-", ""),
          data_nascimento: birthday,
        },
      })
      .then((response) => {
        setAgendamentos(response.data.data);
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
    apiGetSchedule();
  }, []);

  return (
    <main>
      <Header route="/home" />

      <Container maxWidth="xs">
        <Title>Seus agendamentos:</Title>

        <Description>
          Você deve comparecer na(s) data(s) agendada(s) abaixo:
        </Description>

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
                <Link href={`/confirmar-agendamento/${item.idagend}`}>
                  <Card key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <h2>Dr. {item.nome}</h2>
                        <h3>
                          {item.especialidade} - CRM {item.crm}
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
                  </Card>
                </Link>
              ))}
            </>
          )}

          {/* <Card>
            <Box>
              <Box>
                <h2>Exame - Hemograma</h2>
              </Box>
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
          </Card> */}

          {agendamentos.length == 0 && !loading ? (
            <Box sx={{ mt: "48px", display: "flex", justifyContent: "center" }}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "14px",
                  color: "var(--text-color)",
                  span: {
                    fontSize: "12px",
                  },
                }}
              >
                Você não tem nenhum agendamento <br />{" "}
                <span>
                  (vá até uma unidade de saúde mais próxima <br /> para marcar
                  seu exame ou consulta)
                </span>
              </Typography>
            </Box>
          ) : null}
        </Box>
      </Container>
    </main>
  );
}
