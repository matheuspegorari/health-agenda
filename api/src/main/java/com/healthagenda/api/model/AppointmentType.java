package com.healthagenda.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "AppointmentType")
@Table(name = "appointmentype")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String type;
}
