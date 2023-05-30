package br.com.gestorfinanceiro.api.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.gestorfinanceiro.api.Model.Client;
import br.com.gestorfinanceiro.api.Repo.ClientRepo;


@RestController
@RequestMapping("/loggedUser")
@CrossOrigin(origins = "*")
public class LoggedClient {
    
    @Autowired
    private ClientRepo repoAction;


    @PutMapping("/editUser")
    public Client edit(@RequestBody Client client){
        return repoAction.save(client);
    }


    @DeleteMapping("/delUser/{id}")
    public void delete(@PathVariable Long id){
        repoAction.deleteById(id);
    }


}
