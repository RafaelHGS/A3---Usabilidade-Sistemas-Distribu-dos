package com.gestorfinanceiro.api.service;

import com.gestorfinanceiro.api.model.Client;
import com.gestorfinanceiro.api.model.SystemMessage;
import com.gestorfinanceiro.api.repo.ClientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class LoggedService {
	@Autowired
	private ClientRepo clientRepo;

	public ResponseEntity<?> userData(Client client) {
		Client storedClient = clientRepo.findByEmail(client.getEmail());
		if (storedClient == null) {
			String message = "Usuário não encontrado";
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
		} else {
			// message.setMessage("Usuário Logado com sucesso");
			return new ResponseEntity<>(client, HttpStatus.OK);
		}
	}
}
