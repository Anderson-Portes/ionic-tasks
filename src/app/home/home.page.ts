import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { TodoService } from '../services/todo.service';
import { UpdateTaskPage } from '../update-task/update-task.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  todoList = [];

  today: number = Date.now();

  constructor(public modalCtrl:ModalController, private storageService:TodoService) {
    this.getAllTasks();
  }

  async addTask(){
    const modal = await this.modalCtrl.create({
      component: AddNewTaskPage
    });
    modal.onDidDismiss().then(() => this.getAllTasks());
    return await modal.present();
  }

  deleteTask(key){
    this.storageService.deleteTask(key);
    this.getAllTasks();
  }

  getAllTasks(){
    this.todoList = this.storageService.getAllTasks();
  }

  async updateTask(selectedTask){
    const modal = await this.modalCtrl.create({
      component:UpdateTaskPage,
      componentProps: { task:selectedTask }
    });
    modal.onDidDismiss().then(() => this.getAllTasks());
    return await modal.present();
  }
}
