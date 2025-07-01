import { Breadcrumbs } from '@/components/breadcrumbs'
import { Icon } from '@/components/icon';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react'
import { Plus, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AlertSuccess from '@/components/app-alert-success';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/',
  },
  {
    title: 'Ordens',
    href: '/orders',
  },
];

export default function Orders({ orders }: any) {
  const { flash } = usePage().props as any;

  return (
    <AppLayout>
      {flash.message && <AlertSuccess message={flash.message} />}
      <Head title="Ordens" />
      <div className='flex items-center justify-between h-16 px-4'>
        <div className='flex items-center gap-2'>
          <Icon iconNode={Wrench} className='w-8 h-8' />
          <h2 className="text-xl font-semibold tracking-tight">Ordens</h2>
        </div>
        <div>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </div>

      <div className='p-4'>
        <DataTable
          columns={columns}
          data={orders}
          label="Ordens"
          link={
            <Button asChild>
              <Link href={route('orders.create')}>
                <Plus />Nova Ordem
              </Link>
            </Button>
          }
          filter="id"
        />
      </div>
    </AppLayout>
  )
}
