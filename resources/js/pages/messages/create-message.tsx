import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, MessageSquareMore, Save } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Select from 'react-select';
import InputError from "@/components/input-error";
import { Switch } from "@/components/ui/switch";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/',
  },
  {
    title: 'Mensagens',
    href: '/messages',
  },
  {
    title: 'Adicionar',
    href: '/messages',
  },
];

export default function CreateMessage({ users }: any) {
  const { flash, auth } = usePage().props as any;

  const optionsUser = users.map((user: any) => ({
    value: user.id,
    label: user.name,
  }));

  const { data, setData, post, progress, processing, reset, errors } = useForm({
    'sender_id': auth.user.id,
    'recipient_id': '',
    'title': '',
    'message': '',
    'status': false,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    post(route('messages.store'), {
      onSuccess: () => reset(),
    });
  }

  const changeMessageRecept = (selected: any) => {
    setData('recipient_id', selected?.value);
  };

  return (
    <AppLayout>
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

      <div className='flex items-center justify-between p-4'>
        <div>
          <Button variant={'default'} asChild>
            <Link
              href={route('messages.index')}
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
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="sender_id">Remetente</Label>
                <Input
                  value={auth.user.name}
                  readOnly
                  type="text"
                  id="sender"
                  onChange={(e) => setData('sender_id', e.target.value)}
                />
              </div>

              <div className=" grid gap-2">
                <Label htmlFor="recipient_id">Para</Label>
                <Select
                  options={optionsUser}
                  onChange={changeMessageRecept}
                  placeholder="Selecione o recebedor"
                  className="shadow-xs p-0 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-9"
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      fontSize: '14px',
                      boxShadow: 'none',
                      border: 'none',
                      background: 'transparent',
                      paddingBottom: '2px',
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,

                    }),
                    menuList: (base) => ({
                      ...base,
                      fontSize: '14px',
                    }),
                  }}
                />
                <InputError className="mt-2" message={errors.recipient_id} />
              </div>

            </div>

            <div className="grid gap-2">
              <Label htmlFor="service">Título</Label>
              <Input
                id="title"
                type="text"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
              />
              {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                value={data.message}
                onChange={(e) => setData('message', e.target.value)}
              />
              {errors.message && <div className="text-red-500 text-sm">{errors.message}</div>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status de leitura</Label>
              <Switch
                id="status"
                checked={data.status}
                onCheckedChange={(checked: any) => setData('status', checked)}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={processing}>
                <Save />
                Salvar
              </Button>
            </div>
          </form>

        </div>
      </div >
    </AppLayout >
  )
}
