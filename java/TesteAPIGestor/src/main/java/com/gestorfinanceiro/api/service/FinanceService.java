package com.gestorfinanceiro.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.gestorfinanceiro.api.model.Finance;
import com.gestorfinanceiro.api.model.SystemMessage;
import com.gestorfinanceiro.api.repo.FinanceRepo;

@Service
public class FinanceService {

	@Autowired
	private FinanceRepo financeRepo;

	@Autowired
	private SystemMessage message;

	public ResponseEntity<?> addFinance(Finance finance) {
		if (finance == null) {
			message.setMessage("Finança não definida");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
		} else if (finance.getFinanceName() == "" || finance.getFinanceName() == null) {
			message.setMessage("Preencha uma descricao da Financa");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
		} else if (finance.getFinanceValue() == 0 || finance.getFinanceName() == null) {
			message.setMessage("Preencha um valor");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);

		} else if (finance.getClientId() == 0) {
			message.setMessage("clientID inválido!");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
		} else {
			message.setMessage("Finança Adicionada com Sucesso");
			return new ResponseEntity<>(financeRepo.save(finance), HttpStatus.CREATED);
		}

		// Client storedClient = clientRepo.findByEmail(client.getEmail());
		// if (storedClient == null) {
		// message.setMessage("Usuário não encontrado");
		// return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
		// } else {
		// return new ResponseEntity<>(client, HttpStatus.OK);
		// }
	}

}
