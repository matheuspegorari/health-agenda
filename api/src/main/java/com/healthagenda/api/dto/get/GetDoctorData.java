package com.healthagenda.api.dto.get;

import com.healthagenda.api.model.Doctor;

public record GetDoctorData(
        Long id,
        String name,
        String specialization
) {
    public GetDoctorData(Doctor d){
        this(d.getId(), d.getName(), d.getSpecialization().toString());
    }
}
