import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/router";

import { inputHandleCpfChange } from "@/utils/maskInputs";
import { CardUnity, Description, Subtitle, Title } from "./styled";
import Label from "@/components/Label";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { api } from "@/utils/api";
import { useSnackbar } from "notistack";

interface DataForm {
  cpf: string;
  birthday: string;
}

export default function HomeScreen() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DataForm>();

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [unidades, setUnidades] = useState<
    {
      id: number;
      centerName: string;
    }[]
  >([]);

  const apiGetUnidades = () => {
    api
      .get("/healthcenter/names")
      .then((response) => {
        setUnidades(response.data);
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
    localStorage.setItem("cpf", data.cpf);
    localStorage.setItem("birthday", data.birthday);

    router.push("/agendamentos");
  };

  useEffect(() => {
    apiGetUnidades();
  }, []);

  return (
    <main>
      <Header route="/inicio" />

      <Container maxWidth="xs">
        <Title>Consultar agendamento</Title>

        <Description>
          Para consultar o seu agendamento, você deverá preencher os campos
          abaixo:
        </Description>

        <form onSubmit={handleSubmit(apiSendForm)}>
          <Label htmlFor="cpf">CPF (Cadastro de Pessoas Físicas):</Label>

          <Controller
            control={control}
            name="cpf"
            defaultValue=""
            rules={{
              required: "Este campo é necessário",
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                id="cpf"
                name="cpf"
                value={value}
                onChange={(e) => inputHandleCpfChange(e, onChange)}
                onBlur={onBlur}
                placeholder="Digite o CPF"
                error={Boolean(errors.cpf)}
                helperText={errors.cpf?.message}
                InputProps={{
                  inputMode: "numeric",
                }}
                fullWidth
                sx={{
                  mb: "16px",
                }}
                type="text"
              />
            )}
          />

          <Label htmlFor="date">Data de nascimento:</Label>

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
                type="date"
                onChange={onChange}
                error={Boolean(errors.birthday)}
                helperText={errors.birthday?.message}
                InputProps={{
                  inputMode: "numeric",
                }}
                fullWidth
                sx={{
                  mb: "24px",
                }}
                onBlur={onBlur}
              />
            )}
          />

          <Button fullWidth type="submit">
            Pesquisar
          </Button>
        </form>

        <Subtitle>Unidades de Saúde</Subtitle>

        <Box
          sx={{
            pb: "32px",
            ".swiper-slide": {
              transition: "all 200ms ease-out",
            },
            ".swiper-slide-active": {
              opacity: "1!important",
              scale: "1!important",
            },
            ".swiper-pagination-bullet": {
              background: "#FFF!important",
              opacity: 0.8,
            },
            ".swiper-pagination-bullet-active": {
              background: "#F9CA03!important",
              opacity: 1,
            },
          }}
        >
          <Swiper
            spaceBetween={16}
            slidesPerView={2.2}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {unidades?.map((item) => (
              <SwiperSlide key={item.id}>
                <Link href={`/unidades/${item.id}`}>
                  <CardUnity>
                    <Image
                      src="/assets/images/placeholder_unidade.png"
                      alt="Unidade de saúde"
                      width="200"
                      height="200"
                    />

                    <h3>{item.centerName}</h3>
                  </CardUnity>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </main>
  );
}
