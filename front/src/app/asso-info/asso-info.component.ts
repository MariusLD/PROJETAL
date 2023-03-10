import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelperService } from '../service/api-helper.service';

@Component({
  selector: 'app-asso-info',
  templateUrl: './asso-info.component.html',
  styleUrls: ['./asso-info.component.css']
})
export class AssoInfoComponent {
  name!: string;
  writingMail: boolean = false;

  subject!: string;
  mailContent!: string;

  listUser: any[] = [];

  constructor(
    private api: ApiHelperService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.api.get({endpoint: '/associations/' + this.route.snapshot.paramMap.get('id')})
      .then(response => {
        this.name = response.name;
        this.listUser = response.users})
      .catch(error => +error.status === 401 ? alert('Token Expired') : console.log('Error'));
  }

  goToUserInfo(id: number): void {
    this.router.navigateByUrl('/user/' + id);
  }

  writeMail(): void {
    this.writingMail = true;
  }

  sendMail(): void {
    this.api.post({endpoint: '/associations/' + this.route.snapshot.paramMap.get('id') + '/mail',
      data: {subject: this.subject, body: this.mailContent}})
      .then(response => {
        this.writingMail = false;
        this.subject = '';
        this.mailContent = '';
      })
      .catch(error => +error.status === 401 ? alert('Token Expired') : console.log('Error'));
  }

  cancelMail(): void {
    this.writingMail = false;
  }
}
