import { Breadcrumbs } from '@/components/breadcrumbs'
import { Icon } from '@/components/icon';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react'
import { ImageUp, Pencil, Plus, Users, Wrench } from 'lucide-react';
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
import { maskCpfCnpj, maskPhone } from '@/Utils/mask';
import AlertSuccess from '@/components/app-alert-success';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
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

      <div className='flex items-center justify-between p-4'>
        <div>
          <InputSearch placeholder="Buscar ordem" url="orders.index" />
        </div>
        <div>
          <Button variant={'default'} asChild>
            <Link
              href={route('orders.create')}
            >
              <Plus h-4 w-4 />
              <span>Ordem</span>
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
                <TableHead>Telefone</TableHead>
                <TableHead>Recebimento</TableHead>
                <TableHead>Equipamento</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Satus</TableHead>
                <TableHead>Entrega</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.data.length ?
                orders?.data?.map((order: any) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell className="font-medium">{order.customer.name}</TableCell>
                    <TableCell>{maskPhone(order.customer.phone)}</TableCell>
                    <TableCell>{moment(order.created_at).format("DD/MM/YYYY")}</TableCell>
                    <TableCell>{order.equipment}</TableCell>
                    <TableCell>{order.model}</TableCell>
                    <TableCell>{order.service_status}</TableCell>
                    <TableCell>{moment(order.delevery_date).format("DD/MM/YYYY")}</TableCell>
                    <TableCell className='flex justify-end gap-2'>

                      <Button asChild size="icon" className="bg-fuchsia-700 hover:bg-fuchsia-700 text-white">
                        <Link href={`/orders?cl=${order.id}`}>
                          <ImageUp className="h-4 w-4" />
                        </Link>
                      </Button>

                      <Button asChild size="icon" className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Link href={route("orders.edit", order.id)}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>

                      <ActionDelete title={'esta ordem'} url={'orders.destroy'} param={order.id} />

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
            {orders?.data.length > orders?.total &&
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={7}>
                    <AppPagination data={orders} />
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
