package com.healthagenda.api.dto;

import com.healthagenda.api.model.Address;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record CreatePatientData(

        @NotBlank String fullName,
        @NotBlank String cpf,
        @NotBlank String cns,
        @NotNull Date dtnasc,
        String phone1, String phone2,
        @Valid CreateAddressData address
        ) {
}
