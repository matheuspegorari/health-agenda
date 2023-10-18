package com.healthagenda.api.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateDoctorData(
        @NotBlank
        String name,
        @NotBlank
        String licenseNumber,
        @NotBlank
        String specialization
) {
}
