package com.healthagenda.api.controller;

import com.healthagenda.api.model.Address;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record CreatePatientData(

        @NotBlank
        String cpf,
        @NotBlank
        String cns,
        @NotBlank
        Date dtnasc,
        @NotNull
        Address address,
        @NotBlank
        String phone1,
        String phone2) {
}
