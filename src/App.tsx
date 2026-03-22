import { useState } from 'react'
import SplashPage     from './pages/SplashPage'
import CategoriesPage from './pages/CategoriesPage'
import RequestPage    from './pages/RequestPage'
import SuccessPage    from './pages/SuccessPage'
import { type Category } from './lib/config'

type Screen = 'splash' | 'categories' | 'request' | 'success'

export default function App() {
  const [screen,   setScreen]   = useState<Screen>('splash')
  const [prev,     setPrev]     = useState<Screen>('splash')
  const [selCat,   setSelCat]   = useState<Category | null>(null)
  const [subName,  setSubName]  = useState('')
  const [subDesc,  setSubDesc]  = useState('')

  function go(next: Screen) { setPrev(screen); setScreen(next) }

  function pageClass(s: Screen) {
    if (screen === s) return 'page page-enter'
    if (prev   === s) return 'page page-exit'
    return 'page page-hidden'
  }

  return (
    <div className="phone-shell">
      <div className={pageClass('splash')}>
        <SplashPage onStart={() => go('categories')} />
      </div>
      <div className={pageClass('categories')}>
        <CategoriesPage
          onSelect={cat => { setSelCat(cat); go('request') }}
          onBack={()  => go('splash')}
        />
      </div>
      <div className={pageClass('request')}>
        {selCat && (
          <RequestPage
            key={selCat.id}
            category={selCat}
            onBack={() => go('categories')}
            onSubmit={(name, desc) => { setSubName(name); setSubDesc(desc); go('success') }}
          />
        )}
      </div>
      <div className={pageClass('success')}>
        {selCat && (
          <SuccessPage
            category={selCat}
            name={subName}
            desc={subDesc}
            onBack={() => { setScreen('splash'); setPrev('success') }}
          />
        )}
      </div>
    </div>
  )
}
