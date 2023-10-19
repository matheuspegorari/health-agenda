package com.healthagenda.api.repository;

import com.healthagenda.api.model.Address;
import com.healthagenda.api.model.City;
import com.healthagenda.api.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query("SELECT e FROM Employee e WHERE e.id = :id")
    Employee findEmployeeById(Long id);
}
