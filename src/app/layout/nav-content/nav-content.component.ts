import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/navigation/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav-content',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './nav-content.component.html',
  styleUrl: './nav-content.component.css'
})
export class NavContentComponent {

}
