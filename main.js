import * as THREE from 'three'

const scene = new THREE.Scene()
//создание камеры с полем зрения, указанием соотношения сторон, ближней и дальней
//плоскостей отсечения
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,
    0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry(1, 1, 1) //объект
const material = new THREE.MeshBasicMaterial({color: 0x7fffd4}) //материал и цвет
const cube = new THREE.Mesh(geometry, material) //применение к объекту материала

scene.add(cube)

camera.position.z = 5 //камера отодвигается, чтобы не оказаться в объектах

/**
 * Функция рендеринка (отрисовки) сцены
 */
function render() {
    requestAnimationFrame(render)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    cube.rotation.z += 0.01

    renderer.render(scene, camera)
}
render()
