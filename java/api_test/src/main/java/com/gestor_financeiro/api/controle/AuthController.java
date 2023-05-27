// package com.gestor_financeiro.api.controle;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import com.gestor_financeiro.api.modelo.Client;
// import com.gestor_financeiro.api.repositorio.ClientRepository;


// @RestController
// @RequestMapping("/auth")
// public class AuthController {

//     @Autowired
//     private ClientRepository clientRepository;

//     @PostMapping("/signup")
//     public String signUp(@RequestBody Client client) {
//         if (clientRepository.findByUsername(client.getUsername()) != null) {
//             return "Username already exists";
//         }

//         clientRepository.save(client);
//         return "Signup successful";
//     }

//     @PostMapping("/login")
//     public String login(@RequestBody Client client) {
//         Client storedClient = clientRepository.findByUsername(client.getUsername());

//         if (storedClient == null || !storedClient.getPassword().equals(client.getPassword())) {
//             return "Invalid username or password";
//         }

//         return "Login successful";
//     }
// }


package com.gestor_financeiro.api.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.gestor_financeiro.api.modelo.Client;
import com.gestor_financeiro.api.repositorio.ClientRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class AuthController {

    @Autowired
    private ClientRepository clientRepository;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public String signUp(@RequestBody Client client) {
        if (clientRepository.findByUsername(client.getUsername()) != null) {
            return "Username already exists";
        }

        clientRepository.save(client);
        return "Signup successful";
    }

    @PostMapping("/login")
    public String login(@RequestBody Client client) {
        Client storedClient = clientRepository.findByUsername(client.getUsername());

        if (storedClient == null || !storedClient.getPassword().equals(client.getPassword())) {
            return "Invalid username or password";
        }

        return "Login successful";
    }
}