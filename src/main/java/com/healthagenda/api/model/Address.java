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
    private String address;
    private String address2;
    private String zipcode;
    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;


    public Address(CreateAddressData data, City city) {
        this.address = data.address();
        this.address2 = data.address2();
        this.zipcode = data.zipcode();
        this.city = city;
    }
}
