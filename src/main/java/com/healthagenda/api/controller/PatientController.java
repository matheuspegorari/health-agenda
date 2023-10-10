package com.healthagenda.api.controller;

import com.healthagenda.api.model.Patient;
import com.healthagenda.api.repository.PatientRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/patient")
public class PatientController {

    private final PatientRepository repository;

    public PatientController(PatientRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    @Transactional
    public void create(@RequestBody @Valid CreatePatientData data){
        repository.save(new Patient(data));
    }
}
