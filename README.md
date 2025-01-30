# Projeto A3 para Sistemas Distribuídos e Usabilidade
  Para Projeto de A3 para as matérias de Sistemas Sistribuídos Mobile, Usabilidade Desenvolvimento web/mobile/jogos, nosso grupo decidiu realizar um projeto de um gestor financeiro simples, o gestor consiste em duas seções, a parte de Back-end que será a parte para Sistemas Distribuídos, consistindo em uma API Rest que gerenciará um banco de dados e tratamento de dados da aplicação E a parte de Front-End que será a parte para a matéria de Usabilidade, feita com Ionic Angular para a UserInterface e consumo da API criada no back-end.

Site Para Teste: [https://a3-sistemasdistribuidostest.netlify.app/login](https://a3-sistemasdistribuidostest.netlify.app/login)
Deploy gratuito: Netlify para Host do site, Aiven para o Banco de dados MySql e o Render para hospedagem da api

## Front-End
  Na pasta de Front-end se encontra toda a aplicação para a matéria de "Usabilidade, Desenvolimento web, mobile e jogos", ela consiste em uma aplicação feita com Ionic Angular e tem como principal aspecto gerenciar tudo aquilo que o usuário vê, além de consumir a API criada para o projeto.
  
### \_Instalação e configuração do projeto\_ 

   - Para a instalação do projeto, após baixado em sua máquina e aberto em sua ide, você deve serguir o comando
```
npm -i
```
  Isso irá assegurar com que o projeto faça a instalação de todas as dependências necessárias para o projeto.

  - Outra configuração necessária é a alteração das urls no arquivo "src/assets/config/urls.json", lá você deve colocar trocar suas urls "localhost:8080/" pela sua url do servidor API, para que possa habilitar corretamente as funcionalidades de consumo da API e gerenciar dados vistos pelo usuário
  
```
{
  "login": "https://localhost:8080/auth/login",
  "signup": "https://localhost:8080/auth/signup",
  "addFinance": "https://localhost:8080/finances/add",
  "editFinance": "https://localhost:8080/finances/edit",
  "getFinance": "https://localhost:8080/finances/list",
  "deleteFinance": "https://localhost:8080/finances/delete/",
  "setProfile": "https://localhost:8080/loggedUser/",
  "editProfile": "https://localhost:8080/loggedUser/User",
  "deleteProfile": "https://localhost:8080/loggedUser/delete/"
}
```
  
### \_Páginas da Aplicação\_
  A Aplicação consiste em 4 páginas e com pré-configuração pelo ionic, são elas:
- Home: Página principal da aplicação na qual o usuráio vê e manipula seus gastos
- Login: Página inicial da aplicação, aqui temos a validação de login e redirecionamento para página de cadastro adequada
- Signup: Página responsável pelo cadastro de usuário
- Profile: Página que mostra as informações de usuário, também permite a alteração e exclusão de dados da conta
 
 
### \_Service\_
  A Pasta services é a resposnável por 3 serviços que gerenciam a aplicação, são eles:

- FinanceService: Responsável pelo gerenciamento das Finanças do Usuário.
- FinancesAPIService: Responsável pelo consumo da API.
- ProfileService: Responsável pelo gerenciamento do perfil de Usuário.
  
  Para Mais Detalhes de funcionamento, conferir código.

### \_Imagens de Funcionamento\_
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


## Back-End
  Na pasta de Back-end se encontra todo o Denvolvimento da API para a matéria de "Sistemas Distribuídos", ela consiste em uma API feita para gerenciar um banco de dados e ser a "ponte" de comunicação entre cliente e servidor, ou seja, é uma aplicação com serviços para geerenciamento do banco que pode ser consumida por requisições REST, na qual o Front-End consome esses serviços.
  
### \_Premissa do Projeto\_ 
  O projeto escolhido foi a criação de uma API REST para gerenciamento e tratamento de dados para uma aplicação de Gestão Financeira Simples, ou como é chamado em nosso Projeto, um Gestor de Gastos. Essa API criada pode ser consumida por um serviço de requisições como postman ou thunderclient, Ou como em nosso caso, num projeto Ionic Angular e TypeScript do Gestor de Gastos.


### \_Do Desenvolvimento da API\_
  Para o Desenvolvimento da API, utilizamos a linguagem java e o Framework Spring Boot, a escolha dessas tecnologias é justamente por serem amplamente utilizado na comunidade e mercado de trabalho, facilitando (agilizando) o desenvolvimento e suporte da aplicação. Essa facilidade com Spring permite o trabalho com uma arquitetura/construção mais simples para o código com uso de annotations e endpoints, economizando tempo de desenvolvimento e permitindo o foco nas funcionalidades em si que serão usadas na aplicação, além claro de permitir gerenciamento de dados com recursos de autenticação, ou a serialização e desserialização de JSON's enviados e recebidos pelo consumo da API, tratamento de objetos e manipulação do banco.



### \_Desenvolvimento em camadas/módulos\_
  Para o desenvolvimento do projeto e com o uso do spring, usamos uma espécie de arquitetura em "camadas" que permite a modularização do código em diversos segmentos/partes, cada camada/"pacote" tem uma função específica, isso permite facilitar o desenvolvimento e manutenção do código. No Nosso projeto, com base na arquitetura MVC (Model-View-Controller), desenvolvemos usando as camadas Model, Controller, Service e Repo.
  
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/1e3ab451-dbad-4e44-b6d3-dbeb0f2fb626)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/118f909e-2a9c-44c0-808b-c17432abe49f)


### \_Camada de Model (Modelo)\_
  É a camada que utilizamos para definir as Entidades do nosso banco de dados, ou seja, nossas tabelas ("colunas"/chaves) e seus respectivos valores. Menos a System Message, que será usada apenas dentro da api para definição de mensagens de sistema no tratamento de dados e respostas das requisições. Para nossa API teremos 2as Entidades sendo definidas, Client e Finance.
- Client: é responsável pela criação do banco de clientes, da qual deverá ter como atributos o ID, name, email e password, relativos aos clientes
- Finance: Definiremos aqui o bando de finanças, que terá como atributos o financeID, financeName, financeValue, e o clientId que será atribuído o ID do cliente nessa tarefa, ou seja, seria algo equivalente à uma "chave primária"

###### Client.java
```
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

###### Finance.java
```
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

### \_Cama de Repo (Repositório)\_
  É a camada responsável pelos métodos de manipulação do banco de dados, aqui podemos usar métodos padrões ou definir nossos próprios métodos customizados para manipulação do banco.
  Basicamente teremos duas classes, que são:
- ClientRepo: responsável pelo gerenciamento do banco de clientes criado pela camada de Modelo.
- FinanceRepo: responsável pelo gerenciamento das finanças do banco criado pela camada de Modelo, aqui definimos 3 métodos para a "captura"/obtenção e dados desse banco. (encontrar pelo id do cliente, pelo id da finança e listagem das finanças)

###### FinanceRepo
```
@Repository
public interface FinanceRepo extends CrudRepository<Finance, Long> {
	Long findByClientId(Integer clientId);

	Finance findByFinanceId(Long financeId);

	List<FinanceRepo> findFinanceByClientId(Long clientId);
}
```
###### Client Repo
```
@Repository
public interface ClientRepo extends CrudRepository<Client, Long> {
	Client findByEmail(String email);
}
```

### \_Camada Controller (Controle)\_
   É a camada onde é configurado o Mapping (Rotas) da nossa API e faz o gerenciamento das requisições. As requisições são a feitas para nossa API são:
- GET: Recuperação de dados
- POST: Envio de dados
- PUT: Atualização de dados
- Delete: Remoção de dados
  Em nossa Controller temos 3 classes principais, AuthClient, LoggedClient e FinanceClient:
- Auth, é a responsável pela definição de urls e chamada de métodos de cadastro e login do cliente em um banco de dados, ou seja, é a responsável por validar o cadastro e login de usuário e gerenciar o banco de dados de clientes cadastrados.
- LoggedClient, é responsável por gerenciar os clientes já cadastrados no banco de dados, enviar dados do cliente para validações no front, também é possível alterar e deletar o cliente do banco de dados
- FinanceClient, é reponsável pela criação, alteração, listagem e remoção das finanças de nossos clientes do banco de dados

  Exemplo das requisições com a classe que contém todos os tipos de requisições e exemplos de mapping citados anteriormente
```
@RestController
@RequestMapping("/finances")
@CrossOrigin(origins = "*")
public class FinanceClient {
	@Autowired
	private FinanceService financeService;

	@Autowired
	private FinanceRepo financeRepo;

	//Add Finance
	@PostMapping("/add")
	public ResponseEntity<?> addFinance(@RequestBody Finance finance) {
		return financeService.addFinance(finance);
	}
	
	//Edit Finance
	@PutMapping("/edit")
	public ResponseEntity<?> editFinance(@RequestBody Finance finance) {
		return financeService.editFinance(finance);
	}
	
	//Delete Finance
	@DeleteMapping("/delete/{financeId}")
	public ResponseEntity<?> delete(@PathVariable Long financeId) {
		return financeService.deleteFinance(financeRepo.findByFinanceId(financeId));
	}
	
	//List Finances
	@GetMapping("/list")
	public ResponseEntity<?> listFinances() {
		return financeService.listFinances();
	}
```


### \_Camada de Serviço(Sevice)\_
  É a camada responsável pelo tratamento de informações e respostas para as requisições, digamos que essa camada "anda junto" com a de controle, portanto se temos 3 classes com métodos de requisição, aqui teremos 3 classes de repositório, cada uma relativa à sua camada específica de controle.
  Essa camada basicamente faz o tratamento de dados das requisições, e dá uma resposta adequada para a camada de controle, aqui podemos fazer os tratamentos de dados e autenticações, sem "poluir" a camada de requisições com esses métodos. Em nossa API temos os serviços de:
- AuthService: Que é o serviço para tratar os dados de cadastro e login
- LoggedService: Que é o serviço responsável pelo tratamento e gerenciamento de dados do cliente cadastrado
- FinanceService: Que é o serviço responsável pelo tratamento e gerenciamento de dados das finanças

###### Exemplo do Serviço mais simples da API:
```
@Service
public class AuthService {
	@Autowired
	private ClientRepo clientRepo;

	@Autowired
	private SystemMessage message;

  //Tratamento e resposta para Cadastro
	public ResponseEntity<?> signup(Client client) {
		if (client.getName() == null || client.getName().equals("")) {
			message.setMessage("Preencha um nome");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);//confere se nome n existe
		} else if (client.getEmail().equals("") || client.getEmail() == null) {
			message.setMessage("Preencha um nome de email");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);//confere se o email não existe
		} else if (client.getPassword() == null || client.getPassword().equals("")) {
			message.setMessage("A senha não pode ser vazia, preencha uma senha");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);//confere se a senha não existe
		} else if (clientRepo.findByEmail(client.getEmail()) != null) {
			message.setMessage("Usuário já existe");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST); // confere se usuario ja existe
		} else {
			clientRepo.save(client);
			message.setMessage("Cadastro Realizado com Sucesso");
			return new ResponseEntity<>(message, HttpStatus.CREATED);//cadastra usuario
		}
	}
  
  //Tratamento e resposta para Login
	public ResponseEntity<?> login(Client client) {
		Client storedClient = clientRepo.findByEmail(client.getEmail());
		if (storedClient == null || !storedClient.getPassword().equals(client.getPassword())) {//conferencia de user/senha de entrada
			message.setMessage("Usuário/Senha Incorretos");
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
		} else {
			message.setMessage("Usuário/Senha Incorretos"); // conferencia de user/senha de entrada
			;
			return new ResponseEntity<>(message, HttpStatus.OK);
		}
	}
```
