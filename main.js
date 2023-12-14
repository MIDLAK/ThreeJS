import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


window.onload = () => {

    const scene = new THREE.Scene()
    //создание камеры с полем зрения, указанием соотношения сторон, ближней и дальней
    //плоскостей отсечения
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,
        0.1, 1000)
    //камера отодвигается, чтобы не оказаться в объектах
    camera.position.z = 500 
    camera.position.y = 500

    //объект рендера
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    document.body.appendChild(renderer.domElement)


    //общее освещение
    //var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.3 )
    //directionalLight.position.set( -300, 1000, 0 )
    //scene.add( directionalLight )

    //красное направленное освещение (близко)
    var light = new THREE.SpotLight(0xca2222, 100000)    
    light.position.set(-300, 300, 300);

    //настройка теней
    light.castShadow = true
    light.distance=1000
    light.receiveShadow = true
    light.shadow.mapSize.width = 512
    light.shadow.mapSize.height = 512
    light.shadow.camera.near = 0.5
    light.shadow.camera.far = 10000


    scene.add(light);

    const helper = new THREE.CameraHelper(light.shadow.camera)
    scene.add(helper)

    //управление камерой
    const controls = new OrbitControls( camera, renderer.domElement );
    camera.position.set( 0, 20, 100 );
    controls.update();
    renderer.render(scene, camera)

    //создание объекта куба
    const geometry = new THREE.BoxGeometry(50, 50, 50) //объект
    const material = new THREE.MeshLambertMaterial({color: 0x808080}) //материал и цвет
    const cube = new THREE.Mesh(geometry, material) //применение к объекту материала
    cube.position.set(-200, 0, 0);
    cube.receiveShadow = true
    cube.costShadow = true
    scene.add(cube)

    //пол
    const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 100, 100)
    const plane = new THREE.Mesh(planeGeometry, new THREE.MeshLambertMaterial())
    plane.rotateX(-Math.PI / 2)
    plane.receiveShadow = true
    plane.costShadow = true
    scene.add(plane)


    //загрузка девушки
    const gltLoader = new GLTFLoader()
    gltLoader.load( '/static/models/matilda2/scene.gltf', (gltf) => {
        const model = gltf.scene
        model.position.set(0, 0, 0);
        
        //позволяет объекту отбрасывать тени
        //и принимать их
        model.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true
            }
        })

        //model.scale.set(2,2,2);
        scene.add(gltf.scene)
    })

    //загрузка стола
    gltLoader.load( '/static/models/table/scene.gltf', (gltf) => {
        const model = gltf.scene
        model.position.set(100, -8, 0);
        model.scale.set(20,20,20);

        //позволяет объекту отбрасывать тени
        //и принимать их
        model.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true
                node.receiveShadow = true
            }
        })

        scene.add(gltf.scene)
    })

    //загрузка молока 
    gltLoader.load( '/static/models/milk/scene.gltf', (gltf) => {
        const model = gltf.scene
        model.position.set(100, 74, 0);

        //позволяет объекту отбрасывать тени
        //и принимать их
        model.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true
            }
        })
        model.scale.set(200,200,200);
        scene.add(gltf.scene)

        light.target.position = model
    })


    function animate() {
        requestAnimationFrame( animate );
        controls.update();
        renderer.render( scene, camera );
    }
    animate()
}

    /**
     * Функция рендеринка (отрисовки) сцены
     */
    //function render() {
     //   //requestAnimationFrame(render)

        //cube.rotation.x += 0.01
        //cube.rotation.y += 0.01
        //cube.rotation.z += 0.01

        //renderer.render(scene, camera)
    //}
    //render()
