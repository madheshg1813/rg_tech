import FaithIndexPage, { faithMetadata } from '@/components/Gods/FaithIndexPage'

export const metadata = faithMetadata('islamic')

export default function Page() {
    return <FaithIndexPage faith="islamic" />
}
