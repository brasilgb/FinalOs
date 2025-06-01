import { Breadcrumbs } from '@/components/breadcrumbs'
import { Icon } from '@/components/icon';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, Customer } from '@/types';
import { Head, Link } from '@inertiajs/react'
import { Edit, Plus, Trash2, User } from 'lucide-react';
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

  return (
    <AppLayout>
      <Head title="Clientes" />
      <div className='flex items-center justify-between h-16 px-4 mb-4'>
        <div className='flex items-center gap-2'>
          <Icon iconNode={User} className='w-8 h-8' />
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
                    <TableCell>{customer.cpf}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{moment(customer.created_at).format("DD/MM/YYYY")}</TableCell>
                    <TableCell className='flex justify-end gap-2'>
                      <Button variant={'secondary'} size={'icon'}>
                        <Edit />
                      </Button>
                      <Button variant={'secondary'} size={'icon'}>
                        <Edit />
                      </Button>
                      <Button variant={'secondary'} size={'icon'}>
                        <Edit />
                      </Button>
                      <Button variant={'destructive'} size={'icon'}>
                        <Trash2 />
                      </Button>
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
