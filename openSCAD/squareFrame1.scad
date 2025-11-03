// In ChatGPT:
//  OpenSCAD code for a 2" × 2" square frame, made from 1/8" diameter cylindrical rods

// Size need to be mm.
inch = 25.4;                // inch → mm conversion
side = 2 * inch;            // square side length (2")
diameter = 1/8 * inch;      // rod diameter (1/8")
radius = diameter / 2;

$fn = 64; // smoothness of cylinders

// ---------- Modules ----------

// Cylinder "rod" between two 3D points
module rod(p1, p2, r=radius) {
    v = p2 - p1;
    h = norm(v);
    if (h > 0) {
        // direction angles
        a = acos(v.z / h);
        rot_axis = cross([0,0,1], v);
        translate(p1)
            rotate(a, rot_axis)
                cylinder(h=h, r=r, center=false);
    }
}

// ---------- Main shape ----------

module square_frame() {
    // Define corner points of the square (in XY plane)
    p1 = [ side/2,  side/2, 0];
    p2 = [-side/2,  side/2, 0];
    p3 = [-side/2, -side/2, 0];
    p4 = [ side/2, -side/2, 0];

    // The following "for" statement could not be parsed in FreeCAD
    // Cylindrical corners (optional – visual emphasis)
    // for (p in [p1, p2, p3, p4]) }
    //     translate(p) sphere(r=radius);
    // }
    translate(p1) sphere(r=radius);
    translate(p2) sphere(r=radius);
    translate(p3) sphere(r=radius);
    translate(p4) sphere(r=radius);

    // Edges between corners
    rod(p1, p2); // top
    rod(p2, p3); // left
    rod(p3, p4); // bottom
    rod(p4, p1); // right
}

// ---------- Render ----------
square_frame();