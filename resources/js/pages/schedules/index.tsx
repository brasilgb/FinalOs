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
import AppPagination from '@/components/app-pagination copy';
import ActionDelete from '@/components/action-delete';
import AlertSuccess from '@/components/app-alert-success';
import { statusAgendaByValue } from '@/Utils/functions';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
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

      <div className='flex items-center justify-between p-4'>
        <div>
          <InputSearch placeholder="Buscar agendamento" url="schedules.index" />
        </div>
        <div>
          <Button variant={'default'} asChild>
            <Link
              href={route('schedules.create')}
            >
              <Plus h-4 w-4 />
              <span>Agendamento</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className='p-4'>
        <div className='border rounded-lg'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">#</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Horário da visita</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Técnico</TableHead>
                <TableHead>Solicitação</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody> 
              {schedules?.data.length ?
                schedules?.data?.map((schedule: any) => (
                  <TableRow key={schedule.id}>
                    <TableCell>{schedule.id}</TableCell>
                    <TableCell className="font-medium">{schedule.customer.name}</TableCell>
                    <TableCell>{moment(schedule.created_at).format("DD/MM/YYYY")}</TableCell>
                    <TableCell>{schedule.service}</TableCell>
                    <TableCell>{statusAgendaByValue(schedule.status)}</TableCell>
                    <TableCell>{schedule.user.name}</TableCell>
                    <TableCell>{moment(schedule.created_at).format("DD/MM/YYYY")}</TableCell>
                    <TableCell className='flex justify-end gap-2'>

                      <Button asChild size="icon" className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Link href={route("schedules.edit", schedule.id)}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>

                      <ActionDelete title={'este agendamento'} url={'schedules.destroy'} param={schedule.id} />

                    </TableCell>
                  </TableRow>
                ))
                : (
                  <TableRow>
                    <TableCell colSpan={7} className='h-16 w-full flex items-center justify-center'>
                      Não há dados a serem mostrados no momento.
                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
            {schedules?.data.length > schedules?.total &&
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={7}>
                    <AppPagination data={schedules} />
                  </TableCell>
                </TableRow>
              </TableFooter>
            }
          </Table>
        </div>
      </div>
    </AppLayout>
  )
}
