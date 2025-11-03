// Code from ChatGPT.
// The query:
//  OpenSCAD: 50mm × 50mm × 50mm cube frame made of 3mm cylindrical rods

side = 50;        // cube edge length (mm)
diameter = 3;     // rod diameter (mm)
radius = diameter / 2;

$fn = 64; // smoothness for round rods

// ---------- Module: rod between two 3D points ----------
module rod(p1, p2, r=radius) {
    v = p2 - p1;            // vector from p1 to p2
    h = norm(v);            // length of rod
    if (h > 0) {
        a = acos(v.z / h);                  // rotation angle
        rot_axis = cross([0,0,1], v);       // rotation axis
        translate(p1)
            rotate(a, rot_axis)
                cylinder(h=h, r=r, center=false);
    }
}

// ---------- Module: cube frame ----------
module cube_frame(side, radius) {
    // Define 8 cube corners (centered at origin)
    p = [
        [ side/2,  side/2,  side/2], // p1
        [-side/2,  side/2,  side/2], // p2
        [-side/2, -side/2,  side/2], // p3
        [ side/2, -side/2,  side/2], // p4
        [ side/2,  side/2, -side/2], // p5
        [-side/2,  side/2, -side/2], // p6
        [-side/2, -side/2, -side/2], // p7
        [ side/2, -side/2, -side/2]  // p8
    ];

    // List of 12 edges (pairs of vertex indices)
    edges = [
        [0,1],[1,2],[2,3],[3,0], // top
        [4,5],[5,6],[6,7],[7,4], // bottom
        [4,0],[5,1],[6,2],[7,3]  // vertical corrected
     // [0,4],[1,5],[2,6],[3,7]  // vertical incorrect
    ];

    // Draw edges
    for (e = edges)
        rod(p[e[0]], p[e[1]], radius);

    // Optional: small spheres at corners
    vertexRadius = radius * 2;
    //for (corner in p)
    //    translate(corner) sphere(r=radius);
    for (aVertex = [0 : 1 : 7]) {
        translate(p[aVertex]) sphere(r=vertexRadius);
    }
}

// ---------- Render ----------
cube_frame(side, radius);
