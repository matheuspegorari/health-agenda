package com.healthagenda.api.model;

import com.healthagenda.api.dto.CreateAddressData;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "Address")
@Table(name = "address")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String streetName;
    private String number;
    private String complement;
    private String district;
    private String cep;
    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;


    public Address(CreateAddressData data, City city) {
        this.streetName = data.streetName();
        this.number = data.number();
        this.complement = data.complement();
        this.district = data.district();
        this.cep = data.cep();
        this.city = city;
    }
}
