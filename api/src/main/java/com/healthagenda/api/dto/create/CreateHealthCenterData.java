package com.healthagenda.api.dto.create;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalTime;

public record CreateHealthCenterData(
        @NotBlank(message = "Health Center must have a name") String centerName,
        String phone,
        @Email
        String email,

        @NotBlank String openingTime,
        @NotBlank String closingTime,
        Long manager,
        @Valid CreateAddressData address

) {

}
