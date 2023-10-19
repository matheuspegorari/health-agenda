import { Container, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import { inputHandleCpfChange, inputHandlePhone } from "@/utils/maskInputs";
import Header from "@/components/Header";
import { Description, Title } from "./styled";
import Label from "@/components/Label";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import Select from "@/components/Select";

interface DataForm {
  name: string;
  birthday: string;
  cpf: string;
  family: string;
  patient: string;
  telephone: string;
  phone: string;
  email: string;
}

export default function CreateResponsibleScreen() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DataForm>();

  const apiSendForm = (data: DataForm) => {
    console.log(data);
  };

  return (
    <main>
      <Header route={"/admin/home"} />

      <Container maxWidth="xs" sx={{ pb: "80px" }}>
        <Title>Cadastrar responsável</Title>

        <Description>Dados pessoais do responsável:</Description>

        <form onSubmit={handleSubmit(apiSendForm)}>
          <Label>Nome:</Label>

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

          <Label>Data de nascimento:</Label>
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

          <Label>CPF:</Label>
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
                placeholder="Digite o CPF"
                error={Boolean(errors.cpf)}
                helperText={errors.cpf?.message}
                fullWidth
                sx={{
                  mb: "16px",
                }}
              />
            )}
          />

          <Label>Parentesco:</Label>
          <Controller
            control={control}
            name="family"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                id="family"
                name="family"
                value={value}
                onChange={onChange}
                type="text"
                onBlur={onBlur}
                placeholder="Digite o seu grau de parentesco"
                error={Boolean(errors.family)}
                helperText={errors.family?.message}
                fullWidth
                sx={{
                  mb: "16px",
                }}
              />
            )}
          />

          <Label>Paciente:</Label>
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
                onBlur={onBlur}
                displayEmpty
                sx={{
                  mb: "16px",
                }}
                error={Boolean(errors.patient)}
                fullWidth
              >
                <MenuItem value={""}>Selecione o paciente</MenuItem>
                <MenuItem value={1}>Opção 1</MenuItem>
              </Select>
            )}
          />

          <Label>Telefone fixo (com DDD):</Label>
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

          <Label>Celular (com DDD):</Label>
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
                placeholder="Digite o e-mail"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                fullWidth
                sx={{
                  mb: "24px",
                }}
              />
            )}
          />

          <Button fullWidth type="submit">
            Cadastrar responsável
          </Button>
        </form>
      </Container>
    </main>
  );
}
