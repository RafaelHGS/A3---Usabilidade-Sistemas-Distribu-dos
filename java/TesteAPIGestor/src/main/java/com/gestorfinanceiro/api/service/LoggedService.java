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

	@Autowired
	private SystemMessage message;

	//Get Client by Email
	public ResponseEntity<?> getClientByEmail(Client client) {
		Client storedClient = clientRepo.findByEmail(client.getEmail());
		if (storedClient == null) {
			message.setMessage("Usuário não encontrado");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(client, HttpStatus.OK);
		}
	}


	//Put Client
	public ResponseEntity<?> editClient(Client client){
		Client storedClient = clientRepo.findByEmail(client.getEmail());

		if(storedClient == null){
			message.setMessage("Usuário Não encontrado");
			return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
		}else if(client.getId() == 0 || client.getId() == null){
			message.setMessage("Id inválido");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
		}else if(client.getName() == "" || client.getName() == null){
			message.setMessage("Cliente inválido");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
		}
		else if(client.getEmail() == "" || client.getEmail() == null){
			message.setMessage("Email inválido");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
		}
		else if(storedClient != null && storedClient.getId() != client.getId()){
			message.setMessage("Email já existente");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
		}else{
			if(client.getPassword() == "" || client.getPassword() == null){
				client.setPassword(clientRepo.findByEmail(client.getEmail()).getPassword());
				return new ResponseEntity<>(clientRepo.save(client), HttpStatus.OK);
			}
			return new ResponseEntity<>(clientRepo.save(client), HttpStatus.OK);
		}
	}


	//Delete Client
	public ResponseEntity<?> remover(Client client){
		if(client.getEmail() == "" || client.getName() == null){
			message.setMessage("Email inválido");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
		}else{
			clientRepo.delete(client);
			message.setMessage("Pessoa removida");
			return new ResponseEntity<>(message, HttpStatus.OK);
		}
	}

}
