package com.ijse.POS.System.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ijse.POS.System.Dto.ProductDto;
import com.ijse.POS.System.Entity.Category;
import com.ijse.POS.System.Entity.Product;
import com.ijse.POS.System.Repository.CategoryRepository;
import com.ijse.POS.System.Repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService{
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product createProduct(ProductDto productDTO) {
        Category category = categoryRepository.findById(productDTO.getCategoryId()).orElse(null);

        if (category != null) {
            Product product = new Product();
            product.setName(productDTO.getName());
            product.setPrice(productDTO.getPrice());
            product.setQty(productDTO.getQty());
            product.setCategory(category);

            return productRepository.save(product);

        } else {
            return null;
        }
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public Product updateProduct(Long id, Product product) {
        Product existingProduct = productRepository.findById(id).orElse(null);

        if (existingProduct != null) {
            existingProduct.setName(product.getName());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setQty(product.getQty());
            existingProduct.setCategory(product.getCategory());

            return productRepository.save(existingProduct);
        } else {
            return null;
        }
    }

    @Override
    public List<Product> findProductByCategory(Long id) {
        Category category = categoryRepository.findById(id).orElse(null);

        if (category != null) {
            return productRepository.findProductByCategory(category);
        } else {
            return null;
        }
    }
}
