package com.example.ogani.service;

import java.util.List;

import com.example.ogani.entity.Discount;
import com.example.ogani.model.request.CreateDiscountRequest;

public interface DiscountService {
    
    List<Discount> getList();

    Discount getDiscount(long id);

    Discount createDiscount(CreateDiscountRequest request);

    Discount updateDiscount(long id, CreateDiscountRequest request);

    void deleteDiscount(long id);

}
