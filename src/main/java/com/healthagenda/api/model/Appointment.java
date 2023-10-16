package com.healthagenda.api.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity(name = "Appointment")
@Table(name = "appointment")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "healthcenter_id", nullable = false)
    private HealthCenter healthCenter;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;
    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "appointmentype_id", nullable = false)
    private AppointmentType appointmentType;

    private LocalDateTime datetime;
    private String comments;
    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;

    private LocalDateTime created_at;
    private LocalDateTime updated_at;


}
