package com.healthagenda.api.controller;

import com.healthagenda.api.dto.CreateAddressData;
import com.healthagenda.api.dto.CreateDoctorData;
import com.healthagenda.api.repository.DoctorRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {

    private final DoctorRepository doctorRepository;

    public DoctorController(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Object> create(@RequestBody CreateDoctorData data){

    }
}
