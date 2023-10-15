package com.healthagenda.api.repository;

import com.healthagenda.api.model.Address;
import com.healthagenda.api.model.HealthCenter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HealthCenterRepository extends JpaRepository<HealthCenter, Long> {
}
