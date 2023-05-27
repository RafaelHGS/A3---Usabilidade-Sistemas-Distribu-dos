package com.gestor_financeiro.api.controle;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8100") // Substitua pela URL do seu aplicativo Ionic
public class ApiController {

    @GetMapping("/endpoint")
    public String getEndpoint() {
        return "Hello from API!";
    }
}