package com.gestor_financeiro.api.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestor_financeiro.api.modelo.GastosGanhos;
import com.gestor_financeiro.api.repositorio.GanhosGastosrepositorio;

@RestController
@RequestMapping("/gastosGanhos")
public class GastosGanhosController {
    
    @Autowired
    private GanhosGastosrepositorio ganhosGastosrepositorio;

    @PostMapping
    public String adicionar(@RequestBody GastosGanhos ganhosGastos) {
        ganhosGastosrepositorio.save(ganhosGastos);
        return "Expense added successfully";
    }
}
