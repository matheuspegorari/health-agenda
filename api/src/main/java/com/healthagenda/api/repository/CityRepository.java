package com.healthagenda.api.repository;

import com.healthagenda.api.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CityRepository extends JpaRepository<City, Long> {

    @Query("SELECT c FROM City c WHERE c.id = :id")
    City findCityById(Long id);
}
