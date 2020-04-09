import React from 'react';
import * as THREE from 'three';

const FresnelShader = {
  uniforms: {
    mRefractionRatio: { value: 1.02 },
    mFresnelBias: { value: 0.1 },
    mFresnelPower: { value: 2.0 },
    mFresnelScale: { value: 1.0 },
    tCube: { value: null }
  },

  vertexShader: [
    'uniform float mRefractionRatio;',
    'uniform float mFresnelBias;',
    'uniform float mFresnelScale;',
    'uniform float mFresnelPower;',

    'letying vec3 vReflect;',
    'letying vec3 vRefract[3];',
    'letying float vReflectionFactor;',

    'void main() {',

    '	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
    '	vec4 worldPosition = modelMatrix * vec4( position, 1.0 );',

    '	vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );',

    '	vec3 I = worldPosition.xyz - cameraPosition;',

    '	vReflect = reflect( I, worldNormal );',
    '	vRefract[0] = refract( normalize( I ), worldNormal, mRefractionRatio );',
    '	vRefract[1] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.99 );',
    '	vRefract[2] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.98 );',
    '	vReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), mFresnelPower );',

    '	gl_Position = projectionMatrix * mvPosition;',

    '}'
  ].join('\n'),

  fragmentShader: [
    'uniform samplerCube tCube;',

    'letying vec3 vReflect;',
    'letying vec3 vRefract[3];',
    'letying float vReflectionFactor;',

    'void main() {',

    '	vec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );',
    '	vec4 refractedColor = vec4( 1.0 );',

    '	refractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;',
    '	refractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;',
    '	refractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;',

    '	gl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );',

    '}'
  ].join('\n')
};

// function generateTexture() {
//   const canvas = document.createElement('canvas');
//   canvas.width = 2;
//   canvas.height = 2;

//   const context = canvas.getContext('2d');
//   context.fillStyle = 'white';
//   context.fillRect(0, 1, 2, 1);

//   return canvas;
// }

// const params = {
//   color: 0xffffff,
//   transparency: 0.9,
//   envMapIntensity: 1,
//   lightIntensity: 1,
//   exposure: 1
// };

export const Three = () => {
  let container;
  let camera;
  let scene;
  let renderer;

  const mainRendering = (ref: any) => {
    container = document.createElement('div');
    ref.appendChild(container);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0xffffff, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.z = 2000;

    const path = 'assets/cube/Park2/';
    const format = '.jpg';
    const urls = [
      path + 'posx' + format,
      path + 'negx' + format,
      path + 'posy' + format,
      path + 'negy' + format,
      path + 'posz' + format,
      path + 'negz' + format
    ];

    const textureCube = new THREE.CubeTextureLoader().load(urls);

    scene = new THREE.Scene();
    scene.background = textureCube;

    const geometry = new THREE.SphereBufferGeometry(100, 32, 16);

    const shader = FresnelShader;
    const uniforms = THREE.UniformsUtils.clone(shader.uniforms);

    uniforms['tCube'].value = textureCube;

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = 0;
    mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
    scene.add(mesh);

    function animate() {
      requestAnimationFrame(animate);

      render();
    }

    function render() {
      const timer = 0.0001 * Date.now();

      mesh.position.x = 500 * Math.cos(timer);
      mesh.position.y = 500 * Math.sin(timer + 1 * 1.1);

      renderer.render(scene, camera);
    }

    animate();
  };

  return (
    <div className="app">
      <header className="flex">
        <h1>Welcome to KVN site!</h1>
      </header>
      <main ref={ref => mainRendering(ref)}></main>
    </div>
  );
};

export default Three;
