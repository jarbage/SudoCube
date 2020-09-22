function render(){
    raycaster.setFromCamera( mouse, camera );
    intersects = raycaster.intersectObject( particles );
    if ( intersects.length > 0 ) {
        if ( INTERSECTED != intersects[ 0 ].index ) {
            attributes.size.array[ INTERSECTED ] = PARTICLE_SIZE;
            INTERSECTED = intersects[ 0 ].index;
            attributes.size.array[ INTERSECTED ] = PARTICLE_SIZE * 1.25;
            attributes.size.needsUpdate = true;
        }
    } else if ( INTERSECTED !== null ) {
        attributes.size.array[ INTERSECTED ] = PARTICLE_SIZE;
        attributes.size.needsUpdate = true;
        INTERSECTED = null;
    }
    renderer.render( scene, camera );
    
}

 function animate(time) {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, persCamera);
}

animate();