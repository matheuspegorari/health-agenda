package com.healthagenda.api.dto.create;

import com.healthagenda.api.model.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CreateAppointmentData(
        @NotNull
        Long healthCenter,
        Long doctor,
        Long employee,
        @NotNull Long patient,
        @NotNull Long appointmentType,
        @NotBlank LocalDateTime datetime,
        String comments
) {
}
