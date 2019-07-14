var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
autoSetCanvasSize(yyy)
listenToUser(yyy)
var lineWidth = 5

//清屏
clear.onclick=function(){
  context.clearRect (0, 0, yyy.width, yyy.height)
}
//保存
save.onclick=function(){
  var url=yyy.toDataURL("image/png")
  var a=document.createElement('a')
  document.body.appendChild(a)
  a.href=url
  a.download='我的创作'
  a.target='_blank'
  a.click()
}

//切换颜色
red.onclick = function () {
  context.strokeStyle = 'red'
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
green.onclick = function () {
  context.strokeStyle = 'green';
  green.classList.add('active')
  red.classList.remove('active')
  blue.classList.remove('active')
}
blue.onclick = function () {
  context.strokeStyle = 'blue';
  blue.classList.add('active')
  green.classList.remove('active')
  red.classList.remove('active')
}
//切换画笔粗细
thin.onclick = function () {
  lineWidth = 5
}
thick.onclick = function () {
  lineWidth = 10
}
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
  context.lineWidth = lineWidth
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
function listenToUser(canvas) {
  // 特性检测
  if (document.body.ontouchstart !== undefined) {
    //触屏设备
    canvas.ontouchstart = function (aaa) {
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      console.log(x, y)
      using = true
      if (eraserEnable) {

        context.clearRect(x - 5, y - 5, 10, 10)

      } else {


        lastPoint = {
          "x": x,
          "y": y
        }
      }

    }
    canvas.ontouchmove = function (aaa) {
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
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
    canvas.ontouchend = function (aaa) {
      using = false
    }
  } else {

    //非触屏设备
    // 点击
    canvas.onmousedown = function (aaa) {
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
    canvas.onmousemove = function (aaa) {
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
    canvas.onmouseup = function (aaa) {
      using = false
    }
  }



}

/******/
var eraserEnable = false
brush.onclick = function () {
  eraserEnable = false;
  brush.classList.add('active')
  eraser.classList.remove('active')
}

eraser.onclick = function () {
  eraserEnable = true;
  eraser.classList.add('active')
  brush.classList.remove('active')
}


function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function () {
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
