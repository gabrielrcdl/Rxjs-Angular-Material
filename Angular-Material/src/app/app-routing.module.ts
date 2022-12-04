import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonsIconsComponent } from './buttons-icons/buttons-icons.component';
import { FormFieldInputComponent } from './form-field-input/form-field-input.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';

const routes: Routes = [
  {
    path: 'buttonicon',
    component: ButtonsIconsComponent,
  },
  {
    path: 'formfieldinput',
    component: FormFieldInputComponent,
  },
  {
    path: 'progressspinner',
    component: ProgressSpinnerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
