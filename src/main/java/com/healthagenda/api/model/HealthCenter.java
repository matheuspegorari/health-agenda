package com.healthagenda.api.model;

import com.healthagenda.api.dto.CreateAddressData;
import com.healthagenda.api.dto.CreateHealthCenterData;
import com.healthagenda.api.dto.CreatePatientData;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.Date;

@Entity(name = "HealthCenter")
@Table(name = "healthcenter")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class HealthCenter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String centerName;
    @ManyToOne
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;
    private String email;
    private LocalTime openingTime;
    private LocalTime closingTime;
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee manager;

    public HealthCenter(CreateHealthCenterData data, Address address, Employee manager) {
        this.centerName = data.centerName();
        this.email = data.email();
        this.openingTime = data.openingTime();
        this.closingTime = data.closingTime();
        this.address = address;
        this.manager = manager;
    }
}