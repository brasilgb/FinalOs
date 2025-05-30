import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children}: AppLayoutProps) => (
    <AppLayoutTemplate>
        {children}
    </AppLayoutTemplate>
);
