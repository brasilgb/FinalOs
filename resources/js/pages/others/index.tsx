import AlertSuccess from '@/components/app-alert-success'
import AppearanceTabs from '@/components/appearance-tabs'
import { Breadcrumbs } from '@/components/breadcrumbs'
import HeadingSmall from '@/components/heading-small'
import { Icon } from '@/components/icon'
import InputSearch from '@/components/inputSearch'
import { Button } from '@/components/ui/button'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head, Link } from '@inertiajs/react'
import { Wrench } from 'lucide-react'
import React from 'react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Outras configurações',
        href: '/others',
    },
];

export default function Others() {
    return (
        <AppLayout>

            <Head title="Outras configurações" />
            <div className='flex items-center justify-between h-16 px-4'>
                <div className='flex items-center gap-2'>
                    <Icon iconNode={Wrench} className='w-8 h-8' />
                    <h2 className="text-xl font-semibold tracking-tight">Outras configurações</h2>
                </div>
                <div>
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>

            <div className='p-4'>
                <div className="space-y-6">
                    <HeadingSmall title="Configurações de aparência" description="Altere a aparencia do sistema entre temas claro ou escuro." />
                    <AppearanceTabs />
                </div>
            </div>
        </AppLayout>
    )
}
