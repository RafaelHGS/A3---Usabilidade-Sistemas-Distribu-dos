package com.gestorfinanceiro.api.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gestorfinanceiro.api.model.Finances;

@Repository
public interface FinancesRepo extends CrudRepository<Finances, Long> {
	List<FinancesRepo> findByClientId(Integer clientId);
}