package com.gestorfinanceiro.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gestorfinanceiro.api.model.Finance;
import com.gestorfinanceiro.api.repo.FinanceRepo;
import com.gestorfinanceiro.api.service.FinanceService;

@RestController
@RequestMapping("/finances")
@CrossOrigin(origins = "*")
public class FinanceClient {
	@Autowired
	private FinanceService financeService;

	@Autowired
	private FinanceRepo financeRepo;

	//Add Finance
	@PostMapping("/add")
	public ResponseEntity<?> addFinance(@RequestBody Finance finance) {
		return financeService.addFinance(finance);
	}

	//Edit Finance
	@PutMapping("/edit")
	public ResponseEntity<?> editFinance(@RequestBody Finance finance) {
		return financeService.editFinance(finance);
	}

	//Delete Finance
	@DeleteMapping("/delete/{financeId}")
	public ResponseEntity<?> delete(@PathVariable Long financeId) {
		return financeService.deleteFinance(financeRepo.findByFinanceId(financeId));
	}

	//List Finances
	@GetMapping("/list")
	public ResponseEntity<?> listFinances() {
		return financeService.listFinances();
	}
}
