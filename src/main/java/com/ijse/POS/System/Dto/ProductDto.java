package com.ijse.POS.System.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDto {
    
    private String name;
    private Integer qty;
    private Double price;
    private Long categoryId;
}
