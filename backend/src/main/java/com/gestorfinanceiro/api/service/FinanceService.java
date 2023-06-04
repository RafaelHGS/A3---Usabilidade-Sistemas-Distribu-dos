package com.gestorfinanceiro.api.service;

import java.util.List;

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
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);// verifica finanças
		} else if (finance.getFinanceName() == "" || finance.getFinanceName() == null) {
			message.setMessage("Preencha uma descricao da Financa");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);//verifica descrição
		} else if (finance.getFinanceValue() == 0 || finance.getFinanceName() == null) {
			message.setMessage("Preencha um valor");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);//verifica valor
		} else if (finance.getClientId() == 0) {
			message.setMessage("clientID inválido!");//confere ID
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
		} else {
			message.setMessage("Finança Adicionada com Sucesso");//mensagem de conferência
			return new ResponseEntity<>(financeRepo.save(finance), HttpStatus.CREATED);
		}
	}

	public ResponseEntity<?> editFinance(Finance finance) {
		Finance storedFinance = financeRepo.findByFinanceId(finance.getFinanceId());
		if (storedFinance == null) {
			message.setMessage("O Gasto/Ganho não existe");
			return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);//confere inexistência
		} else if (finance.getFinanceName().equals("") || finance.getFinanceName() == null) {
			message.setMessage("Nome inválido para Gasto/Ganho");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);//confere nome inexistênte
		} else if (finance.getFinanceValue() == 0) {
			message.setMessage("Valor inválido para Gasto/Ganho");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);//confere valor inexistênte
		} else if (finance.getClientId() == 0 || finance.getClientId() == null) {
			message.setMessage("ID do Cliente não encontrado");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);//confere existência de Id
		} else if (finance.getFinanceId() == 0 || finance.getFinanceId() == null) {
			message.setMessage("Id do Gasto/Ganho não encontrado");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);// confere existência de gasto/ganho
		} else {
			return new ResponseEntity<>(financeRepo.save(finance), HttpStatus.OK);//confirmação
		}
	}

	//Delete Client
	public ResponseEntity<?> deleteFinance(Finance finance) {
		if (finance.getFinanceId() == 0 || finance.getClientId() == null) {
			message.setMessage("Gasto/Ganho inválido");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
		} else {
			financeRepo.delete(finance);
			message.setMessage("Gasto/Ganho removidos com Sucesso");
			return new ResponseEntity<>(message, HttpStatus.OK);
		}
	}

	public ResponseEntity<?> listFinances() {
		List<Finance> storedFinances = (List<Finance>) financeRepo.findAll();
		if (storedFinances == null) {
			message.setMessage("Nenhuma finança encontrada");
			return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(storedFinances, HttpStatus.OK);
		}
	}
}
