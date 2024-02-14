package com.ijse.POS.System.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ijse.POS.System.Entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long>{
    
}
