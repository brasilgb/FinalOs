import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Plus, Save } from "lucide-react"
import { useForm } from "@inertiajs/react"
import Select from 'react-select';

export default function EditService({ equipments, service }: any) {
    const [open, setOpen] = useState(false)

    const { data, setData, processing, patch, errors, reset } = useForm({
        equipment_id: service?.equipment_id,
        service: service?.service
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        patch(route('register-services.update', service.id), {
            onSuccess: () => {
                reset()
                setOpen(false)
            },
        });

    }

    const optionsEquipment = equipments.map((equipment: any) => ({
        value: equipment.id,
        label: equipment.equipment,
    }));

    const changeEquipment = (selected: any) => {
        setData('equipment_id', selected?.value);
    };

    const defaultEquipment = optionsEquipment?.filter((o: any) => o.value == service?.equipment_id).map((opt: any) => ({ value: opt.value, label: opt.label }));

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size={'icon'} className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Pencil className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Cadastrar Serviço</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} autoComplete="off">

                        <div className="col-span-2 grid gap-2">
                            <Label htmlFor="customer_id">Serviço</Label>
                            <Select
                                defaultValue={defaultEquipment}
                                options={optionsEquipment}
                                onChange={changeEquipment}
                                placeholder="Selecione a marca"
                                className="shadow-xs p-0 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-9"
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
                            {errors.equipment_id && <div className="text-red-500 text-sm">{errors.equipment_id}</div>}
                        </div>

                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="service">Serviço *</Label>
                                <Input
                                    id="service"
                                    value={data.service}
                                    onChange={(e) => setData("service", e.target.value)}
                                />
                                {errors.service && <div className="text-red-500 text-sm">{errors.service}</div>}
                            </div>
                        </div>

                        <DialogFooter className="gap-2">
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save />
                                Salvar
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
