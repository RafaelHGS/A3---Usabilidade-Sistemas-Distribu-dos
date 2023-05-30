package br.com.gestorfinanceiro.api.Model;

import org.springframework.stereotype.Component;
import lombok.Getter;
import lombok.Setter;

@Component
@Getter
@Setter
public class SystemMessage {
	private String message;
}
