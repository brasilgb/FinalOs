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
import { Pencil, Save } from "lucide-react"
import { useForm } from "@inertiajs/react"
import Select from 'react-select';

export default function EditModel({ brands, model }: any) {
    const [open, setOpen] = useState(false)

    const { data, setData, processing, patch, errors, reset } = useForm({
        brand_id: model.brand_id,
        model: model.model,
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        patch(route('register-models.update', model.id), {
            onSuccess: () => {
                setOpen(false);
            }
        });
    }

    const optionsBrands = brands.map((brand: any) => ({
        value: brand.id,
        label: brand.brand,
    }));

    const changeCustomer = (selected: any) => {
        setData('brand_id', selected?.value);
    };

    const defaultBrand = optionsBrands?.filter((o: any) => o.value == model?.brand_id).map((opt: any) => ({ value: opt.value, label: opt.label }));

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
                        <DialogTitle>Editar Marca do Equipamento</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="col-span-2 grid gap-2">
                            <Label htmlFor="brand_id">Marca</Label>
                            <Select
                                defaultValue={defaultBrand}
                                options={optionsBrands}
                                onChange={changeCustomer}
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
                            {errors.brand_id && <div className="text-red-500 text-sm">{errors.brand_id}</div>}
                        </div>

                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="model">Nome do Modelo *</Label>
                                <Input
                                    id="model"
                                    value={data.model}
                                    onChange={(e) => setData("model", e.target.value)}
                                />
                                {errors.model && <div className="text-red-500 text-sm">{errors.model}</div>}
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
