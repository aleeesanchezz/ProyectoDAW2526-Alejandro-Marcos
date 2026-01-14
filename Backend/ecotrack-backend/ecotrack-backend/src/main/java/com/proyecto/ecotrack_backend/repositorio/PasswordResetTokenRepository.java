package com.proyecto.ecotrack_backend.repositorio;

import com.proyecto.ecotrack_backend.modelos.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {

    PasswordResetToken findByToken(String token);
}
