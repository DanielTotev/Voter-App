import { Component } from '@angular/core';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent {

  constructor(private categoryService: CategoryService, private router: Router) { }

  create(userInput) {
    let title = userInput['title'];
    this.categoryService.create(title).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
