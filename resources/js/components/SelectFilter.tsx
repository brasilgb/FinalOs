import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { statusServico } from "@/Utils/dataSelect"
import { useForm, usePage } from "@inertiajs/react";
import { Filter } from "lucide-react";

export default function SelectFilter() {
    const { ziggy } = usePage().props as any;
    const { status } = (ziggy as any).query

    const { data, setData, get } = useForm({
        statusorder: status || '',
    });

    function handleSubmit() {
        console.log("Selected status:", data.statusorder);
        get(route('orders.index', { "status": `${data.statusorder}` }));
    }

    return (
        <div className="flex items-center space-x-2">
            <Select defaultValue={`${data.statusorder}`} value={`${data.statusorder}`} onValueChange={(value) => setData("statusorder", value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar ordem" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        {statusServico.map((status) => (
                            <SelectItem key={status.value} value={`${status.value}`}>
                                {status.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <button type="button" onClick={handleSubmit} >
                <Filter className="w-5 h-5 text-gray-500" />
            </button>
        </div>
    )
}

