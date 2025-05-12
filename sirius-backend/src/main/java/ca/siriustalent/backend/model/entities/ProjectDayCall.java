package ca.siriustalent.backend.model.entities;

import java.util.List;

public class ProjectDayCall {

    private String title;

    private String filmingDate; // ISO string (yyyy-MM-dd)

    private String reportTo;

    private String parking;

    private String shuttles;

    private String healthAndSafety;

    private String rate;

    private List<CallSheetEntry> callSheet;

    private String wardrobeNotes;

    private String hairNotes;

    private String makeupNotes;

    private String accounting;

    private String additionalNotes;

    // --- Getters and Setters ---

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFilmingDate() {
        return filmingDate;
    }

    public void setFilmingDate(String filmingDate) {
        this.filmingDate = filmingDate;
    }

    public String getReportTo() {
        return reportTo;
    }

    public void setReportTo(String reportTo) {
        this.reportTo = reportTo;
    }

    public String getParking() {
        return parking;
    }

    public void setParking(String parking) {
        this.parking = parking;
    }

    public String getShuttles() {
        return shuttles;
    }

    public void setShuttles(String shuttles) {
        this.shuttles = shuttles;
    }

    public String getHealthAndSafety() {
        return healthAndSafety;
    }

    public void setHealthAndSafety(String healthAndSafety) {
        this.healthAndSafety = healthAndSafety;
    }

    public String getRate() {
        return rate;
    }

    public void setRate(String rate) {
        this.rate = rate;
    }

    public List<CallSheetEntry> getCallSheet() {
        return callSheet;
    }

    public void setCallSheet(List<CallSheetEntry> callSheet) {
        this.callSheet = callSheet;
    }

    public String getWardrobeNotes() {
        return wardrobeNotes;
    }

    public void setWardrobeNotes(String wardrobeNotes) {
        this.wardrobeNotes = wardrobeNotes;
    }

    public String getHairNotes() {
        return hairNotes;
    }

    public void setHairNotes(String hairNotes) {
        this.hairNotes = hairNotes;
    }

    public String getMakeupNotes() {
        return makeupNotes;
    }

    public void setMakeupNotes(String makeupNotes) {
        this.makeupNotes = makeupNotes;
    }

    public String getAccounting() {
        return accounting;
    }

    public void setAccounting(String accounting) {
        this.accounting = accounting;
    }

    public String getAdditionalNotes() {
        return additionalNotes;
    }

    public void setAdditionalNotes(String additionalNotes) {
        this.additionalNotes = additionalNotes;
    }

    // --- Inner class ---

    public static class CallSheetEntry {
        private String call;
        private String name;
        private String union;
        private String role;

        public String getCall() {
            return call;
        }

        public void setCall(String call) {
            this.call = call;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getUnion() {
            return union;
        }

        public void setUnion(String union) {
            this.union = union;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }
}
