package ca.siriustalent.backend.model.wrappers;

import ca.siriustalent.backend.model.entities.LocalUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class LocalUserDetails implements UserDetails {
    private final LocalUser localUser;

    public LocalUserDetails(LocalUser localUser) {
        this.localUser = localUser;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + localUser.getRole()));
    }

    @Override
    public String getPassword() {
        return localUser.getPassword();
    }

    @Override
    public String getUsername() {
        return localUser.getTel(); // Or another unique identifier if needed
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Customize as needed
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Customize as needed
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Customize as needed
    }

    @Override
    public boolean isEnabled() {
        return localUser.isUserActivated(); // Check activation status
    }

    public String getId() {
        return localUser.getId(); // Expose ID if needed
    }
}
