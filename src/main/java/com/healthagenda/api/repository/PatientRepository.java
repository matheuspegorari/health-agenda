package com.healthagenda.api.repository;

import com.healthagenda.api.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    @Query("Select p From Patient p Where p.id = :id")
    Patient findPatientById(Long id);
}
