package com.healthagenda.api.dto.get;

import com.healthagenda.api.model.HealthCenter;

import java.time.LocalTime;

public record GetHealthCenterByIdData(
        Long id,
        String centerName,
        String phone,
        String email,
        String openingTime,
        String closingTime,
        String manager,
        GetAddressData address
) {
    public GetHealthCenterByIdData(HealthCenter hc){
        this(
                hc.getId(),
                hc.getCenterName(),
                hc.getPhone(),
                hc.getEmail(),
                (hc.getOpeningTime() != null) ? hc.getOpeningTime().toString() : null,
                (hc.getClosingTime() != null) ? hc.getClosingTime().toString() : null,
                (hc.getManager() != null) ? hc.getManager().getUsername() : null,
                new GetAddressData(hc.getAddress())
        );

    }
}