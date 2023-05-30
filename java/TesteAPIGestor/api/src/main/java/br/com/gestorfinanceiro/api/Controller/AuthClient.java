package br.com.gestorfinanceiro.api.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.gestorfinanceiro.api.Model.Client;
import br.com.gestorfinanceiro.api.Repo.ClientRepo;
import br.com.gestorfinanceiro.api.Service.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthClient {
	@Autowired
	private ClientRepo repoAction;

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

	// @GetMapping("/")
	// public Iterable<Client> select(){
	//     return repoAction.findAll();
	// }

	@GetMapping("/{email}")
	public Client findUsername(@PathVariable String email) {
		return repoAction.findByEmail(email);
	}

	@PutMapping("/puuuuut")
	public Client edit(@RequestBody Client client) {
		return repoAction.save(client);
	}

	@DeleteMapping("/aroba/{id}")
	public void delete(@PathVariable Long id) {
		repoAction.findById(id);
	}
}
