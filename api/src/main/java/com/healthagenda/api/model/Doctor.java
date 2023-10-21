package com.healthagenda.api.model;

import com.healthagenda.api.dto.create.CreateDoctorData;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "Doctor")
@Table(name = "doctor")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String licenseNumber;
    @Enumerated(EnumType.STRING)
    private Specialization specialization;

    public Doctor(CreateDoctorData data) {
        this.name = data.name();
        this.licenseNumber = data.licenseNumber();
        this.specialization = Specialization.valueOf(data.specialization().toUpperCase());
    }
}
