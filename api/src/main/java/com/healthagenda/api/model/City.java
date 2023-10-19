package com.healthagenda.api.model;

import com.healthagenda.api.dto.CreateCityData;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "City")
@Table(name = "city")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String city;
    private String state;
    private String country;


    public City(CreateCityData data) {
        this.city = data.city();
    }
}
