function ShapeContainer(config) {

    this.outScore = 0;

    config.paint();

    this.restoreOnMove = function () {
        config.paint();
    }

    var updateScore = function () {
        document.getElementById("scoreBoard").innerHTML = rectangleContainer.outScore + circleContainer.outScore;
    }

    this.getScore = function (sx, sy) {
        if (config.isOnScoreBoard(sx, sy)) {
            config.score += 1;
            config.onScoreAndClear();
            config.paint();
            this.outScore = config.score;
            updateScore();
        }
    }
}

function RectangleContainer() {
    var radiusX = 60;
    var radiusY = 30;
    var h = 70;
    var rightBoundaryWidth = 0;
    var leftBoundaryWidth = 45;
    var topBoundaryHeight = 20;
    var bottomBoundaryHeight = 10;
    var rotation = 0;
    var config = {
        x: 200,
        y: 350,
        width: 2 * radiusX,
        height: 3.5 * radiusY,
        startAngle: 0,
        endAngle: 2 * Math.PI,
        score: 0,
        totalScore: 0,
    };

    config.isOnScoreBoard = function (sx, sy) {
        return sx < config.x + rightBoundaryWidth && sx > config.x - leftBoundaryWidth &&
            sy < config.y + bottomBoundaryHeight && sy > config.y - topBoundaryHeight && recPiece.isActive();
    }


    config.onScoreAndClear = function () {
        recPiece.onScore();
        ctx.clearRect(config.x - radiusX, config.y - radiusY, config.width, config.height);
    }

    config.paint = function () {
        var text = " " + config.score;
        var fontHeight = 30;
        var color = "black";
        var textX = 180;
        var textY = 370;

        ctx.beginPath();
        ctx.ellipse(config.x, config.y, radiusX, radiusY, rotation, config.startAngle, config.endAngle);
        ctx.moveTo((config.x - radiusX), config.y);
        ctx.lineTo((config.x - radiusX), (config.y + h));
        ctx.lineTo((config.x + radiusX), (config.y + h));
        ctx.lineTo((config.x + radiusX), config.y);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "orange";
        ctx.stroke();
        ctx.font = fontHeight + "px Arial";
        ctx.fillStyle = color;
        ctx.fillText(text, textX, textY);
    }

    var shapeContainer = new ShapeContainer(config);
    CloneObject(shapeContainer, this);
}

function CircleContainer() {
    var radius = 50;
    var scoreRadius = 10;
    var config = {
        x: 450,
        y: 370,
        width: 2 * radius,
        height: 2 * radius,
        startAngle: 0,
        endAngle: 2 * Math.PI,
        score: 0,
    };

    config.isOnScoreBoard = function (sx, sy) {
        return Math.sqrt((sx - config.x) * (sx - config.x) + (sy - config.y) * (sy - config.y)) < scoreRadius &&
            cirPiece.isActive();
    }

    config.onScoreAndClear = function () {
        cirPiece.onScore();
        ctx.clearRect(config.x - radius, config.y - radius, config.width, config.height);
    }

    config.paint = function () {
        var text = " " + config.score;
        var fontHeight = 30;
        var color = "black";
        var textX = 435;
        var textY = 370;
        ctx.beginPath();
        ctx.arc(config.x, config.y, radius, config.startAngle, config.endAngle);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "orange";
        ctx.stroke();
        ctx.font = fontHeight + "px Arial";
        ctx.fillStyle = color;
        ctx.fillText(text, textX, textY);
    }

    var shapeContainer = new ShapeContainer(config);
    CloneObject(shapeContainer, this);
}
