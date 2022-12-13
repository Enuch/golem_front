import { Field, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TCategory } from "../../types/TCategory";
import { TMaterial } from "../../types/TMaterial";
import { CategoryController } from "../category/Category.controller";
import { MaterialController } from "./Material.controller";
import * as Yup from "yup";

let update = false

export const MaterialForm = () => {

    const controller = MaterialController();
    const controllerCategory = CategoryController();

    const [categories, setCategories] = useState<TCategory[]>([]);
    const [refresh, setRefresh] = useState<number>(0);
    const [formValues, setFormValue] = useState<TMaterial>()
    const [initialValues, setInitialValues] = useState({
        name: "",
        origin: "",
        amount: "",
        category_id: 0,
        id: 0,
    })
    const formik = useFormik({
        initialValues: formValues || initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required("Obrigatório!"),
            origin: Yup.string().required("Obrigatório!"),
            amount: Yup.number().required("Obrigatório!"),
            category_id: Yup.number().min(1).moreThan(0, 'Obrigatório!').required("Obrigatório!"),
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            values.category_id = Number.parseInt(values.category_id.toString());

            if (update === true) {
                updateM(values.id, values as TMaterial)
            } else {
                createM(values);
            }
            update = false
            setFormValue(undefined)
        },
    });

    useEffect(() => {
        controllerCategory.findAll(setCategories);
    }, [refresh]);

    const createM = async (data: Object) => {
        await controller.create(data);
        toast.success("Material cadastrado!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setRefresh(refresh + 1);
    };

    const setUpdate = async (data: TMaterial) => {
        update = true;
        setFormValue(data)
    };

    const updateM = async (id: number, data: TMaterial) => {
        console.log(data)
        await controller.update(id, {
            name: data.name,
            origin: data.origin,
            amount: data.amount,
            category_id: data.category_id,
        });
        toast.success("Material atualizado!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setRefresh(refresh + 1);
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
                                <FormikProvider value={formik}>
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
                                                            className="form-control"
                                                            id="name"
                                                            name="name"
                                                            aria-describedby="defaultFormControlHelp"
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
                                                <div className="row">
                                                    <div className="col mb-3">
                                                        <label htmlFor="origin" className="form-label">
                                                            Origin
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="origin"
                                                            name="origin"
                                                            aria-describedby="defaultFormControlHelp"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.origin}
                                                            required
                                                        />
                                                        {formik.touched.origin && formik.errors.origin ? (
                                                            <div style={{ color: 'red', fontWeight: 'bolder' }}>{formik.errors.origin}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col mb-3">
                                                        <label htmlFor="amount" className="form-label">
                                                            Quantidade
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id="amount"
                                                            name="amount"
                                                            aria-describedby="defaultFormControlHelp"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.amount}
                                                            required
                                                        />
                                                        {formik.touched.amount && formik.errors.amount ? (
                                                            <div style={{ color: 'red', fontWeight: 'bolder' }}>{formik.errors.amount}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col mb-3">
                                                        <label htmlFor="category_id" className="form-label">
                                                            Categoria
                                                        </label>
                                                        <Field
                                                            type="number"
                                                            as="select"
                                                            id="category_id"
                                                            name="category_id"
                                                            className="form-select"
                                                            aria-label="Default select example"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.category_id}
                                                            required
                                                        >
                                                            <option value={0}>Selecione uma categoria</option>
                                                            {categories.map((category) => {
                                                                return (
                                                                    <option key={category.id} value={category.id}>
                                                                        {category.name}
                                                                    </option>
                                                                );
                                                            })}
                                                            {formik.touched.category_id && formik.errors.category_id ? (
                                                                <div style={{ color: 'red', fontWeight: 'bolder' }}>{formik.errors.category_id}</div>
                                                            ) : null}
                                                        </Field>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Cadastrar Categoria
                                        </button>
                                    </form>
                                </FormikProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}