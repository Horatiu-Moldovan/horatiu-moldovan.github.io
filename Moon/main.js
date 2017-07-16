var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias: true});
	renderer.setClearColor(0x000000);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 100, 10000);
	camera.position.set(0, 0, 1000);

	var scene = new THREE.Scene();
	var scene2 = new THREE.Scene();

	var light1 = new THREE.PointLight(0x00ffff, 0.7);
	
	var light2 = new THREE.PointLight(0xffffff, 3);
	light2.position.set(-500, 1000, 1000);
	scene.add(light2);
	
	var material1 = new THREE.PointsMaterial({color: 0xffffff});
	var geometry1 = new THREE.Geometry();
	var x, y, z;
	for(i=1; i < 700; i++){ 
	x = (Math.random()* window.innerWidth) - innerWidth/2;
	y = (Math.random() * window.innerHeight) - innerHeight/2;
	z = (Math.random() * 3000) - 3000;
	
	
	geometry1.vertices.push(new THREE.Vector3(x, y, z));
	};
	var pointCloud = new THREE.PointCloud(geometry1, material1);
	scene.add(pointCloud);



	//var texture = new THREE.TextureLoader().load( "wall.jpg" );
	var geometry = new THREE.SphereGeometry(300, 300, 300);
	var material = new THREE.MeshStandardMaterial({
		//color: 0x31fff0,
		roughness: 0.9,
		metalness: 1,
		
		normalMap: THREE.ImageUtils.loadTexture("moon_normal.jpg"),
		map: THREE.ImageUtils.loadTexture( 'moon.jpg' ),
		//specularMap: THREE.ImageUtils.loadTexture( 'spec.jpg' )
		});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0, 0, 0);

	scene.add(mesh);
	
	
	
	var text2 = document.createElement('div');
	text2.style.position = 'absolute';
	text2.style.color = 'white';
	//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
	//text2.style.width = 200;
	//text2.style.height = 200;
	text2.style.backgroundColor = "black";
	text2.innerHTML = "&copy; 2017 Horatiu Moldovan <br> Moon terrain: NASA";
	text2.style.top = 50 + 'px';
	text2.style.left = 50 + 'px';
	document.body.appendChild(text2);


	// sound
	//Create an AudioListener and add it to the camera
	var listener = new THREE.AudioListener();
	camera.add( listener );

	// create a global audio source
	var sound = new THREE.Audio( listener );
	
	var audioLoader = new THREE.AudioLoader();

	//Load a sound and set it as the Audio object's buffer
	audioLoader.load( 'Connect.Ohm - Snow Park.mp3', function( buffer ) {
		sound.setBuffer( buffer );
		sound.setLoop(false);
		sound.setVolume(0.5);
		sound.play();
		});

	window.addEventListener( 'resize', onWindowResize, false );

	function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
	};
	
	requestAnimationFrame(render);
	
	
	function render(){
	
	
    	//mesh.rotation.x += 0.01;
    	mesh.rotation.y += 0.001;

	renderer.render(scene, camera);
	requestAnimationFrame(render);

	};
