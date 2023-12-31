import { useContext, useEffect, useState } from 'react'
import SidebarContext, { SidebarProvider } from 'context/SidebarContext'
import Sidebar from '@/components/Sidebar'
import Main from './Main'
// import { useAuth } from 'hooks/auth'
import Loader from '~/components/Loader/Loader'
import Loading from '~/components/Loading'
// import Loader from 'example/components/Loader/Loader'

interface ILayout {
  children: React.ReactNode
}

function Layout({ children }: ILayout) {
  const [showLoader, setShowLoaderState] = useState(true)

  // const { user, loading, logout } = useAuth({ middleware: 'auth' })
  const { isSidebarOpen } = useContext(SidebarContext)

  /*
  useEffect(() => {
    if (!loading && user) {
      setShowLoaderState(false)
    }

    return () => {
      setShowLoaderState(true)
    }
  }, [loading, user])
  */

//  return showLoader
//    ? <Loading show />
  return <SidebarProvider>
      <div
        className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}
      >
        <Sidebar />
        <div className="flex flex-col flex-1 w-full">
          <Main>
            {children}
          </Main>
        </div>
      </div>
    </SidebarProvider>
}

export default Layout