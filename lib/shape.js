function Shape(config) {

    var defaultX = config.defaultX;
    var defaultY = config.defaultY;
    var oldX = defaultX;
    var oldY = defaultY;
    var draggable = false;
    var timer = null;

    config.paint(oldX, oldY);

    this.autoDrop = function () {
        clearTimer();
        timer = setInterval(function () {
            config.clear(oldX, oldY);
            oldY += 1;
            config.paint(oldX, oldY);
        }, 50);
    };

    this.updateOnDrag = function (x, y) {
        if (draggable) {
            config.clear(oldX, oldY);
            config.paint(x, y);
            oldX = x;
            oldY = y;
        }
    };

    this.dragStart = function (x, y) {
        if (config.onTarget(x, y, oldX, oldY)) {
            draggable = true;
        }
    };

    this.restoreOnMove = function () {
        config.paint(oldX, oldY);
    };

    this.onScore = function () {
        clearTimer();
        draggable = false;
        oldX = defaultX;
        oldY = defaultY;
        config.paint(oldX, oldY);
        var randomNumber = Math.random();
        if (0 <= randomNumber && randomNumber < 0.5) {
            this.autoDrop();
        }
    };

    this.isActive = function () {
        return draggable;
    };
    this.endGame = function () {
        clearTimer();
    };

    function clearTimer() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }
}

function CloneObject(originalObi, obj) {
    for (key in originalObi) {
        obj[key] = originalObi[key];
    }
    return obj;
}

function Rectangle() {
    var ctx = canvas.getContext("2d");
    var config = {
        width: 60,
        height: 60,
        color: "red",
        defaultX: 25,
        defaultY: 35
    };

    config.paint = function (x, y) {
        ctx.fillStyle = config.color;
        ctx.fillRect(x, y, config.width, config.height);
    };

    config.clear = function (x, y) {
        ctx.clearRect(x, y, config.width, config.height);
    };

    config.onTarget = function (x, y, oldX, oldY) {
        return x < oldX + config.width && x > oldX && y < oldY + config.height && y > oldY;
    };

    var shape = new Shape(config);
    CloneObject(shape, this);
}

function Circle() {
    var ctx = canvas.getContext("2d");
    var radius = 35;
    var startAngle = 0;
    var endAngle = 2 * Math.PI;
    var config = {
        width: 2 * radius,
        height: 2 * radius,
        color: "blue",
        defaultX: 600,
        defaultY: 60
    };

    config.paint = function (x, y) {
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.fillStyle = config.color;
        ctx.fill();
    }

    config.clear = function (x, y) {
        ctx.clearRect(x - radius, y - radius, config.width, config.height);
    }

    config.onTarget = function (x, y, oldX, oldY) {
        return Math.sqrt((x - oldX) * (x - oldX) + (y - oldY) * (y - oldY)) <= radius;
    }

    var shape = new Shape(config);
    CloneObject(shape, this);
}