Surfaces.prototype.sphera = (count = 20, R = 6, point = new Point(0, 0, 0), color = '#ff0000', animation) => {
    let points = [];
    let edges = [];
    let polygons = [];

    // точки
    const delta = Math.PI  * 2 / count;
    for (let i = 0; i <= Math.PI; i += delta) {
        for (let j = 0; j < Math.PI * 2; j += delta) {
            const x =point.x + R * Math.sin(i) * Math.cos(j);
            const y =point.y + R * Math.sin(i) * Math.sin(j);
            const z =point.z + R * Math.cos(i);
            points.push(new Point(x, y, z));
        }
    }  

//Сетка 
let k = 1;
for (let i = 0; i < points.length; i++) {
    if ((i % count) == 0) {
    k++;
    }
    
    if (((i + k ) % 2) < 1) {
    if (i + 1 + count < points.length && (i + 1) % count != 0) {
    polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
    } else if ((i + count) < points.length && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
    }
    }
    
    }
    for (let i = 0; i < points.length; i++) {
    if ((i % count) != 0) {
    k++;
    }
    if (((i + k ) % 2) < 1) {
    if (i + 1 + count < points.length && (i + 1) % count != 0) {
    polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color))
    } else if ((i + count) < points.length && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
    }
    }
}

    return new Subject(points, edges, polygons, animation);
}