import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Bot, Calendar, Cog, FilePlus2, Folder, LayoutGrid, MessageSquareMore, User, UserCog, Users, Users2, Wrench } from 'lucide-react';
import AppLogo from './app-logo';
import NavMainCollapsible from './nav-main-collapsible';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
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
                icon: LayoutGrid,
            },
            {
                title: 'Mensagens do Whatsapp',
                url: '/whatsapp-message',
                icon: LayoutGrid,
            },
            {
                title: 'Impressões de recibos',
                url: '/receipts',
                icon: LayoutGrid,
            },
            {
                title: 'Impressão de etiquetas',
                url: '/label-printing',
                icon: LayoutGrid,
            },
            {
                title: 'Outras configurações',
                url: '/other-settings',
                icon: LayoutGrid,
            },
        ]
    }
];

const mainOrcaItems = [
    {
        title: "Orçamentos",
        url: "#",
        icon: FilePlus2,
        items: [
            {
                title: 'Cadastrar marcas',
                url: '/register-brands',
                icon: LayoutGrid,
            },
            {
                title: 'Cadastrar modelos',
                url: '/register models',
                icon: LayoutGrid,
            },
            {
                title: 'Cadastrar serviços',
                url: '/register services',
                icon: LayoutGrid,
            },
            {
                title: 'Cadastrar pré-orçamentos',
                url: '/pre-budgets',
                icon: LayoutGrid,
            },
        ],
    }
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroupLabel>Operações do sistema</SidebarGroupLabel>
                <NavMain items={mainNavItems} />

                <NavMainCollapsible items={mainConfItems} />
                <NavMainCollapsible items={mainOrcaItems} />

                <NavMain items={mainUserItems} />
            </SidebarContent>
            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
            </SidebarFooter>
        </Sidebar>
    );
}
