package br.com.gestorfinanceiro.api.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.gestorfinanceiro.api.Model.Client;
import br.com.gestorfinanceiro.api.Model.SystemMessage;
import br.com.gestorfinanceiro.api.Repo.ClientRepo;


@Service
public class AuthService {
    
    @Autowired
    private SystemMessage message;

    @Autowired
    private ClientRepo clientRepo;


    public ResponseEntity<?> signup(Client obj){ 
        if(obj.getName().equals("") || obj.getName() == null){
            message.setMessage("Preencha um nome");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
        else if(obj.getEmail().equals("")){
            message.setMessage("Preencha um nome de email");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
        else if(obj.getPassword().equals("") || obj.getPassword() == null){
            message.setMessage("A senha não pode ser vazia, preencha uma senha");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }else if (clientRepo.findByEmail(obj.getEmail()) != null) {
            message.setMessage("Usuário já existe");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
        else{
            clientRepo.save(obj);
            message.setMessage("Cadastro Realizado com Sucesso");
            return new ResponseEntity<>(message, HttpStatus.CREATED);
        }

    }


    public ResponseEntity<?> login(Client obj){
        Client storedClient = clientRepo.findByEmail(obj.getEmail());
        if (storedClient == null || !storedClient.getPassword().equals(obj.getPassword())) {
            message.setMessage("Usuário/Senha Incorretos");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
        else{
            message.setMessage("Usuário Logado com sucesso");
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        
    }



}
