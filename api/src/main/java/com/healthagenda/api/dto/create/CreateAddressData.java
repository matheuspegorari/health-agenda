package com.healthagenda.api.dto.create;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateAddressData(
         @NotBlank
         String streetName,
         @NotBlank
         String number,
         String complement,
         @NotBlank
         String district,
         @NotBlank
         String cep,
         @NotNull
         Long city
) {
}
