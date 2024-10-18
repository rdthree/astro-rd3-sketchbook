declare const threeId = "threetest";
interface CubeConfig {
    containerId: string;
    color: number;
    rotationSpeed: number;
}
declare const createRotatingCube: ({ containerId, color, rotationSpeed }?: Partial<CubeConfig>) => void;
declare const init: () => void;
