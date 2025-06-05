const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controlls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');

function PageTransitions(){
// Button click active class
for(let i = 0; i<sectBtn.length; i++)
{
    sectBtn[i].addEventListener('click', function(){
        let currentBtn = document.querySelectorAll('.active-btn');
        currentBtn[0].className = currentBtn[0].className.replace('active-btn','');
        this.className += ' active-btn';
    })
}

// Section active class
allSections.addEventListener('click',(e)=>{
    const id = e.target.dataset.id;
    if(id){
        //remove selected from the other button
        sectBtns.forEach((btn)=>{
            btn.classList.remove('active')
        })
        e.target.classList.add('active')

        //hide other sections   
        sections.forEach((section)=>{
            section.classList.remove('active');
        })
        const element = document.getElementById(id);
        element.classList.add('active');
    }
})

}
PageTransitions();

// -------- Three.js Setup --------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg') });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Basic rotating cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

