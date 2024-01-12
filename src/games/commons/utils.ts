export const safeRun = async (run: () => Promise<any>, animate: () => void, cancelAnimate: () => void) => {
    try {
        animate();
        await run();
    } catch (error) {
        console.log(error);
    } finally {
        cancelAnimate();
    }
}
