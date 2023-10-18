package com.healthagenda.api.repository;

import com.healthagenda.api.model.Address;
import com.healthagenda.api.model.City;
import com.healthagenda.api.model.HealthCenter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface HealthCenterRepository extends JpaRepository<HealthCenter, Long> {
    @Query("SELECT h FROM HealthCenter h WHERE h.id = :id")
    HealthCenter findHealthCenterById(Long id);

}
