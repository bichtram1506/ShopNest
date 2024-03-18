package com.example.ogani.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ogani.entity.Discount;
import com.example.ogani.exception.NotFoundException;
import com.example.ogani.model.request.CreateDiscountRequest;
import com.example.ogani.repository.DiscountRepository;
import com.example.ogani.service.DiscountService;

@Service
public class DiscountServiceImpl implements DiscountService {

    @Autowired
    private DiscountRepository discountRepository;

    @Override
    public List<Discount> getList() {
        return discountRepository.findAll();
    }

  
    @Override
    public Discount getDiscount(long id) {
        Discount discount = discountRepository.findById(id);
        if (discount == null) {
            throw new NotFoundException("Discount not found with id: " + id);
        }
        return discount;
    }
    

    @Override
    public Discount createDiscount(CreateDiscountRequest request) {
        Discount discount = new Discount();
        discount.setCode(request.getCode());
        discount.setName(request.getName());
        discount.setDescription(request.getDescription());
        discount.setUsageCount(0); // Set initial usage count to 0
        discount.setPercentage(request.getPercentage());
        discount.setStartDate(request.getStartDate());
        discount.setEndDate(request.getEndDate());
        discount.setStatus(request.getStatus());
        return discountRepository.save(discount);
    }

    @Override
    public Discount updateDiscount(long id, CreateDiscountRequest request) {
        Discount discount = discountRepository.findById(id);
        if (discount == null) {
            throw new NotFoundException("Discount not found with id: " + id);
        }
    
        // Update the discount properties
        discount.setCode(request.getCode());
        discount.setName(request.getName());
        discount.setDescription(request.getDescription());
        discount.setPercentage(request.getPercentage());
        discount.setStartDate(request.getStartDate());
        discount.setEndDate(request.getEndDate());
        discount.setStatus(request.getStatus());
    
        // Save the updated discount
        return discountRepository.save(discount);
    }
    

    @Override
    public void deleteDiscount(long id) {
        if (!discountRepository.existsById(id)) {
            throw new NotFoundException("Discount not found with id: " + id);
        }
        discountRepository.deleteById(id);
    }
}
