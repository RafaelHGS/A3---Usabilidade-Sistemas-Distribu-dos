package com.gestorfinanceiro.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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

	private String financeName;
	private double financeValue;
	private Long clientId;
}
