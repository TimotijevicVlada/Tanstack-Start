import { Outlet, createFileRoute } from '@tanstack/react-router'
import Header from '@/components/Header'

export const Route = createFileRoute('/_private')({
  component: PrivateLayout,
  beforeLoad: () => {
    // Fake user for practice purposes
    const user = {
      id: '1',
      username: 'testuser',
      email: 'test@example.com',
    }

    // TODO: Replace with actual authentication check
    // if (!user) {
    //   throw redirect({
    //     to: '/login',
    //   })
    // }

    return { user }
  },
})

function PrivateLayout() {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          'linear-gradient(135deg, #0c1a2b 0%, #1a2332 50%, #16202e 100%)',
      }}
    >
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <Outlet />
      </div>
    </div>
  )
}
