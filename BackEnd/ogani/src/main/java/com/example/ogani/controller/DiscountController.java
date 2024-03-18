package com.example.ogani.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ogani.entity.Discount;
import com.example.ogani.model.request.CreateDiscountRequest;
import com.example.ogani.model.response.MessageResponse;
import com.example.ogani.service.DiscountService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/discount")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DiscountController {

    @Autowired
    private DiscountService discountService;

    @GetMapping("/")
    @Operation(summary = "Lấy danh sách các mã giảm giá")
    public ResponseEntity<List<Discount>> getList() {
        List<Discount> list = discountService.getList();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy thông tin mã giảm giá bằng ID")
    public ResponseEntity<Discount> getDiscount(@PathVariable long id) {
        Discount discount = discountService.getDiscount(id);
        return ResponseEntity.ok(discount);
    }

    @PostMapping("/create")
    @Operation(summary = "Tạo mới mã giảm giá")
    public ResponseEntity<Discount> createDiscount(@RequestBody CreateDiscountRequest request) {
        Discount discount = discountService.createDiscount(request);
        return ResponseEntity.ok(discount);
    }

    @PutMapping("/update/{id}")
    @Operation(summary = "Cập nhật thông tin mã giảm giá")
    public ResponseEntity<Discount> updateDiscount(@PathVariable long id, @RequestBody CreateDiscountRequest request) {
        Discount discount = discountService.updateDiscount(id, request);
        return ResponseEntity.ok(discount);
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "Xóa mã giảm giá")
    public ResponseEntity<?> deleteDiscount(@PathVariable long id) {
        discountService.deleteDiscount(id);
        return ResponseEntity.ok(new MessageResponse("Discount is deleted"));
    }
}
