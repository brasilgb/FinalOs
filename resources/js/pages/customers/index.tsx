import { Breadcrumbs } from '@/components/breadcrumbs'
import { Icon } from '@/components/icon';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react'
import { Pencil, Plus, Users, Wrench } from 'lucide-react';
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
    title: 'Clientes',
    href: '/customers',
  },
];

export default function Customers({ customers }: any) {
  const { flash } = usePage().props as any;

  return (
    <AppLayout>
       {flash.message && <AlertSuccess message={flash.message} />}
      <Head title="Clientes" />
      <div className='flex items-center justify-between h-16 px-4 mb-4'>
        <div className='flex items-center gap-2'>
          <Icon iconNode={Users} className='w-8 h-8' />
          <h2 className="text-xl font-semibold tracking-tight">Clientes</h2>
        </div>
        <div>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </div>

      <div className='flex items-center justify-between p-4'>
        <div>
          <InputSearch placeholder="Buscar cliente" url="customers.index" />
        </div>
        <div>
          <Button variant={'default'} asChild>
            <Link
              href={route('customers.create')}
            >
              <Plus h-4 w-4 />
              <span>Cliente</span>
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
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>CPF/CNPJ</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Cadastro</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers?.data.length ?
                customers?.data?.map((customer: any) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.id}</TableCell>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{maskCpfCnpj(customer.cpf)}</TableCell>
                    <TableCell>{maskPhone(customer.phone)}</TableCell>
                    <TableCell>{moment(customer.created_at).format("DD/MM/YYYY")}</TableCell>
                    <TableCell className='flex justify-end gap-2'>

                      <Button asChild size="icon" className="bg-sky-500 hover:bg-sky-600 text-white">
                        <Link href={`/orders?cl=${customer.id}`}>
                          <Wrench className="h-4 w-4" />
                        </Link>
                      </Button>

                      <Button asChild size="icon" className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Link href={route("customers.edit", customer.id)}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>

                      <ActionDelete title={'este cliente'} url={'customers.destroy'} param={customer.id} />

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
            {customers?.data.length > customers?.total &&
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={7}>
                    <AppPagination data={customers} />
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
