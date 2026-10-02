import FaithIndexPage, { faithMetadata } from '@/components/Gods/FaithIndexPage'

export const metadata = faithMetadata('hindu')

export default function Page() {
    return <FaithIndexPage faith="hindu" />
}
