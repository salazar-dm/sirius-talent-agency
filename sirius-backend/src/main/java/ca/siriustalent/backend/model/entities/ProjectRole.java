package ca.siriustalent.backend.model.entities;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ProjectRole {

    private String name;

    private int quota;

    private RoleFilters filters;

    private List<String> availablePerformers = new ArrayList<>();

    private List<String> confirmedPerformers = new ArrayList<>();

    private List<String> forAvailabilityCheck = new ArrayList<>();
}

