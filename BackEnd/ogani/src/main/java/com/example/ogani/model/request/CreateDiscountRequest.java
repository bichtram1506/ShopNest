package com.example.ogani.model.request;

import java.time.LocalDate; // Import LocalDate class

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateDiscountRequest {
    
    @NotNull(message = "Mã giảm giá không được để trống")
    @NotEmpty(message = "Mã giảm giá không được để trống")
    @Size(min = 3, max = 50, message = "Mã giảm giá phải có độ dài từ 3 đến 50 ký tự")
    private String code;
    
    @NotNull(message = "Tên giảm giá không được để trống")
    @NotEmpty(message = "Tên giảm giá không được để trống")
    @Size(min = 3, max = 255, message = "Tên giảm giá phải có độ dài từ 3 đến 255 ký tự")
    private String name;

    private String description;

    @NotNull(message = "Số lần sử dụng không được để trống")
    @Min(value = 0, message = "Số lần sử dụng không được nhỏ hơn 0")
    private int usageCount;

    @NotNull(message = "Phần trăm giảm giá không được để trống")
    @Min(value = 0, message = "Phần trăm giảm giá không được nhỏ hơn 0")
    private int percentage;

    @NotNull(message = "Ngày bắt đầu không được để trống")
    private LocalDate startDate; // Use LocalDate instead of Date

    @NotNull(message = "Ngày kết thúc không được để trống")
    private LocalDate endDate; // Use LocalDate instead of Date

    private String status;

}
