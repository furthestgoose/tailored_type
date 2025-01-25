package org.example.keebshopbackend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;
import jakarta.persistence.Version;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name;
    private String type;
    private BigDecimal price;
    private String image;
    private String hoverImage;
    private boolean preorder;
    private boolean recent;
    private boolean featured;
    private boolean groupbuy;

    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    private List<String> images;

    private String layout;
    private String hotswappable;
    private String HE;
    private String description;

    @ElementCollection
    @CollectionTable(name = "product_switches", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "switch_type")
    private List<String> switches;

    private String keycapsMaterial;
    private String caseMaterial;

    @Column(columnDefinition = "JSON")
    private String swappableOptionsJson;

    // Constructors
    public Product() {}

    // Getters and Setters (omitted for brevity, but you should generate these)

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public BigDecimal getPrice() {
        return price;
    }
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public String getHoverImage() {
        return hoverImage;
    }
    public void setHoverImage(String hoverImage) {
        this.hoverImage = hoverImage;
    }
    public List<String> getImages() {
        return images;
    }
    public void setImages(List<String> images) {
        this.images = images;
    }
    public String getLayout() {
        return layout;
    }
    public void setLayout(String layout) {
        this.layout = layout;
    }
    public String getHotswappable() {
        return hotswappable;
    }

    public String getHE() {
        return HE;
    }
    public void setHotswappable(String hotswappable) {
        this.hotswappable = hotswappable;
    }
    public void setHE(String HE) {
        this.HE = HE;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public List<String> getSwitches() {
        return switches;
    }
    public void setSwitches(List<String> switches) {
        this.switches = switches;
    }
    public String getKeycapsMaterial() {
        return keycapsMaterial;
    }
    public void setKeycapsMaterial(String keycapsMaterial) {
        this.keycapsMaterial = keycapsMaterial;
    }
    public String getCaseMaterial() {
        return caseMaterial;
    }
    public void setCaseMaterial(String caseMaterial) {
        this.caseMaterial = caseMaterial;
    }
    public String getSwappableOptionsJson() {
        return swappableOptionsJson;
    }
    public void setSwappableOptionsJson(String swappableOptionsJson) {
        this.swappableOptionsJson = swappableOptionsJson;
    }

    public boolean isPreorder() {
        return preorder;
    }
    public void setPreorder(boolean preorder) {
        this.preorder = preorder;
    }
    public boolean isRecent() {
        return recent;
    }
    public void setRecent(boolean recent) {
        this.recent = recent;
    }
    public boolean isFeatured() {
        return featured;
    }
    public void setFeatured(boolean featured) {
        this.featured = featured;
    }
    public boolean isGroupbuy() {
        return groupbuy;
    }
    public void setGroupbuy(boolean groupbuy) {
        this.groupbuy = groupbuy;
    }
}