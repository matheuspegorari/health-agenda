import { useEffect } from "react";
import { Container } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import axios from "axios";

import Label from "@/components/Label";
import Header from "@/components/Header";
import {
  inputHandleCep,
  inputHandleCpfChange,
  inputHandlePhone,
} from "@/utils/maskInputs";
import { Description, Subtitle, Title } from "./styled";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { api } from "@/utils/api";

interface DataForm {
  name: string;
  birthday: string;
  cpf: string;
  cns: string;
  telephone: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  district: string;
  complement: string;
  city: string;
  state: string;
}

export default function CreatePatientScreen() {
  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DataForm>();

  const { enqueueSnackbar } = useSnackbar();

  const apiSendForm = (data: DataForm) => {
    const newPatient = {
      fullName: data.name?.trim(),
      cpf: data.cpf,
      cns: data.cns,
      dtnasc: data.birthday,
      phone1: data.phone,
      phone2: data.telephone,
      address: {
        streetName: data.street,
        number: data.number,
        complement: data.complement,
        district: data.district,
        cep: data.cep,
        city: 1,
      },
    };

    api
      .post("/patient", newPatient)
      .then((response) => {
        enqueueSnackbar("Paciente cadastrado com sucesso", {
          variant: "success",
        });

        reset();
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
        <Title>Cadastrar paciente</Title>

        <Description>Dados pessoais do paciente:</Description>

        <form onSubmit={handleSubmit(apiSendForm)}>
          <Label htmlFor="name">Nome:</Label>

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
                placeholder="Digite aqui o nome completo"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                fullWidth
                sx={{
                  mb: "16px",
                }}
              />
            )}
          />

          <Label htmlFor="birthday">Data de nascimento:</Label>

          <Controller
            control={control}
            name="birthday"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                id="birthday"
                name="birthday"
                value={value}
                onChange={onChange}
                type="date"
                onBlur={onBlur}
                error={Boolean(errors.birthday)}
                helperText={errors.birthday?.message}
                fullWidth
                sx={{
                  mb: "16px",
                }}
              />
            )}
          />

          <Label htmlFor="cpf">CPF:</Label>

          <Controller
            control={control}
            name="cpf"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                id="cpf"
                name="cpf"
                value={value}
                onChange={(e) => inputHandleCpfChange(e, onChange)}
                type="text"
                onBlur={onBlur}
                placeholder="Digite o CPF do paciente"
                error={Boolean(errors.cpf)}
                helperText={errors.cpf?.message}
                fullWidth
                sx={{
                  mb: "16px",
                }}
              />
            )}
          />

          <Label htmlFor="cns">CNS:</Label>
          <Controller
            control={control}
            name="cns"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                id="cns"
                name="cns"
                value={value}
                onChange={onChange}
                type="text"
                onBlur={onBlur}
                placeholder="Digite o CNS"
                error={Boolean(errors.cns)}
                helperText={errors.cns?.message}
                fullWidth
                sx={{
                  mb: "16px",
                }}
              />
            )}
          />

          <Label htmlFor="telephone">Telefone Fixo(com DDD):</Label>

          <Controller
            control={control}
            name="telephone"
            defaultValue=""
            rules={{ required: false }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                id="telephone"
                name="telephone"
                value={value}
                onChange={(e) => inputHandlePhone(e, onChange)}
                type="text"
                onBlur={onBlur}
                placeholder="Digite o telefone fixo"
                error={Boolean(errors.telephone)}
                helperText={errors.telephone?.message}
                fullWidth
                sx={{
                  mb: "16px",
                }}
              />
            )}
          />

          <Label htmlFor="phone">Celular (com DDD):</Label>

          <Controller
            control={control}
            name="phone"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                id="phone"
                name="phone"
                value={value}
                onChange={(e) => inputHandlePhone(e, onChange)}
                type="text"
                onBlur={onBlur}
                placeholder="Digite o celular"
                error={Boolean(errors.phone)}
                helperText={errors.phone?.message}
                fullWidth
                sx={{
                  mb: "16px",
                }}
              />
            )}
          />

          <Subtitle>Endereço do paciente:</Subtitle>

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
            Cadastrar paciente
          </Button>
        </form>
      </Container>
    </main>
  );
}
