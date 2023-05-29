package br.com.gestorfinanceiro.api.Repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.gestorfinanceiro.api.Model.Client;

@Repository
public interface ClientRepo extends CrudRepository<Client, Long>{
    Client findByUsername(String username);

    Client deleteById(int Id);
}