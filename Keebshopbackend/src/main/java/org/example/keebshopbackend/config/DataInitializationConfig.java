package org.example.keebshopbackend.config;

import org.example.keebshopbackend.service.ProductDataLoaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class DataInitializationConfig {
    @Autowired
    private ProductDataLoaderService productDataLoaderService;

    @EventListener
    public void onApplicationEvent(ContextRefreshedEvent event) {
        productDataLoaderService.loadInitialData();
    }
}