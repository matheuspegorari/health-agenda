package com.healthagenda.api.repository;

import com.healthagenda.api.model.AppointmentType;
import com.healthagenda.api.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AppointmentTypeRepository extends JpaRepository<AppointmentType, Long> {

    @Query("SELECT a FROM AppointmentType a WHERE a.id = :id")
    AppointmentType findAppointmentTypeById(Long id);
}
