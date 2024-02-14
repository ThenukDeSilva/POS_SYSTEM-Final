package com.ijse.POS.System.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ijse.POS.System.Dto.OrderDto;
import com.ijse.POS.System.Entity.Order;

@Service
public interface OrderService {
    List<Order>getAllOrders();
    Order getOrderById(Long id);
    Order createOrder(OrderDto orderDto);
}
