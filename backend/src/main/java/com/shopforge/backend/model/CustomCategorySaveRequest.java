package com.shopforge.backend.model;

import java.util.List;

public class CustomCategorySaveRequest {
    private Boolean enabled;
    private List<List<String>> lines;

    public Boolean getEnabled() { return enabled; }
    public List<List<String>> getLines() { return lines; }

    public void setEnabled(Boolean enabled) { this.enabled = enabled; }
    public void setLines(List<List<String>> lines) { this.lines = lines; }
}