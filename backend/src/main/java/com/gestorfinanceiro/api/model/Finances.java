package com.gestorfinanceiro.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
<<<<<<<< HEAD:java/TesteAPIGestor/src/main/java/com/gestorfinanceiro/api/model/Finances.java
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "financas")
@Getter
@Setter
public class Finances {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
========
import lombok.AllArgsConstructor;
import lombok.Data;
// import lombok.Getter;
import lombok.NoArgsConstructor;
// import lombok.Setter;

@Entity
@Table(name = "financas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Finance {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long financeId;
>>>>>>>> 4e97932b4f9c0052f5639c6cbc409d65e928e905:java/TesteAPIGestor/src/main/java/com/gestorfinanceiro/api/model/Finance.java

	private String financeName;
	private double financeValue;
	private Long clientId;
}
