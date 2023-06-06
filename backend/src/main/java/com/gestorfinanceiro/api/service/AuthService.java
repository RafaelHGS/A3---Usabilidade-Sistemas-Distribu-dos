package com.gestorfinanceiro.api.service;

import com.gestorfinanceiro.api.model.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.gestorfinanceiro.api.model.SystemMessage;
import com.gestorfinanceiro.api.repo.ClientRepo;

@Service
public class AuthService {
	@Autowired
	private ClientRepo clientRepo;

	@Autowired
	private SystemMessage message;

	public ResponseEntity<?> signup(Client client) {
		if (client.getName() == null || client.getName().equals("")) {
			message.setMessage("Preencha um nome");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);//confere se nome n existe
		} else if (client.getEmail().equals("") || client.getEmail() == null) {
			message.setMessage("Preencha um nome de email");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);//confere se o email não existe
		} else if (client.getPassword() == null || client.getPassword().equals("")) {
			message.setMessage("A senha não pode ser vazia, preencha uma senha");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);//confere se a senha não existe
		} else if (clientRepo.findByEmail(client.getEmail()) != null) {
			message.setMessage("Usuário já existe");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST); // confere se usuario ja existe
		} else {
			clientRepo.save(client);
			message.setMessage("Cadastro Realizado com Sucesso");
			return new ResponseEntity<>(message, HttpStatus.CREATED);//cadastra usuario
		}
	}

	public ResponseEntity<?> login(Client client) {
		Client storedClient = clientRepo.findByEmail(client.getEmail());
		if (storedClient == null || !storedClient.getPassword().equals(client.getPassword())) {//conferencia de user/senha de entrada
			message.setMessage("Usuário/Senha Incorretos");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
		} else {
			message.setMessage("Usuário Logado com Sucesso"); // conferencia de user/senha de entrada
			return new ResponseEntity<>(message, HttpStatus.OK);
		}
	}
}
