function Shape(config) {
    var ctx = config.ctx;
    var width = config.width;
    var height = config.height;
    var defaultX = config.defaultX;
    var defaultY = config.defaultY;
    var color = config.color;

    var _x = defaultX;
    var _y = defaultY;
    var draggable = false;
    var timer = null;

    config.paint(_x, _y);

    this.autoDrop = function () {
        clearTimer();
        timer = setInterval(function () {
            config.clear(_x, _y);
            _y += 1;
            config.paint(_x, _y);
        }, 50);
    };

    this.updateOnDrag = function (x, y) {
        if (draggable) {
            config.clear(_x, _y);
            config.paint(x, y);
            _x = x;
            _y = y;
        }
    };

    this.dragStart = function (x, y) {
        if (config.onTarget(x, y, _x, _y)) {
            draggable = true;
        }
    };

    this.restoreOnMove = function (sx, sy) {
        config.paint(_x, _y);
    };

    this.onScore = function (x, y) {
        clearTimer();
        draggable = false;
        _x = defaultX;
        _y = defaultY;
        config.paint(_x, _y);
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

function CloneObject(shape, obj) {
    for (key in shape) {
        var value = shape[key];
        obj[key] = shape[key];
    }
    return obj;
}

function Rectangle() {
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
    config.onTarget = function (x, y, _x, _y) {
        return x < _x + config.width && x > _x && y < _y + config.height && y > _y;
    };

    var shape = new Shape(config);
    CloneObject(shape, this);
}

function Circle() {
    var radius = 35;
    var color = "blue";
    var defaultX = 600;
    var defaultY = 60;
    var draggable = false;
    var width = 2 * radius;
    var height = 2 * radius;
    var startAngle = 0;
    var endAngle = 2 * Math.PI;

    var config = {
        width: width,
        height: height,
        color: color,
        defaultX: defaultX,
        defaultY: defaultY
    };
    config.paint = function (x, y) {
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.fillStyle = color;
        ctx.fill();
    };
    config.clear = function (x, y) {
        ctx.clearRect(x - radius, y - radius, width, height);
    };
    config.onTarget = function (x, y, _x, _y) {
        return Math.sqrt((x - _x) * (x - _x) + (y - _y) * (y - _y)) <= radius;
    };
    var shape = new Shape(config);
    CloneObject(shape, this);
}