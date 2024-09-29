import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs-learning',
  standalone: true,
  imports: [],
  templateUrl: './rxjs-learning.component.html',
  styleUrl: './rxjs-learning.component.scss'
})
export class RxjsLearningComponent implements OnInit {
  agents! : Observable<string>;
  agentName! : string;

  constructor(){}

  ngOnInit(): void {
    // creating observable object , takes arraow function gives observer as argument
    // this observer can be used to emit first/initial value of the observable to all subscribers
      this.agents = new Observable((observer)=>{
          let count = 0;
          try{
            observer.next("Janise");
            observer.next("Doe");
            setInterval(()=>{
              observer.next("John "+(count++));
            },2000);
          }catch(e){
            observer.error(e);
          }
      });

      this.agents.subscribe((data)=>{
        this.agentName = data; // in dom it would have got updated with the last value that is emitted
        console.log("Hey "+data); // in console we can observe all the logs with all values
      })// this will get call asmany times as the observable emits the value
  }

}
