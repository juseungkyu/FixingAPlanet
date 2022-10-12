export default class Render {
    constructor(container) {
        this.container = container
        this.init()
    }

    init() {
        this.WIDTH = window.innerWidth - 30
        this.HEIGHT = window.innerHeight - 30

        this.angle = 45
        this.aspect = this.WIDTH / this.HEIGHT
        this.near = 0.1
        this.far = 3000

        this.setCamera()
        this.setScene()
        this.setLight()
        this.setPlanet()

        console.log('행성 준비 완료')

        console.log(this.planetMesh)
        console.log(this.camera.position)

        this.camera.lookAt( this.planetMesh.position );
        this.setRenderer()

        console.log(this.scene)
        this.renderer.render(this.scene, this.camera);


        // this.animate()
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialiasing : true});

        this.renderer.setSize(this.WIDTH, this.HEIGHT);
        this.renderer.domElement.style.position = 'relative';
        
        this.container.appendChild(this.renderer.domElement);

        this.renderer.autoClear = false;
        this.renderer.shadowMapEnabled = true;
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
        this.light.position.set(4000, 4000, 1500)
        this.light.target.position.set (1000, 3800, 1000)

        this.scene.add(this.light);
    }

    setPlanet() {
        let planetGeo = new THREE.SphereGeometry (30, 40, 400)
        this.planetMat = new THREE.MeshPhongMaterial()

        // this.planetMat.map = THREE.ImageUtils.loadTexture('./resources/image/test.jpg');

        // // bump map
        // this.planetMat.bumpMap = THREE.ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/bump-map.jpg');
        // this.planetMat.bumpScale = 8;

        this.planetMesh = new THREE.Mesh(planetGeo, this.planetMat)
        this.planetMesh.position.set(-100, 0, 0)
        this.planetMesh.rotation.y = 5

        this.scene.add(this.planetMesh)
    }
    
    animate = () => { 
        requestAnimationFrame(this.animate);
        this.render(); 
    }

    render() {
        let clock = new THREE.Clock()
        let delta = clock.getDelta(); 

        this.planetMesh.rotation.y += 0.1 * delta;
        this.renderer.render(this.scene, this.camera);

        console.log('render')
    }
}