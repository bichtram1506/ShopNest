import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faHeart, faPhone, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api'; // Thêm MessageService
import { Order } from 'src/app/_class/order';
import { OrderDetail } from 'src/app/_class/order-detail';

import { CartService } from 'src/app/_service/cart.service';
import { OrderService } from 'src/app/_service/order.service';
import { StorageService } from 'src/app/_service/storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [MessageService]
})
export class CheckoutComponent implements OnInit {
  heart = faHeart;
  bag = faShoppingBag;
  phone = faPhone;
  bars = faBars;
  showDepartment = false;
  order = new Order();
  listOrderDetail: any[] =[];
  username !: string;

  orderForm :any ={
    firstname: null,
    lastname : null,
    country : null,
    addrest : null,
    town : null,
    state : null,
    postCode: null,
    email: null,
    phone: null,
    note: null
  }

  constructor(public cartService: CartService,
              private orderService: OrderService,
              private storageService: StorageService,
              private router: Router,
              private messageService: MessageService) { // Inject MessageService vào constructor
  }

  ngOnInit(): void {
    this.username = this.storageService.getUser().username;
    this.cartService.getItems();
    console.log(this.username);
  }

  showDepartmentClick(){
    this.showDepartment = !this.showDepartment;
  }

  placeOrder(){
    this.cartService.items.forEach(res =>{
      let orderDetail : OrderDetail = new OrderDetail;
      orderDetail.name = res.name;
      orderDetail.price = res.price;
      orderDetail.quantity = res.quantity;
      orderDetail.subTotal = res.subTotal;
      this.listOrderDetail.push(orderDetail);
    })

    const {firstname,lastname,country,address,town,state,postCcode,phone,email,note} = this.orderForm;
    this.orderService.placeOrder(firstname,lastname,country,address,town,state,postCcode,phone,email,note,this.listOrderDetail,this.username).subscribe({
      next: res =>{
        this.cartService.clearCart();
        // Hiển thị thông báo đặt hàng thành công
        this.messageService.add({severity:'success', summary:'Order Placed', detail:'Your order has been placed successfully.'});
        // Sau khi đặt hàng thành công, chuyển hướng đến trang chủ
        this.router.navigate(['/']); // Thay đổi '/home' thành đường dẫn thích hợp của trang chủ của bạn
      },error: err=>{
        console.log(err);
      }
    })
  }
}
