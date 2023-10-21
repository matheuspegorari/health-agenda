package com.healthagenda.api.dto.create;

import com.healthagenda.api.model.*;

import java.time.LocalDateTime;

public record CreateAppointmentData(
        Long healthCenter,
        Long doctor,
        Long employee,
        Long patient,
        Long appointmentType,
        LocalDateTime datetime,
        String comments,
        String status
) {
}
