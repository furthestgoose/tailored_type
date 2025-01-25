package org.example.keebshopbackend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.keebshopbackend.model.Product;
import org.example.keebshopbackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ProductDataLoaderService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public void loadInitialData() {
        if (productRepository.count() < 7) {
            List<Product> productsToSave = new ArrayList<>();

            productsToSave.add(createKeyboard(
                    false,
                    true,
                    false,
                    false,
                    "Custom TKL Keyboard",
                    BigDecimal.valueOf(199.99),
                    "keyboard",
                    "/images/keyboard1.jpg",
                    List.of("/images/keyboard1.jpg","/images/switches1.webp" ),
                    "TKL",
                    "Yes",
                    "No",
                    List.of("any 3pin or 5pin switches"),
                    "/images/switches1.webp",
                    "A customizable TKL keyboard with various options",
                    Map.of(
                            "PCB", List.of(
                                    Map.of("name", "Standard PCB", "price", 0),
                                    Map.of("name", "Hot-swappable PCB", "price", 30),
                                    Map.of("name", "Hot-swappable RGB PCB", "price", 50)
                            ),
                            "Case", List.of(
                                    Map.of("name", "Plastic Case", "price", 0),
                                    Map.of("name", "Aluminum Case", "price", 80),
                                    Map.of("name", "Wood Case", "price", 100)
                            ),
                            "Switches", List.of(
                                    Map.of("name", "Cherry MX Blue", "price", 0),
                                    Map.of("name", "Gateron Red", "price", 10),
                                    Map.of("name", "Kailh Box White", "price", 15)
                            )
                    )
            ));

            productsToSave.add(createKeyboard(
                    false,
                    false,
                    true,
                    false,
                    "Custom 75% HE Keyboard",
                    BigDecimal.valueOf(199.99),
                    "keyboard",
                    "/images/keyboard1.jpg",
                    List.of("/images/keyboard1.jpg","/images/switches1.webp" ),
                    "75%",
                    "Yes",
                    "Yes",
                    List.of("any 3pin or 5pin switches"),
                    "/images/switches1.webp",
                    "A customizable 75% keyboard with various options",
                    Map.of(
                            "PCB", List.of(
                                    Map.of("name", "Standard PCB", "price", 0),
                                    Map.of("name", "Hot-swappable PCB", "price", 30),
                                    Map.of("name", "Hot-swappable RGB PCB", "price", 50)
                            ),
                            "Case", List.of(
                                    Map.of("name", "Plastic Case", "price", 0),
                                    Map.of("name", "Aluminum Case", "price", 80),
                                    Map.of("name", "Wood Case", "price", 100)
                            ),
                            "Switches", List.of(
                                    Map.of("name", "Cherry MX Blue", "price", 0),
                                    Map.of("name", "Gateron Red", "price", 10),
                                    Map.of("name", "Kailh Box White", "price", 15)
                            )
                    )
            ));

            productsToSave.add(createSwitches(
                    false,
                    false,
                    false,
                    true,
                    "Cherry MX Blue Switches",
                    BigDecimal.valueOf(49.99),
                    "/images/switches1.webp",
                    "/images/switches1-hover.jpg",

                    "test",
                    Map.of(
                            "Quantity", List.of(
                                    Map.of("name", "90", "price", 0),
                                    Map.of("name", "110", "price", 15)
                            )
                    )
            ));

            productsToSave.add(createProduct(
                    false,
                    true,
                    false,
                    false,
                    "Minimalist Keycap Set",
                    "keycaps",
                    BigDecimal.valueOf(79.99),
                    "/images/keycaps1.jpg",
                    List.of("/images/keycaps1.jpg"),
                    "/images/keycaps1-hover.jpg",
                    "test",
                    null
            ));

            productsToSave.add(createCase(
                    true,
                    true,
                    false,
                    false,
                    "60% Wooden Case",
                    "case",
                    BigDecimal.valueOf(89.99),
                    "/images/case1.jpg",
                    List.of("/images/case1.jpg","/images/case1-hover.jpg"),
                    "/images/case1-hover.jpg",
                    "test",
                    "wood",
                    "75%",
                    null
            ));

            productsToSave.add(createProduct(
                    false,
                    false,
                    false,
                    true,
                    "Custom Coiled Cable",
                    "cable",
                    BigDecimal.valueOf(39.99),
                    "/images/cable1.jpg",
                    List.of("/images/cable1.jpg","/images/switches1.webp"),
                    "/images/cable1-hover.jpg",
                    "test",
                    null
            ));

            productsToSave.add(createProduct(
                    false,
                    false,
                    true,
                    false,
                    "Artisan Keycap",
                    "artisan",
                    BigDecimal.valueOf(29.99),
                    "/images/artisan1.jpg",
                    List.of("/images/artisan1.jpg"),
                    "/images/artisan1-hover.jpg",
                    "test",
                    null
            ));

            productsToSave.add(createProduct(
                    false,
                    false,
                    true,
                    true,
                    "ALU Plate",
                    "plate",
                    BigDecimal.valueOf(59.99),
                    "/images/switches1.webp",
                    List.of("/images/switches1.webp"),
                    "/images/plate1-hover.jpg",
                    "alu plate clink clink",
                    null
            ));

            productsToSave.add(createProduct(
                    true,
                    true,
                    false,
                    false,
                    "Switch Plushy",
                    "plushy",
                    BigDecimal.valueOf(29.99),
                    "/images/switchplush.jpg",
                    List.of("/images/switchplush.jpg","/images/switchplush.jpg"),
                    "/images/switchplush-hover.jpg",

                    "cute plush",
                    null
            ));

            // Save all products to the database
            productRepository.saveAll(productsToSave);
        }
    }

    private Product createKeyboard(boolean recent, boolean featured, boolean preorder,boolean groupbuy,String name, BigDecimal price, String type, String image, List<String> images, String layout,
                                   String hotswappable, String HE, List<String> switches, String hoverImage,
                                   String description, Map<String, List<Map<String, Object>>> swappableOptions) {
        Product product = new Product();
        product.setRecent(recent);
        product.setFeatured(featured);
        product.setPreorder(preorder);
        product.setGroupbuy(groupbuy);
        product.setName(name);
        product.setPrice(price);
        product.setType(type);
        product.setImage(image);
        product.setImages(images);
        product.setLayout(layout);
        product.setHotswappable(hotswappable);
        product.setHE(HE);
        product.setSwitches(switches);
        product.setHoverImage(hoverImage);
        product.setDescription(description);
        try {
            product.setSwappableOptionsJson(objectMapper.writeValueAsString(swappableOptions));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return product;
    }

    private Product createSwitches(boolean recent, boolean featured, boolean preorder,boolean groupbuy,String name, BigDecimal price, String image, String hoverImage, String description,
                                   Map<String, List<Map<String, Object>>> swappableOptions) {
        Product product = new Product();
        product.setRecent(recent);
        product.setFeatured(featured);
        product.setPreorder(preorder);
        product.setGroupbuy(groupbuy);
        product.setName(name);
        product.setPrice(price);
        product.setType("switches");
        product.setImage(image);
        product.setHoverImage(hoverImage);
        product.setDescription(description);
        try {
            product.setSwappableOptionsJson(objectMapper.writeValueAsString(swappableOptions));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return product;
    }

    private Product createProduct(boolean recent, boolean featured, boolean preorder,boolean groupbuy,String name, String type, BigDecimal price, String image,List<String> images, String hoverImage,
                                  String description, Map<String, List<Map<String, Object>>> swappableOptions) {
        Product product = new Product();
        product.setRecent(recent);
        product.setFeatured(featured);
        product.setPreorder(preorder);
        product.setGroupbuy(groupbuy);
        product.setName(name);
        product.setType(type);
        product.setPrice(price);
        product.setImage(image);
        product.setImages(images);
        product.setHoverImage(hoverImage);
        product.setDescription(description);
        if (swappableOptions != null) {
            try {
                product.setSwappableOptionsJson(objectMapper.writeValueAsString(swappableOptions));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return product;
    }

    private Product createCase(boolean recent, boolean featured, boolean preorder,boolean groupbuy,String name, String type, BigDecimal price, String image,List<String> images, String hoverImage,
                               String description,String caseMaterial,String layout, Map<String, List<Map<String, Object>>> swappableOptions) {
        Product product = new Product();
        product.setRecent(recent);
        product.setFeatured(featured);
        product.setPreorder(preorder);
        product.setGroupbuy(groupbuy);
        product.setName(name);
        product.setType(type);
        product.setPrice(price);
        product.setImage(image);
        product.setImages(images);
        product.setHoverImage(hoverImage);
        product.setDescription(description);
        product.setCaseMaterial(caseMaterial);
        product.setLayout(layout);
        if (swappableOptions != null) {
            try {
                product.setSwappableOptionsJson(objectMapper.writeValueAsString(swappableOptions));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return product;
    }
}
