import { useEffect, useState } from "react";
import { Box, Container, Grid, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";

import Header from "@/components/Header";
import { Description, Info, Subtitle, Text, Title } from "./styled";
import Button from "@/components/Button";
import Label from "@/components/Label";
import Select from "@/components/Select";
import TextInput from "@/components/TextInput";
import { api } from "@/utils/api";

interface DataForm {
  unityHealth: string;
  typeSchedule: string;
  status: string;
  startDate: string;
  endDate: string;
}

export default function HomeAdminScreen() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DataForm>();

  const [unidades, setUnidades] = useState<
    {
      idunid: string;
      imagemurl: string;
      nomeunidade: string;
    }[]
  >([]);

  const [tipoAgendas, setTipoAgendas] = useState<
    {
      idtipo: string;
      tipo: string;
    }[]
  >([]);

  const router = useRouter();

  const apiSendForm = (data: DataForm) => {
    console.log(data);

    localStorage.setItem("filtro_admin_agendamento_unidade", data.unityHealth);
    localStorage.setItem(
      "filtro_admin_agendamento_unidade_name",
      unidades.filter((item) => item.idunid === data.unityHealth)[0]
        ?.nomeunidade
    );

    router.push("/admin/agendamentos");
  };

  const apiGetUnidades = () => {
    api.get("/unidades.php").then((response) => {
      setUnidades(response.data);
    });
  };

  const apiGetTipoAgendas = () => {
    api.get("/tipos_de_agenda.php").then((response) => {
      setTipoAgendas(response.data);
    });
  };

  useEffect(() => {
    apiGetUnidades();
    apiGetTipoAgendas();
  }, []);

  return (
    <main>
      <Header route="/login-admin" />

      <Container maxWidth="xs" sx={{ pb: "80px" }}>
        <Info>Olá, Servidor X</Info>

        <Title>Faça o(s) agendamento(s) do(s) paciente(s) abaixo:</Title>

        <Link href="/admin/cadastrar-agendamento">
          <Button fullWidth>Cadastrar agendamento</Button>
        </Link>

        <Subtitle>Consultar agendamentos</Subtitle>

        <Text>
          Para consultar os agendamentos já cadastrados, você deve preencher os
          campos abaixo:
        </Text>

        <form onSubmit={handleSubmit(apiSendForm)}>
          <Label htmlFor="unityHealth">Unidades de Saúde:</Label>

          <Controller
            control={control}
            name="unityHealth"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Select
                id="unityHealth"
                name="unityHealth"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                displayEmpty
                sx={{
                  mb: "16px",
                }}
                error={Boolean(errors.unityHealth)}
                fullWidth
              >
                <MenuItem value={""}>Selecione a unidade</MenuItem>

                {unidades?.map((item) => (
                  <MenuItem key={item.idunid} value={item.idunid}>
                    {item.nomeunidade}
                  </MenuItem>
                ))}
              </Select>
            )}
          />

          <Label htmlFor="unityHealth">Tipo de agenda:</Label>

          <Controller
            control={control}
            name="typeSchedule"
            defaultValue=""
            rules={{ required: false }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Select
                id="typeSchedule"
                name="typeSchedule"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                displayEmpty
                sx={{
                  mb: "16px",
                }}
                error={Boolean(errors.typeSchedule)}
                fullWidth
              >
                <MenuItem value={""}>Selecione o tipo de agenda</MenuItem>

                {tipoAgendas?.length > 0 &&
                  tipoAgendas?.map((item) => (
                    <MenuItem key={item.idtipo} value={item.idtipo}>
                      {item.tipo}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />

          <Label htmlFor="status">Status de agendamento:</Label>

          <Controller
            control={control}
            name="status"
            defaultValue=""
            rules={{ required: false }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Select
                id="status"
                name="status"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                displayEmpty
                sx={{
                  mb: "16px",
                }}
                error={Boolean(errors.status)}
                fullWidth
              >
                <MenuItem value={""}>Selecione o status</MenuItem>

                <MenuItem value={"A"}>Aberto</MenuItem>
                <MenuItem value={"S"}>Confirmado</MenuItem>
                <MenuItem value={"N"}>Cancelado</MenuItem>
              </Select>
            )}
          />

          <Label htmlFor="status">Definir período:</Label>

          <Grid mb={"24px"} container spacing={2}>
            <Grid item md={6}>
              <Controller
                control={control}
                name="startDate"
                defaultValue=""
                rules={{ required: false }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    id="startDate"
                    name="startDate"
                    value={value}
                    onChange={onChange}
                    type="date"
                    onBlur={onBlur}
                    error={Boolean(errors.startDate)}
                    helperText={errors.startDate?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item md={6}>
              <Controller
                control={control}
                name="endDate"
                defaultValue=""
                rules={{ required: false }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    id="endDate"
                    name="endDate"
                    value={value}
                    onChange={onChange}
                    type="date"
                    onBlur={onBlur}
                    error={Boolean(errors.endDate)}
                    helperText={errors.endDate?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>

          <Button fullWidth type="submit">
            Pesquisar
          </Button>
        </form>

        <Description>Outras funções:</Description>

        <Box
          sx={{
            display: "flex",
            gap: "16px",
            flexDirection: "column",
          }}
        >
          <Link href="/admin/cadastrar-paciente">
            <Button
              fullWidth
              sx={{
                backgroundColor: "transparent!important",
                border: "1px solid var(--secondary-color)!important",
                color: "var(--secondary-color)!important",
              }}
            >
              Cadastrar paciente
            </Button>
          </Link>

          <Link href="/admin/cadastrar-responsavel">
            <Button
              fullWidth
              sx={{
                backgroundColor: "transparent!important",
                border: "1px solid var(--secondary-color)!important",
                color: "var(--secondary-color)!important",
              }}
            >
              Cadastrar responsável
            </Button>
          </Link>

          <Link href="/admin/cadastrar-medico">
            <Button
              fullWidth
              sx={{
                backgroundColor: "transparent!important",
                border: "1px solid var(--secondary-color)!important",
                color: "var(--secondary-color)!important",
              }}
            >
              Cadastrar médico
            </Button>
          </Link>

          <Link href="/admin/cadastrar-unidade">
            <Button
              fullWidth
              sx={{
                backgroundColor: "transparent!important",
                border: "1px solid var(--secondary-color)!important",
                color: "var(--secondary-color)!important",
              }}
            >
              Cadastrar unidade
            </Button>
          </Link>

          {/* <Link href="/admin/meu-perfil">
            <Button
              fullWidth
              sx={{
                backgroundColor: "transparent!important",
                border: "1px solid var(--secondary-color)!important",
                color: "var(--secondary-color)!important",
              }}
            >
              Meu perfil
            </Button>
          </Link> */}
        </Box>
      </Container>
    </main>
  );
}