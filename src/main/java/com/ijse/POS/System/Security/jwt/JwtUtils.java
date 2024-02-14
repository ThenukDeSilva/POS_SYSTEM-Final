package com.ijse.POS.System.Security.jwt;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {

    @Value("${app.secret}")
    private String jwtSecret;

    @Value("${app.jwtExpiration}")
    private int jwtExpiration;

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String generateToken(Authentication authentication){
        UserDetails userDetails=(UserDetails) authentication.getPrincipal();

        return Jwts.builder()
        .setSubject(userDetails.getUsername())
        .setIssuedAt(new Date())
        .setExpiration(new Date(new Date().getTime()+jwtExpiration))
        .signWith(key(),SignatureAlgorithm.HS256)
        .compact();
}

public boolean validateJwtToken(String authTocken){
    try{
        Jwts.parserBuilder().setSigningKey(key()).build().parse(authTocken);
        return true;
    }catch (MalformedJwtException e){
        System.err.println("Invaid tocken");
    }catch (ExpiredJwtException e){
        System.err.println("Invaid tocken");
    }catch (UnsupportedJwtException e){
        System.err.println("Unsupported tocken format");
    }catch(IllegalArgumentException e){
        System.err.println("Tocken blank");
    }

    return false;
}

public String getUsernameFromJwtTocken(String authTocken){
    return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(authTocken).getBody().getSubject();
}

}
