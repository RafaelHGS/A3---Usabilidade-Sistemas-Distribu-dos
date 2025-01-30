# 💰 Projeto A3 - Gestor Financeiro

📌 **Projeto desenvolvido para as disciplinas de Sistemas Distribuídos e Usabilidade na Universidade Anhembi Morumbi**.

## 🔎 **Sobre o Projeto**
Este projeto consiste em um **Gestor Financeiro Simples**, dividido em:
- **Back-End**: API REST desenvolvida em **Java com Spring Boot**, responsável pelo gerenciamento de dados e comunicação com o banco.
- **Front-End**: Aplicação **Ionic Angular**, responsável pela interface do usuário e consumo da API.

🌍 **Testar o Projeto**: [Acesse o site](https://a3-sistemasdistribuidostest.netlify.app/login)
🚀 **Deploy**: 
- **Netlify**: Hospedagem do Front-End
- **Aiven**: Banco de dados MySQL
- **Render**: Hospedagem da API

---

## 🖥️ **Front-End**
📌 Localização: `/frontend`
📌 Tecnologias: **Ionic Angular, TypeScript**

### 🔧 **Instalação e Configuração**
Após clonar o repositório, execute:
```bash
npm install
```
Isso instalará todas as dependências necessárias.

📌 **Configuração da API**
No arquivo `src/assets/config/urls.json`, substitua `localhost:8080/` pela URL do seu servidor:
```json
{
  "login": "https://seu-servidor.com/auth/login",
  "signup": "https://seu-servidor.com/auth/signup",
  "addFinance": "https://seu-servidor.com/finances/add",
  "editFinance": "https://seu-servidor.com/finances/edit",
  "getFinance": "https://seu-servidor.com/finances/list",
  "deleteFinance": "https://seu-servidor.com/finances/delete/",
  "setProfile": "https://seu-servidor.com/loggedUser/",
  "editProfile": "https://seu-servidor.com/loggedUser/User",
  "deleteProfile": "https://seu-servidor.com/loggedUser/delete/"
}
```

### 📌 **Principais Páginas**
- **Home**: Visão geral e gerenciamento dos gastos
- **Login**: Autenticação e redirecionamento para cadastro
- **Signup**: Cadastro de usuários
- **Profile**: Edição e exclusão de informações do usuário

### 🔹 **Serviços Implementados**
- `FinanceService`: Gerencia as finanças do usuário
- `FinancesAPIService`: Realiza chamadas à API
- `ProfileService`: Gerencia informações do perfil do usuário


📌 **Imagens de funcionamento**:</br>
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/edb03883-e018-4947-80ad-0c26fa1b2292)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/3a48f5db-0135-4eac-b085-4fa68613db7b)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/61877de3-53e1-4af2-9bb6-2bc27bfced7b)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/3c63fdb2-b867-495f-8ad8-ae346063c68e)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/dddecf0f-c7b3-42ed-9ab1-9e7ec3dba4d8)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/9bc41c7a-2205-4509-9413-735b55bcc1b4)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/eaeb0980-6a1c-4ff1-adf1-dd4f0db22fdc)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/e75cb73f-8ef2-4bbe-bfec-15c44be7061b)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/804e7492-e5c1-4c68-8782-68c53e5a3689)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/bc57f91a-a889-47e8-b2a4-1a3741e6ea26)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/99c8ff00-2406-48c5-b410-bfe7db7e082a)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/42e697c3-4533-484f-b40f-e1ef4e5d5a05)

---

## 🔙 **Back-End**
📌 Localização: `/backend`
📌 Tecnologias: **Java, Spring Boot, MySQL**

### **🚀 Premissa do Projeto**
O back-end é uma API REST que gerencia os dados financeiros e pode ser consumida via **Postman, Thunder Client** ou pelo **Front-End Ionic Angular**.

### **🛠️ Tecnologias e Arquitetura**
- **Java + Spring Boot**: Desenvolvimento ágil e organizado
- **Banco de Dados MySQL**: Armazenamento estruturado
- **Arquitetura MVC**: Separação em **Model**, **Controller**, **Service** e **Repository**

📌 **Arquitetura do Projeto**:</br>
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/1e3ab451-dbad-4e44-b6d3-dbeb0f2fb626)

### 📌 **Principais Camadas**
#### 📂 **Model (Entidades do Banco de Dados)**
```java
@Entity
@Table(name = "clientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;
}
```
```java
@Entity
@Table(name = "financas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Finance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long financeId;
    private String financeName;
    private double financeValue;
    private Long clientId;
}
```

#### 📂 **Repositório (Acesso ao Banco de Dados)**
```java
@Repository
public interface FinanceRepo extends CrudRepository<Finance, Long> {
    List<Finance> findFinanceByClientId(Long clientId);
}
```

#### 📂 **Controller (Rotas da API)**
```java
@RestController
@RequestMapping("/finances")
@CrossOrigin(origins = "*")
public class FinanceClient {
    @Autowired
    private FinanceService financeService;
    
    @PostMapping("/add")
    public ResponseEntity<?> addFinance(@RequestBody Finance finance) {
        return financeService.addFinance(finance);
    }
}
```

#### 📂 **Service (Regras de Negócio e Validações)**
```java
@Service
public class AuthService {
    @Autowired
    private ClientRepo clientRepo;
    
    public ResponseEntity<?> signup(Client client) {
        if (clientRepo.findByEmail(client.getEmail()) != null) {
            return new ResponseEntity<>("Usuário já existe", HttpStatus.BAD_REQUEST);
        }
        clientRepo.save(client);
        return new ResponseEntity<>("Cadastro realizado com sucesso", HttpStatus.CREATED);
    }
}
```

---

## 📌 **Conclusão**
Este projeto demonstrou a implementação de um **Gestor Financeiro** utilizando **Spring Boot no back-end** e **Ionic Angular no front-end**, seguindo boas práticas e arquiteturas recomendadas. O sistema permite:
✔ **Gerenciamento de gastos**
✔ **Cadastro e autenticação de usuários**
✔ **Consumo da API REST via requisições HTTP**

📌 **Se quiser contribuir ou sugerir melhorias, fique à vontade para abrir uma issue ou pull request! 🚀**
