package com.healthagenda.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.healthagenda.api.model.Employee;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalTime;

public record CreateHealthCenterData(
        @NotBlank String centerName,
        @Email
        String email,

        @Schema(type = "String", pattern = "HH:mm:SS")
        @NotNull LocalTime openingTime,
        @Schema(type = "String", pattern = "HH:mm:SS")
        @NotNull LocalTime closingTime,
        Long manager,
        @Valid CreateAddressData address

) {

}
