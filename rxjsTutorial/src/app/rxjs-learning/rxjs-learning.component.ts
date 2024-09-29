import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from, fromEvent, Observable, of } from 'rxjs';

@Component({
  selector: 'app-rxjs-learning',
  standalone: true,
  imports: [],
  templateUrl: './rxjs-learning.component.html',
  styleUrl: './rxjs-learning.component.scss'
})
export class RxjsLearningComponent implements OnInit, AfterViewInit {
  agents! : Observable<string>;
  agentName! : string;

  // with of operator we can create observable for string, array or object
  students: Observable<string[]> = of(["John", "Doe", "Janise", "Mark"]);

  stdObj = { name : "John", age:12 }
  // industry best practice end observable name with $ sign
  stdObjObs$ : Observable<any> = of(this.stdObj);

  // using from operator array observable
  orders$ : Observable<string> = from(['order1','order2','order3','order4']);

  // from can also be used to create observable from other observable
  oredersFromStudents$ : Observable<string[]> = from(this.students);

  @ViewChild('validate') validateBtn! : ElementRef;

  btnClickObservable$! :Observable<any>;

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


      // subscribing to observalbe created using of operator
      this.students.subscribe(data=>{
        // of array operator emiits entire array at once as data
        console.log("in sub of 'of' array operator");
        console.log(data)
      });

      // subscribing to object based observable created usin of operator
      this.stdObjObs$.subscribe(data=>console.log(data));

      //subbing to orders
      this.orders$.subscribe(data=>{
        // each item of array emitted as seperate data
        console.log("in sub of from array operator!!")
        console.log(data)
      });

      this.oredersFromStudents$.subscribe(data=>{
        console.log("in sub of from observale operator!!")
        console.log(data);
      })


  }

  ngAfterViewInit(): void {
    // binding observable with btn click event
    this.btnClickObservable$ = fromEvent(this.validateBtn?.nativeElement,'click');

    this.btnClickObservable$.subscribe(data=>{
      console.log("this is from the btn click event observable!!!!");
    })
  }

    rxjsObservable() {
        console.log('thi is from btn click event!!');
    }

}
