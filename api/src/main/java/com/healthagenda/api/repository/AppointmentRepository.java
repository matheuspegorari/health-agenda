package com.healthagenda.api.repository;

import com.healthagenda.api.model.Address;
import com.healthagenda.api.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
