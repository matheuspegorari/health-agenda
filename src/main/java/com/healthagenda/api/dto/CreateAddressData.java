package com.healthagenda.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateAddressData(
         @NotBlank
         String streetName,
         @NotBlank String number,
         @NotBlank String complement,
         @NotBlank String district,
         @NotBlank String cep,
         @NotNull Long city
) {
}
