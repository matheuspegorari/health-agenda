package com.healthagenda.api.dto;

import com.healthagenda.api.model.Address;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record CreatePatientData(
        String cpf,
        String cns,
        Date dtnasc,
        String phone1, String phone2,
        CreateAddressData address
        ) {
}
