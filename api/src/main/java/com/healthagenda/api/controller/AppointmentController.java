package com.healthagenda.api.controller;

import com.healthagenda.api.dto.create.CreateAppointmentData;
import com.healthagenda.api.exception.ErrorMessage;
import com.healthagenda.api.model.Appointment;
import com.healthagenda.api.repository.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    private final HealthCenterRepository healthCenterRepository;
    private final DoctorRepository doctorRepository;
    private final EmployeeRepository employeeRepository;
    private final PatientRepository patientRepository;
    private final AppointmentTypeRepository appointmentTypeRepository;

    public AppointmentController(AppointmentRepository appointmentRepository, HealthCenterRepository healthCenterRepository, DoctorRepository doctorRepository, EmployeeRepository employeeRepository, PatientRepository patientRepository, AppointmentTypeRepository appointmentTypeRepository) {
        this.appointmentRepository = appointmentRepository;
        this.healthCenterRepository = healthCenterRepository;
        this.doctorRepository = doctorRepository;
        this.employeeRepository = employeeRepository;
        this.patientRepository = patientRepository;
        this.appointmentTypeRepository = appointmentTypeRepository;
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody @Valid CreateAppointmentData data){
        List<String> missingEntities = new ArrayList<>();

        var hc = healthCenterRepository.findHealthCenterById(data.healthCenter());
        var doc = doctorRepository.findDoctorById(data.doctor());
        var emp = employeeRepository.findEmployeeById(data.employee());
        var patient = patientRepository.findPatientById(data.patient());
        var at = appointmentTypeRepository.findAppointmentTypeById(data.appointmentType());


        var appointment = appointmentRepository.save(new
                Appointment(data, hc, doc, emp, patient, at));
        return new ResponseEntity<>(appointment, HttpStatus.CREATED);
    }
}
