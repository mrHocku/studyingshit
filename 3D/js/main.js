window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };

})();

window.onload = function () {
    const WINDOW = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20,
        P1: new Point(-10, 10, -30), // левый верхний угол
        P2: new Point(-10, -10, -30), // левый нижний угол
        P3: new Point(10, -10, -30), // правый нижний угол
        CENTER: new Point(0, 0, -30), // центр окошка, через которое видим мир -30
        CAMERA: new Point(0, 0, -50) // точка, из которой смотрим на мир 
    };
    const ZOOM_OUT = 1.1;
    const ZOOM_IN = 0.9;

    const sur = new Surfaces;
    const canvas = new Canvas({ id: 'canvas', width: 800, height: 800, WINDOW, callbacks: { wheel, mousemove, mouseup, mousedown, mouseleave } });
    const graph3D = new Graph3D({ WINDOW });
    const ui = new UI({ canvas, callbacks: { move, printPoints, printEdges, printPolygons, printFigures } })
    const SCENE = [sur.parabolyccylinder()
        //sur.ellipticcylinder(),
        //sur.hyperboliccylinder(),
        //sur.parabolyccylinder(),
        //sur.ellipticparaboloid(),
        //sur.saturn(),
        //sur.cilindr(),
        //sur.bublik(),
        //sur.hyperbolicparaboloid(20),
        //sur.conus(),
        //sur.doublehyperboloid(),
        //sur.singlehyperboloid(),
        //sur.ellipsoid(),
        //sur.sphera(40, 10, new Point(0, 0, 0), "#ffff00", {}), //солнце 0
        //sur.sphera(40, 3, new Point(10, Math.sqrt(400 - 100), 0), "#f74b0e"), 
        //{ rotateOz: new Point}), // меркурий 1
        //sur.sphera(20, 4, new Point(-23, Math.sqrt(1600 - 23 * 23), 0), "#6a738b",
        //  { rotateOz: new Point}), // венера 2
        //sur.sphera(20, 4.4, new Point(0, 40, 0), "#2e3dfe", { rotateOz: new Point}), // земля 3
        //sur.sphera(20, 1, new Point(0, 33, 0), "#537d79", 
        // { rotateOz: new Point()}), // луна 4
        //sur.sphera(20, 3.6, new Point(-Math.sqrt(6400 - 32 * 32), -32, 0), "#fa0100", { rotateOz: new Point}), // марс 5
        //sur.sphera(20, 8, new Point(Math.sqrt(120 * 120 - 110 * 110), -110, 0), "#fc5300", { rotateOz: new Point}), // юпитер 6
        //sur.sphera(20, 7, new Point(150, 0, 0), "#e4cf00", { rotateOz: new Point}), // сатурн 7 
        //sur.bublik(20, 14, new Point(150, 0, 0), "#a48200", { rotateOz: new Point}), // кольцо сатурна 8
        //sur.sphera(20, 5.5, new Point(0, 180, 0), "#86aeff", { rotateOz: new Point}), // уран 9
        //sur.bublik(20, 12, new Point(0, 180, 0), "#86c5ff", { rotateOz: new Point}), // кольцо урана 10
        //sur.sphera(20, 5.3, new Point(-Math.sqrt(200 * 200 - 70 * 70), 70, 0), "#0263c5", { rotateOz: new Point}), // нептут 11


    ]; // сцена
    const LIGHT = new Light(-20, 2, -20, 200);

    let canRotate = false;
    let canPrint = {
        points: false,
        edges: false,
        polygons: true
    }

    // Градиент
    function gradient() {
        let k = 0
        for(let i = 0; i < SCENE[0].polygons.length; i++) {
            SCENE[0].polygons[i].color.g = k;
            SCENE[0].polygons[i].color.r = k;
            SCENE[0].polygons[i].color.b = k;
            k = k + 14 / 2.5;
        }    
        console.log(SCENE[0].polygons.length)
    }

    gradient()

    //3x3 параболический цилиндр
/*    let t = 4;
    let ab = 0;
    let cb = 0;
    let clr0 = {r:132, g:200, b:0};
    let clr1 = {r:0, g:0, b:0};
    let clr2 = {r:255, g:255, b:255};
    let clr = clr1;
    let trusov = 0;
    let pupa = 0;
    for(let i = 0; i < SCENE[0].polygons.length; i++)
    {
        if(trusov % 2 == 0)
        {
            if(ab < 3)
            {
                clr = clr2;
            }
            if(ab >= 3 && ab < 6)
            {
                clr = clr1;
            }
            if(ab >= 6 && ab < 9)
            {
                clr = clr2;
            }
        }
        if(trusov % 2 != 0)
        {
            if(ab < 3)
            {
                clr = clr1;
            }
            if(ab >= 3 && ab < 6)
            {
                clr = clr2;
            }
            if(ab >= 6 && ab < 9)
            {
                clr = clr1;
            }
        }
        pupa++;
        ab++;
        if(ab == 9)
        {
            ab = 0;
            cb++;
        }
        if(cb == 3)
        {
            trusov++;
            cb = 0;
        }

        SCENE[0].polygons[i].color = clr;
        if(cb == 1 && trusov % 2 == 0)
        {
            if(pupa > 4 && pupa < 6)
            {
                SCENE[0].polygons[i].color = clr0;
            }
        }

        if(cb == 1 && trusov % 2 != 0)
        {
            if(pupa > 1 && pupa < 3 || pupa > 7 && pupa < 9)
            {
                SCENE[0].polygons[i].color = clr0;
            }
        }

        if(pupa == 9)
        {
            pupa = 0;
        }

    }*/


/*    //1x1
  let t = 4;
    let ab = 0;
    let cb = 0;
    let clr1 = {r:0, g:0, b:0};
    let clr2 = {r:255, g:255, b:255};
    let clr = clr1;
    let trusov = 0;
    for(let i = 0; i < SCENE[0].polygons.length; i++)
    {
        if(trusov % 2 == 0)
        {
            if(ab < 3)
            {
                clr = clr2;
            }
            if(ab < 6)
            {
                clr = clr1;
            }
            if(ab < 9)
            {
                clr = clr2;
            }
        }
        if(trusov % 2 != 0)
        {
            if(ab < 3)
            {
                clr = clr1;
            }
            if(ab < 6)
            {
                clr = clr2;
            }
            if(ab < 9)
            {
                clr = clr1;
            }
        }
        ab++;
        trusov++;
        if(ab == 9)
        {
            ab = 0;
            cb++;
        }

        SCENE[0].polygons[i].color = clr;
    }*/

    // const her = () => {
    //     let k = 1
    //     let s = 9
    //     let p = 0
    //     let t = 0
        // for (let i = 0; i < SCENE[0].polygons.length; i++) {
            // if((k < 3) && (t == k + 3)){
            //     SCENE[0].polygons[i].color.r = 0
            //     k += 1
            // } else {
            //     t += 3
            //     k = 0
            // }
            
        //     for(let j = 0; j < s; j++){
        //         if (p < 3){
        //             SCENE[0].polygons[j].color.r = 0
        //             p++
        //         } else {
        //             p++
        //         }
        //         if ((p < 9) && (p > 5)) {
        //             SCENE[0].polygons[j].color.r = 0
        //             p++
        //         } else {
        //             p += 2
        //         }
        //     }
        //     p = 0
        //     t += 3
        // }
        // SCENE[0].polygons[0].color.r = 0
        // SCENE[0].polygons[0].color.g = 0
        // SCENE[0].polygons[0].color.b = 0
        // SCENE[0].polygons[1].color.r = 0
        // SCENE[0].polygons[1].color.g = 0
        // SCENE[0].polygons[1].color.b = 0
        // SCENE[0].polygons[2].color.r = 0
        // SCENE[0].polygons[2].color.g = 0
        // SCENE[0].polygons[2].color.b = 0
        // SCENE[0].polygons[9].color.r = 0
        // SCENE[0].polygons[9].color.g = 0
        // SCENE[0].polygons[9].color.b = 0
        // SCENE[0].polygons[11].color.r = 0
        // SCENE[0].polygons[11].color.g = 0
        // SCENE[0].polygons[11].color.b = 0
        // SCENE[0].polygons[10].color.r = 0
        // SCENE[0].polygons[10].color.g = 0
        // SCENE[0].polygons[10].color.b = 0
        // console.log(SCENE[0])
    // }

    // her()

    // about callbacks
    function wheel(event) {
        const delta = (event.wheelDelta > 0) ? ZOOM_IN : ZOOM_OUT;
        graph3D.zoomMatrix(delta);
        SCENE.forEach(subject => {
            subject.points.forEach(point => graph3D.transform(point));
            if (subject.animation) {
                for (let key in subject.animation) {
                    graph3D.transform(subject.animation[key]);
                }

            }
        });
    }

    function mouseup() {
        canRotate = false;
    }

    function mouseleave() {
        mouseup();
    }

    function mousedown() {
        canRotate = true;
    }

    function mousemove(event) {

        if (canRotate) {
            if (event.movementX) {// крутить вокруг OY
                const alpha = canvas.sx(event.movementX) / 10;
                graph3D.rotateOxMatrix(alpha);
                graph3D.transform(WINDOW.CAMERA);
                graph3D.transform(WINDOW.CENTER);
                graph3D.transform(WINDOW.P1);
                graph3D.transform(WINDOW.P2);
                graph3D.transform(WINDOW.P3);

            }
            if (event.movementY) {// крутить вокруг OX
                const alpha = canvas.sy(event.movementY) / 10;
                graph3D.rotateOyMatrix(alpha);
                graph3D.transform(WINDOW.CAMERA);
                graph3D.transform(WINDOW.CENTER);
                graph3D.transform(WINDOW.P1);
                graph3D.transform(WINDOW.P2);
                graph3D.transform(WINDOW.P3);
            }

        };
    };

    function printFigures(value) {
        while (SCENE.length !== 0) {
            SCENE.pop();
        }
        switch (value) {
            case "cube":
                SCENE.push(sur.cube());
                break;
            case "bublik":
                SCENE.push(sur.bublik());
                break;
            case "hyperCylinder":
                SCENE.push(sur.hyperboliccylinder());
                break;
            case "parabCylinder":
                SCENE.push(sur.parabolyccylinder());
                break;
            case "ellipscylinder":
                SCENE.push(sur.ellipticcylinder());
                break;
            case "oneHyperbolid":
                SCENE.push(sur.singlehyperboloid());
                break;
            case "twoHyperbolid":
                SCENE.push(sur.doublehyperboloid());
                break;
            case "ellipsoid":
                SCENE.push(sur.ellipsoid());
                break;
            case "cone":
                SCENE.push(sur.conus());
                break;
            case "sphera":
                SCENE.push(sur.sphera());
                break;
            case "ellipsParaboloid":
                SCENE.push(sur.ellipticparaboloid());
                break;
            case "hyperbolicParaboloid":
                SCENE.push(sur.hyperbolicparaboloid());
                break;
            case "sunSystem":
                SCENE.push(sur.sphera(40, 10, new Point(0, 0, 0), "#ffff00", {}), //солнце 0
                    sur.sphera(20, 3, new Point(10, Math.sqrt(400 - 100), 0), "#f74b0e",
                        { rotateOz: new Point }), // меркурий 1
                    sur.sphera(20, 4, new Point(-23, Math.sqrt(1600 - 23 * 23), 0), "#6a738b",
                        { rotateOz: new Point }), // венера 2
                    sur.sphera(20, 4.4, new Point(0, 60, 0), "#2e3dfe", { rotateOz: new Point }), // земля 3
                    //sur.sphera(20, 1, new Point(0, 53, 0), "#537d79", 
                    //    { rotateOz: new Point()}), // луна 4
                    sur.sphera(20, 3.6, new Point(-Math.sqrt(6400 - 32 * 32), -32, 0), "#fa0100", { rotateOz: new Point }), // марс 5
                    sur.sphera(20, 8, new Point(Math.sqrt(120 * 120 - 110 * 110), -110, 0), "#fc5300", { rotateOz: new Point }), // юпитер 6
                    sur.sphera(20, 7, new Point(150, 0, 0), "#e4cf00", { rotateOz: new Point }), // сатурн 7 
                    sur.bublik(20, 14, new Point(150, 0, 0), "#a48200", { rotateOz: new Point }), // кольцо сатурна 8
                    sur.sphera(20, 5.5, new Point(0, 180, 0), "#86aeff", { rotateOz: new Point }), // уран 9
                    sur.bublik(20, 12, new Point(0, 180, 0), "#86c5ff", { rotateOz: new Point }), // кольцо урана 10
                    sur.sphera(20, 5.3, new Point(-Math.sqrt(200 * 200 - 70 * 70), 70, 0), "#0263c5", { rotateOz: new Point }), // нептут 11
                );
                break;

            case "twoSphere":
                SCENE.push(sur.sphera(40, 10, new Point(0, 0, 0), "#ffff00", {}),
                    sur.sphera(20, 4.4, new Point(0, 25, 0), "#2e3dfe", { rotateOz: new Point }),
                    sur.sphera(20, 1, new Point(0, 18, 0), "#537d79",
                        { rotateOz: new Point() }), // луна 4
                );
                break;
        }
    }

    function printPoints(value) {
        canPrint.points = value;
    };

    function printEdges(value) {
        canPrint.edges = value;
    }

    function printPolygons(value) {
        canPrint.polygons = value;

    };


    function move(direction) {
        switch (direction) {
            case 'up': graph3D.rotateOxMatrix(-Math.PI / 180); break;
            case 'down': graph3D.rotateOxMatrix(Math.PI / 180); break;
            case 'left': graph3D.rotateOyMatrix(-Math.PI / 180); break;
            case 'right': graph3D.rotateOyMatrix(Math.PI / 180); break;
        }
        graph3D.transform(WINDOW.CAMERA);
        graph3D.transform(WINDOW.CENTER);
        graph3D.transform(WINDOW.P1);
        graph3D.transform(WINDOW.P2);
        graph3D.transform(WINDOW.P3);
        /*if (direction == 'up' || direction == 'down') {
            const delta = (direction === 'up') ? 0.1 : -0.1;
            graph3D.moveMatrix(0, delta, 0);
            SCENE.forEach(subject => subject.points.forEach(point => graph3D.transform(point)));
        }
        if (direction == 'left' || direction == 'right') {
            const delta = (direction === 'right') ? 0.1 : -0.1;
            graph3D.moveMatrix(delta, 0, 0);
            SCENE.forEach(subject => subject.points.forEach(point => graph3D.transform(point)));
        }*/
    }


    function printAllPolygons() {
        // print polygons
        if (canPrint.polygons) {
            // набрать полигоны в кучу
            const polygons = [];
            // предварительные расчеты
            SCENE.forEach(subject => {
                // алгоритм художника
                //graph3D.calcGorner(subject, WINDOW.CAMERA); // Отсечь невидимые грани
                graph3D.calcDistance(subject, WINDOW.CAMERA, 'distance'); // записать дистанции
                graph3D.calcCenters(subject); // найти центры всех полигонов
                //subject.polygons.sort((a, b) => b.distance - a.distance);
                graph3D.calcDistance(subject, LIGHT, 'lumen');
            });
            // расчет освещенности полигонов и его проекции на экран
            SCENE.forEach(subject => {
                // отрисовка полигонов
                for (let i = 0; i < subject.polygons.length; i++) {
                    //отрисовка полигонов
                    if (subject.polygons[i].visible) {
                        const polygon = subject.polygons[i];
                        const point1 = graph3D.getProection(subject.points[polygon.points[0]]);
                        const point2 = graph3D.getProection(subject.points[polygon.points[1]]);
                        const point3 = graph3D.getProection(subject.points[polygon.points[2]]);
                        const point4 = graph3D.getProection(subject.points[polygon.points[3]]);
                        let { r, g, b } = polygon.color;
                        const { isShadow, dark } = graph3D.calcShadow(polygon, subject, SCENE, LIGHT);
                        const lumen = (isShadow) ? dark : graph3D.calcIllumination(polygon.lumen, LIGHT.lumen);
                        r = Math.round(r * lumen);
                        g = Math.round(g * lumen);
                        b = Math.round(b * lumen);
                        polygons.push({
                            points: [point1, point2, point3, point4],
                            color: polygon.rgbToHex(r, g, b),
                            distance: polygon.distance
                        });
                    }
                }
            });
            // отрисовка всех полигонов
            polygons.sort((a, b) => b.distance - a.distance);
            polygons.forEach(polygon => canvas.polygon(polygon.points, polygon.color));
        }
    }


    function printSubject(subject) {
        // нарисовать рёбра
        if (canPrint.edges) {
            for (let i = 0; i < subject.edges.length; i++) {
                const edge = subject.edges[i];
                const point1 = graph3D.getProection(subject.points[edge.p1]);
                const point2 = graph3D.getProection(subject.points[edge.p2]);
                canvas.line(point1.x, point1.y, point2.x, point2.y)
            }
        }

        //нарисовать точки
        if (canPrint.points) {
            for (let i = 0; i <= subject.points.length - 1; i++) {
                const points = graph3D.getProection(subject.points[i]);
                canvas.point(points.x, points.y);
            }
        }
    }


    // function animationMoon(subject, center) {
    //     subject.animation.rotateOz.x = center.x;
    //     subject.animation.rotateOz.y = center.y;
    //     subject.animation.rotateOz.z = center.z;
    //     return subject;
    // }

    function render() {
        canvas.clear();
        //SCENE[SCENE.length - 1] = animationMoon(SCENE[SCENE.length - 1], SCENE[3].points[SCENE[3].points.length - 1])
        printAllPolygons();
        SCENE.forEach(subject => printSubject(subject));
        canvas.text(0, 19, "FPS: " + FPSout);
        canvas.render();
    }

    function animation() {
        // Закрутим фигуру!!!
        SCENE.forEach(subject => {
            if (subject.animation) {
                for (let key in subject.animation) {
                    const { x, y, z } = subject.animation[key];
                    const xn = WINDOW.CENTER.x - x;
                    const yn = WINDOW.CENTER.y - y;
                    const zn = WINDOW.CENTER.z - z;

                    const alpha = Math.PI / 180;
                    graph3D.animateMatrix(xn, yn, zn, key, alpha, -xn, -yn, -zn);
                    subject.points.forEach(point => graph3D.transform(point));
                }
            }
        });
    }

    setInterval(animation, 30);

    //clearInterval(interval);


    let FPS = 0;
    let FPSout = 0;
    timestamp = (new Date).getTime();
    (function animloop() {
        // Считаем FPS
        FPS++;
        const currentTimestamp = (new Date).getTime();
        if (currentTimestamp - timestamp >= 1000) {
            timestamp = currentTimestamp;
            FPSout = FPS;
            FPS = 0;

        }
        graph3D.calcPlaneEquation(); //Получить и записать плоскость экрана
        graph3D.calcWindowVectors(); //Вычислить поворот экрана
        // рисуем сцену
        render();
        requestAnimFrame(animloop);
    })();
};