package br.com.gestorfinanceiro.api.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.gestorfinanceiro.api.Model.Client;
import br.com.gestorfinanceiro.api.Model.SystemMessage;
import br.com.gestorfinanceiro.api.Repo.ClientRepo;

@Service
public class LoggedService {
	@Autowired
	private SystemMessage message;

	@Autowired
	private ClientRepo clientRepo;

	public ResponseEntity<?> userData(Client obj) {
		Client storedClient = clientRepo.findByEmail(obj.getEmail());
		if (storedClient == null) {
			message.setMessage("Usuário não encontrado");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
		} else {
			// message.setMessage("Usuário Logado com sucesso");
			return new ResponseEntity<>(obj, HttpStatus.OK);
		}
	}
}
