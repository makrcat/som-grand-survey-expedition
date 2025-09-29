class Camera extends GameObject {
    constructor() {
        super({});

        const personHalf = 8;
        const halfWidth = -personHalf + canvas.width / 2;
        const halfHeight = -personHalf + canvas.height / 2;

        events.on(ORPHEUS_MOVED, this, pos => {
            this.position = new Vector2(
                -pos.x + halfWidth,
                -pos.y + halfHeight
            );
        })
    }
}