export default class Render {
    constructor(container) {
        this.container = container
        this.init()
    }

    /**
     * 기본 설정 함수
     */
    init() {
        this.radius = 200
        this.angleX = 0
        this.angleY = 0

        this.WIDTH = window.innerWidth
        this.HEIGHT = window.innerHeight

        this.angle = 45
        this.aspect = this.WIDTH / this.HEIGHT
        this.near = 0.1
        this.far = 3000

        this.setCanvas()

        this.setScene()
        this.setLight()
        this.setPlanet()
        this.setCamera()
        this.setRenderer()

        this.renderer.render(this.scene, this.camera)

        this.animate()
    }

    /**
     * 텍스쳐에 넣을 캔버스 준비하는 함수
     */
    setCanvas() {
        this.mapCanvas = document.createElement('canvas')
        this.mapCanvas.width = 1000
        this.mapCanvas.height = 500
        this.bumpMapCanvas = document.createElement('canvas')
        this.bumpMapCanvas.width = 1000
        this.bumpMapCanvas.height = 500

        this.mapCtx = this.mapCanvas.getContext('2d')
        this.bumpMapCtx = this.bumpMapCanvas.getContext('2d')

        this.mapCtx.fillStyle = "rgb(255,255,255)"
        this.mapCtx.fillRect(0,0,1000,500)
        
        this.bumpMapCtx.fillStyle = "rgb(0,0,0)"
        this.bumpMapCtx.fillRect(0,0,1000,500)
    }

    /**
     * mapCtx 반환
     * Map : 색 같은 그래픽을 설정
     * @returns {CanvasRenderingContext2D} mapCtx
     */
    getMapCtx = () => this.mapCtx

    /**
     * BumpMapCtx 반환
     * BumpMap : 고도 설정
     * @returns {CanvasRenderingContext2D} bumpMapCtx
     */
    getBumpMapCtx = () => this.bumpMapCtx
    
    /**
     * 이미지로 Map을 설정
     * Map : 색과 같은 그래픽을 설정
     * @param {HTMLBodyElement} img
     */
    drawMap(img) {
        this.mapCtx.drawImage(img,0,0, 1000, 500)
        this.setMap()
    }

    /**
     * 이미지로 BumpMap을 설정
     * BumpMap : 고도 설정
     * @param {HTMLBodyElement} img
     */
    drawBumpMap(img) {
        this.bumpMapCtx.drawImage(img,0,0, 1000, 500)
        this.setBumpMap()
    }

    /**
     * mapCanvas에 그려져 있는 텍스쳐로 설정
     * Map : 색과 같은 그래픽을 설정
     */
    setMap() {
        // document.querySelector('body').appendChild(this.mapCanvas)
        this.planetMat.map = new THREE.CanvasTexture(this.mapCanvas);
    }

    /**
     * BumpMapCanvas에 그려져 있는 텍스쳐로 고도 설정
     * BumpMap : 고도 설정
     */
    setBumpMap() {
        this.planetMat.bumpMap = new THREE.CanvasTexture(this.bumpMapCanvas);
    }

    /**
     * Map이 업데이트가 필요하다고 설정
     */
    setMapNeedUpdateTrue() {
        this.planetMat.map.needsUpdate = true
    }

    /**
     * BumpMap이 업데이트가 필요하다고 설정
     */
    setBumpMapNeedUpdateTrue() {
        this.planetMat.bumpMap.needsUpdate = true
    }

    /**
     * Renderer 생성, 초기설정
     */
    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialiasing : true})

        this.setRendererSize()
        this.renderer.domElement.style.position = 'relative'
        
        this.container.insertBefore(this.renderer.domElement, document.querySelector('.left-top.ui'))

        this.renderer.autoClear = true
        this.renderer.shadowMap.enabled = true
    }

    /**
     * 페이지 크기가 변하면 Renderer 크기도 변경
     */
    setRendererSize = () => {
        this.WIDTH = window.innerWidth
        this.HEIGHT = window.innerHeight
        this.aspect = this.WIDTH / this.HEIGHT
        this.camera.aspect = this.aspect
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.WIDTH, this.HEIGHT)
    }

    /**
     * 카메라 설정
     */
    setCamera(x=200, y=0, z=0) {
        this.camera = new THREE.PerspectiveCamera(this.angle, this.aspect, this.near, this.far)
        this.moveCamera(x,y,z)
    }

    moveCamera({x, y, z}) {
        console.log(Math.round(y), Math.round(z))
        
        this.camera.position.set(x, y, z)
        // console.log(this.camera.position.z)
        this.camera.lookAt( this.planetMesh.position )
    }

    /**
     * scene 설정
     */
    setScene() {
        this.scene = new THREE.Scene()
    }

    /**
     * 조명 설정
     */
    setLight() {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.1)

        this.light = new THREE.DirectionalLight(0xffffff, 0.9)
        this.light.position.set(200, 0, 0);

        this.scene.add(this.ambientLight)
        this.scene.add(this.light)
    }

    /**
     * 행성 도형 준비
     */
    setPlanet() {
        this.planetGeo = new THREE.SphereGeometry(50, 50, 50)
        this.planetMat = new THREE.MeshPhongMaterial()

        this.setMap()
        this.setBumpMap()

        this.planetMat.bumpScale = 10
        this.planetMesh = new THREE.Mesh(this.planetGeo, this.planetMat)

        this.planetMesh.position.set(0, 0, 0)

        this.scene.add(this.planetMesh)
    }
    
    /**
     * 프레임마다 렌더
     */
    animate = () => { 
        this.render() 
        requestAnimationFrame(this.animate)
    }

    /**
     * 행성을 렌더
     */
    render() {
        this.angleX += 0.1
        // this.angleY += 0.01
        // this.angleX = 1
        // this.angleY = 45

        this.moveCamera(this.getCamera(this.angleX, this.angleY))
        this.renderer.render(this.scene, this.camera)
    }

    /**
     * 
     * @param {Number} angleX 
     * @param {Number} angleY 
     * @returns {x:Number, y:Number, z:Number}
     */
    getCamera(angleX, angleY) {
        const y = this.radius * Math.sin(angleY)
        const a = this.radius * Math.cos(angleY)
        const x = a * Math.sin(angleX)
        const z = a * Math.cos(angleX)


        // const x = this.radius * Math.sin(angleY) * Math.cos(angleX)
        // const y = this.radius * Math.cos(angleY)
        // const z = this.radius * Math.sin(angleY) * Math.sin(angleX)

        return {x,y,z}
    }
}