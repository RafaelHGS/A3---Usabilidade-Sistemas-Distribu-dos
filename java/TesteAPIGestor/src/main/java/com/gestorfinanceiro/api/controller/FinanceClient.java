package com.gestorfinanceiro.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gestorfinanceiro.api.model.Finance;

import com.gestorfinanceiro.api.service.FinanceService;

@RestController
@RequestMapping("/finances")
@CrossOrigin(origins = "*")
public class FinanceClient {
	
   @Autowired
	private FinanceService financeService;


   @PostMapping("/add")
	public ResponseEntity<?> addFinance(@RequestBody Finance finance ) {
		return financeService.addFinance(finance);
	}


	// @PostMapping("/login")
	// public ResponseEntity<?> login(@RequestBody Client client) {
	// 	return authService.login(client);
	// }

   // //Get Cliente pelo email
	// @GetMapping("/{email}")
	// public ResponseEntity<?> getClientByEmail(@PathVariable String email) {
	// 	return loggedService.getClientByEmail(clientRepo.findByEmail(email));
	// }


	// //PutClient
	// @PutMapping("/User")
	// public ResponseEntity<?> editClient(@RequestBody Client client) {
	// 	return loggedService.editClient(client);
	// }


	// //Dele Client
	// @DeleteMapping("/delete/{email}")
	// public ResponseEntity<?> delete(@PathVariable String email) {
	// 	return loggedService.remover(clientRepo.findByEmail(email));
	// }


	// //Test List
	// @GetMapping("/list")
	// public Iterable<Client> listClients() {
	// 	return clientRepo.findAll();
	// }


}
