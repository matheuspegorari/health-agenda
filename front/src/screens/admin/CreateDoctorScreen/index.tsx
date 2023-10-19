import Header from "@/components/Header";
import { Container } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Description, Title } from "./styled";
import TextInput from "@/components/TextInput";
import Label from "@/components/Label";
import Button from "@/components/Button";

interface DataForm {
  name: string;
  crm: string;
  specialty: string;
}

export default function CreateDoctorScreen() {
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

      <Container maxWidth="xs">
        <Title>Cadastrar médico</Title>

        <Description>Dados do médico:</Description>

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

          <Label>CRM:</Label>
          <Controller
            control={control}
            name="crm"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                id="crm"
                name="crm"
                value={value}
                onChange={onChange}
                type="text"
                onBlur={onBlur}
                placeholder="Digite o CRM"
                error={Boolean(errors.crm)}
                helperText={errors.crm?.message}
                fullWidth
                sx={{
                  mb: "16px",
                }}
              />
            )}
          />

          <Label>Especialidade:</Label>
          <Controller
            control={control}
            name="specialty"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                id="specialty"
                name="specialty"
                value={value}
                onChange={onChange}
                type="text"
                onBlur={onBlur}
                placeholder="Digite a especialidade"
                error={Boolean(errors.specialty)}
                helperText={errors.specialty?.message}
                fullWidth
                sx={{
                  mb: "24px",
                }}
              />
            )}
          />

          <Button fullWidth type="submit">
            Cadastrar médico
          </Button>
        </form>
      </Container>
    </main>
  );
}
