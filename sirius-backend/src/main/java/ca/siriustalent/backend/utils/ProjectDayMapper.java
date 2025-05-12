package ca.siriustalent.backend.utils;

import ca.siriustalent.backend.api.model.ProjectDayCallBody;
import ca.siriustalent.backend.api.model.ProjectDayFittingBody;
import ca.siriustalent.backend.api.model.ProjectRoleBody;
import ca.siriustalent.backend.api.model.RoleFiltersBody;
import ca.siriustalent.backend.model.entities.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectDayMapper {

    private static ProjectDayCall.CallSheetEntry mapCallEntryBodyToEntity(ProjectDayCallBody.CallSheetEntry bodyEntry) {
        ProjectDayCall.CallSheetEntry entry = new ProjectDayCall.CallSheetEntry();
        entry.setCall(bodyEntry.getCall());
        entry.setName(bodyEntry.getName());
        entry.setUnion(bodyEntry.getUnion());
        entry.setRole(bodyEntry.getRole());
        return entry;
    }

    public static ProjectDayCall mapCallBodyToEntity(ProjectDayCallBody body) {
        ProjectDayCall call = new ProjectDayCall();
        call.setTitle(body.getTitle());
        call.setFilmingDate(body.getFilmingDate());
        call.setReportTo(body.getReportTo());
        call.setParking(body.getParking());
        call.setShuttles(body.getShuttles());
        call.setHealthAndSafety(body.getHealthAndSafety());
        call.setRate(body.getRate());
        call.setWardrobeNotes(body.getWardrobeNotes());
        call.setHairNotes(body.getHairNotes());
        call.setMakeupNotes(body.getMakeupNotes());
        call.setAccounting(body.getAccounting());
        call.setAdditionalNotes(body.getAdditionalNotes());

        if (body.getCallSheet() != null) {
            List<ProjectDayCall.CallSheetEntry> entries = body.getCallSheet().stream()
                    .map(ProjectDayMapper::mapCallEntryBodyToEntity)
                    .collect(Collectors.toList());
            call.setCallSheet(entries);
        }

        return call;
    }

    private static ProjectDayFitting.FittingEntry mapFittingEntryBodyToEntity(ProjectDayFittingBody.FittingEntry bodyEntry) {
        ProjectDayFitting.FittingEntry entityEntry = new ProjectDayFitting.FittingEntry();
        entityEntry.setCall(bodyEntry.getCall());
        entityEntry.setName(bodyEntry.getName());
        entityEntry.setUnion(bodyEntry.getUnion());
        entityEntry.setRole(bodyEntry.getRole());
        return entityEntry;
    }



    public static ProjectDayFitting mapFittingBodyToEntity(ProjectDayFittingBody body) {
        ProjectDayFitting fitting = new ProjectDayFitting();
        fitting.setTitle(body.getTitle());
        fitting.setShootDates(body.getShootDates());
        fitting.setFittingDate(body.getFittingDate());
        fitting.setRate(body.getRate());
        fitting.setReportTo(body.getReportTo());
        fitting.setNotes(body.getNotes());
        fitting.setWardrobeNotes(body.getWardrobeNotes());
        fitting.setHairNotes(body.getHairNotes());
        fitting.setMakeupNotes(body.getMakeupNotes());
        fitting.setAdditionalNotes(body.getAdditionalNotes());

        if (body.getFittingTime() != null) {
            List<ProjectDayFitting.FittingEntry> entries = body.getFittingTime().stream()
                    .map(ProjectDayMapper::mapFittingEntryBodyToEntity)
                    .collect(Collectors.toList());
            fitting.setFittingTime(entries);
        }

        return fitting;
    }

    public static ProjectRole mapRoleBodyToEntity(ProjectRoleBody body) {
        ProjectRole role = new ProjectRole();
        role.setName(body.getName());
        role.setQuota(body.getQuota());
        role.setAvailablePerformers(new ArrayList<>());
        role.setConfirmedPerformers(new ArrayList<>());

        if (body.getFilters() != null) {
            role.setFilters(mapFiltersBodyToEntity(body.getFilters()));
        }

        return role;
    }

    private static RoleFilters mapFiltersBodyToEntity(RoleFiltersBody body) {
        RoleFilters filters = new RoleFilters();

        filters.setUnionStatus(body.getUnionStatus());
        filters.setAge(mapRangeBodyToEntity(body.getAge()));
        filters.setCity(body.getCity());
        filters.setSelfDrive(body.getSelfDrive());
        filters.setGender(body.getGender());
        filters.setEthnicity(body.getEthnicity());
        filters.setLgbt(body.getLgbt());
        filters.setBipoc(body.getBipoc());
        filters.setTrans(body.getTrans());
        filters.setVisibleTattoos(body.getVisibleTattoos());

        filters.setSizeHeight(mapRangeBodyToEntity(body.getSizeHeight()));
        filters.setSizeWeight(mapRangeBodyToEntity(body.getSizeWeight()));
        filters.setSizeChest(mapRangeBodyToEntity(body.getSizeChest()));
        filters.setSizeWaist(mapRangeBodyToEntity(body.getSizeWaist()));
        filters.setSizeHips(mapRangeBodyToEntity(body.getSizeHips()));
        filters.setSizeShoe(mapRangeBodyToEntity(body.getSizeShoe()));
        filters.setSizeInseam(mapRangeBodyToEntity(body.getSizeInseam()));

        return filters;
    }


    private static Range mapRangeBodyToEntity(RoleFiltersBody.Range bodyRange) {
        if (bodyRange == null) return null;
        Range range = new Range();
        range.setMin(bodyRange.getMin());
        range.setMax(bodyRange.getMax());
        return range;
    }



}

