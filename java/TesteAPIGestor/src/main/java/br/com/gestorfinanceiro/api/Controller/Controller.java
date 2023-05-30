// package br.com.gestorfinanceiro.api.Controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import br.com.gestorfinanceiro.api.Model.Client;
// import br.com.gestorfinanceiro.api.Repo.Repo;

// @RestController
// @RequestMapping("/auth")
// @CrossOrigin(origins = "*")
// public class Controller {
    
//     @Autowired
//     private Repo repoAction;


//     @PostMapping("/signup")
//     public Client signUp(@RequestBody Client client){
//         return repoAction.save(client);
//     }


//     @GetMapping("/")
//     public Iterable<Client> select(){
//         return repoAction.findAll();
//     }


//     @PutMapping("/")
//     public Client edit(@RequestBody Client client){
//         return repoAction.save(client);
//     }


//     @DeleteMapping("/{id}")
//     public void delete(@PathVariable Long id){
//         repoAction.deleteById(id);
//     }


// }
