import { Component, OnInit } from '@angular/core';
import { IClaimList } from 'src/app/interfaces/IClaimList';
import { PrivacyService } from 'src/app/shared/services/privacy.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public claims: string[] = [];

  constructor(private privacyService: PrivacyService) { }

  ngOnInit(): void {
    this.getClaims();
  }

  public getClaims = () =>{
    this.privacyService.getPrivacy()
    .subscribe((res: IClaimList) => {
      this.claims = res.data;
    })
  }

}
