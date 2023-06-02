package com.gestorfinanceiro.api.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gestorfinanceiro.api.model.Finance;

@Repository
public interface FinanceRepo extends CrudRepository<Finance, Long> {

	Long findByClientId(Integer clientId);

	
	Finance findByFinanceId(Long financeId);

	
	List<FinanceRepo> findFinanceByClientId(Long clientId);
	
}