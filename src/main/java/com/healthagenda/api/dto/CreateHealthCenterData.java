package com.healthagenda.api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

public record CreateHealthCenterData(
        @NotBlank String centerName,
        @Valid CreateAddressData address
) {
}
