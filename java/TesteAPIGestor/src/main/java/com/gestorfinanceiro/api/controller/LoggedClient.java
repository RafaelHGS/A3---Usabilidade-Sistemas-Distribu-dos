package com.gestorfinanceiro.api.controller;

import com.gestorfinanceiro.api.model.Client;
import com.gestorfinanceiro.api.repo.ClientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gestorfinanceiro.api.service.LoggedService;

@RestController
@RequestMapping("/loggedUser")
@CrossOrigin(origins = "*")
public class LoggedClient {
	@Autowired
	private ClientRepo clientRepo;

	@Autowired
	private LoggedService loggedService;

	//Get Cliente pelo email
	@GetMapping("/{email}")
	public ResponseEntity<?> getClientByEmail(@PathVariable String email) {
		return loggedService.getClientByEmail(clientRepo.findByEmail(email));
	}


	//PutClient
	@PutMapping("/User")
	public ResponseEntity<?> editClient(@RequestBody Client client) {
		return loggedService.editClient(client);
	}


	//Dele Client
	@DeleteMapping("/delete/{email}")
	public ResponseEntity<?> delete(@PathVariable String email) {
		return loggedService.remover(clientRepo.findByEmail(email));
	}


	//Test List
	@GetMapping("/list")
	public Iterable<Client> listClients() {
		return clientRepo.findAll();
	}
}
