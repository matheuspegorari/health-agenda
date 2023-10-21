package com.healthagenda.api.dto.get;

import com.healthagenda.api.model.HealthCenter;

public record GetHealthCenterData(
    Long id,
    String centerName
) {
    public GetHealthCenterData(HealthCenter hc){
        this(hc.getId(), hc.getCenterName());
    }
}
