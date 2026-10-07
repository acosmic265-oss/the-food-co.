// ============================================
// THREE-SCENE.JS - Three.js 3D setup
// ============================================

let scene, camera, renderer;
let foodObjects = [];
let particles = [];
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

function initThreeScene() {
    const container = document.getElementById('canvas-container');
    
    if (!container) return;

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.Fog(0x0a0a0a, 100, 1000);

    // Camera setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffd700, 1);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff6b5b, 0.8);
    pointLight.position.set(-3, 3, 5);
    scene.add(pointLight);

    // Create food objects
    createFoodObjects();
    createParticles();

    // Event listeners
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousemove', onMouseMove, false);

    // Start animation loop
    animate();
}

function createFoodObjects() {
    // Burger
    const burger = createBurger();
    burger.position.set(-2, 0.5, 0);
    burger.castShadow = true;
    scene.add(burger);
    foodObjects.push({ mesh: burger, originalY: 0.5 });

    // Momos
    const momos = createMomos();
    momos.position.set(2, -0.5, 0);
    momos.castShadow = true;
    scene.add(momos);
    foodObjects.push({ mesh: momos, originalY: -0.5 });

    // Chowmein
    const chowmein = createChowmein();
    chowmein.position.set(0, 1, -1);
    chowmein.castShadow = true;
    scene.add(chowmein);
    foodObjects.push({ mesh: chowmein, originalY: 1 });
}

function createBurger() {
    const group = new THREE.Group();

    // Bottom bun
    const bunGeo = new THREE.CylinderGeometry(1, 1, 0.3, 32);
    const bunMat = new THREE.MeshStandardMaterial({ color: 0xcd7f32 });
    const bottomBun = new THREE.Mesh(bunGeo, bunMat);
    bottomBun.position.y = -0.5;
    bottomBun.castShadow = true;
    group.add(bottomBun);

    // Lettuce
    const lettucGeo = new THREE.CylinderGeometry(0.95, 0.95, 0.1, 32);
    const lettuceMat = new THREE.MeshStandardMaterial({ color: 0x90EE90 });
    const lettuce = new THREE.Mesh(lettucGeo, lettuceMat);
    lettuce.position.y = -0.15;
    lettuce.castShadow = true;
    group.add(lettuce);

    // Patty
    const pattyGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.15, 32);
    const pattyMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const patty = new THREE.Mesh(pattyGeo, pattyMat);
    patty.position.y = 0.05;
    patty.castShadow = true;
    group.add(patty);

    // Cheese
    const cheeseGeo = new THREE.BoxGeometry(1.8, 0.08, 1.8);
    const cheeseMat = new THREE.MeshStandardMaterial({ color: 0xFFD700 });
    const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
    cheese.position.y = 0.15;
    cheese.castShadow = true;
    group.add(cheese);

    // Top bun
    const topBun = new THREE.Mesh(bunGeo, bunMat);
    topBun.position.y = 0.45;
    topBun.castShadow = true;
    group.add(topBun);

    return group;
}

function createMomos() {
    const group = new THREE.Group();

    for (let i = 0; i < 4; i++) {
        const momoGeo = new THREE.SphereGeometry(0.5, 32, 32);
        const momoMat = new THREE.MeshStandardMaterial({ color: 0xe8b55f, roughness: 0.6 });
        const momo = new THREE.Mesh(momoGeo, momoMat);
        
        const angle = (i / 4) * Math.PI * 2;
        momo.position.x = Math.cos(angle) * 1.2;
        momo.position.y = -0.2;
        momo.position.z = Math.sin(angle) * 1.2;
        momo.scale.set(0.8, 0.9, 0.8);
        momo.castShadow = true;
        
        group.add(momo);
    }

    return group;
}

function createChowmein() {
    const group = new THREE.Group();

    // Main noodle base
    const noodleGeo = new THREE.CylinderGeometry(1, 0.9, 0.3, 32);
    const noodleMat = new THREE.MeshStandardMaterial({ color: 0xd4a574, roughness: 0.7 });
    const noodles = new THREE.Mesh(noodleGeo, noodleMat);
    noodles.castShadow = true;
    group.add(noodles);

    // Vegetables
    const vegGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const greenMat = new THREE.MeshStandardMaterial({ color: 0x90EE90 });
    const redMat = new THREE.MeshStandardMaterial({ color: 0xFF6B6B });

    for (let i = 0; i < 5; i++) {
        const veg = new THREE.Mesh(vegGeo, i % 2 === 0 ? greenMat : redMat);
        veg.position.x = (Math.random() - 0.5) * 1.8;
        veg.position.y = 0.2;
        veg.position.z = (Math.random() - 0.5) * 1.8;
        veg.castShadow = true;
        group.add(veg);
    }

    return group;
}

function createParticles() {
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 50;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 20;
        posArray[i + 1] = Math.random() * 15;
        posArray[i + 2] = (Math.random() - 0.5) * 20;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMat = new THREE.PointsMaterial({
        size: 0.1,
        color: 0xd4a574,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);
    particles.push(particleSystem);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate and animate food objects
    foodObjects.forEach((obj, index) => {
        obj.mesh.rotation.x += 0.003;
        obj.mesh.rotation.y += 0.005;
        
        // Floating animation
        obj.mesh.position.y = obj.originalY + Math.sin(Date.now() * 0.001 + index) * 0.2;
    });

    // Animate particles
    particles.forEach(particle => {
        particle.rotation.z += 0.0001;
    });

    // Mouse interaction (subtle)
    foodObjects.forEach(obj => {
        obj.mesh.position.x += (mouse.x * 0.5 - obj.mesh.position.x) * 0.05;
        obj.mesh.position.y += (mouse.y * 0.3 - (obj.originalY + Math.sin(Date.now() * 0.001) * 0.2)) * 0.05;
    });

    renderer.render(scene, camera);
}

function onMouseMove(event) {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / container.clientHeight) * 2 + 1;
}

function onWindowResize() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThreeScene);
} else {
    initThreeScene();
}

console.log('Three.js scene initialized');
