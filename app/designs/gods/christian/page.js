import FaithIndexPage, { faithMetadata } from '@/components/Gods/FaithIndexPage'

export const metadata = faithMetadata('christian')

export default function Page() {
    return <FaithIndexPage faith="christian" />
}
