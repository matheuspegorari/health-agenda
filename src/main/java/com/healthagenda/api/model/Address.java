package com.healthagenda.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "address")
@Table(name = "address")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String address;
    private String address2;
    private String zipcode;
    private String district;
    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;






}
