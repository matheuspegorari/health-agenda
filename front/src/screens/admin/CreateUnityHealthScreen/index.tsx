import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import { useSnackbar } from "notistack";
import { useForm, Controller } from "react-hook-form";

import Header from "@/components/Header";
import { inputHandleCep } from "@/utils/maskInputs";
import { Subtitle, Title } from "./styled";
import Button from "@/components/Button";
import Label from "@/components/Label";
import TextInput from "@/components/TextInput";
import { api } from "@/utils/api";

interface DataForm {
  name: string;
  email: string;
  cep: string;
  street: string;
  number: string;
  district: string;
  complement: string;
  city: string;
  state: string;
}

export default function CreateUnityHealthScreen() {
  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DataForm>();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  const apiSendForm = (data: DataForm) => {
    setLoading(true);

    const newHealthUnit = {
      centerName: data.name?.trim(),
      email: data.email?.trim(),
      openingTime: "8:00:00",
      closingTime: "18:00:00",
      manager: null,
      address: {
        streetName: data.street,
        number: data.number,
        complement: data.complement,
        district: data.district,
        cep: data.cep,
        city: 5,
      },
    };

    api
      .post("/healthcenter", newHealthUnit)
      .then((response) => {
        reset();

        enqueueSnackbar(
          response?.data?.message ||
            "Unidade básica de saúde cadastrada com sucesso!",
          {
            variant: "success",
          }
        );
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
        setLoading(true);
      });
  };

  const apiExternViaCep = () => {
    const sanitazeCep = watch("cep").replace("-", "");

    axios
      .get(`https://viacep.com.br/ws/${sanitazeCep}/json/`)
      .then((response) => {
        setValue("district", response.data.bairro);
        setValue("city", response.data.localidade);
        setValue("street", response.data.logradouro);
        setValue("state", response.data.uf);
      });
  };

  useEffect(() => {
    if (watch("cep")) {
      if (watch("cep").length > 8) {
        apiExternViaCep();
      }
    }
  }, [watch("cep")]);

  return (
    <main>
      <Header route={"/admin/home"} />

      <Container maxWidth="xs" sx={{ pb: "80px" }}>
        <Title>Cadastrar unidade</Title>

        <form onSubmit={handleSubmit(apiSendForm)}>
          <Label>Nome da Unidade de Saúde:</Label>

          <Controller
            control={control}
            name="name"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                id="name"
                name="name"
                value={value}
                onChange={onChange}
                type="text"
                onBlur={onBlur}
                placeholder="Digite aqui o nome"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                fullWidth
                sx={{
                  mb: "16px",
                }}
              />
            )}
          />

          <Label>E-mail:</Label>

          <Controller
            control={control}
            name="email"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                id="email"
                name="email"
                value={value}
                onChange={onChange}
                type="email"
                onBlur={onBlur}
                placeholder="Digite aqui o e-mail"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                fullWidth
                sx={{
                  mb: "16px",
                }}
              />
            )}
          />

          <Subtitle>Endereço da unidade:</Subtitle>

          <Label htmlFor="cep">CEP:</Label>

          <Controller
            control={control}
            name="cep"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                id="cep"
                name="cep"
                value={value}
                onChange={(e) => inputHandleCep(e, onChange)}
                type="text"
                onBlur={onBlur}
                placeholder="Digite o CEP"
                error={Boolean(errors.cep)}
                helperText={errors.cep?.message}
                fullWidth
                sx={{
                  mb: "16px",
                }}
              />
            )}
          />

          <Label htmlFor="street">Rua:</Label>

          <Controller
            control={control}
            name="street"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                id="street"
                name="street"
                value={value}
                onChange={onChange}
                type="text"
                onBlur={onBlur}
                placeholder="Digite a rua"
                error={Boolean(errors.street)}
                helperText={errors.street?.message}
                fullWidth
                sx={{
                  mb: "16px",
                }}
              />
            )}
          />

          <Label htmlFor="number">Número:</Label>

          <Controller
            control={control}
            name="number"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                id="number"
                name="number"
                value={value}
                onChange={onChange}
                type="text"
                onBlur={onBlur}
                placeholder="Digite o número"
                error={Boolean(errors.number)}
                helperText={errors.number?.message}
                fullWidth
                sx={{
                  mb: "16px",
                }}
              />
            )}
          />

          <Label htmlFor="complement">Complemento:</Label>
          <Controller
            control={control}
            name="complement"
            defaultValue=""
            rules={{ required: false }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                id="complement"
                name="complement"
                value={value}
                onChange={onChange}
                type="text"
                onBlur={onBlur}
                placeholder="Digite o complemento"
                error={Boolean(errors.complement)}
                helperText={errors.complement?.message}
                fullWidth
                sx={{
                  mb: "16px",
                }}
              />
            )}
          />

          <Label htmlFor="district">Bairro:</Label>

          <Controller
            control={control}
            name="district"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                id="district"
                name="district"
                value={value}
                onChange={onChange}
                type="text"
                onBlur={onBlur}
                placeholder="Digite o bairro"
                error={Boolean(errors.district)}
                helperText={errors.district?.message}
                fullWidth
                sx={{
                  mb: "16px",
                }}
              />
            )}
          />

          <Label htmlFor="city">Cidade:</Label>

          <Controller
            control={control}
            name="city"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                id="city"
                name="city"
                value={value}
                onChange={onChange}
                type="text"
                onBlur={onBlur}
                placeholder="Digite a cidade"
                error={Boolean(errors.city)}
                helperText={errors.city?.message}
                fullWidth
                sx={{
                  mb: "16px",
                }}
              />
            )}
          />

          <Label>Estado:</Label>
          <Controller
            control={control}
            name="state"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                id="state"
                name="state"
                value={value}
                onChange={onChange}
                type="text"
                onBlur={onBlur}
                placeholder="Digite o estado"
                error={Boolean(errors.state)}
                helperText={errors.state?.message}
                fullWidth
                sx={{
                  mb: "24px",
                }}
              />
            )}
          />

          <Button fullWidth type="submit">
            Cadastrar unidade
          </Button>
        </form>
      </Container>
    </main>
  );
}
