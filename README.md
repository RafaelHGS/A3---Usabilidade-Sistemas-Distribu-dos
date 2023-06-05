# Projeto A3 para Sistemas Distribuídos e Usabilidade
  Para Projeto de A3 para as matérias de Sistemas Sistribuídos Mobile, Usabilidade Desenvolvimento web/mobile/jogos, nosso grupo decidiu realizar um projeto de um gestor financeiro simples, o gestor consiste em duas seções, a parte de Back-end que será a parte para Sistemas Distribuídos, consistindo em uma API Rest que gerenciará um banco de dados e tratamento de dados da aplicação E a parte de Front-End que será a parte para a matéria de Usabilidade, feita com Ionic Angular para a UserInterface e consumo da API criada no back-end.

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

![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/7364483f-8710-41a3-a876-3bacb2246c08)
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

![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/68144100-6167-4b0c-ab48-b0a2a196d84d)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/931310a8-63fa-4893-851f-d9073dee7e2f)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/ba1be8c8-5769-4b87-8087-8e4cbca0acc2)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/2b54eca4-5d03-4073-99aa-8be45de34eb6)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/ac3ab30e-cb41-4a2d-948a-36efaaa2a776)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/1362f3be-067a-4619-91fd-9c21c60f51d2)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/96d87187-1f5c-4262-96df-99c1c653a997)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/25c1e5ec-3805-421f-a3e4-e7279031663d)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/edd868eb-62a4-4696-ba8c-d5c67bb9efd5)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/080f1077-1294-43a5-965c-b23d1c11f27d)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/cae3744f-eaf9-4633-b6cd-643f82ffa400)
![image](https://github.com/RafaelHGS/A3---Usabilidade-Sistemas-Distribu-dos/assets/89417905/078df74f-80b1-4ba7-8aed-ba05931a0f31)



