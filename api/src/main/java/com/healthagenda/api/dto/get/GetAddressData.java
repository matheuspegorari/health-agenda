package com.healthagenda.api.dto.get;

import com.healthagenda.api.model.Address;
import java.util.Objects;

public record GetAddressData(
            Long id,
            String fullAddress,
            String streetName,
            String number,
            String complement,
            String district,
            String cep,
            String city,
            String state
) {
    public GetAddressData (Address a){
        this(
                a.getId(),
                String.format("%s, %s %s - %s, %s - %s, %s",
                        (a.getStreetName() != null ? a.getStreetName() : ""),
                        (a.getNumber() != null ? a.getNumber() : ""),
                        (a.getComplement() != null ? a.getComplement() : ""),
                        (a.getDistrict() != null ? a.getDistrict() : ""),
                        (a.getCity() != null ? a.getCity().getCity() : ""),
                        (a.getCity() != null && a.getCity().getState() != null ? a.getCity().getState() : ""),
                        (a.getCep() != null ? a.getCep() : "")
                ),
                a.getStreetName(),
                a.getNumber(),
                a.getComplement(),
                a.getDistrict(),
                a.getCep(),
                Objects.requireNonNull(a.getCity()).getCity(),
                a.getCity().getState()
        );
    }
}
