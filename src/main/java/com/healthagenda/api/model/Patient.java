package com.healthagenda.api.model;

import com.healthagenda.api.dto.CreatePatientData;
import com.healthagenda.api.repository.AddressRepository;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity(name = "Patient")
@Table(name = "patient")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String fullName;
    @Column(nullable = false)
    private String cpf;
    @Column(nullable = false)
    private String cns;
    @Column(nullable = false)
    private Date dtnasc;
    @ManyToOne
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;
    private String phone1;
    private String phone2;

    public Patient(CreatePatientData data, Address address) {
        this.fullName = data.fullName();
        this.cpf = data.cpf();
        this.cns = data.cns();
        this.dtnasc = data.dtnasc();
        this.phone1 = data.phone1();
        this.phone2 = data.phone2();
        this.address = address;
    }
}
