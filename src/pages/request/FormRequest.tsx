import { Field, FieldArray, FormikProvider, useFormik } from "formik";
import { RequestController } from "./Request.controller";
import { useContext, useEffect, useState } from "react";
import { TMaterial } from "../../types/TMaterial";
import { MaterialController } from "../material/Material.controller";
import { MaterialRequestController } from "./MaterialRequest.controller";
import { TMaterialRequest } from "../../types/TMaterialRequest";
import { AuthContext } from "../../context/auth/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TRequest } from "../../types/TRequest";

type auxRequest = {
    material_id: number;
    amount_requested: number;
}

export const FormRequest = () => {
    const auth = useContext(AuthContext);
    const obj = { requested_user_id: auth.user?.id }
    const navigate = useNavigate();
    const { id } = useParams();
    const id_request = Number.parseInt(id!);

    const controller = RequestController();
    const controllerMaterialRequest = MaterialRequestController();
    const controllerMaterial = MaterialController();

    const [materials, setMaterials] = useState<TMaterial[]>([]);
    const [validaMaterials, setValidaMaterials] = useState<TMaterial[]>([]);
    const [requestAux, setRequestAux] = useState<TRequest>()
    let request: TRequest | auxRequest[] = [{ material_id: 0, amount_requested: 0 }];

    const updateOrCreate = async () => {
        if (id_request) {
            await controller.findOne(id_request, setRequestAux)
            request = requestAux!?.material_request.map(mr => ({
                material_id: mr.material_id,
                amount_requested: mr.amount_requested,
            }))
            console.log(request)
        }
    }

    useEffect(() => {
        controllerMaterial.findAll(setMaterials);
        updateOrCreate();

    }, []);

    const formik = useFormik({
        initialValues: {
            request,
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            const newValues = values.request
            await controllerMaterial.findAll(setValidaMaterials)
            validation(newValues)
        },
    });


    const validation = async (data: any) => {
        let errors = true;
        data.forEach((value: { material_id: { toString: () => string; }; amount_requested: number; }) => {
            validaMaterials.forEach(material => {
                if (material.id === Number.parseInt(value.material_id.toString())) {
                    if (material.amount < value.amount_requested) {
                        toast.warning(`Quantidade pedida excede o limite do estoque! Material: ${material.name}, quantidade em estoque: ${material.amount}`, {
                            position: "top-center",
                            autoClose: 10000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        errors = true;
                    } else {
                        errors = false;
                    }
                }
            })
        })
        if (!errors) {
            await createR(data)
            navigate('/request')
        }

    }

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

        data_MR.forEach(async data => {
            validaMaterials.forEach(async material => {
                if (Number.parseInt(data.material_id.toString()) === material.id) {
                    await controllerMaterial.update(material.id, { amount: material.amount - data.amount_requested })
                    console.log(material.amount - data.amount_requested)
                }
            })
        })

        // for (const key of data_MR) {
        //     await controllerMaterial.update(key.material_id, {
        //         amount: key.amount_requested,
        //     });
        // }

        await controllerMaterialRequest.createMany(newData);
        toast.success(`Requisi????o cadastrada!`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">
                    <span className="text-muted fw-light">Requisi????es /</span> Formul??rio
                </h4>

                {/* <!-- Basic Layout --> */}
                <div className="row">
                    <div className="col-xl">
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Cadastrar Requisi????o</h5>
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
                                                                <div className="mb-3">
                                                                    <label className="form-label" htmlFor="material_id">
                                                                        Material
                                                                    </label>
                                                                    <Field
                                                                        type="number"
                                                                        as="select"
                                                                        id="category_id"
                                                                        name={`request[${index}].material_id`}
                                                                        value={request.material_id}
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
                                                                </div>
                                                                <label className="form-label" htmlFor="amount_requeted">
                                                                    Quantidade
                                                                </label>
                                                                <Field type="number" className="form-control" name={`request[${index}].amount_requested`} value={request.amount_requested} />
                                                                <div className="mb-3"></div>

                                                                {(formik.values.request.length === 1) ? null :
                                                                    <button
                                                                        className="btn btn-primary"
                                                                        style={{ margin: '10px' }}
                                                                        type="button"
                                                                        onClick={() => arrayHelpers.remove(index)}
                                                                    >
                                                                        Remover material
                                                                    </button>}
                                                                <button
                                                                    style={{ margin: '10px' }}
                                                                    className="btn btn-primary"
                                                                    type="button"
                                                                    onClick={() =>
                                                                        arrayHelpers.push({ material_id: 0, amount_requested: '' })
                                                                    }
                                                                >
                                                                    Adicionar material
                                                                </button>
                                                            </div>
                                                        ))}

                                                    </div>
                                                )}
                                            />

                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Cadastrar requisi????o
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
