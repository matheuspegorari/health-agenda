package com.healthagenda.api.dto.get;

import com.healthagenda.api.model.Patient;

public record GetPatientData (
        Long id,
        String fullName,
        String cpf
){
    public GetPatientData(Patient p){
        this(p.getId(), p.getFullName(), p.getCpf());
    }
}
