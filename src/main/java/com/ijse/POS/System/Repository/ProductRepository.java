package com.ijse.POS.System.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ijse.POS.System.Entity.Category;
import com.ijse.POS.System.Entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findProductByCategory(Category category);
    
}
