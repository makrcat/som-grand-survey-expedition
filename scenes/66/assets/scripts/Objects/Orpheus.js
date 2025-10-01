class Orpheus extends GameObject {
    constructor(x, y) {
        super({
            position: new Vector2(x, y),
        });

        this.destPos = this.position;   
        this.heldDirections = [];
        
        document.addEventListener("keydown", (event) => {
            if(event.code === "KeyW" || event.code === "ArrowUp") {
                this.onKeyPressed(UP);
            } else if(event.code === "KeyA" || event.code === "ArrowLeft") {
                this.onKeyPressed(LEFT);
            } else if(event.code === "KeyS" || event.code === "ArrowDown") {
                this.onKeyPressed(DOWN);
            } else if(event.code === "KeyD" || event.code === "ArrowRight") {
                this.onKeyPressed(RIGHT);
            }
        });

        document.addEventListener("keyup", (event) => {
            if(event.code === "KeyW" || event.code === "ArrowUp") {
                this.onKeyReleased(UP);
            } else if(event.code === "KeyA" || event.code === "ArrowLeft") {
                this.onKeyReleased(LEFT);
            } else if(event.code === "KeyS" || event.code === "ArrowDown") {
                this.onKeyReleased(DOWN);
            } else if(event.code === "KeyD" || event.code === "ArrowRight") {
                this.onKeyReleased(RIGHT);
            }
        });
    }

    get direction() {
        return this.heldDirections[0];
    }

    onKeyPressed(direction) {
        if(this.heldDirections.indexOf(direction) === -1) {
            this.heldDirections.unshift(direction);
        }
    }

    onKeyReleased(direction) {
        const index = this.heldDirections.indexOf(direction);
        
        if(index === -1) {
            return;
        }

        this.heldDirections.splice(index, 1);
    }

    tryMove() {
        if(!this.direction) {
            return;
        }

        let nextDest = this.destPos;

        if(this.direction === UP) {
            nextDest = new Vector2(this.position.x, this.position.y - CELL_SIZE);
        }
        if(this.direction === LEFT) {
            nextDest = new Vector2(this.position.x - CELL_SIZE, this.position.y);
        }
        if(this.direction === DOWN) {
            nextDest = new Vector2(this.position.x, this.position.y + CELL_SIZE);
        }
        if(this.direction === RIGHT) {
            nextDest = new Vector2(this.position.x + CELL_SIZE, this.position.y);
        }

        if(isFree(BLOCKED_POSITIONS, nextDest)) {
            this.destPos = nextDest;
            events.emit(NEW_ORPHEUS_DEST, this.destPos);
        }
    }

    step(delta) {
        const distance = moveTowards(this, this.destPos, 2);
        
        if(DEBUG) {
            console.log(this.position.x + "," + this.position.y);
        }
        
        const hasArrived = distance <= 1;
        if(hasArrived) {
            this.position.x = this.destPos.x;
            this.position.y = this.destPos.y;
            
            this.tryMove();
        }

        if(this.lastX === this.position.x && this.lastY === this.position.y) {
            return;
        }

        this.lastX = this.position.x;
        this.lastY = this.position.y;
        
        events.emit(ORPHEUS_MOVED, this.position);
    }

    drawImage(ctx, drawPosX, drawPosY) {
        if(resources.images.explorpheus.isLoaded) {
            ctx.drawImage(resources.images.explorpheus.image, this.position.x, this.position.y, CELL_SIZE, CELL_SIZE);
        }
    }
}