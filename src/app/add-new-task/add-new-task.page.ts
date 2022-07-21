import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {

  categories = ['Work','Personal','Home','School'];


  taskName;
  taskDate;
  taskPriority;
  taskCategory;

  taskObject;

  constructor(public modalCtrl:ModalController, private storageService:TodoService) { }

  ngOnInit() {
  }

  async dismis(){
    await this.modalCtrl.dismiss(this.taskObject);
  }

  selectedCategory(index){
    this.taskCategory = this.categories[index];
  }

  async AddTask(){
    this.taskObject = {
      itemName: this.taskName, 
      itemDueDate:this.taskDate, 
      itemPriority: this.taskPriority, 
      itemCategory: this.taskCategory
    }

    let uid = this.taskName + this.taskDate;
    if(uid)
      await this.storageService.addTask(uid, this.taskObject);
    
      this.dismis();
  }
}
