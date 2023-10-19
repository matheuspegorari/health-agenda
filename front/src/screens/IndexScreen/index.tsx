import { Box, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import Link from "next/link";
import { Description, Title } from "./styled";
import Button from "@/components/Button";
import Image from "next/image";

export default function IndexScreen() {
  return (
    <main>
      <Container maxWidth="xs">
        <Box
          sx={{
            mt: "32px",
            mb: "32px",
            ".swiper-slide": {
              transition: "all 200ms ease-out",
            },
            ".swiper-slide-active": {
              opacity: "1!important",
              scale: "1!important",
            },
            ".swiper-pagination-bullet": {
              background: "#979797!important",
              opacity: 0.8,
            },
            ".swiper-pagination-bullet-active": {
              background: "#640CA8!important",
              opacity: 1,
            },
          }}
        >
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            loop
            onSwiper={(swiper) => console.log(swiper)}
            pagination={true}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            style={{
              minHeight: "520px",
            }}
          >
            <SwiperSlide>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  height: "300px",
                  justifyContent: "center",
                }}
              >
                <Image
                  src="/assets/images/home_slide_1.svg"
                  alt="Image slide 1"
                  width="300"
                  height="277"
                />
              </Box>

              <Title>
                Tem consulta <br /> marcada?
              </Title>

              <Description>
                Descubra se voê tem consulta ou exame marcada nas Unidades de
                Saúde do município.
              </Description>
            </SwiperSlide>

            <SwiperSlide>
              <Box
                sx={{
                  width: "100%",
                  height: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src="/assets/images/home_slide_2.svg"
                  alt="Image slide 2"
                  width="300"
                  height="277"
                />
              </Box>

              <Title>
                Descubra os postos <br />
                próximos a você
              </Title>

              <Description>
                Descubra os postos de saúde na sua cidade e veja as principais
                informações.
              </Description>
            </SwiperSlide>

            <SwiperSlide>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  height: "300px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src="/assets/images/home_slide_3.svg"
                  alt="Image slide 3"
                  width="300"
                  height="277"
                />
              </Box>

              <Title>
                Faça a gestão dos <br /> seus agendamentos
              </Title>

              <Description>
                Tenha a facilidade de fazer agendamentos de pacientes de forma
                on-line e rápida.
              </Description>
            </SwiperSlide>
          </Swiper>
        </Box>

        <Link href="/inicio">
          <Button fullWidth>Acessar app</Button>
        </Link>
      </Container>
    </main>
  );
}
