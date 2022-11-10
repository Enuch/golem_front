import { Field, FieldArray, FormikProvider, useFormik } from "formik";
import { RequestController } from "./Request.controller";
import { useContext, useEffect, useState } from "react";
import { TMaterial } from "../../types/TMaterial";
import { MaterialController } from "../material/Material.controller";
import { MaterialRequestController } from "./MaterialRequest.controller";
import { TMaterialRequest } from "../../types/TMaterialRequest";
import { AuthContext } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const FormRequest = () => {
    const auth = useContext(AuthContext);
    const obj = { requested_user_id: auth.user?.id }
    const navigate = useNavigate();

    const controller = RequestController();
    const controllerMaterialRequest = MaterialRequestController();
    const controllerMaterial = MaterialController();
    const formik = useFormik({
        initialValues: {
            request: [{ material_id: 0, amount_requested: 0 }],
        },
        onSubmit: (values) => {
            const newValues = values.request
            createR(newValues);
        },
    });

    const [materials, setMaterials] = useState<TMaterial[]>([]);

    useEffect(() => {
        controllerMaterial.findAll(setMaterials);
    }, []);

    const createR = async (data_MR: TMaterialRequest[]) => {
        let newData = data_MR.map((data) => ({
            amount_requested: data.amount_requested,
            amount_received: 0,
            material_id: Number.parseInt(data.material_id.toString()),
            request_id: 0
        }))
        const request = controller.create(obj);
        await request.then((response) => {
            newData = data_MR.map((data) => ({
                amount_requested: data.amount_requested,
                amount_received: 0,
                material_id: Number.parseInt(data.material_id.toString()),
                request_id: response.id

            }))
        })
        controllerMaterialRequest.createMany(newData);
        navigate(`/request`)
    };

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">
                    <span className="text-muted fw-light">Requisições /</span> Formulário
                </h4>

                {/* <!-- Basic Layout --> */}
                <div className="row">
                    <div className="col-xl">
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Cadastrar Requisição</h5>
                                <small className="text-muted float-end">Default label</small>
                            </div>
                            <div className="card-body">
                                <FormikProvider value={formik}>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="mb-3">

                                            <FieldArray
                                                name="request"
                                                render={(arrayHelpers) => (
                                                    <div>
                                                        {formik.values.request.map((request, index) => (
                                                            <div key={index}>
                                                                <label className="form-label" htmlFor="material_id">
                                                                    Material
                                                                </label>
                                                                <Field
                                                                    type="number"
                                                                    as="select"
                                                                    id="category_id"
                                                                    name={`request[${index}].material_id`}
                                                                    className="form-select"
                                                                    aria-label="Default select example"
                                                                >
                                                                    <option value={0}>Selecione um material</option>
                                                                    {materials.map((item) => {
                                                                        return (
                                                                            <option key={item.id} value={item.id}>
                                                                                {item.name}
                                                                            </option>
                                                                        );
                                                                    })}
                                                                </Field>
                                                                <label className="form-label" htmlFor="amount_requeted">
                                                                    Quantidade
                                                                </label>
                                                                <Field type="number" className="form-control" name={`request[${index}].amount_requested`} />


                                                                {(formik.values.request.length === 1) ? null :
                                                                    <button
                                                                        className="btn btn-primary"
                                                                        style={{ margin: '10px' }}
                                                                        type="button"
                                                                        onClick={() => arrayHelpers.remove(index)}
                                                                    >
                                                                        Remover
                                                                    </button>}
                                                                <button
                                                                    style={{ margin: '10px' }}
                                                                    className="btn btn-primary"
                                                                    type="button"
                                                                    onClick={() =>
                                                                        arrayHelpers.push({ material_id: 0, amount_requested: 0 })
                                                                    }
                                                                >
                                                                    Adicionar
                                                                </button>
                                                            </div>
                                                        ))}

                                                    </div>
                                                )}
                                            />

                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Cadastrar
                                        </button>
                                    </form>
                                </FormikProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
