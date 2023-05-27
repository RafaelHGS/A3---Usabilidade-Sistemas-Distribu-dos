package com.gestor_financeiro.api.repositorio;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.gestor_financeiro.api.modelo.GastosGanhos;

public interface GanhosGastosrepositorio extends CrudRepository<GastosGanhos, Long>{
    List<GastosGanhos> findByClientId(Long clientId);
}
