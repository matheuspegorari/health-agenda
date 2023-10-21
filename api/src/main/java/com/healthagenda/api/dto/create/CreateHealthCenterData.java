package com.healthagenda.api.dto.create;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.time.LocalTime;

public record CreateHealthCenterData(
        @NotBlank(message = "Health Center must have a name") String centerName,
        String phone,
        @Email
        String email,

        @Pattern(regexp = "^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$",message = "Please enter a valid time in the format HH:mm (e.g., 15:45)" )
        @NotBlank
        String openingTime,
        @Pattern(regexp = "^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$",message = "Please enter a valid time in the format HH:mm (e.g., 15:45)" )
        @NotBlank
        String closingTime,
        Long manager,
        @Valid
        CreateAddressData address

) {

}
