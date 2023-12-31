import { Container, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import Header from "@/components/Header";
import { Title } from "./styled";
import Label from "@/components/Label";
import Select from "@/components/Select";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";

interface DataForm {
  unityHealth: string;
  doctor: string;
  patient: string;
  typeSchedule: string;
  dateSchedule: string;
}

export default function CreateScheduleScreen() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DataForm>();

  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);
  const [healthUnits, setHealthUnits] = useState<
    {
      id: number;
      centerName: string;
    }[]
  >([]);

  const apiGetUnidades = () => {
    api
      .get("/healthcenter/names")
      .then((response) => {
        setHealthUnits(response.data);
      })
      .catch((error) => {
        enqueueSnackbar(
          error?.response?.data?.message || "Tente novamente mais tarde!",
          {
            variant: "error",
          }
        );
      });
  };

  const apiSendForm = (data: DataForm) => {
    setLoading(true);

    const newSchedule = {
      healthCenter: data.unityHealth,
      doctor: data.doctor,
      patient: data.patient,
      appointmentType: data.typeSchedule,
      datetime: data.dateSchedule,
      comments: "teste",
      status: "teste",
    };

    api
      .post("/appointment", newSchedule)
      .then((response) => {
        console.log(response.data);
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
    apiGetUnidades();
  }, []);

  return (
    <main>
      <Header route={"/admin/home"} />

      <Container maxWidth="xs">
        <Title>Cadastrar agendamento</Title>

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

                {healthUnits.length > 0 &&
                  healthUnits.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.centerName}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />

          <Label htmlFor="doctor">Médico:</Label>

          <Controller
            control={control}
            name="doctor"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Select
                id="doctor"
                name="doctor"
                value={value}
                onChange={onChange}
                error={Boolean(errors.doctor)}
                sx={{
                  mb: "16px",
                }}
                onBlur={onBlur}
                displayEmpty
                fullWidth
              >
                <MenuItem value={""}>Selecione o médico</MenuItem>
                <MenuItem value={1}>Opção 1</MenuItem>
              </Select>
            )}
          />

          <Label htmlFor="patient">Paciente:</Label>

          <Controller
            control={control}
            name="patient"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Select
                id="patient"
                name="patient"
                value={value}
                onChange={onChange}
                error={Boolean(errors.patient)}
                sx={{
                  mb: "16px",
                }}
                onBlur={onBlur}
                displayEmpty
                fullWidth
              >
                <MenuItem value={""}>Selecione o paciente</MenuItem>
                <MenuItem value={1}>Opção 1</MenuItem>
              </Select>
            )}
          />

          <Label>Tipo de agenda:</Label>

          <Controller
            control={control}
            name="typeSchedule"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Select
                id="typeSchedule"
                name="typeSchedule"
                value={value}
                onChange={onChange}
                error={Boolean(errors.typeSchedule)}
                sx={{
                  mb: "16px",
                }}
                onBlur={onBlur}
                displayEmpty
                fullWidth
              >
                <MenuItem value={""}>Selecione o tipo de agenda</MenuItem>
                <MenuItem value={1}>Opção 1</MenuItem>
              </Select>
            )}
          />

          <Label>Data do agendamento:</Label>

          <Controller
            control={control}
            name="dateSchedule"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                id="dateSchedule"
                name="dateSchedule"
                value={value}
                onChange={onChange}
                type="date"
                onBlur={onBlur}
                error={Boolean(errors.dateSchedule)}
                helperText={errors.dateSchedule?.message}
                fullWidth
                sx={{
                  mb: "24px",
                }}
              />
            )}
          />

          <Button fullWidth type="submit">
            Confirmar agendamento
          </Button>
        </form>
      </Container>
    </main>
  );
}
