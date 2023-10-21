package com.healthagenda.api.controller;

import com.healthagenda.api.dto.create.CreatePatientData;
import com.healthagenda.api.dto.get.GetPatientData;
import com.healthagenda.api.exception.ErrorMessage;
import com.healthagenda.api.model.Address;
import com.healthagenda.api.model.City;
import com.healthagenda.api.model.Patient;
import com.healthagenda.api.repository.AddressRepository;
import com.healthagenda.api.repository.CityRepository;
import com.healthagenda.api.repository.PatientRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patient")
public class PatientController {

    private final PatientRepository patientRepository;
    private final AddressRepository addressRepository;
    private final CityRepository cityRepository;

    public PatientController(PatientRepository patientRepository,
                             AddressRepository addressRepository,
                             CityRepository cityRepository) {
        this.patientRepository = patientRepository;
        this.addressRepository = addressRepository;
        this.cityRepository = cityRepository;

    }
    @PostMapping
    @Transactional
    public ResponseEntity<Object> create(@RequestBody @Valid CreatePatientData data){
        City city =  cityRepository.findCityById(data.address().city());
        if (city == null) {
            return new ResponseEntity<>(new ErrorMessage("City not found with the specified ID or no ID was provided."), HttpStatus.NOT_FOUND);
        }
        Address address = addressRepository.save(new Address(data.address(), city));
        Patient patient = patientRepository.save(new Patient(data, address));
        return new ResponseEntity<>(patient, HttpStatus.CREATED);
    }

    @GetMapping
    public List<GetPatientData> getAllPatientData(){
        return patientRepository.
                findAll()
                .stream()
                .map(GetPatientData::new)
                .toList()
                ;
    }

}
