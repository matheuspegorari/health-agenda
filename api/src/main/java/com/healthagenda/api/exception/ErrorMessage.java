package com.healthagenda.api.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ErrorMessage {
    private boolean error = true;
    private String message;

    public ErrorMessage(String message){
        this.message = message;
    }
}

