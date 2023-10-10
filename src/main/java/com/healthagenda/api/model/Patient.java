package com.healthagenda.api.model;

import com.healthagenda.api.controller.CreatePatientData;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity(name = "patient")
@Table(name = "patient")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cpf;
    private String cns;
    private Date dtnasc;
    @ManyToOne
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;
    private String phone1;
    private String phone2;

    public Patient(CreatePatientData data) {
        this.cpf = data.cpf();
        this.cns = data.cns();
        this.dtnasc = data.dtnasc();
        this.address = data.address();
        this.phone1 = data.phone1();
        this.phone2 = data.phone2();
    }
}
