    /*
    * @Author: WaiHoYu 
    * @Date: 2018-07-16 17:04:31 
    * @Last Modified by:   WaiHoYu 
    * @Last Modified time: 2018-07-16 17:04:311 
    * @Description:     
    */

    var cvs = document.getElementById('cvs')
    cvs.height = 600
    cvs.width = 800
    var ctx = cvs.getContext('2d')  
    var snakeSize = 20
    var cvsGridX = cvs.width / snakeSize
    var cvsGridY = cvs.height / snakeSize
    var length = 0
    var snakeBody = []
    var direct = 2
    var food = {}
    var timer = null
    var direFlag = 0 
    var score = 0
    var maxScore = 0
    function init(){
        snakeBody = []
        direct = 2
        score = 0
        length = 0
        for (let i = 0; i < 3; i++) 
            createSnakeNode(parseInt(cvsGridX / 2) + i, parseInt(cvsGridY / 2))
        drawSnake()
        putFood()
        document.getElementById('maxscore').innerText = localStorage.maxScore ? localStorage.maxScore : localStorage.maxScore = 0
    }
    function createSnakeNode(x, y)
    {
        snakeBody.push({x:x, y: y, color:length === 0 ? '#f00' : '#000'})
        length ++ 
        score ++
        setMaxScore()
        document.getElementById('score').innerText = score - 3
        document.getElementById('maxscore').innerText = localStorage.maxScore
    }
    function setMaxScore (){
        if (parseInt(localStorage.maxScore) < score - 3) {
            localStorage.maxScore = score
            document.getElementById('maxscore').innerText = score
        }
    }
    function drawRect (snakeNode) {
        ctx.beginPath();
        ctx.fillStyle = snakeNode.color
        ctx.fillRect(snakeNode.x * snakeSize, snakeNode.y * snakeSize, snakeSize, snakeSize )
        ctx.strokeStyle =　'#ff0';
        ctx.lineWidth = 4;
        ctx.strokeRect(snakeNode.x * snakeSize, snakeNode.y * snakeSize, snakeSize, snakeSize );
        ctx.closePath()
    }
    function drawSnake () {
        ctx.clearRect(0, 0, cvs.width, cvs.height)
        for (let index = 0; index < snakeBody.length; index++) {
            drawRect(snakeBody[index])     
        }
        drawRect(food)
    }
    function snakeMove(){
        var newSankeHeadNode = {x:snakeBody[0].x,y:snakeBody[0].y}
        if (direct === 1) newSankeHeadNode.y -= 1
        if (direct === -1) newSankeHeadNode.y += 1
        if (direct === 2) newSankeHeadNode.x -= 1
        if (direct === -2) newSankeHeadNode.x += 1
        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i].x = snakeBody[i - 1].x
            snakeBody[i].y = snakeBody[i - 1].y             
            if ((snakeBody[i].x === newSankeHeadNode.x) && (snakeBody[i].y === newSankeHeadNode.y)) {
                gameover()
                return  
            } 
        }        
        snakeBody[0] = newSankeHeadNode
        direFlag = 0
        snakeBody[0].color = '#f00'
        isGetFood(snakeBody[0])
        chkOutOfBorder(snakeBody[0])
        drawSnake()
    }
    function gameover () {
        clearInterval(timer)
        alert("Game Over!!")
        init()
    }
    function chkOutOfBorder (node){
        if (node.x < 0 || node.x > cvsGridX - 1 || node.y < 0 || node.y > cvsGridY - 1) gameover()
    }
    function isGetFood (node) {        
        if (food.x === node.x && node.y === food.y) {
            putFood()
            createSnakeNode(snakeBody[snakeBody.length - 1], snakeBody[snakeBody.length - 1].y)
        }
    }
    document.onkeydown = function (e){
        if (direFlag) return  
        e.preventDefault()
        if(e.keyCode === 38) setDirection(1)
        if(e.keyCode === 40) setDirection(-1)
        if(e.keyCode === 37) setDirection(2)
        if(e.keyCode === 39) setDirection(-2)     
    }
    function setDirection (dir) {
        direFlag = 1
        if (Math.abs(dir) === Math.abs(direct)) 
            return
        direct = dir
    }
    function putFood (){
        var flag = 1        
        while (1) {
            flag = 1
           var  foodX = parseInt(Math.random() * cvsGridX)
           var  foodY = parseInt(Math.random() * cvsGridY)
           for (let index = 0; index < snakeBody.length; index++) {
               if (snakeBody[index].x === foodX && snakeBody[index].y === foodY) {
                flag = 0
               }
           }
           if (flag) break
        }
        food = {x: foodX, y: foodY,color: '#00f'} 
    }
    init()
    time =  setInterval(function () {
        snakeMove()
        drawSnake()
    },200)