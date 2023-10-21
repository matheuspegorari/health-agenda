package com.healthagenda.api.dto.create;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record CreatePatientData(

        @NotBlank(message = "Patient must have a name") String fullName,
        @NotBlank String cpf,
        @NotBlank String cns,
        @NotNull Date dtnasc,
        String phone1, String phone2,
        @Valid CreateAddressData address
        ) {
}
