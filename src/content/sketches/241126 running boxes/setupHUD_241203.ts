/**
 * Sets up the Heads-Up Display (HUD).
 */
export const setupHUD = (canvas: HTMLCanvasElement): HTMLDivElement => {
    const hud = document.createElement('div');
    Object.assign(hud.style, {
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        color: 'black',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: '5px 10px',
        fontFamily: 'monospace',
        fontSize: '14px',
        textAlign: 'right',
        pointerEvents: 'none',
        zIndex: '100',
        maxWidth: 'calc(100% - 20px)',
        boxSizing: 'border-box',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    });

    const parent = canvas.parentElement;
    if (parent) {
        const computedStyle = getComputedStyle(parent);
        if (computedStyle.position === 'static') {
            parent.style.position = 'relative';
        }
        parent.appendChild(hud);
    } else {
        console.warn('Canvas has no parent element. HUD will not be displayed.');
    }

    return hud;
};
