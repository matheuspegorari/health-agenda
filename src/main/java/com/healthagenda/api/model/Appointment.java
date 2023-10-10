package com.healthagenda.api.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity(name = "appointment")
@Table(name = "appointment")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;
    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "appointmentype_id", nullable = false)
    private AppointmentType appointmentType;

    private Date date;
    private int hour;
    private String comments;
    private char status;


}
