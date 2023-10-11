package com.healthagenda.api.repository;

import com.healthagenda.api.model.Address;
import com.healthagenda.api.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
