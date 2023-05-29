package br.com.gestorfinanceiro.api.Controller;

import org.springframework.beans.factory.annotation.Autowired;
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


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthClient {
    
    @Autowired
    private ClientRepo repoAction;


    @PostMapping("/signup")
    public String signUp(@RequestBody Client client){
        if (repoAction.findByUsername(client.getUsername()) != null) {
            return "O Usuário já existe";
        }

        repoAction.save(client);
        return "Cadastro Realizado com Sucesso";
    }


    @PostMapping("/login")
    public String login(@RequestBody Client client) {
        Client storedClient = repoAction.findByUsername(client.getUsername());

        if (storedClient == null || !storedClient.getPassword().equals(client.getPassword())) {
            return "Nome de usuário ou senha inválidos";
        }

        return "Logado com";
    }


    @GetMapping("/")
    public Iterable<Client> select(){
        return repoAction.findAll();
    }


    @PutMapping("/")
    public Client edit(@RequestBody Client client){
        return repoAction.save(client);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        repoAction.deleteById(id);
    }


}
