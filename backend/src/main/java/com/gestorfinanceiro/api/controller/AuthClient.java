package com.gestorfinanceiro.api.controller;

import com.gestorfinanceiro.api.model.Client;
import com.gestorfinanceiro.api.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthClient {
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
}
