package com.ijse.POS.System.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ijse.POS.System.Dto.OrderDto;
import com.ijse.POS.System.Entity.Order;
import com.ijse.POS.System.Service.OrderService;

@RestController
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders(){
        return ResponseEntity.status(200).body(orderService.getAllOrders());
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<List<Order>> getOrderById(@PathVariable Long id){
        return ResponseEntity.status(200).body(orderService.getAllOrders());
    }

    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody OrderDto orderDto) {
        Order newOrder = orderService.createOrder(orderDto);

        return ResponseEntity.status(201).body(newOrder);
    }
}
