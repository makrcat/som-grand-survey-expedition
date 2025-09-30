function gridCells(n) {
    return n * CELL_SIZE;
}

function moveTowards(objectToMove, destPos, speed) {
    let distanceToTravelX = destPos.x - objectToMove.position.x;
    let distanceToTravelY = destPos.y - objectToMove.position.y;

    let distance = Math.sqrt(distanceToTravelX**2 + distanceToTravelY**2);

    if(distance <= speed) {
        objectToMove.position.x = destPos.x;
        objectToMove.position.y = destPos.y;
    } else {
        let normalizedX = distanceToTravelX / distance;
        let normalizedY = distanceToTravelY / distance;

        objectToMove.position.x += normalizedX * speed;
        objectToMove.position.y += normalizedY * speed;

        distanceToTravelX = destPos.x - objectToMove.position.x;
        distanceToTravelY = destPos.y - objectToMove.position.y;
        distance = Math.sqrt(distanceToTravelX**2 + distanceToTravelY**2);
    }

    return distance;
}

function isFree(positions, posToCheck) {
    return !positions.has(posToCheck.toString());
}