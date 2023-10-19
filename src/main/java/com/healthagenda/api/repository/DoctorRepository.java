package com.healthagenda.api.repository;

import com.healthagenda.api.model.Address;
import com.healthagenda.api.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    @Query("SELECT d FROM Doctor d WHERE d.id = :id")
    Doctor findDoctorById(Long id);
}
