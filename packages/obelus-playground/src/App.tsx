import { useThreeRenderer } from './hooks/useThreeRenderer'

function App() {

  const { canvasRef } = useThreeRenderer();

  return (
    <>

      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', backgroundColor: 'aqua' }} />
    </>
  )
}

export default App
