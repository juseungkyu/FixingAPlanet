export default class Render {
    constructor(container) {
        this.container = container
        this.init()
    }

    init() {
        this.WIDTH = window.innerWidth
        this.HEIGHT = window.innerHeight

        this.angle = 45
        this.aspect = this.WIDTH / this.HEIGHT
        this.near = 0.1
        this.far = 3000

        this.setCanvas()

        this.setCamera()
        this.setScene()
        this.setLight()
        this.setPlanet()

        this.camera.lookAt( this.planetMesh.position );
        this.setRenderer()

        this.renderer.render(this.scene, this.camera);

        this.animate()
    }

    setCanvas() {
        this.mapCanvas = document.createElement('canvas')
        this.mapCanvas.width = 1000
        this.mapCanvas.height = 500
        this.bumpMapCanvas = document.createElement('canvas')
        this.bumpMapCanvas.width = 1000
        this.bumpMapCanvas.height = 500

        this.mapCtx = this.mapCanvas.getContext('2d')
        this.bumpMapCtx = this.mapCanvas.getContext('2d')

        this.mapCtx.fillStyle = "#ffffff"
        this.mapCtx.fillRect(0,0,1000,500)
    }

    drawMap(img) {
        this.mapCtx.drawImage(img)
    }

    drawBumpMap(img) {
        this.bumpMapCtx.drawImage(img)
    }

    setMap() {
        this.planetMat.map = THREE.ImageUtils.loadTexture(this.mapCanvas.toDataURL());
    }

    setBumpMap() {
        this.planetMat.bumpMap = THREE.ImageUtils.loadTexture(this.bumpMapCanvas.toDataURL());
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialiasing : true});

        this.setRendererSize()
        this.renderer.domElement.style.position = 'relative';
        
        this.container.appendChild(this.renderer.domElement);

        this.renderer.autoClear = true;
        this.renderer.shadowMapEnabled = true;
    }

    setRendererSize = () => {
        this.WIDTH = window.innerWidth
        this.HEIGHT = window.innerHeight
        this.aspect = this.WIDTH / this.HEIGHT
        this.camera.aspect = this.aspect
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.WIDTH, this.HEIGHT);
    }

    setCamera() {
        this.camera = new THREE.PerspectiveCamera(this.angle, this.aspect, this.near, this.far)
        this.camera.position.set(0, 0, 0)
    }

    setScene() {
        this.scene = new THREE.Scene()
    }

    setLight() {
        this.light = new THREE.SpotLight(0xFFFFFF, 1, 0, Math.PI / 2, 1)
        this.light.position.set(14000, 4000, 1500)
        this.light.target.position.set (1000, 3800, 1000)

        this.scene.add(this.light);
    }

    setPlanet() {
        let planetGeo = new THREE.SphereGeometry (30, 40, 400)
        this.planetMat = new THREE.MeshPhongMaterial()

        this.setMap()
        this.setBumpMap()

        this.planetMat.bumpScale = 100;
        this.planetMesh = new THREE.Mesh(planetGeo, this.planetMat)

        this.planetMesh.position.set(-100, 0, 0)

        this.scene.add(this.planetMesh)
    }
    
    animate = () => { 
        requestAnimationFrame(this.animate);
        this.render(); 
    }

    render() {
        let clock = new THREE.Clock()
        let delta = clock.getDelta(); 

        // this.planetMesh.rotation.y += 0.005;
        this.renderer.render(this.scene, this.camera);
    }
}