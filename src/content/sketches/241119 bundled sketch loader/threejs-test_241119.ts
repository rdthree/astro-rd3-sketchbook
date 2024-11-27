import { defineSketch } from '../../../renderers/threeRenderer';
import type { Vector3 } from 'three';

export default defineSketch(async ({ scene }) => {
    const { PerspectiveCamera, BoxGeometry, Mesh, MeshStandardMaterial, Vector3, BufferGeometry, LineBasicMaterial, Line, Color } = await import('three');
    const { DirectionalLight, AmbientLight, PointLight } = await import('three');
    
    // camera setup
    const camera = new PerspectiveCamera(75, 1, 0.1, 1000);

    // Smooth movement utilities
    function lerp(start: number, end: number, factor: number): number {
        return start + (end - start) * factor;
    }

    function smoothstep(x: number): number {
        return x * x * (3 - 2 * x);
    }

    // Noise smoothing for random walks
    class SmoothNoise {
        value: number = 0;
        target: number = 0;

        update(smoothing: number = 0.1) {
            this.target = (Math.random() - 0.5);
            this.value = lerp(this.value, this.target, smoothing);
            return this.value;
        }
    }

    // MEGA LIGHTING SYSTEM 2.0 - INCREASED INTENSITY
    const directionalLight = new DirectionalLight(0xffffff, 8);
    directionalLight.position.set(1, 1, 0);
    scene.add(directionalLight);
    scene.add(new AmbientLight(0xffffff, 4));

    // MORE DANCERS with smooth movement!
    const walkerSystems = Array.from({ length: 5 }, (_, index) => {
        const startPos = new Vector3(
            (Math.random() - 0.5) * 360,
            (Math.random() - 0.5) * 360,
            (Math.random() - 0.5) * 360
        );

        // Create smooth noise generators for each axis
        const noiseX = new SmoothNoise();
        const noiseY = new SmoothNoise();
        const noiseZ = new SmoothNoise();

        return {
            currentPos: startPos.clone(),
            targetPos: startPos.clone(),
            noiseX, noiseY, noiseZ,
            velocityScale: 0, // For smooth scaling
            emissiveScale: 4.8, // For smooth emission
            walker: new Mesh(
                new BoxGeometry(8, 8, 8),
                new MeshStandardMaterial({
                    color: new Color().setHSL(index * 0.2, 1, 0.5),
                    emissive: new Color().setHSL(index * 0.2, 1, 0.5),
                    emissiveIntensity: 4.8,
                    metalness: 1.0,
                    roughness: 0.1
                })
            ),
            pointLight: new PointLight(new Color().setHSL(index * 0.2, 1, 0.5), 16, 120),
            trails: Array.from({ length: 5 }, () => [] as Vector3[]),
            trailMaterials: [
                new LineBasicMaterial({ color: new Color().setHSL(index * 0.2, 1, 0.5), linewidth: 60 }),
                new LineBasicMaterial({ color: new Color().setHSL(index * 0.2 + 0.1, 1, 0.5), linewidth: 48 }),
                new LineBasicMaterial({ color: new Color().setHSL(index * 0.2 + 0.2, 1, 0.5), linewidth: 36 }),
                new LineBasicMaterial({ color: new Color().setHSL(index * 0.2 + 0.3, 1, 0.5), linewidth: 24 }),
                new LineBasicMaterial({ color: 0xffffff, linewidth: 12 })
            ]
        };
    });

    walkerSystems.forEach(system => {
        scene.add(system.walker);
        scene.add(system.pointLight);
    });

    // Smooth camera properties
    const smoothCamera = {
        distance: 320,
        targetDistance: 320,
        height: 20,
        targetHeight: 20,
        roll: 0,
        targetRoll: 0,
        orbit: 0,
        centerPoint: new Vector3()
    };

    camera.position.set(0, 120, -240);
    camera.lookAt(0, 0, 0);

    function updateTrails() {
        scene.children = scene.children.filter(child => !(child instanceof Line));

        walkerSystems.forEach(system => {
            system.trails.forEach((trailPoints, trailIndex) => {
                const offset = new Vector3(
                    Math.sin(trailIndex * 0.4) * 2.4,
                    Math.cos(trailIndex * 0.4) * 2.4,
                    Math.sin(trailIndex * 0.4) * 2.4
                );

                const offsetPoints = trailPoints.map(p => p.clone().add(offset));
                const lineGeometry = new BufferGeometry().setFromPoints(offsetPoints);
                const line = new Line(lineGeometry, system.trailMaterials[trailIndex]);
                scene.add(line);
            });
        });
    }

    function animate() {
        const time = Date.now() * 0.002;

        walkerSystems.forEach((system, index) => {
            // Smooth random walk using noise
            system.targetPos.x += system.noiseX.update(0.05) * 24;
            system.targetPos.y += system.noiseY.update(0.05) * 24;
            system.targetPos.z += system.noiseZ.update(0.05) * 24;

            // Smooth boundary enforcement
            system.targetPos.x = Math.max(Math.min(system.targetPos.x, 240), -240);
            system.targetPos.y = Math.max(Math.min(system.targetPos.y, 240), -240);
            system.targetPos.z = Math.max(Math.min(system.targetPos.z, 240), -240);

            // Smooth position updates
            system.currentPos.x = lerp(system.currentPos.x, system.targetPos.x, 0.1);
            system.currentPos.y = lerp(system.currentPos.y, system.targetPos.y, 0.1);
            system.currentPos.z = lerp(system.currentPos.z, system.targetPos.z, 0.1);

            // Smooth scaling and pulsing
            const targetScale = 1 + Math.sin(time * 8 + index) * 0.8;
            system.velocityScale = lerp(system.velocityScale, targetScale, 0.1);
            system.walker.scale.set(system.velocityScale, system.velocityScale, system.velocityScale);

            const targetEmissive = 4.8 + Math.sin(time * 12 + index) * 3.2;
            system.emissiveScale = lerp(system.emissiveScale, targetEmissive, 0.1);
            system.walker.material.emissiveIntensity = system.emissiveScale;

            system.walker.position.copy(system.currentPos);
            system.pointLight.position.copy(system.currentPos);

            // Smooth trails
            system.trails.forEach(trailPoints => {
                trailPoints.push(system.currentPos.clone());
                const maxLength = 300 + Math.sin(time * 4) * 100;
                while (trailPoints.length > maxLength) trailPoints.shift();
            });

            // Smooth rotation
            system.walker.rotation.x += 0.08 * smoothstep(Math.sin(time * 0.5));
            system.walker.rotation.y += 0.08 * smoothstep(Math.sin(time * 0.6));
            system.walker.rotation.z += 0.04 * smoothstep(Math.sin(time * 0.7));
        });

        updateTrails();

        // Smooth camera targeting
        const newCenterPoint = new Vector3();
        walkerSystems.forEach(system => {
            newCenterPoint.add(system.currentPos);
        });
        newCenterPoint.divideScalar(walkerSystems.length);

        smoothCamera.centerPoint.lerp(newCenterPoint, 0.05);

        // Ultra-smooth camera movement
        smoothCamera.targetDistance = 320 + Math.sin(time * 0.4) * 180;
        smoothCamera.distance = lerp(smoothCamera.distance, smoothCamera.targetDistance, 0.02);

        smoothCamera.targetHeight = 20 + Math.sin(time * 0.3) * 40;
        smoothCamera.height = lerp(smoothCamera.height, smoothCamera.targetHeight, 0.02);

        smoothCamera.orbit += 0.05 * smoothstep(Math.sin(time * 0.2)) * 0.2;

        smoothCamera.targetRoll = Math.sin(time * 0.08) * 0.15;
        smoothCamera.roll = lerp(smoothCamera.roll, smoothCamera.targetRoll, 0.02);

        // Apply smooth camera transforms
        camera.position.x = Math.sin(smoothCamera.orbit) * smoothCamera.distance;
        camera.position.y = smoothCamera.height + Math.sin(time * 0.25) * 20;
        camera.position.z = Math.cos(smoothCamera.orbit) * smoothCamera.distance;

        camera.lookAt(smoothCamera.centerPoint);
        camera.rotation.z = smoothCamera.roll;

        requestAnimationFrame(animate);
    }

    animate();
});