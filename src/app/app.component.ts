import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Field {
  ID?: string;
  Type: string;
  Text?: string;
  Placeholder?: string;
  Title?: string;
  AlertMessage?: string;
}

interface FormConfig {
  Title: string;
  Subtitle: string;
  Fields: Field[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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
          { 
            ID: 'hello-button', 
            Type: 'Button', 
            Title: 'Say hi', 
            AlertMessage: 'Hello ${person-name}' 
          }
    ]
  };

  formData: { [key: string]: string } = {};

  ngOnInit() {
    this.config.Fields.forEach(field => {
      if (field.Type === 'Text' && field.ID) {
        this.formData[field.ID] = '';
      }
    });
  }

  showAlert(alertMessage: string) {
    let message = alertMessage;
    for (const id in this.formData) {
      message = message.replace(`\${${id}}`, this.formData[id] || '');
    }
    alert(message);
  }
}