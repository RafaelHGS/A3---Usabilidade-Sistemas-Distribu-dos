package br.com.gestorfinanceiro.api.Repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.gestorfinanceiro.api.Model.Finances;

@Repository
public interface FinancesRepo extends CrudRepository<Finances, Long>{
    List<FinancesRepo> findByClientId(Integer clientId);
}