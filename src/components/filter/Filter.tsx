export const Filter = (props: any) => {
    return (
        <div className="col">
            <div className="card">
                <h5 className="card-header">Busca</h5>
                <div className="card-body">
                    <div>
                        <input value={props.filtro} onChange={(e) => props.fun(e.target.value)} type="text" className="form-control" id="defaultFormControlInput" placeholder="Ex: Rodo" aria-describedby="defaultFormControlHelp" />
                    </div>
                </div>
            </div>
        </div>
    )
}