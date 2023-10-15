package com.healthagenda.api.controller;


import com.healthagenda.api.dto.CreateHealthCenterData;
import com.healthagenda.api.exception.ErrorMessage;
import com.healthagenda.api.model.Address;
import com.healthagenda.api.model.City;
import com.healthagenda.api.model.HealthCenter;
import com.healthagenda.api.repository.AddressRepository;
import com.healthagenda.api.repository.CityRepository;
import com.healthagenda.api.repository.HealthCenterRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/healthcenter")
public class HealthCenterController {
    private final HealthCenterRepository healthCenterRepository;
    private final AddressRepository addressRepository;
    private final CityRepository cityRepository;

    public HealthCenterController(HealthCenterRepository healthCenterRepository, AddressRepository addressRepository, CityRepository cityRepository) {
        this.healthCenterRepository = healthCenterRepository;
        this.addressRepository = addressRepository;
        this.cityRepository = cityRepository;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Object> create (@RequestBody @Valid CreateHealthCenterData data){
        City city =  cityRepository.findCityById(data.address().city());
        if (city == null) {
            return new ResponseEntity<>(new ErrorMessage("City not found with the specified ID or no ID was provided."), HttpStatus.NOT_FOUND);
        }
        Address address = addressRepository.save(new Address(data.address(), city));
        HealthCenter healthCenter = healthCenterRepository.save(new HealthCenter(data, address));
        return new ResponseEntity<>(healthCenter, HttpStatus.CREATED);
    }

}
