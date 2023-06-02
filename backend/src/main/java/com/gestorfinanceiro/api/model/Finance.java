package com.gestorfinanceiro.api.model;

import jakarta.persistence.*;
import lombok.*;

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
