package br.com.gestorfinanceiro.api.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.gestorfinanceiro.api.Model.Client;
import br.com.gestorfinanceiro.api.Repo.ClientRepo;
import br.com.gestorfinanceiro.api.Service.LoggedService;

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

	@PutMapping("/editUser")
	public Client edit(@RequestBody Client client) {
		return clientRepo.save(client);
	}

	@DeleteMapping("/delUser/{id}")
	public void delete(@PathVariable Long id) {
		clientRepo.deleteById(id);
	}
}
