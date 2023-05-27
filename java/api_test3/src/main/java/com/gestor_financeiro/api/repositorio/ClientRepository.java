package com.gestor_financeiro.api.repositorio;
import com.gestor_financeiro.api.modelo.Client;

import org.springframework.data.repository.CrudRepository;

public interface ClientRepository extends CrudRepository<Client, Long> {
    Client findByUsername(String username);
}