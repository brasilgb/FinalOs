import moment from 'moment';

export default function AppFooter() {
    return (
        <footer className='w-full px-3 bg-white shadow-md border-sidebar-border/80 border-t flex items-center justify-between'>
            <div className='mx-auto h-8 flex items-center justify-between px-4 md:max-w-7xl w-full'>
                <span className='text-xs text-gray-600 font-medium'>&copy;{moment().format('YYYY')}</span>
                <span className='text-xs font-semibold'>MEGB</span>
            </div>
        </footer>
    )
}
