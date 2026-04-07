import AdminClient from '@/components/Admin/AdminClient'

export const metadata = {
    title: 'Admin Dashboard | RG Tech Engineering Control Panel',
    robots: {
        index: false,
        follow: false,
    }
}

export default function AdminPage() {
    return <AdminClient />
}
