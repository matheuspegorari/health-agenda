package com.healthagenda.api.dto;

import com.healthagenda.api.model.Employee;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalTime;

public record CreateHealthCenterData(
        @NotBlank String centerName,
        @Email
        String email,
        @NotNull LocalTime openingTime,
        @NotNull LocalTime closingTime,
        Long manager,
        @Valid CreateAddressData address
) {
}
