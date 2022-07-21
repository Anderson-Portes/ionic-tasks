import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  
  categories = ['Work','Personal','Home','School'];

  taskName;
  taskDate;
  taskPriority;
  taskCategory;
  taskObject;

  @Input() task;
  constructor(private modalCtrl:ModalController, private storageService:TodoService) { }

  ngOnInit() {
    this.taskName = this.task.value.itemName;
    this.taskDate = this.task.value.itemDueDate;
    this.taskPriority = this.task.value.itemPriority;
    this.taskCategory = this.task.value.itemCategory;
  }

  async updateTask(){
    this.taskObject = {
      itemName: this.taskName, 
      itemDueDate:this.taskDate, 
      itemPriority: this.taskPriority, 
      itemCategory: this.taskCategory
    }
    let uid = this.task.key;
    await this.storageService.updateTask(uid, this.taskObject);
    this.dismis();
  }

  async dismis(){
    await this.modalCtrl.dismiss();
  }

   selectedCategory(index){
    this.taskCategory = this.categories[index];
  }
}
