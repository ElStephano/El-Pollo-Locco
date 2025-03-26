class CollectibleBottles extends CollectibleObject{
    
    
    IMAGES_COLLECTIBLE_BOTTLES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ]


    constructor() {
        super().loadImages(this.IMAGES_COLLECTIBLE_BOTTLES)
        this.setBottles()
        
    }


    setBottles() {
        let path = this.IMAGES_COLLECTIBLE_BOTTLES[this.getRandomImage(this.IMAGES_COLLECTIBLE_BOTTLES)]
        this.img = this.imageCache[path]
    }
}