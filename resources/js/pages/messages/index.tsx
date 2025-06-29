import { Breadcrumbs } from '@/components/breadcrumbs'
import { Icon } from '@/components/icon';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react'
import { Eye, MessageSquareMore, Pencil, Plus } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { AppLoadMessage } from '@/components/app-load-message';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/',
  },
  {
    title: 'Mensagens',
    href: '/messages',
  },
];

export default function Messages({ messages }: any) {
  const { flash, auth } = usePage().props as any;
  return (
    <AppLayout>
      {flash.message && <AlertSuccess message={flash.message} />}
      <Head title="Mensagens" />
      <div className='flex items-center justify-between h-16 px-4'>
        <div className='flex items-center gap-2'>
          <Icon iconNode={MessageSquareMore} className='w-8 h-8' />
          <h2 className="text-xl font-semibold tracking-tight">Mensagens</h2>
        </div>
        <div>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </div>

      <div className='p-4'>
        <DataTable
          columns={columns}
          data={messages}
          label="Mensagens"
          link={
            <Button asChild>
              <Link href={route('messages.create')}>
                <Plus />Mensagem
              </Link>
            </Button>
          }
          filter="recipient_id"
        />
      </div>
    </AppLayout>
  )
}
