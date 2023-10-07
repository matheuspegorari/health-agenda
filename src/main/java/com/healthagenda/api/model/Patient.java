package com.healthagenda.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity(name = "patients")
@Table(name = "patients")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Patients {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cpf;
    private String cns;
    private Date dtnasc;
    @OneToOne(mappedBy = "patients", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Address address;
    private String phone1;
    private String phone2;
}
