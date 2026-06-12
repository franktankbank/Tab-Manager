import Export from './Export.tsx'
import Import from './Import.tsx'
import Count from './Count.tsx'
import Unload from './Unload.tsx'
import Close from './Close.tsx'
import Switch from './Switch.tsx'
import Dedupe from './Dedupe.tsx'

function App() {
  return (
    <div className="gap-4 min-h-screen bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center flex-col">
      <Export/>
      <Import/>
      <Count/>
      <Unload/>
      <Close/>
      <Switch/>
      <Dedupe/>
    </div>
  )
}

export default App
