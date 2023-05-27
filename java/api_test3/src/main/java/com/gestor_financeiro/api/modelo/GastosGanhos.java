package com.gestor_financeiro.api.modelo;

// import javax.persistence.Entity;
// import javax.persistence.GeneratedValue;
// import javax.persistence.GenerationType;
// import javax.persistence.Id;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class GastosGanhos {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nomeDoGasto;
    private double valorDoGasto;
    private Long clientId; // Chave estrangeira para associar o gasto ao cliente


    //Getters e Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNomeDoGasto() {
        return nomeDoGasto;
    }
    public void setNomeDoGasto(String nomeDoGasto) {
        this.nomeDoGasto = nomeDoGasto;
    }
    public double getValorDoGasto() {
        return valorDoGasto;
    }
    public void setValorDoGasto(double valorDoGasto) {
        this.valorDoGasto = valorDoGasto;
    }
    public Long getClientId() {
        return clientId;
    }
    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }



}