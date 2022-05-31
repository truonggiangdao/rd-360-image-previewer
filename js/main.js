const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });

var anisotropy = renderer.capabilities.getMaxAnisotropy();
console.log('maxAnisotropy', anisotropy);

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new OrbitControls( camera, renderer.domElement );
controls.listenToKeyEvents( window ); // optional

//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
// controls.minDistance = 1;
// controls.maxDistance = 10;
// controls.maxPolarAngle = Math.PI / 2;

const geometry = new THREE.SphereBufferGeometry( 800, 128, 64 );
const material = new THREE.MeshBasicMaterial();
const sphere = new THREE.Mesh( geometry, material );
sphere.scale.x = -1;
scene.add( sphere );

function animate() {
    controls.update(); // only 

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

var fileInput = document.getElementById('image-360');
var loader = new THREE.TextureLoader();
loader.setCrossOrigin("");

var handleFileSelect = () => {
    if (fileInput.files && fileInput.files[0]) {
        const selectedFile = fileInput.files.item(0);
        if (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png') {
            var userImageURL = URL.createObjectURL( selectedFile );
            console.log(userImageURL);
            loader.load(userImageURL, (texture) => {
                texture.anisotropy = anisotropy;
                sphere.material.map = texture;
                sphere.material.side = THREE.BackSide;
                sphere.material.needsUpdate = true;
                console.log(texture);
            });
        }
    }
};

fileInput.addEventListener('change', handleFileSelect);