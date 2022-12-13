import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { TCategory } from "../../types/TCategory";
import { CategoryController } from "./Category.controller";
import * as Yup from 'yup'

let update = false

export const CategoryForm = () => {

    const controller = CategoryController();
    const [formValues, setFormValues] = useState<TCategory>()
    const [refresh, setRefresh] = useState<number>(0)
    const [initialValues, setInitialValues] = useState({ name: '', id: 0 })

    const formik = useFormik({
        initialValues: formValues || initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required("O nome é obrigatório!")
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            if (update === true) {
                updateC(values.id, values)
            } else {
                createC(values);
            }
            update = false;
            setFormValues(undefined)
        },
    });

    const createC = async (data: Object) => {
        await controller.create(data);
        toast.success("Categoria cadastrada!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setRefresh(refresh + 1)
    };

    const updateC = async (id: number, data: Object) => {
        await controller.update(id, data);
        toast.success("Categoria atualizada!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setRefresh(refresh + 1)
    };
    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">
                    <span className="text-muted fw-light">Categoria /</span> Formulário
                </h4>
                <div className="row">
                    <div className="col-xl">
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Cadastrar Categoria</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-3">
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label htmlFor="name" className="form-label">
                                                        Nome
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        className="form-control"
                                                        placeholder="ex: Higienicos"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.name}
                                                        required
                                                    />
                                                    {formik.touched.name && formik.errors.name ? (
                                                        <div style={{ color: 'red', fontWeight: 'bolder' }}>{formik.errors.name}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Cadastrar Categoria
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}