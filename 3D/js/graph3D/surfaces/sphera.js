Surfaces.prototype.sphera = (count = 40, R = 6, point = new Point(0, 0, 0), color = '#ff0000') => {
    let points = [];
    let edges = [];
    let polygones = [];
    while(count % 4 != 0){
        count--;
    }
    let center = new Point(point.x, point.y, point.z, color);

    // точки
    const delta = Math.PI  * 2 / count;
    for (let i = 0; i <= Math.PI; i += delta) {
        for (let j = 0; j < Math.PI * 2; j += delta) {
            const x = point.x + R * Math.sin(i) * Math.cos(j);
            const y = point.y + R * Math.sin(i) * Math.sin(j);
            const z = point.z + R * Math.cos(i);
            points.push(new Point(x, y, z, color));
        }
    }  

    // ребра 
    for (let i = 0; i < points.length; i++) {
        // вдоль
        if (i + 1 < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1, color));
        } else if ((i + 1) % count === 0) {
            edges.push(new Edge(i, i + 1 - count, color));
        }
        // поперёк
        if (i + count < points.length) {
            edges.push(new Edge(i, i + count, color));
        }
    }

    // полигоны
    let a = 0;
    for (let i = 0; i < points.length; i++) {
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygones.push(new Polygon([i, i + 1, i + 1 + count, i + count], color, i));
        } else if ((i + count) < points.length && (i + 1) % count === 0) {
            polygones.push(new Polygon([i, i + 1 - count, i + 1, i + count], color , i))
        }
    }

    for(let i = 0; i < polygones.length; i+=count){
        for(let j = 0; j < count / 4; j++){
            polygones[i + 4*j].color = {r:0, g:0, b:0};
        }
    }
    /* let c = 0;
    let ai = 0;
    for(let i = 0; i < polygones.length; i++){
        if(ai < count){
            if(c % 4 === 0){
                polygones[i].color = {r:0, g:0, b:0};
                console.log(c);
            } 
            ai++;
        } else {
            ai = 0;
            c++;
        }
    
    } */
    for(let i = 0; i < count / 4; i++){
        for(let j = count*i*4; j < count*i*4 + count; j++){
            if(polygones[j]){
                polygones[j].color = {r:0, g:0, b:0};
            }
        }
    }


    points.push(center);
    return new Subject(points, edges, polygones);
}