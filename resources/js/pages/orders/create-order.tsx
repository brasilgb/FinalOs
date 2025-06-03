import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, Save, Wrench } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { statusOrcamento } from "@/Utils/dataSelect";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Ordens',
    href: '/orders',
  },
  {
    title: 'Adicionar',
    href: '/add-order',
  },
];

export default function CreateOrder({ customers }: any) {
  const { flash } = usePage().props as any;
  const { data, setData, post, progress, processing, reset, errors } = useForm({
    customer_id: '',
    equipment: '', // equipamento
    model: '',
    password: '',
    defect: '',
    state_conservation: '', //estado de conservação
    accessories: '',
    budget_description: '', // descrição do orçamento
    budget_value: '', // valor do orçamento
    service_status: '',
    delivery_forecast: '', // previsao de entrega
    observations: '',
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    post(route('orders.store'), {
      onSuccess: () => reset(),
    });
  }

  const changeCustomer = (selected: any) => {
    setData('customer_id', selected);
  }
console.log(data.customer_id);

  return (
    <AppLayout>
      <Head title="Ordens" />
      <div className='flex items-center justify-between h-16 px-4 mb-4'>
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
          <Button variant={'default'} asChild>
            <Link
              href={route('orders.index')}
            >
              <ArrowLeft h-4 w-4 />
              <span>Voltar</span>
            </Link>
          </Button>
        </div>
        <div>
        </div>
      </div>

      <div className='p-4'>
        <div className='border rounded-lg p-2'>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-8 gap-4 mt-4">

              <div className="col-span-2 grid gap-2">
                <Label htmlFor="customer_id">Cliente</Label>
                  <Select onValueChange={changeCustomer} defaultValue={data.customer_id}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o cliente" defaultValue={data.customer_id}/>
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer: any) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.customer_id && <div className="text-red-500 text-sm">{errors.customer_id}</div>}
              </div>

              <div className="col-span-2 grid gap-2">
                <Label htmlFor="equipment">Equipamento</Label>
                <Input
                  type="text"
                  id="equipment"
                  value={data.equipment}
                  onChange={(e) => setData('equipment', e.target.value)}
                />
                {errors.equipment && <div className="text-red-500 text-sm">{errors.equipment}</div>}
              </div>

              <div className="col-span-2 grid gap-2">
                <Label htmlFor="model">Modelo</Label>
                <Input
                  type="text"
                  id="model"
                  value={data.model}
                  onChange={(e) => setData('model', e.target.value)}
                />
                {errors.model && <div className="text-red-500 text-sm">{errors.model}</div>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  type="text"
                  id="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                />
                {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="delivery_forecast">Previsão de entrada</Label>
                <Input
                  type="date"
                  id="delivery_forecast"
                  value={data.delivery_forecast}
                  onChange={(e) => setData('delivery_forecast', e.target.value)}
                />
                {errors.delivery_forecast && <div className="text-red-500 text-sm">{errors.delivery_forecast}</div>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">

              <div className="grid gap-2">
                <Label htmlFor="defect">Defeito relatado</Label>
                <Textarea
                  id="defect"
                  value={data.defect}
                  onChange={(e) => setData('defect', e.target.value)}
                />
                {errors.defect && <div className="text-red-500 text-sm">{errors.defect}</div>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="state_conservation">Estado de conservação</Label>
                <Textarea
                  id="state_conservation"
                  value={data.state_conservation}
                  onChange={(e) => setData('state_conservation', e.target.value)}
                />
                {errors.state_conservation && <div>{errors.state_conservation}</div>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="accessories">Acessórios</Label>
                <Textarea
                  id="accessories"
                  value={data.accessories}
                  onChange={(e) => setData('accessories', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="grid gap-2 col-span-2">
                <Label htmlFor="budget_description">Descrição pré-orcamento</Label>
                <Textarea
                  id="budget_description"
                  value={data.budget_description}
                  onChange={(e) => setData('budget_description', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="budget_value">Valor pré-orçamento</Label>
                <Input
                  type="text"
                  id="budget_value"
                  value={data.budget_value}
                  onChange={(e) => setData('budget_value', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="service_status">Status orçamento</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOrcamento.map((status: any) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="observations">Observações</Label>
              <Textarea
                id="observations"
                value={data.observations}
                onChange={(e) => setData('observations', e.target.value)}
              />
              {errors.observations && <div className="text-red-500 text-sm">{errors.observations}</div>}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={processing}>
                <Save />
                Salvar
              </Button>
            </div>
          </form>

        </div>
      </div>
    </AppLayout>
  )
}
