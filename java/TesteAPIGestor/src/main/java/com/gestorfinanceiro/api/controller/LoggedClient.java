package com.gestorfinanceiro.api.controller;

import com.gestorfinanceiro.api.model.Client;
import com.gestorfinanceiro.api.repo.ClientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gestorfinanceiro.api.service.LoggedService;

import java.util.Iterator;
import java.util.List;

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
	public ResponseEntity<?> userData(@PathVariable String email) {
		return loggedService.userData(clientRepo.findByEmail(email));
	}

	record NewClient(String name, String email, String password) {
	}

	@PutMapping("/update/{id}")
	public void updateClients(@PathVariable Long id, @RequestBody NewClient newClient) {
		Client client = clientRepo.findById(id).get();

		client.setName(newClient.name());
		client.setEmail(newClient.email());
		client.setPassword(newClient.password());

		clientRepo.save(client);
	}

	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable Long id) {
		clientRepo.deleteById(id);
	}

	@GetMapping("/list")
	public Iterable<Client> listClients() {
		return clientRepo.findAll();
	}
}
