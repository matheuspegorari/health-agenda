package com.healthagenda.api.controller;

import com.healthagenda.api.dto.CreateAddressData;
import com.healthagenda.api.dto.CreateDoctorData;
import com.healthagenda.api.exception.ErrorMessage;
import com.healthagenda.api.model.Doctor;
import com.healthagenda.api.model.Specialization;
import com.healthagenda.api.repository.DoctorRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        try {
            Specialization.valueOf(data.specialization().toUpperCase());
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new ErrorMessage("Specialization not found."), HttpStatus.NOT_FOUND);
        }
        Doctor doc = doctorRepository.save(new Doctor(data));
        return new ResponseEntity<>(doc, HttpStatus.CREATED);
    }


}
