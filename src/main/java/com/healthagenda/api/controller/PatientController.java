package com.healthagenda.api.controller;

import com.healthagenda.api.dto.CreatePatientData;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

/*
    Body:
    {
        "cpf": "48370220819",
        "cns": "123456",
        "dtnasc": "25486",
        "phone1": "1254",
        "phone2": "1254",
        "address": {
            "address": "R.Dos Alfeneiros n8",
            "address2": "Jd Sao Marcos",
            "zipcode": "13045120",
            "district": "MG",
            "city": 5
        }
    }
 */
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

}
