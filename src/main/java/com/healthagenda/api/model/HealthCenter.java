package com.healthagenda.api.model;

import com.healthagenda.api.dto.CreateAddressData;
import com.healthagenda.api.dto.CreateHealthCenterData;
import com.healthagenda.api.dto.CreatePatientData;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    public HealthCenter(CreateHealthCenterData data, Address address) {
        this.centerName = data.centerName();
        this.address = address;
    }
}
