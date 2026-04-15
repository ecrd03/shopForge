package com.shopforge.backend.model;

public class ProductImageRequest {
    private String id;
    private String preview;
    private String url;
    private String path;

    public String getId() { return id; }
    public String getPreview() { return preview; }
    public String getUrl() { return url; }
    public String getPath() { return path; }

    public void setId(String id) { this.id = id; }
    public void setPreview(String preview) { this.preview = preview; }
    public void setUrl(String url) { this.url = url; }
    public void setPath(String path) { this.path = path; }
}