import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DiscountService } from 'src/app/_service/discount.service';
import { SelectItem } from 'primeng/api';
@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css'],
  providers: [MessageService],

})

export class DiscountComponent implements OnInit {

  listDiscount: any;

  displayForm: boolean = false;

  deleteForm: boolean = false;

  onUpdate: boolean = false;
  statusOptions: { label: string, value: number }[] = [
    { label: 'Hoạt động', value: 1 },
    { label: 'Khóa', value: 2 }
  ];

  discountForm: any = {
    id: null,
    code: null,
    name: null,
    description: null,
    usageCount: null,
    percentage: null,
    startDate: null,
    endDate: null,
    status: 1 // Default status value
  }

  constructor(private messageService: MessageService, private discountService: DiscountService) { }

  ngOnInit(): void {
    this.getListDiscount();
  }

  getListDiscount() {
    this.discountService.getListDiscounts().subscribe({
      next: res => {
        this.listDiscount = res;
        console.log(res);
      }, error: err => {
        console.log(err);
      }
    })
  }

  showForm() {
    this.onUpdate = false;
    this.discountForm = {
      id: null,
      code: null,
      name: null,
      description: null,
      usageCount: null,
      percentage: null,
      startDate: null,
      endDate: null,
      status: null
    }
    this.displayForm = true;
  }

  onUpdateForm(id: number, code: string, name: string, description: string, usageCount: number, percentage: number, startDate: string, endDate: string, status: string) {
    this.onUpdate = true;
    this.displayForm = true;
    this.discountForm.id = id;
    this.discountForm.code = code;
    this.discountForm.name = name;
    this.discountForm.description = description;
    this.discountForm.usageCount = usageCount;
    this.discountForm.percentage = percentage;
    this.discountForm.startDate = startDate;
    this.discountForm.endDate = endDate;
    this.discountForm.status = status;
  }

  onDelete(id: number, name: string) {
    this.deleteForm = true;
    this.discountForm.id = id;
    this.discountForm.name = name;
  }

  createDiscount() {
    const { code, name, description, usageCount, percentage, startDate, endDate, status } = this.discountForm;
    this.discountService.createDiscount(code, name, description, usageCount, percentage, startDate, endDate, status).subscribe({
      next: res => {
        this.getListDiscount();
        this.showSuccess("Tạo ưu đãi thành công!");
        this.displayForm = false;
      }, error: err => {
        this.showError(err.message);
      }
    })
  }

  updateDiscount() {
    const { id, code, name, description, percentage, startDate, endDate, status } = this.discountForm;
    this.discountService.updateDiscount(id, code, name, description, percentage, startDate, endDate, status).subscribe({
      next: res => {
        this.getListDiscount();
        this.showSuccess("Cập nhật ưu đãi thành công!");
        this.displayForm = false;
      }, error: err => {
        this.showError(err.message);
      }
    })
  }

  deleteDiscount() {
    const { id } = this.discountForm;
    this.discountService.deleteDiscount(id).subscribe({
      next: res => {
        this.getListDiscount();
        this.showWarn("Xóa ưu đãi thành công!!");
        this.deleteForm = false;
      }, error: err => {
        this.showError(err.message);
      }
    })
  }

  showSuccess(text: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: text });
  }
  showError(text: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: text });
  }

  showWarn(text: string) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: text });
  }
}
