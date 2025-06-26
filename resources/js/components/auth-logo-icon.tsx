import { usePage } from '@inertiajs/react';
import { SVGAttributes } from 'react';

export default function AuthLogoIcon(props: SVGAttributes<SVGElement>) {
    const { company } = usePage().props as any;
    
    return (
        <div className='flex flex-col items-center'>
            <div className="flex aspect-square items-center justify-center border-4 rounded-full p-0.5">
                <img
                    className='bg-transparent h-12 w-12 rounded-full'
                    src={`${company?.logo ? '/storage/logos/' + company?.logo : "/default.png"}`}
                    alt="Imagem de logo"
                />
            </div>
        </div>
    );
}
