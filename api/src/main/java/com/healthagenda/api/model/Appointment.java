package com.healthagenda.api.model;

import com.healthagenda.api.dto.create.CreateAppointmentData;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity(name = "Appointment")
@Table(name = "appointment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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


    public Appointment(CreateAppointmentData data, HealthCenter hc, Doctor doc, Employee emp, Patient patient, AppointmentType appointmentType) {
        this.healthCenter = hc;
        this.doctor = doc;
        this.employee = emp;
        this.patient = patient;
        this.appointmentType = appointmentType;
        this.datetime = data.datetime();
        this.comments = data.comments();
        this.status = AppointmentStatus.valueOf(data.status());
        this.created_at = LocalDateTime.now();

    }
}
