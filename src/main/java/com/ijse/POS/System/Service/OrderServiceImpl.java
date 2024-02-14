package com.ijse.POS.System.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ijse.POS.System.Dto.OrderDto;
import com.ijse.POS.System.Entity.Order;
import com.ijse.POS.System.Entity.Product;
import com.ijse.POS.System.Repository.OrderRepository;
import com.ijse.POS.System.Repository.ProductRepository;

@Service
public class OrderServiceImpl implements OrderService{
    
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }

    @Override
    public Order createOrder(OrderDto orderDto){

        Order order = new Order();

        List<Long> products=orderDto.getProducts();

        Set<Product> productsSet = new HashSet<>();

        order.setTotal(0.0);

        for(Long productId : products){
            Product product=productRepository.findById(productId).orElse(null);

            if(product != null && product.getQty() != 0){
                productsSet.add(product);
                order.setTotal(order.getTotal()+product.getPrice());

               // product.setQty(product.getQty()-1);
            }
        }
        
        Double tax=(order.getTotal()/100*15);

        order.setTax(tax);
        order.setOrderTime(LocalDateTime.now());
        order.setProducts(productsSet);

        return orderRepository.save(order);
    }

    @Override
    public Order getOrderById(Long id){
        return orderRepository.findById(id).orElse(null);
    }
}
