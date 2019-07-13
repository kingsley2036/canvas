var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
autoSetCanvasSize(yyy)
listenToMouse(yyy)



// 画圆函数
function drawCircle(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }
  // 画线函数
function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1) //起点
  context.lineWidth = 6
  context.lineTo(x2, y2) //终点
  context.stroke()
  context.closePath()
}

var using = false
var lastPoint = {
    x: undefined,
    y: undefined
  }

// 监听鼠标
function listenToMouse(canvas){
   // 点击
canvas.onmousedown = function(aaa) {
    var x = aaa.clientX
    var y = aaa.clientY
    using = true
    if (eraserEnable) {
      
      context.clearRect(x - 5, y - 5, 10, 10)

    } else {
      

      lastPoint = {
        "x": x,
        "y": y
      }
    }

    //drawCircle(x, y, 3)
  }
  // 移动
canvas.onmousemove = function(aaa) {
    var x = aaa.clientX
    var y = aaa.clientY
    if (eraserEnable) {
      if (using) {
        context.clearRect(x - 5, y - 5, 10, 10)
      }


    } else {
      if (using) {

        var newPoint = {
          "x": x,
          "y": y
        }

        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint

      }

    }

  }
  // 松开
canvas.onmouseup = function(aaa) {
    using = false
  }
}
 
  /******/
var eraserEnable = false
eraser.onclick = function() {
  eraserEnable = true
  actions.className="actions x" 
}
brush.onclick = function(){
  eraserEnable = false
  actions.className="actions" 
}

function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function() {
    setCanvasSize()
  }

  //画板尺寸调节
  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}
