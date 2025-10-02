class SpeechBubble extends GameObject {
    constructor() {
        super({});

        this.isOpen = false;
        this.hasDrawn = false;
        
        events.on(ORPHEUS_MOVED, this, pos => {
            this.position = pos;

            if(this.isOpen) {
                this.isOpen = false;
            }
        })

        document.addEventListener("keyup", (event) => {
            if(event.code === "Space" && !this.isOpen) {
                this.isOpen = true;
            }
        });
    }

    drawImage(ctx, drawPosX, drawPosY) {
        const bubble = document.getElementById("bubble");

        if(this.isOpen && !INTERACTION_POSITIONS.has(this.position.toString()) && !ENTRANCE_POSITIONS.has(this.position.toString())
                && !LOWER_EXIT_POSITIONS.has(this.position.toString()) && !RIGHT_EXIT_POSITIONS.has(this.position.toString())
                && !UPPER_EXIT_2_POSITIONS.has(this.position.toString()) && !UPPER_EXIT_POSITIONS.has(this.position.toString())) {
            bubble.style.visibility = "visible"
        } else {
            bubble.style.visibility = "hidden"
        }
    }
}