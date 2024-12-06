n = document.body.children[0];
with (n) {
    c = getContext('2d');
    width = w = 720;
    height = h = 480;
    g = X = Y = x = y = i = o = 0;
    z = 65;
    d = function (a, b, c, d) {
        return ((a - c) * (a - c) + (b - d) * (b - d))
    };
    onmousedown = function (e) {
        if (d(X, Y, x, y) < w) {
            g = 1;
            style.cursor = "se-resize"
        }
        r()
    };
    onmouseup = function (e) {
        style.cursor = "default";
        g = 0;
        if (d(w / 3, h / 3, x, y) > 83200) {
            x = y = 0;
            z++;
            v()
        }
    }
}
onmousemove = function (e) {
    X = e.pageX + .1;
    Y = e.pageY + .1
};
b = function () {
    if (g) {
        x = X;
        y = Y;
        if (x < 0) x = .1;
        if (y < 0) y = .1
    } else {
        x = x * .9 + 3;
        y = y * .9 + 6
    }
    r()
};
with (c) {
    r = function () {
        font = "bold 140px sans-serif";
        textAlign = "center";
        save();
        clearRect(0, 0, w, h);
        p(i, z + 1, 0);
        beginPath();
        moveTo(y * y / 2 / x + x / 2, 0);
        lineTo(w * 2, 0);
        lineTo(0, h * 2);
        lineTo(0, x * x / 2 / y + y / 2);
        clip();
        p(o, z, 0);
        translate(x, y);
        rotate(Math.atan2(y, x) * 2);
        scale(-1, 1);
        p(o, z, 1);
        restore()
    };
    p = function (s, l, b) {
        fillStyle = "#" + s;
        e();
        f(0);
        fillText(String.fromCharCode(l), w / 6, 125);
        if (b) {
            f(255);
            e()
        }
    };
    f = function (s) {
        fillStyle = "rgba(" + s + "," + s + "," + s + ",.4)"
    };
    e = function () {
        fillRect(0, 0, w / 3, h / 3)
    }
}
v = function () {
    o = i;
    for (i = 0; i < 100; i = i * 10 + Math.random() * 4 + 5) ;
    i -= i % 1
};
v();
v();
setInterval("b()", 35);
