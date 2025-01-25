package org.example.keebshopbackend.repository;

import org.example.keebshopbackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findProductsByTypeContaining(String type);

    List<Product> findProductsByTypeContainingAndId(String type, int id);

    List<Product> findProductsById(int id);

    List<Product> findProductByRecentIsTrueOrderByIdDesc();

    List<Product> findProductsByPreorderIsTrueOrderByIdDesc();

    List<Product> findProductsByFeaturedIsTrueOrderByIdDesc();

    List<Product> findProductsByGroupbuyIsTrueOrderByIdDesc();
}
