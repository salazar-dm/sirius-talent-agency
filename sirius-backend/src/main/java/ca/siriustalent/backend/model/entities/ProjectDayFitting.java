package ca.siriustalent.backend.model.entities;

import java.util.List;

public class ProjectDayFitting {

    private String title;

    private List<String> shootDates; // ISO yyyy-MM-dd

    private String fittingDate; // ISO yyyy-MM-dd

    private String rate;

    private List<FittingEntry> fittingTime;

    private String reportTo;

    private String notes;

    private String wardrobeNotes;

    private String hairNotes;

    private String makeupNotes;

    private String additionalNotes;

    // --- Getters and Setters ---

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getShootDates() {
        return shootDates;
    }

    public void setShootDates(List<String> shootDates) {
        this.shootDates = shootDates;
    }

    public String getFittingDate() {
        return fittingDate;
    }

    public void setFittingDate(String fittingDate) {
        this.fittingDate = fittingDate;
    }

    public String getRate() {
        return rate;
    }

    public void setRate(String rate) {
        this.rate = rate;
    }

    public List<FittingEntry> getFittingTime() {
        return fittingTime;
    }

    public void setFittingTime(List<FittingEntry> fittingTime) {
        this.fittingTime = fittingTime;
    }

    public String getReportTo() {
        return reportTo;
    }

    public void setReportTo(String reportTo) {
        this.reportTo = reportTo;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
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

    public String getAdditionalNotes() {
        return additionalNotes;
    }

    public void setAdditionalNotes(String additionalNotes) {
        this.additionalNotes = additionalNotes;
    }

    // --- Inner class ---

    public static class FittingEntry {
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
