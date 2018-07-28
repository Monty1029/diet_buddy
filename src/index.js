var camera;
var scene;
var renderer;
var dom;
var hero = generateHero();
var orbitControl;

init();
function init() {
	createScene();
	update();
}

function createScene() {
	var sceneWidth = window.innerWidth;
	var sceneHeight = window.innerHeight;

	camera = new THREE.PerspectiveCamera(60, sceneWidth / sceneHeight, 0.1, 1000);
	camera.position.z = 5;
	camera.position.y = 1;

	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setSize(sceneWidth, sceneHeight);

	dom = document.getElementById('container');
	dom.appendChild(renderer.domElement);

	scene = new THREE.Scene();
	scene.add(hero);
	scene.add(generateGround());
	scene.add(generateSun());

	orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
	orbitControl.addEventListener('change', render);
	orbitControl.enableZoom = false;

	window.addEventListener('resize', onWindowResize, false);
}

function generateHero() {
	var heroGeometry = new THREE.BoxGeometry(1, 1, 1);
	var heroMaterial = new THREE.MeshStandardMaterial({ color: 0x883333 });

	hero = new THREE.Mesh(heroGeometry, heroMaterial);
	hero.castShadow = true;
	hero.receiveShadow = false;
	hero.position.y = 2;

	return hero;
}

function generateGround() {
	var planeGeometry = new THREE.PlaneGeometry(5, 5, 4, 4);
	var planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

	ground = new THREE.Mesh(planeGeometry, planeMaterial);
	ground.receiveShadow = true;
	ground.castShadow = false;
	ground.rotation.x = -Math.PI / 2;

	return ground;
}

function generateSun() {
	sun = new THREE.DirectionalLight(0xffffff, 0.8);
	sun.position.set(0, 4, 1);
	sun.castShadow = true;

	//Set up shadow properties for the sun light
	sun.shadow.mapSize.width = 256;
	sun.shadow.mapSize.height = 256;
	sun.shadow.camera.near = 0.5;
	sun.shadow.camera.far = 50;

	return sun;
}

function update() {
	//animate
	hero.rotation.x += 0.01;
	hero.rotation.y += 0.01;

	render();
	requestAnimationFrame(update);
}

function render() {
	renderer.render(scene, camera);
}

function onWindowResize() {
	var sceneHeight = window.innerHeight;
	var sceneWidth = window.innerWidth;
	renderer.setSize(sceneWidth, sceneHeight);
	camera.aspect = sceneWidth / sceneHeight;
	camera.updateProjectionMatrix();
}