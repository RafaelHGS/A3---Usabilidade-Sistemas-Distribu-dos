package com.gestorfinanceiro.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.gestorfinanceiro.api.model.Client;
import com.gestorfinanceiro.api.model.Finance;
import com.gestorfinanceiro.api.repo.ClientRepo;
import com.gestorfinanceiro.api.repo.FinanceRepo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiApplication {
	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

	@Bean
	CommandLineRunner criaClientes(ClientRepo clientRepo) {
		return args -> {
			clientRepo.save(new Client(null, "Diego", "diego@gmail.com", "123"));
			clientRepo.save(new Client(null, "Rafael", "rafa", "123"));
			clientRepo.save(new Client(null, "Vini", "vini@hotmail.com", "123"));
		};
	}

	@Bean
	CommandLineRunner criaGastos(FinanceRepo financeRepo) {
		return args -> {
			financeRepo.save(new Finance(null, "Pix Diego", 120, (long) 1));
			financeRepo.save(new Finance(null, "Pix Dieg", 130, (long) 1));
			financeRepo.save(new Finance(null, "Pix Dieg", -20, (long) 1));
			financeRepo.save(new Finance(null, "Pix Dieg", -30, (long) 1));
			financeRepo.save(new Finance(null, "Pix Rafa", -10, (long) 2));
			financeRepo.save(new Finance(null, "Pix Rafa", -10, (long) 2));
			financeRepo.save(new Finance(null, "Pix Rafa",  20, (long) 2));
			financeRepo.save(new Finance(null, "Pix Rafa",  10, (long) 2));
		};
	}
}
