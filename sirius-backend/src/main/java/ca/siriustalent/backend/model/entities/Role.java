package ca.siriustalent.backend.model.entities;

public class Role {

    private String name;
    private int available = 0;
    private int max;

    public Role() {}

    public Role(String name, int max) {
        this.name = name;
        this.max = max;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAvailable() {
        return available;
    }

    public void setAvailable(int available) {
        this.available = available;
    }

    public int getMax() {
        return max;
    }

    public void setMax(int max) {
        this.max = max;
    }
}