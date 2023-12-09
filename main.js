import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


window.onload = () => {

    const scene = new THREE.Scene()
    //создание камеры с полем зрения, указанием соотношения сторон, ближней и дальней
    //плоскостей отсечения
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,
        0.1, 1000)
    camera.position.z = 5 //камера отодвигается, чтобы не оказаться в объектах

    //объект рендера
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    var light = new THREE.DirectionalLight(0xca2222, 1);
    light.position.set(50, 50, 22);
    light.target.position.set(800, 100, 0);
    scene.add(light);

    const helper = new THREE.DirectionalLightHelper(light)
    scene.add(helper)
    
    //light.shadow.camera.near = 0.5;       
    //light.shadow.camera.far = 5000;      
    //light.shadow.camera.left = -500;
    //light.shadow.camera.bottom = -500;
    //light.shadow.camera.right = 500;
    //light.shadow.camera.top = 500;
    
    //var helper = new THREE.CameraHelper( light.shadow.camera );
    //scene.add(helper);

    //освещение
    /*
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 7 );
    directionalLight.position.y = (5 + 5)
    directionalLight.position.x = -(5 + 5)
    directionalLight.position.z = -(5 + 5)
    directionalLight.target.position.set(100, 82, 0)
    scene.add(directionalLight);*/

    //управление камерой
    const controls = new OrbitControls( camera, renderer.domElement );
    camera.position.set( 0, 20, 100 );
    controls.update();
    renderer.render(scene, camera)

    //создание объекта кубика
    //для понимания точки отсчёта
    const geometry = new THREE.BoxGeometry(1, 1, 1) //объект
    const material = new THREE.MeshBasicMaterial({color: 0x7fffd4}) //материал и цвет
    const cube = new THREE.Mesh(geometry, material) //применение к объекту материала
    scene.add(cube)

    //пол
    const geometryPlane = new THREE.PlaneGeometry(1000, 1000) //объект
    geometryPlane.rotateX(-Math.PI * 0.5)
    const floor = new THREE.Mesh(geometryPlane, material) //применение к объекту материала
    scene.add(floor)


    //загрузка девушки
    const gltLoader = new GLTFLoader()
    gltLoader.load( '/static/models/matilda/scene.gltf', (gltf) => {
        const model = gltf.scene
        model.position.set(0, 0, 0);
        //model.scale.set(2,2,2);
        scene.add(gltf.scene)
    })

    //загрузка стола
    gltLoader.load( '/static/models/table/scene.gltf', (gltf) => {
        const model = gltf.scene
        model.position.set(100, 0, 0);
        model.scale.set(20,20,20);
        scene.add(gltf.scene)
    })

    //загрузка молока 
    gltLoader.load( '/static/models/milk/scene.gltf', (gltf) => {
        const model = gltf.scene
        model.position.set(100, 82, 0);
        model.scale.set(200,200,200);
        scene.add(gltf.scene)
    })

    /**
     * Событие для передвижения камеры по сцене
     */
    /*window.addEventListener("keydown", (e) => {
        console.log(e.key)
        switch (e.key) {
            case 's': 
                camera.position.z += 2
                break
            case 'w': 
                camera.position.z -= 2
                break
            case 'd': 
                camera.position.x += 2
                break
            case 'a': 
                camera.position.x -= 2
                break
            case 'q':
                camera.position.y += 2
                break
            case 'e':
                camera.position.y -= 2
        }
        //camera.lookAt(0, 0, 0)
        renderer.render(scene, camera)
    })*/



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
