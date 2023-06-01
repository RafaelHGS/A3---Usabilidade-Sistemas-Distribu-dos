package com.gestorfinanceiro.api.controller;

import com.gestorfinanceiro.api.model.Client;
import com.gestorfinanceiro.api.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gestorfinanceiro.api.repo.ClientRepo;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthClient {
	@Autowired
	private ClientRepo clientRepo;

	@Autowired
	private AuthService authService;

	@PostMapping("/signup")
	public ResponseEntity<?> signUp(@RequestBody Client client) {
		return authService.signup(client);
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Client client) {
		return authService.login(client);
	}

	//Duplicado no LoggedClient
	// @GetMapping("/")
	// public Iterable<Client> select(){
	//     return clientRepo.findAll();
	// }

	//Duplicado no LoggedClient?
	@GetMapping("/{email}")
	public Client findUsername(@PathVariable String email) {
		return clientRepo.findByEmail(email);
	}

	@PutMapping("/puuuuut")
	public Client edit(@RequestBody Client client) {
		return clientRepo.save(client);
	}

	@DeleteMapping("/aroba/{id}")
	public void delete(@PathVariable Long id) {
		clientRepo.findById(id);
	}
}
