package org.example.keebshopbackend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.keebshopbackend.model.Product;
import org.example.keebshopbackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public List<Product> getProductById(@PathVariable("id") int id) {
        return productRepository.findProductsById(id);
    }

    @GetMapping("/keyboards")
    public List<Product> getProductsByKeyBoards() {
        return productRepository.findProductsByTypeContaining("keyboard");
    }

    @GetMapping("/keyboards/{id}")
    public List<Product> getProductsByKeyBoards(@PathVariable("id") int id) {
        return productRepository.findProductsByTypeContainingAndId("keyboard", id);
    }

    @GetMapping("/keyboardparts")
    public List<Product> getProductsByKeyBoardParts() {
        List<Product> parts = new ArrayList<>();
        parts.addAll(productRepository.findProductsByTypeContaining("plate"));
        parts.addAll(productRepository.findProductsByTypeContaining("case"));
        parts.addAll(productRepository.findProductsByTypeContaining("weight"));
        parts.addAll(productRepository.findProductsByTypeContaining("knob"));
        parts.addAll(productRepository.findProductsByTypeContaining("extras"));
        parts.addAll(productRepository.findProductsByTypeContaining("stabiliser"));
        parts.addAll(productRepository.findProductsByTypeContaining("spring"));
        return parts;

    }

    @GetMapping("/accessories")
    public List<Product> getProductsByAccessories() {
        List<Product> accessories = new ArrayList<>();
        accessories.addAll(productRepository.findProductsByTypeContaining("mat"));
        accessories.addAll(productRepository.findProductsByTypeContaining("tray"));
        accessories.addAll(productRepository.findProductsByTypeContaining("fidget toy"));
        accessories.addAll(productRepository.findProductsByTypeContaining("plushy"));
        accessories.addAll(productRepository.findProductsByTypeContaining("mouse"));
        accessories.addAll(productRepository.findProductsByTypeContaining("tools"));
        accessories.addAll(productRepository.findProductsByTypeContaining("cable"));
        return accessories;
    }
    @GetMapping("/artisans")
    public List<Product> getProductsByArtisans() {
        return productRepository.findProductsByTypeContaining("artisan");
    }
    @GetMapping("/deskmat")
    public List<Product> getProductsByDeskmat() {
        return productRepository.findProductsByTypeContaining("deskmat");
    }
    @GetMapping("/keycaps")
    public List<Product> getProductsByKeyCaps() {
        return productRepository.findProductsByTypeContaining("keycaps");
    }
    @GetMapping("/switches")
    public List<Product> getProductsBySwitches() {
        return productRepository.findProductsByTypeContaining("switches");
    }
    @GetMapping("/featured")
    public List<Product> getFeaturedProducts() {
        return productRepository.findProductsByFeaturedIsTrueOrderByIdDesc();
    }

    @GetMapping("/recent")
    public List<Product> getRecentProducts() {
        return productRepository.findProductByRecentIsTrueOrderByIdDesc();
    }

    @GetMapping("/groupbuys")
    public List<Product> getGroupBuyProducts() {
        return productRepository.findProductsByGroupbuyIsTrueOrderByIdDesc();
    }

    @GetMapping("/preorders")
    public List<Product> getPreorderProducts() {
        return productRepository.findProductsByPreorderIsTrueOrderByIdDesc();
    }

    @GetMapping("/groupbuys&preorders")
    public List<Product> getGroupBuyPreorderProducts() {
        List<Product> gbpreorder = new ArrayList<>();
        gbpreorder.addAll(productRepository.findProductsByGroupbuyIsTrueOrderByIdDesc());
        gbpreorder.addAll(productRepository.findProductsByPreorderIsTrueOrderByIdDesc());
        return gbpreorder;
    }

    private Map<String, List<Map<String, Object>>> parseSwappableOptions(String json) {
        try {
            return objectMapper.readValue(json, new TypeReference<Map<String, List<Map<String, Object>>>>() {});
        } catch (Exception e) {
            e.printStackTrace();
            return Map.of();
        }
    }
}