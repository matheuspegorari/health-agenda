package com.healthagenda.api.controller;


import com.healthagenda.api.dto.CreateHealthCenterData;
import com.healthagenda.api.dto.GetHealthCenterData;
import com.healthagenda.api.exception.ErrorMessage;
import com.healthagenda.api.model.Address;
import com.healthagenda.api.model.City;
import com.healthagenda.api.model.Employee;
import com.healthagenda.api.model.HealthCenter;
import com.healthagenda.api.repository.AddressRepository;
import com.healthagenda.api.repository.CityRepository;
import com.healthagenda.api.repository.EmployeeRepository;
import com.healthagenda.api.repository.HealthCenterRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/healthcenter")
public class HealthCenterController {
    private final HealthCenterRepository healthCenterRepository;
    private final AddressRepository addressRepository;
    private final CityRepository cityRepository;
    private final EmployeeRepository employeeRepository;

    public HealthCenterController(HealthCenterRepository healthCenterRepository, AddressRepository addressRepository, CityRepository cityRepository, EmployeeRepository employeeRepository) {
        this.healthCenterRepository = healthCenterRepository;
        this.addressRepository = addressRepository;
        this.cityRepository = cityRepository;
        this.employeeRepository = employeeRepository;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Object> create (@RequestBody @Valid CreateHealthCenterData data){
        Employee employee = employeeRepository.findEmployeeById(data.manager());
        City city =  cityRepository.findCityById(data.address().city());
        if (city == null) {
            return new ResponseEntity<>(new ErrorMessage("City not found with the specified ID or no ID was provided."), HttpStatus.NOT_FOUND);
        }
        Address address = addressRepository.save(new Address(data.address(), city));
        HealthCenter healthCenter = healthCenterRepository.save(new HealthCenter(data, address, employee));
        return new ResponseEntity<>(healthCenter, HttpStatus.CREATED);
    }

    @GetMapping
    public List<HealthCenter> getAllHealthCenter(){
        return healthCenterRepository.findAll();
    }


    @GetMapping("/names")
    public List<GetHealthCenterData> getHealthCenterNames(){
        return healthCenterRepository
                .findAll()
                .stream()
                .map(GetHealthCenterData::new)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getHealthCenterById (@PathVariable Long id){
        HealthCenter hc = healthCenterRepository.findHealthCenterById(id);
        return new ResponseEntity<>(hc, HttpStatus.OK);
    }
}
