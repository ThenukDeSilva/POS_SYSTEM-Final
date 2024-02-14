package com.ijse.POS.System.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ijse.POS.System.Dto.ProductDto;
import com.ijse.POS.System.Entity.Product;

@Service
public interface ProductService {
    List<Product> getAllProducts();

    Product createProduct(ProductDto productDto);

    Product getProductById(Long id);

    Product updateProduct(Long id, Product product);

    List<Product> findProductByCategory(Long id);
}