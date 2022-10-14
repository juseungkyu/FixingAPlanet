import Draw from './Draw.js';

export default class DrawContinent extends Draw {
    constructor(render) {
        super(render)
    }

    init() {

    }

    /**
     * onMouseDown 이벤트
     * @param {PointerEvent} event
     */
    onMouseDown = (event) => {
        this.raycaster = new THREE.Raycaster()
        console.log(event)

        const mouse = new THREE.Vector2()
        this.raycaster.setFromCamera(mouse, this.render.camera)

        const intersects = this.raycaster.intersectObjects(this.render.scene.children, true);

        console.log(...intersects)
    }
}