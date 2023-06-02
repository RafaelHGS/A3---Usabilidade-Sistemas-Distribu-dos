package com.gestorfinanceiro.api.repo;

import com.gestorfinanceiro.api.model.Client;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepo extends CrudRepository<Client, Long> {
	Client findByEmail(String email);
}