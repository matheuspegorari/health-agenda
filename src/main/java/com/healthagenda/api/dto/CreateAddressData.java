package com.healthagenda.api.dto;

import com.healthagenda.api.model.City;
import jakarta.validation.constraints.NotBlank;

public record CreateAddressData(
         @NotBlank
         String address,
         @NotBlank String address2,
         @NotBlank String zipcode,
         Long city
) {
}
