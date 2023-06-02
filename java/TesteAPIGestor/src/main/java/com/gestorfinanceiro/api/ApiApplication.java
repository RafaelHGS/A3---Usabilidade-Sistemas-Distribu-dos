// package com.gestorfinanceiro.api;

// import com.gestorfinanceiro.api.model.Client;
// import com.gestorfinanceiro.api.repo.ClientRepo;
// import org.springframework.boot.CommandLineRunner;
// import org.springframework.boot.SpringApplication;
// import org.springframework.context.annotation.Bean;
// import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication
// public class ApiApplication {
// 	public static void main(String[] args) {
// 	// 	SpringApplication.run(ApiApplication.class, args);
// 	// }

// 	// @Bean
// 	// CommandLineRunner run(ClientRepo clientRepo) {
// 	// 	return args -> {
// 	// 		clientRepo.save(new Client(
// 	// 				null, "Diego", "diego@gmail.com", "123"
// 	// 		));
// 	// 		clientRepo.save(new Client(
// 	// 				null, "Rafael", "rafael@yahoo.com", "123"
// 	// 		));
// 	// 		clientRepo.save(new Client(
// 	// 				null, "Vini", "vini@hotmail.com", "123"
// 	// 		));
// 	// 	};
// 	}
// }



package com.gestorfinanceiro.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

}