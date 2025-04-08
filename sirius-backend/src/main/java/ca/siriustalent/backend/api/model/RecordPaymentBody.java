package ca.siriustalent.backend.api.model;

import java.time.LocalDate;
import java.util.List;

public class RecordPaymentBody {

    private List<String> dates;

    public List<String> getDates() {
        return dates;
    }
    public void setDates(List<String> dates) {
        this.dates = dates;
    }
}
