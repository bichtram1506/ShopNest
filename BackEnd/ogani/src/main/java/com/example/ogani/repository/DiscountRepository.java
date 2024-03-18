package com.example.ogani.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ogani.entity.Discount;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Long> {
    
    List<Discount> findAll(); // Lấy danh sách tất cả các mã giảm giá

    Discount findById(long id); // Tìm mã giảm giá bằng ID

    // Tùy chỉnh các truy vấn khác tại đây nếu cần
}
