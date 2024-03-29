package com.ijse.POS.System.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ijse.POS.System.Dto.ProductDto;
import com.ijse.POS.System.Entity.Product;
import com.ijse.POS.System.Service.ProductService;

@RestController
@CrossOrigin(origins = "*")
public class ProductController {
     @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.status(200).body(productService.getAllProducts());
    }

    @PostMapping("/addproducts")
    public ResponseEntity<?> createProduct(@RequestBody ProductDto productDto) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(productDto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create the Product");
        }
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);

        if (product != null) {
            return ResponseEntity.status(HttpStatus.OK).body(product);
            // return product with 200 success code
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            // return 404 Error
        }
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {

        return productService.updateProduct(id, product);
    }

    @GetMapping("/categories/{id}/products")
    public ResponseEntity<List<Product>> findProductByCategory(@PathVariable Long id) {
        return ResponseEntity.ok().body(productService.findProductByCategory(id));
    }
}
