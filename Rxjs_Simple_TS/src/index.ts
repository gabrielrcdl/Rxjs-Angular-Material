import { Observable } from "rxjs";
import { fromEvent } from "rxjs";
import { delay, filter, map, retry, retryWhen, scan, switchMap, takeWhile } from "rxjs/operators";

/*

----FUNCIONAMENTO DE OBSERVABLE E SEUS OPERADORES----
  

let numbers = [1, 5, 10, 15, 20, 25];

let source = new Observable((subscriber) => {
 let index = 0
 let productValue  = () => {
  subscriber.next(numbers[index ++])

  if(index < numbers.length){
    setTimeout(productValue, 1000)
  }
  else{
    subscriber.complete()
  }
 }
   productValue()
   
})


// Passa por um tubo e faz um mapeamento de cada número
source.pipe(
  map((n: number) => n*2)

).subscribe({
  next:(x: number) => console.log(x),
  error:(e: Error) => console.log(e),
  complete:() => console.log('Completed')

})


// Passa por um tubo e faz um filtro de cada número
source.pipe(
  filter((n: number) => n > 5)

).subscribe({
  next:(x: number) => console.log(` filter ${x}`),
  error:(e: Error) => console.log(e),
  complete:() => console.log('Completed')

})


*/

// interface IMouseTrack  {
//   x: number;
//   y: number;
// }

// let circle = document.getElementById('circle')  ;

// let source = fromEvent(document, 'mousemove').pipe(
//   map((e: MouseEvent) =>{
//       return{x: e.clientX, y: e.clientY}
//   }),
//   filter((value: IMouseTrack) => value.x < 500)
// )

// function onNext(value: IMouseTrack){
//     console.log(value)
//     circle.style.left = `${value.x}px`
//     circle.style.top =  `${value.y}px`
// }

// source.subscribe({
//   next: (value: IMouseTrack) => onNext(value),
//   error: (error: Error) => console.log(error),
//   complete: () => console.log('Completed !')
// })

interface IMovie {
  title: string;
}

let button = document.getElementById("button");
let output = document.getElementById("output");





// Observable
let click = fromEvent(button, "click");

function load(url: string): Observable<any> {
  return new Observable((subscriber) => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {

      if(xhr.status === 200){
      let movies = JSON.parse(xhr.responseText);
      let data = JSON.parse(xhr.responseText)
      subscriber.next(data),
      subscriber.complete()

      }
      else{
          subscriber.error(xhr.statusText)
      }

    });

    xhr.open("GET", url);
    xhr.send();

  }).pipe(
    //retryWhen(retryStrategy())
    retry({count: 3, delay: 1000})
  )
}
  function retryStrategy({attempt = 3, timeDelay =1000}){
    return (erros: Observable<any>) => {
      return erros.pipe(
        scan((acc, value) =>{
          return acc + 1
        }, 0),
        takeWhile(acc => acc < attempt),
        delay(timeDelay)
      )
    }
  }






function renderMovie(movies: IMovie[]) {
  movies.forEach((movie: IMovie) => {
    let div = document.createElement("div");
    div.innerText = movie.title;
    output.appendChild(div);
  });
}

click.pipe(switchMap(() => load("../movies.json"))).subscribe({
  next: renderMovie,
  error: (error: Error) => console.log(error),
  complete: () => console.log("Completed !"),
});
