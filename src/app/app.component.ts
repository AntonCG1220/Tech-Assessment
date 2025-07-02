import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Field {
  ID?: string;
  Type: string;
  Text?: string;
  Placeholder?: string;
  Title?: string;
  AlertMessage?: string;
  VisibleCondition?: {
    ID: string;
    Operator: string;
    Value: string;
  }
}

interface FormConfig {
  Title: string;
  Subtitle: string;
  Fields: Field[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  config: FormConfig = {
    Title: 'Tech Assessment',
    Subtitle: 'Anton Christopher Garcia',
    Fields: [
      { Type: 'H1',
         Text: 'Person name'
         },
          { ID: 'person-name', 
            Type: 'Text',
            Placeholder: 'John Smith'
          },
            { ID: 'hello-button',
              Type: 'Button', 
              Title: 'Say hi', 
              AlertMessage: 'Hello ${person-name}',
              VisibleCondition: { ID: 'person-name', Operator: 'Equals', Value: 'peter' }
            }
          ]
        };

  formGroup = new FormGroup<Record<string, FormControl<string | null>>>({});

  constructor() {
    this.config.Fields.forEach(field => {
      if (field.Type === 'Text' && field.ID) {
        this.formGroup.addControl(field.ID, new FormControl(''));
      }
    });
  }

  showAlert(alertMessage: string) {
    let message = alertMessage;
    for (const id of Object.keys(this.formGroup.value)) {
      message = message.replace(`\${${id}}`, this.formGroup.value[id] || '');
    }
    alert(message);
  }

  isButtonVisible(): boolean {
    const personName = this.formGroup.get('person-name')?.value || '';
    return personName.toLocaleLowerCase() === 'peter';
  }
}