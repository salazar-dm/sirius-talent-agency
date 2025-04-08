package ca.siriustalent.backend.api.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PaymentBody {
    String production;
    LocalDate date;
    BigDecimal amount;
    BigDecimal rate;

    public String getProduction() {
        return production;
    }
    public void setProduction(String production) {
        this.production = production;
    }
    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    public BigDecimal getAmount() {
        return amount;
    }
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    public BigDecimal getRate() {return rate;}
    public void setRate(BigDecimal rate) {this.rate = rate;}
}
