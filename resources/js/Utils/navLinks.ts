import { type NavItem } from '@/types';
import { Link as linkmegb, Calendar, Cog, FilePlus2, Folder, LayoutGrid, MessageSquareMore, PackagePlus, User, UserCog, Users, Users2, Wrench, Building, MessageCircleCode, Printer, Tags, CogIcon, Copyright, Monitor, Sparkles, ClipboardList, Blocks } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/',
        icon: LayoutGrid,
    },
    {
        title: 'Clientes',
        href: '/customers',
        icon: Users2,
    },
    {
        title: 'Ordens de serviço',
        href: '/orders',
        icon: Wrench,
    },
    {
        title: 'Agendamentos',
        href: '/schedules',
        icon: Calendar,
    },
    {
        title: 'Mensagens',
        href: '/messages',
        icon: MessageSquareMore,
    },
];
const mainUserItems: NavItem[] = [
    {
        title: 'Usuários',
        href: '/users',
        icon: UserCog,
    },
];

const mainConfItems = [
    {
        title: "Configurações",
        url: "#",
        icon: Cog,
        items: [
            {
                title: 'Dados da empresa',
                url: '/company',
                icon: Building,
            },
            {
                title: 'Mensagens do Whatsapp',
                url: '/whatsapp-message',
                icon: MessageCircleCode,
            },
            {
                title: 'Impressões de recibos',
                url: '/receipts',
                icon: Printer,
            },
            {
                title: 'Impressão de etiquetas',
                url: '/label-printing',
                icon: Tags,
            },
            {
                title: 'Tipo de equipamento',
                url: '/register-equipments',
                icon: Monitor,
            },
            {
                title: 'Checklist',
                url: '/register-checklists',
                icon: ClipboardList,
            },
            {
                title: 'Outras configurações',
                url: '/other-settings',
                icon: CogIcon,
            },
        ]
    }
];

const mainRegisterItems = [
    {
        title: "Cadastros",
        url: "#",
        icon: PackagePlus,
        items: [
            {
                title: 'Cadastrar marcas',
                url: '/register-brands',
                icon: Copyright,
            },
            {
                title: 'Cadastrar modelos',
                url: '/register-models',
                icon: Sparkles,
            },
            {
                title: 'Cadastrar serviços',
                url: '/register-services',
                icon: Wrench,
            },
            {
                title: 'Cadastrar orçamentos',
                url: '/register-budgets',
                icon: Blocks,
            },
        ]
    }
];

const footerNavItems: NavItem[] = [
    {
        title: 'MEGB',
        href: 'https://megb.com.br',
        icon: linkmegb,
    },
];

export { mainNavItems, mainUserItems ,mainConfItems, mainRegisterItems,footerNavItems};