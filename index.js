let buttonElems = document.querySelectorAll('button');
const inputText = document.getElementById('editText');
const canvas = document.getElementById("canvas");
let contextRect = canvas.getContext("2d");
let contextTriangle = canvas.getContext("2d");
let contextCircle = canvas.getContext("2d"); 

window.onload = function() { 
    
    canvas.onclick = canvasClick;
}
let nomerRect;
let nomerTriangle;
let nomerCircle;

let circles = [];
let rects = [];
let triangles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

function Rect(x, y, long, color) {
    this.x = x;
    this.y = y;
    this.long = long;
    this.color = color;
    this.isSelected = false;
    this.countClick = 0;
}

function Triangle(x, y, long, color) {
    this.x = x;
    this.y = y;
    this.long = long;
    this.color = color;
    this.isSelected = false;
    this.countClick = 0;
}

function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.isSelected = false;
    this.countClick = 0;
}

function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  function addRandomRect(count) {
    for(let i=0;i<count;i++){
    let long = randomFromTo(10, 150);
    let x = randomFromTo(0, canvas.width);
    let y = randomFromTo(0, canvas.height);
    let color = "red";

    // Создаем новый квадрат
    let rect = new Rect(x, y, long, color);
    rects.push(rect);
    }
    drawFigure();
}

function addRandomTriangle(count) {
    for(let i=0;i<count;i++){
    let long = randomFromTo(10, 150);
    let x = randomFromTo(0, canvas.width);
    let y = randomFromTo(0, canvas.height);
    let color = "blue";

    // Создаем новый треугольник
    let triangle = new Triangle(x, y, long, color);
    triangles.push(triangle);
    }
    drawFigure();
}

function addRandomCircle(count) {
    for(let i=0;i<count;i++){
    let radius = randomFromTo(10, 150);
    let x = randomFromTo(0, canvas.width);
    let y = randomFromTo(0, canvas.height);
    let color = "green";

    // Создаем новый круг
    let circle = new Circle(x, y, radius, color);
    circles.push(circle);
    }
    drawFigure();

}

function drawFigure() {
    contextRect.clearRect(0, 0, canvas.width, canvas.height);
    contextTriangle.clearRect(0, 0, canvas.width, canvas.height);
    contextCircle.clearRect(0, 0, canvas.width, canvas.height);
    drawRects();
    drawTriangle();
    drawCircles();
}

function drawRects() {

    for(var i=0; i<rects.length; i++) {
        var rect = rects[i];
        contextRect.globalAlpha = 0.8;
        contextRect.beginPath();
        contextRect.rect(rect.x, rect.y, rect.long, rect.long);
        contextRect.fillStyle = rect.color;
        contextRect.strokeStyle = "black";

        if (rect.isSelected) {
            contextRect.fillStyle='yellow';
        }
        else {
            rect.countClick=0;
            contextRect.lineWidth = 1;
        }
        contextRect.fill();
        contextRect.stroke(); 
    }
}

function drawTriangle() {

    for(var i=0; i<triangles.length; i++) {
        var triangle = triangles[i];
        contextTriangle.globalAlpha = 0.8;
        contextTriangle.beginPath();
        let a = Math.sqrt(3)*triangle.long / 6;
        let r = triangle.long / Math.sqrt(3);
        contextTriangle.moveTo(triangle.x - triangle.long /2, triangle.y + a);
        contextTriangle.lineTo(triangle.x + triangle.long /2, triangle.y + a);
        contextTriangle.lineTo(triangle.x, triangle.y - r);
        contextTriangle.fillStyle = triangle.color;
        contextTriangle.strokeStyle = "black";

        if (triangle.isSelected) {
            contextRect.fillStyle='yellow';
        }
        else {
            triangle.countClick=0;
            contextTriangle.lineWidth = 1;
        }
        contextTriangle.fill();
        contextTriangle.stroke(); 
    }
}

function drawCircles() {

    for(var i=0; i<circles.length; i++) {
        var circle = circles[i];
        contextCircle.globalAlpha = 0.8;
        contextCircle.beginPath();
        contextCircle.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2);
        contextCircle.fillStyle = circle.color;
        contextCircle.strokeStyle = "black";

        if (circle.isSelected) {
            contextCircle.fillStyle='yellow';
        }
        else {
            circle.countClick = 0;
            contextCircle.lineWidth = 1;
        }
        contextCircle.fill();
        contextCircle.stroke(); 
    }
}

var previousSelectedRect;
var previousSelectedTriangle;
var previousSelectedCircle;

function canvasClick(e) {
  var clickX = e.pageX - canvas.offsetLeft;
  var clickY = e.pageY - canvas.offsetTop;

  for(var i=rects.length-1; i>=0; i--) {
    var rect = rects[i];

    var distanceFromCenter = Math.sqrt(Math.pow(rect.x - clickX, 2) + Math.pow(rect.y - clickY, 2));
	
    if (distanceFromCenter <= rect.long) {
      if (previousSelectedRect != null) previousSelectedRect.isSelected = false;
      if(nomerCircle != null) circles[nomerCircle].isSelected = false; nomerCircle = null;
      if(nomerTriangle != null) triangles[nomerTriangle].isSelected = false; nomerTriangle = null;
      nomerRect = i;
      previousSelectedRect = rect;
      rect.countClick++;
      rect.isSelected = true;
      if(rect.countClick >= 2){
        rect.countClick = 0;
      rects.splice(nomerRect,1);
      }
      drawFigure();
	  
      return;
    }
  }

  for(var i=triangles.length-1; i>=0; i--) {
    var triangle = triangles[i];

    var distanceFromCenter = Math.sqrt(Math.pow(triangle.x - clickX, 2) + Math.pow(triangle.y - clickY, 2));
	
    if (distanceFromCenter <= triangle.long / Math.sqrt(3)) {
      if (previousSelectedTriangle != null) previousSelectedTriangle.isSelected = false;
      if(nomerCircle != null) circles[nomerCircle].isSelected = false; nomerCircle = null;
      if(nomerRect != null) rects[nomerRect].isSelected = false; nomerRect = null;

      nomerTriangle = i;
      previousSelectedTriangle = triangle;
      triangle.countClick++;
      triangle.isSelected = true;
      if(triangle.countClick >= 2){
        triangle.countClick = 0;
      triangles.splice(nomerTriangle,1);
      }
      drawFigure();
	  
      return;
    }
  }

  for(var i=circles.length-1; i>=0; i--) {
    var circle = circles[i];

    var distanceFromCenter = Math.sqrt(Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2));
	
    if (distanceFromCenter <= circle.radius) {
      if (previousSelectedCircle != null) previousSelectedCircle.isSelected = false;
      if(nomerRect != null) rects[nomerRect].isSelected = false; nomerRect = null;
      if(nomerTriangle != null) triangles[nomerTriangle].isSelected = false; nomerTriangle = null;
      nomerCircle = i;
      previousSelectedCircle = circle;
      circle.countClick++;
      circle.isSelected = true;

      if(circle.countClick >= 2)
      {
        circle.countClick = 0;
        circles.splice(nomerCircle,1);
      }
      drawFigure();
	  
      return;
    }
  }
} 
buttonElems.forEach((el) => {
    el.setAttribute('title', `Построить фигуру`);
    el.addEventListener('click', () => {
        switch(Array.from(buttonElems).indexOf(el)){
            case 0:
                {
                    addRandomRect(parseInt(inputText.value)); 
                }
                break;
            case 1:
                {
                    addRandomTriangle(parseInt(inputText.value)); 
                }
                break;
            case 2:
                {
                    addRandomCircle(parseInt(inputText.value));
                }
                break;
                default:
                  break;
                
        }
    });
})
