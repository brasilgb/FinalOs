import { Breadcrumbs } from '@/components/breadcrumbs'
import { Icon } from '@/components/icon';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react'
import { Calendar, Pencil, Plus } from 'lucide-react';
import moment from 'moment'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import InputSearch from '@/components/inputSearch';
import AppPagination from '@/components/app-pagination';
import ActionDelete from '@/components/action-delete';
import AlertSuccess from '@/components/app-alert-success';
import { statusAgendaByValue } from '@/Utils/functions';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/',
  },
  {
    title: 'Agendamentos',
    href: '/schedules',
  },
];

export default function Schedules({ schedules }: any) {
  const { flash } = usePage().props as any;

  return (
    <AppLayout>
      <Head title="Agendamentos" />
      {flash.message && <AlertSuccess message={flash.message} />}
      <div className='flex items-center justify-between h-16 px-4'>
        <div className='flex items-center gap-2'>
          <Icon iconNode={Calendar} className='w-8 h-8' />
          <h2 className="text-xl font-semibold tracking-tight">Agendamentos</h2>
        </div>
        <div>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </div>

      <div className='p-4'>
        <DataTable
          columns={columns}
          data={schedules}
          label="Agendamentos por cliente"
          link={
            <Button asChild>
              <Link href={route('schedules.create')}>
                <Plus />Agendamento
              </Link>
            </Button>
          }
          filter="customer_id"
        />
      </div>
    </AppLayout>
  )
}
