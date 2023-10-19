import { useState } from "react";
import { Box, Container, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";

import Label from "@/components/Label";
import TextInput from "@/components/TextInput";
import { Title } from "./styled";
import Button from "@/components/Button";

interface DataForm {
  email: string;
  password: string;
}

export default function LoginAdminScreen() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DataForm>();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const apiSendForm = (data: DataForm) => {
    console.log(data);

    router.push("/admin/home");
  };

  return (
    <main>
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            marginTop: "32px",
            marginBottom: "80px",
            marginLeft: "-16px",
          }}
        >
          <Link href={"/inicio"} style={{ display: "flex" }}>
            <IconButton
              sx={{
                img: {
                  height: "auto",
                },
              }}
            >
              <Image
                src="/assets/images/icone_seta_voltar.svg"
                alt="Ícones"
                width="28"
                height="28"
              />
            </IconButton>
          </Link>

          <Title>Entrar</Title>
        </Box>

        <form onSubmit={handleSubmit(apiSendForm)}>
          <Label htmlFor="email">E-mail:</Label>

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
                placeholder="exemplo@gmail.com"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                fullWidth
                sx={{
                  mb: "16px",
                }}
              />
            )}
          />

          <Label htmlFor="password">Sua senha:</Label>

          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{ required: "Este campo é necessário" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                id="password"
                name="password"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                type="password"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                sx={{
                  mb: "32px",
                }}
                placeholder="Digite sua senha"
                fullWidth
              />
            )}
          />

          <Button type="submit" fullWidth>
            Entrar
          </Button>
        </form>
      </Container>
    </main>
  );
}
