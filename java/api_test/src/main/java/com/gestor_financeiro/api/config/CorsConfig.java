// package com.gestor_financeiro.api.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.filter.CorsFilter;

// @Configuration
// public class CorsConfig {

//     @Bean
//     public CorsFilter corsFilter() {
//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         CorsConfiguration config = new CorsConfiguration();

//         config.addAllowedOrigin("*"); // Permitir todas as origens
//         config.addAllowedMethod(HttpMethod.GET);
//         config.addAllowedMethod(HttpMethod.POST);
//         config.addAllowedMethod(HttpMethod.PUT);
//         config.addAllowedMethod(HttpMethod.DELETE);
//         config.addAllowedMethod(HttpMethod.OPTIONS);
//         config.addAllowedHeader("*"); // Permitir todos os headers

//         source.registerCorsConfiguration("/**", config);

//         return new CorsFilter(source);
//     }
// }