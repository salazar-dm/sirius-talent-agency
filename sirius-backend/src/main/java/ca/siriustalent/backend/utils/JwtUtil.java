package ca.siriustalent.backend.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import ca.siriustalent.backend.exception.ResourceNotFoundException;
import ca.siriustalent.backend.model.entities.RevokedJwt;
import ca.siriustalent.backend.model.dao.RevokedJwtRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private RevokedJwtRepository revokedJwtRepository;

    public JwtUtil(RevokedJwtRepository revokedJwtRepository) {
        this.revokedJwtRepository = revokedJwtRepository;
    }

    private String secretKey = "mihakari";

    private int accessTokenExpiration = 1000 * 60 * 60 * 24 * 21;

    public String generateToken(String subject, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpiration))
                .signWith(io.jsonwebtoken.SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String generateAvailabilityToken(String production, LocalDate date, String subject, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("production", production);
        claims.put("date", date);
        claims.put("role", role);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpiration))
                .signWith(io.jsonwebtoken.SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public boolean validateToken(String token, String id) {
        final String extractedId = extractSubject(token);
        return (extractedId.equals(id) && !isTokenExpired(token) && !isTokenRevoked(token));
    }

    public String extractSubject(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    public String extractRole(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().get("role", String.class);
    }

    public Claims extractProductionAndDayClaims(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean isTokenRevoked(String token) {
        return revokedJwtRepository.findByToken(token) != null;
    }

    public boolean isTokenRevokedByIdAndRevocable(String id) {
        RevokedJwt revokedJwt = revokedJwtRepository.findById(id.toString()).orElse(null);

        if (revokedJwt == null) {
            return false;
        }

        return revokedJwt.isRevocable();
    }

    private Date extractExpiration(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getExpiration();
    }

    public String revokeToken(String token, boolean revocable) {
        RevokedJwt revokedJwt = new RevokedJwt();
        revokedJwt.setToken(token);
        revokedJwt.setId(extractSubject(token));
        revokedJwt.setRevocable(revocable);
        return revokedJwtRepository.save(revokedJwt).getToken();
    }

    public void unrevokeToken(String token) {
        revokedJwtRepository.deleteByToken(token);
    }

    public String getRevokedTokenById(String id) {
        RevokedJwt revokedJwt = revokedJwtRepository.findById(id).orElse(null);

        if (revokedJwt == null) {
            throw new ResourceNotFoundException("Token not found with id: " + id);
        }
        return revokedJwt.getToken();
    }
}
